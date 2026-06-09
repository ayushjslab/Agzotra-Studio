import { Metadata } from 'next';
import Navbar from './_components/navbar';
import Hero from './_components/hero';
import TemplatesCatalog from './_components/template-catalog';
import ApiPlayground from './_components/api-playground';
import PricingSection from './_components/pricing';
import Footer from './_components/footer';

export const metadata: Metadata = {
  title: 'Agzotra Studio | High-Performance Dynamic Image Generation',
  description: 'Automate your 16:9 featured images, open-graph banners, and social assets programmatically using React templates and ultra-fast edge infrastructure.',
  keywords: ['image generation', 'dynamic thumbnails', 'featured images', 'open graph', 'satori', 'resvg', 'next.js', 'automation'],
  openGraph: {
    title: 'Agzotra Studio | Data into stunning visuals. Instantly.',
    description: 'The automated pipeline engine for modern content platforms.',
    images: ['/og-image.png'],
  },
};

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground antialiased selection:bg-primary/30 selection:text-foreground">
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