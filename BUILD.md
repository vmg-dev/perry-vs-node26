# Reproduce the compiler build

Use a separate Perry source tree at commit
`f07e51ebfe99a4dc8c82dc865fb4b0c3f2d89c04` (version 0.5.1662).
The [source archive](https://github.com/PerryTS/perry/archive/f07e51ebfe99a4dc8c82dc865fb4b0c3f2d89c04.tar.gz)
avoids cloning its history. Do not place it inside this benchmark repository.

The recorded Apple Silicon build used Xcode command-line tools, CMake,
LLVM 22.1.8 (`llvm@22`), and Rust `nightly-2026-10-04` (Perry's pinned toolchain).
From that source directory:

```sh
export LLVM_SYS_221_PREFIX="$(brew --prefix llvm@22)"
export LIBCLANG_PATH="$LLVM_SYS_221_PREFIX/lib"
cargo build --locked --profile prod \
  -p perry -p perry-runtime-static -p perry-stdlib-static -p perry-gc-effects
target/prod/perry-gc-effects sidecars target/prod
```

Point `PERRY_BIN` and `PERRY_RUNTIME_DIR` at that build as shown in the README.
The runner compiles each JS file with `perry compile FILE -o BINARY --no-cache`.
Leave Perry optimization defaults enabled; unset `PERRY_FAST_MATH`,
`PERRY_FP_CONTRACT`, `PERRY_TARGET_CPU`, `PERRY_SIZE_OPT`, and
`PERRY_NO_AUTO_OPTIMIZE` for comparison with the recorded configuration.
Use the Node 26.5.1 arm64 distribution, with `NODE_OPTIONS` unset.

Primary times exclude compilation, loading, process startup and shutdown.
Sources are exact copies of the measured JS, including the in-process repetition
wrapper; SHA-256 values are recorded in the manifest. Some upstream kernels have
their own additional inner warmups. Source generation originally used Node's
`stripTypeScriptTypes` and an AST wrapper; there are no TypeScript annotations
in the timed sources. Historical `typed`/`untyped` filenames are retained, but
both branches have had annotations erased.

`bench.py` is the standalone adaptation of the measurement harness. It preserves
the same timer labels, exact stdout comparison, five discarded invocations,
seven measured invocations, three processes and alternating engine order.
The preliminary correctness run is a separate process; it is not the JIT warmup.
Published raw data retain warmup times and checksums but omit local command paths
and diagnostic process-wall timings. Reported timing values are unchanged.
