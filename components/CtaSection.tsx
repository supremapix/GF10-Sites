import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const CtaSection: React.FC = () => {
  return (
    <section id="contato" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-darker to-darker z-0" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Pronto para digitalizar seu negócio?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          Solicite seu orçamento agora e receba uma proposta personalizada para alavancar suas vendas online.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <a 
            href={CONTACT_INFO.whatsappBudget}
            className="flex items-center justify-center gap-3 px-8 py-5 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold rounded-full text-lg transition-transform hover:scale-105 shadow-lg"
          >
            <MessageCircle size={24} />
            Falar no WhatsApp
          </a>
          <a 
            href={CONTACT_INFO.phone}
            className="flex items-center justify-center gap-3 px-8 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-full text-lg transition-transform hover:scale-105"
          >
            Ligar: {CONTACT_INFO.displayPhone}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;