import { useRef } from 'react';
import { SEO } from '../components/SEO';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WeddingCatalogProps {
  onNavigate: (page: string) => void;
}

const weddingImages = [
  { url: '/assets/wedding/wedding-1.png', title: 'The Eternal Vow', category: 'Ceremony', description: 'Captured in the soft embrace of twilight, this moment represents the pinnacle of marital commitment.' },
  { url: '/assets/wedding/wedding-2.png', title: 'Silent Affection', category: 'Portrait', description: 'A quiet exchange that speaks volumes of the bond shared between two souls.' },
  { url: '/assets/wedding/wedding-3.png', title: 'Golden Hour Grace', category: 'Editorial', description: 'The interplay of light and shadow highlights the intricate details of bridal elegance.' },
  { url: '/assets/wedding/wedding-4.png', title: 'Grandeur In Motion', category: 'Cinematography', description: 'A cinematic perspective on a celebration that transcends time.' }
];

export const WeddingCatalog = ({ onNavigate }: WeddingCatalogProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header Reveal
    gsap.fromTo('.catalog-header h1', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out' }
    );

    // Image Staggered Entrance with Parallax
    const items = gsap.utils.toArray<HTMLElement>('.catalog-item');
    items.forEach((item, index) => {
      const img = item.querySelector('img');
      const text = item.querySelector('.item-text');

      gsap.fromTo(item,
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          }
        }
      );

      if (img) {
        gsap.to(img, {
          yPercent: 12, // Reduced from 20 for smoother performance
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      if (text) {
          gsap.fromTo(text, 
            { x: index % 2 === 0 ? -30 : 30, opacity: 0 },
            { 
               x: 0, 
               opacity: 1, 
               duration: 1.2, 
               scrollTrigger: {
                 trigger: item,
                 start: 'top 70%'
               } 
            }
          );
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-[#FDFBFA] text-[#3E2723] overflow-hidden pt-32 pb-40">
      <SEO 
        title="Wedding Catalog | Suraj Studio" 
        description="Explore our curated collection of luxury wedding editorials." 
      />

      <div className="max-w-7xl mx-auto px-6">
        <header className="catalog-header text-center mb-40">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#6D4C41] mb-8 font-bold opacity-60">Curated Collection</p>
          <h1 className="text-6xl md:text-[9rem] font-serif leading-none tracking-tighter mb-12">
            The <span className="italic font-light">Wedding</span> <br/>Catalog
          </h1>
          <div className="w-1 px-4 h-24 bg-[#3E2723]/10 mx-auto"></div>
        </header>

        <div className="space-y-60">
          {weddingImages.map((image, idx) => (
            <div key={idx} className={`catalog-item grid grid-cols-1 md:grid-cols-12 gap-10 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className={`md:col-span-12 lg:col-span-8 order-1 ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[16/9] overflow-hidden bg-[#F5F2EF] group">
                    <img 
                        src={image.url} 
                        alt={image.title} 
                        className="w-full h-full object-cover scale-110 will-change-transform"
                    />
                    <div className="absolute inset-0 bg-[#3E2723]/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                </div>
              </div>

              <div className={`md:col-span-12 lg:col-span-4 order-2 ${idx % 2 !== 0 ? 'lg:order-1 text-right lg:pr-12' : 'lg:pl-12'} item-text`}>
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#6D4C41] mb-6 font-bold">{image.category} • Editorial</p>
                <h2 className="text-4xl md:text-5xl font-serif mb-8 text-[#3E2723] leading-tight">{image.title}</h2>
                <div className={`w-20 h-px bg-[#3E2723]/20 mb-8 ${idx % 2 !== 0 ? 'ml-auto' : ''}`}></div>
                <p className="text-[#6D4C41] font-light leading-relaxed text-lg max-w-sm mb-12">
                  {image.description}
                </p>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-4 border border-[#3E2723]/20 text-[10px] tracking-[0.3em] uppercase hover:bg-[#3E2723] hover:text-[#FDFBFA] transition-all duration-700 font-bold"
                >
                  Inquire Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-60 text-center">
            <h3 className="text-4xl md:text-6xl font-serif text-[#3E2723] mb-12">Crafting your legacy.</h3>
            <p className="text-[#6D4C41] max-w-xl mx-auto font-light text-xl leading-relaxed mb-20">
                Each page of our catalog is a testament to the timeless beauty found in the smallest of details. Let us tell your story.
            </p>
            <button 
                onClick={() => onNavigate('contact')}
                className="bg-[#3E2723] text-[#FDFBFA] px-14 py-6 text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-[#6D4C41] transition-all duration-700"
            >
                Start A Project
            </button>
        </section>
      </div>
    </div>
  );
};
