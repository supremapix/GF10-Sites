import React from "react";
import { whatsapp } from "../data/site";

export default function FloatingActions({ title }: { title: string }) {
  return (
    <>
      <nav className="floating-actions" aria-label="Contato e compartilhamento">
        <button
          id="share-open"
          type="button"
          aria-haspopup="dialog"
          aria-controls="share-dialog"
          hidden
        >
          <span aria-hidden="true">↗</span> Compartilhar
        </button>
        <a
          href={whatsapp(title)}
          aria-label="Conversar com a GF10 pelo WhatsApp"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 11.5a9 9 0 0 1-13.3 7.9L3 21l1.6-4.7A9 9 0 1 1 21 11.5Z" />
            <path d="M8 8c1 4 3 6 7 7" />
          </svg>{" "}
          WhatsApp
        </a>
      </nav>
      <dialog
        id="share-dialog"
        aria-labelledby="share-heading"
        aria-describedby="share-explanation"
      >
        <div className="share-top">
          <h2 id="share-heading">Compartilhar página</h2>
          <button
            type="button"
            id="share-close"
            autoFocus
            aria-label="Fechar compartilhamento"
          >
            Fechar ×
          </button>
        </div>
        <p id="share-explanation">
          Escolha onde abrir o compartilhamento. Você revisa e confirma na rede
          escolhida.
        </p>
        <p id="share-page-title"></p>
        <div className="share-networks">
          {[
            "WhatsApp",
            "Facebook",
            "X",
            "Pinterest",
            "LinkedIn",
            "Threads",
          ].map((name) => (
            <a
              key={name}
              data-network={name}
              target="_blank"
              rel="noopener noreferrer"
            >
              {name}
              <span aria-hidden="true">↗</span>
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          ))}
        </div>
        <label htmlFor="share-url">Link desta página</label>
        <input id="share-url" readOnly type="url" />
        <button type="button" id="share-copy">
          Copiar link
        </button>
        <p id="share-status" role="status" aria-live="polite"></p>
      </dialog>
    </>
  );
}
