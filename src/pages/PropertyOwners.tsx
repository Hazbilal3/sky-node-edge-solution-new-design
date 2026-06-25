import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { usePageTitle } from '../hooks/usePageTitle';
import { useConstructionCanvas } from '../hooks/useConstructionCanvas';

export default function PropertyOwners() {
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const ctaCanvasRef  = useRef<HTMLCanvasElement>(null);

  useReveal();
  usePageTitle('For Property Owners');
  useConstructionCanvas(heroCanvasRef);
  useConstructionCanvas(ctaCanvasRef);

  return (
    <>
      <style>{`
        .hero { position:relative; min-height:100vh; display:flex; align-items:center; overflow:hidden; padding-top:68px; padding-bottom:64px; }
        .hero-iso-bg { position:absolute; inset:0; pointer-events:none; overflow:hidden; z-index:0; }
        .hero-iso-bg svg { position:absolute; width:100%; height:100%; opacity:0.06; }
        .hero-inner { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; width: 100%; z-index:2;}
        #heroCanvas, #ctaCanvas { position:absolute; inset:0; width:100%; height:100%; z-index:0; pointer-events:none; }

        .city-tags { display: flex; gap: 8px; margin-bottom: 28px; flex-wrap: wrap; }
        .city-tag { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 5px 12px; border-radius: var(--r-btn); border: 1.5px solid var(--border-accent); color: var(--sky-blue); background: rgba(64,156,188,0.08); }
        .hero h1 { font-size: clamp(36px, 5vw, 62px); font-weight: 900; line-height: 1.08; letter-spacing: -0.025em; color: rgb(var(--fg)); margin-bottom: 24px; }
        .hero h1 em { font-style: normal; color: var(--sky-blue); }
        .hero-sub { font-size: 17px; font-weight: 400; color: var(--tx-3); max-width: 540px; line-height: 1.7; margin-bottom: 40px; }
        .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 0; }

        .hero-visual { position: relative; display: flex; align-items: center; justify-content: center; }
        .hero-visual-card { background: var(--bg-card-glass); border: 1px solid var(--border-accent); border-radius: var(--r-lg); width: 100%; max-width: 520px; overflow: hidden; backdrop-filter: blur(10px); }
        .hero-visual-header { padding: 16px 20px; border-bottom: 1px solid var(--border-dark); display: flex; align-items: center; justify-content: space-between; background: linear-gradient(90deg, rgba(32,101,132,0.20) 0%, transparent 100%); }
        .visual-title { font-size: 12px; font-weight: 700; color: var(--tx-3); letter-spacing: 0.1em; text-transform: uppercase; }
        .visual-status { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; color: var(--green); }
        .visual-status::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--green); box-shadow: 0 0 6px var(--green); animation: pulse-green 2s infinite; }
        @keyframes pulse-green { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }

        .eval-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-bottom: 1px solid var(--border-dark); font-size: 13px; }
        .eval-row:last-of-type { border-bottom: none; }
        .eval-label { display: flex; align-items: center; gap: 10px; color: var(--tx-2); font-weight: 500; }
        .eval-ico { width: 26px; height: 26px; border-radius: 6px; background: rgba(64,156,188,0.12); border: 1px solid var(--border-accent); display: flex; align-items: center; justify-content: center; color: var(--sky-blue); flex-shrink: 0; }
        .eval-ico svg { width: 14px; height: 14px; }
        .eval-check { font-size: 11px; font-weight: 700; color: var(--green); display: flex; align-items: center; gap: 5px; }
        .eval-check::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--green); box-shadow: 0 0 5px var(--green); }
        .hero-card-footer { display: grid; grid-template-columns: 1fr 1fr; padding: 18px 20px; gap: 12px; background: rgba(64,156,188,0.07); border-top: 1px solid rgba(64,156,188,0.18); }
        .hero-card-stat-val { font-size: 22px; font-weight: 900; color: var(--sky-blue); line-height: 1; }
        .hero-card-stat-lbl { font-size: 11px; color: var(--tx-5); margin-top: 3px; line-height: 1.4; }

        .credibility { background: var(--bg-credibility); border-top: 1px solid var(--border-dark); border-bottom: 1px solid var(--border-dark); padding: 28px 0; }
        .credibility-inner { display: flex; align-items: center; gap: 48px; flex-wrap: wrap; justify-content: center; }
        .cred-label { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--tx-6); white-space: nowrap; }
        .cred-logo { height: 20px; background: rgba(var(--fg),0.07); border-radius: 4px; }

        .section-h2 { font-size: clamp(28px, 3.5vw, 42px); font-weight: 900; line-height: 1.13; letter-spacing: -0.025em; color: var(--light-text); margin-bottom: 20px; }
        .section-h2 em { font-style: normal; color: var(--teal-primary); }
        .section-h2--dark { color: rgb(var(--fg)); }
        .section-h2--dark em { color: var(--sky-blue); }
        .section-body { font-size: 15px; color: var(--light-muted); line-height: 1.8; margin-bottom: 16px; }
        .section-body--dark { color: var(--tx-3); }
        .section-header-center { text-align: center; max-width: 640px; margin: 0 auto 60px; }

        .split-header { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; margin-bottom: 44px; }

        .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 8px; }
        .feature-item { display: flex; gap: 16px; }
        .feature-icon { width: 42px; height: 42px; border-radius: var(--r-sm); background: rgba(32,101,132,0.1); border: 1px solid rgba(32,101,132,0.2); display: flex; align-items: center; justify-content: center; color: var(--teal-primary); flex-shrink: 0; }
        .feature-icon svg { width: 18px; height: 18px; }
        .feature-title { font-size: 15px; font-weight: 700; color: var(--light-text); margin-bottom: 4px; }
        .feature-desc  { font-size: 13px; color: var(--light-muted); line-height: 1.65; }

        .callout-band { background: linear-gradient(135deg, var(--bg-callout-1) 0%, var(--bg-callout-2) 60%, var(--bg-callout-3) 100%); border-top: 1px solid var(--border-accent); border-bottom: 1px solid var(--border-accent); padding: 80px 0; }
        .callout-inner { display: grid; grid-template-columns: 1fr auto; gap: 72px; align-items: center; }
        .callout-h2 { font-size: clamp(28px, 3.8vw, 46px); font-weight: 900; color: rgb(var(--fg)); letter-spacing: -0.025em; line-height: 1.1; margin-bottom: 18px; }
        .callout-h2 em { font-style: normal; color: var(--sky-blue); }
        .callout-body { font-size: 15px; color: var(--tx-3); line-height: 1.75; max-width: 560px; margin-bottom: 36px; }
        .callout-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .metric-stack { display: flex; flex-direction: column; gap: 10px; min-width: 250px; }
        .metric-item { display: flex; flex-direction: column; gap: 4px; padding: 12px 16px; background: rgba(64,156,188,0.07); border: 1px solid rgba(64,156,188,0.18); border-radius: var(--r-sm); }
        .metric-lbl { font-size: 11px; color: var(--tx-4); }
        .metric-val { font-size: 13px; font-weight: 700; color: var(--sky-blue); }
        
        .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .why-card { background: var(--bg-card); border: 1px solid var(--border-dark); border-radius: var(--r-md); padding: 28px 24px; transition: all 0.22s ease; position: relative; overflow: hidden; }
        .why-card:hover { border-color: rgba(64,156,188,0.45); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(32,101,132,0.20); }
        .why-card::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; border-radius: var(--r-md) var(--r-md) 0 0; background: linear-gradient(90deg, #206584, #6BC0DD); }
        .why-icon { width: 46px; height: 46px; border-radius: var(--r-sm); display: flex; align-items: center; justify-content: center; margin-bottom: 18px; background: rgba(64,156,188,0.14); color: var(--sky-blue); }
        .why-icon svg { width: 22px; height: 22px; }
        .why-name { font-size: 16px; font-weight: 700; color: rgb(var(--fg)); margin-bottom: 9px; }
        .why-desc { font-size: 13px; color: var(--tx-4); line-height: 1.65; }

        .qual-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .qual-list { display: flex; flex-direction: column; gap: 14px; margin-top: 8px; }
        .qual-item { display: flex; gap: 14px; align-items: flex-start; padding: 16px 20px; background: var(--bg-light-card); border: 1px solid var(--light-border); border-radius: var(--r-md); transition: border-color .35s ease; }
        .qual-tick { width: 24px; height: 24px; border-radius: 50%; background: rgba(21,153,79,0.12); color: var(--green); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
        .qual-tick svg { width: 13px; height: 13px; }
        .qual-text { font-size: 14px; color: var(--light-text); font-weight: 500; line-height: 1.5; }
        .qual-note { font-size: 12px; color: var(--light-muted); font-style: italic; margin-top: 22px; line-height: 1.6; }

        .inquiry-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .reassurance-list { display: flex; flex-direction: column; gap: 14px; margin-top: 32px; }
        .reassurance-item { display: flex; gap: 16px; padding: 18px 20px; background: rgba(64,156,188,0.05); border: 1px solid var(--border-dark); border-radius: var(--r-md); transition: border-color 0.15s; }
        .reassurance-item:hover { border-color: rgba(64,156,188,0.28); }
        .reassurance-icon { width: 42px; height: 42px; border-radius: var(--r-sm); background: rgba(32,101,132,0.1); border: 1px solid rgba(32,101,132,0.2); display: flex; align-items: center; justify-content: center; color: var(--teal-primary); flex-shrink: 0; }
        .reassurance-icon svg { width: 18px; height: 18px; }
        .reassurance-title { font-size: 14px; font-weight: 700; color: var(--tx-1); margin-bottom: 3px; }
        .reassurance-desc  { font-size: 13px; color: var(--tx-5); line-height: 1.6; }

        .inquiry-form { background: var(--bg-card); border: 1px solid var(--border-accent); border-radius: var(--r-lg); padding: 36px; position: sticky; top: 84px; transition: background-color .35s ease, border-color .35s ease; }
        .form-title { font-size: 20px; font-weight: 900; color: rgb(var(--fg)); margin-bottom: 6px; }
        .form-sub { font-size: 13px; color: var(--tx-5); margin-bottom: 28px; }
        .form-group { margin-bottom: 16px; }
        .form-label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--tx-4); margin-bottom: 7px; }
        .form-input { width: 100%; padding: 12px 16px; background: rgba(var(--fg),0.04); border: 1px solid rgba(64,156,188,0.2); border-radius: var(--r-sm); color: rgb(var(--fg)); font-family: var(--font); font-size: 14px; outline: none; transition: border-color 0.15s; -webkit-appearance: none; }
        .form-input:focus { border-color: var(--teal-accent); }
        .form-input::placeholder { color: var(--tx-6); }
        select.form-input { cursor: pointer; }
        select.form-input option { background: var(--bg-card); color: rgb(var(--fg)); }
        textarea.form-input { resize: vertical; min-height: 80px; }
        .form-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .form-submit { width: 100%; justify-content: center; margin-top: 8px; }
        .form-privacy { font-size: 11px; color: var(--tx-6); text-align: center; margin-top: 12px; line-height: 1.5; }
        .form-success { display: none; text-align: center; padding: 40px 20px; }
        .form-success.show { display: block; }
        .form-success-icon { font-size: 40px; margin-bottom: 16px; }
        .form-success-title { font-size: 18px; font-weight: 900; color: rgb(var(--fg)); margin-bottom: 10px; }
        .form-success-body { font-size: 14px; color: var(--tx-4); line-height: 1.7; }

        .final-cta { position: relative; padding: 120px 28px; text-align: center; overflow: hidden; background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(32,101,132,0.12) 0%, transparent 70%), linear-gradient(180deg, rgba(var(--bg-base),0.96) 0%, rgba(var(--bg-base),0.92) 100%); transition: background-color .35s ease; }
        .final-cta > * { position: relative; z-index: 1; }
        .final-cta .eyebrow { justify-content: center; }
        .final-cta h2 { font-size: clamp(32px, 5vw, 58px); font-weight: 900; color: rgb(var(--fg)); letter-spacing: -0.025em; line-height: 1.08; margin-bottom: 20px; }
        .final-cta h2 em { font-style: normal; color: var(--sky-blue); }
        .final-cta p { font-size: 17px; color: var(--tx-4); max-width: 520px; margin: 0 auto 40px; }
        .cta-actions { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; }

        @media (max-width: 960px) {
          .why-grid { grid-template-columns: repeat(2, 1fr); }
          .feature-grid { grid-template-columns: 1fr 1fr; }
          .callout-inner { grid-template-columns: 1fr; gap: 40px; }
          .metric-stack { min-width: unset; }
        }
        @media (max-width: 768px) {
          .hero-inner, .split-header, .qual-grid, .inquiry-grid { grid-template-columns: 1fr; gap: 40px; }
          .feature-grid, .why-grid, .form-2col { grid-template-columns: 1fr; }
          .hero { padding-top: 68px; min-height: auto; padding-bottom: 64px; }
          .inquiry-form { position: static; }
          .callout-actions { flex-direction: column; }
        }
        .arrow-icon { width: 14px; height: 14px; }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="hero">
        <canvas ref={heroCanvasRef} id="heroCanvas" aria-hidden="true" />
        <div className="hero-iso-bg">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#6BC0DD">
              <line x1="0" y1="400" x2="720" y2="0" /><line x1="0" y1="500" x2="900" y2="50" />
              <line x1="0" y1="600" x2="1080" y2="60" /><line x1="100" y1="700" x2="1300" y2="100" />
              <line x1="200" y1="800" x2="1440" y2="200" /><line x1="400" y1="800" x2="1440" y2="400" />
              <line x1="600" y1="800" x2="1440" y2="560" /><line x1="800" y1="800" x2="1440" y2="680" />
              <line x1="720" y1="0" x2="1440" y2="400" /><line x1="540" y1="0" x2="1440" y2="540" />
              <line x1="360" y1="0" x2="1440" y2="680" /><line x1="180" y1="0" x2="1280" y2="800" />
              <line x1="0" y1="0" x2="1100" y2="800" /><line x1="0" y1="100" x2="900" y2="800" />
            </g>
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-inner">
            <div className="reveal">
              <div className="city-tags">
                <span className="city-tag">Connecticut</span>
                <span className="city-tag">Florida</span>
                <span className="city-tag">Illinois</span>
                <span className="city-tag">New York</span>
              </div>
              <div className="eyebrow eyebrow--po">For Property Owners &amp; Building Partners</div>
              <h1>Your rooftop is already an asset.<br /><em>It's just not paying.</em></h1>
              <p className="hero-sub">
                Your building may already have what modern communications, media, and edge-network operators need: elevation, access, power, and location — on the roof and in the back-of-house, mechanical, and otherwise vacant spaces that sit idle today. Skynode is the experienced partner who turns that potential into recurring revenue, without operational burden or building risk.
              </p>
              <div className="hero-actions">
                <Link to="/contact" className="btn btn-primary">Let's Evaluate Your Property</Link>
                <a href="#how" className="btn btn-outline-light">Learn How It Works</a>
              </div>
            </div>

            <div className="hero-visual reveal delay-100">
              <div className="hero-visual-card">
                <div className="hero-visual-header">
                  <span className="visual-title">Property Fit Snapshot</span>
                  <span className="visual-status">Evaluating</span>
                </div>

                <div className="eval-row">
                  <span className="eval-label">
                    <span className="eval-ico"><svg viewBox="0 0 18 18" fill="none"><path d="M3 16V7l6-4 6 4v9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M3 16h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></span>
                    Elevation &amp; line of sight
                  </span>
                  <span className="eval-check">Strong</span>
                </div>
                <div className="eval-row">
                  <span className="eval-label">
                    <span className="eval-ico"><svg viewBox="0 0 18 18" fill="none"><path d="M10 2L4 10h4l-1 6 6-8H9l1-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg></span>
                    Power &amp; mechanical access
                  </span>
                  <span className="eval-check">On-site</span>
                </div>
                <div className="eval-row">
                  <span className="eval-label">
                    <span className="eval-ico"><svg viewBox="0 0 18 18" fill="none"><rect x="3" y="3" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 9h12M9 3v12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" /></svg></span>
                    Rooftop &amp; back-of-house space
                  </span>
                  <span className="eval-check">Available</span>
                </div>
                <div className="eval-row">
                  <span className="eval-label">
                    <span className="eval-ico"><svg viewBox="0 0 18 18" fill="none"><path d="M9 2v4M9 12v4M2 9h4M12 9h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" /></svg></span>
                    In a Skynode metro market
                  </span>
                  <span className="eval-check">Yes</span>
                </div>

                <div className="hero-card-footer">
                  <div>
                    <div className="hero-card-stat-val">4</div>
                    <div className="hero-card-stat-lbl">Active metro<br />markets</div>
                  </div>
                  <div>
                    <div className="hero-card-stat-val">1</div>
                    <div className="hero-card-stat-lbl">Partner managing<br />the whole process</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE PARTNER MODEL ═══ */}
      <section className="section-light" id="how">
        <div className="container">
          <div className="split-header reveal">
            <div>
              <div className="eyebrow eyebrow--dark">The Partner Model</div>
              <h2 className="section-h2">A partner model<br /><em>built around trust.</em></h2>
            </div>
            <div style={{ paddingTop: '8px' }}>
              <p className="section-body">
                Skynode works collaboratively with building ownership to identify suitable opportunities, manage the technical and regulatory process, and create new income from space that is often underutilized today. Our model is built around alignment: when a site succeeds, the property owner shares in that success.
              </p>
              <p className="section-body">
                We're not simply looking for access to a roof. We're building long-term partnerships with owners who want to put their underused space — rooftop, mechanical, or back-of-house — to work in the value created by next-generation communications and infrastructure demand.
              </p>
            </div>
          </div>

          {/* New revenue, minimal building risk */}
          <div className="eyebrow eyebrow--dark reveal" style={{ marginTop: '8px' }}>New Revenue, Minimal Building Risk</div>
          <h2 className="section-h2 reveal" style={{ marginBottom: '36px' }}>New revenue. Minimal operational burden.<br /><em>No infrastructure complexity to manage.</em></h2>

          <div className="feature-grid">
            <div className="feature-item reveal">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M9 2l5.5 2.3v4.9C14.5 13 12 15.8 9 17c-3-1.2-5.5-4-5.5-7.8V4.3L9 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M6.5 9l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
              <div>
                <div className="feature-title">Minimal tenant disruption</div>
                <div className="feature-desc">Work is planned and staged to keep daily building operations and tenants undisturbed. The space gets more productive; the building keeps running as usual.</div>
              </div>
            </div>
            <div className="feature-item reveal delay-100">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></div>
              <div>
                <div className="feature-title">Careful coordination with management</div>
                <div className="feature-desc">We work alongside your building management on scheduling, access, and communication — so nothing happens in your building that your team didn't plan with us.</div>
              </div>
            </div>
            <div className="feature-item reveal delay-200">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><rect x="3" y="8" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M6 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="9" cy="12" r="1" fill="currentColor" /></svg></div>
              <div>
                <div className="feature-title">Controlled, professional access</div>
                <div className="feature-desc">Site access is managed, logged, and discreet. The people on-site are accountable operators — not an unmanaged parade of subcontractors.</div>
              </div>
            </div>
            <div className="feature-item reveal">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M3 16V7l6-4 6 4v9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M3 16h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></div>
              <div>
                <div className="feature-title">Planned around your structure</div>
                <div className="feature-desc">Equipment placement, loading, and constraints are assessed up front. Projects are designed to respect the building, not work around it after the fact.</div>
              </div>
            </div>
            <div className="feature-item reveal delay-100">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><rect x="4" y="2" width="10" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M6 6h6M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></div>
              <div>
                <div className="feature-title">Compliance-driven from the start</div>
                <div className="feature-desc">Permitting, filings, and approvals are handled as part of the project — not bolted on later. Documentation is kept clean for ownership and counsel.</div>
              </div>
            </div>
            <div className="feature-item reveal delay-200">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M9 2l1.6 4.2L15 6.6l-3.2 2.8L13 14 9 11.4 5 14l1.2-4.6L3 6.6l4.4-.4L9 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg></div>
              <div>
                <div className="feature-title">Aligned, recurring upside</div>
                <div className="feature-desc">Owners share in the success of the site. As demand for distributed infrastructure grows, the value of a well-managed location grows with it.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PERMITTING & COMPLIANCE BAND ═══ */}
      <div className="callout-band" id="compliance">
        <div className="container">
          <div className="callout-inner reveal">
            <div>
              <div className="eyebrow eyebrow--light">Permitting &amp; Compliance</div>
              <h2 className="callout-h2">We know how to<br /><em>get projects approved.</em></h2>
              <p className="callout-body">
                For most owners, the real fear isn't the equipment — it's the paperwork, the liability, and the approvals. Skynode understands how to navigate and expedite the process across local, state, and federal jurisdictions, so the opportunity never becomes a distraction for your team. Bring it to your ownership group or investment committee with confidence, not caveats.
              </p>
              <div className="callout-actions">
                <Link to="/contact" className="btn btn-primary">Let's Evaluate Your Property</Link>
              </div>
            </div>

            <div className="metric-stack">
              <div className="metric-item">
                <span className="metric-lbl">Local</span>
                <span className="metric-val">Permitting &amp; municipal review</span>
              </div>
              <div className="metric-item">
                <span className="metric-lbl">State</span>
                <span className="metric-val">State-level requirements</span>
              </div>
              <div className="metric-item">
                <span className="metric-lbl">Federal</span>
                <span className="metric-val">Federal regulatory considerations</span>
              </div>
              <div className="metric-item">
                <span className="metric-lbl">Coordination</span>
                <span className="metric-val">Utility &amp; access</span>
              </div>
              <div className="metric-item">
                <span className="metric-lbl">Documentation</span>
                <span className="metric-val">Landlord &amp; compliance records</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ WHY OWNERS WORK WITH US ═══ */}
      <section className="section-dark" id="why">
        <div className="container">
          <div className="section-header-center reveal">
            <div className="eyebrow eyebrow--po">Why Property Owners Work With Skynode</div>
            <h2 className="section-h2 section-h2--dark">The professional version<br /><em>of putting space to work.</em></h2>
            <p style={{ fontSize: '15px', color: 'var(--tx-3)', lineHeight: 1.7 }}>
              This buyer isn't persuaded by revenue alone. They're persuaded by process, professionalism, and evidence that the operator has done this before — without creating problems.
            </p>
          </div>

          <div className="why-grid">
            <div className="why-card reveal">
              <div className="why-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 3.4v6.8C20 18.6 16.6 22.6 12 24c-4.6-1.4-8-5.4-8-10.8V6.4L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg></div>
              <div className="why-name">Aligned incentives</div>
              <div className="why-desc">Owners share in the success of the site. We do well when your building does — not before.</div>
            </div>
            <div className="why-card reveal delay-100">
              <div className="why-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
              <div className="why-name">Low-friction execution</div>
              <div className="why-desc">We manage the complexity so the opportunity doesn't turn into a project your team has to babysit.</div>
            </div>
            <div className="why-card reveal delay-200">
              <div className="why-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v6c0 4.5-3 8.3-7 9.5C8 20.3 5 16.5 5 12V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
              <div className="why-name">Minimal-risk approach</div>
              <div className="why-desc">Disciplined, compliant projects designed to protect the building first, generate revenue second.</div>
            </div>
            <div className="why-card reveal">
              <div className="why-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M4 21V9l8-5 8 5v12" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M4 21h16M9 21v-5h6v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
              <div className="why-name">Deep rooftop expertise</div>
              <div className="why-desc">Decades of combined experience managing rooftop transmission and broadcasting locations.<sup>*</sup></div>
            </div>
            <div className="why-card reveal delay-100">
              <div className="why-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M8 7h8M8 11h8M8 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></div>
              <div className="why-name">Regulatory capability</div>
              <div className="why-desc">Local, state, and federal compliance managed end to end, with clean documentation throughout.</div>
            </div>
            <div className="why-card reveal delay-200">
              <div className="why-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M3 17l5-5 4 4 8-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 8h4v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
              <div className="why-name">Long-term value</div>
              <div className="why-desc">Durable infrastructure relationships, not one-off transactions. A site that keeps earning over time.</div>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--tx-6)', marginTop: '22px', fontStyle: 'italic' }}><sup>*</sup>Specific experience figures to be confirmed before publishing.</p>
        </div>
      </section>

      {/* ═══ WHAT BUILDINGS WORK ═══ */}
      <section className="section-light" id="fit">
        <div className="container">
          <div className="qual-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow--dark">What Buildings Work</div>
              <h2 className="section-h2">Not sure if your building fits?<br /><em>That's what we're for.</em></h2>
              <p className="section-body">
                Skynode evaluates a range of property types across its target markets. There's no need to self-qualify or rule yourself out — but buildings with any of the following characteristics are often a good place to start the conversation.
              </p>
              <p className="qual-note">
                Every building is different, and final fit depends on a site-specific evaluation. The fastest way to know is to ask — it costs nothing to find out.
              </p>
              <Link to="/contact" className="btn btn-outline-dark" style={{ marginTop: '8px' }}>
                Ask About Your Building
                <svg className="arrow-icon" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>

            <div className="qual-list reveal delay-100">
              <div className="qual-item">
                <span className="qual-tick"><svg viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                <span className="qual-text">An elevated position relative to the surrounding area</span>
              </div>
              <div className="qual-item">
                <span className="qual-tick"><svg viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                <span className="qual-text">Existing utility infrastructure — power and mechanical access</span>
              </div>
              <div className="qual-item">
                <span className="qual-tick"><svg viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                <span className="qual-text">Available rooftop, mechanical, or other back-of-house space</span>
              </div>
              <div className="qual-item">
                <span className="qual-tick"><svg viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                <span className="qual-text">Clear line-of-sight potential across the metro</span>
              </div>
              <div className="qual-item">
                <span className="qual-tick"><svg viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                <span className="qual-text">Located in or adjacent to a Skynode target market</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EVALUATE YOUR PROPERTY ═══ */}
      <section className="section-dark" id="po-inquiry">
        <div className="container">
          <div className="inquiry-grid">
            {/* Left: copy + reassurance */}
            <div className="reveal">
              <div className="eyebrow eyebrow--light">Is My Building A Fit?</div>
              <h2 className="section-h2 section-h2--dark">Let's evaluate your property.<br /><em>It costs nothing to find out.</em></h2>
              <p className="section-body--dark" style={{ fontSize: '15px', lineHeight: 1.75, marginBottom: '32px' }}>
                A few basics is all we need to start. A real person reviews every inquiry — and we'll tell you honestly whether your building is worth evaluating. Longer qualification happens on a follow-up call, on your schedule.
              </p>

              <div className="reassurance-list">
                <div className="reassurance-item">
                  <div className="reassurance-icon"><svg viewBox="0 0 18 18" fill="none"><rect x="4" y="2" width="10" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M6 6h6M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></div>
                  <div>
                    <div className="reassurance-title">We manage the compliance</div>
                    <div className="reassurance-desc">Permits, filings, structural assessments, and municipal approvals — all handled by Skynode, with clean documentation for ownership and counsel.</div>
                  </div>
                </div>
                <div className="reassurance-item">
                  <div className="reassurance-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.5" /><path d="M4.5 13.5A6.5 6.5 0 0 1 2 7.5M13.5 13.5A6.5 6.5 0 0 0 16 7.5M9 10v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></div>
                  <div>
                    <div className="reassurance-title">Aligned, not extractive</div>
                    <div className="reassurance-desc">Owners share in the success of the site. We're building a long-term partnership, not chasing access to a single roof.</div>
                  </div>
                </div>
                <div className="reassurance-item">
                  <div className="reassurance-icon"><svg viewBox="0 0 18 18" fill="none"><rect x="3" y="8" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M6 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="9" cy="12" r="1" fill="currentColor" /></svg></div>
                  <div>
                    <div className="reassurance-title">Discreet, managed operations</div>
                    <div className="reassurance-desc">Controlled access and minimal disruption to tenants and daily operations. Your building keeps running as usual.</div>
                  </div>
                </div>
                <div className="reassurance-item">
                  <div className="reassurance-icon"><svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" /><path d="M9 7v3.5l2 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 2h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></div>
                  <div>
                    <div className="reassurance-title">No pressure, no obligation</div>
                    <div className="reassurance-desc">An evaluation is just that. We'll tell you what we see — including the things that might make your building wrong for this — before anyone signs anything.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: CTA card */}
            <div className="inquiry-form reveal delay-100">
              <div className="form-title">Submit your building for evaluation</div>
              <div className="form-sub">Takes 2 minutes. A real person follows up within one business day.</div>

              <div style={{ padding: '20px 0 24px' }}>
                <p style={{ fontSize: '14px', color: 'var(--tx-4)', lineHeight: '1.75', marginBottom: '18px' }}>
                  Building evaluations are handled through the Skynode contact form. Select <strong style={{ color: 'rgb(var(--fg))' }}>"I own a building"</strong> and tell us what you have. We'll need:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    'City / neighborhood your building is in',
                    'Building type (commercial, residential, mixed-use, industrial)',
                    'Whether rooftop or mechanical room access is available',
                    'Whether power is on-site',
                    'Anything else you think is relevant',
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(21,153,79,0.12)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                        <svg viewBox="0 0 16 16" fill="none" width="11" height="11"><path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      <span style={{ fontSize: '13px', color: 'var(--tx-3)', lineHeight: '1.55' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link to="/contact" className="btn btn-primary form-submit" style={{ justifyContent: 'center' }}>
                Evaluate My Building
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <div className="form-privacy">Your info is used only to evaluate your building. No spam, no auto-dialers. We're in the infrastructure business, not the harassment business.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="final-cta">
        <canvas ref={ctaCanvasRef} id="ctaCanvas" aria-hidden="true"></canvas>
        <div className="eyebrow eyebrow--light reveal">Ready When You Are</div>
        <h2 className="reveal">That space is sitting there anyway.<br /><em>Let's see what it's worth.</em></h2>
        <p className="reveal">Tell us where your building is and what space you've got — rooftop, mechanical, or back-of-house. We'll tell you whether it's worth evaluating, honestly, and within one business day.</p>
        <div className="cta-actions reveal">
          <Link to="/contact" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '15px' }}>Let's Evaluate Your Property</Link>
          <a href="#how" className="btn btn-outline-light" style={{ padding: '16px 32px', fontSize: '15px' }}>Learn How It Works</a>
        </div>
      </section>
    </>
  );
}
