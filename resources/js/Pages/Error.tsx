//@ts-nocheck
import {PageProps} from "@/types";
import {useSelector} from "react-redux";
import {IRootState} from "@/store";
import {Head, Link} from "@inertiajs/react";

export default function ErrorPage({status}: PageProps<{ status: number }>) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[status]
    const image = {
        503: '/assets/images/error/503-light.svg',
        500: '/assets/images/error/500-light.svg',
        404: '/assets/images/error/404-light.svg',
        403: '/assets/images/error/maintenence-light.svg',
    }[status]
    const imageDark = {
        503: '/assets/images/error/503-dark.svg',
        500: '/assets/images/error/500-dark.svg',
        404: '/assets/images/error/404-dark.svg',
        403: '/assets/images/error/maintenence-dark.svg',
    }[status]

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status]
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    return (
        <>
            <Head title={title}/>
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
                <div
                    className="px-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#4361EE_0%,rgba(67,97,238,0)_50.73%)] before:aspect-square before:opacity-10 md:py-20">
                    <div className="relative">
                        <img
                            src={isDark ? imageDark : image}
                            alt={title}
                            className="mx-auto -mt-10 w-full max-w-xs object-cover md:-mt-14 md:max-w-xl"
                        />
                        <p className="mt-5 text-2xl text-black dark:text-white">{description}</p>
                        <Link href={'/'} className='inline-flex justify-center items-center mt-5 gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white hover:text-sky-500 duration-300'>
                            Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
