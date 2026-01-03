import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Zap, ChevronDown, Code, Smartphone, Rocket } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const MagneticButton: React.FC<{ children: React.ReactNode; className?: string; href?: string }> = ({ children, className, href }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

const FloatingElement: React.FC<{ children: React.ReactNode; depth: number; className?: string }> = ({ children, depth, className }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
        y: (e.clientY - window.innerHeight / 2) / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      animate={{
        x: mousePos.x * 40 * depth,
        y: mousePos.y * 40 * depth,
        rotate: mousePos.x * 10 * depth
      }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
      className={`absolute pointer-events-none z-0 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  
  // Title Animation Variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const titleText = "Criação de Sites e Landing Pages Profissionais";
  const words = titleText.split(" ");

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-darker" />
        <motion.div style={{ y: y1 }} className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-50" />
        <motion.div style={{ y: y1 }} className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] mix-blend-screen opacity-50" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
      </div>

      {/* Floating Elements */}
      <FloatingElement depth={1} className="top-[20%] left-[10%] text-primary/20">
        <Code size={64} />
      </FloatingElement>
      <FloatingElement depth={1.5} className="bottom-[30%] right-[10%] text-secondary/20">
        <Smartphone size={80} />
      </FloatingElement>
      <FloatingElement depth={0.5} className="top-[30%] right-[20%] text-accent/20">
        <Rocket size={48} />
      </FloatingElement>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-5xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default shadow-lg shadow-primary/5"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
            </span>
            <span className="text-sm text-gray-200 font-semibold tracking-wide">Agência Digital Premium em Curitiba</span>
          </motion.div>

          <motion.div
            className="overflow-hidden flex flex-wrap justify-center gap-x-3 gap-y-1 mb-8"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {words.map((word, index) => (
              <motion.span 
                variants={child} 
                key={index} 
                className={`text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] ${
                  index >= 3 ? "text-gradient" : "text-white"
                }`}
              >
                {word}
              </motion.span>
            ))}
            <motion.span variants={child} className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white block w-full mt-2">
              para Curitiba e Região
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="text-lg md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Transforme seu negócio com sites <strong className="text-white font-semibold relative inline-block">
              rápidos
              <svg className="absolute w-full h-2 bottom-0 left-0 text-secondary -z-10 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" /></svg>
            </strong>, modernos e otimizados para o Google.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <MagneticButton
              href={CONTACT_INFO.whatsappBudget}
              className="group relative px-8 py-4 bg-secondary text-darker font-bold text-lg rounded-full overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.3)] w-full sm:w-auto flex justify-center items-center"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative flex items-center gap-2">
                <Zap className="w-5 h-5 fill-darker" />
                Solicitar Orçamento
              </span>
            </MagneticButton>
            
            <MagneticButton
              href="#portfolio"
              className="group px-8 py-4 bg-white/5 text-white font-semibold text-lg rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all w-full sm:w-auto flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              Ver Portfólio
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Role para descobrir</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
};

export default Hero;