/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UrgencyBar } from './components/UrgencyBar';
import { HeroSection } from './components/HeroSection';
import { WhatYouReceive } from './components/WhatYouReceive';
import { AboutCreator } from './components/AboutCreator';
import { SocialProof } from './components/SocialProof';
import { PricingSection } from './components/PricingSection';
import { GuaranteeSection } from './components/GuaranteeSection';
import { CopyrightDisclaimer } from './components/CopyrightDisclaimer';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { AlegriaOfferModal } from './components/AlegriaOfferModal';
import { StickyBottomCta } from './components/StickyBottomCta';
import { PricingPlan } from './types';
import { PRICING_PLANS, ALEGRIA_SPECIAL_OFFER } from './data/content';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAlegriaOfferOpen, setIsAlegriaOfferOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(PRICING_PLANS[1]); // Default to Alegria + Bônus

  const scrollToPricing = () => {
    const el = document.getElementById('precos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsCheckoutOpen(true);
    }
  };

  const scrollToNext = () => {
    const el = document.getElementById('o-que-vai-receber');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  const handleRequestBasic = () => {
    setIsAlegriaOfferOpen(true);
  };

  const handleAcceptAlegriaOffer = (plan: PricingPlan) => {
    setIsAlegriaOfferOpen(false);
    setSelectedPlan(plan || ALEGRIA_SPECIAL_OFFER);
    setIsCheckoutOpen(true);
  };

  const handleContinueWithBasic = (plan: PricingPlan) => {
    setIsAlegriaOfferOpen(false);
    setSelectedPlan(plan || PRICING_PLANS[0]);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-pink-300 selection:text-pink-900 pb-16 sm:pb-0">
      {/* 1. Urgency Bar on Top */}
      <UrgencyBar onCtaClick={scrollToPricing} />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection
          onCtaClick={scrollToPricing}
          onScrollDown={scrollToNext}
        />

        {/* 3. Section: O que você vai receber + Child Photo Gallery */}
        <WhatYouReceive />

        {/* 4. NOVA SEÇÃO: Quem eu sou */}
        <AboutCreator />

        {/* 5. Prova Social: Testimonials + Quantified Mothers */}
        <SocialProof />

        {/* 6. Seção de Pacotes / Preços (Basic vs Pacote Alegria + Bônus) */}
        <PricingSection
          onSelectPlan={handleSelectPlan}
          onSelectBasic={handleRequestBasic}
        />

        {/* 7. Selo de Garantia: 7 Dias + Compra Segura */}
        <GuaranteeSection />

        {/* 8. Aviso Legal: Pirataria é Crime */}
        <CopyrightDisclaimer />

        {/* 9. FAQ em formato acordeão */}
        <FaqSection />

        {/* 10. CTA Final */}
        <FinalCta onCtaClick={scrollToPricing} />
      </main>

      {/* 11. Rodapé simples com direitos autorais */}
      <Footer />

      {/* Sticky Bottom Bar on Mobile */}
      <StickyBottomCta onCtaClick={scrollToPricing} />

      {/* Pop-up Especial: Oferta Pacote Alegria por R$ 17,90 */}
      <AlegriaOfferModal
        isOpen={isAlegriaOfferOpen}
        onClose={() => setIsAlegriaOfferOpen(false)}
        onAcceptAlegria={handleAcceptAlegriaOffer}
        onContinueBasic={handleContinueWithBasic}
      />

      {/* Interactive Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedPlan={selectedPlan}
        onSelectPlan={(plan) => setSelectedPlan(plan)}
      />
    </div>
  );
}
