import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  hasMore: boolean;       
  isLoading: boolean;     
  onLoadMore: () => void; 
}

export function useInfiniteScroll({ hasMore, isLoading, onLoadMore }: UseInfiniteScrollOptions) {
  
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;

      if (target.isIntersecting && hasMore && !isLoading) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore] 
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { rootMargin: '200px' });
    const currentSentinel = sentinelRef.current;

    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
    };
  }, [handleObserver]);

  return sentinelRef;
}
