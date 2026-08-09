import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CheckCircle, Zap, Globe, Smartphone, Search, MessageCircle, ChevronRight, Layout, Share2, X, Copy, Facebook, Linkedin, Twitter, Check, Building2, HelpCircle, ArrowLeft } from 'lucide-react';
import { CONTACT_INFO, PRIORITY_NEIGHBORHOODS_DATA, NEIGHBORHOODS, CITIES, SITE_URL } from '../constants';

const LocationPage: React.FC<{ type: 'bairro' | 'cidade' }> = ({ type }) => {
  const { name } = useParams<{ name: string }>();
  const decodedName = decodeURIComponent(name || '');
  
  // Check if priority neighborhood (Portão, Batel, Rebouças, CIC)
  const priorityData = PRIORITY_NEIGHBORHOODS_DATA[decodedName];

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
                 `Sou do(a) *${decodedName}* (${type === 'bairro' ? 'Bairro em Curitiba' : 'Cidade'}).%0A` +
                 `Mensagem: ${formData.message || 'Gostaria de um orçamento para criação de site.'}`;
    window.open(`https://wa.me/5541992721004?text=${text}`, '_blank');
  };

  // Content Helpers
  const locationType = type === 'bairro' ? 'no bairro' : 'na cidade de';
  const locationContext = type === 'bairro' ? 'Curitiba' : 'Região Metropolitana de Curitiba';
  const canonicalUrl = `${SITE_URL}/${type}/${encodeURIComponent(decodedName)}`;

  const shareUrl = window.location.href;
  const shareText = `Confira a GF10 Suprema Sites Express, especialista em criação de sites em ${decodedName}!`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `GF10 Suprema Sites - ${decodedName}`,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
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

  // Local FAQs
  const localFaqs = priorityData ? priorityData.faq : [
    {
      question: `Por que investir em um site profissional em ${decodedName}?`,
      answer: `Empresas ${locationType} ${decodedName} que possuem site profissional atraem mais clientes via Google, transmitem maior credibilidade e recebem orçamentos diretamente pelo WhatsApp.`
    },
    {
      question: `Qual o prazo para criação de um site para empresas de ${decodedName}?`,
      answer: `Nosso prazo médio de entrega é de 5 a 10 dias úteis com layout personalizado, versão mobile e otimização para SEO Local.`
    }
  ];

  return (
    <>
      <Helmet>
        <title>{`Criação de Sites em ${decodedName} | Web Design & SEO - GF10`}</title>
        <meta name="description" content={`Empresa de Criação de Sites Profissionais e Landing Pages em ${decodedName} (${locationContext}). Desenvolvimento web moderno, rápido e otimizado para o Google.`} />
        <meta name="keywords" content={`criação de sites ${decodedName}, desenvolvimento de sites ${decodedName}, site profissional ${decodedName}, empresa de sites ${decodedName}, seo local ${decodedName}`} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`Criação de Sites Profissionais em ${decodedName} | GF10`} />
        <meta property="og:description" content={`Desenvolvimento de sites rápidos, responsivos e focados em vendas para empresas em ${decodedName}.`} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />

        {/* Schema.org @graph */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "BreadcrumbList",
                  "@id": "${canonicalUrl}#breadcrumb",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Início",
                      "item": "${SITE_URL}/"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Criação de Sites em Curitiba",
                      "item": "${SITE_URL}/criacao-de-sites-curitiba"
                    },
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "name": "${decodedName}",
                      "item": "${canonicalUrl}"
                    }
                  ]
                },
                {
                  "@type": "WebPage",
                  "@id": "${canonicalUrl}#webpage",
                  "url": "${canonicalUrl}",
                  "name": "Criação de Sites em ${decodedName}",
                  "isPartOf": {
                    "@id": "${SITE_URL}/#website"
                  },
                  "breadcrumb": {
                    "@id": "${canonicalUrl}#breadcrumb"
                  },
                  "inLanguage": "pt-BR"
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "${canonicalUrl}#localbusiness",
                  "name": "GF10 Suprema Sites Express - ${decodedName}",
                  "telephone": "5541992721004",
                  "email": "contato@supremasite.com.br",
                  "url": "${canonicalUrl}",
                  "priceRange": "$$",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "${type === 'cidade' ? decodedName : 'Curitiba'}",
                    "addressRegion": "PR",
                    "addressCountry": "BR"
                  },
                  "areaServed": "${decodedName}",
                  "description": "Agência de criação de sites profissionais e SEO Local atendendo ${decodedName}."
                },
                {
                  "@type": "FAQPage",
                  "@id": "${canonicalUrl}#faq",
                  "mainEntity": [
                    ${localFaqs.map(faq => `
                      {
                        "@type": "Question",
                        "name": ${JSON.stringify(faq.question)},
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": ${JSON.stringify(faq.answer)}
                        }
                      }
                    `).join(',')}
                  ]
                }
              ]
            }
          `}
        </script>
      </Helmet>

      <div className="bg-darker min-h-screen pt-28 pb-12">
        
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">Início</Link>
            <ChevronRight size={12} />
            <Link to="/criacao-de-sites-curitiba" className="hover:text-primary transition-colors">Criação de Sites Curitiba</Link>
            <ChevronRight size={12} />
            <span className="text-white font-medium">{decodedName}</span>
          </nav>
        </div>

        {/* Header Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-darker z-0" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            
            <div className="flex justify-center items-center gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10"
              >
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-gray-200 text-xs font-semibold uppercase tracking-wider">Atendimento {locationType} {decodedName}</span>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 text-white transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-xs font-medium">Compartilhar</span>
              </motion.button>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Criação de Sites Profissionais <br />
              <span className="text-gradient">{locationType} {decodedName}</span>
            </motion.h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 font-light">
              {priorityData ? priorityData.tagline : `Aumente suas vendas e a visibilidade da sua empresa ${locationType} ${decodedName} com um site moderno, rápido e otimizado para o Google.`}
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12 text-gray-300 leading-relaxed">
            
            <article className="prose prose-invert prose-lg max-w-none space-y-8">
              
              {/* Regional Editorial Section */}
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 shadow-xl">
                <h2 className="text-3xl font-bold text-white mb-4">Desenvolvimento Web {locationType} {decodedName}</h2>
                {priorityData ? (
                  <>
                    <p className="text-gray-300 text-lg leading-relaxed mb-4">{priorityData.intro}</p>
                    <div className="my-6 p-4 bg-darker/60 rounded-2xl border border-white/5">
                      <h4 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Pontos de Referência & Destaques Locais:</h4>
                      <div className="flex flex-wrap gap-2">
                        {priorityData.landmarks.map((landmark, idx) => (
                          <span key={idx} className="bg-white/5 px-3 py-1 rounded-full text-xs text-gray-300 border border-white/10">
                            {landmark}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <p>
                    Se você possui uma empresa {locationType} <strong>{decodedName}</strong>, ter uma presença digital sólida é o passo mais eficiente para captar novos clientes. A GF10 / Suprema Sites Express traz para {decodedName} soluções completas de desenvolvimento web e SEO Local.
                  </p>
                )}
                <p>
                  Nossos sites são projetados para carregar em milissegundos, responder perfeitamente em smartphones e se posicionar nas primeiras pesquisas geolocalizadas do Google.
                </p>
              </div>

              {/* Local Business Ecosystem */}
              {priorityData && (
                <div className="bg-gradient-to-br from-blue-950/20 to-darker p-8 rounded-3xl border border-blue-500/20">
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                    <Building2 className="text-primary" />
                    Ecossistema Comercial & Perfil de Negócios em {decodedName}
                  </h3>
                  <p className="text-gray-300 mb-4">{priorityData.businessEcosystem}</p>
                  <p className="text-gray-300"><strong>Estratégia SEO Recomendada:</strong> {priorityData.localSeoStrategy}</p>
                </div>
              )}

              {/* Core Benefits */}
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Por que empresas de {decodedName} escolhem a GF10?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-1" /> <span>Sites ultra rápidos com pontuação PageSpeed alta.</span></div>
                  <div className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-1" /> <span>Otimização SEO Local para buscas em {decodedName}.</span></div>
                  <div className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-1" /> <span>Design exclusivo e moderno em React e Tailwind.</span></div>
                  <div className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-1" /> <span>Integração com WhatsApp e formulários diretos.</span></div>
                </div>
              </div>

              {/* Local FAQ Section */}
              <div className="p-8 bg-dark p-6 rounded-3xl border border-white/10 space-y-6">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <HelpCircle className="text-secondary" />
                  Perguntas Frequentes sobre Sites em {decodedName}
                </h3>
                <div className="space-y-4">
                  {localFaqs.map((faq, idx) => (
                    <div key={idx} className="bg-white/5 p-5 rounded-2xl border border-white/5">
                      <h4 className="font-bold text-white mb-2 text-base">{faq.question}</h4>
                      <p className="text-gray-300 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Priority Cross Linking */}
              <div className="p-8 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-3xl border border-blue-500/20">
                <h3 className="text-xl font-bold text-white mb-4">Conheça Nossas Soluções em Outros Polos de Curitiba</h3>
                <div className="flex flex-wrap gap-3">
                  <Link to="/criacao-de-sites-curitiba" className="bg-primary/20 hover:bg-primary/30 text-white px-4 py-2 rounded-xl text-sm font-semibold border border-primary/30 transition-colors">
                    Criação de Sites em Curitiba (Geral)
                  </Link>
                  {Object.keys(PRIORITY_NEIGHBORHOODS_DATA).map((pName) => (
                    pName !== decodedName && (
                      <Link 
                        key={pName} 
                        to={`/bairro/${encodeURIComponent(pName)}`}
                        className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-3 py-2 rounded-xl text-xs border border-white/10 transition-colors"
                      >
                        Bairro {pName}
                      </Link>
                    )
                  ))}
                </div>
              </div>

            </article>
          </div>

          {/* Sidebar - Contact Form */}
          <div className="lg:col-span-1">
             <div className="sticky top-28">
               <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary via-primary to-accent" />
                 
                 <h3 className="text-2xl font-bold text-white mb-2">Solicitar Orçamento</h3>
                 <p className="text-gray-400 text-sm mb-6">Receba uma proposta personalizada para seu negócio em {decodedName}.</p>
                 
                 <form onSubmit={handleFormSubmit} className="space-y-4">
                   <div>
                     <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">Seu Nome *</label>
                     <input 
                       type="text" 
                       name="name"
                       required
                       value={formData.name}
                       onChange={handleInputChange}
                       className="w-full bg-darker/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors text-sm"
                       placeholder="Digite seu nome"
                     />
                   </div>
                   
                   <div>
                     <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">Telefone / WhatsApp *</label>
                     <input 
                       type="tel" 
                       name="phone"
                       required
                       value={formData.phone}
                       onChange={handleInputChange}
                       className="w-full bg-darker/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors text-sm"
                       placeholder="(41) 99999-9999"
                     />
                   </div>
                   
                   <div>
                     <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">Mensagem (Opcional)</label>
                     <textarea 
                       name="message"
                       value={formData.message}
                       onChange={handleInputChange}
                       className="w-full bg-darker/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors h-24 resize-none text-sm"
                       placeholder={`Gostaria de um site para minha empresa em ${decodedName}...`}
                     ></textarea>
                   </div>
                   
                   <button 
                     type="submit"
                     className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg group cursor-pointer"
                   >
                     <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
                     Enviar via WhatsApp
                   </button>
                 </form>

                 <div className="mt-6 pt-6 border-t border-white/5 text-center">
                    <p className="text-xs text-gray-400 mb-1">Ou ligue agora:</p>
                    <a href={CONTACT_INFO.phone} className="text-lg font-bold text-white hover:text-primary transition-colors block">
                      {CONTACT_INFO.displayPhone}
                    </a>
                 </div>
               </div>
               
               {/* Back Links */}
               <div className="mt-6 text-center">
                 <Link to="/sitemap" className="text-xs text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1">
                   <ArrowLeft size={12} /> Ver todas as áreas no Mapa do Site
                 </Link>
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
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all">
                    <MessageCircle size={20} />
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-white">WhatsApp</span>
                </a>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Facebook size={20} />
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-white">Facebook</span>
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-700/20 flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-all">
                    <Linkedin size={20} />
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-white">LinkedIn</span>
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all">
                    <Twitter size={20} />
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
