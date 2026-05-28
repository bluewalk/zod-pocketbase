import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputFile = resolve(rootDir, "dist/zod.bundle.js");

await mkdir(dirname(outputFile), { recursive: true });

await build({
  absWorkingDir: rootDir,
  bundle: true,
  format: "cjs",
  logLevel: "info",
  outfile: outputFile,
  platform: "neutral",
  target: ["es2018"],
  stdin: {
    contents: [
      'const zod = require("zod");',
      "module.exports = zod;",
    ].join("\n"),
    resolveDir: rootDir,
    sourcefile: "virtual-zod-entry.cjs",
    loader: "js",
  },
});

console.log(`Wrote ${outputFile}`);