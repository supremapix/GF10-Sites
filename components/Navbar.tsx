import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, MapPin, ChevronRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';

const RocketIcon = () => {
  return (
    <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]"
        initial={{ y: 0 }}
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.2 } }}
      >
        {/* Rocket Body */}
        <path
          d="M12 2.5C12 2.5 16 6 16.5 11C17 15 15 18.5 15 18.5L12 16.5L9 18.5C9 18.5 7 15 7.5 11C8 6 12 2.5 12 2.5Z"
          className="fill-slate-950 stroke-blue-500 stroke-[1.5]"
        />
        {/* Window */}
        <circle cx="12" cy="10.5" r="2.5" className="fill-blue-500/20 stroke-blue-400 stroke-[1.5]" />
        
        {/* Fins */}
        <path d="M7.5 16L5 19H8" className="stroke-blue-500 stroke-[1.5] fill-blue-950/80" />
        <path d="M16.5 16L19 19H16" className="stroke-blue-500 stroke-[1.5] fill-blue-950/80" />
        
        {/* Flame (Animated) */}
        <motion.path
          d="M12 19L10 23H14L12 19Z"
          className="fill-emerald-500 blur-[1px]"
          animate={{ 
            scaleY: [0.8, 1.4, 0.8], 
            opacity: [0.6, 1, 0.6],
            fill: ["#10b981", "#3b82f6", "#10b981"] 
          }}
          transition={{ duration: 0.15, repeat: Infinity }}
        />
      </motion.svg>
      
      {/* Background Glow */}
      <motion.div 
        className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl -z-10"
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home', isExternal: false },
    { name: 'Curitiba', href: '/criacao-de-sites-curitiba', isExternal: true },
    { name: 'Serviços', href: '#servicos', isExternal: false },
    { name: 'Portfólio', href: '#portfolio', isExternal: false },
    { name: 'Depoimentos', href: '#depoimentos', isExternal: false },
    { name: 'Contato', href: '#contato', isExternal: false },
  ];

  const handleNavClick = (e: React.MouseEvent, link: { name: string; href: string; isExternal?: boolean }) => {
    if (link.isExternal) {
      setIsMobileMenuOpen(false);
      return;
    }
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname === '/') {
      const id = link.href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/' + link.href);
      }
    } else {
      navigate('/' + link.href);
    }
  };

  return (
    <nav
      className={`fixed w-full z-40 transition-all duration-300 ease-in-out border-b ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-2xl py-3 border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
          : 'bg-gradient-to-b from-black/80 to-transparent py-5 border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group relative z-50">
          <RocketIcon />
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              Suprema<span className="text-emerald-400">Sites</span>
            </span>
            <span className="text-[11px] font-bold tracking-[0.25em] text-gray-400 uppercase">
              Curitiba & RMC
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.isExternal ? (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-bold text-gray-200 hover:text-emerald-400 transition-colors py-2 px-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className="text-sm font-bold text-gray-200 hover:text-emerald-400 transition-colors py-2 px-1 relative group cursor-pointer"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            )
          ))}
          
          {/* Header Call Button */}
          <a
            href={CONTACT_INFO.whatsappCommercial}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.7)] transition-all flex items-center gap-2"
          >
            <MessageCircle size={16} className="fill-black" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

        {/* Mobile Hamburger Button (Seniors/Elderly Friendly - Big & Clear) */}
        <button
          className="md:hidden text-white bg-white/10 hover:bg-white/20 p-3 rounded-2xl border border-white/20 transition-all flex items-center gap-2 z-50 active:scale-95"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fechar Menu de Navegação" : "Abrir Menu de Navegação"}
        >
          {isMobileMenuOpen ? (
            <>
              <X size={28} className="text-white" />
              <span className="text-xs font-black uppercase text-white">Fechar</span>
            </>
          ) : (
            <>
              <Menu size={28} className="text-emerald-400" />
              <span className="text-xs font-black uppercase text-white">Menu</span>
            </>
          )}
        </button>
      </div>

      {/* Senior/Elderly-Friendly Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 w-full h-screen bg-black/98 backdrop-blur-2xl z-40 overflow-y-auto pt-24 pb-12 px-6 flex flex-col justify-between"
          >
            <div className="space-y-6 max-w-lg mx-auto w-full">
              
              {/* Easy-to-read Senior Navigation Links */}
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase text-emerald-400 tracking-wider block mb-2">
                  Navegação do Site
                </span>
                {navLinks.map((link) => (
                  link.isExternal ? (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 text-xl font-extrabold text-white hover:bg-emerald-500 hover:text-black transition-all flex items-center justify-between"
                    >
                      <span>{link.name}</span>
                      <ChevronRight size={22} className="text-emerald-400" />
                    </Link>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className="w-full py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 text-xl font-extrabold text-white hover:bg-emerald-500 hover:text-black transition-all flex items-center justify-between cursor-pointer"
                    >
                      <span>{link.name}</span>
                      <ChevronRight size={22} className="text-emerald-400" />
                    </a>
                  )
                ))}
              </div>

              {/* HIGHLIGHTED CONTACT BOX FOR SENIORS / ELDERLY ACCESS */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-black border-2 border-emerald-500/40 shadow-2xl space-y-4">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-base font-black text-white uppercase tracking-wide">
                    Atendimento Rápido por Telefone & WhatsApp
                  </h3>
                </div>

                {/* Direct Call Button (tel:) */}
                <a
                  href={CONTACT_INFO.phone}
                  className="w-full py-4 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-lg flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all"
                >
                  <Phone size={24} className="animate-bounce" />
                  <span>LIGAR AGORA: (41) 99272-1004</span>
                </a>

                {/* Direct WhatsApp Button */}
                <a
                  href={CONTACT_INFO.whatsappCommercial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-4 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl font-black text-lg flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all"
                >
                  <MessageCircle size={24} className="fill-black" />
                  <span>FALAR NO WHATSAPP 24H</span>
                </a>

                <div className="pt-2 text-xs text-gray-300 space-y-1">
                  <p className="flex items-center gap-2 font-medium">
                    <MapPin size={14} className="text-emerald-400" /> Curitiba - PR e Região Metropolitana
                  </p>
                  <p className="flex items-center gap-2 font-medium">
                    <Clock size={14} className="text-emerald-400" /> Atendimento Segunda a Sábado
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Close Drawer Action */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center max-w-lg mx-auto w-full">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm border border-white/20"
              >
                Voltar ao Site
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
