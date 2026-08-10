import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import NavigationMenu from '../NaviationMenu'

const RootLayout = () => (
    <>
        <NavigationMenu />
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
    </>
)

export const Route = createRootRoute({ component: RootLayout })
