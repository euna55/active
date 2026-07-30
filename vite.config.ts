import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Actions에서 빌드할 때는 /active/ (GitHub Pages 경로)
// Vercel / 로컬에서는 / (루트)
const base = process.env.GITHUB_ACTIONS ? '/active/' : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
