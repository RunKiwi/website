import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ValueBanner from '@/components/ValueBanner';
import Marquee from '@/components/Marquee';
import GodView from '@/components/GodView';
import FeaturesGrid from '@/components/FeaturesGrid';
import Activity from '@/components/Activity';
import ComingSoon from '@/components/ComingSoon';
import TierLadder from '@/components/TierLadder';
import PricingTiers from '@/components/PricingTiers';
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
        <GodView />
        <FeaturesGrid />
        <Activity />
        <ComingSoon />
        <TierLadder />
        <PricingTiers />
        <Quickstart />
      </main>
      <Footer />
    </>
  );
}
