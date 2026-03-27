import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power3.out'
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' || 
        target.closest('button') || 
        target.closest('a')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    gsap.to(cursorRef.current, {
      scale: isHovered ? 4 : 1,
      opacity: isHovered ? 0.5 : 1,
      duration: 0.3,
      ease: 'power3.out'
    });
  }, [isHovered]);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 w-3 h-3 bg-[#3E2723] rounded-full z-[99999] mix-blend-difference hidden md:block"
      style={{
        transform: 'translate(-50%, -50%)'
      }}
    />
  );
};
