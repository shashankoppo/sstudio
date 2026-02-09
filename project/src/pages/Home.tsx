import { useEffect, useRef } from 'react';
import { Camera, Award, Users, MapPin, ArrowRight, Star } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useIntersectionObserver } from '../hooks/useScrollAnimation';
import { testimonials } from '../data/testimonials';
import { portfolioItems } from '../data/portfolio';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { isVisible, setElement } = useIntersectionObserver({ threshold: 0.1 });
  return (
    <div
      ref={setElement}
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const Home = ({ onNavigate }: HomeProps) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <SEO
        title="Best Photo Studio in India | Wedding Photography & Videography | Suraj Studio"
        description="Suraj Studio - India's Top 10 Photo Studios, #1 in Jabalpur, MP. Professional wedding photography, pre-wedding shoots, cinematic videography, commercial photography serving PAN India."
        keywords="best photo studio in india, top photography studio india, wedding photographer india, photo studio jabalpur, best wedding photographer jabalpur"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Suraj Studio',
          image: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg',
          description: 'Top 10 Photo Studio in India, #1 in Jabalpur, MP',
          address: { '@type': 'PostalAddress', addressLocality: 'Jabalpur', addressRegion: 'Madhya Pradesh' },
          aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '500' }
        }}
      />

      <div className="min-h-screen bg-black text-white">
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div
            ref={heroRef}
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1920)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
          </div>

          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <span className="bg-amber-500/20 text-amber-500 px-4 py-2 rounded-full text-sm font-semibold border border-amber-500/30">Top 10 in India</span>
                <span className="bg-amber-500/20 text-amber-500 px-4 py-2 rounded-full text-sm font-semibold border border-amber-500/30">#1 Studio in Jabalpur</span>
                <span className="bg-amber-500/20 text-amber-500 px-4 py-2 rounded-full text-sm font-semibold border border-amber-500/30">Serving PAN India</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Capturing India's Most
                <span className="block mt-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">Powerful Stories</span>
                <span className="block mt-2">Through Lens</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Where emotions meet artistry. India's premier photography studio delivering cinematic excellence for weddings, fashion, and commercial projects.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  View Portfolio
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
                >
                  Get Quote in 60 Seconds
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Award, value: '15+', label: 'Years Experience' },
                { icon: Camera, value: '10K+', label: 'Projects Completed' },
                { icon: Users, value: '5K+', label: 'Happy Clients' },
                { icon: MapPin, value: '50+', label: 'Cities Covered' }
              ].map((item, idx) => (
                <AnimatedSection key={idx} delay={idx * 100}>
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <item.icon className="w-12 h-12 text-amber-500" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">{item.value}</div>
                    <div className="text-gray-400">{item.label}</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose <span className="text-amber-500">Suraj Studio</span></h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">Trusted by thousands across India for capturing life's most precious moments</p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Cinematic Excellence', desc: 'Hollywood-style cinematography and color grading' },
                { title: 'PAN India Coverage', desc: 'From Jabalpur to destinations across India' },
                { title: 'Celebrity-Level Service', desc: 'Premium, luxurious experience with personalized attention' },
                { title: 'Latest Technology', desc: 'State-of-the-art cameras, drones, and equipment' },
                { title: 'Experienced Team', desc: '15+ years of expertise with talented professionals' },
                { title: 'Fast Delivery', desc: 'Quick turnaround times without compromising quality' }
              ].map((feature, idx) => (
                <AnimatedSection key={idx} delay={idx * 100}>
                  <div className="bg-black/50 p-8 rounded-2xl border border-gray-800 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105">
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured <span className="text-amber-500">Portfolio</span></h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.slice(0, 6).map((item, idx) => (
                <AnimatedSection key={item.id} delay={idx * 100}>
                  <div className="group relative h-80 overflow-hidden rounded-2xl cursor-pointer" onClick={() => onNavigate('portfolio')}>
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-300 text-sm">{item.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection>
              <div className="text-center mt-12">
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
                >
                  View Full Portfolio
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our <span className="text-amber-500">Clients Say</span></h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((t, idx) => (
                <AnimatedSection key={t.id} delay={idx * 100}>
                  <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-amber-500/50 transition-all duration-300">
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed italic">"{t.content}"</p>
                    <div>
                      <div className="font-semibold text-white">{t.name}</div>
                      <div className="text-sm text-gray-400">{t.role}</div>
                      <div className="text-sm text-amber-500 mt-1">{t.location}</div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-r from-amber-500 to-amber-600">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Ready to Capture Your Story?</h2>
              <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">Let's create stunning memories together. Get your personalized quote in just 60 seconds.</p>
              <button
                onClick={() => onNavigate('contact')}
                className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
              >
                Get Your Free Quote
                <ArrowRight className="w-5 h-5" />
              </button>
            </AnimatedSection>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1s ease-out; }
      `}</style>
    </>
  );
};
