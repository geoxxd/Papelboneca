import React, { useState } from 'react';
import { Sparkles, Eye, Printer, Scissors, Infinity as InfinityIcon, ArrowRight, X, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { DEMONSTRATION_ITEMS, DemonstrationItem } from '../data/content';

interface ProductDemonstrationProps {
  onCtaClick: () => void;
}

export const ProductDemonstration: React.FC<ProductDemonstrationProps> = ({ onCtaClick }) => {
  const [selectedItem, setSelectedItem] = useState<DemonstrationItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleOpenLightbox = (item: DemonstrationItem, index: number) => {
    setSelectedItem(item);
    setCurrentIndex(index);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + DEMONSTRATION_ITEMS.length) % DEMONSTRATION_ITEMS.length;
    setCurrentIndex(newIndex);
    setSelectedItem(DEMONSTRATION_ITEMS[newIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % DEMONSTRATION_ITEMS.length;
    setCurrentIndex(newIndex);
    setSelectedItem(DEMONSTRATION_ITEMS[newIndex]);
  };

  return (
    <section id="demonstracao" className="py-16 sm:py-24 bg-gradient-to-b from-[#FFF5F8] via-white to-[#FFF0F5] relative overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-pink-500 animate-spin-slow" />
            <span>VEJA O MATERIAL POR DENTRO</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Dê uma espiada no que você vai{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF007A] to-[#C026D3]">
              imprimir e montar
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Arquivos digitais em altíssima resolução, traços nítidos e cores encantadoras. Tudo pronto no formato A4 para imprimir em casa ou na gráfica e começar a brincadeira imediatamente!
          </p>
        </div>

        {/* Product Showcase Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {DEMONSTRATION_ITEMS.map((item, index) => {
            const isFeatured = index === 0;
            return (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(item, index)}
                className={`group relative bg-white rounded-3xl overflow-hidden border transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1.5 cursor-pointer flex flex-col ${
                  isFeatured
                    ? 'border-pink-300 ring-2 ring-pink-400/20 sm:col-span-2 lg:col-span-1'
                    : 'border-pink-100 hover:border-pink-300'
                }`}
              >
                {/* Image Container */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Overlay & Zoom Hint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-slate-900 text-xs font-black shadow-lg flex items-center gap-1.5 transform scale-90 group-hover:scale-100 transition-transform">
                      <Eye className="w-3.5 h-3.5 text-pink-600" />
                      Clique para ampliar
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/95 text-pink-700 shadow-xs backdrop-blur-xs">
                      {item.category}
                    </span>
                  </div>

                  {isFeatured && (
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-xs">
                        ★ Destaque
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-pink-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-2 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-bold">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      {item.highlight}
                    </span>
                    <span className="text-pink-600 font-extrabold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Ver foto &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto p-5 sm:p-6 bg-white/80 backdrop-blur-xs rounded-3xl border border-pink-100 shadow-sm mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900">Qualquer Impressora</h4>
              <p className="text-[11px] sm:text-xs text-slate-500">Impressão doméstica colorida ou P&B em folha A4 comum</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900">Corte com Abas</h4>
              <p className="text-[11px] sm:text-xs text-slate-500">Troca de roupas sem cola, encaixe seguro e anatômico</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <InfinityIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900">Acesso Vitalício</h4>
              <p className="text-[11px] sm:text-xs text-slate-500">O arquivo é seu para sempre, imprima quantas vezes quiser</p>
            </div>
          </div>
        </div>

        {/* Section Conversion CTA */}
        <div className="text-center">
          <button
            onClick={onCtaClick}
            className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-4.5 bg-gradient-to-r from-[#FF007A] via-[#E11D74] to-[#C026D3] hover:from-[#E11D74] hover:to-[#9333EA] text-white font-black text-base sm:text-lg rounded-full shadow-lg shadow-pink-500/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer pulse-cta inline-flex items-center justify-center gap-2"
          >
            <span>QUERO GARANTIR ESSE MATERIAL AGORA</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-2 font-medium">
            Recebimento imediato no seu e-mail · Acesso vitalício aos arquivos
          </p>
        </div>

      </div>

      {/* Lightbox Modal for Full-Size Photo Inspection */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
          >
            {/* Lightbox Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100 bg-white">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-pink-600 block">
                  {selectedItem.category} ({currentIndex + 1} de {DEMONSTRATION_ITEMS.length})
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image Container */}
            <div className="relative flex-1 bg-slate-950 flex items-center justify-center overflow-hidden min-h-[300px]">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="max-h-[60vh] w-auto max-w-full object-contain mx-auto"
              />

              {/* Prev / Next Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-xs transition cursor-pointer"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-xs transition cursor-pointer"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Footer */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {selectedItem.description}
              </p>
              <button
                onClick={() => {
                  setSelectedItem(null);
                  onCtaClick();
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#FF007A] to-[#C026D3] text-white rounded-full font-black text-xs sm:text-sm shadow-md hover:opacity-95 transition cursor-pointer whitespace-nowrap"
              >
                Quero este pacote &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
