//@ts-nocheck
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head, Link, useForm} from "@inertiajs/react";
import Breadcrumb from "@/Components/Breadcrumb";
import React, {FormEventHandler, useEffect, useState} from "react";
import {formatDate} from "@/lib/formatDate";
import DangerButton from "@/Components/DangerButton";
import PerfectScrollbar from "react-perfect-scrollbar";
import TextInput from "@/Components/TextInput";
import {Button} from "@/Components/Button";

const Index = ({portfolios}: { portfolios: any }) => {
    const [filteredItems, setFilteredItems] = useState<any>(portfolios);
    const [search, setSearch] = useState<any>('');
    const menus = [
        {
            link: route('dashboard'),
            name: 'dashboard'
        }, {
            link: '',
            name: 'Portfolios'
        },
    ];
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
    const deleteTag: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('portfolios.destroy-tag'), {
            preserveScroll: true,
            preserveState: false,
            onFinish: () => reset(),
        });
    };
    useEffect(() => {
        setFilteredItems(() => {
            return portfolios.data.filter((item: any) => {
                return item.title.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, portfolios]);

    console.log(filteredItems)
    return (
        <>
            <Authenticated>
                <Head>
                    <title>Portfolio</title>
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
                            <Button href={'/session/admin/portfolios/create_portfolio'}>
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1}
                                         stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                                    </svg>
                                    Add New Portfolio
                                </>
                            </Button>
                        </div>
                    </div>
                </div>
                <PerfectScrollbar
                    className="relative min-h-[650px] chat-conversation-box">
                    {filteredItems.length ? (
                        <>
                            {filteredItems.map((portfolio: any) => {
                                console.log(portfolio)
                                return (
                                    <ul role={portfolio.portfolioKey} className="">
                                        <div className="">
                                            <li
                                                key={portfolio.portfolioKey}
                                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 justify-between bg-cover px-3 shadow-sm bg-gray-100 dark:bg-white/5 rounded mt-2 gap-x-6 py-3 hover:bg-gray-200 duration-300 dark:hover:bg-white/10 divide-x divide-dark gap-4"
                                            >
                                                <div
                                                    className="sm:col-span-2 lg:col-span-1 items-start">
                                                    <div className="">
                                                        <p className="text-sm font-semibold leading-6">Action</p>
                                                        <div className="flex gap-2">
                                                            {/*<Link className={'btn-warning uppercase rounded btn btn-sm'}*/}
                                                            {/*      href={`/session/admin/articles/${portfolio.slug}`}>*/}
                                                            {/*    SHOW*/}
                                                            {/*</Link>*/}
                                                            <DangerButton
                                                                onClick={() => deleteTag}
                                                            >
                                                                <>
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth={1}
                                                                        stroke="currentColor"
                                                                        className="size-3 mr-1"
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
                                                    className="hidden sm:flex sm:col-span-1 lg:col-span-1 sm:flex-col sm:items-start px-3">
                                                    <div className="">
                                                        <p className="text-sm font-semibold leading-6">Photo</p>
                                                        <div className="flex -space-x-2 overflow-hidden">
                                                            {portfolio.photos.map((photo) => (
                                                                <li key={photo.id}>
                                                                    <img
                                                                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                                                        src={`/storage/${photo.image_location}`}
                                                                        alt=""/>
                                                                </li>
                                                            ))}

                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    className="col-span-1 lg:col-span-1 sm:flex sm:flex-col sm:items-start pl-3">
                                                    <div className="min-w-0  justify-start">
                                                        <p className="text-sm font-semibold leading-6">
                                                            Title</p>
                                                        <span
                                                            className="mt-1 text-sm font-bold truncate leading-5 text-gray-500 text-wrap">
                                                    {portfolio.title}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div
                                                    className="hidden sm:flex sm:col-span-1 lg:col-span-1 sm:flex-col sm:items-start pl-3">
                                                    <p className="text-sm font-semibold leading-6">Created
                                                        Date</p>
                                                    <p className="mt-1 text-sm font-bold truncate leading-5 text-gray-500">
                                                        <time dateTime={portfolio.created_at}>
                                                            {formatDate(portfolio.created_at)}
                                                        </time>
                                                    </p>
                                                </div>

                                                <div
                                                    className="hidden sm:flex sm:col-span-1 lg:col-span-1 sm:flex-col sm:items-start pl-3">
                                                    <p className="text-sm font-semibold leading-6">Updated
                                                        Date</p>
                                                    <p className="mt-1 text-sm font-bold truncate leading-5 text-gray-500">
                                                        <time dateTime={portfolio.updated_at}>
                                                            {formatDate(portfolio.updated_at)}
                                                        </time>
                                                    </p>
                                                </div>

                                                <div
                                                    className="hidden sm:flex sm:col-span-1 lg:col-span-1 sm:flex-col sm:items-start pl-3">
                                                    <p className="text-sm font-semibold leading-6">Author</p>
                                                    <p className="mt-1 text-sm font-bold truncate leading-5 text-primary">
                                                        {portfolio.user.name}
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
                            {portfolios.links.map((link: any, index: any) => {
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
