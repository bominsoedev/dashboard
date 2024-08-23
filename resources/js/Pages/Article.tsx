//@ts-nocheck
import React, {useEffect, useState} from "react";
import axios from "axios";
import Guest from "@/Layouts/GuestLayout";
import {Container} from "@/Components/Container";
import {ArrowLeftIcon} from "@heroicons/react/16/solid";
import {formatDate} from "@/lib/formatDate";
import {Head} from "@inertiajs/react";
import PerfectScrollbar from "react-perfect-scrollbar";
import ReactDOMServer from "react-dom/server";

const Article = ({article}: { article: any }) => {
    const [markdown, setMarkdown] = useState<string>(article.content);
    const [html, setHtml] = useState<string>('');
    const [copy, setCopy] = useState<boolean>(false);

    const goBack = () => {
        window.history.back(); // Uses the browser's history to navigate back
    };
    const markdownToHtml = (markdown: string) => {
        const html = markdown
            .split('\n')
            .map((line) => {
                if (line.startsWith('```')) {
                    const language = line.replace('```', '').trim();
                    return `<pre><code class="language-${language}">`;
                }
                if (line === '```') {
                    return '</code></pre>';
                }
                return line;
            })
            .join('\n');

        return html.replace(
            /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
            (match: string, language: string, code: string) => {
                const codeBlock = (
                    <div className="flex justify-center">
                        <div className="w-[500px] relative">
                            <div
                                className="flex items-center relative text-[#b4b4b4] bg-[#2f2f2f] px-4 py-2 text-xs font-sans justify-between rounded-t-md">
                        <span>
                            {language}
                        </span>
                                <div className="flex items-center">
                                    {
                                        copy ? (<>
                                            <button
                                                className="flex gap-1 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                     viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="m4.5 12.75 6 6 9-13.5"/>
                                                </svg>
                                                Copied!
                                            </button>
                                        </>) : (
                                            <>
                                                <button
                                                    className="flex gap-1 items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         fill="none" viewBox="0 0 24 24"
                                                         className="size-4">
                                                        <path fill="currentColor"
                                                              fill-rule="evenodd"
                                                              d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z"
                                                              clip-rule="evenodd">
                                                        </path>
                                                    </svg>
                                                    Copy code
                                                </button>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                            <div
                                className="relative min-w-full max-h-[300px] chat-conversation-box">
                            <pre className={'mt-0 rounded-t-none rounded-b-md p-0'}>
                                <code
                                    className={`language-${language} block overflow-auto p-2 max-h-[300px]`}
                                    dangerouslySetInnerHTML={{__html: code}}
                                />
                            </pre>
                            </div>
                        </div>
                    </div>
                );

                return ReactDOMServer.renderToString(codeBlock);
            }
        );
    };

    useEffect(() => {
        axios.post('/markdown', {markdown})
            .then(response => {
                setHtml(response.data);
            });
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
                                className="group mb-8 flex h-10 w-10 items-center justify-center lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
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
                                {html && (
                                    <PerfectScrollbar
                                        className="relative min-w-full h-screen chat-conversation-box bg-gray-100 dark:bg-white/5 p-4 rounded prose dark:prose-invert"
                                        dangerouslySetInnerHTML={{__html: markdownToHtml(html)}}>
                                    </PerfectScrollbar>
                                )
                                }
                            </article>
                        </div>
                    </div>
                </Container>
            </Guest>
        </>
    )
}
export default Article
