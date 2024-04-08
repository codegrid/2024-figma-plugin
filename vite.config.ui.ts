import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const config = defineConfig(({ mode }) => {
  const isDev = mode === "development";
  const plugins = [viteSingleFile()]; // vite-plugin-singlefileプラグインを使用

  return {
    plugins,
    build: {
      outDir: "dist",
      minify: !isDev,
      watch: isDev ? {} : null,
      emptyOutDir: false,
      assetsInlineLimit: 100000000, // 画像などインポートもしくは参照されたアセットをできる限りインライン化する
      chunkSizeWarningLimit: 100000000, // チャンクサイズ警告の制限値を大きくして警告されないようにする
      cssCodeSplit: false, // CSSファイルを分割しない
      rollupOptions: {
        input: "ui.html", // エントリーポイントを指定
        output: {
          inlineDynamicImports: true, // 動的インポートをインライン化する
        },
      },
    },
  };
});

export default config;
