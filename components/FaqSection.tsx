import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
}

export const MAIN_FAQS: FaqItem[] = [
  {
    question: "Quanto tempo leva para criar um site profissional em Curitiba?",
    answer: "O prazo médio para a criação de um site profissional ou landing page varia de 5 a 10 dias úteis. Nossa equipe utiliza uma metodologia ágil que garante entregas rápidas sem comprometer a qualidade visual, a segurança ou o desempenho técnico no Google."
  },
  {
    question: "Por que uma empresa de Curitiba precisa de um site profissional?",
    answer: "Curitiba possui um mercado consumidor altamente digitalizado e exigente. Mais de 90% das jornadas de compra locais começam com uma pesquisa no Google. Ter um site institucional veloz e moderno garante que sua empresa no Portão, Batel, Rebouças, CIC ou Centro seja encontrada antes da concorrência."
  },
  {
    question: "O que um site profissional precisa ter para gerar resultados?",
    answer: "Um site de alta conversão precisa ter: 1) Design moderno e responsivo para celulares; 2) Carregamento ultra rápido (PageSpeed 90+); 3) Otimização SEO Local (Meta tags, Schema.org e palavras-chave locais); 4) Botões diretos de contato via WhatsApp e formulários; 5) Certificado de Segurança SSL."
  },
  {
    question: "Qual a diferença entre um site institucional e uma landing page?",
    answer: "Um site institucional apresenta a empresa de forma completa (sobre, múltiplos serviços, portfólio, contato, áreas atendidas e notícias). Já uma landing page é uma página única altamente focada em uma ação específica, ideal para campanhas de tráfego pago (Google Ads e Meta Ads) e captação direta de leads."
  },
  {
    question: "Ter um site profissional ajuda no ranqueamento do Google?",
    answer: "Com certeza. O Google prioriza sites com boa experiência do usuário (Core Web Vitals), estrutura técnica limpa, conteúdo relevante e arquitetura otimizada para SEO Local. Nossa engenharia de código garante que o robô do Google compreenda a autoridade da sua marca em Curitiba."
  },
  {
    question: "Como o SEO deve ser pensado durante a criação do site?",
    answer: "O SEO não deve ser um 'adicional' após o site pronto, mas sim a base da sua construção. Na GF10, o SEO é planejado desde a arquitetura de URLs, marcação Schema.org em JSON-LD, hierarquia correta de títulos (H1, H2, H3), otimização de imagens, velocidade de carregamento e linkagem interna."
  }
];

const FaqSection: React.FC<{ items?: FaqItem[]; title?: string; subtitle?: string }> = ({
  items = MAIN_FAQS,
  title = "Perguntas Frequentes sobre Criação de Sites",
  subtitle = "Tire suas dúvidas sobre desenvolvimento web, prazos e SEO em Curitiba"
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-darker relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4"
          >
            <HelpCircle size={16} />
            Dúvidas Frequentes
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            {title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 text-white font-semibold text-lg hover:text-primary transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1">{item.question}</span>
                  <div className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-primary/20 text-primary' : 'text-gray-400'}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 text-gray-300 leading-relaxed border-t border-white/5 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
