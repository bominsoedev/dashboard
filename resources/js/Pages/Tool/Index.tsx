//@ts-nocheck
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head, Link} from "@inertiajs/react";
import Breadcrumb from "@/Components/Breadcrumb";
import PerfectScrollbar from "react-perfect-scrollbar";
import {Container} from "@/Components/Container";
import React, {useEffect, useState} from "react";
import {Button} from "@/Components/Button";
import Destroy from "@/Pages/Article/Partials/Destroy";
import {formatDate} from "@/lib/formatDate";
import TextInput from "@/Components/TextInput";

const Index = ({tools}: { tools: any }) => {
    const [filteredItems, setFilteredItems] = useState<any>(tools);
    const [search, setSearch] = useState<any>('');
    useEffect(() => {
        setFilteredItems(() => {
            return tools.data.filter((item: any) => {
                return item.title.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, tools]);
    const menus = [
        {
            link: route('dashboard'),
            name: 'dashboard'
        }, {
            link: '',
            name: 'tools'
        },
    ];
    return (
        <>
            <Authenticated>
                <Head>
                    <title>
                        Tool
                    </title>
                </Head>
                <div className="flex justify-between items-center w-full sm:w-auto h-[20px]">
                    <Breadcrumb menu={menus} className={''}/>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                            <div className="relative">
                                <div className="flex sm:gap-5 gap-3">
                                    <TextInput id={'search'} name={'search'}
                                               placeholder={'Search'}
                                               className={'ltr:pr-9 rtl:pl-9 mt-0'}
                                               value={search} onChange={(e) => setSearch(e.target.value)}/>
                                    <div
                                        className="absolute ltr:right-7 rtl:left-7 top-[7px] -translate-y-1/2">
                                        <svg className="absolute text-slate-400 h-5 w-5" viewBox="0 0 20 20"
                                             fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <Button href={'/session/admin/tools/create_tool'}>
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1}
                                         stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                                    </svg>
                                    Add New Tool
                                </>
                            </Button>
                        </div>
                    </div>
                </div>
                <PerfectScrollbar
                    className="relative min-h-[650px] chat-conversation-box">
                    {filteredItems.length ? (
                        <>
                            {filteredItems.map((tool: any) => {
                                return (
                                    <ul role={tool.toolKey} className="">
                                        <div className="">
                                            <li
                                                key={tool.toolKey}
                                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 justify-between bg-cover px-3 shadow-sm bg-gray-100 dark:bg-white/5 rounded mt-2 gap-x-6 py-3 hover:bg-gray-200 duration-300 dark:hover:bg-white/10 divide-x divide-dark gap-4"
                                            >
                                                <div
                                                    className="sm:col-span-2 lg:col-span-1 items-start">
                                                    <div className="">
                                                        <p className="text-sm font-semibold leading-6 uppercase">Action</p>
                                                        <div className="flex gap-2">
                                                            {/*<Destroy tool={tool}/>*/}
                                                            {/*<Link className={'btn-warning uppercase rounded btn btn-sm'}*/}
                                                            {/*      href={`/session/admin/tools/${tool.slug}`}>*/}
                                                            {/*    SHOW*/}
                                                            {/*</Link>*/}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="hidden sm:flex sm:col-span-1 lg:col-span-1 sm:flex-col sm:items-start px-3">
                                                    <div className="">
                                                        <p className="text-sm font-semibold leading-6 uppercase">#ID</p>
                                                        <p className="mt-1 truncate text-sm leading-5 text-gray-500 text-wrap">
                                                            {tool.toolKey}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div
                                                    className="col-span-1 lg:col-span-2 sm:flex sm:flex-col sm:items-start pl-3">
                                                    <div className="min-w-0  justify-start">
                                                        <p className="text-sm font-semibold leading-6 uppercase">Title</p>
                                                        <div
                                                            className="mt-1 text-sm font-bold truncate leading-5 text-gray-500 text-wrap">
                                                            {tool.title}
                                                        </div>
                                                        <span
                                                            className="ml-1 text-gray-400 text-xs dark:text-gray-500 text-wrap">
                                                    @{tool.slug}
                                                </span>
                                                    </div>
                                                </div>

                                                <div
                                                    className="hidden sm:flex sm:col-span-1 lg:col-span-1 sm:flex-col sm:items-start pl-3">
                                                    <p className="text-sm font-semibold leading-6 uppercase">Created
                                                        Date</p>
                                                    <p className="mt-1 text-sm font-bold truncate leading-5 text-gray-500">
                                                        <time dateTime={tool.created_at}>
                                                            {formatDate(tool.created_at)}
                                                        </time>
                                                    </p>
                                                </div>

                                                <div
                                                    className="hidden sm:flex sm:col-span-1 lg:col-span-1 sm:flex-col sm:items-start pl-3">
                                                    <p className="text-sm font-semibold leading-6 uppercase">Updated
                                                        Date</p>
                                                    <p className="mt-1 text-sm font-bold truncate leading-5 text-gray-500">
                                                        <time dateTime={tool.updated_at}>
                                                            {formatDate(tool.updated_at)}
                                                        </time>
                                                    </p>
                                                </div>
                                                <div
                                                    className="hidden sm:flex sm:col-span-1 lg:col-span-1 sm:flex-col sm:items-start pl-3">
                                                    <p className="text-sm font-semibold leading-6 uppercase">Section</p>
                                                    <div
                                                        className="mt-1 text-sm font-bold truncate leading-5 text-gray-500 text-wrap">
                                                        {tool.section.name}
                                                    </div>
                                                    <span
                                                        className="ml-1 text-gray-400 text-xs dark:text-gray-500 text-wrap">
                                                    @{tool.section.slug}
                                                </span>
                                                </div>
                                                <div
                                                    className="hidden sm:flex sm:col-span-1 lg:col-span-1 sm:flex-col sm:items-start pl-3">
                                                    <p className="text-sm font-semibold leading-6 uppercase">Author</p>
                                                    <p className="mt-1 text-sm font-bold truncate leading-5 text-primary">
                                                        {tool.user.name}
                                                    </p>
                                                </div>
                                            </li>
                                        </div>
                                    </ul>
                                )
                            })
                            }
                        </>
                    ) : ''}
                </PerfectScrollbar>
            </Authenticated>
        </>
    )
}

export default Index
