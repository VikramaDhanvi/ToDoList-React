// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'your-repo-name' with your actual repo name
export default defineConfig({
  plugins: [react()],
  base: '/ToDoLisr-React/' // <-- Important!
})
