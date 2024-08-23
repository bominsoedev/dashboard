//@ts-nocheck
import React, {useEffect, useState} from "react";
import axios from "axios";
import {formatDate} from "@/lib/formatDate";
import {Head} from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Breadcrumb from "@/Components/Breadcrumb";
import hljs from "highlight.js";
import markdownToHtml from "@/Components/MarkdownEditor"; // Choose your preferred Highlight.js theme


const Article = ({article}: { article: any }) => {
    const [markdown, setMarkdown] = useState<string>(article.content);
    const [html, setHtml] = useState<string>('');
    useEffect(() => {
        axios.post('/markdown', {markdown})
            .then(response => {
                setHtml(response.data);
                setTimeout(() => {
                    document.querySelectorAll('pre code').forEach((block) => {
                        hljs.highlightElement(block as HTMLElement);
                    });
                }, 0);
            });
    }, [markdown]);
    const menus = [
        {
            link: route('dashboard'),
            name: 'dashboard'
        },
        {
            link: route('article.index'),
            name: 'articles'
        },
        {
            link: '',
            name: 'preview article'
        },
    ];
    return (
        <>
            <Authenticated>
                <Head>
                    <title>{article.title}</title>
                </Head>
                <div className="items-center">
                    <Breadcrumb menu={menus} className={''}/>
                </div>
                <div className="mt-5">
                    <div className="xl:relative">
                        <div className="mx-auto">
                            <article>
                                <div className="flex flex-col">
                                    <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
                                        {article.title}
                                    </h1>
                                    <time
                                        dateTime={article.created_at}
                                        className="order-first flex justify-between items-center text-base text-zinc-400 dark:text-zinc-500"
                                    >
                                        <div className="flex items-center">
                                            <div className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"/>
                                            <div className="ml-3">{formatDate(article.created_at)}</div>
                                        </div>
                                        <div className="uppercase mt-1">
                                            <span
                                                className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-teal-600 ring-1 ring-inset ring-teal-500/10">
                                                {article.category.name}
                                            </span>
                                        </div>
                                    </time>
                                </div>
                                <div className="max-w-6xl mx-auto">
                                    {
                                        article.attachment &&
                                        (
                                            <div className="my-5">
                                                <img
                                                    src={`/storage/${article.attachment.image_location}`}
                                                    alt="Feature Photo"
                                                    className="aspect-square rounded w-full !max-h-[400px] text-gray-300 object-cover"
                                                />
                                            </div>
                                        )
                                    }
                                    <div
                                        className="relative min-w-full h-screen chat-conversation-box bg-gray-100 dark:bg-white/5 p-4 rounded prose dark:prose-invert"
                                        dangerouslySetInnerHTML={{__html: markdownToHtml(html)}}>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </Authenticated>
        </>
    )
}
export default Article
