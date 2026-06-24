import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { useBroadcastWaveCanvas } from '../hooks/useBroadcastWaveCanvas';
import { useHexMapCanvas, CITIES } from '../hooks/useHexMapCanvas';
import { useMetroFabricCanvas } from '../hooks/useMetroFabricCanvas';

export default function Broadcasting() {
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const ctaCanvasRef  = useRef<HTMLCanvasElement>(null);
  const hexCanvasRef  = useRef<HTMLCanvasElement>(null);
  const hexTipRef     = useRef<HTMLDivElement>(null);
  const metroRef      = useRef<HTMLCanvasElement>(null);

  const [cityIndex, setCityIndex] = useState(0);
  const [zoom, setZoom]           = useState(1);
  const [activeFilter, setActiveFilter] = useState('All');

  useReveal();
  useBroadcastWaveCanvas(heroCanvasRef, { receiverCount:24, waveCount:7, waveSpeed:0.8 });
  useBroadcastWaveCanvas(ctaCanvasRef,  { receiverCount:14, waveCount:6, waveSpeed:0.7, centered:true });
  useHexMapCanvas(hexCanvasRef, hexTipRef, cityIndex, zoom);
  useMetroFabricCanvas(metroRef);

  const CITY_NAMES = CITIES.map(c => c.name);
  const filters = ['All', 'FM', 'TV', 'LPFM', 'Translator'];

  return (
    <>
      <style>{`
        :root[data-theme="dark"]  { --sky-blue: #A78BFA; --broadcast-violet: #A78BFA; }
        :root[data-theme="light"] { --sky-blue: #7C3AED; --broadcast-violet: #7C3AED; }
        .eyebrow--broadcast { color:var(--broadcast-violet); }
        .eyebrow--broadcast::before { background:var(--broadcast-violet); }
        .filter-chip { border:1px solid rgba(167,139,250,0.35); color:var(--sky-blue); background:rgba(167,139,250,0.10); }
        .filter-chip.active, .filter-chip:hover { background:rgba(167,139,250,0.22); border-color:var(--sky-blue); }
        .svc-btn--on { background:rgba(167,139,250,0.15); color:var(--sky-blue); border:1px solid rgba(167,139,250,0.38); }
        .hero-visual-header { background:linear-gradient(90deg,rgba(91,33,182,0.25) 0%,transparent 100%); }
        .hero-card-footer { background:rgba(167,139,250,0.07); border-top:1px solid rgba(167,139,250,0.20); }
        .hero-card-stat-val { color:var(--sky-blue); }
        .usecase-card::after { background:linear-gradient(90deg,#5B21B6,#A78BFA); }
        .usecase-card:hover { border-color:rgba(167,139,250,0.45); box-shadow:0 12px 40px rgba(91,33,182,0.20); }
        .usecase-icon { background:rgba(167,139,250,0.14); color:var(--sky-blue); }
        .ptag { background:rgba(167,139,250,0.10); border:1px solid rgba(167,139,250,0.30); color:var(--sky-blue); }
        .usecase-link { color:var(--sky-blue); }
        .hex-map-topbar { background:linear-gradient(90deg,#5B21B6,#1A5570); }
        .section-h2 em { color:var(--sky-blue); }
        .node-dot { width:8px; height:8px; border-radius:50%; display:inline-block; margin-right:4px; }
        .node-dot--on  { background:var(--green); }
        .node-dot--off { background:rgba(var(--fg),0.20); }
        .node-name-cell { display:flex; align-items:center; gap:4px; }
        .node-site-id { font-size:13px; font-weight:700; color:var(--tx-1); }
        .node-asl { font-size:11px; color:var(--tx-5); margin-left:4px; }
        .node-row-item { display:flex; align-items:center; justify-content:space-between; padding:10px 16px; border-bottom:1px solid var(--border-dark); }
        .node-row-item:last-child { border-bottom:none; }
        .usecase-name { font-size:15px; font-weight:900; color:rgb(var(--fg)); margin-bottom:8px; }
        .usecase-desc { font-size:13px; color:var(--tx-4); line-height:1.65; margin-bottom:14px; }
        .usecase-tags { display:flex; flex-wrap:wrap; gap:5px; margin-bottom:14px; }
        .section-header-center { text-align:center; max-width:640px; margin:0 auto 48px; }
        .section-body { font-size:15px; color:var(--tx-3); line-height:1.75; margin-bottom:20px; }
        .section-body--dark { font-size:15px; color:var(--tx-3); line-height:1.75; }
        .feature-icon { width:42px; height:42px; border-radius:var(--r-sm); background:rgba(32,101,132,0.10); border:1px solid rgba(32,101,132,0.20); display:flex; align-items:center; justify-content:center; color:var(--teal-primary); flex-shrink:0; }
        .feature-icon svg { width:18px; height:18px; }
        .feature-item { display:flex; gap:14px; }
        .feature-title { font-size:14px; font-weight:700; color:rgb(var(--fg)); margin-bottom:4px; }
        .feature-desc { font-size:13px; color:var(--tx-4); line-height:1.65; }
        .hero { padding-top:100px; min-height:auto; padding-bottom:80px; }
        #heroCanvas { position:absolute; inset:0; width:100%; height:100%; z-index:0; pointer-events:none; }
        .final-cta { position:relative; padding:120px 28px; text-align:center; overflow:hidden; background:radial-gradient(ellipse 70% 80% at 50% 50%, rgba(91,33,182,0.12) 0%, transparent 70%), linear-gradient(180deg,rgba(var(--bg-base),0.96) 0%,rgba(var(--bg-base),0.92) 100%); }
        .final-cta > * { position:relative; z-index:1; }
        .final-cta em { font-style:normal; color:var(--sky-blue); }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="hero" style={{position:'relative',overflow:'hidden'}}>
        <canvas ref={heroCanvasRef} id="heroCanvas" aria-hidden="true" />
        <div className="hero-scrim" />
        <div className="hero-iso-bg">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
            <g stroke="#6BC0DD">
              <line x1="0" y1="400" x2="720" y2="0"/><line x1="0" y1="500" x2="900" y2="50"/>
              <line x1="0" y1="600" x2="1080" y2="60"/><line x1="100" y1="700" x2="1300" y2="100"/>
              <line x1="200" y1="800" x2="1440" y2="200"/><line x1="400" y1="800" x2="1440" y2="400"/>
              <line x1="600" y1="800" x2="1440" y2="560"/><line x1="800" y1="800" x2="1440" y2="680"/>
              <line x1="720" y1="0" x2="1440" y2="400"/><line x1="540" y1="0" x2="1440" y2="540"/>
              <line x1="360" y1="0" x2="1440" y2="680"/><line x1="180" y1="0" x2="1280" y2="800"/>
              <line x1="0" y1="0" x2="1100" y2="800"/><line x1="0" y1="100" x2="900" y2="800"/>
            </g>
          </svg>
        </div>
        <div className="container" style={{position:'relative',zIndex:2}}>
          <div className="hero-inner">
            <div>
              <div className="city-tags">
                <span className="city-tag">Connecticut</span>
                <span className="city-tag">Florida</span>
                <span className="city-tag">Illinois</span>
                <span className="city-tag">New York</span>
              </div>
              <div className="eyebrow eyebrow--broadcast">Broadcast Infrastructure</div>
              <h1>Broadcast infrastructure for FM, TV, LPFM,<br/>Translators, Backup, and<br/><em>Auxiliary Services.</em></h1>
              <p className="hero-sub">Broadcasting depends on more than a rooftop. It depends on the right rooftop. Skynode gives broadcasters a better way to identify and evaluate urban broadcast infrastructure — helping engineering teams, operators, and ownership groups move more efficiently from site search to serious evaluation.</p>
              <div className="hero-actions">
                <Link to="/skynodes" className="btn btn-primary">Browse Broadcast-Rated Nodes</Link>
                <Link to="/contact" className="btn btn-outline-light">Talk to Skynode</Link>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-visual-card">
                <div className="hero-visual-header">
                  <span className="visual-title">Broadcast-Rated Skynodes</span>
                  <span className="visual-status">Sites Available</span>
                </div>
                <div className="hero-filter-row">
                  <span className="filter-label">Filter:</span>
                  {filters.map(f => (
                    <span key={f} className={`filter-chip${activeFilter === f ? ' active' : ''}`}
                      onClick={() => setActiveFilter(f)}>{f}</span>
                  ))}
                </div>
                <div className="node-table">
                  {[
                    {id:'0302.NY', asl:"924'",  svcs:['FM','TV']},
                    {id:'0118.CT', asl:"641'",  svcs:['FM','Translator']},
                    {id:'0445.FL', asl:"522'",  svcs:['FM','LPFM','Translator']},
                    {id:'0277.IL', asl:"788'",  svcs:['TV','Translator']},
                    {id:'0391.IL', asl:"435'",  svcs:['TV','LPFM']},
                  ].map(node => (
                    <div key={node.id} className="node-row-item">
                      <div className="node-name-cell">
                        <span className="node-dot node-dot--on"/>
                        <span className="node-site-id">{node.id}</span>
                        <span className="node-asl">| ASL: {node.asl}</span>
                      </div>
                      <div className="node-svc-row">
                        {['FM','TV','LPFM','Translator'].map(s => (
                          <span key={s} className={`svc-btn${node.svcs.includes(s) ? ' svc-btn--on' : ''}`}>{s}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hero-card-footer">
                  <div className="hero-card-stat">
                    <div className="hero-card-stat-val">TBC</div>
                    <div className="hero-card-stat-lbl">Broadcast-rated nodes</div>
                  </div>
                  <div className="hero-card-stat">
                    <div className="hero-card-stat-val">6</div>
                    <div className="hero-card-stat-lbl">Service categories supported</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST / WHY ═══ */}
      <section className="section-light" id="why">
        <div className="container">
          <div className="why-header-split reveal">
            <div>
              <div className="eyebrow eyebrow--dark">Built for Broadcast</div>
              <h2 className="section-h2">Built by operators who have lived in<br/><em>rooftop communications for decades.</em></h2>
            </div>
            <div style={{paddingTop:'8px'}}>
              <p className="section-body">Every broadcast site search has historically started the same way: a blank map, months of cold landlord outreach, RF surveys that go nowhere, and dead ends that cost time you do not have. Skynode has done the preliminary identification work for your market. Broadcast-rated nodes are evaluated for technical relevance — not just available square footage.</p>
              <p className="section-body">The dominant emotion Skynode is designed to create for broadcast engineers and station operators is relief: viable candidates already exist. You do not have to start from scratch.</p>
            </div>
          </div>

          {/* Node map */}
          <div className="hex-map-widget reveal">
            <div className="hex-map-topbar">
              <div className="hex-city-tabs">
                {CITY_NAMES.map((name, i) => (
                  <button key={name} className={`hex-tab${cityIndex === i ? ' active' : ''}`}
                    onClick={() => setCityIndex(i)}>{name}</button>
                ))}
              </div>
              <div className="hex-legend">
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#A78BFA'}}/> FM</span>
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#6BC0DD'}}/> TV</span>
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#5BE49B'}}/> LPFM</span>
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#F59E0B'}}/> Translator</span>
              </div>
            </div>
            <div className="hex-map-wrap">
              <canvas ref={hexCanvasRef} id="hexMapCanvas" width={900} height={400} />
              <div className="hex-zoom-btns">
                <button onClick={() => setZoom(z => Math.min(z + 0.2, 2.5))}>+</button>
                <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))}>−</button>
              </div>
              <div ref={hexTipRef} className="hex-tip" style={{display:'none'}} />
            </div>
          </div>

          {/* Feature grid */}
          <div className="why-feature-grid" style={{marginTop:'44px'}}>
            <div className="feature-item reveal">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
              <div>
                <div className="feature-title">Broadcast-focused location strategy</div>
                <div className="feature-desc">Not all rooftops are equal. Broadcast-rated Skynodes are evaluated for RF environment, line of sight, utility coordination, and long-term site maintainability.</div>
              </div>
            </div>
            <div className="feature-item reveal">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M2 9h14M9 2l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              <div>
                <div className="feature-title">Reduced site acquisition friction</div>
                <div className="feature-desc">Begin with a managed portfolio of candidate locations — not blank-page rooftop sourcing and landlords who do not call back.</div>
              </div>
            </div>
            <div className="feature-item reveal">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M9 2l1.5 3.5H14l-2.8 2 1.1 3.5L9 9.5l-3.3 1.5 1.1-3.5L4 5.5h3.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M9 12v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></div>
              <div>
                <div className="feature-title">Compliance-first execution</div>
                <div className="feature-desc">Local, state, and federal permitting managed by Skynode — across FM, TV, LPFM, and auxiliary services.</div>
              </div>
            </div>
            <div className="feature-item reveal">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
              <div>
                <div className="feature-title">Operational credibility</div>
                <div className="feature-desc">40+ combined years of broadcast engineering. We understand RF environment, long-term rooftop operations, and what maintainable means in year seven.</div>
              </div>
            </div>
            <div className="feature-item reveal">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M6 16h6M9 13v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
              <div>
                <div className="feature-title">Multi-stakeholder readiness</div>
                <div className="feature-desc">Engineering, operations, finance, and leadership all have different needs. Skynode is structured to serve all of them without losing the plot.</div>
              </div>
            </div>
            <div className="feature-item reveal">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 9l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              <div>
                <div className="feature-title">Financial value</div>
                <div className="feature-desc">Reduces the hidden cost of site search. More predictable infrastructure planning from a managed portfolio, not bespoke landlord negotiations.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICE CATEGORIES ═══ */}
      <section className="section-dark" id="services">
        <div className="container">
          <div className="section-header-center reveal">
            <div className="eyebrow eyebrow--broadcast">Service Categories</div>
            <h2 className="section-h2">Every broadcast use case.<br/><em>One infrastructure platform.</em></h2>
            <p style={{fontSize:'15px',color:'var(--tx-3)',lineHeight:'1.7'}}>Broadcast-rated Skynodes support FM, television, LPFM, translators, backup facilities, and auxiliary services — each evaluated for technical relevance in its market.</p>
          </div>
          <div className="usecases-grid">

            {/* 1 — FM Primary */}
            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="3" fill="currentColor"/><path d="M7.5 8.5a6.5 6.5 0 0 0 0 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M16.5 8.5a6.5 6.5 0 0 1 0 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M4.5 5.5a11 11 0 0 0 0 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.45"/><path d="M19.5 5.5a11 11 0 0 1 0 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.45"/></svg>
              </div>
              <div className="usecase-name">FM Primary Transmission Sites</div>
              <p className="usecase-desc">Locations that create real coverage value while remaining workable over the long term. Skynode helps teams identify rooftop sites that may fit FM transmission support, backup deployment, translator functions.</p>
              <div className="usecase-tags"><span className="ptag">FM Primary</span><span className="ptag">Full Power</span><span className="ptag">ERP-Evaluated</span></div>
              <Link to="/solutions/broadcast-primary-site" className="usecase-link">
                Browse FM sites
                <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            {/* 2 — Television */}
            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 19v2M16 19v2M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 11h10M7 14h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/></svg>
              </div>
              <div className="usecase-name">Television Broadcast Sites</div>
              <p className="usecase-desc">Urban sites that can support technically disciplined infrastructure planning and dependable long-term operation, including backup and auxiliary roles.</p>
              <div className="usecase-tags"><span className="ptag">TV Primary</span><span className="ptag">TV Backup</span><span className="ptag">Auxiliary</span></div>
              <Link to="/contact" className="usecase-link">
                Browse TV sites
                <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            {/* 3 — LPFM */}
            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="14" r="2.5" fill="currentColor"/><path d="M9 11a4 4 0 0 0 0 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M15 11a4 4 0 0 1 0 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M6.5 8.5a8 8 0 0 0 0 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/><path d="M17.5 8.5a8 8 0 0 1 0 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/></svg>
              </div>
              <div className="usecase-name">LPFM Infrastructure</div>
              <p className="usecase-desc">Practical and financially rational urban site options for LPFM operators without the friction of bespoke rooftop negotiations. You are local. Your site search should be too.</p>
              <div className="usecase-tags"><span className="ptag">LPFM</span><span className="ptag">Urban Sites</span><span className="ptag">Low Power</span></div>
              <Link to="/contact" className="usecase-link">
                Browse LPFM sites
                <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            {/* 4 — Translator */}
            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7"/><circle cx="19" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.7"/><path d="M7.5 12h9M13.8 7.2l3.8 3.3M10.2 7.2L6.4 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              </div>
              <div className="usecase-name">Translator Sites</div>
              <p className="usecase-desc">A portfolio of locations for translator deployment as part of a focused local strategy or broader metro-wide coverage plan. Fill the gaps. Stop losing listeners to dead zones.</p>
              <div className="usecase-tags"><span className="ptag">Translators</span><span className="ptag">Coverage Extension</span><span className="ptag">Metro</span></div>
              <Link to="/solutions/broadcast-translator-site" className="usecase-link">
                Browse translator sites
                <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            {/* 5 — Backup */}
            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V7l-8-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M8.5 12.5a5 5 0 0 0 7 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="10" r="1.5" fill="currentColor"/></svg>
              </div>
              <div className="usecase-name">Backup Transmission Facilities</div>
              <p className="usecase-desc">Sites for redundancy, continuity, and future expansion when primary sites are unavailable. Backup transmission facilities for stations that understand what primary site failure actually costs.</p>
              <div className="usecase-tags"><span className="ptag">FM Backup</span><span className="ptag">Redundancy</span><span className="ptag">Auxiliary Power</span></div>
              <Link to="/solutions/broadcast-backup-site" className="usecase-link">
                Browse backup sites
                <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            {/* 6 — Auxiliary */}
            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7"/><path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/></svg>
              </div>
              <div className="usecase-name">Auxiliary Broadcast Services</div>
              <p className="usecase-desc">Specialized use cases requiring strategically located rooftop infrastructure with dependable access and support conditions. If it needs a rooftop and an FCC filing, there is probably a node for it.</p>
              <div className="usecase-tags"><span className="ptag">STL</span><span className="ptag">Auxiliary</span><span className="ptag">Studio-Transmitter Link</span></div>
              <Link to="/contact" className="usecase-link">
                Explore auxiliary
                <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ CALLOUT BAND ═══ */}
      <div className="callout-band">
        <div className="container">
          <div className="callout-inner">
            <div>
              <div className="eyebrow eyebrow--light">Metro Coverage</div>
              <h2 className="callout-h2">Your listeners are in the city.<br/><em>Your transmitter should be too.</em></h2>
              <p className="callout-body">Broadcast coverage is a function of elevation, location, and power. Two of those three are determined by where your transmitter lives. Skynode gives broadcast engineers a better starting point — sites evaluated for RF environment and line of sight, not just available rooftop square footage.</p>
              <div className="callout-actions">
                <Link to="/skynodes" className="btn btn-outline-light">Browse Broadcast-Rated Nodes</Link>
                <Link to="/contact" className="btn btn-outline-dark">Talk to Skynode</Link>
              </div>
            </div>
            <div className="metric-stack">
              <div className="metric-item"><span className="metric-lbl">Active markets</span><span className="metric-val">New York · Florida · Illinois · Connecticut</span></div>
              <div className="metric-item"><span className="metric-lbl">Broadcast service types</span><span className="metric-val">FM · TV · LPFM · Translator · Aux</span></div>
              <div className="metric-item"><span className="metric-lbl">Site evaluation criteria</span><span className="metric-val">RF · LOS · Power · Maintainability</span></div>
              <div className="metric-item"><span className="metric-lbl">Permitting management</span><span className="metric-val">Local · State · Federal</span></div>
              <div className="metric-item"><span className="metric-lbl">Rooftop experience</span><span className="metric-val">40+ combined years</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ CONNECTIVITY / METRO FABRIC ═══ */}
      <section className="section-light" id="metro">
        <div className="container">
          <div className="metro-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow--dark">Connectivity &amp; Interconnection</div>
              <h2 className="section-h2">Where applicable, broadcast nodes also support<br/><em>carrier interconnection and Metro Fabric.</em></h2>
              <p className="section-body">Broadcast-rated Skynodes may also support major carrier interconnects, fiber-based transport options, and Skynode Metro Fabric interconnection — enabling backup architecture, STL transport, and path flexibility where single-carrier dependency is a risk.</p>
              <div className="metro-features">
                {[
                  {title:'Fiber interconnection', desc:'Where available, broadcast nodes connect to fiber infrastructure — supporting STL, contribution links, and backup transport paths between facilities.'},
                  {title:'Carrier-adjacent placement', desc:'Select nodes are positioned close to major carrier infrastructure, reducing the cost and complexity of transport circuit provisioning.'},
                  {title:'Metro Fabric connectivity', desc:'Skynode Metro Fabric links connect broadcast nodes to each other and to edge compute infrastructure — enabling coordinated multi-site broadcast architectures.'},
                ].map((f, i) => (
                  <div key={i} className="metro-feature">
                    <div className="metro-feature-icon"><svg viewBox="0 0 18 18" fill="none"><rect x="2" y="6" width="14" height="6" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M6 9h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg></div>
                    <div><div className="metro-feature-title">{f.title}</div><div className="metro-feature-desc">{f.desc}</div></div>
                  </div>
                ))}
              </div>
              <div className="metro-usecases">
                {['FM Primary','FM Backup','TV','LPFM','Translator','STL'].map(t => (
                  <span key={t} className="metro-usecase-tag">{t}</span>
                ))}
              </div>
              <Link to="/metro-fabric" className="btn btn-outline-dark" style={{marginTop:'28px'}}>
                Learn About Metro Fabric
                <svg className="arrow-icon" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
            <div className="metro-anim-wrap reveal">
              <canvas ref={metroRef} id="metroCanvas" width={480} height={560} />
              <div className="metro-anim-legend">
                <div className="metro-legend-item"><span className="metro-legend-dot metro-legend-dot--cloud"/>Cloud uplinks</div>
                <div className="metro-legend-item"><span className="metro-legend-dot metro-legend-dot--fabric"/>Metro Fabric</div>
                <div className="metro-legend-item"><span className="metro-legend-dot metro-legend-dot--private"/>Private downlinks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BROWSE NODES CTA ═══ */}
      <section className="section-dark">
        <div className="container">
          <div className="inquiry-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow--light">Browse Broadcast-Rated Nodes</div>
              <h2 className="section-h2">Tell us what you need.<br/><em>We'll tell you if we have it.</em></h2>
              <p className="section-body--dark" style={{marginBottom:'32px'}}>We will not sell you on a site before we know what you are building. Fill in the basics at the contact page. A real person reviews every inquiry. If we have what you need, we will tell you. If we do not, we will tell you that too.</p>
              <div className="reassurance-list">
                {[
                  {title:'Broadcast-rated means something',   desc:'Sites are evaluated for RF environment, line of sight, power availability, and long-term maintainability — not just available square footage.'},
                  {title:'Compliance managed by Skynode',     desc:'Permits, RF filings, structural assessments, municipal approvals — all handled. You focus on the broadcast, not the paperwork.'},
                  {title:'No hidden gotchas',                 desc:'We will tell you what we know about a site upfront — including the things that might make it wrong for you. Transparency is cheaper than surprises.'},
                  {title:'One business day response',         desc:'Every broadcast inquiry is reviewed by a real person within one business day. Coverage gaps do not get smaller while you wait.'},
                ].map((r, i) => (
                  <div key={i} className="reassurance-item">
                    <div className="reassurance-icon"><svg viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5 7h8M5 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
                    <div><div className="reassurance-title">{r.title}</div><div className="reassurance-desc">{r.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal" style={{display:'flex',flexDirection:'column',gap:'16px',alignSelf:'start',paddingTop:'8px'}}>
              <div style={{background:'var(--bg-card)',border:'1px solid var(--border-accent)',borderRadius:'var(--r-lg)',padding:'24px'}}>
                <div style={{fontSize:'11px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.10em',color:'var(--tx-5)',marginBottom:'14px'}}>What to have ready</div>
                {[
                  'Market / DMA you are targeting',
                  'Service type (FM, TV, LPFM, Translator, Auxiliary)',
                  'Power requirement (ERP / TPO range)',
                  'Whether you need indoor transmitter space',
                  'Timeline for deployment',
                ].map((item, i) => (
                  <div key={i} style={{display:'flex',gap:'10px',alignItems:'flex-start',padding:'9px 0',borderBottom:'1px solid var(--border-dark)',fontSize:'13px',color:'var(--tx-3)'}}>
                    <span style={{color:'var(--sky-blue)',fontWeight:700,flexShrink:0,marginTop:'1px'}}>→</span>{item}
                  </div>
                ))}
                <div style={{borderBottom:'none'}}/>
              </div>
              <Link to="/skynodes" className="btn btn-primary" style={{justifyContent:'center',width:'100%'}}>
                Browse Broadcast-Rated Nodes
                <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link to="/contact" className="btn btn-outline-light" style={{justifyContent:'center',width:'100%'}}>
                Talk to Skynode
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="final-cta" style={{position:'relative'}}>
        <canvas ref={ctaCanvasRef} id="ctaCanvas" aria-hidden="true" />
        <div className="eyebrow eyebrow--light" style={{justifyContent:'center'}}>Ready When You Are</div>
        <h2>Stop searching for the right rooftop.<br/><em>Start evaluating it.</em></h2>
        <p>Tell us your market, service type, and power requirement. We will tell you whether we have a node worth your time.</p>
        <div className="cta-actions">
          <Link to="/skynodes" className="btn btn-primary" style={{padding:'16px 32px',fontSize:'15px'}}>Browse Broadcast-Rated Nodes</Link>
          <Link to="/contact"  className="btn btn-outline-light" style={{padding:'16px 32px',fontSize:'15px'}}>Talk to Skynode</Link>
        </div>
      </section>
    </>
  );
}
