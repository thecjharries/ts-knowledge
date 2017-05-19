# Getting Started

## Stack

* [TypeScript Node](//github.com/TypeStrong/ts-node) lets you run TypeScript from the command line, e.g. `ts-node some-ts-file.ts`

```shell
npm install --save-dev \
    typescript \
    ts-node @types/node \
```

## Config Files

### `tsconfig.json`

You can create a boilerplate `tsconfig.json` with
```shell
tsc --init
```

This is my `tsconfig.json`:
```javascript
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es6",
    "module": "commonjs",
    /* Strict Type-Checking Options */
    "strict": true,
    "strictNullChecks": false,
    /* Experimental Options */
    "experimentalDecorators": true,
    "lib": [ "es6", "dom" ]
  }
}
```