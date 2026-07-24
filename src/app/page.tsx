import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ValueBanner from '@/components/ValueBanner';
import Marquee from '@/components/Marquee';
import GodView from '@/components/GodView';
import FeaturesGrid from '@/components/FeaturesGrid';
import TierLadder from '@/components/TierLadder';
import PricingTiers from '@/components/PricingTiers';
import TopologyCanvas from '@/components/TopologyCanvas';
import Quickstart from '@/components/Quickstart';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ValueBanner />
        <Marquee />
        {/* Story order: what it does (how-it-works) → why (features) →
            the tier ladder → the architecture → start.
            Alternating dark/cream rhythm for editorial contrast. */}
        <GodView />
        <FeaturesGrid theme="cream" />
        <TierLadder />
        <PricingTiers theme="cream" />
        <TopologyCanvas />
        <Quickstart theme="cream" />
      </main>
      <Footer />
    </>
  );
}
