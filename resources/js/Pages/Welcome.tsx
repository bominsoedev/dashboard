//@ts-nocheck
import {Link, Head} from '@inertiajs/react';
import {Container} from '@/Components/Container';
import Guest from "@/Layouts/GuestLayout";
import Photos from "@/Components/Photo";
import React from "react";
import Article from "@/Components/Article";
import {PhotoProvider, PhotoView} from "react-photo-view";

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({title, children}) => (
    <section className="px-0 xl:px-[30px]">

        <div className="container z-10">
            <div
                className="cards flex xl:w-auto xl:grid lg:justify-center hide-scrollbar overflow-auto px-[30px] xl:px-0 gap-6">
                {children}
            </div>
        </div>
    </section>
);

interface CardProps {
    title: string;
    href: string;
    description: string;
    imageSrc: string;
    instructorName: string;
    instructorImageSrc: string;
    instructorHref: string;
    lessonsCount: number;
    duration: string;
    difficulty: string;
}

const Card: React.FC<CardProps> = ({
                                       title,
                                       href,
                                       description,
                                       imageSrc,
                                       instructorName,
                                       instructorImageSrc,
                                       instructorHref,
                                       lessonsCount,
                                       duration,
                                       difficulty
                                   }) => (
    <div className="group flex flex-shrink-0 flex-grow-0 w-full md:max-w-[443px] xl:hidden">
        <a className="panel relative transition-colors duration-300 dark hoverable py-4 rounded-xl flex-1 overflow-hidden text-center h-[300px] px-6 xl:h-[377px] 2xl:h-[447px]"
           href={href}>
            <header className="flex flex-col items-center justify-center text-center md:h-[150px]">
                <h2 className="inherits-color mb-3 inline-flex items-center text-balance font-semibold leading-tight mt-4 text-4xl md:line-clamp-2 md:text-3xl xl:mx-4">{title}</h2>
                <div className="flex text-grey-600 text-sm">
                    <a className="relative flex items-start max-w-[fit-content] mr-2" href={instructorHref}
                       style={{width: '22px', height: '22px', padding: '2px'}}>
                        <img loading="lazy" className="relative" src={instructorImageSrc}
                             alt={`${instructorName}'s avatar`} width="22" height="22"
                             style={{width: '100%', borderRadius: '100%'}}/>
                    </a> with {instructorName}
                </div>
            </header>
            <img loading="lazy"
                 className="bottom-0 left-0 right-0 mt-3 w-full translate-y-[55%] scale-[200%] group-hover:scale-[205%]"
                 src={imageSrc} alt={`${title} thumbnail`}
                 style={{width: '245px', transition: 'transform 0.3s ease-in-out'}}/>
        </a>
    </div>
);

interface SocialLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const SocialLink: React.FC<SocialLinkProps> = ({icon: Icon, ...props}) => {
    return (
        <Link className="group -m-1 p-1" {...props}>
            <Icon
                className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"/>
        </Link>
    );
};

