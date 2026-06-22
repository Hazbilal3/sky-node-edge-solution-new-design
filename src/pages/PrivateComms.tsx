import { useRef, useState } from 'react';
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

export default function PrivateComms() {
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const ctaCanvasRef  = useRef<HTMLCanvasElement>(null);
  const hexCanvasRef  = useRef<HTMLCanvasElement>(null);
  const hexTipRef     = useRef<HTMLDivElement>(null);
  const metroRef      = useRef<HTMLCanvasElement>(null);

  const [cityIndex, setCityIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [activeFilter, setActiveFilter] = useState('All');
  const [formSuccess, setFormSuccess] = useState(false);

  useReveal();
  useBeamFieldCanvas(heroCanvasRef, { nodes:HERO_NODES, links:2, spawnEvery:32, spawnJitter:52 });
  useBeamFieldCanvas(ctaCanvasRef,  { nodes:CTA_NODES,  links:2, spawnEvery:48, spawnJitter:68 });
  useHexMapCanvas(hexCanvasRef, hexTipRef, cityIndex, zoom);
  useMetroFabricCanvas(metroRef);

  const CITY_NAMES = CITIES.map(c=>c.name);
  const filters = ['All','P25','5G','P2P','IoT'];

  function handleSubmit(e: React.FormEvent) { e.preventDefault(); setFormSuccess(true); }

  return (
    <>
      <style>{`
        .eyebrow--pc { color: var(--sky-blue); }
        .eyebrow--pc::before { background: var(--sky-blue); }
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
        .node-type { color:var(--sky-blue); }
        .node-dot--on { background:var(--green); }
        .feature-icon { width:40px; height:40px; border-radius:var(--r-sm); background:rgba(64,156,188,0.10); border:1px solid rgba(64,156,188,0.18); display:flex; align-items:center; justify-content:center; color:var(--sky-blue); flex-shrink:0; }
        .feature-item { display:flex; gap:14px; }
        .feature-title { font-size:14px; font-weight:700; color:rgb(var(--fg)); margin-bottom:4px; }
        .feature-desc { font-size:13px; color:var(--tx-4); line-height:1.65; }
        .node-dot { width:8px; height:8px; border-radius:50%; display:inline-block; margin-right:4px; }
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
        .credibility-inner { display:flex; align-items:center; gap:40px; flex-wrap:wrap; }
        .hero { padding-top:100px; min-height:auto; padding-bottom:80px; }
        #heroCanvas { position:absolute; inset:0; width:100%; height:100%; z-index:0; pointer-events:none; }
        .hero-iso-bg { position:absolute; inset:0; pointer-events:none; overflow:hidden; z-index:0; }
        .hero-iso-bg svg { position:absolute; width:100%; height:100%; opacity:0.06; }
        .final-cta { position:relative; padding:120px 28px; text-align:center; overflow:hidden; background:radial-gradient(ellipse 70% 80% at 50% 50%, rgba(32,101,132,0.12) 0%, transparent 70%), linear-gradient(180deg, rgba(var(--bg-base),0.96) 0%, rgba(var(--bg-base),0.92) 100%); }
        .final-cta > * { position:relative; z-index:1; }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="hero" style={{position:'relative',overflow:'hidden'}}>
        <canvas ref={heroCanvasRef} id="heroCanvas" aria-hidden="true" />
        <div className="hero-iso-bg" aria-hidden="true">
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
              <h1>Your network fails at the worst time.<br/>Usually it's the site.<br/><em>Start with a better one.</em></h1>
              <p className="hero-sub">Skynode provides private-communications-rated nodes for teams that need secure, distributed, low-latency metro deployment, from P25 and simulcast to private 5G and point-to-point links. Better infrastructure means fewer redesigns and a network that performs when it matters.</p>
              <div className="hero-actions">
                <a href="#pc-inquiry" className="btn btn-primary">Browse Private Comms Nodes</a>
                <a href="#pc-inquiry" className="btn btn-outline-light">Talk to Skynode</a>
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
                  {filters.map(f=><span key={f} className={`filter-chip${activeFilter===f?' active':''}`} onClick={()=>setActiveFilter(f)}>{f}</span>)}
                </div>
                <div className="node-table">
                  {[
                    {id:'0302.NY',asl:"924'",svcs:['P25','5G']},
                    {id:'0118.CT',asl:"641'",svcs:['P25','P2P']},
                    {id:'0445.FL',asl:"522'",svcs:['P25','IoT']},
                    {id:'0277.IL',asl:"788'",svcs:['5G','P2P']},
                    {id:'0391.IL',asl:"435'",svcs:['IoT']},
                  ].map(node=>(
                    <div key={node.id} className="node-row-item">
                      <div className="node-name-cell">
                        <span className="node-dot node-dot--on"/>
                        <span className="node-site-id">{node.id}</span>
                        <span className="node-asl">| ASL: {node.asl}</span>
                      </div>
                      <div className="node-svc-row">
                        {['P25','5G','P2P','IoT'].map(s=>(
                          <span key={s} className={`svc-btn${node.svcs.includes(s)?' svc-btn--on':''}`}>{s}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hero-card-footer">
                  <div className="hero-card-stat"><div className="hero-card-stat-val">18<span style={{fontSize:'14px',fontWeight:600}}>+</span></div><div className="hero-card-stat-lbl">Active PC-rated nodes</div></div>
                  <div className="hero-card-stat"><div className="hero-card-stat-val">4</div><div className="hero-card-stat-lbl">Technology classes</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility strip */}
      <div className="credibility"><div className="container"><div className="credibility-inner"><span className="cred-label">Organizations that depend on Skynode private communications sites</span></div></div></div>

      {/* ═══ WHY SECTION ═══ */}
      <section className="section-light" id="why">
        <div className="container">
          <div className="why-header-split reveal">
            <div>
              <div className="eyebrow eyebrow--pc">Built for Private Comms</div>
              <h2 className="section-h2">Site quality is<br/><em>operational reliability.</em></h2>
            </div>
            <div style={{paddingTop:'8px'}}>
              <p className="section-body">In private communications, the site is never just the site. It's the foundation of every SLA you've ever written. Elevation determines coverage. Line of sight determines latency. Physical access determines how fast your team can respond when things go wrong at 3am.</p>
              <p className="section-body">Skynode has done the preliminary site identification work for your market. Private communications-rated nodes are evaluated for technical relevance — not just available rooftop space.</p>
            </div>
          </div>

          {/* Hex map */}
          <div className="hex-map-widget reveal">
            <div className="hex-map-topbar">
              <div className="hex-city-tabs">
                {CITY_NAMES.map((name,i)=>(
                  <button key={name} className={`hex-tab${cityIndex===i?' active':''}`} onClick={()=>setCityIndex(i)}>{name}</button>
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
                <button onClick={()=>setZoom(z=>Math.min(z+0.2,2.5))}>+</button>
                <button onClick={()=>setZoom(z=>Math.max(z-0.2,0.5))}>−</button>
              </div>
              <div ref={hexTipRef} className="hex-tip" style={{display:'none'}} />
            </div>
          </div>

          <div className="why-feature-grid" style={{marginTop:'44px'}}>

            <div className="feature-item reveal">
              <div className="feature-icon">
                <svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div><div className="feature-title">RF-aware site selection</div><div className="feature-desc">Nodes evaluated for RF environment, path clearance, and interference, not just available rooftop square footage.</div></div>
            </div>

            <div className="feature-item reveal">
              <div className="feature-icon">
                <svg viewBox="0 0 18 18" fill="none"><path d="M2 9h14M9 2l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div><div className="feature-title">Backhaul that's actually there</div><div className="feature-desc">Fiber and wireless backhaul at the node, plus Metro Fabric links between your sites where carrier circuits don't make sense.</div></div>
            </div>

            <div className="feature-item reveal">
              <div className="feature-icon">
                <svg viewBox="0 0 18 18" fill="none"><path d="M9 2l1.5 3.5H14l-2.8 2 1.1 3.5L9 9.5l-3.3 1.5 1.1-3.5L4 5.5h3.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M9 12v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              </div>
              <div><div className="feature-title">Compliance-first execution</div><div className="feature-desc">Permits, structural assessments, and municipal approvals managed by Skynode across every node in the portfolio.</div></div>
            </div>

            <div className="feature-item reveal">
              <div className="feature-icon">
                <svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div><div className="feature-title">Operators who speak RF</div><div className="feature-desc">We talk path budgets, voted systems, and simulcast timing. You won't be explaining your deployment to a real estate broker.</div></div>
            </div>

            <div className="feature-item reveal">
              <div className="feature-icon">
                <svg viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M6 16h6M9 13v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div><div className="feature-title">Built for every stakeholder</div><div className="feature-desc">IT, RF engineering, operations, and finance each have different needs. We're structured to serve all four without losing the plot.</div></div>
            </div>

            <div className="feature-item reveal">
              <div className="feature-icon">
                <svg viewBox="0 0 18 18" fill="none"><path d="M9 2v4M9 12v4M2 9h4M12 9h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>
              </div>
              <div><div className="feature-title">Distributed by design</div><div className="feature-desc">Repeater, receiver, and link sites across a connected metro footprint, not isolated one-off rooftops. Scale across the city, not just one address.</div></div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ USE CASES ═══ */}
      <section className="section-dark" id="services">
        <div className="container">
          <div className="section-header-center reveal">
            <div className="eyebrow eyebrow--pc">Use Cases</div>
            <h2 className="section-h2 section-h2--dark">Every private network.<br/><em>One infrastructure platform.</em></h2>
            <p style={{fontSize:'15px',color:'var(--tx-3)',lineHeight:'1.7'}}>
              Private-comms-rated Skynodes support public safety radio, private 5G, point-to-point links, sensor networks, simulcast, and office-to-office connectivity, each evaluated for technical relevance in its market.
            </p>
          </div>
          <div className="usecases-grid">

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="3" fill="currentColor"/><path d="M7.5 8.5a6.5 6.5 0 0 0 0 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M16.5 8.5a6.5 6.5 0 0 1 0 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M4.5 5.5a11 11 0 0 0 0 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.45"/><path d="M19.5 5.5a11 11 0 0 1 0 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.45"/></svg>
              </div>
              <div className="usecase-name">Government &amp; Public Safety Radio</div>
              <p className="usecase-desc">Repeater sites, receiver sites, dispatch interconnection, voted systems, and simulcast-supporting architectures, for radio where reliability is not optional.</p>
              <div className="usecase-tags"><span className="ptag">P25</span><span className="ptag">Voted Systems</span><span className="ptag">Simulcast</span></div>
              <a href="#pc-inquiry" className="usecase-link">Browse radio sites <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V7l-8-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M8.5 12.5a5 5 0 0 0 7 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="10" r="1.5" fill="currentColor"/></svg>
              </div>
              <div className="usecase-name">Private 5G</div>
              <p className="usecase-desc">Sites that support controlled, localized wireless coverage with the infrastructure discipline enterprise and industrial use demands. Where you place infrastructure decides whether the network can grow.</p>
              <div className="usecase-tags"><span className="ptag">Private 5G</span><span className="ptag">CBRS</span><span className="ptag">Enterprise</span></div>
              <a href="#pc-inquiry" className="usecase-link">Browse 5G sites <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 19v2M16 19v2M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 11h10M7 14h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/></svg>
              </div>
              <div className="usecase-name">Point-to-Point Data Links</div>
              <p className="usecase-desc">High-capacity links between buildings, edge locations, and critical network assets, especially where lower latency, routing control, or backup path diversity matter.</p>
              <div className="usecase-tags"><span className="ptag">P2P Microwave</span><span className="ptag">Low Latency</span><span className="ptag">Path Diversity</span></div>
              <a href="#pc-inquiry" className="usecase-link">Browse link sites <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="14" r="2.5" fill="currentColor"/><path d="M9 11a4 4 0 0 0 0 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M15 11a4 4 0 0 1 0 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M6.5 8.5a8 8 0 0 0 0 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/><path d="M17.5 8.5a8 8 0 0 1 0 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/></svg>
              </div>
              <div className="usecase-name">Private Sensor Networks</div>
              <p className="usecase-desc">Elevated rooftop collection infrastructure for smart buildings, utilities, logistics, environmental monitoring, and security: LoRaWAN, Wi-SUN, and IoT.</p>
              <div className="usecase-tags"><span className="ptag">LoRaWAN</span><span className="ptag">Wi-SUN</span><span className="ptag">IoT</span></div>
              <a href="#pc-inquiry" className="usecase-link">Browse sensor sites <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7"/><circle cx="19" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.7"/><path d="M7.5 12h9M13.8 7.2l3.8 3.3M10.2 7.2L6.4 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              </div>
              <div className="usecase-name">Two-Way Radio Simulcast</div>
              <p className="usecase-desc">Coordinated radio networks across multiple sites with precise timing, resilient backhaul, and dependable receiver performance.</p>
              <div className="usecase-tags"><span className="ptag">Simulcast</span><span className="ptag">Timing</span><span className="ptag">Backhaul</span></div>
              <a href="#pc-inquiry" className="usecase-link">Browse simulcast sites <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7"/><path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/></svg>
              </div>
              <div className="usecase-name">Office-to-Office Connectivity</div>
              <p className="usecase-desc">Private metropolitan connectivity for enterprises that need control, lower latency, and less reliance on public internet paths.</p>
              <div className="usecase-tags"><span className="ptag">Metro Links</span><span className="ptag">Enterprise</span><span className="ptag">Private</span></div>
              <a href="#pc-inquiry" className="usecase-link">Explore connectivity <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ CALLOUT BAND ═══ */}
      <div className="callout-band">
        <div className="container">
          <div className="callout-inner">
            <div>
              <div className="eyebrow eyebrow--light">Network Reliability</div>
              <h2 className="callout-h2">The site is never<br/>just the site.<br/><em>It's your SLA.</em></h2>
              <p className="callout-body">In private communications, site quality determines operational reliability. Elevation determines coverage. Line of sight determines latency. Physical access determines incident response time. Skynode gives private communications engineers a better starting point.</p>
              <div className="callout-actions">
                <a href="#pc-inquiry" className="btn btn-outline-light">Talk to an Engineer</a>
              </div>
            </div>
            <div className="metric-stack">
              <div className="metric-item"><span className="metric-lbl">Active markets</span><span className="metric-val">NYC · CHI · MIA · CT</span></div>
              <div className="metric-item"><span className="metric-lbl">Technology classes</span><span className="metric-val">P25 · 5G · P2P · IoT · MANET</span></div>
              <div className="metric-item"><span className="metric-lbl">Site evaluation criteria</span><span className="metric-val">Coverage · LOS · Access · Reliability</span></div>
              <div className="metric-item"><span className="metric-lbl">Backhaul options</span><span className="metric-val">Fiber · Wireless · Hybrid</span></div>
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
              <h2 className="section-h2">Carrier-neutral backhaul.<br/><em>Metro-wide coverage.</em></h2>
              <p className="section-body">Metro Fabric provides the private communications backhaul mesh that connects your nodes without a carrier dependency. Multiple simultaneous paths, automatic failover, and dedicated capacity that scales with your deployment — not with what a carrier will sell you this quarter.</p>
              <div className="metro-features">
                {[
                  {title:'Multi-path redundancy',desc:'No single point of failure. Metro Fabric routes across simultaneous links — when one degrades, traffic reroutes automatically.'},
                  {title:'Dedicated spectrum, no shared congestion',desc:'Unlike carrier circuits, Skynode links are dedicated to your deployment. No overselling, no throttling, no peak-hour degradation.'},
                  {title:'North-south and east-west coverage',desc:'Metro Fabric extends across the urban grid in both axes — giving your private communications network the geographic reach it needs.'},
                ].map((f,i)=>(
                  <div key={i} className="metro-feature">
                    <div className="metro-feature-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M9 2l5.5 2.3v4.9C14.5 13 12 15.8 9 17c-3-1.2-5.5-4-5.5-7.8V4.3L9 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg></div>
                    <div><div className="metro-feature-title">{f.title}</div><div className="metro-feature-desc">{f.desc}</div></div>
                  </div>
                ))}
              </div>
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

      {/* ═══ LEAD CAPTURE ═══ */}
      <section className="section-dark" id="pc-inquiry">
        <div className="container">
          <div className="inquiry-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow--light">Start Your Network Build</div>
              <h2 className="section-h2">Tell us what you're building.<br/><em>We'll tell you if we can help.</em></h2>
              <p className="section-body--dark" style={{marginBottom:'32px'}}>Private communications deployments are operationally critical. We treat them that way. Fill in the basics and a real person — not a sales bot — will review your inquiry within one business day.</p>
              <div className="reassurance-list">
                {[
                  {title:'Mission-critical site evaluation',desc:'Sites are assessed for coverage geometry, line of sight, physical access, and long-term operational reliability — not just availability.'},
                  {title:'Carrier-neutral infrastructure',desc:'No single upstream dependency. Multiple backhaul options per node give your deployment the resilience it needs.'},
                  {title:'Compliance and permitting',desc:'Local, state, and federal permitting managed by Skynode. FCC filings, municipal approvals, structural — all coordinated end-to-end.'},
                  {title:'One business day response',desc:'Every private communications inquiry is reviewed within one business day. Because network downtime doesn\'t wait.'},
                ].map((r,i)=>(
                  <div key={i} className="reassurance-item">
                    <div className="reassurance-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M9 2l5.5 2.3v4.9C14.5 13 12 15.8 9 17c-3-1.2-5.5-4-5.5-7.8V4.3L9 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg></div>
                    <div><div className="reassurance-title">{r.title}</div><div className="reassurance-desc">{r.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="inquiry-form reveal">
              <div className="form-title">Find a private comms site</div>
              <div className="form-sub">Takes 2 minutes. We follow up within one business day.</div>
              {formSuccess ? (
                <div className="form-success show">
                  <div className="form-success-icon">📡</div>
                  <div className="form-success-title">Got it.</div>
                  <div className="form-success-body">A real person will review your inquiry within one business day.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-2col">
                    <div className="form-group"><label className="form-label">Full Name *</label><input className="form-input" type="text" placeholder="Your name" required /></div>
                    <div className="form-group"><label className="form-label">Organization *</label><input className="form-input" type="text" placeholder="Agency or org" required /></div>
                  </div>
                  <div className="form-2col">
                    <div className="form-group"><label className="form-label">Work Email *</label><input className="form-input" type="email" placeholder="you@org.gov" required /></div>
                    <div className="form-group"><label className="form-label">Phone</label><input className="form-input" type="tel" placeholder="Optional" /></div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Technology Type *</label>
                    <select className="form-input" required><option value="">Select type</option><option>P25 Conventional</option><option>P25 Trunked</option><option>P25 Simulcast</option><option>Private 5G / CBRS</option><option>P2P Microwave</option><option>IoT / Sensing</option><option>MANET / Tactical</option><option>LMR Migration</option><option>Other / Not Sure</option></select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Market *</label>
                    <select className="form-input" required><option value="">Select market</option><option>New York</option><option>Miami</option><option>Chicago</option><option>Connecticut</option><option>Other</option></select>
                  </div>
                  <div className="form-group"><label className="form-label">Project Details</label><textarea className="form-input" placeholder="Coverage requirements, number of sites, timeline, existing infrastructure…"/></div>
                  <button className="btn btn-primary form-submit" type="submit">Submit Inquiry</button>
                  <div className="form-privacy">Your info is used only to evaluate network fit. No spam.</div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="final-cta" style={{position:'relative'}}>
        <canvas ref={ctaCanvasRef} id="ctaCanvas" aria-hidden="true" />
        <div className="eyebrow" style={{justifyContent:'center'}}>Ready When You Are</div>
        <h2>Build a network that holds<br/>when it matters.<br/><em>Start with the site.</em></h2>
        <p>Tell us your technology type, market, and coverage requirements. We'll tell you whether we have a node that's worth your time.</p>
        <div className="cta-actions">
          <a href="#pc-inquiry" className="btn btn-primary" style={{padding:'16px 32px',fontSize:'15px'}}>Find a Private Comms Site</a>
          <a href="#pc-inquiry" className="btn btn-outline-light" style={{padding:'16px 32px',fontSize:'15px'}}>Talk to an Engineer</a>
        </div>
      </section>
    </>
  );
}
