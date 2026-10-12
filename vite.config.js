import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Politique de sécurité (CSP). Pas de 'unsafe-eval' ; 'unsafe-inline' pour le style
// uniquement car React pose des styles inline. Polices Google autorisées explicitement.
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "img-src 'self' data:",
  "font-src 'self' https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "script-src 'self'",
  "connect-src 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ')

// Injecte la CSP uniquement dans le build de production (le dev server a besoin
// de scripts inline pour le HMR, donc on ne l'applique pas en dev).
function securityMeta() {
  return {
    name: 'security-meta',
    apply: 'build',
    transformIndexHtml() {
      return [
        { tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP }, injectTo: 'head-prepend' },
        { tag: 'meta', attrs: { name: 'referrer', content: 'strict-origin-when-cross-origin' }, injectTo: 'head' },
      ]
    },
  }
}

// base: './' -> le build fonctionne depuis n'importe quel sous-dossier (GitHub Pages, Netlify, Vercel...)
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), securityMeta()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
  },
})