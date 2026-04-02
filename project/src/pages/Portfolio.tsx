
import { useState, useEffect, useRef } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { webApi, PortfolioItem } from '../lib/web-api';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PortfolioProps {
  onNavigate: (page: string) => void;
}

export const Portfolio = ({ onNavigate }: PortfolioProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await webApi.portfolio.list();
      setItems(data);
      setLoading(false);
    };
    fetchItems();
  }, []);

  useGSAP(() => {
    if (loading) return;

    // Header Reveal
    gsap.from('.portfolio-header h1', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out'
    });

    // Items stagger
    gsap.from('.portfolio-grid-item', {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.portfolio-grid',
        start: 'top 85%'
      }
    });

  }, [loading, items]);

  const uniqueCategories = ['All', ...new Set(items.map(item => item.category).filter(Boolean))];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  return (
    <div ref={containerRef} className="bg-[#FDFBFA] text-[#3E2723] selection:bg-[#3E2723] selection:text-[#FDFBFA] pt-32 pb-40 min-h-screen">
      <SEO 
        title="Portfolio | Suraj Studio" 
        description="Browse our curated portfolio of luxury wedding and editorial photography." 
      />

      <div className="max-w-7xl mx-auto px-6">
        <header className="portfolio-header mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-[#3E2723]/10 pb-20">
            <div className="max-w-2xl">
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#6D4C41] mb-8 font-bold opacity-60">Visual Archive</p>
              <h1 className="text-6xl md:text-9xl font-serif leading-[0.9] tracking-tighter">
                Selected <br/><span className="italic font-light">Artworks</span>
              </h1>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-8">
              {uniqueCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-[10px] tracking-[0.3em] uppercase py-2 transition-all duration-500 border-b ${
                    selectedCategory === category 
                    ? 'text-[#3E2723] border-[#3E2723] font-bold' 
                    : 'text-[#6D4C41] border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </header>

        {loading ? (
          <div className="h-96 flex items-center justify-center">
             <div className="w-8 h-8 border-2 border-[#3E2723] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 lg:gap-y-32">
            {filteredItems.map((item, idx) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedImage(item)} 
                className={`portfolio-grid-item group cursor-pointer ${idx % 3 === 1 ? 'lg:mt-24' : idx % 3 === 2 ? 'lg:mt-48' : ''}`}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F2EF]">
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-out group-hover:scale-105 will-change-transform" 
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 bg-[#3E2723]/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
                <div className="mt-8 flex justify-between items-start">
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#6D4C41] mb-2 font-medium opacity-60">{item.category}</p>
                    <h3 className="text-2xl font-serif text-[#3E2723] group-hover:italic transition-all duration-300">{item.title}</h3>
                  </div>
                  <div className="w-10 h-10 border border-[#3E2723]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-4 group-hover:translate-x-0">
                    <ArrowRight className="w-4 h-4 text-[#3E2723]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredItems.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-[#6D4C41] font-light italic">Currently expanding this collection.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-[#FDFBFA] z-[99999] flex flex-col md:flex-row items-center justify-center overflow-hidden">
          <button 
            onClick={() => setSelectedImage(null)} 
            className="absolute top-10 right-10 text-[#3E2723] hover:scale-110 transition-transform z-10 p-4 border border-[#3E2723]/10 rounded-full bg-white/50 backdrop-blur"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="w-full h-full md:w-2/3 flex items-center justify-center p-6 md:p-20 overflow-hidden">
            <img 
              src={selectedImage.image_url} 
              alt={selectedImage.title} 
              className="max-w-full max-h-full object-contain shadow-2xl" 
            />
          </div>
          
          <div className="w-full md:w-1/3 h-auto md:h-full bg-white md:border-l border-[#3E2723]/10 p-10 md:p-20 flex flex-col justify-center">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#6D4C41] mb-6 font-bold">{selectedImage.category}</p>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 text-[#3E2723] leading-tight">{selectedImage.title}</h2>
            <div className="w-20 h-px bg-[#3E2723]/20 mb-10"></div>
            <p className="text-[#6D4C41] font-light leading-relaxed text-lg mb-14">
              {selectedImage.description}
            </p>
            <button 
              onClick={() => { setSelectedImage(null); onNavigate('contact'); }} 
              className="bg-[#3E2723] text-[#FDFBFA] w-full py-6 text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-[#6D4C41] transition-all duration-700"
            >
              Consult the Studio
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
