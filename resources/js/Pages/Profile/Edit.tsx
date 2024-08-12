import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import {Head} from '@inertiajs/react';
import {PageProps} from '@/types';
import PerfectScrollbar from "react-perfect-scrollbar";

export default function Edit({auth, mustVerifyEmail, status}: PageProps<{
    mustVerifyEmail: boolean,
    status?: string
}>) {
    return (
        <AuthenticatedLayout
        >
            <Head title="Profile"/>
            <PerfectScrollbar
                className="relative max-h-[730px] chat-conversation-box">
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
