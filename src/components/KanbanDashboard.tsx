'use client';

import { useState } from 'react';

export default function KanbanDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const renderContent = () => {
    if (activeTab === 'Dashboard') {
      return (
        <>
          <div className="mockup-top-bar">
            <h3>Agent Runs</h3>
            <div className="mockup-badge active">3 isolated sandboxes</div>
          </div>

          <div className="kanban-board">
            {/* Column 1 */}
            <div className="kanban-col">
              <div className="col-header">
                <span>PAUSED (awaiting tunnel)</span>
                <span className="count">1</span>
              </div>
              <div className="kanban-card paused">
                <div className="card-tag">task-3829</div>
                <h4 className="card-task-title">Patch nil check in report exporter</h4>
                <div className="card-alert-msg">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                  Reverse tunnel offline — will resume from checkpoint
                </div>
                <div className="card-footer">
                  <span>Waiting for CLI reconnect</span>
                  <span className="avatar">U</span>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="kanban-col">
              <div className="col-header">
                <span>RUNNING (Actor–Critic)</span>
                <span className="count">2</span>
              </div>
              <div className="kanban-card">
                <div className="card-tag running">task-3831</div>
                <h4 className="card-task-title">Fix division by zero in Divide()</h4>
                <div className="progress-bar-wrapper">
                  <div className="progress-bar-fill animate-progress"></div>
                </div>
                <div className="card-log-snippet">
                  [test] go test ./demo_project/... (13/14 passing)
                </div>
                <div className="card-footer">
                  <span>Secret cached in daemon memory</span>
                  <span className="avatar active">K</span>
                </div>
              </div>

              <div className="kanban-card">
                <div className="card-tag running">task-3830</div>
                <h4 className="card-task-title">Add pagination to list endpoint</h4>
                <div className="progress-bar-wrapper">
                  <div className="progress-bar-fill animate-progress-slow"></div>
                </div>
                <div className="card-log-snippet">
                  [critic] Reviewing diff — $6.20 of $10.00 cap
                </div>
                <div className="card-footer">
                  <span>Isolated Docker sandbox</span>
                  <span className="avatar active">K</span>
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="kanban-col">
              <div className="col-header">
                <span>RESOLVED</span>
                <span className="count">1</span>
              </div>
              <div className="kanban-card resolved">
                <div className="card-tag completed">task-3825</div>
                <h4 className="card-task-title">Fix divide by zero in AverageCalculation</h4>
                <div className="card-success-msg">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Critic approved. Tests green, fix synced back.
                </div>
                <div className="card-footer">
                  <span>Completed 20m ago</span>
                  <span className="avatar">K</span>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (activeTab === 'Workspaces') {
      return (
        <div style={{ padding: '24px' }}>
          <div className="mockup-top-bar" style={{ marginBottom: '24px' }}>
            <h3>Active Workspaces</h3>
            <div className="mockup-badge active">2 Online</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="kanban-card">
              <h4 className="card-task-title">Isolated Docker Sandbox</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '8px' }}>Per-run container with timeout and disk limits.</p>
              <div style={{ marginTop: '16px' }}><span className="card-tag running">Online</span></div>
            </div>
            <div className="kanban-card">
              <h4 className="card-task-title">Reverse Credential Tunnel</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '8px' }}>Just-in-time secrets from the local CLI, cached in daemon memory.</p>
              <div style={{ marginTop: '16px' }}><span className="card-tag running">Online</span></div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'Task List') {
      return (
        <div style={{ padding: '24px' }}>
          <div className="mockup-top-bar" style={{ marginBottom: '24px' }}>
            <h3>Task List (Queue)</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="kanban-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 className="card-task-title" style={{ margin: 0 }}>Fix flaky retry test in queue worker</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Queued — waiting on org concurrency slot</span>
              </div>
              <span className="card-tag paused">Queued</span>
            </div>
            <div className="kanban-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 className="card-task-title" style={{ margin: 0 }}>Handle empty slice in Summarize()</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Queued — budget checked, within monthly cap</span>
              </div>
              <span className="card-tag paused">Queued</span>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'Settings') {
      return (
        <div style={{ padding: '24px' }}>
          <div className="mockup-top-bar" style={{ marginBottom: '24px' }}>
            <h3>Control Plane Settings</h3>
          </div>
          <div className="kanban-card" style={{ marginBottom: '16px' }}>
            <h4 className="card-task-title">Provider Key (Anthropic)</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '8px', marginBottom: '16px' }}>Per-org Claude API key, encrypted at rest with AES-256-GCM.</p>
            <button className="btn btn-outline btn-sm">Rotate Key</button>
          </div>
          <div className="kanban-card">
            <h4 className="card-task-title">Budget &amp; Concurrency Caps</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '8px', marginBottom: '16px' }}>Per-job cap $10.00 · monthly cap enforced before enqueue.</p>
            <button className="btn btn-primary btn-sm">Edit Limits</button>
          </div>
        </div>
      );
    }
  };

  return (
    <section id="dashboard" className="dashboard-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Watch every run on one board</h2>
          <p className="section-subtitle">
            Follow each run&apos;s phase, spend, and secret cache across your isolated sandboxes in real time. The web console is a monitoring board today — task submission runs through the CLI.
          </p>
        </div>

        <div className="dashboard-mockup-wrapper">
          <div className="mockup-header-bar">
            <div className="mockup-window-controls">
              <div className="window-dot red"></div>
              <div className="window-dot yellow"></div>
              <div className="window-dot green"></div>
            </div>
            <div className="mockup-browser-url">https://dashboard.runkiwi.dev</div>
            <span className="mockup-preview-label">Illustrative preview</span>
          </div>
          
          <div className="dashboard-mockup">
            <div className="sidebar">
              <div className={`sidebar-item ${activeTab === 'Dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('Dashboard')} style={{ cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
                <span>Dashboard</span>
              </div>
              <div className={`sidebar-item ${activeTab === 'Workspaces' ? 'active' : ''}`} onClick={() => setActiveTab('Workspaces')} style={{ cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                <span>Workspaces</span>
              </div>
              <div className={`sidebar-item ${activeTab === 'Task List' ? 'active' : ''}`} onClick={() => setActiveTab('Task List')} style={{ cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line></svg>
                <span>Task List</span>
              </div>
              <div className={`sidebar-item ${activeTab === 'Settings' ? 'active' : ''}`} onClick={() => setActiveTab('Settings')} style={{ cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                <span>Settings</span>
              </div>
            </div>
            
            <div className="mockup-content">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
