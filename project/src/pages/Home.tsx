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
  const [heroBg, setHeroBg] = useState('https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1920');

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
          className="absolute inset-0 z-0 scale-105 transform translate-y-[calc(var(--scroll-y,0)*0.5px)]"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-[#FDFBFA]/40 mix-blend-screen"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBFA]/20 via-transparent to-[#FDFBFA]"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center justify-center h-full w-full">
          <div className="space-y-2 mb-10 overflow-hidden">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#3E2723] leading-[1.0] tracking-tight">
              <div className="overflow-hidden"><div className="hero-title-line">Eternal</div></div>
              <div className="overflow-hidden"><div className="hero-title-line italic text-[#6D4C41] font-light">Elegance</div></div>
              <div className="overflow-hidden"><div className="hero-title-line">Captured</div></div>
            </h1>
          </div>
          
          <p className="hero-subtitle text-lg md:text-xl text-[#6D4C41] max-w-2xl mx-auto font-light tracking-wide mb-14">
            Curating visual poetry. We preserve your most cherished moments with an uncompromising editorial eye.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => onNavigate('portfolio')}
              className="hero-btn border border-[#3E2723] bg-[#3E2723] text-[#FDFBFA] px-10 py-5 rounded-none uppercase tracking-[0.2em] text-xs font-medium hover:bg-transparent hover:text-[#3E2723] transition-all duration-500"
            >
              Enter Portfolio
            </button>
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
