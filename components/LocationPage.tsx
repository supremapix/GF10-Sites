import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CheckCircle, Zap, Globe, Smartphone, Search, MessageCircle, ChevronRight, Layout, Share2, X, Copy, Facebook, Linkedin, Twitter, Check } from 'lucide-react';
import EnhancedSEO from './EnhancedSEO';

const LocationPage: React.FC<{ type: 'bairro' | 'cidade' }> = ({ type }) => {
  const { name } = useParams<{ name: string }>();
  const decodedName = decodeURIComponent(name || '');
  
  // WhatsApp Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá, meu nome é *${formData.name}*.%0A` +
                 `Telefone: *${formData.phone}*.%0A` +
                 `Sou de *${decodedName}*.%0A` +
                 `Mensagem: ${formData.message}`;
    window.open(`https://wa.me/5541992721004?text=${text}`, '_blank');
  };

  // Content Generation Helper
  const locationType = type === 'bairro' ? 'no bairro' : 'na cidade de';
  const locationPreposition = type === 'bairro' ? 'em' : 'em';

  const shareUrl = window.location.href;
  const shareText = `Confira a Suprema Sites Express, especialista em criação de sites em ${decodedName}!`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Suprema Sites - ${decodedName}`,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error, fallback to modal if needed or ignore
        if ((err as Error).name !== 'AbortError') {
          setIsShareModalOpen(true);
        }
      }
    } else {
      setIsShareModalOpen(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pageTitle = `Criação de Sites em ${decodedName} | Web Designer ${decodedName} - Suprema Sites`;
  const pageDescription = `Empresa de Criação de Sites profissionais e Landing Pages em ${decodedName}. Desenvolvimento web otimizado para SEO, rápido e responsivo para empresas de ${decodedName}.`;
  const pageKeywords = `criação de sites ${decodedName}, web designer ${decodedName}, sites profissionais ${decodedName}, landing page ${decodedName}, SEO ${decodedName}, desenvolvimento web ${decodedName}`;

  return (
    <>
      <EnhancedSEO
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={`/${type}/${encodeURIComponent(decodedName)}`}
        type="local_business"
        location={decodedName}
        locationType={type}
        keywords={pageKeywords}
      />

      <div className="bg-darker min-h-screen pt-24 pb-12">
        {/* Header Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-darker z-0" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            
            <div className="flex justify-center items-center gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10"
              >
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-gray-300 text-sm uppercase tracking-wider">Atendimento Exclusivo {locationType} {decodedName}</span>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 text-white transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">Compartilhar</span>
              </motion.button>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Criação de Sites Profissionais <br />
              <span className="text-gradient">em {decodedName}</span>
            </motion.h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              Aumente suas vendas e a visibilidade do seu negócio {locationType} {decodedName} com um site moderno, rápido e otimizado para o Google.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12 text-gray-300 leading-relaxed">
            
            {/* Content Blocks - Simulating 18 blocks through structured content */}
            <article className="prose prose-invert prose-lg max-w-none">
              
              {/* Block 1-3: Introduction */}
              <h2 className="text-3xl font-bold text-white mb-4">Desenvolvimento Web {locationType} {decodedName}</h2>
              <p>
                Se você possui uma empresa {locationType} <strong>{decodedName}</strong>, sabe que a concorrência está cada vez mais acirrada. 
                Ter uma presença digital sólida não é mais um luxo, mas uma necessidade absoluta para quem deseja crescer e captar novos clientes na região.
                A Suprema Sites Express traz para {decodedName} a tecnologia mais avançada em desenvolvimento web.
              </p>
              <p>
                Nossos sites são desenvolvidos com foco total em performance e conversão. Entendemos as particularidades do mercado de {decodedName} 
                e criamos soluções sob medida para destacar o seu negócio localmente e globalmente.
              </p>

              {/* Block 4-6: Benefits */}
              <div className="my-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Por que empresas de {decodedName} escolhem a Suprema Sites?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><CheckCircle className="w-6 h-6 text-secondary shrink-0" /> <span>Sites ultra rápidos que carregam em milissegundos.</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-6 h-6 text-secondary shrink-0" /> <span>Otimização SEO Local para aparecer nas buscas de {decodedName}.</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-6 h-6 text-secondary shrink-0" /> <span>Design premium que transmite autoridade e confiança.</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-6 h-6 text-secondary shrink-0" /> <span>Integração total com WhatsApp e Redes Sociais.</span></li>
                </ul>
              </div>

              {/* Block 7-9: Local Economy & Services */}
              <h2 className="text-3xl font-bold text-white mb-4">Impulsione seu Negócio Local em {decodedName}</h2>
              <p>
                A região de {decodedName} possui um potencial econômico vibrante. Negócios locais, desde comércios tradicionais até prestadores de serviços, 
                podem se beneficiar imensamente de um site profissional. Imagine um cliente procurando por seus serviços em {decodedName} e encontrando sua empresa 
                no topo do Google. É isso que proporcionamos.
              </p>
              <p>
                Trabalhamos com diversos nichos {locationType} {decodedName}: advogados, clínicas médicas, restaurantes, lojas de varejo, indústrias e prestadores de serviços.
                Cada projeto é único, desenhado para refletir a identidade da sua marca e conectar-se com o público de {decodedName}.
              </p>

               {/* Image Spacer */}
               <div className="my-10 rounded-2xl overflow-hidden relative h-64">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 mix-blend-overlay z-10" />
                 <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt={`Criação de Sites em ${decodedName}`} className="w-full h-full object-cover" />
               </div>

              {/* Block 10-12: SEO Focus */}
              <h2 className="text-3xl font-bold text-white mb-4">SEO Local: Seja Encontrado em {decodedName}</h2>
              <p>
                O SEO Local é a chave para atrair clientes que estão próximos a você. Quando alguém pesquisa "melhor [seu serviço] em {decodedName}", 
                sua empresa precisa aparecer. Nossa estrutura de código é otimizada para garantir que os motores de busca entendam sua relevância geográfica em {decodedName}.
              </p>
              
              {/* Block 13-15: Technical Details */}
              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Tecnologia de Ponta para {decodedName}</h3>
              <p>
                Não usamos templates lentos e genéricos. Nossos sites são construídos com as tecnologias mais modernas do mercado (React, Next.js, Tailwind), 
                garantindo segurança, estabilidade e uma experiência de usuário fluida para seus clientes em {decodedName}.
              </p>

               {/* Block 16-18: Call to Action & Conclusion */}
               <div className="mt-12 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 p-8 rounded-3xl border border-blue-500/30">
                 <h2 className="text-3xl font-bold text-white mb-4">Vamos transformar sua presença digital em {decodedName}?</h2>
                 <p className="mb-6">
                   Não deixe seu concorrente dominar o mercado digital em {decodedName}. Entre em contato hoje mesmo e solicite um orçamento sem compromisso.
                   Nossa equipe está pronta para atender empresas de todos os portes em {decodedName}.
                 </p>
                 <Link to="/" className="text-secondary font-bold hover:underline flex items-center gap-2">
                   Conheça mais sobre nossa agência <ChevronRight size={16} />
                 </Link>
               </div>

            </article>
          </div>

          {/* Sidebar - Contact Form */}
          <div className="lg:col-span-1">
             <div className="sticky top-24">
               <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary via-primary to-accent" />
                 
                 <h3 className="text-2xl font-bold text-white mb-2">Solicitar Orçamento</h3>
                 <p className="text-gray-400 text-sm mb-6">Receba uma proposta para seu negócio em {decodedName} via WhatsApp.</p>
                 
                 <form onSubmit={handleFormSubmit} className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-300 mb-1">Seu Nome</label>
                     <input 
                       type="text" 
                       name="name"
                       required
                       value={formData.name}
                       onChange={handleInputChange}
                       className="w-full bg-darker/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                       placeholder="Digite seu nome"
                     />
                   </div>
                   
                   <div>
                     <label className="block text-sm font-medium text-gray-300 mb-1">Seu Telefone/WhatsApp</label>
                     <input 
                       type="tel" 
                       name="phone"
                       required
                       value={formData.phone}
                       onChange={handleInputChange}
                       className="w-full bg-darker/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                       placeholder="(41) 99999-9999"
                     />
                   </div>
                   
                   <div>
                     <label className="block text-sm font-medium text-gray-300 mb-1">Mensagem (Opcional)</label>
                     <textarea 
                       name="message"
                       value={formData.message}
                       onChange={handleInputChange}
                       className="w-full bg-darker/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors h-24 resize-none"
                       placeholder={`Gostaria de um site para minha empresa em ${decodedName}...`}
                     ></textarea>
                   </div>
                   
                   <button 
                     type="submit"
                     className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg group"
                   >
                     <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
                     Enviar via WhatsApp
                   </button>
                 </form>

                 <div className="mt-6 pt-6 border-t border-white/5 text-center">
                    <p className="text-xs text-gray-500 mb-2">Ou ligue agora:</p>
                    <a href="tel:41992721004" className="text-xl font-bold text-white hover:text-primary transition-colors block">
                      (41) 99272-1004
                    </a>
                 </div>
               </div>
               
               {/* Quick Features */}
               <div className="mt-8 grid grid-cols-2 gap-4">
                 <div className="bg-white/5 p-4 rounded-xl text-center border border-white/5">
                   <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                   <span className="text-xs font-bold text-gray-300">Entrega Rápida</span>
                 </div>
                 <div className="bg-white/5 p-4 rounded-xl text-center border border-white/5">
                   <Layout className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                   <span className="text-xs font-bold text-gray-300">Layout Moderno</span>
                 </div>
                 <div className="bg-white/5 p-4 rounded-xl text-center border border-white/5">
                   <Search className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                   <span className="text-xs font-bold text-gray-300">SEO Incluso</span>
                 </div>
                 <div className="bg-white/5 p-4 rounded-xl text-center border border-white/5">
                   <Smartphone className="w-6 h-6 text-green-400 mx-auto mb-2" />
                   <span className="text-xs font-bold text-gray-300">100% Responsivo</span>
                 </div>
               </div>
             </div>
          </div>

        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-darker border border-white/10 rounded-3xl p-6 z-[101] shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Compartilhar Página</h3>
                <button 
                  onClick={() => setIsShareModalOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all">
                    <MessageCircle size={24} />
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-white">WhatsApp</span>
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Facebook size={24} />
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-white">Facebook</span>
                </a>

                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 rounded-full bg-blue-700/20 flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-all">
                    <Linkedin size={24} />
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-white">LinkedIn</span>
                </a>

                {/* Twitter */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all">
                    <Twitter size={24} />
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-white">Twitter</span>
                </a>
              </div>

              <div className="relative">
                <input 
                  type="text" 
                  value={shareUrl} 
                  readOnly 
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-sm text-gray-400 focus:outline-none"
                />
                <button 
                  onClick={handleCopyLink}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-md transition-colors text-primary"
                >
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LocationPage;