/* Shared SVG filter defs (film grain + material textures) referenced by
   id from CSS (url(#texWalnut) etc). Rendered once at the app root. */
export default function SvgFilters() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <filter id="filmgrain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="n" /><feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0" /></filter>
        <filter id="texWalnut" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.9" numOctaves="4" seed="7" stitchTiles="stitch" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.5 0.5 0.5 0 0" result="g" />
          <feComponentTransfer in="g" result="d"><feFuncR type="table" tableValues="0.11 0.20 0.16 0.27 0.13" /><feFuncG type="table" tableValues="0.07 0.13 0.10 0.18 0.08" /><feFuncB type="table" tableValues="0.04 0.08 0.06 0.11 0.05" /></feComponentTransfer>
          <feBlend in="d" in2="d" mode="normal" />
        </filter>
        <filter id="texMarble" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="4" seed="21" stitchTiles="stitch" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.6 0.6 0.6 0 0" result="g" />
          <feComponentTransfer in="g" result="veins"><feFuncR type="table" tableValues="0.08 0.09 0.1 0.85 0.1 0.09" /><feFuncG type="table" tableValues="0.17 0.19 0.21 0.9 0.21 0.19" /><feFuncB type="table" tableValues="0.14 0.16 0.17 0.86 0.17 0.16" /></feComponentTransfer>
          <feBlend in="veins" in2="veins" mode="normal" />
        </filter>
        <filter id="texBronze" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.4" numOctaves="3" seed="4" stitchTiles="stitch" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.55 0.55 0.55 0 0" result="g" />
          <feComponentTransfer in="g" result="d"><feFuncR type="table" tableValues="0.42 0.66 0.55 0.82 0.48" /><feFuncG type="table" tableValues="0.31 0.5 0.4 0.62 0.35" /><feFuncB type="table" tableValues="0.15 0.26 0.2 0.32 0.17" /></feComponentTransfer>
          <feBlend in="d" in2="d" mode="normal" />
        </filter>
        <filter id="texLeather" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="turbulence" baseFrequency="0.9" numOctaves="2" seed="9" stitchTiles="stitch" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.5 0.5 0.5 0 0" result="g" />
          <feComponentTransfer in="g" result="d"><feFuncR type="table" tableValues="0.24 0.34 0.28" /><feFuncG type="table" tableValues="0.15 0.22 0.18" /><feFuncB type="table" tableValues="0.09 0.13 0.11" /></feComponentTransfer>
          <feBlend in="d" in2="d" mode="normal" />
        </filter>
        <filter id="texLinen" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.02" numOctaves="2" seed="12" stitchTiles="stitch" result="n1" />
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.25" numOctaves="2" seed="15" stitchTiles="stitch" result="n2" />
          <feBlend in="n1" in2="n2" mode="multiply" result="cross" />
          <feColorMatrix in="cross" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.4 0.4 0.4 0 0" result="g" />
          <feComponentTransfer in="g" result="d"><feFuncR type="table" tableValues="0.71 0.82 0.75" /><feFuncG type="table" tableValues="0.65 0.75 0.68" /><feFuncB type="table" tableValues="0.53 0.62 0.56" /></feComponentTransfer>
          <feBlend in="d" in2="d" mode="normal" />
        </filter>
      </defs>
    </svg>
  );
}
