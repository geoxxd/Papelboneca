import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Eye, Printer, Scissors, Infinity as InfinityIcon, ArrowRight, X, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { DEMONSTRATION_ITEMS, DemonstrationItem } from '../data/content';

interface ProductDemonstrationProps {
  onCtaClick: () => void;
}

export const ProductDemonstration: React.FC<ProductDemonstrationProps> = ({ onCtaClick }) => {
  const [selectedItem, setSelectedItem] = useState<DemonstrationItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isUserInteractingRef = useRef<boolean>(false);

  const handleOpenLightbox = (item: DemonstrationItem, index: number) => {
    setSelectedItem(item);
    setLightboxIndex(index);
  };

  const handlePrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (lightboxIndex - 1 + DEMONSTRATION_ITEMS.length) % DEMONSTRATION_ITEMS.length;
    setLightboxIndex(newIndex);
    setSelectedItem(DEMONSTRATION_ITEMS[newIndex]);
  };

  const handleNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (lightboxIndex + 1) % DEMONSTRATION_ITEMS.length;
    setLightboxIndex(newIndex);
    setSelectedItem(DEMONSTRATION_ITEMS[newIndex]);
  };

  // Scroll carousel to specific slide index
  const scrollToSlide = (index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const card = container.children[index] as HTMLElement;
    if (card) {
      const scrollLeft = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth',
      });
      setActiveSlide(index);
    }
  };

  const handlePrevCarousel = () => {
    const newIndex = (activeSlide - 1 + DEMONSTRATION_ITEMS.length) % DEMONSTRATION_ITEMS.length;
    scrollToSlide(newIndex);
  };

  const handleNextCarousel = () => {
    const newIndex = (activeSlide + 1) % DEMONSTRATION_ITEMS.length;
    scrollToSlide(newIndex);
  };

  // Listen to scroll to update active slide indicator
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      const card = child as HTMLElement;
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveSlide(closestIndex);
  };

  // Optional auto-slide when user is not touching or hovering
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isUserInteractingRef.current && !selectedItem) {
        setActiveSlide((prev) => {
          const next = (prev + 1) % DEMONSTRATION_ITEMS.length;
          scrollToSlide(next);
          return next;
        });
      }
    }, 4500);

    return () => clearInterval(timer);
  }, [selectedItem]);

  return (
    <section id="demonstracao" className="py-16 sm:py-24 bg-gradient-to-b from-[#FFF5F8] via-white to-[#FFF0F5] relative overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
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

        {/* Carousel Wrapper */}
        <div
          className="relative mb-6 sm:mb-8"
          onMouseEnter={() => { isUserInteractingRef.current = true; }}
          onMouseLeave={() => { isUserInteractingRef.current = false; }}
          onTouchStart={() => { isUserInteractingRef.current = true; }}
          onTouchEnd={() => {
            setTimeout(() => {
              isUserInteractingRef.current = false;
            }, 3000);
          }}
        >
          {/* Navigation Arrows for Desktop & Tablet */}
          <button
            onClick={handlePrevCarousel}
            aria-label="Item anterior"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-slate-800 hover:text-pink-600 shadow-xl border border-pink-100 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNextCarousel}
            aria-label="Próximo item"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-slate-800 hover:text-pink-600 shadow-xl border border-pink-100 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Track with Smooth Touch & Scroll Snap */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-4 px-2 sm:px-4 no-scrollbar -mx-2 sm:mx-0"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {DEMONSTRATION_ITEMS.map((item, index) => {
              const isActive = activeSlide === index;
              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenLightbox(item, index)}
                  className={`group relative w-[85vw] sm:w-[360px] md:w-[400px] shrink-0 snap-center bg-white rounded-3xl overflow-hidden border transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer flex flex-col ${
                    isActive
                      ? 'border-pink-300 ring-2 ring-pink-400/25 shadow-lg'
                      : 'border-pink-100 hover:border-pink-300'
                  }`}
                >
                  {/* Top Header Strip: Badges outside the image so nothing covers the drawing */}
                  <div className="px-4 py-3 flex items-center justify-between border-b border-pink-50 bg-gradient-to-r from-pink-50/50 via-white to-pink-50/30">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-pink-100/90 text-pink-700">
                      {item.category}
                    </span>
                    {index === 0 ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-xs">
                        ★ Destaque
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-pink-500" /> Folha completa
                      </span>
                    )}
                  </div>

                  {/* Full Image Container - 100% complete without any cropping */}
                  <div className="relative h-[360px] sm:h-[420px] w-full p-3 sm:p-4 bg-gradient-to-b from-[#FFFDFD] via-pink-50/20 to-white flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={420}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl drop-shadow-md group-hover:scale-[1.02] transition-transform duration-300 select-none"
                    />

                    {/* Gradient Overlay & Zoom Hint */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-slate-900 text-xs font-black shadow-lg flex items-center gap-1.5 transform scale-90 group-hover:scale-100 transition-transform">
                        <Eye className="w-3.5 h-3.5 text-pink-600" />
                        Toque para ampliar
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-white border-t border-slate-100">
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
                        Ver tela cheia &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator & Slide Counter */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {DEMONSTRATION_ITEMS.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                aria-label={`Ir para demonstração ${index + 1}`}
                className={`transition-all duration-300 rounded-full h-2.5 cursor-pointer ${
                  activeSlide === index
                    ? 'w-8 bg-gradient-to-r from-[#FF007A] to-[#C026D3]'
                    : 'w-2.5 bg-pink-200 hover:bg-pink-300'
                }`}
              />
            ))}
          </div>

          {/* Helper Drag Tip on Mobile */}
          <div className="text-center mt-2.5 sm:hidden">
            <span className="text-[11px] font-semibold text-slate-400">
              👈 Arraste para o lado para ver todas as fotos 👉
            </span>
          </div>
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
                  {selectedItem.category} ({lightboxIndex + 1} de {DEMONSTRATION_ITEMS.length})
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
            <div className="relative flex-1 bg-slate-950 flex items-center justify-center overflow-hidden min-h-[320px] p-2 sm:p-4">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="max-h-[72vh] w-auto max-w-full object-contain mx-auto select-none rounded-lg"
              />

              {/* Prev / Next Navigation Arrows */}
              <button
                onClick={handlePrevLightbox}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-xs transition cursor-pointer"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextLightbox}
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
