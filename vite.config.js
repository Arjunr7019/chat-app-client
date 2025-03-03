import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  base:"/chat-app-client/",
  plugins: [
    tailwindcss(),
    react()
  ],
})