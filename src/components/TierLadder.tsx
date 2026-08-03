'use client';

import Link from 'next/link';
import { Reveal } from './Reveal';
import { Cloud, Server, Check, ArrowRight } from 'lucide-react';

type Row = { label: string; managed: string; byoc: string };

const rows: Row[] = [
  { label: 'Onboarding', managed: 'npm i kiwi && kiwi submit', byoc: 'terraform apply + a VM' },
  { label: 'Operator', managed: 'Kiwi runs the daemon', byoc: 'You run the daemon' },
  { label: 'Your code', managed: 'On Kiwi infrastructure', byoc: 'Never leaves your VPC' },
  { label: 'Credentials', managed: 'Sealed in transit & at rest', byoc: 'Zero-knowledge; we cannot decrypt' },
  { label: 'Planner', managed: 'Control Plane, or daemon-side in session mode', byoc: 'Daemon-side' },
  { label: 'You pay for', managed: 'Compute + orchestration', byoc: 'Orchestration only' },
];

export default function TierLadder() {
  return (
    <section id="tiers" className="tiers-section">
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow">One product · Two operators</span>
          <h2 className="section-title">Start on our cloud. Move to yours when you need to.</h2>
          <p className="section-subtitle">
            The same daemon, protocol and execution loop run on both. Only the operator of the machine changes, so moving over costs you a flag rather than a migration.
          </p>
        </Reveal>

        <Reveal as="div" className="tiers-grid">
          {/* Managed */}
          <div className="tier-card tier-managed">
            <div className="tier-head">
              <span className="tier-icon"><Cloud className="w-5 h-5" /></span>
              <div>
                <span className="tier-eyebrow">Default entry</span>
                <h3 className="tier-name">Managed</h3>
              </div>
            </div>
            <p className="tier-pitch">Zero setup. We host the data plane, hold your keys like any SaaS, and you ship your first PR in one command.</p>
            <code className="tier-cmd">$ npm i kiwi &amp;&amp; kiwi submit &quot;Add pagination to the users API&quot;</code>
            <ul className="tier-points">
              <li><Check className="w-4 h-4" /> No AWS account, no Terraform, no VM</li>
              <li><Check className="w-4 h-4" /> Bounded free tier, then usage-based</li>
              <li><Check className="w-4 h-4" /> Fastest way to see a real PR</li>
            </ul>
            <Link href="https://app.runkiwi.dev" target="_blank" rel="noopener noreferrer" className="tier-cta">
              Get started at app.runkiwi.dev
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* BYOC */}
          <div className="tier-card tier-byoc">
            <div className="tier-head">
              <span className="tier-icon"><Server className="w-5 h-5" /></span>
              <div>
                <span className="tier-eyebrow">Graduation</span>
                <h3 className="tier-name">Bring Your Own Cloud</h3>
              </div>
            </div>
            <p className="tier-pitch">Run the daemon in your own AWS or GCP account. Code and credentials never leave your VPC. Zero-knowledge, and cheaper at scale.</p>
            <code className="tier-cmd">$ terraform apply &nbsp;·&nbsp; kiwidaemon --join-token …</code>
            <ul className="tier-points">
              <li><Check className="w-4 h-4" /> Proprietary code stays in your VPC</li>
              <li><Check className="w-4 h-4" /> Credentials sealed to a key only you hold</li>
              <li><Check className="w-4 h-4" /> For compliance, and cheaper at volume</li>
            </ul>
          </div>
        </Reveal>

        {/* Comparison table */}
        <Reveal as="div" className="tiers-table-wrap">
          <table className="tiers-table">
            <thead>
              <tr>
                <th></th>
                <th>Managed</th>
                <th>BYOC</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td>{r.managed}</td>
                  <td>{r.byoc}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="tiers-note">
            We are specific about this on purpose. <strong>Zero-knowledge is a BYOC property.</strong> In managed mode we operate the machine holding the key, so we can read your credentials, the same as any hosted platform. If that matters to you, run BYOC.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
