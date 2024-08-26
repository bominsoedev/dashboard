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
                <Container
                    className={'max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-20 sm:mt-24 lg:mt-32'}>
                    <div className="relative row-start-1 col-start-6 xl:col-start-7 col-span-7 xl:col-span-6">
                        <div className="-mx-4 sm:mx-0">
                            <div
                                className="relative overflow-hidden shadow-xl flex bg-slate-800 h-[31.625rem] max-h-[60vh] sm:max-h-[none] sm:rounded-xl lg:h-[34.6875rem] xl:h-[31.625rem] dark:bg-slate-900/70 dark:backdrop-blur dark:ring-1 dark:ring-inset dark:ring-white/10 !h-auto max-h-[none]">
                                <div className="relative w-full flex flex-col">
                                    <div className="flex-none border-b border-slate-500/30">
                                        <div className="flex items-center h-8 space-x-1.5 px-3">
                                            <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>
                                            <div className="w-2.5 h-2.5 bg-orange-300/80 rounded-full"></div>
                                            <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="relative min-h-0 flex-auto flex flex-col">
                                        <div className="w-full flex-auto flex min-h-0 overflow-auto">
                                            <div className="w-full relative flex-auto">
                                                <pre className="flex min-h-full text-sm leading-6">
                                                    <div
                                                        aria-hidden="true"
                                                        className="hidden md:block text-slate-600 flex-none py-4 pr-4 text-right select-none"
                                                        style={{width: '40px'}}
                                                    >
                                                        {Array.from({length: 26}, (_, i) => (
                                                            <div key={i}>-</div>
                                                        ))}
                                                    </div>
                                                    <code
                                                        className="flex-auto relative text-slate-50 pt-4 pb-4 px-4 overflow-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
                                                            <PhotoView
                                                                src={'/Profile/profile1.jpg'}>
                                                                <img
                                                                    className={'hover:cursor-pointer object-cover w-full h-full rounded-xl shadow-lg'}
                                                                    src={'/Profile/profile1.jpg'} alt="profile"/>
                                                            </PhotoView>
                                                            <PhotoView
                                                                src={'/Images/image.jpg'}>
                                                                <img
                                                                    className={'hover:cursor-pointer object-cover w-full h-full rounded-xl shadow-lg'}
                                                                    src={'/Images/image.jpg'} alt="profile"/>
                                                            </PhotoView>
                                                            <PhotoView
                                                                src={'/Images/image4.jpg'}>
                                                                <img
                                                                    className={'hover:cursor-pointer object-cover w-full h-full rounded-xl shadow-lg'}
                                                                    src={'/Images/image4.jpg'} alt="profile"/>
                                                            </PhotoView>
                                                        </PhotoProvider>
                                                     </code>
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<section*/}
                    {/*    className="flex w-full flex-1 flex-col mobile:px-4 lg:items-center pt-0">*/}
                    {/*    <header*/}
                    {/*        className="container relative mx-auto mb-10 flex items-center justify-between px-[30px] xl:px-0">*/}
                    {/*        <p className="inherits-color absolute right-0 z-10 hidden translate-y-4 xl:translate-y-2 font-kanit md:text-6xl lg:text-[75px] xl:text-[80px] font-bold uppercase text-card-500 md:block">*/}
                    {/*            profile*/}
                    {/*        </p>*/}
                    {/*        <div*/}
                    {/*            className="absolute inset-0 bottom-10 bg-bottom bg-no-repeat bg-slate-50 dark:bg-[#0B1120] index_beams__yWcJT">*/}
                    {/*            <div*/}
                    {/*                className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5"*/}
                    {/*                style={{*/}
                    {/*                    width: '300px',*/}
                    {/*                    height: '200px',*/}
                    {/*                    backgroundSize: 'cover', // Ensure the image covers the entire area*/}
                    {/*                    backgroundPosition: 'center', // Center the background image*/}
                    {/*                    maskImage: 'linear-gradient(transparent, black)',*/}
                    {/*                    WebkitMaskImage: 'linear-gradient(transparent, black)', // For WebKit-based browsers like Safari*/}
                    {/*                }}*/}
                    {/*            ></div>*/}
                    {/*        </div>*/}
                    {/*    </header>*/}
                    {/*    <div*/}
                    {/*        className="container relative mx-auto flex w-full flex-1 flex-col items-center justify-center overflow-hidden px-8 py-10 md:px-12 lg:flex-row lg:gap-16 xl:mx-[-100px] xl:justify-around xl:gap-16 widescreen:px-15 border-t-white/10 border-l-white/5 border-r-white/5 border-x border-t z-10"*/}
                    {/*        style={{*/}
                    {/*            borderRadius: '24px',*/}
                    {/*            boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 40px 0px',*/}
                    {/*            backgroundColor: 'rgb(2,4,7)'*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        <div className="absolute left-0 top-0 z-20 flex gap-x-3 p-6">*/}
                    {/*            <div className="h-3 w-3 rounded-full bg-red-500"></div>*/}
                    {/*            <div className="h-3 w-3 rounded-full bg-white/10"></div>*/}
                    {/*            <div className="h-3 w-3 rounded-full bg-white/10"></div>*/}
                    {/*        </div>*/}
                    {/*        <div*/}
                    {/*            className="absolute rounded bottom-0 left-0 right-0 top-0 z-10 -ml-4 hidden overflow-hidden text-right lg:inline-block">*/}
                    {/*            <div className="scale-200 absolute inset-0"*/}
                    {/*                 style={{backgroundImage: 'radial-gradient(circle at 2% 22%, rgba(2, 4, 7, 0), rgb(2, 4, 7) 90%)'}}></div>*/}
                    {/*        </div>*/}
                    {/*        <div className="relative z-20 mt-15">*/}
                    {/*            <h1 className={'mt-10 text-balance text-center text-[50px] uppercase text-white md:text-[9vw] lg:text-[8vw] lg:mb-0 lg:mt-0 lg:text-left xl:text-[6vw] xlwidescreen:text-[100px] font-bold'}>*/}
                    {/*                Kyaw Zay Ya*/}
                    {/*            </h1>*/}
                    {/*            <span*/}
                    {/*                className={'inline-block bg-blue/15 bg-gradient-to-r from-white via-white to-[#868686] bg-clip-text text-transparent mt-6 text-base text-zinc-400 dark:text-zinc-300'}>*/}
                    {/*            I’m [ <span*/}
                    {/*                className={'uppercase font-extrabold text-teal-400'}>KYAW ZAY YA</span> ], a travel*/}
                    {/*                and landscape photographer with a deep passion for*/}
                    {/*                capturing the world’s natural beauty and cultural richness. For over 15 years, I’ve*/}
                    {/*                been exploring the globe, camera in hand, documenting the awe-inspiring landscapes*/}
                    {/*                and vibrant cultures I encounter along the way.*/}
                    {/*        </span>*/}
                    {/*            <div className="mt-6 flex gap-6">*/}
                    {/*                <SocialLink*/}
                    {/*                    href="https://instagram.com"*/}
                    {/*                    aria-label="Follow on Instagram"*/}
                    {/*                    icon={InstagramIcon}*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</section>*/}
                </Container>
                <Container className="container mt-24 md:mt-28 max-w-7xl xl:max-w-8xl">
                    <header
                        className="container relative mx-auto mb-10 flex items-center justify-between px-[30px] xl:px-0">
                        <p className="inherits-color absolute right-0 z-10 hidden translate-y-4 xl:translate-y-2 font-kanit md:text-6xl lg:text-[75px] xl:text-[80px] font-bold uppercase text-card-500 md:block">
                            featured
                        </p>
                    </header>
                </Container>
                <Photos/>
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
