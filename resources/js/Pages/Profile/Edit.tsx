//@ts-nocheck
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import {Head} from '@inertiajs/react';
import {PageProps} from '@/types';
import PerfectScrollbar from "react-perfect-scrollbar";
import Breadcrumb from "@/Components/Breadcrumb";
import React from "react";

export default function Edit({auth, mustVerifyEmail, status}: PageProps<{
    mustVerifyEmail: boolean,
    status?: string
}>) {
    const menus = [
        {
            link: route('dashboard'),
            name: 'dashboard'
        }, {
            link: '',
            name: 'profile'
        },
    ];
    return (
        <AuthenticatedLayout
        >
            <Head title="Profile"/>
            <div className="flex items-center w-full sm:w-auto">
                <Breadcrumb menu={menus} className={''}/>
            </div>
            <PerfectScrollbar
                className="relative max-h-[730px] chat-conversation-box mt-5">
                <div className="space-y-3">
                    <div className="panel">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="panel">
                        <UpdatePasswordForm className="max-w-xl"/>
                    </div>

                    <div className="panel">
                        <DeleteUserForm className="max-w-xl"/>
                    </div>
                </div>
            </PerfectScrollbar>

        </AuthenticatedLayout>
    );
}
