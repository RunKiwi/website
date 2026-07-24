'use client';

import { Reveal } from './Reveal';
import { Check } from 'lucide-react';
import Link from 'next/link';

type FeatureRow = {
  label: string;
  free: React.ReactNode;
  pro: React.ReactNode;
  enterprise: React.ReactNode;
};

const SoonBadge = () => (
  <span className="pricing-badge-soon">Coming soon</span>
);

const Yes = () => <Check className="w-5 h-5 text-primary" aria-label="Yes" />;
const No = () => <span className="text-muted">—</span>;

const features: FeatureRow[] = [
  { label: 'Agent-minutes/mo', free: '200', pro: '2000 per seat (pooled) + buy more', enterprise: 'Custom' },
  { label: 'Concurrent jobs', free: '1', pro: '20', enterprise: 'Custom' },
  { label: 'Fleet', free: 'Shared managed', pro: <><span className="whitespace-nowrap">Dedicated managed</span> <SoonBadge /></>, enterprise: 'BYOC or dedicated' },
  { label: 'Swarm width', free: 'Up to 4', pro: 'Higher', enterprise: 'Custom' },
  { label: 'GitHub', free: <Yes />, pro: <Yes />, enterprise: <Yes /> },
  { label: 'Linear', free: <No />, pro: <Yes />, enterprise: <Yes /> },
  { label: 'Slack', free: <No />, pro: <><Yes /> <SoonBadge /></>, enterprise: <><Yes /> <SoonBadge /></> },
  { label: 'gVisor sandbox + credential sealing', free: <Yes />, pro: <Yes />, enterprise: <Yes /> },
  { label: 'Bring-your-own model key', free: <Yes />, pro: <Yes />, enterprise: <Yes /> },
  { label: 'Shared context (cross-task memory)', free: <Yes />, pro: <Yes />, enterprise: <Yes /> },
  { label: 'Run in your own cloud (BYOC, zero-knowledge)', free: <No />, pro: <Yes />, enterprise: <Yes /> },
  { label: 'Firecracker microVM isolation', free: <No />, pro: <No />, enterprise: <><Yes /> <SoonBadge /></> },
  { label: 'Data residency / on-prem', free: <No />, pro: <No />, enterprise: <Yes /> },
  { label: 'Domain team join', free: <No />, pro: <Yes />, enterprise: <Yes /> },
  { label: 'SSO / SAML', free: <No />, pro: <No />, enterprise: <><Yes /> <SoonBadge /></> },
  { label: 'Advanced RBAC', free: <No />, pro: <No />, enterprise: <><Yes /> <SoonBadge /></> },
  { label: 'Audit logs', free: <No />, pro: <No />, enterprise: <><Yes /> <SoonBadge /></> },
  { label: 'Compliance (SOC2…)', free: <No />, pro: <No />, enterprise: 'On request' },
  { label: 'Support', free: 'Community', pro: 'Priority email', enterprise: 'Dedicated + SLA' },
];

export default function PricingTiers({ theme }: { theme?: 'cream' }) {
  return (
    <section id="pricing" className={`pricing-section ${theme === 'cream' ? 'theme-cream' : ''}`}>
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow">Pricing</span>
          <h2 className="section-title">Scale as you ship</h2>
          <p className="section-subtitle">
            Start for free, upgrade when you need higher throughput, and graduate to your own VPC when you outgrow trusting us.
          </p>
        </Reveal>

        <Reveal as="div" className="pricing-cards">
          {/* Free Tier */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h3 className="pricing-tier-name">Free</h3>
              <div className="pricing-price">
                <span className="price-value">$0</span>
              </div>
              <p className="pricing-subtext">Perfect for evaluating the swarm on personal projects.</p>
            </div>
            <div className="pricing-cta-wrap">
              <Link href="https://app.runkiwi.dev" className="btn btn-secondary w-full">Start free</Link>
            </div>
          </div>

          {/* Pro Tier */}
          <div className="pricing-card pricing-card-pro">
            <div className="pricing-pro-badge">Most Popular</div>
            <div className="pricing-card-header">
              <h3 className="pricing-tier-name">Pro</h3>
              <div className="pricing-price">
                <span className="price-value">$18</span>
                <span className="price-period">/ user / mo</span>
              </div>
              <p className="pricing-subtext">+ $10 per 250 extra agent-min.</p>
              <p className="pricing-note">Pro agent-minutes are per seat, pooled across your org.</p>
            </div>
            <div className="pricing-cta-wrap">
              <Link href="https://app.runkiwi.dev" className="btn btn-primary w-full">Get Pro</Link>
            </div>
          </div>

          {/* Enterprise Tier */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h3 className="pricing-tier-name">Enterprise</h3>
              <div className="pricing-price">
                <span className="price-value-custom">Custom</span>
              </div>
              <p className="pricing-subtext">For organizations requiring isolated compliance or massive parallelization.</p>
            </div>
            <div className="pricing-cta-wrap">
              <a href="mailto:support@runkiwi.dev?subject=Kiwi%20Enterprise" className="btn btn-secondary w-full">Contact sales</a>
            </div>
          </div>
        </Reveal>

        <Reveal as="div" className="pricing-table-wrap">
          <table className="pricing-table">
            <thead>
              <tr>
                <th>Features</th>
                <th>Free</th>
                <th>Pro</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {features.map((row, i) => (
                <tr key={i}>
                  <th scope="row">{row.label}</th>
                  <td>{row.free}</td>
                  <td>{row.pro}</td>
                  <td>{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
