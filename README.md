# PocketBase Zod bundle

This project builds a single CommonJS bundle of `zod` for PocketBase hooks.

## Build

```sh
npm install
npm run build
```

The build output is written to `dist/zod.bundle.js`.

## Use in PocketBase

Copy `dist/zod.bundle.js` into your `pb_hooks` directory and require it from a hook:

```js
const z = require(`${__hooks}/zod.bundle.js`);
const schema = z.object({
email: z.email(),
});

schema.parse({ email: "user@example.com" });
```

PocketBase loads local modules through CommonJS `require()`, so the bundle is emitted as a single CJS file with no external runtime imports.