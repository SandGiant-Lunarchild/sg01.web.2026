import { createRootRoute, HeadContent, Link, Outlet, redirect, useLocation, useMatches } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
    getLocale,
    locales,
    setLocale,
    shouldRedirect,
    localizeHref
} from '@/paraglide/runtime'

import { m } from '@/paraglide/messages'

const RootLayout = () => {
    const location = useLocation();
    const globalClassName = useMatches({
        select: (matches) => matches.map(m => m.staticData?.globalClassName).filter(m => m != null && m != "").join(" ")
    });

    return (
        <>
            <HeadContent />
            <div className="language-selection" style={{ position: 'absolute', right: '5px', top: '5px' }}>
                <a href={localizeHref(location.href, { locale: "en" })} className="[&.active]:font-bold">🇬🇧</a>
                {' '}
                <a href={localizeHref(location.href, { locale: "nl" })} className="[&.active]:font-bold">🇳🇱</a>
            </div>
            <main className={globalClassName}>
                <div className="main-centering">
                    <h2 className="site-title">
                        <Link to="/" title={m['home.page_title']()}>
                            SG_01 Lunarchild
                        </Link>
                    </h2>
                    <Outlet />
                </div>
            </main>
            <TanStackRouterDevtools />
        </>
    )
};

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
