import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],


  // NEW FOR PROXI
  //server: {
    // this makes the frontend accessible on 172.26.4.3:5173
    //host:'0.0.0.0',
    
    // for backend
    //proxy: {
    //  '/api' : {
    //    target: 'http://localhost:3001',
    //    changeOrigin: true, 
    //  }
    //}
  //} 
})
