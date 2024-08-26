//@ts-nocheck
import Guest from "@/Layouts/GuestLayout";
import {Head, Link} from "@inertiajs/react";
import clsx from "clsx";
import React, {useEffect, useState} from "react";
import {PhotoProvider, PhotoView} from "react-photo-view";

const Portfolio = ({photos, tags}: { photos: any, tags: any }) => {
    const [filteredItems, setFilteredItems] = useState<any>(photos);
    const [search, setSearch] = useState<any>('');
    useEffect(() => {
        setFilteredItems(() => {
            return photos.data.filter((item: any) => {
                return item.portfolio.title.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, photos]);

    return (
        <>
            <Guest>
                <Head>
                    <title>Portfolio</title>
                </Head>

                <div className={clsx('sm:px-8 mt-8 sm:mt-16')}>
                    <div className="mx-auto max-w-8xl">
                        <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
                            <h1
                            className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
                        </h1>
                        </div>
                        {filteredItems.length ? (
                            <>
                                <div
                                    className="inline-flex items-center justify-center gap-2 mx-auto w-full text-nowrap">
                                    <Link href={route('portfolio')} className={'uppercase font-bold text-sm'}>
                                        ALL
                                    </Link>

                                    {
                                        tags.map((tag: any) => {
                                            return (
                                                <>
                                                    <li key={tag.tagKey}>
                                                        <Link href={'?tag=' + tag.slug}
                                                              className={'uppercase font-extrabold text-sm'}>
                                                            {tag.name}
                                                        </Link>
                                                    </li>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                                <div className="relative px-4 sm:px-8 lg:px-12">
                                    <div className="mx-auto w-full max-w-8xl">
                                        <div
                                            className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-7 gap-2 space-y-2 bg-gray-50 dark:bg-slate-900 p-5 rounded">

                                            <>
                                                <PhotoProvider
                                                    maskOpacity={0.5}
                                                    bannerVisible={true}
                                                    loop={4}
                                                    speed={() => 800}
                                                    easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}
                                                >
                                                    {filteredItems.map((photo: any) => (
                                                        <PhotoView key={photo.id}
                                                                   src={`/storage/${photo.image_location}`}
                                                                   height={500}>
                                                            <img className={'hover:cursor-pointer'}
                                                                 src={`/storage/${photo.image_location}`} alt=""/>
                                                        </PhotoView>
                                                    ))}
                                                </PhotoProvider>
                                            </>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                </div>
            </Guest>
        </>
    )
}
export default Portfolio
