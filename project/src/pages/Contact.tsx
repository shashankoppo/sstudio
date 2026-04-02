
import { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { cities } from '../data/cities';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ContactProps {
  onNavigate: (page: string) => void;
}

export const Contact = ({ onNavigate }: ContactProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    service: '',
    eventDate: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    'Wedding Photography',
    'Pre-Wedding Shoots',
    'Destination Weddings',
    'Cinematic Videography',
    'Commercial Photography',
    'Fashion & Portfolio Shoots',
    'Drone Photography',
    'Documentary Films'
  ];

  useGSAP(() => {
    gsap.from('.contact-header h1', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out',
      delay: 0.2
    });
    gsap.from('.contact-main', {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.5
    });
  }, { scope: containerRef });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          message: `${formData.message}${formData.eventDate ? `\n\nEvent Date: ${formData.eventDate}` : ''}`,
          status: 'new'
        }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', phone: '', email: '', city: '', service: '', eventDate: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
       console.error(error);
       setIsSubmitting(false);
       alert('Something went wrong. Please connect with us directly via phone.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div ref={containerRef} className="bg-[#FDFBFA] text-[#3E2723] selection:bg-[#3E2723] selection:text-[#FDFBFA] pt-32 pb-40 min-h-screen">
      <SEO 
        title="Contact Us | Suraj Studio" 
        description="Book a consultation with our studio to begin your journey of high-end visual storytelling." 
      />

      <div className="max-w-7xl mx-auto px-6">
        <header className="contact-header text-center mb-32 border-b border-[#3E2723]/10 pb-24">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#6D4C41] mb-10 font-bold opacity-60">The Inquiry Space</p>
          <h1 className="text-6xl md:text-[8rem] font-serif leading-[0.9] tracking-tighter mb-12">
            Connect <br/><span className="italic font-light">With Us</span>
          </h1>
          <p className="text-[#6D4C41] text-xl font-light italic opacity-80">Reserved for serious visionaries.</p>
        </header>

        <div className="contact-main grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* Form Side */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 border border-[#3E2723]/10 bg-white">
                <div className="w-24 h-24 bg-[#3E2723] rounded-full flex items-center justify-center mb-10">
                  <CheckCircle className="w-12 h-12 text-[#FDFBFA]" strokeWidth={1} />
                </div>
                <h3 className="text-4xl font-serif mb-6 text-[#3E2723]">Received With Gratitude.</h3>
                <p className="text-[#6D4C41] text-lg mb-10 font-light">We will review your inquiry with meticulous care and touch base shortly.</p>
                <div className="flex flex-col gap-6 items-center">
                  <button onClick={() => setIsSubmitted(false)} className="text-[#3E2723] font-bold tracking-[0.2em] uppercase text-[10px] border-b border-[#3E2723] pb-2">New Inquiry</button>
                  <button onClick={() => onNavigate('home')} className="text-[#6D4C41] font-bold tracking-[0.2em] uppercase text-[10px] hover:text-[#3E2723] transition-colors">Return to Home</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-[#6D4C41] font-bold">Your Name</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="E.g. Isabella Rossi"
                      className="w-full bg-transparent border-b border-[#3E2723]/20 py-4 focus:border-[#3E2723] outline-none transition-colors text-xl font-serif"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-[#6D4C41] font-bold">Phone Number</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 000 000 000"
                      className="w-full bg-transparent border-b border-[#3E2723]/20 py-4 focus:border-[#3E2723] outline-none transition-colors text-xl font-serif"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] tracking-[0.3em] uppercase text-[#6D4C41] font-bold">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="E.g. Isabella@studio.com"
                    className="w-full bg-transparent border-b border-[#3E2723]/20 py-4 focus:border-[#3E2723] outline-none transition-colors text-xl font-serif"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-[#6D4C41] font-bold">City / Location</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-[#3E2723]/20 py-4 focus:border-[#3E2723] outline-none transition-colors text-lg font-serif appearance-none"
                    >
                      <option value="">Select location</option>
                      {cities.map((city) => <option key={city.name} value={city.name}>{city.name}</option>)}
                      <option value="other">Other / Destination</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-[#6D4C41] font-bold">Nature of Inquiry</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-[#3E2723]/20 py-4 focus:border-[#3E2723] outline-none transition-colors text-lg font-serif appearance-none"
                    >
                      <option value="">Select service</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] tracking-[0.3em] uppercase text-[#6D4C41] font-bold">Reserved Date</label>
                  <input
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#3E2723]/20 py-4 focus:border-[#3E2723] outline-none transition-colors text-xl font-serif"
                  />
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-[#6D4C41] font-bold">Notes / Vision</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Share the details of your visual dream..."
                      className="w-full bg-transparent border-b border-[#3E2723]/20 py-4 focus:border-[#3E2723] outline-none transition-colors text-xl font-serif resize-none"
                    ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#3E2723] text-[#FDFBFA] py-8 text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-[#6D4C41] transition-all duration-1000 flex items-center justify-center gap-4 disabled:opacity-50"
                >
                  {isSubmitting ? 'Whispering in Silence...' : 'Initiate Connection'}
                  {!isSubmitting && <Send className="w-3 h-3" />}
                </button>
              </form>
            )}
          </div>

          {/* Info Side */}
          <div className="lg:col-span-5 space-y-16">
            <div className="p-16 border border-[#3E2723]/10 space-y-12 h-full flex flex-col justify-center">
              <h3 className="text-3xl font-serif italic text-[#3E2723]">The Studio.</h3>
              
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <MapPin className="w-5 h-5 text-[#6D4C41] mt-1" strokeWidth={1} />
                  <div>
                    <h4 className="text-[10px] tracking-[0.3em] font-bold uppercase mb-2">Location</h4>
                    <p className="text-[#6D4C41] font-light">Jabalpur, Madhya Pradesh • Global</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <Phone className="w-5 h-5 text-[#6D4C41] mt-1" strokeWidth={1} />
                  <div>
                    <h4 className="text-[10px] tracking-[0.3em] font-bold uppercase mb-2">Direct</h4>
                    <a href="tel:+918827917220" className="text-[#6D4C41] font-light hover:text-[#3E2723] transition-colors">+91 88279 17220</a>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <Mail className="w-5 h-5 text-[#6D4C41] mt-1" strokeWidth={1} />
                  <div>
                    <h4 className="text-[10px] tracking-[0.3em] font-bold uppercase mb-2">Electronic</h4>
                    <a href="mailto:surajstudios999@gmail.com" className="text-[#6D4C41] font-light hover:text-[#3E2723] transition-colors">surajstudios999@gmail.com</a>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <Clock className="w-5 h-5 text-[#6D4C41] mt-1" strokeWidth={1} />
                  <div>
                    <h4 className="text-[10px] tracking-[0.3em] font-bold uppercase mb-2">Presence</h4>
                    <p className="text-[#6D4C41] font-light">Mon — Sat / 10:00 — 19:00 IST</p>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-[#3E2723]/10">
                 <button 
                  onClick={() => {
                    window.open(`https://wa.me/918827917220?text=${encodeURIComponent('Hi! I would like to inquire about your luxury photography services.')}`, '_blank');
                  }}
                  className="w-full py-6 border border-[#3E2723] text-[10px] tracking-[0.3em] uppercase text-[#3E2723] font-bold hover:bg-[#3E2723] hover:text-[#FDFBFA] transition-all duration-1000"
                 >
                   WhatsApp Consult
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section className="mt-40 h-[60vh] grayscale-map filter contrast-125 opacity-70 hover:opacity-100 transition-opacity duration-[2s]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58902.15658729971!2d79.90867922167969!3d23.181764000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981ae35e8255555%3A0x6f3efc6f4d2c3e77!2sJabalpur%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Suraj Studio Location"
          ></iframe>
        </section>
      </div>
    </div>
  );
};
