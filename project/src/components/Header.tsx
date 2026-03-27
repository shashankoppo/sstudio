import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { webApi } from '../lib/web-api';

interface HeaderProps {
  onNavigate: (page: string) => void;
}

export const Header = ({ onNavigate }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Just pinging settings to keep the pattern alive, though logo is now pure Typography
    const fetchSettings = async () => {
      await webApi.settings.get();
    };
    fetchSettings();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sai Photo Inspired Nav Items
  const leftNav = [
    { label: 'Work', page: 'portfolio' },
    { label: 'Gallery', page: 'portfolio' },
    { label: 'Films', page: 'portfolio' }
  ];

  const rightNav = [
    { label: 'Workshop', page: 'services' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact Us', page: 'contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-[#FDFBFA]/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 flex items-center justify-between lg:grid lg:grid-cols-3">
        
        {/* Left Links */}
        <nav className="hidden lg:flex items-center justify-start gap-12">
          {leftNav.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.page)}
              className="text-[#3E2723] hover:text-[#8D7B73] transition-colors text-[11px] uppercase tracking-[0.3em] font-medium"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Center Logo */}
        <div className="flex items-center justify-center cursor-pointer group" onClick={() => onNavigate('home')}>
          {/* Typographic Logo Setup for a High-End Look */}
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-light tracking-[0.1em] text-[#3E2723] font-serif uppercase">Suraj</span>
            <span className="text-[10px] md:text-xs tracking-[0.4em] text-[#6D4C41] uppercase mt-1">Studio</span>
          </div>
        </div>

        {/* Right Links */}
        <div className="hidden lg:flex items-center justify-end gap-12">
          {rightNav.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.page)}
              className="text-[#3E2723] hover:text-[#8D7B73] transition-colors text-[11px] uppercase tracking-[0.3em] font-medium"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden justify-end">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#3E2723] p-2 hover:opacity-70 transition-opacity"
          >
            {isMenuOpen ? <X className="w-7 h-7" strokeWidth={1} /> : <Menu className="w-7 h-7" strokeWidth={1} />}
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#FDFBFA] flex flex-col items-center justify-center h-screen animate-in fade-in duration-500">
          <nav className="flex flex-col space-y-8 text-center">
            {[...leftNav, ...rightNav].map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.page);
                  setIsMenuOpen(false);
                }}
                className="text-[#3E2723] hover:text-[#8D7B73] transition-colors text-3xl md:text-4xl uppercase tracking-[0.2em] font-serif font-light"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
