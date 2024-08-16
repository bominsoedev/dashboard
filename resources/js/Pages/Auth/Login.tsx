//@ts-nocheck
import React, { FormEventHandler } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import {Container} from "@/Components/Container";

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head>
                <title>Login</title>
                <meta
                    name="description"
                    content="Software I use, gadgets I love, and other things I recommend."
                />
            </Head>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <Container className={'mt-24 md:mt-28 h-screen'}>
                <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20">
                    <div className="flex flex-col">
                        <form className={'rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40'}
                              onSubmit={submit}>
                            <h2 className="flex text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                <span className="ml-3">Login</span>
                            </h2>
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                                Get notified when I publish something new, and unsubscribe at any time.
                            </p>
                            <div>
                                <InputLabel htmlFor="email" value="Email"/>

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                <InputError message={errors.email} className="mt-2"/>
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="password" value="Password"/>

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />

                                <InputError message={errors.password} className="mt-2"/>
                            </div>

                            <div className="block mt-4">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                                </label>
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}

                                <PrimaryButton className="ms-4" disabled={processing}>
                                    Log in
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </GuestLayout>
    );
}
