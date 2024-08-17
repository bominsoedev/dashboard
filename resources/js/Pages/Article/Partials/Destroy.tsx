import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import React, {FormEventHandler, useState} from "react";
import {useForm} from "@inertiajs/react";
import IconArrowUp from "@/Components/ArrowUp";
import {Inertia} from "@inertiajs/inertia";

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
            <PrimaryButton onClick={confirm}>
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1}
                         stroke="currentColor" className="size-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>
                    Destroy
                </>
            </PrimaryButton>
            <Modal show={confirming} onClose={closeModal}>
                <form onSubmit={handleDelete} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Destroy Article : {article.title}
                    </h2>

                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                        <span className={'font-bold'}>A Category Short Description</span> is a brief summary or
                        explanation that gives an overview of a
                        category. This description typically highlights the main purpose, features, or contents of the
                        category, helping users quickly understand what the category is about. It should be concise,
                        clear, and informative, usually consisting of one or two sentences.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <PrimaryButton className="ms-3 uppercase" disabled={processing}>
                            <>
                                Destroy Article
                            </>
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    )
}
export default CreateOrEdit
