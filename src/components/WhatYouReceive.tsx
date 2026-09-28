import React, { useState } from 'react';
import { CheckCircle2, Eye, Sparkles, X } from 'lucide-react';
import { WHAT_YOU_RECEIVE_ITEMS, ASSETS } from '../data/content';

// Curated row of 100% real children playing photos sent by customers
const CHILD_PHOTOS = [
  {
    id: 1,
    url: ASSETS.provaKid1,
    title: 'Brincando e se divertindo',
    caption: 'Momentos reais longe das telas',
  },
  {
    id: 2,
    url: ASSETS.provaKid2,
    title: 'Criatividade e imaginação',
    caption: 'Horas de diversão e criação de histórias',
  },
  {
    id: 3,
    url: ASSETS.provaKid3,
    title: 'Montando e personalizando looks',
    caption: 'Cenários e roupinhas combinando',
  },
  {
    id: 4,
    url: ASSETS.provaKid4,
    title: 'Expressando criatividade com alegria',
    caption: 'Brincadeira saudável e educativa',
  },
  {
    id: 5,
    url: ASSETS.provaKid5,
    title: 'Coleção cheia de encanto',
    caption: 'Momentos únicos de carinho e diversão',
  },
];

export const WhatYouReceive: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof CHILD_PHOTOS[0] | null>(null);

  return (
    <section id="o-que-vai-receber" className="py-14 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-pink-50 text-pink-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            Conteúdo Completo
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
            O QUE VOCÊ VAI RECEBER?
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto font-medium">
            Tudo pronto para imprimir e brincar em poucos minutos.
          </p>
        </div>

        {/* 6 Grid Items with Specific Checks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {WHAT_YOU_RECEIVE_ITEMS.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#FFF7FA] border border-pink-100/80 hover:border-pink-300 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-xl bg-pink-100 flex items-center justify-center shrink-0 text-pink-600 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5 text-pink-600 fill-pink-50" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800 leading-snug mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Real Children Playing Gallery Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            Veja as pequenas se divertindo de verdade
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Fotos reais enviadas por mães que já resgataram as brincadeiras offline
          </p>
        </div>

        {/* Infinite Loop Carousel */}
        <div className="relative w-full overflow-hidden py-3 group">
          {/* Subtle gradient edges for infinite blending */}
          <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Marquee Track in Infinite Loop */}
          <div className="animate-infinite-scroll flex gap-3 sm:gap-4 items-center">
            {/* First set of photos + duplicated second set for seamless loop */}
            {[...CHILD_PHOTOS, ...CHILD_PHOTOS].map((photo, index) => (
              <div
                key={`${photo.id}-${index}`}
                onClick={() => setSelectedPhoto(photo)}
                className="group/card relative w-56 sm:w-64 md:w-72 shrink-0 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer border border-pink-100"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  width={288}
                  height={216}
                  decoding="async"
                  className="w-full h-full object-cover group-hover/card:scale-108 transition-transform duration-500 select-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 text-white">
                  <span className="text-xs sm:text-sm font-bold leading-tight">{photo.title}</span>
                  <span className="text-[11px] text-pink-200 mt-0.5 line-clamp-1">{photo.caption}</span>
                </div>
                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 opacity-0 group-hover/card:opacity-100 transition-opacity shadow-sm">
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

          {/* User helper tip */}
          <div className="text-center mt-3">
            <span className="text-[11px] font-semibold text-slate-400 inline-flex items-center gap-1.5">
              <span>↔ Passe o mouse ou toque para pausar o carrossel</span>
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-900/60 text-white flex items-center justify-center hover:bg-slate-900 transition cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="w-full h-72 sm:h-96 object-cover rounded-2xl"
            />
            <div className="mt-4 px-2">
              <h4 className="text-lg font-bold text-slate-900">{selectedPhoto.title}</h4>
              <p className="text-sm text-slate-600 mt-1">{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
