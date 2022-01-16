import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import  {resolve} from "path";
// https://vitejs.dev/config/
export default defineConfig({
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
  plugins: [react()]
})
