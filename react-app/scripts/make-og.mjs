/* Generates public/og-image.png (1200x630) for social sharing.
   Run `npm run og` after changing the tagline or brand colours, and replace
   the output with a real project photo once you have one. */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/og-image.png');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="78%" cy="30%" r="70%">
      <stop offset="0" stop-color="#2C221C"/>
      <stop offset="1" stop-color="#161110"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#A8834A" stroke-opacity="0.45" stroke-width="1.5"/>
  <g transform="translate(96 96) scale(2.6)" fill="none" stroke="#DEBB7C" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="20" cy="20" r="18" stroke-width="0.7"/>
    <path d="M13,27 L13,13 L20,24 L27,13 L27,27" stroke-width="1.1"/>
  </g>
  <text x="96" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="92" fill="#F8F3EA">L&amp;D CERAMICS</text>
  <text x="98" y="392" font-family="Arial, Helvetica, sans-serif" font-size="30" letter-spacing="7" fill="#DEBB7C">LIFE &amp; DESIGN</text>
  <text x="98" y="500" font-family="Georgia, 'Times New Roman', serif" font-size="36" font-style="italic" fill="#CDBFA0">Nội thất may đo · Gỗ óc chó · Đồng · Đá tự nhiên</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log(`Wrote ${out}`);
