import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./setup.tests.ts"],
    include: ["src/**/*.spec.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/cypress/**"],
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
});
