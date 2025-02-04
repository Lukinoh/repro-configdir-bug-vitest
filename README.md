# Reproduction: Vitest does not work with `${configDir}` and `references` of `tsconfig.json`

## Describe the bug

It seems that [`${configDir}`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html#the-configdir-template-variable-for-configuration-files) is not recognized by vitest when used through `references` of `tsconfig.json`.

## Reproduction

https://github.com/Lukinoh/repro-configdir-bug-vitest/

### Steps to reproduce

- `git clone git@github.com:Lukinoh/repro-configdir-bug-vitest.git`
- `cd repro-build-watch-vite-plugin-dts`
- `npm install`
- `npm run test` // Everything works here
- Open `tsconfig.json`
- Remove one `/` at line 5
- `npm run test` // Badaboom, it does not work

### Additional details

To highlight the issue, I added a library that uses `experimentalDecorators`.
It allows me to detect whether the correct `tsconfig.json` is used or not.
If there is an error, it means that `experimentalDecorators` is `false`.
Hence, it is not using the `compilerOptions` of `tsconfig.vi-XXX.json`.

I suspect that something is not able to correctly interpret the `${configDir}` when used in conjunction with `references` of the `tsconfig.json`.
If I rename `tsconfig.vi-configdir.json` to `tsconfig.json`, it works.

## System Info

```
System:
  OS: Linux 5.15 Pengwin 12 (bookworm)
  CPU: (12) x64 Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
  Memory: 18.23 GB / 31.22 GB
  Container: Yes
  Shell: 5.2.15 - /bin/bash
Binaries:
  Node: 20.14.0 - ~/.local/state/fnm_multishells/53724_1738653097445/bin/node
  Yarn: 1.22.19 - ~/.local/state/fnm_multishells/53724_1738653097445/bin/yarn
  npm: 10.7.0 - ~/.local/state/fnm_multishells/53724_1738653097445/bin/npm
  pnpm: 9.15.4 - ~/.local/state/fnm_multishells/53724_1738653097445/bin/pnpm
  bun: 1.0.1 - ~/.bun/bin/bun
npmPackages:
  vitest: 3.0.5 => 3.0.5
```
