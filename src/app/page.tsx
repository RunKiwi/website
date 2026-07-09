import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ValueBanner from '@/components/ValueBanner';
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
        <Simulator />
        <FeaturesGrid />
        <KanbanDashboard />
        <Quickstart />
      </main>
      <Footer />
    </>
  );
}
