import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SurveyContainerProps {
  children: React.ReactNode;
}

export function SurveyContainer({ children }: SurveyContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollWrapper = scrollWrapperRef.current;
    
    if (!container || !scrollWrapper) return;

    // Get total scroll width
    const totalWidth = scrollWrapper.scrollWidth - window.innerWidth;

    const tween = gsap.to(scrollWrapper, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1, // Smooth scrub
        end: () => `+=${totalWidth}`,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st: any) => st.kill());
    };
  }, [children]); // Re-run if children (slides) change

  return (
    <div ref={containerRef} className="h-screen w-full overflow-hidden bg-background">
      <div 
        ref={scrollWrapperRef} 
        className="flex h-full will-change-transform"
        style={{ width: 'max-content' }}
      >
        {children}
      </div>
    </div>
  );
}
