import { Link, useLocation } from "@tanstack/react-router";
import { m } from '@/paraglide/messages';
import { localizeHref } from "@/paraglide/runtime";

function NavigationMenu() {
    const location = useLocation();
    return (
        <>
            <div className="p-2 flex gap-2">
                <Link to="/" className="[&.active]:font-bold" activeOptions={{ exact: true }}>
                    {m["home.page_title"]()}
                </Link>{' '}
                <Link to="/weather" className="[&.active]:font-bold">
                    Weather
                </Link>{' '}
                <Link to="/about" className="[&.active]:font-bold">
                    About
                </Link>
                <span style={{ marginLeft: 'auto' }}>
                    {' '}
                </span>
                <span className="justify-self-end self-end text-end">
                    <a href={localizeHref(location.href, { locale: "en" })} className="[&.active]:font-bold">🇬🇧</a>
                    {' '}
                    <a href={localizeHref(location.href, { locale: "nl" })} className="[&.active]:font-bold">🇳🇱</a>
                </span>
            </div>
        </>
    );
}

export default NavigationMenu;