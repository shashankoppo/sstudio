import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer = ({ onNavigate }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FDFBFA] border-t border-[#3E2723]/10 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-1">
            <h3 className="text-3xl font-serif text-[#3E2723] mb-8">Suraj Studio</h3>
            <p className="text-[#6D4C41] text-sm leading-relaxed mb-8">
              Capturing life's most beautiful moments with cinematic elegance and artistic vision. Let us tell your unique story.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[#3E2723] hover:text-[#6D4C41] transition-colors p-2 border border-[#3E2723]/10 rounded-full hover:border-[#3E2723]" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="text-[#3E2723] hover:text-[#6D4C41] transition-colors p-2 border border-[#3E2723]/10 rounded-full hover:border-[#3E2723]" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="text-[#3E2723] hover:text-[#6D4C41] transition-colors p-2 border border-[#3E2723]/10 rounded-full hover:border-[#3E2723]" title="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-[#3E2723] hover:text-[#6D4C41] transition-colors p-2 border border-[#3E2723]/10 rounded-full hover:border-[#3E2723]" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] text-[#3E2723] uppercase mb-8 font-medium">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={() => onNavigate('home')} className="text-[#6D4C41] hover:text-[#3E2723] transition-colors text-sm">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="text-[#6D4C41] hover:text-[#3E2723] transition-colors text-sm">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="text-[#6D4C41] hover:text-[#3E2723] transition-colors text-sm">
                  Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-[#6D4C41] hover:text-[#3E2723] transition-colors text-sm">
                  About
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] text-[#3E2723] uppercase mb-8 font-medium">Services</h4>
            <ul className="space-y-4 text-sm text-[#6D4C41]">
              <li className="hover:text-[#3E2723] transition-colors cursor-pointer">Wedding Photography</li>
              <li className="hover:text-[#3E2723] transition-colors cursor-pointer">Cinematic Videography</li>
              <li className="hover:text-[#3E2723] transition-colors cursor-pointer">Fashion & Editorial</li>
              <li className="hover:text-[#3E2723] transition-colors cursor-pointer">Commercial Shoots</li>
              <li className="hover:text-[#3E2723] transition-colors cursor-pointer">Pre-Wedding Stories</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] text-[#3E2723] uppercase mb-8 font-medium">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Phone className="w-4 h-4 text-[#3E2723] flex-shrink-0 mt-1" />
                <a href="tel:+918827917220" className="text-[#6D4C41] hover:text-[#3E2723] transition-colors text-sm">
                  +91 88279 17220
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="w-4 h-4 text-[#3E2723] flex-shrink-0 mt-1" />
                <a href="mailto:surajstudios999@gmail.com" className="text-[#6D4C41] hover:text-[#3E2723] transition-colors text-sm">
                  surajstudios999@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-[#3E2723] flex-shrink-0 mt-1" />
                <span className="text-[#6D4C41] text-sm leading-relaxed">Jabalpur, Madhya Pradesh<br/>India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#3E2723]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#8D7B73] text-sm">&copy; {currentYear} Suraj Studio. All rights reserved.</p>
          <div className="text-[#8D7B73] text-sm flex gap-6">
            <a href="#" className="hover:text-[#3E2723] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#3E2723] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
