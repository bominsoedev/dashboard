import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import Breadcrumb from "@/Components/Breadcrumb";
import React, {FormEventHandler, useState} from "react";
import {formatDate} from "@/lib/formatDate";
import DangerButton from "@/Components/DangerButton";
import CreateOrEdit from "@/Pages/Categories/Partials/CreateOrEdit";

const Index = ({categories}: { categories: any }) => {
    const menus = [
        {
            link: route('dashboard'),
            name: 'dashboard'
        }, {
            link: '',
            name: 'Categories'
        },
    ];

    const [edit, setEdit] = useState(false);
    return (
        <>
            <Authenticated>
                <Head>
                    <title>Categories</title>
                </Head>
                <div className="flex justify-between items-center">
                    <Breadcrumb menu={menus}/>
                    <CreateOrEdit edit={false} category={''}/>
                </div>

                <div className="">
                    <ul role="categories" className="">
                        {categories.map((category: any) => {
                            return (
                                <div className="">
                                    <li
                                        key={category.categoryKey}
                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 justify-between bg-cover px-3 shadow-sm bg-gray-100 dark:bg-white/5 rounded mt-2 gap-x-6 py-3 hover:bg-gray-200 duration-300 dark:hover:bg-white/10"
                                    >
                                        <div className="sm:col-span-2 lg:col-span-1">
                                            <div className="flex-auto">
                                                <p className="text-sm font-semibold leading-6">Action</p>
                                                <div className="flex gap-2">
                                                    <CreateOrEdit edit={true} category={category}/>
                                                    <DangerButton>
                                                        <>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={1}
                                                                stroke="currentColor"
                                                                className="size-4 mr-1"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                                />
                                                            </svg>
                                                            Destroy
                                                        </>
                                                    </DangerButton>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="hidden sm:flex sm:col-span-1 lg:col-span-1 sm:flex-col sm:items-end">
                                            <div className="flex-auto">
                                                <p className="text-sm font-semibold leading-6">#ID</p>
                                                <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                                                    {category.categoryKey}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-span-1 lg:col-span-1 sm:flex sm:flex-col sm:items-end">
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6">Category Name</p>
                                                <span
                                                    className="mt-1 text-sm font-bold truncate leading-5 text-gray-500">
                                                    {category.name}
                                                </span>
                                                <span className="ml-1 text-gray-400 text-xs dark:text-gray-500">
                                                    @{category.slug}
                                                </span>
                                            </div>
                                        </div>

                                        <div
                                            className="hidden sm:flex sm:col-span-1 lg:col-span-1 sm:flex-col sm:items-end">
                                            <p className="text-sm font-semibold leading-6">Created Date</p>
                                            <p className="mt-1 text-sm font-bold truncate leading-5 text-gray-500">
                                                <time dateTime={category.created_at}>
                                                    {formatDate(category.created_at)}
                                                </time>
                                            </p>
                                        </div>

                                        <div
                                            className="hidden sm:flex sm:col-span-1 lg:col-span-1 sm:flex-col sm:items-end">
                                            <p className="text-sm font-semibold leading-6">Updated Date</p>
                                            <p className="mt-1 text-sm font-bold truncate leading-5 text-gray-500">
                                                <time dateTime={category.updated_at}>
                                                    {formatDate(category.updated_at)}
                                                </time>
                                            </p>
                                        </div>

                                        <div
                                            className="hidden sm:flex sm:col-span-1 lg:col-span-1 sm:flex-col sm:items-end">
                                            <p className="text-sm font-semibold leading-6">Author</p>
                                            <p className="mt-1 text-sm font-bold truncate leading-5 text-primary">
                                                {category.user.name}
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
