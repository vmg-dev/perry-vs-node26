# Perry vs Node 26

45 unannotated JavaScript benchmarks: **startup excluded, both engines warmed**.
Perry wins 20, Node wins 22, three are within 5%. These are workload-specific results, not an overall application score.
Untyped AOT code can beat V8; removing annotations does not remove statically inferable facts.

Measured 2026-10-19 on Apple M5 Max (18 cores, 64 GiB), macOS 26.6, AC power.
**Perry 0.5.1662** ([`f07e51ebfe99`](https://github.com/PerryTS/perry/tree/f07e51ebfe99a4dc8c82dc865fb4b0c3f2d89c04)), LLVM 22.1.8, production build;
**Node 26.5.1**, V8 14.6.202.34-node.24. Same JS source on both engines, no fast-math.

## Results

Median milliseconds, lower is better. Each process performs **5 warmups + 7 measured invocations**;
three processes per engine, rotated engine order: 21 measured samples per row/engine.
All observed semantic outputs matched. The 21 samples are clustered within three processes.

<details>
<summary>All 45 results (S/P/B/D classifications explained below)</summary>

| Benchmark | Kind | Perry ms | Node 26 ms | Faster |
|---|:---:|---:|---:|---|
| [02_loop_overhead](benchmarks/suite/02_loop_overhead.js) | S | 93.807 | 93.832 | near tie |
| [03_array_write](benchmarks/suite/03_array_write.js) | S | 18.480 | 2.944 | Node 6.28× |
| [04_array_read](benchmarks/suite/04_array_read.js) | S | 15.230 | 5.775 | Node 2.64× |
| [05_fibonacci](benchmarks/suite/05_fibonacci.js) | S | 365.302 | 507.180 | Perry 1.39× |
| [06_math_intensive](benchmarks/suite/06_math_intensive.js) | S | 28.054 | 24.754 | Node 1.13× |
| [07_object_create](benchmarks/suite/07_object_create.js) | S | 6.052 | 3.797 | Node 1.59× |
| [08_string_concat](benchmarks/suite/08_string_concat.js) | S | 3.245 | 2.516 | Node 1.29× |
| [09_method_calls](benchmarks/suite/09_method_calls.js) | S | 20.075 | 7.796 | Node 2.58× |
| [10_nested_loops](benchmarks/suite/10_nested_loops.js) | S | 32.361 | 8.976 | Node 3.61× |
| [11_prime_sieve](benchmarks/suite/11_prime_sieve.js) | S | 2.816 | 2.163 | Node 1.30× |
| [12_binary_trees](benchmarks/suite/12_binary_trees.js) | S | 8.846 | 4.184 | Node 2.11× |
| [13_factorial](benchmarks/suite/13_factorial.js) | S | 56.851 | 332.599 | Perry 5.85× |
| [14_closure](benchmarks/suite/14_closure.js) | S | 33.983 | 164.911 | Perry 4.85× |
| [15_mandelbrot](benchmarks/suite/15_mandelbrot.js) | S | 14.506 | 12.796 | Node 1.13× |
| [16_matrix_multiply](benchmarks/suite/16_matrix_multiply.js) | S | 13.081 | 17.605 | Perry 1.35× |
| [17_loop_data_dependent](benchmarks/suite/17_loop_data_dependent.js) | S | 123.900 | 125.733 | near tie |
| [bench_array_grow](benchmarks/suite/bench_array_grow.js) | S | 4.106 | 6.239 | Perry 1.52× |
| [bench_buffer_readwrite](benchmarks/suite/bench_buffer_readwrite.js) | S | 23.647 | 32.569 | Perry 1.38× |
| [bench_gc_pressure](benchmarks/suite/bench_gc_pressure.js) | S | 4.640 | 3.552 | Node 1.31× |
| [bench_int_arithmetic](benchmarks/suite/bench_int_arithmetic.js) | S | 19.820 | 30.245 | Perry 1.53× |
| [bench_json_readonly](benchmarks/suite/bench_json_readonly.js) | B | 46.439 | 114.111 | Perry 2.46× |
| [bench_json_readonly_indexed](benchmarks/suite/bench_json_readonly_indexed.js) | B | 51.606 | 109.762 | Perry 2.13× |
| [bench_json_roundtrip](benchmarks/suite/bench_json_roundtrip.js) | B | 85.515 | 155.294 | Perry 1.82× |
| [bench_json_typed_roundtrip](benchmarks/suite/bench_json_typed_roundtrip.js) | B | 83.237 | 152.731 | Perry 1.83× |
| [bench_numeric_array_downgrade](benchmarks/suite/bench_numeric_array_downgrade.js) | D | 2.063 | 2.685 | Perry 1.30× |
| [bench_numeric_array_numeric](benchmarks/suite/bench_numeric_array_numeric.js) | S | 2.040 | 2.395 | Perry 1.17× |
| [bench_object_property](benchmarks/suite/bench_object_property.js) | S | 11.486 | 7.603 | Node 1.51× |
| [bench_string_heavy](benchmarks/suite/bench_string_heavy.js) | S | 20.187 | 26.884 | Perry 1.33× |
| [bench_typed_array_untyped_access](benchmarks/suite/bench_typed_array_untyped_access.js) | S | 598.593 | 196.152 | Node 3.05× |
| [batch](benchmarks/apps/batch.js) | S | 8.807 | 7.876 | Node 1.12× |
| [buffer_transcode](benchmarks/apps/buffer_transcode.js) | S | 29.949 | 16.250 | Node 1.84× |
| [date_format_parse](benchmarks/apps/date_format_parse.js) | S | 14.142 | 40.377 | Perry 2.86× |
| [json_parse_1mb](benchmarks/apps/json_parse_1mb.js) | B | 22.117 | 35.369 | Perry 1.60× |
| [json_stringify_1mb](benchmarks/apps/json_stringify_1mb.js) | S | 11.213 | 22.041 | Perry 1.97× |
| [map_1m](benchmarks/apps/map_1m.js) | S | 106.304 | 121.163 | Perry 1.14× |
| [object_deep_clone](benchmarks/apps/object_deep_clone.js) | S | 4.788 | 1.079 | Node 4.44× |
| [promise_all_chains](benchmarks/apps/promise_all_chains.js) | S | 26.567 | 4.781 | Node 5.56× |
| [regex_replace](benchmarks/apps/regex_replace.js) | S | 39.395 | 24.078 | Node 1.64× |
| [string_concat_csv](benchmarks/apps/string_concat_csv.js) | S | 12.659 | 13.006 | near tie |
| [string_split_map_join](benchmarks/apps/string_split_map_join.js) | S | 9.888 | 12.856 | Perry 1.30× |
| [string_template_interp](benchmarks/apps/string_template_interp.js) | S | 14.490 | 24.107 | Perry 1.66× |
| [escaping_closures](benchmarks/custom/escaping_closures.js) | S | 60.039 | 15.503 | Node 3.87× |
| [mixed_number_string](benchmarks/custom/mixed_number_string.js) | D | 129.973 | 27.889 | Node 4.66× |
| [polymorphic_shapes](benchmarks/custom/polymorphic_shapes.js) | P | 79.599 | 15.497 | Node 5.14× |
| [retained_objects](benchmarks/custom/retained_objects.js) | S | 7.956 | 3.727 | Node 2.13× |

</details>

[Raw samples and outputs](results/raw.json) · [CSV with ranges](results/summary.csv) · [Environment](results/metadata.json)

## Which cases are actually dynamic?

Here “strict” means a type-disciplined, no-`any` style, not just JavaScript's `"use strict"`.
TypeScript's [`strict`](https://www.typescriptlang.org/tsconfig/strict) does **not** ban explicit `any`.
No case can honestly be declared impossible in every strict TypeScript codebase.

| Kind | Cases | Relevance to strict TypeScript / disciplined JS |
|---|---|---|
| **D: mixed-type idioms** | `mixed_number_string` | The same `+` performs numeric addition and string concatenation. A typed `number \| string` helper needs narrowing before `+`; this exact unchecked form is atypical of a no-`any` codebase. |
| **D: mixed-type idioms** | `bench_numeric_array_downgrade` | A numeric array receives an object and string, then uses unchecked index-dependent types. Upstream uses `any[]`; a safe union needs narrowing or a different data model. |
| **P: shape polymorphism** | `polymorphic_shapes` | Three layouts share numeric `x/y`. Runtime-polymorphic, but fully compatible with a strict structural type `{ x: number; y: number }`. |
| **B: JSON boundary** | Four `bench_json_*` cases and `json_parse_1mb` | JSON parsing is common in strict TS. Fixtures have fixed schemas; they omit validation of untrusted input and are not evidence of arbitrary shape-changing JS. |
| **S: stable types** | Every other row, including `retained_objects`, `escaping_closures`, and typed-array access | Ordinary typed arrays, records, closures, classes, promises, strings, or numeric code. Allocation, escaping state, and missing annotations do not make these “loose JS.” |

Three of the four added custom tests (**retained objects, closures, shapes**) fit strict TS; only mixed addition is a loose typing example.
The D cases split: Node wins mixed addition **4.66×**, Perry wins array downgrade **1.30×**.
[Type-checkable examples](validation/strict-examples.ts) illustrate the distinction; they are not benchmark variants.
Adding annotations could change Perry's optimization; this experiment did not measure typed versions.

## Run

Requires Python 3.10+, Node **26.5.1**, and a separately installed Perry compiler/runtime.
This repository contains only benchmark sources, a standalone runner, and results—no Perry checkout or binaries.
For the recorded compiler build, see [BUILD.md](BUILD.md).

```sh
export NODE_BIN=/path/to/node-v26.5.1/bin/node
export PERRY_BIN=/path/to/perry/target/prod/perry
export PERRY_RUNTIME_DIR=/path/to/perry/target/prod
python3 bench.py compile
python3 bench.py measure
python3 bench.py summarize
# Optional subset: append --filter mixed_number_string to compile/measure.
```

New binaries/logs/results go to ignored `local/`; published results remain unchanged.
No npm dependencies are needed for benchmarking. On macOS the runner applies the original
`taskpolicy -t 0 -l 0` hint to both engines; this is not CPU affinity. Other OSes omit it.

## Limitations

- Synthetic kernels, not production applications. “Binary trees” creates points, “factorial” sums remainders, and “closure” has no capture. Non-escaping allocations may disappear; deep clone observes only the cloned ID.
- Checksums are sometimes weak (last array element, JSON lengths). A separate JSON check matched **2,129,424 bytes**; that does not prove language conformance.
- The original runner starts fresh processes. These sources repeat kernels inside each process, use `performance.now()`, and preserve stable function/class identities. Suite timers retain original boundaries; app timers include preparation and one checksum print. Async work is awaited.
- Live workstation, short kernels, no confidence intervals. Five warmups allow optimization, not guaranteed convergence: separate traces reached TurboFan before measurement in five inspected cases, with some recurring deoptimizations. See [validation](validation).

41 cases are adapted from the pinned [Perry benchmarks](https://github.com/PerryTS/perry/tree/f07e51ebfe99a4dc8c82dc865fb4b0c3f2d89c04/benchmarks) (MIT); four custom cases were added here.
Source hashes and upstream paths are in [manifest.json](manifest.json). [License](LICENSE).
