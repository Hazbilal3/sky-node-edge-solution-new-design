import { useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useDroneSwarmCanvas } from '../hooks/useDroneSwarmCanvas';
import { useHexMapCanvas, CITIES } from '../hooks/useHexMapCanvas';
import { useMetroFabricCanvas } from '../hooks/useMetroFabricCanvas';

export default function Experimental() {
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
  useDroneSwarmCanvas(heroCanvasRef, {
    links: 2, count: 16, speed: 1.15,
    nodes: [
      {rx:0.08, ry:0.18}, {rx:0.27, ry:0.11}, {rx:0.46, ry:0.20}, {rx:0.66, ry:0.12}, {rx:0.88, ry:0.22},
      {rx:0.16, ry:0.44}, {rx:0.37, ry:0.38}, {rx:0.58, ry:0.46}, {rx:0.80, ry:0.40}, {rx:0.95, ry:0.55},
      {rx:0.10, ry:0.70}, {rx:0.31, ry:0.80}, {rx:0.52, ry:0.70}, {rx:0.72, ry:0.80}, {rx:0.90, ry:0.72}
    ]
  });
  useDroneSwarmCanvas(ctaCanvasRef, {
    links: 2, count: 9, speed: 0.9,
    nodes: [
      {rx:0.08, ry:0.22}, {rx:0.26, ry:0.14}, {rx:0.44, ry:0.24}, {rx:0.62, ry:0.13}, {rx:0.82, ry:0.20}, {rx:0.93, ry:0.40},
      {rx:0.14, ry:0.50}, {rx:0.88, ry:0.62},
      {rx:0.10, ry:0.78}, {rx:0.30, ry:0.86}, {rx:0.50, ry:0.74}, {rx:0.70, ry:0.85}, {rx:0.90, ry:0.80}
    ]
  });
  useHexMapCanvas(hexCanvasRef, hexTipRef, cityIndex, zoom);
  useMetroFabricCanvas(metroRef);

  const CITY_NAMES = CITIES.map(c=>c.name);
  const filters = ['All','UAS','Sensing','AR','Smart City'];

  function handleSubmit(e: React.FormEvent) { e.preventDefault(); setFormSuccess(true); }

  return (
    <>
      <style>{`
        :root[data-theme="dark"]  { --sky-blue: #FBBF24; }
        :root[data-theme="light"] { --sky-blue: #B45309; }
        .hero-iso-bg { position:absolute; inset:0; pointer-events:none; overflow:hidden; z-index:0; }
        .hero-iso-bg svg { position:absolute; width:100%; height:100%; opacity:0.06; }
        .eyebrow--pc { color:var(--sky-blue); }
        .eyebrow--pc::before { background:var(--sky-blue); }
        .filter-chip { border:1px solid rgba(245,158,11,0.35); color:var(--sky-blue); background:rgba(245,158,11,0.10); }
        .filter-chip.active, .filter-chip:hover { background:rgba(245,158,11,0.22); border-color:var(--sky-blue); }
        .svc-btn--on { background:rgba(245,158,11,0.15); color:var(--sky-blue); border:1px solid rgba(245,158,11,0.38); }
        .hero-visual-header { background:linear-gradient(90deg,rgba(245,158,11,0.20) 0%,transparent 100%); }
        .hero-card-footer { background:rgba(245,158,11,0.07); border-top:1px solid rgba(245,158,11,0.20); }
        .hero-card-stat-val { color:var(--sky-blue); }
        .usecase-card::after { background:linear-gradient(90deg,#B45309,#FBBF24); }
        .usecase-card:hover { border-color:rgba(245,158,11,0.45); box-shadow:0 12px 40px rgba(245,158,11,0.20); }
        .usecase-icon { background:rgba(245,158,11,0.14); color:var(--sky-blue); }
        .ptag { background:rgba(245,158,11,0.10); border:1px solid rgba(245,158,11,0.30); color:var(--sky-blue); }
        .usecase-link { color:var(--sky-blue); }
        .hex-map-topbar { background:linear-gradient(90deg,#206584,#7A4A06); }
        .section-h2 em { color:var(--sky-blue); }
        .node-type { color:var(--sky-blue); }
        .node-dot--on { background:var(--green); }
        .feature-icon { width:40px; height:40px; border-radius:var(--r-sm); background:rgba(245,158,11,0.10); border:1px solid rgba(245,158,11,0.18); display:flex; align-items:center; justify-content:center; color:var(--sky-blue); flex-shrink:0; }
        .feature-icon svg { width:18px; height:18px; }
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
        .hero { padding-top:68px; min-height:100vh; display:flex; align-items:center; background: radial-gradient(ellipse 50% 60% at 72% 42%,rgba(32,101,132,0.20) 0%,transparent 65%), radial-gradient(ellipse 55% 45% at 15% 60%,rgba(var(--bg-base),0.70) 0%,transparent 70%), radial-gradient(ellipse 35% 30% at 85% 78%,rgba(180,83,9,0.10) 0%,transparent 55%), linear-gradient(100deg,rgba(var(--bg-base),0.88) 0%,rgba(var(--bg-base),0.55) 55%,rgba(var(--bg-base),0.30) 100%); }
        #heroCanvas { position:absolute; inset:0; width:100%; height:100%; z-index:0; pointer-events:none; }
        .final-cta { position:relative; padding:120px 28px; text-align:center; overflow:hidden; background:radial-gradient(ellipse 70% 80% at 50% 50%, rgba(180,83,9,0.10) 0%, transparent 70%), linear-gradient(180deg,rgba(var(--bg-base),0.96) 0%,rgba(var(--bg-base),0.92) 100%); }
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
                <span className="city-tag">Connecticut</span><span className="city-tag">Florida</span>
                <span className="city-tag">Illinois</span><span className="city-tag">New York</span>
              </div>
              <div className="eyebrow eyebrow--pc">Experimental Systems</div>
              <h1>Urban infrastructure for the systems<br/><em>that come next.</em></h1>
              <p className="hero-sub">Drones, autonomous systems, AI sensing, augmented reality, smart-city infrastructure, the emerging applications that benefit most from distributed, elevated, low-latency urban nodes. Real sites, on real buildings, with the access and compliance path already cleared.</p>
              <div className="hero-actions">
                <a href="#exp-inquiry" className="btn btn-primary">Browse Experimental-Rated Nodes</a>
                <a href="#exp-inquiry" className="btn btn-outline-light">Talk to Skynode</a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-visual-card">
                <div className="hero-visual-header">
                  <span className="visual-title">Experimental-Rated Skynodes</span>
                  <span className="visual-status">Sites Available</span>
                </div>
                <div className="hero-filter-row">
                  <span className="filter-label">Filter:</span>
                  {filters.map(f=><span key={f} className={`filter-chip${activeFilter===f?' active':''}`} onClick={()=>setActiveFilter(f)}>{f}</span>)}
                </div>
                <div className="node-table">
                  {[
                    {id:'0302.NY',asl:"924'",svcs:['UAS','SENSE']},
                    {id:'0118.CT',asl:"641'",svcs:['SENSE','SMART']},
                    {id:'0445.FL',asl:"522'",svcs:['UAS','AR','SMART']},
                    {id:'0277.IL',asl:"788'",svcs:['SENSE','AR']},
                    {id:'0391.IL',asl:"435'",svcs:['UAS','SMART']},
                  ].map(node=>(
                    <div key={node.id} className="node-row-item">
                      <div className="node-name-cell">
                        <span className="node-dot node-dot--on"/>
                        <span className="node-site-id">{node.id}</span>
                        <span className="node-asl">| ASL: {node.asl}</span>
                      </div>
                      <div className="node-svc-row">
                        {['UAS','SENSE','AR','SMART'].map(s=>(
                          <span key={s} className={`svc-btn${node.svcs.includes(s)?' svc-btn--on':''}`}>{s}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hero-card-footer">
                  <div className="hero-card-stat"><div className="hero-card-stat-val">18<span style={{fontSize:'14px',fontWeight:600}}>+</span></div><div className="hero-card-stat-lbl">Experimental-rated nodes<br/>(to be confirmed)</div></div>
                  <div className="hero-card-stat"><div className="hero-card-stat-val">6</div><div className="hero-card-stat-lbl">Application categories<br/>supported</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility strip */}
      <div className="credibility"><div className="container"><div className="credibility-inner"><span className="cred-label">Operators deploying emerging systems on Skynode infrastructure</span><div className="cred-logo" style={{width:'88px'}}/><div className="cred-logo" style={{width:'110px'}}/><div className="cred-logo" style={{width:'76px'}}/><div className="cred-logo" style={{width:'96px'}}/><div className="cred-logo" style={{width:'84px'}}/></div></div></div>

      {/* ═══ WHY SECTION ═══ */}
      <section className="section-light" id="why">
        <div className="container">
          <div className="why-header-split reveal">
            <div>
              <div className="eyebrow eyebrow--dark">Built for Emerging Systems</div>
              <h2 className="section-h2">Lab-proven is one thing.<br/><em>The city is another.</em></h2>
            </div>
            <div style={{paddingTop:'8px'}}>
              <p className="section-body">Emerging systems work in the lab. Then real-world urban deployment stalls, blocked by access, permitting, and building owners reluctant to host unfamiliar equipment. The technology was never the problem. The ground was.</p>
              <p className="section-body">Skynode gives you elevated, connected, distributed sites across real buildings, with the access and compliance path already cleared. You stop negotiating rooftops one at a time and start testing where your system actually has to perform: in the field, at metro scale.</p>
            </div>
          </div>

          <div className="hex-map-widget reveal">
            <div className="hex-map-topbar">
              <div className="hex-city-tabs">
                {CITY_NAMES.map((name,i)=>(
                  <button key={name} className={`hex-tab${cityIndex===i?' active':''}`} onClick={()=>setCityIndex(i)}>{name}</button>
                ))}
              </div>
              <div className="hex-legend">
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#FBBF24'}}/> UAS / Drone</span>
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#6BC0DD'}}/> AI Sensing</span>
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#A78BFA'}}/> AR</span>
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'var(--green)'}}/> Smart City</span>
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
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
              <div><div className="feature-title">Real sites, not a testbed</div><div className="feature-desc">Real urban buildings with real elevation. Not a sandbox, not a lab. The same conditions your system will face in production.</div></div>
            </div>
            <div className="feature-item reveal">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M2 9h14M9 2l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              <div><div className="feature-title">Distributed by design</div><div className="feature-desc">Operate across multiple nodes to validate metro-scale coverage and performance, not a single isolated rooftop. Prove it works city-wide.</div></div>
            </div>
            <div className="feature-item reveal">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M9 2l1.5 3.5H14l-2.8 2 1.1 3.5L9 9.5l-3.3 1.5 1.1-3.5L4 5.5h3.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M9 12v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></div>
              <div><div className="feature-title">Compliance-supported</div><div className="feature-desc">Skynode manages permitting and building coordination so you can deploy. We've already cleared the access path most operators get stuck on.</div></div>
            </div>
            <div className="feature-item reveal">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
              <div><div className="feature-title">Connectivity-ready</div><div className="feature-desc">Fiber, interconnect, and Metro Fabric access where applicable, with communications, transport, and compute positioned close enough and fast enough.</div></div>
            </div>
            <div className="feature-item reveal">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M6 16h6M9 13v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
              <div><div className="feature-title">Elevation that matters</div><div className="feature-desc">Rooftops and elevated points give sensing, line-of-sight, and propagation advantages you can't get from street level or a single ground site.</div></div>
            </div>
            <div className="feature-item reveal">
              <div className="feature-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M9 2v4M9 12v4M2 9h4M12 9h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5"/></svg></div>
              <div><div className="feature-title">Operators who get emerging tech</div><div className="feature-desc">We work with drone, autonomy, sensing, and smart-city teams. You won't be explaining why your system matters to a real-estate broker.</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ USE CASES ═══ */}
      <section className="section-dark" id="services">
        <div className="container">
          <div className="section-header-center reveal">
            <div className="eyebrow eyebrow--pc">Supported Applications</div>
            <h2 className="section-h2 section-h2--dark">Emerging systems.<br/><em>Real deployment ground.</em></h2>
            <p style={{fontSize:'15px',color:'var(--tx-3)',lineHeight:'1.7'}}>Experimental-rated Skynodes support drone and robotics operations, AI spatial sensing, augmented reality, smart-city infrastructure, smart-building deployment, and resilient utility metering, each evaluated for technical relevance in its market.</p>
          </div>
          <div className="usecases-grid">

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="3" fill="currentColor"/><path d="M7.5 8.5a6.5 6.5 0 0 0 0 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M16.5 8.5a6.5 6.5 0 0 1 0 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M4.5 5.5a11 11 0 0 0 0 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.45"/><path d="M19.5 5.5a11 11 0 0 1 0 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.45"/></svg>
              </div>
              <div className="usecase-name">Drone &amp; Unmanned Systems</div>
              <p className="usecase-desc">Metro infrastructure for drone operations, mobile robotics, private wireless, and distributed machine control, with communications, transport, and compute positioned close enough, fast enough, and resilient enough.</p>
              <div className="usecase-tags"><span className="ptag">UAS / Drone</span><span className="ptag">Robotics</span><span className="ptag">Private Wireless</span></div>
              <a href="#exp-inquiry" className="usecase-link">Browse UAS sites <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V7l-8-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M8.5 12.5a5 5 0 0 0 7 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="10" r="1.5" fill="currentColor"/></svg>
              </div>
              <div className="usecase-name">AI Spatial Sensing &amp; Detection</div>
              <p className="usecase-desc">Elevated rooftop nodes that supply network, compute, and interconnection for AI-powered sensing platforms analyzing Wi-Fi propagation, movement patterns, or environmental signals across the metro.</p>
              <div className="usecase-tags"><span className="ptag">Spatial AI</span><span className="ptag">Edge Compute</span><span className="ptag">Sensing</span></div>
              <a href="#exp-inquiry" className="usecase-link">Browse sensing sites <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 19v2M16 19v2M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 11h10M7 14h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/></svg>
              </div>
              <div className="usecase-name">Augmented Reality (Field)</div>
              <p className="usecase-desc">Edge compute close enough to the jobsite to cut the delay between sensor input, processing, and AR headset output, for guided maintenance, construction, and inspection use cases.</p>
              <div className="usecase-tags"><span className="ptag">AR / VR</span><span className="ptag">Low Latency</span><span className="ptag">Construction</span></div>
              <a href="#exp-inquiry" className="usecase-link">Browse AR sites <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="14" r="2.5" fill="currentColor"/><path d="M9 11a4 4 0 0 0 0 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M15 11a4 4 0 0 1 0 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M6.5 8.5a8 8 0 0 0 0 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/><path d="M17.5 8.5a8 8 0 0 1 0 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/></svg>
              </div>
              <div className="usecase-name">Smart City Infrastructure</div>
              <p className="usecase-desc">Traffic sensing, environmental monitoring, public-safety integration, machine vision, and curbside analytics, the distributed urban platform for collecting, transporting, and processing city-scale data.</p>
              <div className="usecase-tags"><span className="ptag">Smart City</span><span className="ptag">Machine Vision</span><span className="ptag">Analytics</span></div>
              <a href="#exp-inquiry" className="usecase-link">Browse smart-city sites <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7"/><circle cx="19" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.7"/><path d="M7.5 12h9M13.8 7.2l3.8 3.3M10.2 7.2L6.4 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              </div>
              <div className="usecase-name">Smart Building Deployment</div>
              <p className="usecase-desc">Elevated collection points for in-building sensor data, energy management, occupancy sensing, and building-automation systems that need metro-scale connectivity.</p>
              <div className="usecase-tags"><span className="ptag">Building IoT</span><span className="ptag">Energy</span><span className="ptag">Automation</span></div>
              <a href="#exp-inquiry" className="usecase-link">Browse building sites <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7"/><path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/></svg>
              </div>
              <div className="usecase-name">Utility Metering &amp; Submetering</div>
              <p className="usecase-desc">Elevated rooftop collector points for resilient meter collection, secure transmission, and edge-ready infrastructure across real buildings and cities.</p>
              <div className="usecase-tags"><span className="ptag">Metering</span><span className="ptag">Resilient</span><span className="ptag">Secure</span></div>
              <a href="#exp-inquiry" className="usecase-link">Explore metering <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ CALLOUT BAND ═══ */}
      <div className="callout-band">
        <div className="container">
          <div className="callout-inner">
            <div>
              <div className="eyebrow eyebrow--light">Why Operators Choose Skynode</div>
              <h2 className="callout-h2">The lab proved it.<br/>The city is next.<br/><em>We've cleared the path.</em></h2>
              <p className="callout-body">The hard part of emerging systems is rarely the technology. It's getting real-world urban sites where you can actually test and deploy. Skynode has already done the access and compliance work: elevated, connected, distributed nodes on real buildings, ready for the systems that don't have a procurement category yet.</p>
              <div className="callout-actions">
                <a href="#exp-inquiry" className="btn btn-outline-light">Talk to Skynode</a>
              </div>
            </div>
            <div className="metric-stack">
              <div className="metric-item"><span className="metric-lbl">Active markets</span><span className="metric-val">NYC · CHI · MIA · New Haven · Springfield</span></div>
              <div className="metric-item"><span className="metric-lbl">Application types</span><span className="metric-val">UAS · Sensing · AR · Smart City · Metering</span></div>
              <div className="metric-item"><span className="metric-lbl">Site evaluation criteria</span><span className="metric-val">Elevation · Backhaul · LOS · Compute</span></div>
              <div className="metric-item"><span className="metric-lbl">Permitting management</span><span className="metric-val">Local · State · Federal</span></div>
              <div className="metric-item"><span className="metric-lbl">Rooftop experience</span><span className="metric-val">40+ years*</span></div>
              <div className="metric-note">*Figure to be confirmed before publishing</div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ METRO FABRIC ═══ */}
      <section className="section-light" id="metro">
        <div className="container">
          <div className="metro-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow--dark">Metro Fabric</div>
              <h2 className="section-h2">Latency. Uptime. Bandwidth. Connectivity.<br/><em>All four. One fabric.</em></h2>
              <p className="section-body">Every network problem reduces to the same four concerns. Metro Fabric is a rooftop wireless mesh across urban markets that addresses all of them: direct point-to-point paths that cut latency, multiple simultaneous links that eliminate single points of failure, dedicated capacity without carrier congestion, and coverage that moves both north-south and east-west across the metro.</p>
              <div className="metro-features">
                <div className="metro-feature">
                  <div className="metro-feature-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M10.5 2L4 10h6.5l-3 6L16 8h-6.5l3-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg></div>
                  <div><div className="metro-feature-title">Latency: direct path, faster medium</div><div className="metro-feature-desc">Fiber follows conduit. Conduit follows streets. Skynode links go point-to-point, with shorter distance, and wireless propagates faster than optical fiber does. Both advantages compound. The result shows up in your measurements, not just our marketing.</div></div>
                </div>
                <div className="metro-feature">
                  <div className="metro-feature-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M9 2l5.5 2.3v4.9C14.5 13 12 15.8 9 17c-3-1.2-5.5-4-5.5-7.8V4.3L9 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M6.5 9l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <div><div className="metro-feature-title">Uptime: multiple paths, automatic failover</div><div className="metro-feature-desc">Single-path networks have a single point of failure. Metro Fabric routes across simultaneous links, so when one degrades, traffic reroutes automatically. SLA-backed uptime with contractual teeth, not a best-effort promise.</div></div>
                </div>
                <div className="metro-feature">
                  <div className="metro-feature-icon"><svg viewBox="0 0 18 18" fill="none"><rect x="2" y="6" width="14" height="6" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M6 9h6M5 6V4.5M9 6V4M13 6V4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg></div>
                  <div><div className="metro-feature-title">Bandwidth: dedicated capacity, no shared lanes</div><div className="metro-feature-desc">Leased carrier circuits get oversold, throttled at peak, and repriced at renewal. Skynode links are dedicated to your deployment. No shared congestion. Capacity that scales with your footprint.</div></div>
                </div>
                <div className="metro-feature">
                  <div className="metro-feature-icon"><svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2" fill="currentColor"/><line x1="9" y1="2" x2="9" y2="7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><line x1="9" y1="11" x2="9" y2="16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><line x1="2" y1="9" x2="7" y2="9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><line x1="11" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></div>
                  <div><div className="metro-feature-title">Connectivity: north-south and east-west</div><div className="metro-feature-desc">Getting between your own nodes across the metro — without the latency penalty and cost of a carrier circuit — is where Metro Fabric earns its place for experimental deployments.</div></div>
                </div>
              </div>
              <div className="metro-usecases">
                {['Edge Compute','Broadcasting','Private Comms','Experimental'].map(t=><span key={t} className="metro-usecase-tag">{t}</span>)}
              </div>
              <a href="#" className="btn btn-outline-dark" style={{marginTop:'28px'}}>Learn About Metro Fabric <svg className="arrow-icon" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            </div>
            <div className="metro-anim-wrap reveal">
              <canvas ref={metroRef} id="metroCanvas" width={480} height={560} />
              <div className="metro-anim-legend">
                <div className="metro-legend-item"><span className="metro-legend-dot metro-legend-dot--cloud"/>Cloud uplinks</div>
                <div className="metro-legend-item"><span className="metro-legend-dot metro-legend-dot--fabric"/>Metro Fabric</div>
                <div className="metro-legend-item"><span className="metro-legend-dot metro-legend-dot--private"/>Experimental nodes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LEAD CAPTURE ═══ */}
      <section className="section-dark" id="exp-inquiry">
        <div className="container">
          <div className="inquiry-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow--light">Start Deploying</div>
              <h2 className="section-h2 section-h2--dark">Tell us what you're building.<br/><em>We'll find you ground.</em></h2>
              <p className="section-body--dark" style={{marginBottom:'32px',fontSize:'15px',lineHeight:'1.75'}}>We won't sell you a site before we understand the system. Fill in the basics. A real person reviews every inquiry. If we have nodes that fit your application, we'll tell you. If we don't, we'll tell you that too.</p>
              <div className="reassurance-list">
                <div className="reassurance-item">
                  <div className="reassurance-icon"><svg viewBox="0 0 18 18" fill="none"><rect x="4" y="2" width="10" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M6 6h6M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
                  <div><div className="reassurance-title">We manage the access path</div><div className="reassurance-desc">Permitting, structural assessments, municipal approvals, and building coordination, all handled by Skynode. You focus on the system, not the paperwork.</div></div>
                </div>
                <div className="reassurance-item">
                  <div className="reassurance-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.5"/><path d="M4.5 13.5A6.5 6.5 0 0 1 2 7.5M13.5 13.5A6.5 6.5 0 0 0 16 7.5M9 10v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
                  <div><div className="reassurance-title">Experimental-rated means something</div><div className="reassurance-desc">We don't apply the label loosely. Sites are evaluated for elevation, backhaul, power, compute readiness, and line-of-sight for the application.</div></div>
                </div>
                <div className="reassurance-item">
                  <div className="reassurance-icon"><svg viewBox="0 0 18 18" fill="none"><rect x="3" y="8" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M6 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9" cy="12" r="1" fill="currentColor"/></svg></div>
                  <div><div className="reassurance-title">Distributed, not one-off</div><div className="reassurance-desc">Validate metro-scale coverage across multiple nodes, not a single isolated rooftop. Prove your system performs across the city, not one address.</div></div>
                </div>
                <div className="reassurance-item">
                  <div className="reassurance-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M2 16V7l5-4v13M7 16V4l9-2v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 9h1M4 12h1M10 6h1M10 9h1M10 12h1M13 6h1M13 9h1M13 12h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
                  <div><div className="reassurance-title">Real sites in real markets</div><div className="reassurance-desc">New York. Miami. Chicago. New Haven. Springfield. Not concept art, not renderings. Real buildings we operate, at real elevation.</div></div>
                </div>
                <div className="reassurance-item">
                  <div className="reassurance-icon"><svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="10" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M9 7v3.5l2 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 2h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
                  <div><div className="reassurance-title">One business day response</div><div className="reassurance-desc">We review every inquiry within one business day. Because your deployment window isn't getting wider while you wait.</div></div>
                </div>
              </div>
            </div>
            <div className="inquiry-form reveal">
              <div className="form-title">Find an experimental-rated site</div>
              <div className="form-sub">Takes 2 minutes. We follow up within one business day.</div>
              {formSuccess ? (
                <div className="form-success show">
                  <div className="form-success-icon">🛰️</div>
                  <div className="form-success-title">Got it.</div>
                  <div className="form-success-body">A real person will review your inquiry within one business day. If we have nodes that fit your application, you'll hear from us. If it's urgent, that's what phones are for.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-2col">
                    <div className="form-group"><label className="form-label">Full Name *</label><input className="form-input" type="text" placeholder="Your name" required /></div>
                    <div className="form-group"><label className="form-label">Company / Organization *</label><input className="form-input" type="text" placeholder="Company or organization" required /></div>
                  </div>
                  <div className="form-2col">
                    <div className="form-group"><label className="form-label">Work Email *</label><input className="form-input" type="email" placeholder="you@company.com" required /></div>
                    <div className="form-group"><label className="form-label">Phone</label><input className="form-input" type="tel" placeholder="Optional" /></div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Market / DMA *</label>
                    <select className="form-input" required><option value="">Select market</option><option>New York</option><option>Miami</option><option>Chicago</option><option>Other</option></select>
                  </div>
                  <div className="form-2col">
                    <div className="form-group"><label className="form-label">Application Type *</label>
                      <select className="form-input" required><option value="">Select application</option><option>Drone / UAS</option><option>Sensing / AI</option><option>AR / VR</option><option>Smart City</option><option>Robotics</option><option>Research</option><option>Other</option></select>
                    </div>
                    <div className="form-group"><label className="form-label">Number of Sites</label>
                      <select className="form-input"><option value="">Select count</option><option>1 site</option><option>2–5 sites</option><option>6–15 sites</option><option>15+ sites</option><option>Not Sure</option></select>
                    </div>
                  </div>
                  <div className="form-2col">
                    <div className="form-group"><label className="form-label">Stage (optional)</label>
                      <select className="form-input"><option value="">Select</option><option>Research / Pre-seed</option><option>Pilot / Funded</option><option>Scaling deployment</option><option>Not Sure</option></select>
                    </div>
                    <div className="form-group"><label className="form-label">Timeline</label>
                      <select className="form-input"><option value="">Select</option><option>ASAP</option><option>1–3 months</option><option>3–6 months</option><option>Just exploring</option></select>
                    </div>
                  </div>
                  <div className="form-group"><label className="form-label">Additional Notes</label><textarea className="form-input" rows={4} placeholder="Brief description of your project: application, coverage area, number of sites, timing…" /></div>
                  <button className="btn btn-primary form-submit" type="submit">Submit Inquiry</button>
                  <div className="form-privacy">Your info is used only to evaluate site fit. No spam. No auto-dialers. We're in the infrastructure business, not the harassment business.</div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="final-cta" style={{position:'relative'}}>
        <canvas ref={ctaCanvasRef} id="ctaCanvas" aria-hidden="true" />
        <div className="eyebrow eyebrow--light" style={{justifyContent:'center'}}>Ready When You Are</div>
        <h2>Stop waiting for permission to deploy.<br/><em>Get it in the field.</em></h2>
        <p>Tell us your market, application, and number of sites. We'll tell you whether we have nodes worth your time.</p>
        <div className="cta-actions">
          <a href="#exp-inquiry" className="btn btn-outline-light" style={{padding:'16px 32px',fontSize:'15px'}}>Talk to Skynode</a>
        </div>
      </section>
    </>
  );
}
