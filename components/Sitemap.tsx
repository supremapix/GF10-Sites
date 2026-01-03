import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { NEIGHBORHOODS, CITIES } from '../constants';
import { Map, MapPin } from 'lucide-react';

const Sitemap: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Mapa do Site - Áreas de Atendimento | Suprema Sites Express</title>
        <meta name="description" content="Lista completa de bairros de Curitiba e cidades da Região Metropolitana atendidas pela Suprema Sites Express." />
        <link rel="canonical" href="https://supremasite.com.br/sitemap" />
      </Helmet>

      <section className="pt-32 pb-24 bg-dark min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Mapa de Áreas Atendidas</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Confira a lista completa de localidades onde oferecemos nossos serviços de criação de sites, SEO e marketing digital.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Neighborhoods */}
            <div>
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
                <Map className="text-secondary w-8 h-8" />
                <h2 className="text-3xl font-bold text-white">Bairros de Curitiba</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {NEIGHBORHOODS.sort().map((item, i) => (
                  <Link
                    key={i}
                    to={`/bairro/${encodeURIComponent(item)}`}
                    className="text-gray-400 hover:text-secondary text-sm transition-colors py-1 px-2 rounded hover:bg-white/5"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Cities */}
            <div>
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
                <MapPin className="text-primary w-8 h-8" />
                <h2 className="text-3xl font-bold text-white">Cidades da RMC</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CITIES.sort().map((item, i) => (
                  <Link
                    key={i}
                    to={`/cidade/${encodeURIComponent(item)}`}
                    className="text-gray-400 hover:text-primary text-sm transition-colors py-1 px-2 rounded hover:bg-white/5"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Sitemap;