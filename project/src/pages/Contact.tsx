import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useIntersectionObserver } from '../hooks/useScrollAnimation';
import { cities } from '../data/cities';

interface ContactProps {
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

export const Contact = ({ onNavigate }: ContactProps) => {
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
    'Corporate Photography',
    'Fashion & Portfolio Shoots',
    'Event Photography',
    'Baby & Maternity Shoots',
    'Drone Photography',
    'Documentary Films',
    'Album Designing'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit lead to API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          service: formData.service,
          message: `${formData.message}${formData.eventDate ? `\n\nEvent Date: ${formData.eventDate}` : ''}`,
          status: 'new'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit lead');
      }

      // Show success message
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', phone: '', email: '', city: '', service: '', eventDate: '', message: '' });

      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting lead:', error);
      setIsSubmitting(false);
      alert('Failed to submit your inquiry. Please try again or contact us directly.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SEO
        title="Contact Us - Get Your Photography Quote in 60 Seconds | Suraj Studio"
        description="Contact Suraj Studio for professional photography services. Located in Jabalpur, serving PAN India. Call +91 98765 43210 or fill the form for instant quote."
        keywords="contact suraj studio, photography quote, book photographer jabalpur, wedding photography inquiry, professional photographer india"
      />

      <div className="min-h-screen bg-black text-white pt-24">
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">Get Your <span className="text-amber-500">Free Quote</span></h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">Fill the form below and get your personalized quote in just 60 seconds</p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <AnimatedSection>
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 border border-gray-700">
                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4">Thank You!</h3>
                        <p className="text-gray-300 text-lg mb-6">Your inquiry has been submitted successfully. Our team will contact you shortly.</p>
                        <button
                          onClick={() => setIsSubmitted(false)}
                          className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300"
                        >
                          Submit Another Inquiry
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-300">Full Name *</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-amber-500 transition-colors text-white"
                              placeholder="Your name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-300">Phone Number *</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-amber-500 transition-colors text-white"
                              placeholder="+91 98765 43210"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-300">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-amber-500 transition-colors text-white"
                            placeholder="your@email.com"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-300">City *</label>
                            <select
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-amber-500 transition-colors text-white"
                            >
                              <option value="">Select city</option>
                              {cities.map((city) => (
                                <option key={city.name} value={city.name}>
                                  {city.name}, {city.state}
                                </option>
                              ))}
                              <option value="other">Other</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-300">Service Required *</label>
                            <select
                              name="service"
                              value={formData.service}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-amber-500 transition-colors text-white"
                            >
                              <option value="">Select service</option>
                              {services.map((service) => (
                                <option key={service} value={service}>
                                  {service}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-300">Event Date</label>
                          <input
                            type="date"
                            name="eventDate"
                            value={formData.eventDate}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-amber-500 transition-colors text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-300">Additional Details</label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-amber-500 transition-colors text-white resize-none"
                            placeholder="Tell us more about your requirements..."
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
                              Submitting...
                            </>
                          ) : (
                            <>
                              Get Your Quote
                              <Send className="w-5 h-5" />
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </AnimatedSection>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <AnimatedSection delay={200}>
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
                    <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                          <div className="font-semibold mb-1">Address</div>
                          <div className="text-gray-400 text-sm">Jabalpur, Madhya Pradesh, India</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Phone className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                          <div className="font-semibold mb-1">Phone</div>
                          <a href="tel:+918827917220" className="text-gray-400 text-sm hover:text-amber-500 transition-colors">
                            +91 88279 17220
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Mail className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                          <div className="font-semibold mb-1">Email</div>
                          <a href="mailto:surajstudios999@gmail.com" className="text-gray-400 text-sm hover:text-amber-500 transition-colors">
                            surajstudios999@gmail.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                          <div className="font-semibold mb-1">Business Hours</div>
                          <div className="text-gray-400 text-sm">Mon - Sat: 10:00 AM - 7:00 PM, Sunday: By Appointment</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={300}>
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-black mb-4">Quick Contact</h3>
                    <p className="text-black/80 mb-6">Chat with us on WhatsApp for instant support.</p>
                    <button
                      onClick={() => {
                        const phone = '918827917220';
                        const message = 'Hi! I would like to inquire about your photography services and get a free quote.';
                        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
                      }}
                      className="w-full bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-900 transition-all duration-300"
                    >
                      Chat on WhatsApp
                    </button>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="text-amber-500">Location</span></h2>
                <p className="text-gray-400 text-lg">Visit our studio in Jabalpur, Madhya Pradesh</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="rounded-3xl overflow-hidden border border-gray-700 h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58902.15658729971!2d79.90867922167969!3d23.181764000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981ae35e8255555%3A0x6f3efc6f4d2c3e77!2sJabalpur%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Suraj Studio Location"
                ></iframe>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </>
  );
};
