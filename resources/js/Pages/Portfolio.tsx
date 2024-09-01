//@ts-nocheck
import Guest from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import clsx from 'clsx';
import React from 'react';
import PortfolioItems from "@/Components/PortfolioItems";
import { useInfiniteScroll } from "@/Composables/useInfiniteScroll";

const Portfolio = ({ photos, tags }: { photos: any, tags: any }) => {
    // Use the custom useInfiniteScroll hook
    const { items, landmarkRef } = useInfiniteScroll(photos.data, photos.next_page_url, 'photos');

    return (
        <>
            <Guest>
                <Head>
                    <title>Portfolio</title>
                </Head>

                <div className={clsx('sm:px-8 mt-8 sm:mt-16')}>
                    <div className="mx-auto max-w-8xl">
                        <div className="inline-flex items-center justify-center gap-2 mx-auto w-full text-nowrap">
                            <Link href={route('portfolio')} className={'uppercase font-bold text-sm'}>
                                ALL
                            </Link>
                            {tags.map((tag: any) => (
                                <li key={tag.tagKey}>
                                    <Link href={`?tag=${tag.slug}`} className={'uppercase font-extrabold text-sm'}>
                                        {tag.name}
                                    </Link>
                                </li>
                            ))}
                        </div>
                        <div className="relative px-4 sm:px-8 lg:px-12">
                            <div className="mx-auto w-full max-w-8xl">
                                <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-7 gap-2 space-y-2 p-5 rounded">
                                    <PortfolioItems items={items} />
                                </div>
                                <div ref={landmarkRef} style={{ height: '50px' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Guest>
        </>
    );
};

export default Portfolio;
