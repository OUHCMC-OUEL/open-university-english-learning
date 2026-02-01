import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    tailwindcss(), 
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler'], 
        ],
      },
    }),
  ],resolve: {
    alias: {
       "@": path.resolve(__dirname, "./src"),
    },
  },
})