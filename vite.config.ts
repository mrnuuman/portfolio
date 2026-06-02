import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

declare const process: {
  env: Record<string, string | undefined>;
};

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const base =
  isGitHubPages && repository && !repository.endsWith(".github.io")
    ? `/${repository}/`
    : "/";

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
});
