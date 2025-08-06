import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets:
      ['favicon.svg','favicon.ico','robots.txt','apple-touch-icon.png'],
      manifest:{
        name:'CardioPrep-AI',
        short_name: 'CardioPrep',
        description:'Offline MRCP Cardiology Quiz with AI',
        theme_color:'#D81B60',
        background_color: '#F8BBD0',
        display:'standalone',
        start_url:'/',
        icons:[
          {
            src:'pwa-192x192.png',
            sizes:'192x192',
            type:'image/png'
          },
          {
            src:'pwa-512x512.png',
            sizes:'512x512',
            type:'image/png'
          },
          {
            src:'pwa-512x512.png',
            sizes: '512x512',
            type:'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      devOptions:{
        enabled:true,
      }
    })
  ],
})
