export const SITE_URL = "https://www.gf10.com.br";
// Confirmed by Omar on 2026-10-22; only contact destination.
export const WHATSAPP = "5541992721004";
export const DISPLAY_WHATSAPP = "(41) 99272-1004";
export const whatsapp = (context: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá, GF10! Quero conversar sobre criação de site. Interesse: ${context}.`)}`;
