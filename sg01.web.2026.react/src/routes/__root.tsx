import { createRootRoute, HeadContent, Link, Outlet, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import NavigationMenu from '../NaviationMenu'
import {
    getLocale,
    locales,
    setLocale,
    shouldRedirect,
} from '@/paraglide/runtime'

import { m } from '@/paraglide/messages'

const RootLayout = () => (
    <>
        <HeadContent />
        <NavigationMenu />
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
    </>
)

export const Route = createRootRoute({
    component: RootLayout,
    beforeLoad: async () => {
        document.documentElement.setAttribute('lang', getLocale());
        const decision = await shouldRedirect({ url: window.location.href })

        if (decision.redirectUrl) {
            throw redirect({ href: decision.redirectUrl.href })
        }
    },
    head: async () => ({
        meta: [{
            title: m.title().toString()
        }]
    }),
})
