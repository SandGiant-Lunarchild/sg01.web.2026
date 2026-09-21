import { createFileRoute, Link } from '@tanstack/react-router'
import { m } from '../paraglide/messages'

export const Route = createFileRoute('/')({
    component: Index,
    staticData: {
        globalClassName: 'main-page'
    }
})

function Index() {
    return (
        <>
            <div>
                <Link to="/articles" className="[&.active]:font-bold" aria-label={m["articles.page_title"]()}>
                    {m["articles.page_title"]() }
                </Link>
            </div>
            <div>
                <Link to="/about" className="[&.active]:font-bold" aria-label={m["about.page_title"]()}>
                    { m["about.page_title"]() }
                </Link>
            </div>

            <div className="social">
                <a href="https://twitter.com/SG_01" title="Twitter"><i className="bi bi-twitter" aria-label="Twitter"></i></a>
                {' '}
                <a href="https://bsky.app/profile/sg-01.bsky.social" title="Bluesky"><i className="bi bi-bluesky" aria-label="Bluesky"></i></a>
                {' '}
                <a href="https://www.youtube.com/@SG_01" title="YouTube"><i className="bi bi-youtube" aria-label="YouTube"></i></a>
                {' '}
                <a href="https://github.com/SandGiant-Lunarchild" title="GitHub"><i className="bi bi-github" aria-label="GitHub"></i></a>
            </div>
        </>
    )
}
