"use client"
import Navbar from './_components/navbar';
import Hero from './_components/hero';
import TemplatesCatalog from './_components/template-catalog';
import ApiPlayground from './_components/api-playground';
import PricingSection from './_components/pricing';
import Footer from './_components/footer';

export default function Home() {
  return (
    <div className="bg-[#0b0c10] min-h-screen text-white antialiased selection:bg-[#a855f7]/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <TemplatesCatalog />
        <ApiPlayground />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}