import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://sitcon.org",
  base: "/2027",
  vite: {
    plugins: [tailwindcss()],
  },
});
