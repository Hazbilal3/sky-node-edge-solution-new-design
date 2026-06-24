import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { useBeamFieldCanvas } from '../hooks/useBeamFieldCanvas';
import { useHexMapCanvas, CITIES } from '../hooks/useHexMapCanvas';
import { useMetroFabricCanvas } from '../hooks/useMetroFabricCanvas';

const HERO_NODES = [
  {rx:0.08,ry:0.18},{rx:0.27,ry:0.11},{rx:0.46,ry:0.20},{rx:0.66,ry:0.12},{rx:0.88,ry:0.22},
  {rx:0.16,ry:0.44},{rx:0.37,ry:0.38},{rx:0.58,ry:0.46},{rx:0.80,ry:0.40},{rx:0.95,ry:0.55},
  {rx:0.10,ry:0.70},{rx:0.31,ry:0.80},{rx:0.52,ry:0.70},{rx:0.72,ry:0.80},{rx:0.90,ry:0.72},
];
const CTA_NODES = [
  {rx:0.08,ry:0.22},{rx:0.26,ry:0.14},{rx:0.44,ry:0.24},{rx:0.62,ry:0.13},{rx:0.82,ry:0.20},{rx:0.93,ry:0.40},
  {rx:0.14,ry:0.50},{rx:0.88,ry:0.62},
  {rx:0.10,ry:0.78},{rx:0.30,ry:0.86},{rx:0.50,ry:0.74},{rx:0.70,ry:0.85},{rx:0.90,ry:0.80},
];

const STAKEHOLDERS = [
  {
    role: 'IT Leaders / CTOs',
    desc: 'Supports control, segmentation, security, and growth. Infrastructure that scales with the network rather than constraining it.',
    icon: <svg viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M6 16h6M9 13v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  },
  {
    role: 'Radio Engineers / RF Teams',
    desc: 'Locations with stronger potential for deployment, interconnection, and long-term maintainability. Sites evaluated by people who speak RF path and backhaul.',
    icon: <svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M6.5 7.5a3.5 3.5 0 0 0 0 5M11.5 7.5a3.5 3.5 0 0 1 0 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M4 5a6 6 0 0 0 0 10M14 5a6 6 0 0 1 0 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/></svg>,
  },
  {
    role: 'Operations Stakeholders',
    desc: 'Access coordination, building operations, and equipment placement managed by Skynode. Fewer surprises on the day of install and throughout the site relationship.',
    icon: <svg viewBox="0 0 18 18" fill="none"><path d="M9 2v4M9 12v4M2 9h4M12 9h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>,
  },
  {
    role: 'Financial Stakeholders',
    desc: 'Reduces redesign cycles, shortens timelines, and creates a stronger base for network expansion. Better infrastructure decisions made earlier cost less over the project lifecycle.',
    icon: <svg viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M5 9h8M5 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  },
];

