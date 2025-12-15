import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, ChevronDown, Mail, Phone, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const TypewriterText: React.FC<{ words: string[]; className?: string }> = ({ words, className }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < word.length) {
          setCurrentText(word.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(word.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const FloatingParticle: React.FC<{ delay: number; size: number; duration: number; left: string }> = ({ delay, size, duration, left }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-r from-primary/40 to-secondary/40"
    style={{ width: size, height: size, left, bottom: '-10%' }}
    initial={{ y: 0, opacity: 0 }}
    animate={{
      y: [0, -800],
      opacity: [0, 1, 1, 0],
      scale: [0.5, 1, 0.8],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

const GlowOrb: React.FC<{ className: string; color: string }> = ({ className, color }) => (
  <motion.div
    className={`absolute rounded-full blur-[100px] mix-blend-screen pointer-events-none ${className}`}
    style={{ background: color }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 30,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingWords = ['rápidos', 'modernos', 'responsivos', 'otimizados'];

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59, 130, 246, 0.15), transparent),
              radial-gradient(ellipse 60% 40% at 80% 50%, rgba(99, 102, 241, 0.1), transparent),
              radial-gradient(ellipse 50% 30% at 20% 80%, rgba(16, 185, 129, 0.08), transparent)
            `,
          }}
        />
        
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse 100% 100% at 0% 0%, rgba(59, 130, 246, 0.12) 0%, transparent 50%)',
              'radial-gradient(ellipse 100% 100% at 100% 0%, rgba(99, 102, 241, 0.12) 0%, transparent 50%)',
              'radial-gradient(ellipse 100% 100% at 100% 100%, rgba(16, 185, 129, 0.12) 0%, transparent 50%)',
              'radial-gradient(ellipse 100% 100% at 0% 100%, rgba(59, 130, 246, 0.12) 0%, transparent 50%)',
              'radial-gradient(ellipse 100% 100% at 0% 0%, rgba(59, 130, 246, 0.12) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          style={{ x: mousePosition.x * -1.5, y: mousePosition.y * -1.5 }}
          className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div
          style={{ x: mousePosition.x * 1.5, y: mousePosition.y * 1.5 }}
          className="absolute top-[30%] right-[10%] w-[400px] h-[400px] rounded-full bg-accent/15 blur-[100px]"
        />
        <motion.div
          style={{ x: mousePosition.x, y: mousePosition.y }}
          className="absolute bottom-[10%] left-[40%] w-[600px] h-[600px] rounded-full bg-secondary/10 blur-[140px]"
        />

        {[...Array(20)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.8}
            size={Math.random() * 6 + 2}
            duration={Math.random() * 10 + 15}
            left={`${Math.random() * 100}%`}
          />
        ))}

        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />

        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      <motion.div style={{ opacity, scale }} className="container mx-auto px-4 z-10 relative pt-20">
        <div className="max-w-6xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-10 relative group cursor-default"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 blur-xl group-hover:blur-2xl transition-all" />
            <div className="absolute inset-0 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl" />
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
            </span>
            <span className="relative text-sm text-gray-200 font-medium tracking-wide">Agência Digital Premium em Curitiba</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.05]">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="block text-white"
              >
                Criação de Sites e
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="block relative"
              >
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary blur-2xl opacity-50" />
                  <span 
                    className="relative bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
                    style={{
                      backgroundSize: '200% 100%',
                      animation: 'gradient-shift 4s ease-in-out infinite',
                    }}
                  >
                    Landing Pages Profissionais
                  </span>
                </span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="block text-white"
              >
                para Curitiba e Região
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light px-4"
          >
            Transforme seu negócio com sites{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-semibold">
                <TypewriterText words={floatingWords} />
              </span>
            </span>
            {' '}e otimizados para o <strong className="text-white font-semibold">Google</strong>. 
            Atendemos todos os bairros de Curitiba e cidades da região metropolitana.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 px-4"
          >
            <motion.a
              href={CONTACT_INFO.whatsappBudget}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(16, 185, 129, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-secondary to-emerald-400 text-slate-900 font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 shadow-[0_0_40px_rgba(16,185,129,0.3)] w-full sm:w-auto flex justify-center items-center gap-3"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_100%] group-hover:animate-[shimmer_1.5s_ease-in-out_infinite]" />
              <Zap className="w-5 h-5 relative z-10 fill-current" />
              <span className="relative z-10">Solicitar Orçamento</span>
            </motion.a>
            
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 font-semibold text-lg rounded-2xl overflow-hidden w-full sm:w-auto flex items-center justify-center gap-3 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 backdrop-blur-xl" />
              <span className="relative z-10 text-white">Ver Portfólio</span>
              <ArrowRight className="w-5 h-5 relative z-10 text-white group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex items-center justify-center gap-4 sm:gap-6"
          >
            {[
              { icon: MessageCircle, href: CONTACT_INFO.whatsappCommercial, color: 'from-green-500 to-emerald-400', label: 'WhatsApp' },
              { icon: Phone, href: CONTACT_INFO.phone, color: 'from-blue-500 to-cyan-400', label: 'Telefone' },
              { icon: Mail, href: `mailto:${CONTACT_INFO.email}`, color: 'from-purple-500 to-pink-400', label: 'E-mail' },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group relative p-4 rounded-2xl transition-all duration-300"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300`} />
                <div className="absolute inset-0 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 backdrop-blur-xl transition-all" />
                <item.icon className="w-6 h-6 relative z-10 text-gray-400 group-hover:text-white transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-medium">Descubra mais</span>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-secondary/50 rounded-full blur-lg opacity-50" />
            <ChevronDown className="w-6 h-6 text-gray-400 relative" />
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          0% { background-position: -250% 0; }
          100% { background-position: 250% 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
