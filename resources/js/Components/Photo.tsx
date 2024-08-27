import React from 'react';
import clsx from 'clsx';
import {Container} from "@/Components/Container";
import {PhotoProvider, PhotoView} from "react-photo-view";

// Assuming these images are imported or available in the same file
const image =
    '/Images/image.jpg';
const image1 =
    '/Images/image1.jpg';
const image2 =
    '/Images/image2.jpg';
const image3 =
    '/Images/image3.jpg';
const image4 =
    '/Images/image4.jpg';
const Photos: React.FC = () => {
    const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2'];
    const images = [image, image1, image2, image3, image4];

    return (
        <div className="relative z-10">
            <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
                <PhotoProvider
                    maskOpacity={0.5}
                    bannerVisible={true}
                    loop={4}
                    speed={() => 800}
                    easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}
                >
                    {images.map((image, imageIndex) => (
                        <div
                            key={imageIndex}
                            className={clsx(
                                'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
                                rotations[imageIndex % rotations.length]
                            )}
                        >
                            <PhotoView
                                src={image}>
                                <img
                                    src={image}
                                    alt=""
                                    loading={'lazy'}
                                    sizes="(min-width: 640px) 18rem, 11rem"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </PhotoView>
                        </div>
                    ))}
                </PhotoProvider>
            </div>
        </div>
    );
};

export default Photos;
