import { useState, useEffect, useRef, useCallback } from 'react';
import { usePage, router } from '@inertiajs/react';

interface InfiniteScrollOptions {
    rootMargin?: string;
}

export function useInfiniteScroll<T>(
    initialData: T[],
    initialNextPageUrl: string | null,
    propName: string,
    options: InfiniteScrollOptions = {}
) {
    const [items, setItems] = useState<T[]>(initialData);
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(initialNextPageUrl);
    const initialUrl = usePage().url;
    const landmarkRef = useRef<HTMLDivElement>(null);

    const loadMoreItems = useCallback(() => {
        if (!nextPageUrl) {
            return;
        }

        router.get(nextPageUrl, {}, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                const newItems = (page.props as any)[propName];
                setItems((prevItems) => [...prevItems, ...newItems.data]);
                setNextPageUrl(newItems.next_page_url);
                window.history.replaceState({}, '', initialUrl);
            }
        });
    }, [nextPageUrl, propName, initialUrl]);

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
                rootMargin: options.rootMargin || '0px 0px 150px 0px',
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
    }, [loadMoreItems, options.rootMargin]);

    return { items, landmarkRef, loadMoreItems };
}
