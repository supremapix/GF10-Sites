import React from 'react';
import { Helmet } from 'react-helmet-async';

interface EnhancedSEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  type?: 'website' | 'article' | 'local_business';
  location?: string;
  locationType?: 'bairro' | 'cidade';
  keywords?: string;
  image?: string;
  noindex?: boolean;
}

const BASE_URL = 'https://supremasite.com.br';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;
const SITE_NAME = 'Suprema Sites Express';

const EnhancedSEO: React.FC<EnhancedSEOProps> = ({
  title,
  description,
  canonicalUrl,
  type = 'website',
  location,
  locationType,
  keywords,
  image = DEFAULT_IMAGE,
  noindex = false,
}) => {
  const fullCanonicalUrl = canonicalUrl.startsWith('http') ? canonicalUrl : `${BASE_URL}${canonicalUrl}`;
  const fullImageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;
  
  const generateLocalBusinessSchema = () => {
    if (!location) return null;
    
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `${SITE_NAME} - ${location}`,
      "image": `${BASE_URL}/logo.png`,
      "telephone": "+55-41-99272-1004",
      "url": fullCanonicalUrl,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": locationType === 'bairro' ? 'Curitiba' : location,
        "addressRegion": "PR",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-25.4284",
        "longitude": "-49.2733"
      },
      "priceRange": "$$",
      "areaServed": {
        "@type": "Place",
        "name": location
      },
      "description": description,
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    };
  };

  const generateServiceSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Web Design",
      "provider": {
        "@type": "LocalBusiness",
        "name": SITE_NAME,
        "telephone": "+55-41-99272-1004",
        "url": BASE_URL
      },
      "areaServed": location ? {
        "@type": "Place",
        "name": location
      } : {
        "@type": "City",
        "name": "Curitiba"
      },
      "description": description,
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "BRL"
      }
    };
  };

  const generateBreadcrumbSchema = () => {
    const items = [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL }
    ];
    
    if (location && locationType) {
      items.push({
        "@type": "ListItem",
        "position": 2,
        "name": locationType === 'bairro' ? 'Bairros' : 'Cidades',
        "item": `${BASE_URL}/sitemap`
      });
      items.push({
        "@type": "ListItem",
        "position": 3,
        "name": location,
        "item": fullCanonicalUrl
      });
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items
    };
  };

  const generateFAQSchema = () => {
    if (!location) return null;
    
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `Quanto custa um site em ${location}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `O investimento para criação de sites em ${location} varia de acordo com as necessidades do projeto. Entre em contato para um orçamento personalizado.`
          }
        },
        {
          "@type": "Question",
          "name": `Qual o prazo de entrega de um site em ${location}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `A entrega média é de 7 a 15 dias úteis para empresas em ${location}, dependendo da complexidade do projeto.`
          }
        },
        {
          "@type": "Question",
          "name": `Vocês atendem empresas em ${location}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Sim! A Suprema Sites Express atende empresas de todos os portes em ${location} e região metropolitana de Curitiba.`
          }
        }
      ]
    };
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      <meta name="author" content={SITE_NAME} />
      <meta name="publisher" content={SITE_NAME} />
      <meta name="copyright" content={SITE_NAME} />
      
      <meta name="geo.region" content="BR-PR" />
      <meta name="geo.placename" content={location || 'Curitiba'} />
      <meta name="geo.position" content="-25.4284;-49.2733" />
      <meta name="ICBM" content="-25.4284, -49.2733" />
      
      <meta property="og:type" content={type === 'local_business' ? 'business.business' : type} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />
      
      <meta name="theme-color" content="#020617" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      
      <meta name="format-detection" content="telephone=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />

      {type === 'local_business' && location && (
        <script type="application/ld+json">
          {JSON.stringify(generateLocalBusinessSchema())}
        </script>
      )}
      
      <script type="application/ld+json">
        {JSON.stringify(generateServiceSchema())}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(generateBreadcrumbSchema())}
      </script>
      
      {location && (
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema())}
        </script>
      )}
    </Helmet>
  );
};

export default EnhancedSEO;
