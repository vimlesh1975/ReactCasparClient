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

const outDir = path.join(__dirname, '../client/public/sample_image_sequence');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const totalFrames = 25;
const size = 300;
const cx = size / 2;
const cy = size / 2;

for (let frame = 0; frame < totalFrames; frame++) {
  const angle = (frame / totalFrames) * 2 * Math.PI;
  const pngBuf = createPNG(size, size, (x, y, w, h) => {
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Outer glowing ring
    if (dist >= 120 && dist <= 140) {
      const ringAlpha = Math.sin((dist - 120) / 20 * Math.PI) * 255;
      return [255, 60, 60, Math.floor(ringAlpha)];
    }
    
    // Rotating radar beam / 3D segments
    if (dist < 115) {
      const ptAngle = Math.atan2(dy, dx);
      let diff = ptAngle - angle;
      while (diff < 0) diff += 2 * Math.PI;
      while (diff >= 2 * Math.PI) diff -= 2 * Math.PI;
      
      // 3 rotating spokes
      const spoke1 = Math.abs(Math.sin(3 * ptAngle - angle));
      if (spoke1 > 0.8 && dist > 30) {
        const intensity = (spoke1 - 0.8) / 0.2;
        return [0, 210, 255, Math.floor(intensity * 240)];
      }

      // Center live core
      if (dist <= 35) {
        const coreIntensity = (1 - dist / 35);
        return [255, 255, 255, Math.floor(coreIntensity * 255)];
      }

      // Rotating glow sweep
      if (diff < Math.PI / 2) {
        const sweepIntensity = (1 - diff / (Math.PI / 2)) * (dist / 115);
        return [255, 180, 0, Math.floor(sweepIntensity * 180)];
      }
    }

    return [0, 0, 0, 0]; // Transparent background
  });

  const frameNum = String(frame + 1).padStart(4, '0');
  const filename = `frame_${frameNum}.png`;
  fs.writeFileSync(path.join(outDir, filename), pngBuf);
  console.log(`Generated ${filename}`);
}

console.log('Finished generating sample image sequence.');
