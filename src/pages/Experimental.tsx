import { useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useBroadcastWaveCanvas } from '../hooks/useBroadcastWaveCanvas';
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
  useBroadcastWaveCanvas(heroCanvasRef, { receiverCount:18, waveCount:5, waveSpeed:0.65 });
  useBroadcastWaveCanvas(ctaCanvasRef,  { receiverCount:10, waveCount:4, waveSpeed:0.55, centered:true });
  useHexMapCanvas(hexCanvasRef, hexTipRef, cityIndex, zoom);
  useMetroFabricCanvas(metroRef);

  const CITY_NAMES = CITIES.map(c=>c.name);
  const filters = ['All','Sensing','Mesh','Research','Prototype'];

  function handleSubmit(e: React.FormEvent) { e.preventDefault(); setFormSuccess(true); }

  return (
    <>
      <style>{`
        :root[data-theme="dark"]  { --sky-blue: #FBBF24; }
        :root[data-theme="light"] { --sky-blue: #B45309; }
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
        .final-cta { position:relative; padding:120px 28px; text-align:center; overflow:hidden; background:radial-gradient(ellipse 70% 80% at 50% 50%, rgba(180,83,9,0.10) 0%, transparent 70%), linear-gradient(180deg,rgba(var(--bg-base),0.96) 0%,rgba(var(--bg-base),0.92) 100%); }
        .final-cta > * { position:relative; z-index:1; }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="hero" style={{position:'relative',overflow:'hidden'}}>
        <canvas ref={heroCanvasRef} id="heroCanvas" aria-hidden="true" />
        <div className="hero-scrim" />
        <div className="container" style={{position:'relative',zIndex:2}}>
          <div className="hero-inner">
            <div>
              <div className="city-tags">
                <span className="city-tag">Connecticut</span><span className="city-tag">Florida</span>
                <span className="city-tag">Illinois</span><span className="city-tag">New York</span>
              </div>
              <div className="eyebrow eyebrow--pc">Experimental Systems</div>
              <h1>The infrastructure doesn't exist yet.<br/><em>We're building it anyway.</em></h1>
              <p className="hero-sub">Skynode provides urban rooftop infrastructure for experimental, research, and next-generation wireless deployments — sensing networks, mesh systems, prototype deployments, and emerging spectrum use cases that don't fit legacy frameworks.</p>
              <div className="hero-actions">
                <a href="#exp-inquiry" className="btn btn-primary">Explore Experimental Sites</a>
                <a href="#exp-inquiry" className="btn btn-outline-light">Talk to Skynode</a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-visual-card">
                <div className="hero-visual-header">
                  <span className="visual-title">Experimental-Ready Skynodes</span>
                  <span className="visual-status">Sites Available</span>
                </div>
                <div className="hero-filter-row">
                  <span className="filter-label">Filter:</span>
                  {filters.map(f=><span key={f} className={`filter-chip${activeFilter===f?' active':''}`} onClick={()=>setActiveFilter(f)}>{f}</span>)}
                </div>
                <div className="node-table">
                  {[
                    {id:'NYC-EXP-1',asl:"Floor 38",types:['Sensing','Mesh']},
                    {id:'NYC-EXP-2',asl:"Rooftop",types:['Research','Prototype']},
                    {id:'MIA-EXP-1',asl:"Floor 22",types:['Sensing']},
                    {id:'CHI-EXP-1',asl:"Floor 44",types:['Mesh','Research']},
                  ].map(node=>(
                    <div key={node.id} className="node-row-item">
                      <div className="node-name-cell">
                        <span className="node-dot node-dot--on"/>
                        <span className="node-site-id">{node.id}</span>
                        <span className="node-asl">| {node.asl}</span>
                      </div>
                      <div className="node-svc-row">
                        {['Sensing','Mesh','Research','Prototype'].map(s=>(
                          <span key={s} className={`svc-btn${node.types.includes(s)?' svc-btn--on':''}`} style={{fontSize:'9px'}}>{s.slice(0,4)}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hero-card-footer">
                  <div className="hero-card-stat"><div className="hero-card-stat-val">8<span style={{fontSize:'14px',fontWeight:600}}>+</span></div><div className="hero-card-stat-lbl">Experimental-ready nodes</div></div>
                  <div className="hero-card-stat"><div className="hero-card-stat-val">4</div><div className="hero-card-stat-lbl">Active markets</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility strip */}
      <div className="credibility"><div className="container"><div className="credibility-inner"><span className="cred-label">Research teams and early deployers building with Skynode</span></div></div></div>

      {/* ═══ WHY SECTION ═══ */}
      <section className="section-light" id="why">
        <div className="container">
          <div className="why-header-split reveal">
            <div>
              <div className="eyebrow eyebrow--pc">Built for What's Next</div>
              <h2 className="section-h2">Most infrastructure<br/><em>wasn't built for this.</em></h2>
            </div>
            <div style={{paddingTop:'8px'}}>
              <p className="section-body">Experimental and next-generation wireless deployments have a problem: they need infrastructure that doesn't exist yet. Legacy frameworks weren't designed for sensing networks, urban mesh systems, or prototype deployments that will become the standard use cases of 2030.</p>
              <p className="section-body">Skynode provides the urban rooftop foundation that experimental systems need — carrier-neutral, physically accessible, and evaluated for the geographic and RF characteristics that matter for non-standard deployments.</p>
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
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#FBBF24'}}/> Sensing</span>
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#409CBC'}}/> Mesh</span>
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#A78BFA'}}/> Research</span>
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
              {title:'Urban sensing infrastructure',desc:'High-density rooftop nodes in verified urban positions for environmental sensing, air quality monitoring, and urban data collection networks.'},
              {title:'Mesh and relay systems',desc:'Urban high points connected via Metro Fabric — the physical backbone for experimental mesh, relay, and cooperative communications systems.'},
              {title:'Research and academic deployments',desc:'Carrier-neutral sites for university research programs, government testbeds, and industry trials that need real urban infrastructure, not a lab environment.'},
              {title:'Prototype and pre-commercial systems',desc:'Flexible infrastructure for systems that are too early for a standard colocation agreement but need real rooftops to prove their value.'},
              {title:'Emerging spectrum use cases',desc:'Urban nodes positioned for 6GHz, CBRS, mmWave, and other emerging spectrum deployments that require real metro geometry to characterize and test.'},
              {title:'Standards development support',desc:'Infrastructure for organizations participating in standards development that need real-world deployment data to support their technical submissions.'},
            ].map((f,i)=>(
              <div key={i} className="feature-item reveal">
                <div className="feature-icon">
                  <svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
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
            <div className="eyebrow eyebrow--pc">Use Cases</div>
            <h2 className="section-h2">Next-generation systems.<br/><em>Real urban infrastructure.</em></h2>
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
              <div className="eyebrow eyebrow--light">Infrastructure for What's Next</div>
              <h2 className="callout-h2">If it needs a rooftop<br/>and real urban geometry,<br/><em>we probably have a node.</em></h2>
              <p className="callout-body">Experimental and next-generation wireless deployments need infrastructure that's carrier-neutral, physically accessible, and positioned for real urban RF environments. Skynode provides the rooftop foundation so you can focus on the system, not the site.</p>
              <div className="callout-actions">
                <a href="#exp-inquiry" className="btn btn-outline-light">Explore Experimental Sites</a>
              </div>
            </div>
            <div className="metric-stack">
              <div className="metric-item"><span className="metric-lbl">Active markets</span><span className="metric-val">NYC · CHI · MIA · CT</span></div>
              <div className="metric-item"><span className="metric-lbl">Use case categories</span><span className="metric-val">Sensing · Mesh · Research · Prototype · Spectrum</span></div>
              <div className="metric-item"><span className="metric-lbl">Infrastructure type</span><span className="metric-val">Carrier-Neutral · Managed · Flexible</span></div>
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
              <h2 className="section-h2">The backbone for<br/><em>experimental deployments.</em></h2>
              <p className="section-body">Metro Fabric provides the carrier-neutral backhaul that experimental systems need to collect data, coordinate nodes, and connect to analysis infrastructure — without a single carrier dependency or a bespoke fiber agreement.</p>
              <div className="metro-features">
                {[
                  {title:'Distributed node connectivity',desc:'Connect your experimental nodes across the metro without bespoke fiber agreements or carrier circuits. Metro Fabric handles the inter-node backhaul.'},
                  {title:'Flexible configuration',desc:'Metro Fabric can be configured to support sensing backhaul, mesh relay, or research data collection — depending on what your system actually needs.'},
                  {title:'Real-world performance data',desc:'Deployments on Metro Fabric give you real-world latency, throughput, and availability data in the urban environment your system will eventually serve.'},
                ].map((f,i)=>(
                  <div key={i} className="metro-feature">
                    <div className="metro-feature-icon"><svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2" fill="currentColor"/><path d="M9 2v5M9 11v5M2 9h5M11 9h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></div>
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
              <div className="eyebrow eyebrow--light">Start Your Deployment</div>
              <h2 className="section-h2">Tell us what you're building.<br/><em>We'll figure out the rest.</em></h2>
              <p className="section-body--dark" style={{marginBottom:'32px'}}>Experimental deployments don't always fit a standard intake form. Tell us what you're working on and a real person will follow up within one business day. If we can help, we'll tell you how. If we can't, we'll tell you that too.</p>
              <div className="reassurance-list">
                {[
                  {title:'We work with pre-commercial systems',desc:'Not everything fits a standard colocation agreement. If you\'re pre-commercial, we can still work with you — we just need to understand what you\'re deploying.'},
                  {title:'Carrier-neutral infrastructure',desc:'No single upstream dependency. Multiple backhaul options per node give your experimental system the flexibility it needs.'},
                  {title:'Flexible site configurations',desc:'Experimental deployments have non-standard requirements. We\'re structured to handle them without a six-month negotiation.'},
                  {title:'One business day response',desc:'Every inquiry is reviewed within one business day by a real person who understands what experimental deployments actually require.'},
                ].map((r,i)=>(
                  <div key={i} className="reassurance-item">
                    <div className="reassurance-icon"><svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M6.5 9l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                    <div><div className="reassurance-title">{r.title}</div><div className="reassurance-desc">{r.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="inquiry-form reveal">
              <div className="form-title">Explore experimental infrastructure</div>
              <div className="form-sub">Tell us what you're building. We'll tell you if we can help.</div>
              {formSuccess ? (
                <div className="form-success show">
                  <div className="form-success-icon">⚡</div>
                  <div className="form-success-title">Got it.</div>
                  <div className="form-success-body">A real person will review your inquiry within one business day.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-2col">
                    <div className="form-group"><label className="form-label">Full Name *</label><input className="form-input" type="text" placeholder="Your name" required /></div>
                    <div className="form-group"><label className="form-label">Organization *</label><input className="form-input" type="text" placeholder="University, agency, or company" required /></div>
                  </div>
                  <div className="form-group"><label className="form-label">Work Email *</label><input className="form-input" type="email" placeholder="you@org.edu" required /></div>
                  <div className="form-group">
                    <label className="form-label">Deployment Category *</label>
                    <select className="form-input" required><option value="">Select category</option><option>Urban Sensing / Monitoring</option><option>Mesh / Relay Systems</option><option>Research / Academic</option><option>Prototype / Pre-Commercial</option><option>Emerging Spectrum</option><option>Standards Development</option><option>Other</option></select>
                  </div>
                  <div className="form-group"><label className="form-label">Tell us what you're building *</label><textarea className="form-input" rows={4} placeholder="Describe your system, what it needs from the infrastructure, and what you're trying to learn or prove…" required /></div>
                  <button className="btn btn-primary form-submit" type="submit">Submit Experimental Inquiry</button>
                  <div className="form-privacy">Your info is used only to evaluate infrastructure fit. No spam.</div>
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
        <h2>Build the system.<br/>We'll provide the rooftop.<br/><em>You handle the impossible part.</em></h2>
        <p>Tell us what you're deploying. We'll tell you whether we have infrastructure that's worth your time.</p>
        <div className="cta-actions">
          <a href="#exp-inquiry" className="btn btn-primary" style={{padding:'16px 32px',fontSize:'15px'}}>Explore Experimental Sites</a>
          <a href="#exp-inquiry" className="btn btn-outline-light" style={{padding:'16px 32px',fontSize:'15px'}}>Talk to an Engineer</a>
        </div>
      </section>
    </>
  );
}
