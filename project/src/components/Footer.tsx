import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer = ({ onNavigate }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Suraj Studio</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              India's Top 10 Photo Studio delivering cinematic excellence in photography and videography.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => onNavigate('home')} className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  About
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-amber-500 transition-colors cursor-pointer">Wedding Photography</li>
              <li className="hover:text-amber-500 transition-colors cursor-pointer">Videography</li>
              <li className="hover:text-amber-500 transition-colors cursor-pointer">Commercial Photography</li>
              <li className="hover:text-amber-500 transition-colors cursor-pointer">Drone Photography</li>
              <li className="hover:text-amber-500 transition-colors cursor-pointer">Event Coverage</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <a href="tel:+918827917220" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  +91 88279 17220
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <a href="mailto:surajstudios999@gmail.com" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  surajstudios999@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400 text-sm">Jabalpur, Madhya Pradesh, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-500 text-sm">&copy; {currentYear} Suraj Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
