import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';

interface Photo {
    id: number;
    image_location: string;
}

interface PortfolioItemsProps {
    items: Photo[];
}

const PortfolioItems: React.FC<PortfolioItemsProps> = ({ items }) => {
    console.log(items)
    return (
        <PhotoProvider
            maskOpacity={0.5}
            bannerVisible={true}
            loop={4}
            speed={() => 800}
            easing={(type) =>
                type === 2
                    ? 'cubic-bezier(0.36, 0, 0.66, -0.56)'
                    : 'cubic-bezier(0.34, 1.56, 0.64, 1)'
            }
        >
            {items.map((photo) => (
                <PhotoView
                    key={photo.id}
                    src={`/storage/${photo.image_location}`}
                    height={500}
                >
                    <img
                        className="hover:cursor-pointer rounded"
                        src={`/storage/${photo.image_location}`}
                        alt=""
                    />
                </PhotoView>
            ))}
        </PhotoProvider>
    );
};

export default PortfolioItems;
