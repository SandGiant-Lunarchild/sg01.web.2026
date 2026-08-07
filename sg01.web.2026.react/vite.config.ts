import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import { ctroenvPlugin } from "@ctroenv/vite"
//import { schema } from "./src/env.ts"

// https://vite.dev/config/
export default defineConfig({
        envPrefix: 'VITE_',
        envDir: import.meta.dirname,
        logLevel: 'info',
        plugins: [
            react(),
            // ctroenvPlugin({
            //      schema: schema,
            //      failOnError: false,
            // }),
        ],
    })
