import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { webApi, PortfolioItem } from '../lib/web-api';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home = ({ onNavigate }: HomeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [heroBg, setHeroBg] = useState('/assets/wedding/hero.jpg');

  useEffect(() => {
    const fetchData = async () => {
      const [items, settings] = await Promise.all([
        webApi.portfolio.list(),
        webApi.settings.get()
      ]);
      setPortfolioItems(items.slice(0, 6)); 
      if (settings.hero_bg_url) setHeroBg(settings.hero_bg_url);
    };
    fetchData();
  }, []);

  useGSAP(() => {
    // Hero Animations
    const tl = gsap.timeline();
    tl.fromTo('.hero-title-line', 
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.2
      }
    )
    .fromTo('.hero-subtitle', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 
      '-=0.8'
    )
    .fromTo('.hero-btn', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 
      '-=0.6'
    );

    // Stats Section
    gsap.from('.stat-item', {
      scrollTrigger: {
        trigger: '.stats-section',
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out'
    });

    // Portfolio Section - Advanced Image Reveal
    gsap.from('.portfolio-header', {
      scrollTrigger: {
        trigger: '.portfolio-section',
        start: 'top 85%',
      },
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });

    gsap.utils.toArray<HTMLElement>('.portfolio-item').forEach((item) => {
      const imgContainer = item.querySelector('.img-container');
      const img = item.querySelector('img');
      const text = item.querySelector('.portfolio-text');

      const tlPort = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        }
      });

      if (imgContainer) {
        tlPort.fromTo(imgContainer, 
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power4.inOut' }
        );
      }
      if (img) {
        tlPort.fromTo(img,
          { scale: 1.2 },
          { scale: 1, duration: 1.5, ease: 'power4.inOut' },
          0 // sync with clipPath
        );
      }
      if (text) {
        tlPort.fromTo(text,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.8'
        );
      }
    });

    // Info section / Why Choose Us
    gsap.from('.info-block', {
      scrollTrigger: {
        trigger: '.info-section',
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out'
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-[#FDFBFA] text-[#3E2723] selection:bg-[#3E2723] selection:text-[#FDFBFA]">
      <SEO
        title="Suraj Studio | Luxury Wedding & Editorial Photography"
        description="Luxury photography and videography studio capturing authentic, timeless editorials."
        keywords="photography studio, cinematic videography, wedding photography, luxury photography, suraj studio"
      />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 z-0 scale-105 transform translate-y-[calc(var(--scroll-y,0)*0.5px)] will-change-transform"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Enhanced Overlay for Premium Feel */}
          <div className="absolute inset-0 bg-[#3E2723]/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBFA]/30 via-transparent to-[#FDFBFA]"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center justify-center h-full w-full">
          <div className="space-y-4 mb-10 overflow-hidden">
            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-serif text-[#3E2723] leading-[0.9] tracking-tighter">
              <div className="overflow-hidden"><div className="hero-title-line">Luxury</div></div>
              <div className="overflow-hidden py-2"><div className="hero-title-line italic text-[#6D4C41] font-light">Weddings</div></div>
              <div className="overflow-hidden"><div className="hero-title-line">Redefined</div></div>
            </h1>
          </div>
          
          <p className="hero-subtitle text-xl md:text-2xl text-[#6D4C41] max-w-2xl mx-auto font-light tracking-widest mb-14 uppercase opacity-80">
            Editorial Artistry for the Modern Couple
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button
              onClick={() => onNavigate('portfolio')}
              className="hero-btn group relative overflow-hidden border border-[#3E2723] bg-[#3E2723] text-[#FDFBFA] px-12 py-6 rounded-none uppercase tracking-[0.3em] text-[10px] font-bold hover:text-[#3E2723] transition-colors duration-700"
            >
              <span className="relative z-10">Explore Our World</span>
              <div className="absolute inset-0 bg-[#FDFBFA] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-expo"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Wedding Catalog Section - Refined and Enhanced */}
      <section className="py-40 px-6 bg-[#FDFBFA] overflow-hidden" id="wedding-catalog">
        <div className="max-w-7xl mx-auto">
          <div className="mb-32 text-center">
            <h2 className="text-xs tracking-[0.5em] uppercase text-[#6D4C41] mb-8 font-semibold opacity-60">The Wedding Catalog</h2>
            <h3 className="text-5xl md:text-8xl font-serif text-[#3E2723] leading-tight">Masterpieces of <br/><span className="italic font-light">Matrimony</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Main Featured Image */}
            <div className="md:col-span-7 portfolio-item group">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F2EF]">
                <img 
                  src="/assets/wedding/wedding-1.jpg" 
                  alt="Elegant Wedding Ceremony" 
                  className="w-full h-full object-cover transition-transform duration-[1s] ease-out group-hover:scale-105 will-change-transform"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
              <div className="mt-8">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#6D4C41] mb-2">Ceremony • Outdoor Luxury</p>
                <h4 className="text-3xl font-serif text-[#3E2723]">The Eternal Vow</h4>
              </div>
            </div>

            {/* Side Images Grid */}
            <div className="md:col-span-5 flex flex-col gap-20">
              <div className="portfolio-item group">
                <div className="relative aspect-[1/1] overflow-hidden bg-[#F5F2EF]">
                  <img 
                    src="/assets/wedding/wedding-2.jpg" 
                    alt="Wedding Detail" 
                    className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                  />
                </div>
                <div className="mt-6">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#6D4C41] mb-2">Portraits • Intimate</p>
                  <h4 className="text-2xl font-serif text-[#3E2723]">Silent Affection</h4>
                </div>
              </div>

              <div className="portfolio-item group md:ml-12">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F2EF] border-l-[20px] border-white shadow-2xl">
                  <img 
                    src="/assets/wedding/wedding-3.jpg" 
                    alt="Candid Wedding Moment" 
                    className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-6">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#6D4C41] mb-2">Editorial • Bridal</p>
                  <h4 className="text-2xl font-serif text-[#3E2723]">Golden Hour Grace</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-32">
             <div className="portfolio-item group">
                <div className="relative aspect-[16/9] overflow-hidden bg-[#F5F2EF]">
                  <img 
                    src="/assets/wedding/wedding-4.jpg" 
                    alt="Grand Celebration" 
                    className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-8">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#6D4C41] mb-2">Cinematography • Stills</p>
                  <h4 className="text-3xl font-serif text-[#3E2723]">Grandeur In Motion</h4>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="max-w-sm text-center">
                  <p className="text-[#6D4C41] leading-relaxed font-light mb-10 italic text-lg">
                    "Every wedding is a new canvas. We don't just take photos; we weave a visual tapestry that captures the depth of your soul's journey together."
                  </p>
                  <button 
                    onClick={() => onNavigate('contact')}
                    className="text-[#3E2723] uppercase tracking-[0.4em] text-[10px] font-bold border-b border-[#3E2723] pb-2 hover:opacity-50 transition-opacity"
                  >
                    View Entire Collection
                  </button>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Welcome Section */}
      <section className="py-40 px-6 bg-[#FDFBFA]">
        <div className="max-w-4xl mx-auto text-center font-serif text-3xl md:text-5xl leading-tight text-[#3E2723] stats-section">
          <p className="stat-item italic font-light">
            "We believe in the beauty of unscripted moments, refined into timeless works of art."
          </p>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 px-6 bg-[#FDFBFA] portfolio-section">
        <div className="max-w-7xl mx-auto">
          <div className="portfolio-header flex justify-between items-end mb-24 border-b border-[#3E2723]/10 pb-8">
            <h2 className="text-5xl md:text-7xl font-serif text-[#3E2723]">Selected Works</h2>
            <button
              onClick={() => onNavigate('portfolio')}
              className="hidden md:flex items-center gap-2 text-[#6D4C41] hover:text-[#3E2723] transition-colors uppercase tracking-[0.2em] text-xs font-medium pb-2"
            >
              Discover More <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-24">
            {portfolioItems.map((item, idx) => (
              <div key={item.id} className={`portfolio-item group cursor-pointer ${idx % 2 !== 0 ? 'md:mt-40' : ''}`} onClick={() => onNavigate('portfolio')}>
                <div className="img-container relative overflow-hidden bg-[#F0EAE1] aspect-[3/4] rounded-none">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 filter grayscale hover:grayscale-0" loading="lazy" />
                </div>
                <div className="portfolio-text mt-8 flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-serif mb-2 text-[#3E2723]">{item.title}</h3>
                    <p className="text-[#6D4C41] text-xs tracking-[0.2em] uppercase">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-24 text-center md:hidden">
            <button
              onClick={() => onNavigate('portfolio')}
              className="border border-[#3E2723] text-[#3E2723] px-10 py-5 rounded-none uppercase tracking-[0.2em] text-xs font-medium hover:bg-[#3E2723] hover:text-[#FDFBFA] transition-colors duration-500"
            >
              All Works
            </button>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-40 px-6 bg-[#FAF8F5] info-section border-t border-[#3E2723]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24">
            <div className="info-block space-y-10">
              <h2 className="text-5xl md:text-7xl font-serif text-[#3E2723]">Our Vision</h2>
              <p className="text-[#6D4C41] text-xl leading-relaxed font-light">
                We approach every commission as an editorial spread. 
                Our team is dedicated to capturing the authentic aesthetics of your fleeting moments, curating them into a sophisticated narrative.
                From exotic destination weddings to high-fashion campaigns.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-10 border-t border-[#3E2723]/10">
                <div>
                  <div className="text-4xl font-serif mb-3 text-[#3E2723]">15<span className="italic text-[#6D4C41]">yrs</span></div>
                  <div className="text-xs tracking-[0.2em] text-[#6D4C41] uppercase">Of Mastery</div>
                </div>
                <div>
                  <div className="text-4xl font-serif mb-3 text-[#3E2723]">5K<span className="italic text-[#6D4C41]">+</span></div>
                  <div className="text-xs tracking-[0.2em] text-[#6D4C41] uppercase">Stories Told</div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { title: 'Cinematography', desc: 'Narrative-driven luxury films' },
                { title: 'Portraiture', desc: 'Elegant & intimate artistry' },
                { title: 'Editorials', desc: 'High-fashion aesthetics' },
                { title: 'Destinations', desc: 'Available worldwide' }
              ].map((feature, idx) => (
                <div key={idx} className="info-block border border-[#3E2723]/10 p-10 bg-[#FDFBFA] hover:shadow-xl transition-shadow duration-[1s]">
                  <h3 className="text-xl font-serif mb-4 text-[#3E2723] tracking-wide">{feature.title}</h3>
                  <p className="text-[#6D4C41] text-sm font-light leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-40 px-6 bg-[#FDFBFA] text-center flex flex-col items-center justify-center border-t border-[#3E2723]/10">
        <div className="max-w-3xl mx-auto info-section">
          <h2 className="info-block text-6xl md:text-8xl font-serif mb-10 text-[#3E2723] italic">Inquire.</h2>
          <p className="info-block text-[#6D4C41] text-xl mb-14 font-light leading-relaxed">
            We accept a highly curated selection of commissions each year to ensure the absolute pinnacle of artistic dedication to you.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="info-block border border-[#3E2723] bg-[#3E2723] text-[#FDFBFA] px-12 py-5 rounded-none uppercase tracking-[0.2em] text-xs font-medium hover:bg-transparent hover:text-[#3E2723] transition-colors duration-500"
          >
            Connect With Us
          </button>
        </div>
      </section>
    </div>
  );
};
