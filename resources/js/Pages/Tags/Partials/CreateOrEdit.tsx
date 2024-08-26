//@ts-nocheck
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import React, {FormEventHandler, useState} from "react";
import {useForm} from "@inertiajs/react";
import IconArrowUp from "@/Components/ArrowUp";

const CreateOrEdit = ({edit = false, tag = null}: { edit: boolean, tag: any }) => {
    const [confirming, setConfirming] = useState(false);
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        tag: edit ? tag.name : '',
    });

    const confirm = () => {
        setConfirming(true);
    };
    const handleTag: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('tags.create-tag'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };
    const handleEditTag: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('tags.update-tag', {
            tag
        }), {
            preserveScroll: true,
            preserveState: true,
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
            <PrimaryButton onClick={confirm}>{edit ?
                (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1}
                             stroke="currentColor" className="size-3 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                        </svg>
                        Edit Tag
                    </>
                )
                : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1}
                             stroke="currentColor" className="size-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                        Add New Tag
                    </>
                )
            }</PrimaryButton>
            <Modal show={confirming} onClose={closeModal}>
                <form onSubmit={edit ? handleEditTag : handleTag} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {edit ? 'Update Tag' : 'Create Tag'}
                    </h2>

                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                        <span className={'font-bold'}>A Tag Short Description</span> is a brief summary or
                        explanation that gives an overview of a
                        tag. This description typically highlights the main purpose, features, or contents of the
                        tag, helping users quickly understand what the tag is about. It should be concise,
                        clear, and informative, usually consisting of one or two sentences.
                    </p>
                    <div className="mt-6">
                        <TextInput
                            id="tag"
                            type="tag"
                            name="tag"
                            value={data.tag}
                            onChange={(e) => setData('tag', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Aa"
                        />

                        <InputError message={errors.tag} className="mt-2"/>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <PrimaryButton className="ms-3 uppercase" disabled={processing}>
                            {edit ? (<>
                                    <IconArrowUp width={16} height={16}/>
                                    Update Tag
                                </>
                            ) : (
                                <>
                                    <IconArrowUp width={16} height={16}/>
                                    ADD Tag
                                </>
                            )}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    )
}
export default CreateOrEdit