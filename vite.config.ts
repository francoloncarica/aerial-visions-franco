import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: "./", // correcto para GitHub Pages (rutas relativas)
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "docs", // ← **Agrega esta línea**
    assetsDir: "assets", // Asegura que los archivos estáticos se coloquen en "docs/assets"
  }, // ← Cierra correctamente el objeto build
})); // ← Cierra correctamente el objeto de configuración y la función
