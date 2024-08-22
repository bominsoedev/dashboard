//@ts-nocheck
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import Breadcrumb from "@/Components/Breadcrumb";
import React from "react";
import {
    IconArrowDownRight,
    IconArrowUpRight,
    IconCoin,
    IconDiscount2,
    IconAlignBoxBottomCenter,
    IconUserPlus
} from "@tabler/icons-react";

export default function Dashboard({data}: { data: any }) {
    const menus = [
        {
            link: '',
            name: 'dashboard'
        }
    ];
    const icons = {
        user: IconUserPlus,
        discount: IconDiscount2,
        receipt: IconAlignBoxBottomCenter,
        coin: IconCoin,
    };
    const stats = data.map((stat: any) => {
        const Icon = icons[stat.icon];
        const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

        return (
            <>
                <div className="rounded border border-gray-300 dark:border-dark text-gray-900 dark:text-white bg-gray-100 dark:bg-white/5 p-3 shadow">
                    <div className="flex items-center justify-between text-[#868e96]">
                        <div className="font-bold uppercase text-xs ">{stat.title}</div>
                        <Icon className={''} size="1.4rem" stroke={1.5}/>
                    </div>
                    <div className="flex items-center justify-between gap-3 mt-3">
                        <div className="text-2xl font-medium leading-3">{stat.value}</div>
                        <div className={`flex items-center gap-2 ${stat.diff > 0 ? 'text-teal-500' : 'text-red-400'}`}>
                            <span>{stat.diff}%</span>
                            <DiffIcon size="1rem" stroke={2}/>
                        </div>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">Compared to previous month</div>
                </div>
            </>
        );
    });
    return (
        <AuthenticatedLayout>
            <Head>
                <title>
                    Dashboard
                </title>
            </Head>
            <div className="flex justify-between items-center w-full sm:w-auto max-h-[20px]">
                <Breadcrumb menu={menus} className={''}/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 text-white">
                {stats}
            </div>
        </AuthenticatedLayout>
    );
}
