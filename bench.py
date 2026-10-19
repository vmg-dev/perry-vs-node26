#!/usr/bin/env python3
"""Standalone, correctness-gated Perry vs Node 26 runner (Python stdlib only)."""
import argparse
import csv
import hashlib
import json
import math
import os
from pathlib import Path
import platform
import shutil
import statistics
import subprocess
import sys

ROOT = Path(__file__).resolve().parent
LOCAL = ROOT / 'local'


def save(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2) + '\n')


def executable(env_name, default):
    value = os.environ.get(env_name, default)
    found = shutil.which(value)
    if not found:
        raise ValueError(f'{env_name}: executable not found; set it explicitly')
    return str(Path(found).resolve())


def run(command, env, timeout=180):
    result = subprocess.run(command, cwd=ROOT, env=env, capture_output=True,
                            text=True, timeout=timeout)
    return dict(code=result.returncode, stdout=result.stdout, stderr=result.stderr)


def parse(item, stdout):
    semantic, times = [], []
    for line in stdout.splitlines():
        line = line.strip()
        key, sep, value = line.partition(':')
        if sep and key == item['time_label']:
            elapsed = float(value.strip())
            if not math.isfinite(elapsed) or elapsed <= 0:
                raise ValueError('Non-positive or non-finite timing')
            times.append(elapsed)
        if line and not (sep and key in item['measurement_labels']):
            semantic.append(line)
    if len(times) != item['warmup'] + item['measured']:
        raise ValueError(f"Expected 12 timing lines, got {len(times)}")
    if not semantic:
        raise ValueError('Missing semantic output')
    return semantic, times


def stats(values):
    return dict(median=statistics.median(values), min=min(values), max=max(values),
                stdev=statistics.pstdev(values), samples=values)


def summarize():
    rows = []
    for path in sorted((LOCAL / 'results').glob('*/*.json')):
        d = json.loads(path.read_text())
        p = d['summary']['perry_js']['internal_ms']['median']
        n = d['summary']['node']['internal_ms']['median']
        rows.append(dict(group=d['benchmark']['group'], benchmark=d['benchmark']['name'],
                         category=d['benchmark']['category'], perry_ms=p,
                         node26_ms=n, perry_over_node26=p/n))
    if not rows:
        raise ValueError('No local results; run measure first')
    with (LOCAL / 'summary.csv').open('w') as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0]), lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)
    for row in rows:
        print(f"{row['benchmark']}: Perry {row['perry_ms']:.3f} ms, "
              f"Node {row['node26_ms']:.3f} ms, P/N {row['perry_over_node26']:.3f}")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('action', choices=['compile', 'measure', 'summarize'])
    parser.add_argument('--filter', default='', help='Benchmark name substring')
    args = parser.parse_args()
    if args.action == 'summarize':
        summarize()
        return
    items = [b for b in json.loads((ROOT / 'manifest.json').read_text())
             if args.filter in b['name']]
    if not items:
        raise ValueError('No benchmarks match the filter')
    perry = executable('PERRY_BIN', 'perry')
    env = dict(os.environ, PERRY_NO_TELEMETRY='1')
    env.setdefault('PERRY_RUNTIME_DIR', str(Path(perry).parent))
    prefix = ['/usr/sbin/taskpolicy', '-t', '0', '-l', '0'] if sys.platform == 'darwin' else []
    if args.action == 'measure':
        node = executable('NODE_BIN', 'node')
        versions = run([node, '-p', 'JSON.stringify(process.versions)'], env)
        if versions['code']:
            raise ValueError('Cannot read Node version')
        versions = json.loads(versions['stdout'])
        if versions['node'].split('.')[0] != '26':
            raise ValueError('This experiment requires Node 26')
        save(LOCAL / 'metadata.json', dict(node_versions=versions,
            perry_version=run([perry, '--version'], env)['stdout'].strip(),
            platform=platform.system(), architecture=platform.machine(),
            warmup=5, measured=7, processes=3, startup_included=False,
            scheduler_hint=prefix))
    for item in items:
        source = ROOT / item['source']
        source_hash = hashlib.sha256(source.read_bytes()).hexdigest()
        if source_hash != item['sha256']:
            raise ValueError(f"Source changed: {item['name']}; update manifest hash deliberately")
        binary = LOCAL / 'binaries' / item['group'] / item['name']
        log = LOCAL / 'compile' / item['group'] / (item['name'] + '.json')
        if args.action == 'compile':
            binary.parent.mkdir(parents=True, exist_ok=True)
            result = run([perry, 'compile', str(source), '-o', str(binary), '--no-cache'], env)
            result['source_sha256'] = source_hash
            save(log, result)
            if result['code']:
                raise ValueError(f"Compile failed: {item['name']}; inspect local/compile")
            print('Compiled', item['name'], flush=True)
            continue
        if not binary.is_file() or not log.is_file():
            raise ValueError(f"Compile {item['name']} first")
        compiled = json.loads(log.read_text())
        if compiled['code'] or compiled['source_sha256'] != source_hash:
            raise ValueError(f"Recompile {item['name']}")
        commands = {'node': prefix + [node, str(source)], 'perry_js': prefix + [str(binary)]}
        record = dict(benchmark=item, preflight={}, runs=[])
        reference = None
        for engine, command in commands.items():
            result = run(command, env)
            if result['code']:
                raise ValueError(f"Preflight failed: {item['name']} {engine}: {result['stderr']}")
            semantic, _ = parse(item, result['stdout'])
            if reference is None:
                reference = semantic
            if semantic != reference:
                raise ValueError(f"Output mismatch: {item['name']} {engine}")
            record['preflight'][engine] = result
        # Separate preflight is correctness/cache priming; JS source itself warms the JIT.
        for trial in range(3):
            order = ['node', 'perry_js'] if trial % 2 == 0 else ['perry_js', 'node']
            for engine in order:
                result = run(commands[engine], env)
                semantic, times = parse(item, result['stdout'])
                correct = result['code'] == 0 and semantic == reference
                if not correct:
                    raise ValueError(f"Measured output mismatch: {item['name']} {engine}")
                result.update(engine=engine, trial=trial, correct=correct, internal_ms=times)
                record['runs'].append(result)
        record['summary'] = {}
        for engine in commands:
            samples = [value for r in record['runs'] if r['engine'] == engine
                       for value in r['internal_ms'][item['warmup']:]]
            record['summary'][engine] = dict(correct=True, internal_ms=stats(samples))
        save(LOCAL / 'results' / item['group'] / (item['name'] + '.json'), record)
        print('Measured', item['name'], flush=True)


if __name__ == '__main__':
    try:
        main()
    except (ValueError, OSError, subprocess.TimeoutExpired) as error:
        sys.exit(str(error))
