import { createFileRoute, notFound } from "@tanstack/react-router";
import { fetchArticle } from "@/services/articlesService";


export const Route = createFileRoute('/articles/$slug')({
    component: ArticleContent,
});

function ArticleContent() {
    const { slug } = Route.useParams();

    const { data, error } = fetchArticle(slug);

    if (error != null) {
        return (<div>Page not found.</div>);
    }
    if (data == null) {
        return (<p>Loading...</p>);
    }

    return (
        <>
            <h2>{data.metaData.title}</h2>
            <div className="metadata">By {data.metaData.writer} on {data.metaData.time.toLocaleDateString()} {data.metaData.time.toLocaleTimeString()}</div>
            <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
        </>
    );
}

export default Route;