import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ExternalLink, Briefcase, Building2, Utensils, Stethoscope, ShoppingBag, Gavel, Zap, Truck, Dumbbell } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const projects = [
  {
    title: "Advocacia Curitiba",
    category: "Jurídico",
    icon: <Gavel size={32} />,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20"
  },
  {
    title: "Clínica Sorriso",
    category: "Saúde & Odonto",
    icon: <Stethoscope size={32} />,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20"
  },
  {
    title: "Sabor & Arte",
    category: "Gastronomia",
    icon: <Utensils size={32} />,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20"
  },
  {
    title: "Construtora Pinhais",
    category: "Engenharia",
    icon: <Building2 size={32} />,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20"
  },
  {
    title: "Moda Curitiba",
    category: "E-commerce",
    icon: <ShoppingBag size={32} />,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    border: "border-pink-400/20"
  },
  {
    title: "Tech Solutions",
    category: "Tecnologia",
    icon: <Zap size={32} />,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20"
  }
];

const highlights = [
  { title: "Transportadora Rápida", icon: <Truck size={24} />, category: "Logística" },
  { title: "Academia Iron", icon: <Dumbbell size={24} />, category: "Fitness" },
  { title: "Consultoria RH", icon: <Briefcase size={24} />, category: "Corporativo" },
];

const PortfolioCard: React.FC<{ project: typeof projects[0]; index: number }> = ({ project, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.a
      href={CONTACT_INFO.portfolioInquiry}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className="group relative h-64 rounded-3xl bg-white/5 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-6 cursor-pointer"
    >
      <motion.div
        className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Icon Container */}
      <div className={`relative z-10 w-20 h-20 rounded-full ${project.bg} ${project.border} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(0,0,0,0.2)]`}>
        <div className={`${project.color} group-hover:animate-pulse`}>
          {project.icon}
        </div>
      </div>

      <div className="relative z-10 text-center">
        <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${project.color}`}>
          {project.category}
        </span>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span>Ver Detalhes</span>
          <ExternalLink size={14} />
        </div>
      </div>
    </motion.a>
  );
};

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-24 bg-darker relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            Portfólio Premium
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Nossos Clientes e <span className="text-gradient">Projetos</span>
            <br /><span className="text-2xl md:text-4xl text-white">Curitiba e Região</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Conheça os clientes que confiaram na Suprema Sites Express para transformar sua presença digital.
            Clique para saber como podemos fazer o mesmo por você.
          </motion.p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {projects.map((project, index) => (
            <PortfolioCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Highlights Carousel Title */}
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-widest text-gray-500 font-bold">Mais Projetos de Sucesso</p>
        </div>

        {/* Highlights Carousel (Scroll Snap) */}
        <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar">
            {highlights.map((item, index) => (
              <motion.a
                key={index}
                href={CONTACT_INFO.portfolioInquiry}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className="snap-center shrink-0 w-[280px] bg-white/5 border border-white/5 rounded-2xl p-6 flex items-center gap-4 hover:bg-white/10 transition-colors group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-darker flex items-center justify-center text-gray-400 group-hover:text-secondary group-hover:scale-110 transition-all shadow-inner">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold group-hover:text-secondary transition-colors">{item.title}</h4>
                  <span className="text-xs text-gray-500">{item.category}</span>
                </div>
                <ExternalLink className="ml-auto text-gray-600 group-hover:text-white w-4 h-4" />
              </motion.a>
            ))}
            
            {/* CTA Card in Carousel */}
            <motion.a
               href={CONTACT_INFO.whatsappBudget}
               className="snap-center shrink-0 w-[280px] bg-gradient-to-br from-secondary/20 to-primary/20 border border-secondary/30 rounded-2xl p-6 flex items-center justify-center gap-2 hover:brightness-110 transition-all cursor-pointer"
            >
              <span className="text-white font-bold">Seu Projeto Aqui</span>
              <div className="w-8 h-8 rounded-full bg-secondary text-darker flex items-center justify-center font-bold">+</div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;