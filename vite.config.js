import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import externalGlobals from 'rollup-plugin-external-globals';

const resolveFixup = {
  name: 'resolve-fixup',
  setup(build) {
    build.onResolve({ filter: /react-virtualized/ }, async () => ({
      path: path.resolve('./node_modules/react-virtualized/dist/umd/react-virtualized.js'),
    }));
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['BMap'],
      plugins: [
        externalGlobals({
          BMap: 'BMap',
        }),
      ],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [resolveFixup],
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
      {
        find: 'components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: 'assets',
        replacement: path.resolve(__dirname, 'src/assets'),
      },
      {
        find: 'pages',
        replacement: path.resolve(__dirname, 'src/pages'),
      },
      {
        find: 'utils',
        replacement: path.resolve(__dirname, 'src/utils'),
      },
      {
        find: 'BMap',
        replacement: 'https://api.map.baidu.com/api?v=2.0&ak=XIYLPKQE2G1jXeKXlplm0kH0x3hqPYpO',
      },
    ],
  },
  plugins: [reactRefresh()],
});
