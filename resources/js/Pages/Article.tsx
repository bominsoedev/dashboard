//@ts-nocheck
import React, {useEffect, useState} from "react";
import axios from "axios";
import Guest from "@/Layouts/GuestLayout";
import {Container} from "@/Components/Container";
import {ArrowLeftIcon} from "@heroicons/react/16/solid";
import {formatDate} from "@/lib/formatDate";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import {Head} from "@inertiajs/react";
import Markdown from "react-markdown";
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

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

    useEffect(() => {
        const interval = setInterval(convert, 1000);
        return () => clearInterval(interval);
    }, [markdown]);
    return (
        <>
            <Guest>
                <Head>
                    <title>{article.title}</title>
                </Head>
                <Container className="mt-16 lg:mt-32">
                    <div className="xl:relative">
                        <div className="mx-auto max-w-2xl">

                            <button
                                type="button"
                                onClick={goBack}
                                aria-label="Go back to articles"
                                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
                            >
                                <ArrowLeftIcon
                                    className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"/>
                            </button>

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
                                <Markdown
                                    className={'mt-8 dark:prose-invert prose'}
                                    children={markdown}
                                    components={{
                                        code(props) {
                                            const {children, className, node, ...rest} = props
                                            const match = /language-(\w+)/.exec(className || '')
                                            return match ? (
                                                <SyntaxHighlighter
                                                    {...rest}
                                                    PreTag="div"
                                                    children={String(children).replace(/\n$/, '')}
                                                    language={match[1]}
                                                    style={dark}
                                                />
                                            ) : (
                                                <code {...rest} className={className}>
                                                    {children}
                                                </code>
                                            )
                                        }
                                    }}
                                />
                            </article>
                        </div>
                    </div>
                </Container>
            </Guest>
        </>
    )
}
export default Article
