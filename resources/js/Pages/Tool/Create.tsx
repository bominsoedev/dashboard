//@ts-nocheck
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head, useForm} from "@inertiajs/react";
import Breadcrumb from "@/Components/Breadcrumb";
import React, {FormEventHandler, useState} from "react";
import {Field, Label, Select} from "@headlessui/react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectMaster from "@/Components/SelectMaster";
import IconArrowUp from "@/Components/ArrowUp";


const Create = ({sections}: { sections: any }) => {
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        title: '',
        tools_section_id: sections[0]?.id,
        body: '',
    });
    const handleTool: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('tools.create-tool'), {
            preserveScroll: true,
            preserveState: false,
            onFinish: () => reset(),
        });
    };

    const menus = [
        {
            link: route('dashboard'),
            name: 'dashboard'
        },
        {
            link: route('tool.index'),
            name: 'tools'
        },
        {
            link: '',
            name: 'create tool'
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
                <div className="panel grid grid-cols-1 mt-5">
                    <div className="">
                        <form onSubmit={handleTool} encType={'multipart/form-data'} className="">
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
                                    <Label className="text-lg font-medium">Choose Section</Label>
                                    <SelectMaster providers={sections}
                                                  selectedProviderId={data.tools_section_id}
                                                  onChange={(id) => setData('tools_section_id', id)}/>
                                    <InputError message={errors.tools_section_id} className="mt-2"/>
                                </Field>
                            </div>
                            <Field className={'mt-3'}>
                                <Label
                                    className="font-medium text-lg">Description</Label>
                                <PerfectScrollbar
                                    className="relative max-h-[630px] chat-conversation-box">
                            <textarea
                                className={clsx(
                                    'mt-3 block w-full h-[500px] outline-none resize-none rounded-lg border-none bg-gray-100 dark:bg-white/5 p-3 text-sm/6 text-gray-900 dark:text-white'
                                )}
                                value={data.body}
                                placeholder={'Aa'}
                                onChange={(e) => setData('body', e.target.value)}
                            />
                                </PerfectScrollbar>
                                <InputError message={errors.body} className="mt-2"/>
                            </Field>
                            <div className="flex justify-end mt-3">
                                <PrimaryButton className="ms-3 uppercase" disabled={processing}>
                                    <IconArrowUp width={16} height={16}/>
                                    ADD Tool
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </Authenticated>
        </>
    )
}
export default Create
