import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [
            {
                find: '@',
                replacement: path.resolve(__dirname, 'src')
            },
            {
                find: 'components',
                replacement: path.resolve(__dirname, 'src/components')
            },
            {
                find: 'assets',
                replacement: path.resolve(__dirname, 'src/assets')
            },
            {
                find: 'pages',
                replacement: path.resolve(__dirname, 'src/pages')
            },
            {
                find: 'utils',
                replacement: path.resolve(__dirname, 'src/pages')
            }
        ],
    },
    plugins: [reactRefresh()]
})
