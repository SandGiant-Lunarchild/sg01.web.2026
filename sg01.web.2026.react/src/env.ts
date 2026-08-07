import { defineEnv, string } from "@ctroenv/core"
import { viteSource } from "@ctroenv/vite"

export const schema = {
    VITE_APISERVER_URL: string()
};

export const env = defineEnv(schema, {
    source: viteSource(),
})
