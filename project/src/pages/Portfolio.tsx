
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useIntersectionObserver } from '../hooks/useScrollAnimation';
import { webApi, PortfolioItem } from '../lib/web-api';

interface PortfolioProps {
  onNavigate: (page: string) => void;
}

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { isVisible, setElement } = useIntersectionObserver({ threshold: 0.1 });
  return (
    <div ref={setElement} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

export const Portfolio = ({ onNavigate }: PortfolioProps) => {
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

  // Extract unique categories from items
  const uniqueCategories = ['All', ...new Set(items.map(item => item.category).filter(Boolean))];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  return (
    <>
      <SEO title="Photography Portfolio - Wedding, Commercial & Fashion" description="Browse Suraj Studio's award-winning portfolio featuring wedding photography, commercial shoots, fashion photography, and cinematic videography." />

      <div className="min-h-screen bg-black text-white pt-24">
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">Our <span className="text-amber-500">Portfolio</span></h1>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                {uniqueCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/50'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </AnimatedSection>

            {loading ? (
              <div className="text-center text-gray-400 py-20">Loading portfolio...</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, idx) => (
                  <AnimatedSection key={item.id} delay={idx * 50}>
                    <div onClick={() => setSelectedImage(item)} className="group relative h-80 overflow-hidden rounded-2xl cursor-pointer">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="bg-amber-500 text-black text-xs font-semibold px-3 py-1 rounded-full mb-2 inline-block">{item.category}</span>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-300 text-sm">{item.description}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            )}

            {!loading && filteredItems.length === 0 && (
              <div className="text-center text-gray-400 py-10">No items found in this category.</div>
            )}

          </div>
        </section>

        {selectedImage && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 text-white hover:text-amber-500 transition-colors z-10">
              <X className="w-8 h-8" />
            </button>
            <div className="max-w-4xl w-full space-y-6">
              <img src={selectedImage.image_url} alt={selectedImage.title} className="w-full h-96 object-cover rounded-2xl" />
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700">
                <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                <p className="text-gray-300 mb-6">{selectedImage.description}</p>
                <button onClick={() => { setSelectedImage(null); onNavigate('contact'); }} className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105">
                  Book Similar Service
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
