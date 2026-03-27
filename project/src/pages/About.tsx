import { useRef } from 'react';
import { Award, Camera, Globe, Heart } from 'lucide-react';
import { SEO } from '../components/SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  onNavigate: (page: string) => void;
}

export const About = ({ onNavigate }: AboutProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Animations
    const tl = gsap.timeline();
    tl.from('.about-title', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out',
      delay: 0.1
    })
    .from('.about-subtitle', {
      opacity: 0,
      y: 30,
      duration: 1.2,
      ease: 'power3.out'
    }, '-=0.8')
    .from('.about-image', {
      opacity: 0,
      scale: 0.95,
      y: 40,
      duration: 1.5,
      ease: 'power3.out'
    }, '-=0.8');

    // Values section
    gsap.from('.value-item', {
      scrollTrigger: {
        trigger: '.values-section',
        start: 'top 85%'
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power3.out'
    });

    // Content Block
    gsap.from('.content-block', {
      scrollTrigger: {
        trigger: '.content-section',
        start: 'top 85%'
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-6 min-h-screen bg-[#FDFBFA] text-[#3E2723] selection:bg-[#3E2723] selection:text-[#FDFBFA]">
      <SEO
        title="About Us | Suraj Studio"
        description="Learn about the cinematic vision and talented team behind Suraj Studio's luxury photography."
        keywords="photography studio, cinematic videography, wedding photography, luxury photography, suraj studio"
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="about-title text-5xl md:text-8xl font-serif mb-8 leading-[1.0] text-[#3E2723]">Behind the <span className="italic text-[#6D4C41] font-light">Lens</span></h1>
          <p className="about-subtitle text-[#6D4C41] text-xl font-light leading-relaxed">
            We are a collective of cinematic storytellers, relentlessly dedicated to preserving the absolute authenticity and elegance of your life's greatest moments.
          </p>
        </div>

        <div className="about-image relative h-[60vh] md:h-[80vh] mb-32 overflow-hidden rounded-none">
          <img
            src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Suraj Studio Team capturing a moment"
            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-[2s]"
          />
          <div className="absolute inset-0 bg-[#FDFBFA]/10 mix-blend-screen"></div>
        </div>

        <div className="content-section grid md:grid-cols-2 gap-16 items-center mb-32">
          <div className="content-block">
            <h2 className="text-4xl md:text-6xl font-serif mb-8 text-[#3E2723] leading-tight">Crafting Timeless <span className="italic text-[#6D4C41]">Legacies</span></h2>
            <div className="space-y-6 text-[#6D4C41] text-lg font-light leading-relaxed">
              <p>
                Founded with a passion for high-fashion editorial aesthetics and emotional storytelling, Suraj Studio has spent over a decade refining the art of wedding and lifestyle photography.
              </p>
              <p>
                We do not just take photographs; we author visual poetry. From grand international destination weddings to intimate portrait sessions, we obsess over every frame, ensuring your memory is immortalized with uncompromising quality.
              </p>
            </div>
          </div>
          <div className="content-block grid grid-cols-2 gap-8">
            <div className="aspect-square overflow-hidden bg-[#F0EAE1]">
              <img src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-cover filter grayscale hover:scale-105 transition-transform duration-1000" alt="Editorial Shoot" />
            </div>
            <div className="aspect-square overflow-hidden bg-[#F0EAE1] mt-12">
              <img src="https://images.pexels.com/photos/2088210/pexels-photo-2088210.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-cover filter grayscale hover:scale-105 transition-transform duration-1000" alt="Cinematic Process" />
            </div>
          </div>
        </div>

        <div className="values-section py-20 border-t border-[#3E2723]/10">
          <h2 className="text-4xl font-serif mb-16 text-center text-[#3E2723]">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Camera, title: 'Artistic Vision', desc: 'Pursuing editorial perfection in every frame.' },
              { icon: Heart, title: 'Authenticity', desc: 'Capturing real, raw, unscripted emotion.' },
              { icon: Award, title: 'Excellence', desc: 'Delivering an uncompromised luxury experience.' },
              { icon: Globe, title: 'Global Reach', desc: 'Available for commissions worldwide.' }
            ].map((value, idx) => (
              <div key={idx} className="value-item text-center p-8 bg-[#FDFBFA] border border-[#3E2723]/10 hover:shadow-xl transition-shadow duration-[1s]">
                <div className="w-16 h-16 mx-auto mb-6 bg-[#3E2723] rounded-full flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-[#FDFBFA] text-opacity-90" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-serif mb-4 text-[#3E2723]">{value.title}</h3>
                <p className="text-[#6D4C41] text-sm font-light leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <section className="py-32 px-6 border-t border-[#3E2723]/10 text-center flex flex-col items-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-serif text-[#3E2723] mb-6 italic">Ready to talk?</h2>
            <p className="text-[#6D4C41] text-lg mb-12 font-light">Allow us to capture the essence of your story.</p>
            <button
              onClick={() => onNavigate('contact')}
              className="border border-[#3E2723] bg-[#3E2723] text-[#FDFBFA] px-10 py-5 rounded-none uppercase tracking-[0.2em] text-xs font-medium hover:bg-transparent hover:text-[#3E2723] transition-colors duration-500"
            >
              Contact the Studio
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
