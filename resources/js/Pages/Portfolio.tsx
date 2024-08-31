//@ts-nocheck
import Guest from "@/Layouts/GuestLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

const Portfolio = ({ photos, tags }: { photos: any, tags: any }) => {
  // Initialize state for items and nextPageUrl
  const [items, setItems] = useState(photos.data);
  const [nextPageUrl, setNextPageUrl] = useState(photos.next_page_url);
  const initialUrl = usePage().url;
  const landmarkRef = useRef(null);

  // Function to load more items when the observer triggers
  const loadMoreItems = () => {
    if (!nextPageUrl) {
      return;
    }

    router.get(nextPageUrl, {}, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: (page) => {
        const newPhotos = (page.props as any).photos;
        setItems((prevItems: any[]) => [...prevItems, ...newPhotos.data]);
        setNextPageUrl(newPhotos.next_page_url);
        window.history.replaceState({}, "", initialUrl);
      }
    });
  };

  // Set up the IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMoreItems();
          }
        });
      },
      {
        rootMargin: "0px 0px 150px 0px",
      }
    );

    const currentLandmark = landmarkRef.current;
    if (currentLandmark) {
      observer.observe(currentLandmark);
    }

    return () => {
      if (currentLandmark) {
        observer.unobserve(currentLandmark);
      }
    };
  }, [nextPageUrl]);

  return (
    <>
      <Guest>
        <Head>
          <title>Portfolio</title>
        </Head>

        <div className={clsx("sm:px-8 mt-8 sm:mt-16")}>
          <div className="mx-auto max-w-8xl">
            <>
              <div
                className="inline-flex items-center justify-center gap-2 mx-auto w-full text-nowrap">
                <Link href={route("portfolio")} className={"uppercase font-bold text-sm"}>
                  ALL
                </Link>

                {
                  tags.map((tag: any) => {
                    return (
                      <>
                        <li key={tag.tagKey}>
                          <Link href={"?tag=" + tag.slug}
                                className={"uppercase font-extrabold text-sm"}>
                            {tag.name}
                          </Link>
                        </li>
                      </>
                    );
                  })
                }
              </div>
              <div className="relative px-4 sm:px-8 lg:px-12">
                <div className="mx-auto w-full max-w-8xl">
                  <div
                    className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-7 gap-2 space-y-2 p-5 rounded">

                    <>
                      <PhotoProvider
                        maskOpacity={0.5}
                        bannerVisible={true}
                        loop={4}
                        speed={() => 800}
                        easing={(type) => (type === 2 ? "cubic-bezier(0.36, 0, 0.66, -0.56)" : "cubic-bezier(0.34, 1.56, 0.64, 1)")}
                      >
                        {items.map((photo: any) => {
                          return(
                            <PhotoView key={photo.id}
                                       src={`/storage/${photo.image_location}`}
                                       height={500}>
                              <img className={"hover:cursor-pointer rounded"}
                                   src={`/storage/${photo.image_location}`} alt="" />
                            </PhotoView>
                          )
                        })}
                      </PhotoProvider>
                    </>
                  </div>
                  <div ref={landmarkRef}  style={{ height: '50px' }}></div>
                </div>
              </div>
            </>
          </div>
        </div>
      </Guest>
    </>
  );
};
export default Portfolio;
