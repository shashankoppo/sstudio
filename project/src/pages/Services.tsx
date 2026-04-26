
import { Camera, Film, Users, BookOpen, Clock, Globe } from 'lucide-react';
import { SEO } from '../components/SEO';
import { services } from '../data/services';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServicesProps {
  onNavigate: (page: string) => void;
}

export const Services = ({ onNavigate }: ServicesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header Reveal
    gsap.from('.services-header h1', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out'
    });

    // Cards Stagger
    gsap.from('.service-card', {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 85%'
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-[#FDFBFA] text-[#3E2723] selection:bg-[#3E2723] selection:text-[#FDFBFA] pt-32 pb-40 min-h-screen">
      <SEO 
        title="Services | Suraj Studio" 
        description="Comprehensive luxury photography and videography services, from destination weddings to high-fashion editorials." 
      />

      <div className="max-w-7xl mx-auto px-6">
        <header className="services-header text-center mb-40 border-b border-[#3E2723]/10 pb-32">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#6D4C41] mb-10 font-bold opacity-60">The Scope of Work</p>
          <h1 className="text-6xl md:text-[9rem] font-serif leading-[0.9] tracking-tighter mb-16">
            Services <br/><span className="italic font-light">Defined</span>
          </h1>
          <p className="text-[#6D4C41] text-xl font-light leading-relaxed max-w-2xl mx-auto italic">
            "We offer more than just a service; we offer a dedication to the preservation of your legacy through an editorial lens."
          </p>
        </header>

        <div className="services-grid space-y-40">
           {services.map((service, idx) => (
             <div key={service.id} className={`service-card grid grid-cols-1 md:grid-cols-12 gap-16 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
               <div className={`md:col-span-6 lg:col-span-7 order-1 ${idx % 2 !== 0 ? 'md:order-2' : ''}`}>
                 <div className="relative aspect-[16/9] overflow-hidden bg-[#F5F2EF] group">
                    <img 
                        src={`/assets/wedding/wedding-${(idx % 4) + 1}.jpg`} 
                        alt={service.title} 
                        className="w-full h-full object-cover grayscale transition-all duration-[2s] ease-out group-hover:scale-105 group-hover:grayscale-0 will-change-transform"
                    />
                    <div className="absolute inset-0 bg-[#3E2723]/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                 </div>
               </div>

               <div className={`md:col-span-6 lg:col-span-5 order-2 ${idx % 2 !== 0 ? 'md:order-1 text-right lg:pr-12' : 'lg:pl-12'}`}>
                 <p className="text-[10px] tracking-[0.4em] uppercase text-[#6D4C41] mb-6 font-bold">{(service as any).category || 'Luxury'} • Commission</p>
                 <h2 className="text-4xl md:text-5xl font-serif mb-8 text-[#3E2723] leading-tight">{service.title}</h2>
                 <div className={`w-20 h-px bg-[#3E2723]/20 mb-8 ${idx % 2 !== 0 ? 'ml-auto' : ''}`}></div>
                 <p className="text-[#6D4C41] font-light leading-relaxed text-lg mb-12">
                   {service.description}
                 </p>
                 <div className={`mb-12 space-y-3 ${idx % 2 !== 0 ? 'flex flex-col items-end' : ''}`}>
                    {service.useCases.slice(0, 4).map((useCase, uIdx) => (
                      <div key={uIdx} className="flex items-center gap-3 text-xs tracking-widest text-[#3E2723] opacity-60">
                        <div className="w-1 h-1 bg-[#3E2723] rounded-full"></div>
                        {useCase}
                      </div>
                    ))}
                 </div>
                 <button 
                   onClick={() => onNavigate('contact')}
                   className="px-10 py-5 border border-[#3E2723] text-[10px] tracking-[0.4em] uppercase hover:bg-[#3E2723] hover:text-[#FDFBFA] transition-all duration-700 font-bold"
                 >
                   Tailor Your Experience
                 </button>
               </div>
             </div>
           ))}
        </div>

        {/* Features / Included Section */}
        <section className="mt-60 pt-40 border-t border-[#3E2723]/10">
          <div className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="text-5xl md:text-7xl font-serif text-[#3E2723] mb-12 italic">Precision & Care.</h2>
            <p className="text-[#6D4C41] text-xl font-light leading-relaxed">
              Every commission is treated as a high-fashion editorial, ensuring every detail is curated to perfection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { icon: Camera, title: 'Editorial Eyes', desc: 'Uncompromising high-fashion aesthetics in every frame.' },
              { icon: Film, title: 'Cinematic Narrative', desc: 'Films that feel like features, not just highlight reels.' },
              { icon: Users, title: 'Dedicated Team', desc: 'A lead artist and support crew for every grand event.' },
              { icon: BookOpen, title: 'Custom Albums', desc: 'Handcrafted heirlooms made from the finest materials.' },
              { icon: Clock, title: 'Priority Edits', desc: 'Rapid turnaround with world-class post-production.' },
              { icon: Globe, title: 'Global Access', desc: 'We travel where your story takes us, worldwide.' }
            ].map((f, i) => (
              <div key={i} className="p-10 border border-[#3E2723]/10 hover:shadow-2xl hover:shadow-[#3E2723]/5 transition-all duration-1000 group">
                <f.icon className="w-8 h-8 text-[#6D4C41] mb-8 group-hover:scale-110 transition-transform duration-700" strokeWidth={1} />
                <h3 className="text-xl font-serif mb-4 text-[#3E2723]">{f.title}</h3>
                <p className="text-[#6D4C41] text-sm leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-60 text-center">
            <h3 className="text-4xl md:text-9xl font-serif text-[#3E2723] mb-16 italic">Begin the Journey.</h3>
            <button 
                onClick={() => onNavigate('contact')}
                className="bg-[#3E2723] text-[#FDFBFA] px-16 py-8 text-[10px] tracking-[0.5em] uppercase font-bold hover:bg-[#6D4C41] transition-all duration-1000"
            >
                Inquire With the Studio
            </button>
        </section>
      </div>
    </div>
  );
};
