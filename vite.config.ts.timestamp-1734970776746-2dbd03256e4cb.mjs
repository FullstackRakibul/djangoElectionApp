// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import vuetify from "file:///D:/alpha/vue/electionApp/node_modules/vite-plugin-vuetify/dist/index.mjs";
import { defineConfig } from "file:///D:/alpha/vue/electionApp/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/alpha/vue/electionApp/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueDevTools from "file:///D:/alpha/vue/electionApp/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import Components from "file:///D:/alpha/vue/electionApp/node_modules/unplugin-vue-components/dist/vite.js";
import { AntDesignVueResolver } from "file:///D:/alpha/vue/electionApp/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_import_meta_url = "file:///D:/alpha/vue/electionApp/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    VueDevTools(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
          // css in js
        })
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": "#ff5f20",
          "link-color": "#1DA57A",
          "border-radius-base": "4px"
        },
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxhbHBoYVxcXFx2dWVcXFxcZWxlY3Rpb25BcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGFscGhhXFxcXHZ1ZVxcXFxlbGVjdGlvbkFwcFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovYWxwaGEvdnVlL2VsZWN0aW9uQXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB2dWV0aWZ5IGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZXRpZnknO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XHJcbmltcG9ydCB7IEFudERlc2lnblZ1ZVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICB2dWV0aWZ5KHsgYXV0b0ltcG9ydDogdHJ1ZSB9KSxcclxuICAgIFZ1ZURldlRvb2xzKCksXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgQW50RGVzaWduVnVlUmVzb2x2ZXIoe1xyXG4gICAgICAgICAgaW1wb3J0U3R5bGU6IGZhbHNlLCAvLyBjc3MgaW4ganNcclxuICAgICAgICB9KSxcclxuICAgICAgXSxcclxuICAgIH0pLFxyXG5cclxuICBdLFxyXG4gIGNzczoge1xyXG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICBsZXNzOiB7XHJcbiAgICAgICAgbW9kaWZ5VmFyczoge1xyXG4gICAgICAgICAgJ3ByaW1hcnktY29sb3InOiAnI2ZmNWYyMCcsXHJcbiAgICAgICAgICAnbGluay1jb2xvcic6ICcjMURBNTdBJyxcclxuICAgICAgICAgICdib3JkZXItcmFkaXVzLWJhc2UnOiAnNHB4JyxcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtRLFNBQVMsZUFBZSxXQUFXO0FBQ3JTLE9BQU8sYUFBYTtBQUNwQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyw0QkFBNEI7QUFOMEgsSUFBTSwyQ0FBMkM7QUFTaE4sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osUUFBUSxFQUFFLFlBQVksS0FBSyxDQUFDO0FBQUEsSUFDNUIsWUFBWTtBQUFBLElBQ1osV0FBVztBQUFBLE1BQ1QsV0FBVztBQUFBLFFBQ1QscUJBQXFCO0FBQUEsVUFDbkIsYUFBYTtBQUFBO0FBQUEsUUFDZixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBRUg7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLFlBQVk7QUFBQSxVQUNWLGlCQUFpQjtBQUFBLFVBQ2pCLGNBQWM7QUFBQSxVQUNkLHNCQUFzQjtBQUFBLFFBRXhCO0FBQUEsUUFDQSxtQkFBbUI7QUFBQSxNQUNyQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUVGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
