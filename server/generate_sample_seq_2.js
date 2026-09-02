const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function crc32(buf) {
  let table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(8 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const chunkForCrc = buf.slice(4, 8 + len);
  const crc = crc32(chunkForCrc);
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

function createPNG(width, height, drawFn) {
  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8 bits per channel
  ihdr.writeUInt8(6, 9); // RGBA
  ihdr.writeUInt8(0, 10); // Compression
  ihdr.writeUInt8(0, 11); // Filter
  ihdr.writeUInt8(0, 12); // Interlace
  const ihdrChunk = makeChunk('IHDR', ihdr);

  const raw = Buffer.alloc(height * (1 + width * 4));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    raw[offset++] = 0; // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = drawFn(x, y, width, height);
      raw[offset++] = r;
      raw[offset++] = g;
      raw[offset++] = b;
      raw[offset++] = a;
    }
  }

  const compressed = zlib.deflateSync(raw);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

const outDir = path.join(__dirname, '../client/public/sample_image_sequence_2');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const totalFrames = 25;
const size = 300;
const cx = size / 2;
const cy = size / 2;

for (let frame = 0; frame < totalFrames; frame++) {
  const angle = (frame / totalFrames) * 2 * Math.PI;
  const pulse = 1 + 0.12 * Math.sin(angle * 2);
  
  const pngBuf = createPNG(size, size, (x, y, w, h) => {
    const dx = (x - cx) / pulse;
    const dy = (y - cy) / pulse;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Outer hexagonal / diamond gold tech ring
    if (dist >= 110 && dist <= 135) {
      const ringAlpha = Math.sin((dist - 110) / 25 * Math.PI);
      const angleGlow = (Math.sin(angle * 3 + Math.atan2(dy, dx) * 4) + 1) / 2;
      const r = Math.floor(255);
      const g = Math.floor(180 + 75 * angleGlow);
      const b = Math.floor(20 + 40 * angleGlow);
      return [r, g, b, Math.floor(ringAlpha * 255)];
    }
    
    // Inner 3D rotating rings (Cyan & Magenta Broadcast Orb)
    if (dist < 105 && dist > 20) {
      const ptAngle = Math.atan2(dy, dx);
      // Dual counter-rotating rings
      const v1 = Math.cos(2 * ptAngle - angle * 2);
      const v2 = Math.sin(4 * ptAngle + angle);
      
      if (Math.abs(v1) > 0.6) {
        const factor = (Math.abs(v1) - 0.6) / 0.4;
        return [0, Math.floor(220 * factor), 255, Math.floor(240 * factor)];
      }

      if (Math.abs(v2) > 0.7) {
        const factor = (Math.abs(v2) - 0.7) / 0.3;
        return [255, 0, Math.floor(180 * factor), Math.floor(220 * factor)];
      }
    }

    // Glowing pulsating center sphere
    if (dist <= 25) {
      const intensity = 1 - dist / 25;
      return [255, 230, 80, Math.floor(intensity * 255)];
    }

    return [0, 0, 0, 0]; // Transparent background
  });

  const frameNum = String(frame + 1).padStart(4, '0');
  const filename = `frame_${frameNum}.png`;
  fs.writeFileSync(path.join(outDir, filename), pngBuf);
  console.log(`Generated Sequence 2: ${filename}`);
}

console.log('Finished generating sample image sequence 2.');
