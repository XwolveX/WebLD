import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  ssr: {
    // These ship ESM-only / browser-flavoured entry points that Node cannot
    // import directly; bundle them into the server build used for prerendering.
    noExternal: ['gsap', 'lenis', 'three'],
  },
});
