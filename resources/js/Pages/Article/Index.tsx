//@ts-nocheck
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head, Link} from "@inertiajs/react";
import Breadcrumb from "@/Components/Breadcrumb";
import PerfectScrollbar from "react-perfect-scrollbar";
import React, {useEffect, useState} from "react";
import {Button} from "@/Components/Button";
import TextInput from "@/Components/TextInput";
import {formatDate} from "@/lib/formatDate";
import Destroy from "@/Pages/Article/Partials/Destroy";

const Index = ({articles}: { articles: any }) => {
    const [filteredItems, setFilteredItems] = useState<any>(articles);
    const [search, setSearch] = useState<any>('');
    useEffect(() => {
        setFilteredItems(() => {
            return articles.data.filter((item: any) => {
                return item.title.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, articles]);

    const menus = [
        {
            link: route('dashboard'),
            name: 'dashboard'
        }, {
            link: '',
            name: 'articles'
        },
    ];
    return (
        <>
            <Authenticated>
                <Head>
                    <title>
                        Article
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
                            <Button href={'/session/admin/articles/create_article'}>
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1}
                                         stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                                    </svg>
                                    Add New Article
                                </>
                            </Button>
                        </div>
                    </div>
                </div>
                <PerfectScrollbar
                    className="relative min-h-[650px] chat-conversation-box">
                    {filteredItems.length ? (
                        <>
                            {filteredItems.map((article: any) => {
                                return (
                                    <ul role={article.articles_sectionKey} className="">
                                        <div className="">
                                            <li
                                                key={article.articleKey}
                                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 justify-between bg-cover px-3 shadow-sm bg-gray-100 dark:bg-white/5 rounded mt-2 gap-x-6 py-3 hover:bg-gray-200 duration-300 dark:hover:bg-white/10 divide-x divide-dark gap-4"
                                            >
                                                <div
                                                    className="sm:col-span-2 lg:col-span-1 items-start">
                                                    <div className="">
                                                        <p className="text-sm font-semibold leading-6 uppercase">Action</p>
                                                        <div className="flex gap-2">
                                                            <Destroy article={article}/>
                                                            <Link className={'text-orange-300 uppercase'}
                                                                  href={`/session/admin/articles/${article.slug}`}>
                                                                SHOW
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="hidden sm:flex sm:col-span-1 lg:col-span-1 sm:flex-col sm:items-start px-3">
                                                    <div className="">
                                                        <p className="text-sm font-semibold leading-6 uppercase">#ID</p>
                                                        <p className="mt-1 truncate text-sm leading-5 text-gray-500 text-wrap">
                                                            {article.articleKey}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div
                                                    className="col-span-1 lg:col-span-2 sm:flex sm:flex-col sm:items-start pl-3">
                                                    <div className="min-w-0  justify-start">
                                                        <p className="text-sm font-semibold leading-6 uppercase">Title</p>
                                                        <div
                                                            className="mt-1 text-sm font-bold truncate leading-5 text-gray-500 text-wrap">
                                                            {article.title}
                                                        </div>
                                                        <span
                                                            className="ml-1 text-gray-400 text-xs dark:text-gray-500 text-wrap">
                                                    @{article.slug}
                                                </span>
                                                    </div>
                                                </div>

                                                <div
                                                    className="hidden sm:flex sm:col-span-1 lg:col-span-1 sm:flex-col sm:items-start pl-3">
                                                    <p className="text-sm font-semibold leading-6 uppercase">Created
                                                        Date</p>
                                                    <p className="mt-1 text-sm font-bold truncate leading-5 text-gray-500">
                                                        <time dateTime={article.created_at}>
                                                            {formatDate(article.created_at)}
                                                        </time>
                                                    </p>
                                                </div>

                                                <div
                                                    className="hidden sm:flex sm:col-span-1 lg:col-span-1 sm:flex-col sm:items-start pl-3">
                                                    <p className="text-sm font-semibold leading-6 uppercase">Updated
                                                        Date</p>
                                                    <p className="mt-1 text-sm font-bold truncate leading-5 text-gray-500">
                                                        <time dateTime={article.updated_at}>
                                                            {formatDate(article.updated_at)}
                                                        </time>
                                                    </p>
                                                </div>
                                                <div
                                                    className="hidden sm:flex sm:col-span-1 lg:col-span-1 sm:flex-col sm:items-start pl-3">
                                                    <p className="text-sm font-semibold leading-6 uppercase">Category</p>
                                                    <p className="mt-1 text-sm font-bold truncate leading-5 text-primary">
                                                        {article.category.name}
                                                    </p>
                                                </div>
                                                <div
                                                    className="hidden sm:flex sm:col-span-1 lg:col-span-1 sm:flex-col sm:items-start pl-3">
                                                    <p className="text-sm font-semibold leading-6 uppercase">Author</p>
                                                    <p className="mt-1 text-sm font-bold truncate leading-5 text-primary">
                                                        {article.user.name}
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
                <div className={'mt-5'}>
                    <div className="flex justify-center flex-col w-full">
                        <ul className="inline-flex items-center space-x-1 rtl:space-x-reverse m-auto mb-4">
                            {articles.links.map((link: any, index: any) => {
                                    return (
                                        <li key={index}>
                                            <Link
                                                className={link.active ? "flex justify-center font-semibold px-3.5 py-2 rounded-full transition bg-teal-500 text-white dark:text-white-light dark:bg-teal-600" : "flex justify-center font-semibold px-3.5 py-2 rounded transition bg-white-light text-dark hover:text-white hover:bg-teal-500 dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-teal-500"}
                                                key={index}
                                                href={link.url}
                                            >
                                                {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                                            </Link>
                                        </li>
                                    )
                                }
                            )}
                        </ul>
                    </div>
                </div>
            </Authenticated>
        </>
    )
}

export default Index
