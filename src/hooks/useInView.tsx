
import { useState, useEffect, RefObject } from "react";

interface InViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

interface InViewResult {
  ref: (node: Element | null) => void;
  inView: boolean;
  entry?: IntersectionObserverEntry;
}

export function useInView(options: InViewOptions = {}): InViewResult {
  const { threshold = 0, triggerOnce = false, rootMargin = "0px" } = options;
  
  const [ref, setRef] = useState<Element | null>(null);
  const [inView, setInView] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        setEntry(entry);
        
        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(ref);
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(ref);
    
    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, threshold, triggerOnce, rootMargin]);

  return {
    ref: setRef,
    inView,
    entry,
  };
}
