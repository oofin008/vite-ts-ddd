import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import vitePluginImp from "vite-plugin-imp";

const path = require("path");

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  // console.log(process.env);
  return defineConfig({
    plugins: [
      react(),
      vitePluginImp({
        libList: [
          { libName: 'antd', style: (name) => `antd/es/${name}/style` },
        ],
      }),
    ],
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
            'text-color': 'rgba(0, 0, 0, 0.65)',
            'text-color-secondary': 'rgba(0, 0, 0, 0.45)',
            'primary-color': 'red',
            'layout-header-background': 'none'
          },
          javascriptEnabled: true,
        }
      }
    }
  });
};
