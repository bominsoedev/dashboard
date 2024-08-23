import PerfectScrollbar from "react-perfect-scrollbar";
import ReactDOMServer from "react-dom/server";
import React, {useState} from "react";

const markdownToHtml = (markdown: string) => {
    const [copy, setCopy] = useState<boolean>(false);

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
                        <PerfectScrollbar
                            className="relative min-w-full max-h-[300px] chat-conversation-box">
                            <pre className={'mt-0 rounded-t-none rounded-b-md p-0'}>
                                <code
                                    className={`language-${language} block overflow-auto p-2 max-h-[300px]`}
                                    dangerouslySetInnerHTML={{__html: code}}
                                />
                            </pre>
                        </PerfectScrollbar>
                    </div>
                </div>
            );

            return ReactDOMServer.renderToString(codeBlock);
        }
    );
};

export default markdownToHtml
