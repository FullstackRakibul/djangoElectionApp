import { fileURLToPath, URL } from "node:url";
import vuetify from "vite-plugin-vuetify";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    //VueDevTools(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: "less", // css in js
        }),
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": "#ff5f20",
          "link-color": "#1DA57A",
          "border-radius-base": "4px",
        },
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
