import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { ArrowRight, Zap, ChevronDown, Code, Smartphone, Rocket, CheckCircle2, TrendingUp, Award, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useNavigate, useLocation } from 'react-router-dom';

const HERO_VIDEO_URL = "https://img.supremasite.com.br/omar-seo.mp4";

// Animated Counter Component with smooth count-up logic
const AnimatedCounter: React.FC<{ value: number; prefix?: string; suffix?: string; label: string; sublabel: string }> = ({
  value,
  prefix = '',
  suffix = '',
  label,
  sublabel
}) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasAnimated, value]);

  return (
    <div ref={counterRef} className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center hover:border-emerald-500/40 transition-all shadow-2xl group">
      <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-1 font-mono tabular-nums flex items-center justify-center gap-0.5">
        <span className="text-emerald-400">{prefix}</span>
        <span className="text-white group-hover:text-emerald-300 transition-colors">{count}</span>
        <span className="text-emerald-400">{suffix}</span>
      </div>
      <div className="text-sm font-bold text-gray-100">{label}</div>
      <div className="text-xs text-gray-400 mt-0.5">{sublabel}</div>
    </div>
  );
};

const MagneticButton: React.FC<{ children: React.ReactNode; className?: string; href?: string; onClick?: (e: React.MouseEvent) => void }> = ({ children, className, href, onClick }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.2);
    y.set((clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
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

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const navigate = useNavigate();
  const location = useLocation();

  const handlePortfolioClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#portfolio');
    }
  };

  const titleText = "Criação de Sites e Landing Pages Profissionais";
  const words = titleText.split(" ");

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-16 bg-black">
      {/* Background Video (Omar SEO 01) with Dark Elegant Overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-35 filter brightness-75 contrast-120"
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
        {/* Dark Scrim Overlay for maximum text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black z-10" />
      </div>

      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Top Location Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-black/60 border border-emerald-500/30 mb-8 backdrop-blur-md hover:bg-black/80 transition-colors shadow-2xl cursor-default"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs sm:text-sm text-gray-200 font-bold tracking-wider uppercase">Agência Digital de Alta Performance · Curitiba</span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">
              Criação de Sites e <span className="text-gradient">Landing Pages</span> em Curitiba
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Desenvolvemos sites ultra rápidos, modernos e otimizados para colocar sua empresa no <strong className="text-white font-bold underline decoration-emerald-500 decoration-2 underline-offset-4">topo do Google</strong> no Portão, Batel, Rebouças, CIC e toda a Região.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16"
          >
            <MagneticButton
              href={CONTACT_INFO.whatsappBudget}
              className="group relative px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg rounded-full shadow-[0_0_30px_rgba(16,185,129,0.5)] w-full sm:w-auto flex justify-center items-center cursor-pointer transition-all hover:scale-105"
            >
              <span className="relative flex items-center gap-2">
                <Zap className="w-5 h-5 fill-black" />
                Solicitar Orçamento via WhatsApp
              </span>
            </MagneticButton>
            
            <MagneticButton
              href="#portfolio"
              onClick={handlePortfolioClick}
              className="group px-8 py-4 bg-white/10 text-white font-bold text-lg rounded-full border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all w-full sm:w-auto flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer"
            >
              Ver Nossos Projetos
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </motion.div>

          {/* ANIMATED COUNTERS / NUMEROS ANIMADOS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-white/10"
          >
            <AnimatedCounter
              value={150}
              prefix="+"
              label="Sites Entregues"
              sublabel="Em Curitiba e RMC"
            />
            <AnimatedCounter
              value={98}
              suffix="%"
              label="Satisfação"
              sublabel="Avaliações Positivas"
            />
            <AnimatedCounter
              value={95}
              prefix=""
              suffix="+"
              label="Google PageSpeed"
              sublabel="Otimização Máxima"
            />
            <AnimatedCounter
              value={10}
              suffix="x"
              label="Mais Orçamentos"
              sublabel="Aumento em Vendas"
            />
          </motion.div>

        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-12 flex flex-col items-center gap-1.5 text-gray-400 text-xs"
      >
        <span className="uppercase tracking-widest text-[11px]">Role para conhecer</span>
        <ChevronDown className="w-5 h-5 animate-bounce text-emerald-400" />
      </motion.div>
    </section>
  );
};

export default Hero;
