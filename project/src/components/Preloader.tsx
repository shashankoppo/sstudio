import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Disable scrolling while preloader runs
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = 'auto';
        onComplete();
      }
    });

    tl.fromTo('.preloader-text', 
      { opacity: 0, yPercent: 100 },
      { opacity: 1, yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.2, delay: 0.2 }
    )
    .to('.preloader-text', {
      opacity: 0,
      yPercent: -20,
      duration: 0.8,
      ease: 'power3.inOut',
      stagger: 0.1,
      delay: 0.8
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1.5,
      ease: 'power4.inOut' // Buttery smooth slide up
    });
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#FDFBFA]">
      <div className="overflow-hidden flex flex-col items-center">
        <div className="overflow-hidden">
          <h1 className="preloader-text text-4xl md:text-6xl font-serif text-[#3E2723] uppercase tracking-[0.2em] mb-2 font-light">Suraj</h1>
        </div>
        <div className="overflow-hidden">
          <p className="preloader-text text-xs md:text-sm tracking-[0.4em] text-[#6D4C41] uppercase">Studio</p>
        </div>
      </div>
    </div>
  );
};
