import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { deLocalizeUrl, localizeUrl, type Locale, locales } from "./paraglide/runtime.js";

function isValidLocale(locale: string): locale is Locale {
    return locales.find((l) => l === locale) !== undefined;
}

function localizeUrlRemoveLocale(url: URL) {
    let locale = undefined;
    if (url.searchParams.has('locale')) {
        locale = url.searchParams.get('locale');
        url.searchParams.delete('locale');
        if (!isValidLocale(locale)) {
            locale = undefined;
        }
    }
    return localizeUrl(url, { locale });
}

// Create a new router instance
const router = createRouter({
    routeTree,
    rewrite: {
        input: ({ url }) => deLocalizeUrl(url),
        output: ({ url }) => localizeUrlRemoveLocale(url),
    }
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById('root');

if (rootElement != null && !rootElement.innerHTML) {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </StrictMode>,
    )
}
