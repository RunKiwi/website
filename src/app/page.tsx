import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ValueBanner from '@/components/ValueBanner';
import Marquee from '@/components/Marquee';
import Simulator from '@/components/Simulator';
import FeaturesGrid from '@/components/FeaturesGrid';
import KanbanDashboard from '@/components/KanbanDashboard';
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
        {/* Alternating dark/cream rhythm: features on cream, console dark. */}
        <FeaturesGrid theme="cream" />
        <Simulator />
        <Quickstart theme="cream" />
        <KanbanDashboard />
      </main>
      <Footer />
    </>
  );
}
