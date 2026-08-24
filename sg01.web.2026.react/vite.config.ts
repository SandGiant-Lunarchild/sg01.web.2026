import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path'
//import { ctroenvPlugin } from "@ctroenv/vite"
//import { schema } from "./src/env.ts"

// https://vite.dev/config/
export default defineConfig({
    envPrefix: 'VITE_',
    envDir: import.meta.dirname,
    logLevel: 'info',
    plugins: [
        paraglideVitePlugin({
            project: './project.inlang',
            outdir: './src/paraglide',
            strategy: ['url'],
            urlPatterns: [
                {
                    pattern: '/:path(.*)?',
                    localized: [
                        ["nl", "/nl/:path(.*)?"],
                        ["en", "/:path(.*)?"],
                    ],
                },
            ],
        }),
        tailwindcss(),
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
        }),
        react(),
        // ctroenvPlugin({
        //      schema: schema,
        //      failOnError: false,
        // }),
    ],
    resolve: {
        alias: {
            '@': resolve(import.meta.dirname, './src'),
        }
    }
})
