import {Card} from "@/Components/Card";
import {formatDate} from "@/lib/formatDate";
import Guest from "@/Layouts/GuestLayout";
import {SimpleLayout} from "@/Components/SimpleLayout";
import {Head} from "@inertiajs/react";

function Article({article}: { article: any }) {
    return (
        <article className="md:grid md:grid-cols-4 md:items-baseline">
            <Card className="md:col-span-3">
                <Card.Title href={`/articles/${article.slug}`}>
                    {article.title}
                </Card.Title>
                <Card.Eyebrow
                    as="time"
                    dateTime={article.created_at}
                    className="md:hidden"
                    decorate
                >
                    {formatDate(article.created_at)}
                </Card.Eyebrow>
                <Card.Description>{article.excerpt}</Card.Description>
                <Card.Cta>Read article</Card.Cta>
            </Card>
                <Card.Eyebrow
                    as="time"
                    dateTime={article.created_at}
                    className="mt-1 hidden md:block"
                >
                    {formatDate(article.created_at)}
                    <div className="uppercase mt-1">
                    <span
                        className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-teal-600 ring-1 ring-inset ring-teal-500/10">
                        {article.category.name}
                    </span>
                    </div>
                </Card.Eyebrow>
        </article>
    )
}

const ArticleList = ({articles}: { articles: any }) => {
    return (
        <>
            <Guest>
                <Head>
                    <title>Articles</title>
                </Head>
                <SimpleLayout
                    title="Writing on software design, company building, and the aerospace industry."
                    intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
                >
                    <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
                        <div className="flex max-w-3xl flex-col space-y-16">
                            {articles.map((article: any) => (
                                <Article key={article.slug} article={article}/>
                            ))}
                        </div>
                    </div>
                </SimpleLayout>
            </Guest>
        </>
    )
}
export default ArticleList
