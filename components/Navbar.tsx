import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RocketIcon = () => {
  return (
    <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        initial={{ y: 0 }}
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.2 } }}
      >
        {/* Rocket Body */}
        <path
          d="M12 2.5C12 2.5 16 6 16.5 11C17 15 15 18.5 15 18.5L12 16.5L9 18.5C9 18.5 7 15 7.5 11C8 6 12 2.5 12 2.5Z"
          className="fill-slate-900 stroke-blue-500 stroke-[1.5]"
        />
        {/* Window */}
        <circle cx="12" cy="10.5" r="2.5" className="fill-blue-500/20 stroke-blue-400 stroke-[1.5]" />
        
        {/* Fins */}
        <path d="M7.5 16L5 19H8" className="stroke-blue-600 stroke-[1.5] fill-blue-900/50" />
        <path d="M16.5 16L19 19H16" className="stroke-blue-600 stroke-[1.5] fill-blue-900/50" />
        
        {/* Flame (Animated) */}
        <motion.path
          d="M12 19L10 23H14L12 19Z"
          className="fill-orange-500 blur-[1px]"
          animate={{ 
            scaleY: [0.8, 1.4, 0.8], 
            opacity: [0.6, 1, 0.6],
            fill: ["#f97316", "#ef4444", "#f97316"] 
          }}
          transition={{ duration: 0.15, repeat: Infinity }}
        />
      </motion.svg>
      
      {/* Background Glow */}
      <motion.div 
        className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl -z-10"
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Clientes', href: '#depoimentos' }, // Mapping Clientes to Depoimentos as per context
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <nav
      className={`fixed w-full z-40 transition-all duration-500 ease-in-out border-b ${
        isScrolled 
          ? 'bg-darker/80 backdrop-blur-xl py-3 border-blue-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
          : 'bg-transparent py-6 border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group relative z-50">
          <RocketIcon />
          <div className={`flex flex-col leading-none transition-all duration-500 origin-left ${isScrolled ? 'scale-90' : 'scale-100'}`}>
            <span className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 group-hover:to-blue-300 transition-all drop-shadow-sm">
              Suprema
            </span>
            <span className="text-xs font-medium tracking-[0.3em] text-gray-300 group-hover:text-white transition-colors uppercase pl-0.5">
              Sites
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors py-2 px-1 group overflow-hidden"
            >
              <span className="relative z-10">{link.name}</span>
              {/* Animated Underline */}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </a>
          ))}
          
          <motion.a
            href="#contato"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] border border-white/10 transition-all overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              Orçamento
              <motion.span 
                animate={{ x: [0, 4, 0] }} 
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-0 left-0 w-full bg-darker/98 backdrop-blur-xl border-b border-white/10 overflow-hidden flex flex-col pt-24 px-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-medium text-gray-300 hover:text-blue-400 transition-all border-b border-white/5 pb-4 flex justify-between items-center group"
                >
                  {link.name}
                  <span className="opacity-0 group-hover:opacity-100 text-blue-500 transition-opacity">→</span>
                </motion.a>
              ))}
              <motion.a 
                href="#contato"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white font-bold text-lg shadow-lg mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Solicitar Orçamento
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;