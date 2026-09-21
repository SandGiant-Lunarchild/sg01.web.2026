import { createFileRoute, Link } from '@tanstack/react-router'
import { fetchArticles, type ArticleMetadata } from '@/services/articlesService';
import { m } from '@/paraglide/messages'

export const Route = createFileRoute('/articles/')({
    component: ArticleList,
    head: async () => ({ 
        meta: [{
            title: m.combined_title({ page_title: m["articles.page_title"]() })
        }]
    })
});

function ArticleMetaRow({ article }: { article: ArticleMetadata  }) {
    return (
        <div className="article-item">
            <h4><Link to="/articles/$slug" params={{ slug: article.slug }}>{article.title}</Link></h4>
            <div className="metadata">By {article.writer} on {article.time.toLocaleDateString()} {article.time.toLocaleTimeString()}</div>
        </div>
    );
}

function ArticleList() {
    const articles = fetchArticles();
    if (articles.error != null) {
        return (<div>Articles Not Found.</div>);
    }
    if (articles.data == null) {
        return (<p>Loading...</p>);
    }

    return (
        <div className="p-2">
            {articles.data?.map((f) => (
                <ArticleMetaRow key={f.time.toISOString()} article={f} />
            ))}
        </div>
    );
}
