import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import externalGlobals from "rollup-plugin-external-globals";
import  {resolve} from "path";


// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        esbuildOptions: {
        }
    },
  resolve:{
    alias: {
      "@": resolve(__dirname, "src"),
      "components": resolve(__dirname, "src/components"),
      "pages": resolve(__dirname, "src/pages"),
      "common": resolve(__dirname, "src/common"),
      "assets": resolve(__dirname, "src/assets"),
      "utils": resolve(__dirname, "src/utils"),
      "network": resolve(__dirname, "src/network"),
    },
  },
    build:{
        rollupOptions:{
            external: ['BMap'],
            plugins: [
                externalGlobals({
                    BMap: 'BMap',
                }),
            ],
        }
    },
  plugins: [react()]
});
