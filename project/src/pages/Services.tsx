import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { SEO } from '../components/SEO';
import { useIntersectionObserver } from '../hooks/useScrollAnimation';
import { services } from '../data/services';

interface ServicesProps {
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

export const Services = ({ onNavigate }: ServicesProps) => {
  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="w-12 h-12" /> : <Icons.Camera className="w-12 h-12" />;
  };

  return (
    <>
      <SEO
        title="Photography Services - Wedding, Commercial, Fashion & More | Suraj Studio"
        description="Comprehensive photography services by Suraj Studio: Wedding photography, pre-wedding shoots, cinematic videography, commercial photography, fashion shoots, corporate events, and more. Serving PAN India."
        keywords="wedding photography india, pre-wedding shoots, commercial photography, fashion photography, corporate photography, event photography, drone photography, cinematic videography"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Photography and Videography Services',
          provider: { '@type': 'LocalBusiness', name: 'Suraj Studio' },
          areaServed: 'India'
        }}
      />

      <div className="min-h-screen bg-black text-white pt-24">
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">Our <span className="text-amber-500">Services</span></h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">Comprehensive photography and videography solutions for every occasion</p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-8">
              {services.map((service, idx) => (
                <AnimatedSection key={service.id} delay={idx * 50}>
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-all duration-300 group">
                    <div className="grid lg:grid-cols-3 gap-8 p-8 lg:p-10">
                      <div className="lg:col-span-1">
                        <div className="flex items-start gap-4">
                          <div className="text-amber-500 group-hover:scale-110 transition-transform flex-shrink-0">
                            {getIcon(service.icon)}
                          </div>
                          <div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-amber-500 transition-colors">
                              {service.title}
                            </h2>
                            <div className="w-16 h-1 bg-amber-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-2 space-y-6">
                        <p className="text-gray-300 text-lg leading-relaxed">{service.description}</p>
                        <div>
                          <h3 className="text-lg font-semibold mb-3 text-amber-500">Perfect For:</h3>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {service.useCases.map((useCase, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                <span className="text-gray-400">{useCase}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                          <button
                            onClick={() => onNavigate('contact')}
                            className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                          >
                            Get Quote
                            <ArrowRight className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onNavigate('portfolio')}
                            className="border-2 border-gray-600 text-gray-300 px-6 py-3 rounded-full font-semibold hover:border-amber-500 hover:text-amber-500 transition-all duration-300"
                          >
                            View Portfolio
                          </button>
                        </div>
                      </div>
                    </div>
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
                <h2 className="text-4xl md:text-5xl font-bold mb-4">What's <span className="text-amber-500">Included</span></h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                'Professional Photography Team',
                'High-Resolution Images',
                'Cinematic Videography',
                'Color Grading & Editing',
                'Online Gallery Access',
                'Quick Turnaround Time',
                'Drone Coverage (Selected Services)',
                'Multiple Camera Angles',
                'Raw Files Available',
                'Custom Album Design',
                'Social Media Ready Edits',
                'Unlimited Consultations'
              ].map((feature, idx) => (
                <AnimatedSection key={idx} delay={idx * 50}>
                  <div className="flex items-start gap-4 bg-black/50 p-6 rounded-xl border border-gray-800 hover:border-amber-500/50 transition-all duration-300">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 md:p-16 border border-gray-700">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                  <h2 className="text-4xl md:text-5xl font-bold">Custom <span className="text-amber-500">Packages</span> Available</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Every event is unique. We offer fully customizable photography and videography solutions tailored to your specific requirements, budget, and vision.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                    <button
                      onClick={() => onNavigate('contact')}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
                    >
                      Request Custom Quote
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </>
  );
};
