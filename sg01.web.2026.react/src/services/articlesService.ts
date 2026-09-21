import { useQuery } from "@tanstack/react-query";
import { env } from "../env"
import { z } from "zod"

const ArticleMetadataSchema = z.object({
    slug: z.string().slugify(),
    writer: z.string(),
    time: z.coerce.date(),
    title: z.string()
});

export type ArticleMetadata = z.infer<typeof ArticleMetadataSchema>;

const ArticleContentSchema = z.object({
    metaData: ArticleMetadataSchema,
    content: z.string()
});

export type ArticleContent = z.infer<typeof ArticleContentSchema>;

class NonTransientError extends Error {
    constructor(message?: string, options?: ErrorOptions) {
        super(message, options);
    }
}

export function fetchArticles() {
    return useQuery({
        queryKey: ['articles'],
        queryFn: () => fetchArticlesInternal(),
        staleTime: 10000,
        retryDelay: 1000,
        retry: (failureCount, error) => {
            if (error instanceof NonTransientError) {
                return false;
            }
            return failureCount < 6;
        }
    });
}

async function fetchArticlesInternal() {
    try {
        if (env.VITE_APISERVER_URL == undefined || env.VITE_APISERVER_URL == "")
            throw new NonTransientError("VITE_APISERVER_URL is not defined in the environment variables");
        const response = await fetch(`${env.VITE_APISERVER_URL}/articles`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const articles = ArticleMetadataSchema.array().parse(data);
        return articles;
    }
    catch (error) {
        const errorMsg = error instanceof Error ? error.message : "There was an error";
        console.error("Failed to get articles: %s", errorMsg);
        throw error;
    }
}


export function fetchArticle(slug: string) {
    slug = z.string().slugify().parse(slug);
    return useQuery({
        queryKey: ['article', slug],
        queryFn: () => fetchArticleInternal(slug),
        staleTime: 10000,
        retryDelay: 1000
    });
}

async function fetchArticleInternal(slug: string) {
    try {
        const response = await fetch(`${env.VITE_APISERVER_URL}/articles/${slug}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const article = ArticleContentSchema.parse(data);
        return article;
    }
    catch (error) {
        const errorMsg = error instanceof Error ? error.message : "There was an error";
        console.error("Failed to get article: %s", errorMsg);
        throw error;
    }
}