export default function Welcome({articles}: { articles: any }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Guest>
                <Head>
                    <title>
                        Home
                    </title>
                    <meta
                        name="description"
                        content="I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms."
                    />
                </Head>

                <header className={'relative'}>
                    <div className="relative xl:pt-0 mt-10 xl:mt-2">
                        <div
                            className="hidden dark:block absolute inset-x-0 h-screen bg-gradient-to-t from-bg-slate-900 top-0 xl:top-8"></div>
                        <div
                            className="absolute inset-x-0 bg-top bg-no-repeat GridLockup_beams-0___8Vns top-0"></div>
                        <div
                            className="absolute inset-x-0 h-[37.5rem] bg-grid-slate-900/[0.04] bg-top [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-slate-100/[0.03] dark:bg-[center_top_-1px] top-0 xl:top-8"></div>
                    </div>
                    <div
                        className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 mt-20 sm:mt-24 lg:mt-32 lg:grid lg:gap-8 lg:grid-cols-12 lg:items-center">
                        <div className="relative row-start-1 col-start-6 xl:col-start-7 col-span-7 xl:col-span-6">
                            <div className="mx-4 sm:mx-5">
                                <div
                                    className="relative overflow-hidden shadow-xl rounded-xl flex bg-slate-800 h-[31.625rem] max-h-[60vh] sm:max-h-[none] sm:rounded-xl lg:h-[34.6875rem] xl:h-[31.625rem] dark:bg-slate-900/70 dark:backdrop-blur dark:ring-1 dark:ring-inset dark:ring-white/10 !h-auto max-h-[none]">
                                    <div className="relative w-full flex flex-col">
                                        <div className="flex-none border-b border-slate-500/30">
                                            <div className="flex items-center h-8 space-x-1.5 px-3">
                                                <div className="w-3.5 h-3.5 bg-red-600 rounded-full"></div>
                                                <div className="w-3.5 h-3.5 bg-orange-300/80 rounded-full"></div>
                                                <div className="w-3.5 h-3.5 bg-green-600 rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="relative min-h-0 flex-auto flex flex-col">
                                            <div className="w-full flex-auto flex min-h-0 overflow-auto">
                                                <div className="w-full relative flex-auto">
                                                <pre className="flex min-h-full text-sm leading-6">
                                                    <div
                                                        aria-hidden="true"
                                                        className="hidden md:block text-slate-600 flex-none py-2 pr-2 text-right select-none"
                                                        style={{width: '30px'}}
                                                    >
                                                        {Array.from({length: 26}, (_, i) => {
                                                            return (
                                                                <div>
                                                                    -
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                    <div
                                                        className="pt-4 pb-4 px-4 grid grid-cols-1 gap-4">
                                                        <PhotoProvider
                                                            maskOpacity={0.5}
                                                            bannerVisible={true}
                                                            loop={4}
                                                            speed={() => 800}
                                                            easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}
                                                        >
                                                            <PhotoView
                                                                src={'/Profile/profile.jpg'}>
                                                                <img
                                                                    className={'hover:cursor-pointer object-cover w-full h-full rounded-xl shadow-lg'}
                                                                    src={'/Profile/profile.jpg'} alt="profile"/>
                                                            </PhotoView>
                                                        </PhotoProvider>
                                                     </div>
                                                </pre>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="relative row-start-1 col-start-1 col-span-5 xl:col-span-6 -mt-10">
                            <div
                                className="h-[24.25rem] max-w-xl mx-auto lg:max-w-none flex items-center justify-center">
                                <div className="w-full flex-none">
                                    <div className="lg:-mr-18">
                                        <figure
                                            className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-900 border border-slate-500/30">
                                            <img
                                                className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto bg-zinc-100 object-cover dark:bg-zinc-800"
                                                src="/Profile/profile1.jpg" alt=""/>
                                            <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                                                <blockquote>
                                                    <p className="text-lg font-medium">
                                                        I’m [ <span
                                                        className={'uppercase font-extrabold text-teal-500 dark:text-teal-400'}>KYAW ZAY YA</span> ],
                                                        a travel
                                                        and landscape photographer with a deep passion for
                                                        capturing the world’s natural beauty and cultural richness.
                                                        For over 15 years, I’ve
                                                        been exploring the globe, camera in hand, documenting the
                                                        awe-inspiring landscapes
                                                        and vibrant cultures I encounter along the way.
                                                    </p>
                                                </blockquote>
                                                <figcaption className="font-medium">
                                                    <div
                                                        className="text-teal-500 dark:text-teal-400 font-extrabold uppercase">
                                                        Kyaw Zay Ya
                                                    </div>
                                                    <div className="text-slate-700 dark:text-slate-500">
                                                        Photography, South Korea.
                                                    </div>
                                                </figcaption>
                                            </div>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="relative py-32 mt-32 ">
                    <div
                        className="hidden dark:block absolute top-0 inset-x-0 h-screen bg-gradient-to-t from-bg-slate-900 top-0 xl:top-8">
                        <div
                            className="absolute top-0 inset-x-0 bg-top bg-no-repeat GridLockup_beams-1__X8ShE top-0 xl:top-8"></div>
                        <div
                            className="absolute top-0 inset-x-0 h-[37.5rem] bg-grid-slate-900/[0.04] bg-top [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-slate-100/[0.03] dark:bg-[center_top_-1px] dark:border-b dark:border-slate-100/5 top-0 xl:top-8"></div>
                    </div>
                    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
                        <div className="mt-4 -mx-4 sm:mx-0 col-span-12">
                            <Photos/>
                        </div>
                    </div>
                </div>
                <Container className="container mt-24 md:mt-28 max-w-7xl xl:max-w-8xl">
                    <header
                        className="container relative mx-auto mb-10 flex items-center justify-between px-[30px] xl:px-0">
                        <p className="inherits-color absolute right-0 z-10 hidden translate-y-4 xl:translate-y-2 font-kanit md:text-6xl lg:text-[75px] xl:text-[80px] font-bold uppercase text-card-500 md:block">
                            articles
                        </p>
                    </header>
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-12">
                        {articles.map((article: any) => (
                            <Article key={article.slug} article={article}/>
                        ))}
                    </div>
                </Container>

            </Guest>
        </>
    );
}
