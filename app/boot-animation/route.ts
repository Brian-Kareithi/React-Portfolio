import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { inflateRawSync } from "node:zlib";

export const runtime = "nodejs";

function readZipEntry(archive: Buffer, requestedName: string): Buffer {
  const endSignature = Buffer.from([0x50, 0x4b, 0x05, 0x06]);
  const endOffset = archive.lastIndexOf(endSignature);
  if (endOffset < 0) throw new Error("Invalid animation archive");
  let offset = archive.readUInt32LE(endOffset + 16);

  while (archive.readUInt32LE(offset) === 0x02014b50) {
    const compression = archive.readUInt16LE(offset + 10);
    const compressedSize = archive.readUInt32LE(offset + 20);
    const nameLength = archive.readUInt16LE(offset + 28);
    const extraLength = archive.readUInt16LE(offset + 30);
    const commentLength = archive.readUInt16LE(offset + 32);
    const localHeaderOffset = archive.readUInt32LE(offset + 42);
    const name = archive.toString("utf8", offset + 46, offset + 46 + nameLength);

    if (name === requestedName) {
      if (compression !== 0 && compression !== 8) {
        throw new Error("Unsupported animation compression");
      }

      const localNameLength = archive.readUInt16LE(localHeaderOffset + 26);
      const localExtraLength = archive.readUInt16LE(localHeaderOffset + 28);
      const dataOffset = localHeaderOffset + 30 + localNameLength + localExtraLength;
      const compressed = archive.subarray(dataOffset, dataOffset + compressedSize);
      return compression === 8 ? inflateRawSync(compressed) : Buffer.from(compressed);
    }

    offset += 46 + nameLength + extraLength + commentLength;
  }

  throw new Error(`Animation archive entry not found: ${requestedName}`);
}

export async function GET() {
  try {
    const archive = await readFile(join(process.cwd(), "public", "b;urb.lottie"));
    const manifest = JSON.parse(readZipEntry(archive, "manifest.json").toString("utf8")) as {
      animations?: Array<{ id?: string }>;
    };
    const animationId = manifest.animations?.[0]?.id;
    if (!animationId || !/^[\w-]+$/.test(animationId)) throw new Error("Animation id is missing");

    const animation = readZipEntry(archive, `animations/${animationId}.json`);
    return new Response(new Uint8Array(animation), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=86400, s-maxage=604800",
      },
    });
  } catch {
    return Response.json({ error: "Boot animation unavailable" }, { status: 500 });
  }
}
