import React from 'react';
import { Zap, Rocket, CheckCircle, Clock, MapPin, Users, Award, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Benefits: React.FC = () => {
  const benefits = [
    { text: "Sites Ultra Rápidos", sub: "Google PageSpeed 95+", icon: <Rocket className="text-orange-500" /> },
    { text: "Design Exclusivo", sub: "UI/UX Premium", icon: <Zap className="text-yellow-400" /> },
    { text: "Foco em Vendas", sub: "Alta Conversão", icon: <Award className="text-secondary" /> },
    { text: "Atendimento Local", sub: "Curitiba e Região", icon: <MapPin className="text-primary" /> },
    { text: "Suporte Humanizado", sub: "Via WhatsApp", icon: <Users className="text-pink-500" /> },
    { text: "Entrega Ágil", sub: "Prazos Cumpridos", icon: <Clock className="text-cyan-400" /> },
  ];

  return (
    <section id="beneficios" className="py-24 bg-darker relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-darker to-darker pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Vantagens Competitivas</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Por que escolher a <span className="text-gradient">Suprema Sites</span>?
          </h2>
          <p className="text-gray-400 text-lg">
            Combinamos tecnologia de ponta com estratégias de marketing para entregar não apenas um site, mas uma máquina de vendas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all group flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-darker border border-white/5 shadow-lg group-hover:scale-110 transition-transform">
                {React.cloneElement(benefit.icon as React.ReactElement, { size: 24 })}
              </div>
              <div>
                <h3 className="font-bold text-lg text-white mb-1 group-hover:text-primary transition-colors">{benefit.text}</h3>
                <p className="text-sm text-gray-400">{benefit.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;