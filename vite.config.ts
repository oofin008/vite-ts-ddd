import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import vitePluginImp from "vite-plugin-imp";

const path = require("path");

// https://vitejs.dev/config/
const config =  ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      react(),
      vitePluginImp({
        libList: [
          { libName: 'antd', style: (name) => `antd/es/${name}/style` },
        ],
      }),
    ],
    server: {
      strictPort: true,
      port: 3000,
    },
    resolve: {
      alias: {
        "@/": path.join(__dirname, "src/"),
      },
      // { find: '@', replacement: path.resolve(__dirname, 'src') },
      // fix less import by: @import ~
      // https://github.com/vitejs/vite/issues/2185#issuecomment-784637827
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // 'text-color': 'rgba(0, 0, 0, 0.65)',
            // 'text-color-secondary': 'rgba(0, 0, 0, 0.45)',
            // 'primary-color': '#e7d6c4',
            // 'layout-header-background': '#fcf9ee',
            // 'layout-body-background': '#fcf9ee',
            // 'menu-dark-color': 'rgba(0, 0, 0, 0.45)',
          },
          javascriptEnabled: true,
        }
      }
    }
  });
};

export default config;
