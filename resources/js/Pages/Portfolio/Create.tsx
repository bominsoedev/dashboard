//@ts-nocheck
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Breadcrumb from "@/Components/Breadcrumb";
import React, { FormEventHandler, useState } from "react";
import { Field, Label } from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import { PhotoIcon } from "@heroicons/react/16/solid";
import SelectMaster from "@/Components/SelectMaster";
import TextInput from "@/Components/TextInput";

const Create = ({ tags }: { tags: any }) => {
    const [images, setImages] = useState<File[]>([]);
    const [imageSrcs, setImageSrcs] = useState<string[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        tag_id: tags[0]?.id,
        attachments: [],
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (files.length > 0) {
            const newImageSrcs: string[] = [];
            const newUploadProgress: number[] = [];

            files.forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target && typeof e.target.result === 'string') {
                        newImageSrcs.push(e.target.result);
                    }
                };
                reader.readAsDataURL(file);

                newUploadProgress.push(0);
                // Simulate upload progress
                setIsLoading(true);
                const simulateUpload = () => {
                    setUploadProgress((prevProgress) => {
                        const updatedProgress = [...prevProgress];
                        if (updatedProgress[index] < 100) {
                            updatedProgress[index] = Math.min(updatedProgress[index] + 10, 100);
                            return updatedProgress;
                        }
                        return updatedProgress;
                    });
                };
                const uploadInterval = setInterval(simulateUpload, 200);
                setTimeout(() => {
                    clearInterval(uploadInterval);
                    setIsLoading(false);
                }, 2000);
            });

            setImages(files);
            setImageSrcs(newImageSrcs);
            setData('attachments', files);
        }
    };

    const handleArticle: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('portfolios.create-portfolio'), {
            preserveScroll: true,
            preserveState: false,
            onFinish: () => reset(),
            headers: {
                'Accept': 'application/json',
            },
        });
    };

    const menus = [
        { link: route('dashboard'), name: 'dashboard' },
        { link: route('portfolios.portfolio'), name: 'portfolios' },
        { link: '', name: 'create portfolios' },
    ];

    return (
        <Authenticated>
            <Head>
                <title>Create Article</title>
            </Head>
            <div className="flex items-center w-full sm:w-auto h-[20px]">
                <Breadcrumb menu={menus} className="" />
            </div>
            <div className="grid grid-cols-1 gap-4">
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
                            <Label className="text-lg font-medium">Choose Tag</Label>
                            <SelectMaster providers={tags}
                                          selectedProviderId={data.tag_id}
                                          onChange={(id) => setData('tag_id', id)} />
                            <InputError message={errors.tag_id} className="mt-2" />
                        </Field>
                    </div>
                    <Field className="mt-3">
                        <Label className="text-lg font-medium">Featured Photos</Label>
                        <div className="mt-2 flex flex-col gap-4">
                            <div className="rounded border-dashed border-2 border-gray-300 dark:border-gray-800 p-5">
                                {images.length === 0 ? (
                                    <div className="text-center">
                                        <PhotoIcon aria-hidden="true" className="mx-auto h-16 w-16 text-gray-300" />
                                        <div className="mt-4 text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="image_name"
                                                className="relative cursor-pointer rounded-md font-semibold text-teal-600 hover:text-teal-500"
                                            >
                                                <span>Upload files</span>
                                                <input id="image_name" multiple name="image_name" type="file"
                                                       accept="image/*" className="sr-only"
                                                       onChange={handleFileChange} />
                                            </label>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 5MB</p>
                                    </div>
                                ) : (
                                    <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 space-y-2">
                                        {images.map((_, index) => (
                                            <div key={index} className="break-inside-avoid">
                                                <div className="relative">
                                                    {isLoading && uploadProgress[index] < 100 && (
                                                        <div className="flex items-center mb-4">
                                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                                <div className="bg-teal-600 h-2 rounded"
                                                                     style={{ width: `${uploadProgress[index]}%` }}>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="">
                                                        <button
                                                            type="button"
                                                            className="absolute top-0 left-0 bg-red-500 dark:bg-red-400 dark:text-white rounded-full p-1"
                                                            title="Clear Image"
                                                            onClick={() => {
                                                                setImages(images.filter((_, i) => i !== index));
                                                                setImageSrcs(imageSrcs.filter((_, i) => i !== index));
                                                            }}
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
                                                        <div className="text-sm leading-6 text-gray-600">
                                                            <img className="h-auto max-w-full rounded-lg"
                                                                 src={imageSrcs[index]}
                                                                 alt="Gallery image" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <InputError message={errors.attachments} className="mt-2" />
                            </div>
                            <div className="text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="image_name"
                                    className="relative cursor-pointer rounded font-semibold text-teal-600 hover:text-teal-500"
                                >
                                    <span>Upload new files</span>
                                    <input id="image_name" name="image_name" type="file"
                                           accept="image/*" className="sr-only"
                                           multiple onChange={handleFileChange} />
                                </label>
                            </div>
                        </div>
                    </Field>
                    <div className="flex justify-between items-center mt-3">
                        <PrimaryButton onClick={handleArticle} className="ms-3 uppercase" disabled={processing}>
                            ADD Portfolio
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Create;
