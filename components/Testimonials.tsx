import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { TestimonialItem } from '../types';

const testimonials: TestimonialItem[] = [
  {
    name: "Ricardo Oliveira",
    role: "Diretor Comercial",
    company: "Oliveira Imóveis",
    content: "O site ficou incrível! Moderno, rápido e já começamos a receber mais contatos na primeira semana. O atendimento foi impecável.",
    image: "https://picsum.photos/100/100?random=10"
  },
  {
    name: "Ana Clara",
    role: "Proprietária",
    company: "Studio Bella",
    content: "A landing page que criaram para minha clínica transformou meu negócio. O visual ficou muito profissional e as vendas aumentaram 40%.",
    image: "https://picsum.photos/100/100?random=11"
  },
  {
    name: "Carlos Mendes",
    role: "CEO",
    company: "Mendes Tech",
    content: "Equipe extremamente competente. Entenderam perfeitamente a proposta da nossa startup e entregaram antes do prazo.",
    image: "https://picsum.photos/100/100?random=12"
  },
  {
    name: "Juliana Santos",
    role: "Gerente",
    company: "Restaurante Sabor",
    content: "O cardápio digital integrado ao WhatsApp facilitou muito nossos pedidos. Recomendo de olhos fechados!",
    image: "https://picsum.photos/100/100?random=13"
  },
  {
    name: "Marcos Vinicius",
    role: "Advogado",
    company: "Advocacia MV",
    content: "Profissionalismo do início ao fim. O site transmite a autoridade que eu precisava para o meu escritório.",
    image: "https://picsum.photos/100/100?random=14"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="depoimentos" className="py-24 bg-dark overflow-hidden relative">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Clientes Satisfeitos</h2>
        <p className="text-gray-400">Veja porque nossos clientes recomendam nossos serviços.</p>
      </div>

      <div className="relative w-full">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-dark to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-dark to-transparent" />

        {/* Marquee Container */}
        <div className="flex overflow-hidden w-full mask-image-linear-gradient">
          <motion.div
            className="flex gap-6 py-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 30, 
              ease: "linear", 
              repeat: Infinity 
            }}
            style={{ width: "max-content" }}
          >
            {/* Duplicated list for seamless infinite scroll */}
            {[...testimonials, ...testimonials].map((item, index) => (
              <div 
                key={index} 
                className="w-[350px] glass-card p-8 rounded-2xl relative flex-shrink-0 border border-white/5 hover:border-secondary/30 transition-colors"
              >
                <div className="absolute top-6 right-8 text-white/10">
                  <Quote size={40} />
                </div>
                
                <div className="flex gap-1 mb-6 text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                
                <p className="text-gray-300 mb-8 italic leading-relaxed min-h-[80px]">"{item.content}"</p>
                
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full ring-2 ring-secondary/30" />
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-400">{item.role}, {item.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;