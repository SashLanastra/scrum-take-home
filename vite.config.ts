import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - split large dependencies for better caching
          "mui-core": ["@mui/material", "@emotion/react", "@emotion/styled"],
          "mui-icons": ["@mui/icons-material"],
          "ag-grid": ["ag-grid-react", "ag-grid-community"],
          charts: ["chart.js", "react-chartjs-2"],
          "react-vendor": ["react", "react-dom"],
          tanstack: ["@tanstack/react-query", "@tanstack/react-query-devtools"],
        },
      },
    },
    chunkSizeWarningLimit: 1100, // Adjusted for AG Grid (large enterprise table library)
  },
});
