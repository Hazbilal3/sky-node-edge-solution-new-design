import { useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useBroadcastWaveCanvas } from '../hooks/useBroadcastWaveCanvas';
import { useHexMapCanvas, CITIES } from '../hooks/useHexMapCanvas';
import { useMetroFabricCanvas } from '../hooks/useMetroFabricCanvas';

export default function EdgeColocation() {
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
  useBroadcastWaveCanvas(heroCanvasRef, { receiverCount:16, waveCount:5, waveSpeed:0.7 });
  useBroadcastWaveCanvas(ctaCanvasRef,  { receiverCount:10, waveCount:4, waveSpeed:0.6, centered:true });
  useHexMapCanvas(hexCanvasRef, hexTipRef, cityIndex, zoom);
  useMetroFabricCanvas(metroRef);

  const CITY_NAMES = CITIES.map(c=>c.name);
  const filters = ['All','PD-120kW','HD-40kW','MD-20kW'];

  function handleSubmit(e: React.FormEvent) { e.preventDefault(); setFormSuccess(true); }

  return (
    <>
      <style>{`
        :root[data-theme="dark"]  { --sky-blue: #5BE49B; }
        :root[data-theme="light"] { --sky-blue: #15994F; }
        .eyebrow--pc { color:var(--sky-blue); }
        .eyebrow--pc::before { background:var(--sky-blue); }
        .filter-chip { border:1px solid rgba(91,228,155,0.35); color:var(--sky-blue); background:rgba(91,228,155,0.10); }
        .filter-chip.active, .filter-chip:hover { background:rgba(91,228,155,0.22); border-color:var(--sky-blue); }
        .svc-btn--on { background:rgba(91,228,155,0.15); color:var(--sky-blue); border:1px solid rgba(91,228,155,0.38); }
        .hero-visual-header { background:linear-gradient(90deg,rgba(91,228,155,0.18) 0%,transparent 100%); }
        .hero-card-footer { background:rgba(91,228,155,0.07); border-top:1px solid rgba(91,228,155,0.20); }
        .hero-card-stat-val { color:var(--sky-blue); }
        .usecase-card::after { background:linear-gradient(90deg,#15994F,#5BE49B); }
        .usecase-card:hover { border-color:rgba(91,228,155,0.45); box-shadow:0 12px 40px rgba(21,153,79,0.20); }
        .usecase-icon { background:rgba(91,228,155,0.14); color:var(--sky-blue); }
        .ptag { background:rgba(91,228,155,0.10); border:1px solid rgba(91,228,155,0.30); color:var(--sky-blue); }
        .usecase-link { color:var(--sky-blue); }
        .hex-map-topbar { background:linear-gradient(90deg,#206584,#0F6B3C); }
        .metro-visual-header { background:linear-gradient(90deg,#206584,#0F6B3C); }
        .section-h2 em { color:var(--sky-blue); }
        .node-type { color:var(--sky-blue); }
        .node-dot--on { background:var(--green); }
        .feature-icon { width:40px; height:40px; border-radius:var(--r-sm); background:rgba(91,228,155,0.10); border:1px solid rgba(91,228,155,0.18); display:flex; align-items:center; justify-content:center; color:var(--sky-blue); flex-shrink:0; }
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
        .final-cta { position:relative; padding:120px 28px; text-align:center; overflow:hidden; background:radial-gradient(ellipse 70% 80% at 50% 50%, rgba(21,153,79,0.12) 0%, transparent 70%), linear-gradient(180deg,rgba(var(--bg-base),0.96) 0%,rgba(var(--bg-base),0.92) 100%); }
        .final-cta > * { position:relative; z-index:1; }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="hero" style={{position:'relative',overflow:'hidden'}}>
        <canvas ref={heroCanvasRef} id="heroCanvas" aria-hidden="true" />
        <div className="hero-scrim" />
        <div className="hero-iso-bg">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
            <g stroke="#6BC0DD" opacity="0.5">
              <line x1="0" y1="400" x2="720" y2="0"/><line x1="0" y1="600" x2="1080" y2="60"/>
              <line x1="720" y1="0" x2="1440" y2="400"/><line x1="360" y1="0" x2="1440" y2="680"/>
            </g>
          </svg>
        </div>
        <div className="container" style={{position:'relative',zIndex:2}}>
          <div className="hero-inner">
            <div>
              <div className="city-tags">
                <span className="city-tag">Connecticut</span><span className="city-tag">Florida</span>
                <span className="city-tag">Illinois</span><span className="city-tag">New York</span>
              </div>
              <div className="eyebrow eyebrow--pc">Edge Colocation</div>
              <h1>Your users are in the building.<br/><em>Your compute should be too.</em></h1>
              <p className="hero-sub">Skynode provides carrier-neutral edge colocation in distributed urban rooftop and micro–data-center nodes: power, cooling, backhaul, and physical security inside the metro, milliseconds from where data is generated and consumed.</p>
              <div className="hero-actions">
                <a href="#edge-inquiry" className="btn btn-primary">Browse Edge Sites</a>
                <a href="#edge-inquiry" className="btn btn-outline-light">Talk to Skynode</a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-visual-card">
                <div className="hero-visual-header">
                  <span className="visual-title">Edge-Colocation-Rated Skynodes</span>
                  <span className="visual-status">Sites Available</span>
                </div>
                <div className="hero-filter-row">
                  <span className="filter-label">Filter:</span>
                  {filters.map(f=><span key={f} className={`filter-chip${activeFilter===f?' active':''}`} onClick={()=>setActiveFilter(f)}>{f}</span>)}
                </div>
                <div className="node-table">
                  {[
                    {id:'NYC-EDGE-1',asl:"Floor 38",tier:'PD-120kW'},
                    {id:'NYC-EDGE-2',asl:"Penthouse",tier:'HD-40kW'},
                    {id:'MIA-EDGE-1',asl:"Floor 22",tier:'MD-20kW'},
                    {id:'CHI-EDGE-1',asl:"Floor 44",tier:'PD-120kW'},
                    {id:'CT-EDGE-1', asl:"Floor 12",tier:'HD-40kW'},
                  ].map(node=>(
                    <div key={node.id} className="node-row-item">
                      <div className="node-name-cell">
                        <span className="node-dot node-dot--on"/>
                        <span className="node-site-id">{node.id}</span>
                        <span className="node-asl">| {node.asl}</span>
                      </div>
                      <div className="node-svc-row">
                        <span className={`svc-btn${node.tier==='PD-120kW'?' svc-btn--on':''}`}>PD</span>
                        <span className={`svc-btn${node.tier==='HD-40kW'?' svc-btn--on':''}`}>HD</span>
                        <span className={`svc-btn${node.tier==='MD-20kW'?' svc-btn--on':''}`}>MD</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hero-card-footer">
                  <div className="hero-card-stat"><div className="hero-card-stat-val">12<span style={{fontSize:'14px',fontWeight:600}}>+</span></div><div className="hero-card-stat-lbl">Edge-rated nodes</div></div>
                  <div className="hero-card-stat"><div className="hero-card-stat-val">&lt;5<span style={{fontSize:'12px'}}>ms</span></div><div className="hero-card-stat-lbl">Metro latency</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility strip */}
      <div className="credibility"><div className="container"><div className="credibility-inner"><span className="cred-label">Teams deploying compute at the edge with Skynode</span></div></div></div>

      {/* ═══ WHY SECTION ═══ */}
      <section className="section-light" id="why">
        <div className="container">
          <div className="why-header-split reveal">
            <div>
              <div className="eyebrow eyebrow--pc">Built for Edge Compute</div>
              <h2 className="section-h2">Milliseconds matter.<br/><em>Location determines them.</em></h2>
            </div>
            <div style={{paddingTop:'8px'}}>
              <p className="section-body">The speed of light is not the bottleneck. Distance is. Three states away from your users means 40ms of round-trip you can't optimize away. Skynode puts your compute inside the metro — on verified rooftops with carrier-neutral backhaul, physical security, and managed power — where your latency is determined by blocks, not miles.</p>
              <p className="section-body">Edge colocation nodes are evaluated for power density, cooling capacity, physical security, and network redundancy — not just available floor space.</p>
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
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#5BE49B'}}/> PD-120kW</span>
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#409CBC'}}/> HD-40kW</span>
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#A78BFA'}}/> MD-20kW</span>
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
            {[
              {title:'Sub-5ms metro latency',desc:'Rooftop compute nodes inside the metro deliver sub-5ms round-trip to your users. Three states away delivers 40ms. The math is not subtle.'},
              {title:'Carrier-neutral backhaul',desc:'Multiple upstream providers per node. No single carrier dependency. 99.9%+ availability with contractual teeth.'},
              {title:'Managed power and cooling',desc:'Power density up to 120kW per rack, N+1 cooling, and UPS-backed power with generator backup at every primary node.'},
              {title:'Physical security',desc:'Controlled access, video monitoring, and biometric entry at primary nodes. We operate the site; you control your equipment.'},
              {title:'AI inference ready',desc:'GPU-dense configurations available at select nodes for inference workloads that can\'t tolerate the latency of a centralized data center.'},
              {title:'Carrier-grade fiber diversity',desc:'Multiple fiber entry points and diverse path options at primary nodes. Your backhaul doesn\'t share a single conduit.'},
            ].map((f,i)=>(
              <div key={i} className="feature-item reveal">
                <div className="feature-icon">
                  <svg viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5 7h8M5 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <div><div className="feature-title">{f.title}</div><div className="feature-desc">{f.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ USE CASES ═══ */}
      <section className="section-dark" id="services">
        <div className="container">
          <div className="section-header-center reveal">
            <div className="eyebrow eyebrow--pc">Edge Use Cases</div>
            <h2 className="section-h2">Put your workloads next to demand.<br/><em>Not three states away.</em></h2>
          </div>
          <div className="usecases-grid">

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7"/><circle cx="19" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.7"/><path d="M7.5 12h9M13.8 7.2l3.8 3.3M10.2 7.2L6.4 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              </div>
              <div className="usecase-name">AI Inference at the Edge</div>
              <p className="usecase-desc">Run inference close to users and sensors: lower latency, lower egress, and data that never has to leave the metro to get answered.</p>
              <div className="usecase-tags"><span className="ptag">Inference</span><span className="ptag">Accelerators</span><span className="ptag">Low Egress</span></div>
              <a href="#edge-inquiry" className="usecase-link">Browse edge sites <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 19v2M16 19v2M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 11h10M7 14h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/></svg>
              </div>
              <div className="usecase-name">Content Delivery &amp; Caching</div>
              <p className="usecase-desc">Serve and cache content from inside the city for faster page loads, smoother streams, and origin traffic you no longer have to pay to move.</p>
              <div className="usecase-tags"><span className="ptag">CDN</span><span className="ptag">Caching</span><span className="ptag">Origin Offload</span></div>
              <a href="#edge-inquiry" className="usecase-link">Browse edge sites <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="3" fill="currentColor"/><path d="M7.5 8.5a6.5 6.5 0 0 0 0 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M16.5 8.5a6.5 6.5 0 0 1 0 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M4.5 5.5a11 11 0 0 0 0 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.45"/><path d="M19.5 5.5a11 11 0 0 1 0 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.45"/></svg>
              </div>
              <div className="usecase-name">Real-Time &amp; Interactive</div>
              <p className="usecase-desc">Cloud gaming, AR/VR, live media, and trading, where single-digit milliseconds decide whether the experience feels instant or broken.</p>
              <div className="usecase-tags"><span className="ptag">Sub-10ms</span><span className="ptag">Streaming</span><span className="ptag">Interactive</span></div>
              <a href="#edge-inquiry" className="usecase-link">Browse edge sites <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7"/><path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/></svg>
              </div>
              <div className="usecase-name">Private Cloud On-Ramp</div>
              <p className="usecase-desc">A local landing zone for hybrid architectures, with direct, private connections into public cloud instead of best-effort public internet.</p>
              <div className="usecase-tags"><span className="ptag">Hybrid</span><span className="ptag">On-Ramp</span><span className="ptag">Direct Connect</span></div>
              <a href="#edge-inquiry" className="usecase-link">Browse edge sites <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="14" r="2.5" fill="currentColor"/><path d="M9 11a4 4 0 0 0 0 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M15 11a4 4 0 0 1 0 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M6.5 8.5a8 8 0 0 0 0 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/><path d="M17.5 8.5a8 8 0 0 1 0 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/></svg>
              </div>
              <div className="usecase-name">IoT &amp; Sensor Aggregation</div>
              <p className="usecase-desc">Collect, filter, and process device data at the edge, so only what matters travels onward and the core network stops drowning in raw telemetry.</p>
              <div className="usecase-tags"><span className="ptag">IoT</span><span className="ptag">Pre-Processing</span><span className="ptag">Aggregation</span></div>
              <a href="#edge-inquiry" className="usecase-link">Browse edge sites <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V7l-8-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M8.5 12.5a5 5 0 0 0 7 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="10" r="1.5" fill="currentColor"/></svg>
              </div>
              <div className="usecase-name">5G Multi-Access Edge (MEC)</div>
              <p className="usecase-desc">Multi-access edge compute co-located with metro radio infrastructure for ultra-low-latency mobile and private-5G applications.</p>
              <div className="usecase-tags"><span className="ptag">MEC</span><span className="ptag">Private 5G</span><span className="ptag">Mobile</span></div>
              <a href="#edge-inquiry" className="usecase-link">Explore MEC <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ CALLOUT BAND ═══ */}
      <div className="callout-band">
        <div className="container">
          <div className="callout-inner">
            <div>
              <div className="eyebrow eyebrow--light">Metro Edge</div>
              <h2 className="callout-h2">Your users are in the building.<br/><em>Your compute should be too.</em></h2>
              <p className="callout-body">Latency is a function of distance. Skynode puts your workloads inside the metro — carrier-neutral, managed, and milliseconds from your users. Stop shipping data three states away for compute that needs to happen in the building.</p>
              <div className="callout-actions">
                <a href="#edge-inquiry" className="btn btn-outline-light">Browse Edge Sites</a>
                <a href="#edge-inquiry" className="btn btn-outline-dark">Talk to an Engineer</a>
              </div>
            </div>
            <div className="metric-stack">
              <div className="metric-item"><span className="metric-lbl">Metro latency</span><span className="metric-val">&lt;5ms round-trip</span></div>
              <div className="metric-item"><span className="metric-lbl">Power density</span><span className="metric-val">Up to 120kW per rack</span></div>
              <div className="metric-item"><span className="metric-lbl">Backhaul options</span><span className="metric-val">Fiber · Wireless · Hybrid</span></div>
              <div className="metric-item"><span className="metric-lbl">Active markets</span><span className="metric-val">NYC · CHI · MIA · CT</span></div>
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
              <h2 className="section-h2">Carrier-neutral backhaul.<br/><em>Metro-wide compute fabric.</em></h2>
              <p className="section-body">Metro Fabric connects your edge compute nodes into a unified platform — carrier-neutral backhaul, multiple simultaneous paths, and dedicated capacity that scales with your deployment footprint.</p>
              <div className="metro-features">
                {[
                  {title:'Distributed compute fabric',desc:'Multiple edge nodes connected via Metro Fabric give your workloads geographic distribution within the metro — active-active, not active-passive.'},
                  {title:'Carrier-neutral interconnect',desc:'Connect your edge nodes to your upstream data center, cloud regions, or other edge deployments without a single carrier dependency.'},
                  {title:'Dedicated capacity',desc:'Metro Fabric links are dedicated to your deployment. No shared congestion. Throughput that doesn\'t degrade at peak.'},
                ].map((f,i)=>(
                  <div key={i} className="metro-feature">
                    <div className="metro-feature-icon"><svg viewBox="0 0 18 18" fill="none"><rect x="2" y="6" width="14" height="6" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M6 9h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg></div>
                    <div><div className="metro-feature-title">{f.title}</div><div className="metro-feature-desc">{f.desc}</div></div>
                  </div>
                ))}
              </div>
              <div className="metro-usecases">
                {['AI Inference','CDN / Cache','Private Cloud','NFV / vRAN','IoT Gateway'].map(t=><span key={t} className="metro-usecase-tag">{t}</span>)}
              </div>
            </div>
            <div className="metro-anim-wrap reveal">
              <canvas ref={metroRef} id="metroCanvas" width={480} height={560} />
              <div className="metro-anim-legend">
                <div className="metro-legend-item"><span className="metro-legend-dot metro-legend-dot--cloud"/>Cloud uplinks</div>
                <div className="metro-legend-item"><span className="metro-legend-dot metro-legend-dot--fabric"/>Metro Fabric</div>
                <div className="metro-legend-item"><span className="metro-legend-dot metro-legend-dot--private"/>Edge nodes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LEAD CAPTURE ═══ */}
      <section className="section-dark" id="edge-inquiry">
        <div className="container">
          <div className="inquiry-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow--light">Start Your Edge Deployment</div>
              <h2 className="section-h2">Tell us what you're deploying.<br/><em>We'll tell you where to put it.</em></h2>
              <p className="section-body--dark" style={{marginBottom:'32px'}}>Edge compute deployments start with the right site. Tell us your workload, power requirements, and market. A real person will follow up within one business day.</p>
              <div className="reassurance-list">
                {[
                  {title:'Carrier-neutral from day one',desc:'Multiple upstream providers per node. No carrier lock-in. Your backhaul options stay open.'},
                  {title:'Managed power and cooling',desc:'Power, cooling, and physical security handled by Skynode. You deploy; we operate.'},
                  {title:'Compliance and permitting',desc:'Site permitting, structural assessments, and utility coordination — all managed by Skynode.'},
                  {title:'One business day response',desc:'Every edge inquiry is reviewed within one business day. Because your deployment timeline isn\'t getting shorter.'},
                ].map((r,i)=>(
                  <div key={i} className="reassurance-item">
                    <div className="reassurance-icon"><svg viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5 7h8M5 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
                    <div><div className="reassurance-title">{r.title}</div><div className="reassurance-desc">{r.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="inquiry-form reveal">
              <div className="form-title">Find an edge colocation site</div>
              <div className="form-sub">Takes 2 minutes. We follow up within one business day.</div>
              {formSuccess ? (
                <div className="form-success show">
                  <div className="form-success-icon">🖥️</div>
                  <div className="form-success-title">Got it.</div>
                  <div className="form-success-body">A real person will review your inquiry within one business day.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-2col">
                    <div className="form-group"><label className="form-label">Full Name *</label><input className="form-input" type="text" placeholder="Your name" required /></div>
                    <div className="form-group"><label className="form-label">Company *</label><input className="form-input" type="text" placeholder="Company name" required /></div>
                  </div>
                  <div className="form-2col">
                    <div className="form-group"><label className="form-label">Work Email *</label><input className="form-input" type="email" placeholder="you@company.com" required /></div>
                    <div className="form-group"><label className="form-label">Phone</label><input className="form-input" type="tel" placeholder="Optional" /></div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Workload Type *</label>
                    <select className="form-input" required><option value="">Select type</option><option>AI / GPU Inference</option><option>CDN / Cache</option><option>Private Cloud</option><option>NFV / vRAN</option><option>IoT / Sensing</option><option>Enterprise Edge</option><option>Other</option></select>
                  </div>
                  <div className="form-2col">
                    <div className="form-group"><label className="form-label">Power Requirement</label>
                      <select className="form-input"><option value="">Select</option><option>MD-20kW</option><option>HD-40kW</option><option>PD-120kW</option><option>Not Sure</option></select>
                    </div>
                    <div className="form-group"><label className="form-label">Market *</label>
                      <select className="form-input" required><option value="">Select market</option><option>New York</option><option>Miami</option><option>Chicago</option><option>Connecticut</option><option>Other</option></select>
                    </div>
                  </div>
                  <div className="form-group"><label className="form-label">Additional Notes</label><textarea className="form-input" placeholder="Rack requirements, latency targets, timeline…"/></div>
                  <button className="btn btn-primary form-submit" type="submit">Submit Edge Inquiry</button>
                  <div className="form-privacy">Your info is used only to evaluate site fit. No spam.</div>
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
        <h2>Put your compute<br/>next to your users.<br/><em>Not three states away.</em></h2>
        <p>Tell us your workload, power requirements, and target market. We'll tell you whether we have a node that's worth your time.</p>
        <div className="cta-actions">
          <a href="#edge-inquiry" className="btn btn-primary" style={{padding:'16px 32px',fontSize:'15px'}}>Browse Edge Sites</a>
          <a href="#edge-inquiry" className="btn btn-outline-light" style={{padding:'16px 32px',fontSize:'15px'}}>Talk to an Engineer</a>
        </div>
      </section>
    </>
  );
}
