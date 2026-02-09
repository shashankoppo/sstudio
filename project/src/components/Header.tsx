import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
}

export const Header = ({ onNavigate }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Portfolio', page: 'portfolio' },
    { label: 'Contact', page: 'contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
          <img src="/studio_logo.jpg.jpeg" alt="Suraj Studio Logo" className="h-12 w-12 object-contain rounded-full border border-amber-500/50" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white leading-tight">Suraj Studio</span>
            <span className="text-xs text-amber-500 font-semibold">India's Top 10</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className="text-gray-300 hover:text-amber-500 transition-colors font-medium text-sm"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+918827917220"
            className="flex items-center gap-2 text-gray-300 hover:text-amber-500 transition-colors text-sm font-medium"
          >
            <Phone className="w-4 h-4" />
            +91 88279 17220
          </a>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all text-sm"
          >
            Get Quote
          </button>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white p-2"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <nav className="flex flex-col p-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:text-amber-500 transition-colors font-medium text-left"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('contact');
                setIsMenuOpen(false);
              }}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-2 rounded-full font-semibold w-full"
            >
              Get Quote
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
