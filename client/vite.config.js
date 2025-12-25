import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'cloud-game-lb-1212165334.ap-south-1.elb.amazonaws.com'
    ]
  }
})
