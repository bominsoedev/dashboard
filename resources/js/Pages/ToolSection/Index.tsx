import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head, useForm} from "@inertiajs/react";
import Breadcrumb from "@/Components/Breadcrumb";
import React, {FormEventHandler, useState} from "react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";
import {formatDate} from "@/lib/formatDate";
import PrimaryButton from "@/Components/PrimaryButton";
import CreateOrEdit from "@/Pages/ToolSection/Partials/CreateOrEdit";
import DangerButton from "@/Components/DangerButton";

const Index = ({toolSections}: { toolSections: any }) => {
    const menus = [
        {
            link: route('dashboard'),
            name: 'dashboard'
        }, {
            link: '',
            name: 'ToolSections'
        },
    ];
    const [confirming, setConfirming] = useState(false);

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        tool_section: '',
    });

    const confirm = () => {
        setConfirming(true);
    };
    const handleToolSections: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('tool_sections.create-tool_section'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };
    const closeModal = () => {
        setConfirming(false);

        reset();
    };
    return (
        <>
            <Authenticated>
                <Head>
                    <title>ToolSections</title>
                </Head>
                <div className="flex justify-between items-center">
                    <Breadcrumb menu={menus}/>
                    <CreateOrEdit edit={false} toolsSection={''}/>
                </div>
                <Modal show={confirming} onClose={closeModal}>
                    <form onSubmit={handleToolSections} className="p-6">

                        <div className="mt-6">
                            <TextInput
                                id="tool_section"
                                type="tool_section"
                                name="tool_section"
                                value={data.tool_section}
                                onChange={(e) => setData('tool_section', e.target.value)}
                                className="mt-1 block w-3/4"
                                isFocused
                                placeholder="Aa"
                            />

                            <InputError message={errors.tool_section} className="mt-2"/>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                            <PrimaryButton className="ms-3 uppercase" disabled={processing}>
                                ADD ToolSections
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
                <div className="">
                    <ul role="toolSections" className="">
                        {toolSections.map((tool_section: any) => {
                            return (
                                <div className="">
                                    < li key={tool_section.tool_sectionKey}
                                         className="flex justify-between bg-cover px-3 shadow-sm bg-gray-100 dark:bg-white/5 rounded mt-2 gap-x-6 py-3 hover:bg-gray-200 duration-300 dark:hover:bg-white/10">
                                        <div className="">
                                            <div className="flex-auto">
                                                <p className="text-sm font-semibold leading-6">Action</p>
                                                <div className="flex gap-2">
                                                    <CreateOrEdit edit={true} toolsSection={tool_section}/>
                                                    <DangerButton className={''}>
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth={1}
                                                                 stroke="currentColor" className="size-4 mr-1">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                                            </svg>
                                                            Destroy
                                                        </>
                                                    </DangerButton>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                            <div className="flex-auto">
                                                <p className="text-sm font-semibold leading-6">#ID</p>
                                                <p className="mt-1 truncate text-sm leading-5 text-gray-500">{tool_section.tools_sectionKey}</p>
                                            </div>
                                        </div>
                                        <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6">Category Name</p>
                                                <span
                                                    className="mt-1 in text-sm font-bold truncate leading-5 text-gray-500">{tool_section.name}</span>
                                                <span
                                                    className="ml-1 text-gray-400 dark:text-gray-500">@{tool_section.slug}</span>
                                            </div>
                                        </div>
                                        <div
                                            className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                            <p className="text-sm font-semibold leading-6">Created Date</p>
                                            <p className="mt-1 text-sm font-bold truncate leading-5 text-gray-500">
                                                <time
                                                    dateTime={tool_section.created_at}>{formatDate(tool_section.created_at)}</time>
                                            </p>
                                        </div>
                                        <div
                                            className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                            <p className="text-sm font-semibold leading-6">Updated Date</p>
                                            <p className="mt-1 text-sm font-bold truncate leading-5 text-gray-500">
                                                <time
                                                    dateTime={tool_section.created_at}>{formatDate(tool_section.updated_at)}</time>
                                            </p>
                                        </div>
                                        <div
                                            className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                            <p className="text-sm font-semibold leading-6">Author</p>
                                            <p className="mt-1 text-sm font-bold truncate leading-5 text-primary">
                                                {tool_section.user.name}
                                            </p>
                                        </div>
                                    </li>
                                </div>
                            )
                        })
                        }
                    </ul>
                </div>
            </Authenticated>
        </>
    )
}
export default Index
