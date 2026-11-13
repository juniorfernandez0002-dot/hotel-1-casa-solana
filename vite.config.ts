import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

function hybridPreBuildPlugin(): Plugin {
  return {
    name: 'hybrid-pre-build',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        if (!ctx.server) {
          return html.replace(
            /<!-- RUNTIME-LOADER-START -->[\s\S]*?<!-- RUNTIME-LOADER-END -->/,
            '<script type="module" src="/src/main.tsx"></script>'
          );
        }
        return html;
      }
    }
  };
}

function hybridPostBuildPlugin(): Plugin {
  return {
    name: 'hybrid-post-build',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html
          .replace(
            /<script type="module" crossorigin src="([^"]+)"><\/script>/g,
            '<script defer src="$1"></script>'
          )
          .replace(
            /<link rel="stylesheet" crossorigin href="([^"]+)">/g,
            '<link rel="stylesheet" href="$1">'
          );
      }
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), hybridPreBuildPlugin(), hybridPostBuildPlugin()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: 'iife',
        name: 'SolanaHotelApp',
        entryFileNames: 'assets/app.bundle.js',
        assetFileNames: (assetInfo) => {
          if (
            assetInfo.name?.endsWith('.css') ||
            assetInfo.names?.some((name) => name.endsWith('.css'))
          ) {
            return 'assets/app.bundle.css';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
});
