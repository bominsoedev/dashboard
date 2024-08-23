//@ts-nocheck
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head, useForm} from "@inertiajs/react";
import Breadcrumb from "@/Components/Breadcrumb";
import React, {FormEventHandler, useEffect, useState} from "react";
import axios from "axios";
import {Field, Label} from "@headlessui/react";
import clsx from "clsx";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectMaster from "@/Components/SelectMaster";
import convertFileSize from "@/lib/convertFileSize";
import {PhotoIcon} from "@heroicons/react/16/solid";
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import Toggle from "@/Components/Toggle";
import ReactDOMServer from "react-dom/server";
import PerfectScrollbar from "react-perfect-scrollbar";


const Create = ({categories}: { categories: any }) => {
    const [markdown, setMarkdown] = useState<string>("");
    const [html, setHtml] = useState<string>('');
    const [image, setImage] = useState<any>(null);
    const [imageSrc, setImageSrc] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const [copy, setCopy] = useState<boolean>(false);
    const convert = () => {
        axios.post('/markdown', {markdown})
            .then(response => {
                setHtml(response.data);
                setTimeout(() => {
                    document.querySelectorAll('pre code').forEach((block) => {
                        hljs.highlightElement(block as HTMLElement);
                    }, 0);
                })
            });
    };
    useEffect(() => {
        const handleShortcut = (e: KeyboardEvent) => {
            if (e.metaKey && e.key === '/') {
                setShowPreview(prev => !prev);
                convert();
            }
        };

        window.addEventListener('keydown', handleShortcut);

        return () => {
            convert();
            window.removeEventListener('keydown', handleShortcut);
        };
    }, [markdown, showPreview]);
    const content = (e: any) => {
        setData('body', e.target.value)
        setMarkdown(e.target.value)
    }
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        title: '',
        category_id: categories[0]?.id,
        attachments: '',
        body: '',
    });
    const togglePreview = () => {
        setShowPreview((prev) => !prev);
        convert()
    };
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
            setData('attachments', file)
            setImage(file);
            // Simulate upload progress
            setIsLoading(true);
            setUploadProgress(0);
            const simulateUpload = () => {
                if (uploadProgress < 100) {
                    setUploadProgress((prevProgress) => Math.min(prevProgress + 10, 100));
                }
            };
            const uploadInterval = setInterval(simulateUpload, 200);
            setTimeout(() => {
                clearInterval(uploadInterval);
                setIsLoading(false);
            }, 2000);
        }
    };
    const handleArticle: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('articles.create-article'), {
            preserveScroll: true,
            preserveState: false,
            onFinish: () => reset(),
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
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
                        <div className="w-[700px] relative">
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
                            <pre className={'mt-0 rounded-t-none rounded-b-md p-0'}>
                                <code
                                    className={`language-${language} block overflow-auto p-2 max-h-[300px]`}
                                >
                            <PerfectScrollbar
                                className="relative max-h-[300px] chat-conversation-box"
                                dangerouslySetInnerHTML={{__html: code}}>
                            </PerfectScrollbar>
                                </code>
                            </pre>
                        </div>
                    </div>
                );

                return ReactDOMServer.renderToString(codeBlock);
            }
        );
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
            name: 'create article'
        },
    ];
    return (
        <>
            <Authenticated>
                <Head>
                    <title>
                        Create Article
                    </title>
                </Head>
                <div className="items-center">
                    <Breadcrumb menu={menus} className={''}/>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-4">
                    <div className="panel col-span-2">
                        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-2">
                            <Field>
                                <Label className="font-medium text-lg">Title</Label>
                                <TextInput
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder={'Aa'}
                                />
                                <InputError message={errors.title} className="mt-2"/>
                            </Field>
                            <Field>
                                <Label className="text-lg font-medium">Choose Category</Label>
                                <SelectMaster providers={categories}
                                              selectedProviderId={data.category_id}
                                              onChange={(id) => setData('category_id', id)}/>
                                <InputError message={errors.category_id} className="mt-2"/>
                            </Field>
                        </div>
                        <Field className={'mt-3'}>
                            <Label className="text-lg font-medium"> Featured Photo</Label>
                            <div
                                className="mt-2 flex justify-center rounded border-dashed border-2 border-gray-300 dark:border-gray-800 py-5">
                                {
                                    image == null ?
                                        <div className="text-center">
                                            <PhotoIcon aria-hidden="true"
                                                       className="mx-auto h-16 w-16 text-gray-300"/>
                                            <div className="mt-4 text-sm leading-6 text-gray-600">
                                                <label
                                                    htmlFor="image_name"
                                                    className="relative cursor-pointer rounded-md font-semibold text-teal-600 hover:text-teal-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input id="image_name" name="image_name" type="file"
                                                           accept="image/*" className="sr-only"
                                                           onChange={handleFileChange}/>
                                                </label>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to
                                                5MB</p>
                                        </div>
                                        :
                                        <>
                                            <div className="text-center">
                                                {isLoading ? (
                                                        <div className="flex items-center mb-4">
                                                            <div
                                                                className="w-full bg-gray-200 rounded-full h-2">
                                                                <div
                                                                    className="bg-teal-600 h-2 rounded"
                                                                    style={{width: `${uploadProgress}%`}}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    ) :
                                                    (
                                                        <>

                                                            <div
                                                                className="custom-file-container__image-preview relative">
                                                                <button
                                                                    type="button"
                                                                    className="custom-file-container__image-clear bg-dark-light dark:bg-dark dark:text-white-dark rounded-full block w-fit p-0.5 absolute top-0 left-0"
                                                                    title="Clear Image"
                                                                    onClick={() => setImage(null)}
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="12"
                                                                        height="12"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="1.5"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    >
                                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                                    </svg>
                                                                </button>
                                                                <img src={imageSrc}
                                                                     className={'mx-auto w-full !max-h-48 text-gray-300'}
                                                                     alt="Logo"/>
                                                            </div>
                                                            <div className="text-sm leading-6 text-gray-600">
                                                                <div className="my-2">
                                                                    {image.name}
                                                                </div>
                                                                <div
                                                                    className="text-primary font-extrabold text-lg mt-3">
                                                                    {convertFileSize(image.size)}
                                                                </div>
                                                            </div>
                                                        </>
                                                    )

                                                }
                                                <div className="mt-2 text-sm leading-6 text-gray-600">
                                                    <label
                                                        htmlFor="image_name"
                                                        className="relative cursor-pointer rounded font-semibold text-teal-600 hover:text-teal-500"
                                                    >
                                                        <span>Upload new file</span>
                                                        <input id="image_name" name="image_name" type="file"
                                                               accept="image/*" className="sr-only"
                                                               onChange={handleFileChange}/>
                                                    </label>
                                                </div>
                                            </div>
                                        </>

                                }
                                <InputError message={errors.attachments} className="mt-2"/>
                            </div>
                        </Field>
                        <Field className={'mt-3'}>
                            <Label
                                className="font-medium text-lg">Description</Label>
                            <div>
                                {
                                    showPreview ?
                                        (
                                            <PerfectScrollbar
                                                className="relative min-w-full min-h-[400px] max-h-[400px] chat-conversation-box bg-gray-100 dark:bg-white/5 p-4 rounded prose dark:prose-invert"
                                                dangerouslySetInnerHTML={{__html: markdownToHtml(html)}}>
                                            </PerfectScrollbar>
                                        ) :
                                        (
                                            <textarea
                                                className={clsx(
                                                    'block w-full h-[400px] outline-none resize-none rounded border-none bg-gray-100 dark:bg-white/5 p-3 text-sm/6 text-gray-900 dark:text-white'
                                                )}
                                                value={markdown}
                                                onChange={(e) => content(e)}
                                                placeholder="Write your description here..."
                                            />
                                        )
                                }
                            </div>
                            <InputError message={errors.body} className="mt-2"/>
                        </Field>
                        <div className="flex justify-between items-center mt-3">
                            <div className="">
                                <div className="flex gap-2">
                                    <Toggle name={'Preview'} checked={showPreview} onChange={togglePreview}
                                            key={undefined}/>
                                    <label htmlFor="Preview" className={'uppercase'}>Preview</label>
                                </div>
                                {
                                    showPreview ? (
                                            <>
                                                <label className={'text-xs flex items-center gap-1'} htmlFor="">
                                                    <div className={'bg-red-500 text-lg w-2 h-2 rounded-full'}></div>
                                                    Press <span className={'text-primary font-bold'}>Cmd + /</span> to
                                                    quickly
                                                    toggle between Markdown and Preview mode.
                                                </label>
                                            </>
                                        ) :
                                        (
                                            <label className="text-xs flex items-center gap-1">
                                                <div className={'bg-red-500 text-lg w-2 h-2 rounded-full'}></div>
                                                You may use Markdown
                                                with <a
                                                target={'_blank'}
                                                href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
                                                className={'text-primary text-wrap'}>GitHub-flavored</a> code blocks.
                                            </label>
                                        )
                                }
                            </div>
                            <div className="">
                                <PrimaryButton onClick={handleArticle} className="ms-3 uppercase" disabled={processing}>
                                    ADD Article
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </Authenticated>
        </>
    )
}
export default Create
