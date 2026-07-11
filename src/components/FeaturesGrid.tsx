export default function FeaturesGrid() {
  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Everything you need to actually trust an agent</h2>
          <p className="section-subtitle">
            Reviewed changes, secrets that stay home, contained runs, and nothing lost.
          </p>
        </div>

        <div className="features-grid">
          {/* Pillar 1 */}
          <div className="feature-card">
            <div className="card-glow"></div>
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
              </svg>
            </div>
            <h3 className="feature-title">
              A second pair of eyes on every change
              <span className="feature-tag">Powered by Claude</span>
            </h3>
            <p className="feature-desc">
              One agent writes the fix, another approves it. No blind auto-edits.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="feature-card">
            <div className="card-glow"></div>
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3 className="feature-title">Your secrets stay yours</h3>
            <p className="feature-desc">
              Credentials pulled from your machine only when needed — never written to the sandbox. Close your laptop; the run keeps going.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="feature-card">
            <div className="card-glow"></div>
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3 className="feature-title">Runs that can&apos;t run away</h3>
            <p className="feature-desc">
              Isolated, network-locked sandboxes with hard cost caps. No runaway host — or bill.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="feature-card">
            <div className="card-glow"></div>
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <h3 className="feature-title">Watch your agent think</h3>
            <p className="feature-desc">
              Every plan, edit, and test — live, with token and cost counts. No black-box runs.
            </p>
          </div>

          {/* Pillar 5 */}
          <div className="feature-card">
            <div className="card-glow"></div>
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path>
              </svg>
            </div>
            <h3 className="feature-title">Never lose a run</h3>
            <p className="feature-desc">
              Restarts resume from the last checkpoint, not from scratch. Retries never double-charge.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
