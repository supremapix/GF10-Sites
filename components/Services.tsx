import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, Search, Database, Layout, ShieldCheck, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

const SERVICES_VIDEO_URL = "https://img.supremasite.com.br/seo-omar.mp4";

const services: ServiceItem[] = [
  {
    title: "Criação de Sites Profissionais",
    description: "Sites institucionais modernos, responsivos e gerenciáveis para fortalecer sua marca em Curitiba.",
    icon: <Monitor className="w-8 h-8 text-blue-400" />
  },
  {
    title: "Landing Pages de Alta Conversão",
    description: "Páginas focadas em vendas e captura de leads, otimizadas para campanhas no Google e Meta Ads.",
    icon: <Layout className="w-8 h-8 text-emerald-400" />
  },
  {
    title: "SEO Local para Curitiba & RMC",
    description: "Otimização técnica para aparecer na primeira página do Google no Portão, Batel, Rebouças, CIC e RMC.",
    icon: <Search className="w-8 h-8 text-cyan-400" />
  },
  {
    title: "Manutenção & Otimização",
    description: "Suporte contínuo, atualizações de segurança e otimização de velocidade para manter seu site imbatível.",
    icon: <Database className="w-8 h-8 text-emerald-400" />
  },
  {
    title: "Integração WhatsApp & CRM",
    description: "Botões de contato direto, formulários inteligentes e links rastreáveis de atendimento.",
    icon: <Smartphone className="w-8 h-8 text-green-400" />
  },
  {
    title: "Hospedagem de Alta Velocidade",
    description: "Servidores em nuvem de baixa latência com certificado SSL grátis para garantir máxima segurança.",
    icon: <ShieldCheck className="w-8 h-8 text-yellow-400" />
  }
];

const Services: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="servicos" className="py-24 bg-black relative z-10 overflow-hidden border-b border-white/10">
      {/* Background Video (Omar SEO 02) with Dark Scrim Overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-25 filter brightness-70 contrast-110"
        >
          <source src={SERVICES_VIDEO_URL} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90 z-10" />
      </div>

      <div className="container mx-auto px-4 mb-12 relative z-20">
        <div className="text-center max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-emerald-400 font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 block"
          >
            Soluções Digitais em Curitiba
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-black mb-6 text-white"
          >
            O que fazemos de <span className="text-gradient">melhor</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-300 text-base md:text-lg"
          >
            Engenharia web de alta performance aliada ao SEO estratégico para impulsionar suas vendas na internet.
          </motion.p>
        </div>
      </div>

      {/* Services Grid Container */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group glass-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden transition-all hover:-translate-y-2 hover:border-emerald-500/50 duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-emerald-300 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
                <a 
                  href="#contato"
                  className="text-xs font-bold uppercase tracking-wider text-emerald-400 group-hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
                >
                  Solicitar este serviço <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
