import { createFileRoute } from '@tanstack/react-router'
import { m } from '@/paraglide/messages'

export const Route = createFileRoute('/about')({
    component: About,
    head: async () => ({
        meta: [
            {
                title: m.combined_title({ page_title: m["about.page_title"]() })
            }
        ]
    })
})

function About() {
    return <div className="p-2">Hello from About!</div>
}
