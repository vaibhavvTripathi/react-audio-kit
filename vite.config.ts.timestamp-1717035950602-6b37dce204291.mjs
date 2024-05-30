// vite.config.ts
import react from "file:///C:/Users/Vaibhav/Desktop/projects/react-audio-kit/react-audio-kit/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { defineConfig } from "file:///C:/Users/Vaibhav/Desktop/projects/react-audio-kit/react-audio-kit/node_modules/vite/dist/node/index.js";
import dts from "file:///C:/Users/Vaibhav/Desktop/projects/react-audio-kit/react-audio-kit/node_modules/vite-plugin-dts/dist/index.mjs";
import tailwindcss from "file:///C:/Users/Vaibhav/Desktop/projects/react-audio-kit/react-audio-kit/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///C:/Users/Vaibhav/Desktop/projects/react-audio-kit/react-audio-kit/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_dirname = "C:\\Users\\Vaibhav\\Desktop\\projects\\react-audio-kit\\react-audio-kit";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "./src/components/index.tsx"),
      name: "react-audio-kit",
      fileName: "react-audio-kit"
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  },
  plugins: [react(), dts({ rollupTypes: true })],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxWYWliaGF2XFxcXERlc2t0b3BcXFxccHJvamVjdHNcXFxccmVhY3QtYXVkaW8ta2l0XFxcXHJlYWN0LWF1ZGlvLWtpdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVmFpYmhhdlxcXFxEZXNrdG9wXFxcXHByb2plY3RzXFxcXHJlYWN0LWF1ZGlvLWtpdFxcXFxyZWFjdC1hdWRpby1raXRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1ZhaWJoYXYvRGVza3RvcC9wcm9qZWN0cy9yZWFjdC1hdWRpby1raXQvcmVhY3QtYXVkaW8ta2l0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tIFwidGFpbHdpbmRjc3NcIjtcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSBcImF1dG9wcmVmaXhlclwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvY29tcG9uZW50cy9pbmRleC50c3hcIiksXG4gICAgICBuYW1lOiBcInJlYWN0LWF1ZGlvLWtpdFwiLFxuICAgICAgZmlsZU5hbWU6IFwicmVhY3QtYXVkaW8ta2l0XCIsXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIl0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHJlYWN0OiBcIlJlYWN0XCIsXG4gICAgICAgICAgXCJyZWFjdC1kb21cIjogXCJSZWFjdERPTVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbcmVhY3QoKSwgZHRzKHsgcm9sbHVwVHlwZXM6IHRydWUgfSldLFxuICBjc3M6IHtcbiAgICBwb3N0Y3NzOiB7XG4gICAgICBwbHVnaW5zOiBbdGFpbHdpbmRjc3MsIGF1dG9wcmVmaXhlcl0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtWSxPQUFPLFdBQVc7QUFDclosT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLGtCQUFrQjtBQUx6QixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLEtBQUssUUFBUSxrQ0FBVyw0QkFBNEI7QUFBQSxNQUMzRCxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsSUFDWjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFNBQVMsV0FBVztBQUFBLE1BQy9CLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxRQUNmO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksRUFBRSxhQUFhLEtBQUssQ0FBQyxDQUFDO0FBQUEsRUFDN0MsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ1AsU0FBUyxDQUFDLGFBQWEsWUFBWTtBQUFBLElBQ3JDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
