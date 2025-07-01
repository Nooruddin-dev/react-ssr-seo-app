import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/ ✅ below one is orignal old one when project created
// export default defineConfig({
//   plugins: [react()],
// })


// vite.config.js
export default defineConfig({
  base: "/", // ✅ important for correct asset paths in SSR
  build: {
    outDir: "dist", // ✅ this matches your Docker/server setup
    emptyOutDir: true,
  },
  plugins: [react()],
});