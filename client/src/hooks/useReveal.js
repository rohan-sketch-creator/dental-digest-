import { useEffect, useRef } from 'react';

/**
 * Intersection Observer hook for scroll-reveal animations.
 * Returns a ref to attach to the element you want to reveal.
 * When the element enters the viewport, it adds 'reveal-active' class.
 */
export default function useReveal(threshold = 0.15) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('reveal-active');
                    observer.unobserve(el);
                }
            },
            { threshold, rootMargin: '0px 0px -60px 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return ref;
}
