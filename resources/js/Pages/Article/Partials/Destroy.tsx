//@ts-nocheck
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";
import React, {FormEventHandler, useState} from "react";
import {useForm} from "@inertiajs/react";
import {Inertia} from "@inertiajs/inertia";
import DangerButton from "@/Components/DangerButton";

const CreateOrEdit = ({article = null}: { article: any }) => {
    const [confirming, setConfirming] = useState(false);
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirm = () => {
        setConfirming(true);
    };
    const handleDelete: FormEventHandler = (e) => {
        e.preventDefault();
        Inertia.delete(route('articles.destroy-article', {
            article
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
            <button className={'flex items-center uppercase text-red-500'} onClick={confirm}>
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1}
                         stroke="currentColor" className="size-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                    </svg>
                    Destroy
                </>
            </button>
            <Modal show={confirming} onClose={closeModal}>
            <form onSubmit={handleDelete} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Destroy Article : {article.title}
                    </h2>

                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                       Do you really want to delete article <span className={'text-red-500 uppercase font-extrabold'}>{article.title}</span> ?.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <DangerButton className="ms-3 uppercase" disabled={processing}>
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1}
                                     stroke="currentColor" className="size-4 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                </svg>
                                Destroy Article
                            </>
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    )
}
export default CreateOrEdit
