import { Award, Users, Globe, Zap, Heart, Star } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useIntersectionObserver } from '../hooks/useScrollAnimation';

interface AboutProps {
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

export const About = ({ onNavigate }: AboutProps) => {
  return (
    <>
      <SEO title="About Suraj Studio - India's Top 10 Photo Studios" description="Learn about Suraj Studio's 15+ year journey and expertise as India's Top 10 photography studio." />

      <div className="min-h-screen bg-black text-white pt-24">
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">About <span className="text-amber-500">Suraj Studio</span></h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">Crafting cinematic memories since 2009. India's premier photography destination.</p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-bold leading-tight">Our <span className="text-amber-500">Legacy</span></h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Founded in 2009, Suraj Studio emerged with a vision to revolutionize photography in India. Over 15 years, we've captured 10,000+ weddings and events, serving 5,000+ happy clients across India.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Our commitment to excellence, artistic vision, and cutting-edge technology has made us the studio of choice for discerning clients nationwide.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <img
                  src="https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg"
                  alt="Suraj Studio team"
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Why <span className="text-amber-500">Trust Us</span></h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Award, title: 'Award-Winning Team', desc: 'Recognized nationwide for excellence' },
                { icon: Users, title: '5000+ Happy Clients', desc: 'Consistent 5-star ratings' },
                { icon: Globe, title: 'Pan India Coverage', desc: 'Serving 50+ cities' },
                { icon: Zap, title: 'Latest Technology', desc: 'State-of-the-art equipment' },
                { icon: Heart, title: 'Passionate Team', desc: 'Dedicated professionals' },
                { icon: Star, title: 'Premium Service', desc: 'Personalized luxury experience' }
              ].map((item, idx) => (
                <AnimatedSection key={idx} delay={idx * 100}>
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-amber-500/50 transition-all duration-300 group">
                    <item.icon className="w-12 h-12 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-amber-500 transition-colors">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-r from-amber-500 to-amber-600">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Ready to Work Together?</h2>
              <button
                onClick={() => onNavigate('contact')}
                className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105"
              >
                Start Your Project
              </button>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </>
  );
};