export default function PrivateComms() {
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const ctaCanvasRef  = useRef<HTMLCanvasElement>(null);
  const hexCanvasRef  = useRef<HTMLCanvasElement>(null);
  const hexTipRef     = useRef<HTMLDivElement>(null);
  const metroRef      = useRef<HTMLCanvasElement>(null);

  const [cityIndex, setCityIndex] = useState(0);
  const [zoom, setZoom]           = useState(1);
  const [activeFilter, setActiveFilter] = useState('All');

  useReveal();
  useBeamFieldCanvas(heroCanvasRef, { nodes:HERO_NODES, links:2, spawnEvery:32, spawnJitter:52 });
  useBeamFieldCanvas(ctaCanvasRef,  { nodes:CTA_NODES,  links:2, spawnEvery:48, spawnJitter:68 });
  useHexMapCanvas(hexCanvasRef, hexTipRef, cityIndex, zoom);
  useMetroFabricCanvas(metroRef);

  const CITY_NAMES = CITIES.map(c => c.name);
  const filters = ['All', 'P25', '5G', 'P2P', 'IoT'];

  return (
    <>
      <style>{`
        .eyebrow--pc { color:var(--sky-blue); }
        .eyebrow--pc::before { background:var(--sky-blue); }
        .filter-chip { border:1px solid rgba(64,156,188,0.35); color:var(--sky-blue); background:rgba(64,156,188,0.10); }
        .filter-chip.active, .filter-chip:hover { background:rgba(64,156,188,0.22); border-color:var(--sky-blue); }
        .svc-btn--on { background:rgba(64,156,188,0.15); color:var(--sky-blue); border:1px solid rgba(64,156,188,0.38); }
        .hero-visual-header { background:linear-gradient(90deg,rgba(64,156,188,0.20) 0%,transparent 100%); }
        .hero-card-footer { background:rgba(64,156,188,0.07); border-top:1px solid rgba(64,156,188,0.20); }
        .hero-card-stat-val { color:var(--sky-blue); }
        .usecase-card::after { background:linear-gradient(90deg,#1A5570,#409CBC); }
        .usecase-card:hover { border-color:rgba(64,156,188,0.45); box-shadow:0 12px 40px rgba(32,101,132,0.20); }
        .usecase-icon { background:rgba(64,156,188,0.14); color:var(--sky-blue); }
        .ptag { background:rgba(64,156,188,0.10); border:1px solid rgba(64,156,188,0.30); color:var(--sky-blue); }
        .usecase-link { color:var(--sky-blue); }
        .section-h2 em { color:var(--sky-blue); }
        .feature-icon { width:40px; height:40px; border-radius:var(--r-sm); background:rgba(64,156,188,0.10); border:1px solid rgba(64,156,188,0.18); display:flex; align-items:center; justify-content:center; color:var(--sky-blue); flex-shrink:0; }
        .feature-icon svg { width:18px; height:18px; }
        .feature-item { display:flex; gap:14px; }
        .feature-title { font-size:14px; font-weight:700; color:rgb(var(--fg)); margin-bottom:4px; }
        .feature-desc { font-size:13px; color:var(--tx-4); line-height:1.65; }
        .node-dot { width:8px; height:8px; border-radius:50%; display:inline-block; margin-right:4px; }
        .node-dot--on  { background:var(--green); }
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
        .hero { padding-top:100px; min-height:auto; padding-bottom:80px; }
        #heroCanvas { position:absolute; inset:0; width:100%; height:100%; z-index:0; pointer-events:none; }
        .hero-iso-bg { position:absolute; inset:0; pointer-events:none; overflow:hidden; z-index:0; }
        .hero-iso-bg svg { position:absolute; width:100%; height:100%; opacity:0.06; }
        .final-cta { position:relative; padding:120px 28px; text-align:center; overflow:hidden; background:radial-gradient(ellipse 70% 80% at 50% 50%, rgba(32,101,132,0.12) 0%, transparent 70%), linear-gradient(180deg,rgba(var(--bg-base),0.96) 0%,rgba(var(--bg-base),0.92) 100%); }
        .final-cta > * { position:relative; z-index:1; }
        .final-cta em { font-style:normal; color:var(--sky-blue); }
        .stakeholder-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:20px; }
        .stakeholder-card { background:rgba(64,156,188,0.05); border:1px solid var(--border-dark); border-radius:var(--r-md); padding:16px; }
        .stakeholder-role { font-size:12px; font-weight:700; color:rgb(var(--fg)); margin-bottom:5px; display:flex; align-items:center; gap:7px; }
        .stakeholder-role svg { color:var(--sky-blue); flex-shrink:0; }
        .stakeholder-desc { font-size:12px; color:var(--tx-4); line-height:1.6; }
        @media (max-width:768px) { .stakeholder-grid { grid-template-columns:1fr; } }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="hero" style={{position:'relative',overflow:'hidden'}}>
        <canvas ref={heroCanvasRef} id="heroCanvas" aria-hidden="true" />
        <div className="hero-iso-bg" aria-hidden="true">
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
        <div className="hero-scrim" />
        <div className="container" style={{position:'relative',zIndex:2}}>
          <div className="hero-inner">
            <div>
              <div className="city-tags">
                <span className="city-tag">Connecticut</span>
                <span className="city-tag">Florida</span>
                <span className="city-tag">Illinois</span>
                <span className="city-tag">New York</span>
              </div>
              <div className="eyebrow eyebrow--pc">Private Communications</div>
              <h1>Deploy private communications networks<br/>on <em>better urban infrastructure.</em></h1>
              <p className="hero-sub">A better infrastructure layer for secure, distributed, and low-latency communications systems — from P25 and simulcast radio to private 5G and point-to-point data links.</p>
              <div className="hero-actions">
                <Link to="/skynodes" className="btn btn-primary">Browse Private Comms Nodes</Link>
                <Link to="/contact"  className="btn btn-outline-light">Talk to Skynode</Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-visual-card">
                <div className="hero-visual-header">
                  <span className="visual-title">Private-Comms-Rated Skynodes</span>
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
                    {id:'0302.NY', asl:"924'", svcs:['P25','5G']},
                    {id:'0118.CT', asl:"641'", svcs:['P25','IoT']},
                    {id:'0445.FL', asl:"522'", svcs:['P25','P2P','IoT']},
                    {id:'0277.IL', asl:"788'", svcs:['5G','IoT']},
                    {id:'0391.IL', asl:"435'", svcs:['5G','P2P']},
                  ].map(node => (
                    <div key={node.id} className="node-row-item">
                      <div className="node-name-cell">
                        <span className="node-dot node-dot--on"/>
                        <span className="node-site-id">{node.id}</span>
                        <span className="node-asl">| ASL: {node.asl}</span>
                      </div>
                      <div className="node-svc-row">
                        {['P25','5G','P2P','IoT'].map(s => (
                          <span key={s} className={`svc-btn${node.svcs.includes(s) ? ' svc-btn--on' : ''}`}>{s}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hero-card-footer">
                  <div className="hero-card-stat"><div className="hero-card-stat-val">TBC</div><div className="hero-card-stat-lbl">Private-comms nodes</div></div>
                  <div className="hero-card-stat"><div className="hero-card-stat-val">6</div><div className="hero-card-stat-lbl">Service categories supported</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY SECTION ═══ */}
      <section className="section-light" id="why">
        <div className="container">
          <div className="why-header-split reveal">
            <div>
              <div className="eyebrow eyebrow--dark">Infrastructure Determines Network Quality</div>
              <h2 className="section-h2">Infrastructure quality<br/><em>is network quality.</em></h2>
            </div>
            <div style={{paddingTop:'8px'}}>
              <p className="section-body">Location quality shapes everything downstream: coverage, RF path design, backhaul options, site access, maintainability, redundancy, and room to expand. The site decision gets made once and lived with for years.</p>
              <p className="section-body">Strong infrastructure reduces friction. Weak infrastructure creates it — in redesign cycles, failed surveys, and the landlord who does not understand antenna mounts. Skynode nodes are evaluated for technical relevance, so you start with viable candidates, not a blank map and a phone book.</p>
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
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#409CBC'}}/> P25</span>
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#6BC0DD'}}/> 5G</span>
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#5BE49B'}}/> P2P</span>
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#F59E0B'}}/> IoT</span>
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

          {/* Features */}
          <div className="why-feature-grid" style={{marginTop:'44px'}}>
            <div className="feature-item reveal">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
              <div>
                <div className="feature-title">RF-aware site selection</div>
                <div className="feature-desc">Nodes evaluated for RF environment, path clearance, and interference — not just available rooftop square footage.</div>
              </div>
            </div>
            <div className="feature-item reveal">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M2 9h14M9 2l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              <div>
                <div className="feature-title">Backhaul that's actually there</div>
                <div className="feature-desc">Fiber and wireless backhaul at the node, plus Metro Fabric links between your sites where carrier circuits do not make sense.</div>
              </div>
            </div>
            <div className="feature-item reveal">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M9 2l1.5 3.5H14l-2.8 2 1.1 3.5L9 9.5l-3.3 1.5 1.1-3.5L4 5.5h3.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M9 12v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></div>
              <div>
                <div className="feature-title">Compliance-first execution</div>
                <div className="feature-desc">Permits, structural assessments, and municipal approvals managed by Skynode across every node in the portfolio.</div>
              </div>
            </div>
            <div className="feature-item reveal">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
              <div>
                <div className="feature-title">Operators who speak RF</div>
                <div className="feature-desc">We talk path budgets, voted systems, and simulcast timing. You will not be explaining your deployment to a real estate broker.</div>
              </div>
            </div>
            <div className="feature-item reveal">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M6 16h6M9 13v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
              <div>
                <div className="feature-title">Built for every stakeholder</div>
                <div className="feature-desc">IT, RF engineering, operations, and finance each have different needs. Skynode is structured to serve all four without losing the plot.</div>
              </div>
            </div>
            <div className="feature-item reveal">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M9 2v4M9 12v4M2 9h4M12 9h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5"/></svg></div>
              <div>
                <div className="feature-title">Distributed by design</div>
                <div className="feature-desc">Repeater, receiver, and link sites across a connected metro footprint — not isolated one-off rooftops. Scale across the city, not just one address.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ USE CASES ═══ */}
      <section className="section-dark" id="services">
        <div className="container">
          <div className="section-header-center reveal">
            <div className="eyebrow eyebrow--pc">Use Cases</div>
            <h2 className="section-h2">Every private network.<br/><em>One infrastructure platform.</em></h2>
            <p style={{fontSize:'15px',color:'var(--tx-3)',lineHeight:'1.7'}}>Private-comms-rated Skynodes support public safety radio, private 5G, point-to-point links, sensor networks, simulcast, and office-to-office connectivity — each evaluated for technical relevance in its market.</p>
          </div>
          <div className="usecases-grid">

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="3" fill="currentColor"/><path d="M7.5 8.5a6.5 6.5 0 0 0 0 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M16.5 8.5a6.5 6.5 0 0 1 0 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M4.5 5.5a11 11 0 0 0 0 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.45"/><path d="M19.5 5.5a11 11 0 0 1 0 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.45"/></svg>
              </div>
              <div className="usecase-name">Government &amp; Public Safety Radio</div>
              <p className="usecase-desc">Locations for repeater sites, receiver sites, dispatch interconnection, voted systems, simulcast-supporting architectures, and other radio deployments where reliability is not optional.</p>
              <div className="usecase-tags"><span className="ptag">P25</span><span className="ptag">Voted Systems</span><span className="ptag">Simulcast</span></div>
              <Link to="/solutions/two-way-radio-transmitter" className="usecase-link">
                Browse radio sites
                <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V7l-8-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M8.5 12.5a5 5 0 0 0 7 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="10" r="1.5" fill="currentColor"/></svg>
              </div>
              <div className="usecase-name">Private 5G</div>
              <p className="usecase-desc">Sites that support controlled, localized wireless coverage with the infrastructure discipline enterprise and industrial use demands. Successful private 5G depends on where infrastructure can be placed, how sites interconnect, and whether the network can expand.</p>
              <div className="usecase-tags"><span className="ptag">Private 5G</span><span className="ptag">CBRS</span><span className="ptag">Enterprise</span></div>
              <Link to="/contact" className="usecase-link">
                Browse 5G sites
                <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 19v2M16 19v2M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 11h10M7 14h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/></svg>
              </div>
              <div className="usecase-name">Point-to-Point Data Links</div>
              <p className="usecase-desc">High-capacity links between buildings, edge locations, operational facilities, and critical network assets — especially where lower latency, routing control, or backup path diversity matter.</p>
              <div className="usecase-tags"><span className="ptag">P2P Microwave</span><span className="ptag">Low Latency</span><span className="ptag">Path Diversity</span></div>
              <Link to="/contact" className="usecase-link">
                Browse link sites
                <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="14" r="2.5" fill="currentColor"/><path d="M9 11a4 4 0 0 0 0 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M15 11a4 4 0 0 1 0 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M6.5 8.5a8 8 0 0 0 0 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/><path d="M17.5 8.5a8 8 0 0 1 0 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/></svg>
              </div>
              <div className="usecase-name">Private Sensor Networks</div>
              <p className="usecase-desc">Elevated rooftop collection infrastructure for smart buildings, utilities, logistics, environmental monitoring, and security systems — LoRaWAN, Wi-SUN, and IoT gateway deployments.</p>
              <div className="usecase-tags"><span className="ptag">LoRaWAN</span><span className="ptag">Wi-SUN</span><span className="ptag">IoT</span></div>
              <Link to="/contact" className="usecase-link">
                Browse sensor sites
                <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7"/><circle cx="19" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.7"/><path d="M7.5 12h9M13.8 7.2l3.8 3.3M10.2 7.2L6.4 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              </div>
              <div className="usecase-name">Two-Way Radio Simulcast Networks</div>
              <p className="usecase-desc">Coordinated radio networks across multiple sites with precise timing, resilient backhaul, and dependable receiver performance. See also: individual solution pages for transmitter sites, receiver sites, and simulcast networks.</p>
              <div className="usecase-tags"><span className="ptag">Simulcast</span><span className="ptag">Timing</span><span className="ptag">Backhaul</span></div>
              <Link to="/solutions/simulcast-radio" className="usecase-link">
                Browse simulcast sites
                <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7"/><path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/></svg>
              </div>
              <div className="usecase-name">Office-to-Office Private Connectivity</div>
              <p className="usecase-desc">Private metropolitan communications for enterprises that need control, lower latency, and less reliance on public internet paths between owned or leased facilities across the metro.</p>
              <div className="usecase-tags"><span className="ptag">Metro Links</span><span className="ptag">Enterprise</span><span className="ptag">Private</span></div>
              <Link to="/solutions/office-to-office" className="usecase-link">
                Explore connectivity
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
              <div className="eyebrow eyebrow--light">Why Teams Use Skynode</div>
              <h2 className="callout-h2">Your network lives in the city.<br/><em>Put it on better ground.</em></h2>
              <p className="callout-body">Coverage, path design, and redundancy are all functions of where your infrastructure sits. Skynode gives network and RF teams a better starting point — sites evaluated for RF environment, backhaul, and line of sight, not just available rooftop square footage. Because a cheap roof on the wrong building is still the wrong building.</p>
              <div className="callout-actions">
                <Link to="/skynodes" className="btn btn-outline-light">Browse Private Comms Nodes</Link>
                <Link to="/contact"  className="btn btn-outline-dark">Talk to Skynode</Link>
              </div>
            </div>
            <div className="metric-stack">
              <div className="metric-item"><span className="metric-lbl">Active markets</span><span className="metric-val">New York · Florida · Illinois · Connecticut</span></div>
              <div className="metric-item"><span className="metric-lbl">Service types</span><span className="metric-val">P25 · Private 5G · P2P · IoT · Simulcast</span></div>
              <div className="metric-item"><span className="metric-lbl">Site evaluation criteria</span><span className="metric-val">RF · Backhaul · LOS · Maintainability</span></div>
              <div className="metric-item"><span className="metric-lbl">Permitting management</span><span className="metric-val">Local · State · Federal</span></div>
              <div className="metric-item"><span className="metric-lbl">Rooftop experience</span><span className="metric-val">40+ combined years</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ METRO FABRIC ═══ */}
      <section className="section-light" id="metro">
        <div className="container">
          <div className="metro-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow--pc">Metro Fabric</div>
              <h2 className="section-h2">A single site solves a coverage problem.<br/><em>A connected portfolio solves a network problem.</em></h2>
              <p className="section-body">The Skynode Metro Fabric connects multiple nodes through available fiber, private backhaul, and high-capacity interconnection — enabling coordinated infrastructure across the metro. For private communications teams, this means your repeater, receiver, and link sites can operate as a unified distributed network, not isolated rooftops.</p>
              <div className="metro-features">
                {[
                  {title:'Latency: direct path, faster medium',       desc:'Skynode links go point-to-point — shorter distance, and wireless propagates faster than optical fiber does. Both advantages compound. The result shows up in your measurements, not just our marketing.'},
                  {title:'Uptime: multiple paths, automatic failover', desc:'Single-path networks have a single point of failure. Metro Fabric routes across simultaneous links — when one degrades, traffic reroutes automatically. SLA-backed uptime with contractual teeth.'},
                  {title:'Bandwidth: dedicated capacity, no shared lanes', desc:'Leased carrier circuits get oversold, throttled at peak, and repriced at renewal. Skynode links are dedicated to your deployment. No shared congestion.'},
                  {title:'Connectivity: north-south and east-west',   desc:'Getting between your own sites across the metro — without the latency penalty and cost of a carrier circuit — is where Metro Fabric earns its place. Extends to private locations where fiber is not practical.'},
                ].map((f, i) => (
                  <div key={i} className="metro-feature">
                    <div className="metro-feature-icon"><svg viewBox="0 0 18 18" fill="none"><rect x="2" y="6" width="14" height="6" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M6 9h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg></div>
                    <div><div className="metro-feature-title">{f.title}</div><div className="metro-feature-desc">{f.desc}</div></div>
                  </div>
                ))}
              </div>
              <div className="metro-usecases">
                {['P25','Private 5G','P2P Links','Simulcast','Sensor Networks'].map(t => (
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

      {/* ═══ STAKEHOLDER MAPPING + CTA ═══ */}
      <section className="section-dark">
        <div className="container">
          <div className="inquiry-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow--light">Why Teams Choose Skynode</div>
              <h2 className="section-h2">Built to serve every stakeholder<br/><em>on the buying team.</em></h2>
              <p className="section-body--dark" style={{marginBottom:'28px'}}>Private network deployments rarely have a single decision-maker. Skynode is structured to address the concerns of every stakeholder involved — from the RF engineer evaluating path options to the CFO evaluating project risk.</p>
              <div className="reassurance-list">
                {[
                  {title:'Private-comms-rated means something',    desc:'Sites are evaluated for RF environment, backhaul, power availability, and long-term maintainability — not just available square footage.'},
                  {title:'Compliance managed by Skynode',          desc:'Permits, RF filings, structural assessments, municipal approvals — all handled. You focus on the network, not the paperwork.'},
                  {title:'Real sites in real markets',             desc:'New York. Florida. Illinois. Connecticut. Not concept art. Not renderings. Rooftops Skynode operates.'},
                  {title:'One business day response',              desc:'Every inquiry is reviewed by a real person within one business day. Coverage gaps do not get smaller while you wait.'},
                ].map((r, i) => (
                  <div key={i} className="reassurance-item">
                    <div className="reassurance-icon"><svg viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5 7h8M5 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
                    <div><div className="reassurance-title">{r.title}</div><div className="reassurance-desc">{r.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal" style={{display:'flex',flexDirection:'column',gap:'16px',alignSelf:'start',paddingTop:'8px'}}>
              <div className="stakeholder-grid">
                {STAKEHOLDERS.map((s, i) => (
                  <div key={i} className="stakeholder-card">
                    <div className="stakeholder-role">
                      <svg viewBox="0 0 18 18" fill="none" width="14" height="14">{s.icon.props.children}</svg>
                      {s.role}
                    </div>
                    <div className="stakeholder-desc">{s.desc}</div>
                  </div>
                ))}
              </div>
              <Link to="/skynodes" className="btn btn-primary" style={{justifyContent:'center',width:'100%'}}>
                Browse Private Comms Nodes
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
        <h2>Stop fighting your infrastructure.<br/><em>Start deploying on better.</em></h2>
        <p>Tell us your market, use case, and number of sites. We will tell you whether we have nodes worth your time.</p>
        <div className="cta-actions">
          <Link to="/skynodes" className="btn btn-primary"      style={{padding:'16px 32px',fontSize:'15px'}}>Browse Private Comms Nodes</Link>
          <Link to="/contact"  className="btn btn-outline-light" style={{padding:'16px 32px',fontSize:'15px'}}>Talk to Skynode</Link>
        </div>
      </section>
    </>
  );
}
