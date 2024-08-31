import React, { useEffect } from 'react';

type IntersectionObserverHookArgs = {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
};

export function useIntersect(
    ref: React.RefObject<Element>,
    callback: () => void,
    options: IntersectionObserverHookArgs = {}
): void {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    callback();
                }
            });
        }, options);

        const currentRef = ref.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
            observer.disconnect();
        };
    }, [ref, callback, options]);
}
