import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useIntersect } from '@/Composables/useIntersect';
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

interface InfiniteScrollOptions {
    rootMargin?: string;
}

export function useInfiniteScroll<T>(propName: string, landmarkRef: React.RefObject<HTMLElement> | null = null, options: InfiniteScrollOptions = {}) {
    const { props, url: initialUrl } = usePage<{ [key: string]: { data: T[]; next_page_url: string | null } }>();

    const value = useCallback(() => props[propName], [props, propName]);

    const [items, setItems] = useState<T[]>(value().data);
    const [canLoadMoreItems, setCanLoadMoreItems] = useState<boolean>(value().next_page_url !== null);

    const loadMoreItems = useCallback(() => {
        if (!canLoadMoreItems) {
            return;
        }

        Inertia.get(value().next_page_url as string, {}, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                const newItems = (page.props as any)[propName].data;
                setItems((prevItems) => [...prevItems, ...newItems]);
                setCanLoadMoreItems((page.props as any)[propName].next_page_url !== null);
                window.history.replaceState({}, '', initialUrl);
            },
        });
    }, [canLoadMoreItems, initialUrl, propName, value]);

    useEffect(() => {
        if (landmarkRef && landmarkRef.current) {
            useIntersect(landmarkRef, loadMoreItems, options);
        }
    }, [landmarkRef, loadMoreItems, options]);

    const reset = () => {
        setItems(value().data);
    };

    return {
        items,
        loadMoreItems,
        reset,
        canLoadMoreItems,
    };
}
