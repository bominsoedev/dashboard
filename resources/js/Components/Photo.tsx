import React from 'react';
import clsx from 'clsx';
import {Container} from "@/Components/Container";

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
        <div className="">
            <div className="-my-4 w-full mx-auto flex justify-center gap-5 py-4 sm:gap-8">
                {images.map((image, imageIndex) => (
                    <div
                        key={imageIndex}
                        className={clsx(
                            'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
                            rotations[imageIndex % rotations.length]
                        )}
                    >
                        <img
                            src={image}
                            alt=""
                            loading={'lazy'}
                            sizes="(min-width: 640px) 18rem, 11rem"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Photos;
