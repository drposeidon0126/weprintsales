import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  define: {
    'process.env': {
      API_URL: 'http://127.0.0.1:5000',
      DEBUG: 'true'
    }
  }
});

