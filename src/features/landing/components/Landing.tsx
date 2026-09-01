import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { WhatWeClean } from "./WhatWeClean";
import { HowItWorks } from "./HowItWorks";
import { WhyCleaningFairy } from "./WhyCleaningFairy";
import { PricingSection } from "./PricingSection";
import { CustomerReviews } from "./CustomerReviews";
import { FAQSection } from "./FAQSection";
import { FinalCTA } from "./FinalCTA";
import { Footer } from "./Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-fairy-dark text-gray-100 flex flex-col font-sans selection:bg-teal-500 selection:text-teal-950">
      <Header />
      <main className="grow">
        <HeroSection />
        <WhatWeClean />
        <HowItWorks />
        <WhyCleaningFairy />
        <PricingSection />
        <CustomerReviews />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
