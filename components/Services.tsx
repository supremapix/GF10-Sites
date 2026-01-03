import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Monitor, Smartphone, Search, Database, Layout, ShieldCheck, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    title: "Criação de Sites Profissionais",
    description: "Sites institucionais modernos, responsivos e gerenciáveis para fortalecer sua marca.",
    icon: <Monitor className="w-8 h-8 text-primary" />
  },
  {
    title: "Landing Pages de Alta Conversão",
    description: "Páginas focadas em vendas e captura de leads, otimizadas para campanhas de anúncios.",
    icon: <Layout className="w-8 h-8 text-secondary" />
  },
  {
    title: "SEO Local para Curitiba",
    description: "Otimização para aparecer no Google quando buscarem por seus serviços na região.",
    icon: <Search className="w-8 h-8 text-accent" />
  },
  {
    title: "Manutenção e Atualização",
    description: "Suporte contínuo, atualizações de segurança e conteúdo para seu site estar sempre no ar.",
    icon: <Database className="w-8 h-8 text-pink-500" />
  },
  {
    title: "Integração WhatsApp & CRM",
    description: "Botões de contato direto e formulários conectados ao seu sistema de vendas.",
    icon: <Smartphone className="w-8 h-8 text-green-500" />
  },
  {
    title: "Hospedagem e Segurança",
    description: "Servidores rápidos com certificado SSL incluso para garantir a segurança dos dados.",
    icon: <ShieldCheck className="w-8 h-8 text-yellow-500" />
  }
];

const Services: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="servicos" className="py-24 bg-darker relative z-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            Nossas Soluções
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            O que fazemos de <span className="text-gradient">melhor</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-400 text-lg"
          >
            Desenvolvemos estratégias digitais completas. Arraste para o lado e conheça nossos serviços.
          </motion.p>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden pl-4 md:pl-0">
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-darker to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-darker to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          ref={scrollRef}
          className="flex gap-6 cursor-grab active:cursor-grabbing py-10 px-4 md:px-12"
          drag="x"
          dragConstraints={{ right: 0, left: -1800 }} // Adjust based on content width
          whileTap={{ cursor: "grabbing" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group min-w-[320px] md:min-w-[380px] h-[400px] glass-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden transition-all hover:-translate-y-4 duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-secondary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-6 border-t border-white/5">
                <span className="text-sm font-semibold text-white/50 group-hover:text-white flex items-center gap-2 transition-colors">
                  Saiba mais <ArrowRight size={16} />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;