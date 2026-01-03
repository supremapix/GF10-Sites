import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section className="py-24 bg-darker relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/4 w-1/3 h-1/2 bg-primary/5 rounded-l-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Equipe trabalhando" 
                className="rounded-2xl shadow-2xl border border-white/10 relative z-10 hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-secondary/10 rounded-2xl -z-0 border border-secondary/20" />
              <div className="absolute -top-6 -left-6 w-1/3 h-1/3 bg-primary/20 rounded-full blur-xl -z-0" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">Sobre a Empresa</span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Excelência Digital em <span className="text-gradient">Curitiba</span>
            </motion.h2>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                Na <strong>Suprema Sites Express</strong>, não apenas criamos sites; construímos infraestruturas digitais projetadas para performance. Somos uma agência focada em entregar resultados reais para negócios locais em Curitiba e Região Metropolitana.
              </p>
              <p>
                Nossa metodologia combina design de alto impacto visual com engenharia de software avançada, garantindo que seu site seja não apenas bonito, mas extremamente rápido, seguro e vendedor.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Equipe Especializada', 'Foco em Vendas', 'Tecnologia de Ponta', 'Suporte Premium'].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="text-secondary w-5 h-5" />
                  <span className="text-gray-200 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;