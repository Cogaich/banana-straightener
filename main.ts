// Banana Straightener — catalogue photo entry for make.fun.
// The photograph is baked into the repo as entry.png; this program only
// validates it against the competition gate and copies it to the output
// directory, so every run produces identical bytes.
import * as fsp from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const LIMIT_BYTES = 1048576;
const LIMIT_SIDE = 1024;
const PNG_SIGNATURE = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);

const here = path.dirname(fileURLToPath(import.meta.url));

type PngInfo = { width: number; height: number; bytes: number };

async function inspectPng(file: string): Promise<PngInfo> {
  let data: Buffer;
  try {
    data = await fsp.readFile(file);
  } catch {
    throw new Error(`cannot read source image ${file}`);
  }
  if (data.length < 33) throw new Error("entry.png is too short to be a PNG");
  if (!data.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error("entry.png does not start with the PNG signature");
  }
  if (data.subarray(12, 16).toString("ascii") !== "IHDR") {
    throw new Error("entry.png has no IHDR chunk where one belongs");
  }
  const width = data.readUInt32BE(16);
  const height = data.readUInt32BE(20);
  if (width === 0 || height === 0) throw new Error("entry.png has a zero side");
  if (width > LIMIT_SIDE || height > LIMIT_SIDE) {
    throw new Error(
      `entry.png is ${width}x${height}, above the ${LIMIT_SIDE}x${LIMIT_SIDE} cap`,
    );
  }
  if (data.length > LIMIT_BYTES) {
    throw new Error(
      `entry.png is ${data.length} bytes, above the ${LIMIT_BYTES} byte cap`,
    );
  }
  return { width, height, bytes: data.length };
}

async function deliver(): Promise<void> {
  const checkOnly = process.argv.includes("--check");
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
  const source = path.join(here, "entry.png");
  const info = await inspectPng(source);
  console.log(
    `[banana-straightener] entry valid (${info.width}x${info.height}, ${info.bytes} bytes)`,
  );
  if (checkOnly) return;
  const destDir = path.resolve(outDir);
  await fsp.mkdir(destDir, { recursive: true });
  const dest = path.join(destDir, "entry.png");
  await fsp.copyFile(source, dest);
  const written = await fsp.readFile(dest);
  const original = await fsp.readFile(source);
  if (!written.equals(original)) {
    throw new Error("output does not match the source image byte for byte");
  }
  console.log(`[banana-straightener] wrote ${dest}`);
}

deliver().catch((error: unknown) => {
  console.error(
    `[banana-straightener] ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exit(1);
});
