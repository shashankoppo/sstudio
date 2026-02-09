import { Phone, Mail, MessageCircle } from 'lucide-react';

interface StickyCtaBarProps {
  onContactClick: () => void;
}

export const StickyCtaBar = ({ onContactClick }: StickyCtaBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-r from-amber-500 to-amber-600 border-t-2 border-amber-400 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-black font-bold text-sm">Ready to Book? Get Your Free Quote Today!</p>
          <p className="text-black/80 text-xs">Professional photography & videography services for all occasions</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="tel:+918827917220"
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-900 transition-all text-sm font-semibold"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
          <a
            href="mailto:surajstudios999@gmail.com"
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-900 transition-all text-sm font-semibold"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
          <a
            href="https://wa.me/918827917220?text=Hi! I would like to inquire about your photography services."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-900 transition-all text-sm font-semibold"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <button
            onClick={onContactClick}
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-900 transition-all font-bold text-sm"
          >
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
};
