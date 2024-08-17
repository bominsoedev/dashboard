import React, {useEffect, useState} from "react";
import axios from "axios";
import {Container} from "@/Components/Container";
import {ArrowLeftIcon} from "@heroicons/react/16/solid";
import {formatDate} from "@/lib/formatDate";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import {Head, usePage} from "@inertiajs/react";
import Markdown from "react-markdown";
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Breadcrumb from "@/Components/Breadcrumb";
import PerfectScrollbar from "react-perfect-scrollbar";

const Article = ({article}: { article: any }) => {
    const [markdown, setMarkdown] = useState<string>(article.content);
    const [html, setHtml] = useState<string>('');
    const goBack = () => {
        window.history.back(); // Uses the browser's history to navigate back
    };
    const convert = () => {
        axios.post('/markdown', {markdown})
            .then(response => {
                setHtml(response.data);
            });
    };
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
    useEffect(() => {
        const interval = setInterval(convert, 1000);
        return () => clearInterval(interval);
    }, [markdown]);
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
                                <header className="flex flex-col">
                                    <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
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
                                </header>
                                <PerfectScrollbar
                                    className="relative max-h-[630px] chat-conversation-box mt-5">
                                    <div
                                        className="mt-3 block w-full outline-none resize-none rounded-lg border-none bg-gray-100 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-gray-900 dark:text-white">
                                        <div id="html" className="dark:prose-invert prose"
                                             dangerouslySetInnerHTML={{__html: html}}></div>
                                    </div>
                                </PerfectScrollbar>
                            </article>
                        </div>
                    </div>
                </div>
            </Authenticated>
        </>
    )
}
export default Article
