import { defineConfig } from "vite";

const config = defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    build: {
      outDir: "dist",
      minify: !isDev,
      watch: isDev ? {} : null,
      emptyOutDir: false,
      lib: {
        entry: "./src/code/code.ts", // エントリーポイントを指定
        formats: ["es"], // ESモジュールとして出力
      },
      rollupOptions: {
        output: {
          entryFileNames: "code.js", // 出力ファイル名を指定
        },
      },
    },
  };
});

export default config;
