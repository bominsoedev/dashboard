//@ts-nocheck
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head, Link} from "@inertiajs/react";
import Breadcrumb from "@/Components/Breadcrumb";
import PerfectScrollbar from "react-perfect-scrollbar";
import {Container} from "@/Components/Container";
import React from "react";
import {Button} from "@/Components/Button";

const Index = ({tools}: { tools: any }) => {
    console.log(tools)
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
                <div className="flex justify-between items-center">
                    <Breadcrumb menu={menus} className={''}/>
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
                <div className={'panel mt-5'}>
                    <PerfectScrollbar
                        className="relative max-h-[630px] chat-conversation-box">
                        <div className="space-y-5 p-4 sm:pb-0 pb-[68px] sm:min-h-[300px] min-h-[400px]">
                            <div
                                className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 text-white">
                                <Container className="">
                                    <div
                                        className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
                                        <div className="flex flex-col gap-16">

                                        </div>
                                    </div>
                                </Container>
                            </div>
                        </div>
                    </PerfectScrollbar>
                </div>
            </Authenticated>
        </>
    )
}

export default Index
