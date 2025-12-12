import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Mail, ArrowUp } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const FloatingButtons: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50 items-end">
      {/* Scroll To Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="group flex items-center justify-center w-10 h-10 bg-darker/80 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:bg-white/10 transition-all duration-300"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Email Button */}
      <a
        href={`mailto:${CONTACT_INFO.email}`}
        className="group flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:bg-gray-600 transition-all duration-300 hover:scale-110 relative"
        aria-label="Email"
      >
        <Mail className="w-5 h-5 text-white relative z-10" />
        <span className="absolute right-14 bg-white text-dark py-1 px-3 rounded shadow-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Enviar Email
        </span>
      </a>

      {/* Phone Button - Call Now */}
      <a
        href={CONTACT_INFO.phone}
        className="group flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:bg-blue-500 transition-all duration-300 hover:scale-110 relative"
        aria-label="Ligar Agora"
      >
        <div className="absolute inset-0 rounded-full bg-blue-600 opacity-75 animate-ping group-hover:opacity-100"></div>
        <Phone className="w-6 h-6 text-white relative z-10" />
        <span className="absolute right-16 bg-white text-dark py-1 px-3 rounded shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Ligar Agora
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={CONTACT_INFO.whatsappCommercial}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:bg-[#1ebd59] transition-all duration-300 hover:scale-110 relative overflow-hidden"
        aria-label="WhatsApp"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></div>
        <MessageCircle className="w-7 h-7 text-white relative z-10 animate-pulse" />
        <span className="absolute right-16 bg-white text-dark py-1 px-3 rounded shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Orçamento WhatsApp
        </span>
      </a>
    </div>
  );
};

export default FloatingButtons;