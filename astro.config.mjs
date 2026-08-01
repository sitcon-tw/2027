import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://sitcon.org",
  base: "/2027",
  fonts: [
    {
      provider: fontProviders.local(),
      name: "LINE Seed TW",
      cssVariable: "--font-line-seed-tw",
      weights: [400, 800],
      styles: ["normal"],
      fallbacks: [],
      optimizedFallbacks: false,
      options: {
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/LINESeedTW_OTF_Rg.woff2"],
          },
          {
            weight: 800,
            style: "normal",
            src: ["./src/assets/fonts/LINESeedTW_OTF_Eb.woff2"],
          },
        ],
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
