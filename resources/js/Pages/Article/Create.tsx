import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head, useForm} from "@inertiajs/react";
import Breadcrumb from "@/Components/Breadcrumb";
import React, {ChangeEvent, FormEventHandler, useCallback, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {Field, Label, Select} from "@headlessui/react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectMaster from "@/Components/SelectMaster";
import convertFileSize from "@/lib/convertFileSize";
import {PhotoIcon} from "@heroicons/react/16/solid";


const Create = ({categories}: { categories: any }) => {
    const [markdown, setMarkdown] = useState<string>();
    const [html, setHtml] = useState<string>('');
    const [image, setImage] = useState<any>(null);
    const [imageSrc, setImageSrc] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
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

    const content = (e) => {
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
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
            data.attachments = file.name
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
                    <Breadcrumb menu={menus}/>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="panel col-span-2">
                        <form onSubmit={handleArticle} encType={'multipart/form-data'} className="">
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
                                    className="mt-2 flex justify-center rounded-lg border-dashed border-2 border-gray-300 dark:border-gray-800 py-5">
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
                                                            className="relative cursor-pointer rounded-md font-semibold text-teal-600 hover:text-teal-500"
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
                                <PerfectScrollbar
                                    className="relative max-h-[630px] chat-conversation-box">
                            <textarea
                                id="markdown"
                                className={clsx(
                                    'mt-3 block w-full h-[500px] outline-none resize-none rounded-lg border-none bg-gray-100 dark:bg-white/5 p-3 text-sm/6 text-gray-900 dark:text-white'
                                )}
                                value={data.body}
                                placeholder={'Aa'}
                                onChange={(e) => content(e)}
                            />
                                </PerfectScrollbar>
                                <InputError message={errors.body} className="mt-2"/>
                            </Field>
                            <div className="flex justify-end mt-3">
                                <PrimaryButton className="ms-3 uppercase" disabled={processing}>
                                    ADD Article
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                    <div className="panel">
                        <span className={'text-lg'}>Description Preview</span>
                        <PerfectScrollbar
                            className="relative max-h-[630px] chat-conversation-box">
                            <div
                                className="mt-3 block w-full outline-none resize-none rounded-lg border-none bg-gray-100 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-gray-900 dark:text-white">
                                <div id="html" className="dark:prose-invert prose "
                                     dangerouslySetInnerHTML={{__html: html}}></div>
                            </div>
                        </PerfectScrollbar>
                    </div>
                </div>
            </Authenticated>
        </>
    )
}
export default Create
