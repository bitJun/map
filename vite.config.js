import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import path from "path";
import postCssPxToRem from 'postcss-pxtorem';

export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss:{
      plugins:[
        postCssPxToRem({
          rootValue: 32, // 设计稿宽度除以 10，  开头大写的Px 不转换 => height: 100Px, 内联样式不转换，需要 / 75 转成 rem
          unitPrecision: 6, // 计算结果保留 6 位小数
          selectorBlackList: ["pc-"], // 要忽略的选择器并保留为px。
          propList: ['*'], // 可以从px更改为rem的属性  感叹号开头的不转换
          replace: true, // 转换成 rem 以后，不保留原来的 px 单位属性
          mediaQuery: true, // 允许在媒体查询中转换px。
          minPixelValue: 2, // 设置要替换的最小像素值。
          exclude: /node_modules/i // 排除 node_modules 文件(node_modules 内文件禁止转换)
        })
      ]
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://fi30210888.zicp.fun",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
       input: {
        index: path.resolve(__dirname, 'index.html'),
        agsitech: path.resolve(__dirname,'agsitech.html'),
        feihongda: path.resolve(__dirname,'feihongda.html'),
      },
    },
  }
})
