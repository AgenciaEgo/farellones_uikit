// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import react from '@vitejs/plugin-react'
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true, exclude: ["/*.stories.tsx", "/*.test.tsx"], rollupTypes: true}),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  },
  build: { 
    lib: { 
      entry: './src/index.ts', 
      name: 'farellones_uikit', 
      fileName: (format) => `farellones_uikit.${format}.js`,
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: { 
      external: Object.keys(peerDependencies), 
      output: { globals: { react: 'React', 'react-dom': 'ReactDOM' } } 
    }
  },
})