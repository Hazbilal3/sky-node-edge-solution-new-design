import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { usePageTitle } from '../hooks/usePageTitle';
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
  const [zoom, setZoom]           = useState(1);
  const [activeFilter, setActiveFilter] = useState('All');

  useReveal();
  usePageTitle('Edge Colocation');
  useBroadcastWaveCanvas(heroCanvasRef, { receiverCount:16, waveCount:5, waveSpeed:0.7 });
  useBroadcastWaveCanvas(ctaCanvasRef,  { receiverCount:10, waveCount:4, waveSpeed:0.6, centered:true });
  useHexMapCanvas(hexCanvasRef, hexTipRef, cityIndex, zoom);
  useMetroFabricCanvas(metroRef);

  const CITY_NAMES = CITIES.map(c => c.name);
  const filters = ['All', 'PD-120kW', 'HD-40kW', 'MD-20kW'];

  return (
    <>
      <style>{`
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
        .hero { padding-top:100px; min-height:auto; padding-bottom:80px; }
        #heroCanvas { position:absolute; inset:0; width:100%; height:100%; z-index:0; pointer-events:none; }
        .final-cta { position:relative; padding:120px 28px; text-align:center; overflow:hidden; background:radial-gradient(ellipse 70% 80% at 50% 50%, rgba(21,153,79,0.12) 0%, transparent 70%), linear-gradient(180deg,rgba(var(--bg-base),0.96) 0%,rgba(var(--bg-base),0.92) 100%); }
        .final-cta > * { position:relative; z-index:1; }
        .ec-trust-bullets { display:flex; flex-direction:column; gap:12px; margin:28px 0 32px; }
        .ec-trust-bullet { display:flex; align-items:flex-start; gap:12px; font-size:14px; color:var(--tx-3); line-height:1.6; }
        .ec-trust-bullet svg { color:var(--sky-blue); flex-shrink:0; margin-top:2px; }
        .ai-sub-card { display:flex; gap:16px; padding:22px; background:rgba(91,228,155,0.05); border:1px solid rgba(91,228,155,0.18); border-radius:var(--r-lg); margin-top:28px; align-items:flex-start; }
        .ai-sub-card-ico { width:40px; height:40px; border-radius:var(--r-sm); background:rgba(91,228,155,0.12); border:1px solid rgba(91,228,155,0.22); display:flex; align-items:center; justify-content:center; color:var(--sky-blue); flex-shrink:0; }
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
              <h1>Deploy compute where<br/><em>the city actually operates.</em></h1>
              <p className="hero-sub">Secure edge colocation for AI inference, GPU workloads, CDN, and network infrastructure — distributed across metropolitan nodes.</p>
              <div className="hero-actions">
                <Link to="/skynodes" className="btn btn-primary">Browse Edge Colocation Nodes</Link>
                <Link to="/contact" className="btn btn-outline-light">Talk to Skynode</Link>
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
                  {filters.map(f => (
                    <span key={f} className={`filter-chip${activeFilter === f ? ' active' : ''}`}
                      onClick={() => setActiveFilter(f)}>{f}</span>
                  ))}
                </div>
                <div className="node-table">
                  {[
                    {id:'NYC-EDGE-1', asl:'Floor 38',   tier:'PD-120kW'},
                    {id:'NYC-EDGE-2', asl:'Penthouse',  tier:'HD-40kW'},
                    {id:'MIA-EDGE-1', asl:'Floor 22',   tier:'MD-20kW'},
                    {id:'CHI-EDGE-1', asl:'Floor 44',   tier:'PD-120kW'},
                    {id:'CT-EDGE-1',  asl:'Floor 12',   tier:'HD-40kW'},
                  ].map(node => (
                    <div key={node.id} className="node-row-item">
                      <div className="node-name-cell">
                        <span className="node-dot node-dot--on"/>
                        <span className="node-site-id">{node.id}</span>
                        <span className="node-asl">| {node.asl}</span>
                      </div>
                      <div className="node-svc-row">
                        <span className={`svc-btn${node.tier === 'PD-120kW' ? ' svc-btn--on' : ''}`}>PD</span>
                        <span className={`svc-btn${node.tier === 'HD-40kW'  ? ' svc-btn--on' : ''}`}>HD</span>
                        <span className={`svc-btn${node.tier === 'MD-20kW'  ? ' svc-btn--on' : ''}`}>MD</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hero-card-footer">
                  <div className="hero-card-stat"><div className="hero-card-stat-val">99</div><div className="hero-card-stat-lbl">Edge-rated nodes</div></div>
                  <div className="hero-card-stat"><div className="hero-card-stat-val">&lt;5<span style={{fontSize:'12px'}}>ms</span></div><div className="hero-card-stat-lbl">Metro latency</div></div>
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
              <div className="eyebrow eyebrow--pc">Built for Serious Compute</div>
              <h2 className="section-h2">Built for serious compute deployment,<br/><em>not concept art.</em></h2>
            </div>
            <div style={{paddingTop:'8px'}}>
              <p className="section-body">The speed of light is not the bottleneck. Distance is. Three states away from your users means 40ms of round-trip you cannot optimize away. Skynode puts your compute inside the metro — at broadcast facilities we operate, with carrier-neutral backhaul, physical security, and managed power — where your latency is determined by blocks, not miles.</p>
              <div className="ec-trust-bullets">
                {[
                  'Real urban rooftop locations with available power and equipment space.',
                  'Neutral host — your equipment, your network, your operations.',
                  'Metro-distributed architecture for latency-sensitive workloads.',
                  '40+ combined years of rooftop infrastructure management experience.',
                  'Compliance-first project execution: permitting, structural, and utility coordination managed by Skynode.',
                ].map((b, i) => (
                  <div key={i} className="ec-trust-bullet">
                    <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {b}
                  </div>
                ))}
              </div>
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
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#5BE49B'}}/> PD-120kW</span>
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#409CBC'}}/> HD-40kW</span>
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#A78BFA'}}/> MD-20kW</span>
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
            {[
              {title:'Sub-5ms metro latency',desc:'Compute nodes inside the metro deliver sub-5ms round-trip to your users. Three states away delivers 40ms. The math is not subtle.'},
              {title:'Carrier-neutral backhaul',desc:'Multiple upstream providers per node. No single carrier dependency. Availability backed by contractual terms.'},
              {title:'Managed power and cooling',desc:'Power density up to 120kW per rack, N+1 cooling, and UPS-backed power with generator backup at every primary node.'},
              {title:'Physical security',desc:'Controlled access, video monitoring, and biometric entry at primary nodes. Skynode operates the site; you control your equipment.'},
              {title:'AI inference ready',desc:'GPU-dense configurations available at select nodes for inference workloads that cannot tolerate the latency of a centralized data center.'},
              {title:'Carrier-grade fiber diversity',desc:'Multiple fiber entry points and diverse path options at primary nodes. Your backhaul does not share a single conduit.'},
            ].map((f, i) => (
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

      {/* ═══ WHAT SKYNODE SUPPORTS ═══ */}
      <section className="section-dark" id="services">
        <div className="container">
          <div className="section-header-center reveal">
            <div className="eyebrow eyebrow--pc">What Skynode Supports</div>
            <h2 className="section-h2">Put your workloads next to demand.<br/><em>Not three states away.</em></h2>
          </div>
          <div className="usecases-grid">

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7"/><circle cx="19" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.7"/><path d="M7.5 12h9M13.8 7.2l3.8 3.3M10.2 7.2L6.4 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              </div>
              <div className="usecase-name">AI Inference &amp; GPU Compute</div>
              <p className="usecase-desc">Deploy GPU racks and inference infrastructure at distributed urban nodes closer to users, cameras, sensors, and operational environments. Support for edge AI, real-time inference, and cascading model architectures.</p>
              <div className="usecase-tags"><span className="ptag">Inference</span><span className="ptag">GPU Racks</span><span className="ptag">Edge AI</span></div>
              <Link to="/contact" className="usecase-link">
                Discuss AI inference
                <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 19v2M16 19v2M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 11h10M7 14h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/></svg>
              </div>
              <div className="usecase-name">Content Delivery &amp; Caching</div>
              <p className="usecase-desc">Place CDN edge nodes inside metro colocation environments for lower-latency content delivery to dense urban audiences. Serve and cache content from inside the city — faster page loads, smoother streams, lower origin traffic costs.</p>
              <div className="usecase-tags"><span className="ptag">CDN</span><span className="ptag">Caching</span><span className="ptag">Origin Offload</span></div>
              <Link to="/solutions/cdn-edge-node" className="usecase-link">
                Browse edge sites
                <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="4" cy="12" r="2" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.7"/><circle cx="20" cy="12" r="2" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="19" r="2" stroke="currentColor" strokeWidth="1.7"/><path d="M6 12h6M12 7v6M14 12h4M12 17v-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              </div>
              <div className="usecase-name">Network Equipment &amp; Interconnection</div>
              <p className="usecase-desc">Cross-connect, private routing, backhaul termination, and carrier-adjacent placement at metro nodes. A local landing zone for hybrid architectures, with direct private connections into public cloud instead of best-effort public internet.</p>
              <div className="usecase-tags"><span className="ptag">Cross-Connect</span><span className="ptag">Backhaul</span><span className="ptag">Direct Connect</span></div>
              <Link to="/solutions/network-colocation" className="usecase-link">
                Browse edge sites
                <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            <div className="usecase-card reveal">
              <div className="usecase-icon">
                <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M7 12l3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="usecase-name">Enterprise Edge Compute</div>
              <p className="usecase-desc">Latency-sensitive processing for financial data, video analytics, IoT aggregation, and real-time applications. Collect, filter, and process data at the edge — so only what matters travels onward and the core network stops drowning in raw telemetry.</p>
              <div className="usecase-tags"><span className="ptag">Enterprise</span><span className="ptag">IoT</span><span className="ptag">Analytics</span></div>
              <Link to="/solutions/enterprise-edge" className="usecase-link">
                Browse edge sites
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
              <div className="eyebrow eyebrow--light">Metro Edge</div>
              <h2 className="callout-h2">Your users are in the building.<br/><em>Your compute should be too.</em></h2>
              <p className="callout-body">Latency is a function of distance. Skynode puts your workloads inside the metro — carrier-neutral, managed, and milliseconds from your users. Stop shipping data three states away for compute that needs to happen in the building.</p>
              <div className="callout-actions">
                <Link to="/skynodes" className="btn btn-outline-light">Browse Edge Nodes</Link>
                <Link to="/contact" className="btn btn-outline-dark">Talk to Skynode</Link>
              </div>
            </div>
            <div className="metric-stack">
              <div className="metric-item"><span className="metric-lbl">Metro latency</span><span className="metric-val">&lt;5ms round-trip</span></div>
              <div className="metric-item"><span className="metric-lbl">Power density</span><span className="metric-val">Up to 120kW per rack</span></div>
              <div className="metric-item"><span className="metric-lbl">Backhaul options</span><span className="metric-val">Fiber · Wireless · Hybrid</span></div>
              <div className="metric-item"><span className="metric-lbl">Active markets</span><span className="metric-val">NYC · FL · IL · CT</span></div>
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
              <h2 className="section-h2">A single node solves a proximity problem.<br/><em>Connected nodes solve a network problem.</em></h2>
              <p className="section-body">Skynode Metro Fabric links multiple nodes through available fiber and high-capacity interconnection — enabling distributed compute architectures that span a city, not just a building.</p>
              <div className="metro-features">
                {[
                  {title:'Distributed compute fabric', desc:'Multiple edge nodes connected via Metro Fabric give your workloads geographic distribution within the metro — active-active, not active-passive.'},
                  {title:'Carrier-neutral interconnect',desc:'Connect your edge nodes to your upstream data center, cloud regions, or other edge deployments without a single carrier dependency.'},
                  {title:'Dedicated capacity',         desc:'Metro Fabric links are dedicated to your deployment. No shared congestion. Throughput that does not degrade at peak.'},
                ].map((f, i) => (
                  <div key={i} className="metro-feature">
                    <div className="metro-feature-icon"><svg viewBox="0 0 18 18" fill="none"><rect x="2" y="6" width="14" height="6" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M6 9h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg></div>
                    <div><div className="metro-feature-title">{f.title}</div><div className="metro-feature-desc">{f.desc}</div></div>
                  </div>
                ))}
              </div>
              <div className="metro-usecases">
                {['AI Inference','CDN / Cache','Private Cloud','NFV / vRAN','IoT Gateway'].map(t => (
                  <span key={t} className="metro-usecase-tag">{t}</span>
                ))}
              </div>
              <Link to="/metro-fabric" className="text-link" style={{display:'inline-flex',alignItems:'center',gap:'6px',marginTop:'20px',fontSize:'14px',fontWeight:700,color:'var(--sky-blue)'}}>
                Learn About Metro Fabric
                <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
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

      {/* ═══ NODE SPECS / CTA BAND ═══ */}
      <section className="section-dark">
        <div className="container">
          <div className="inquiry-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow--light">Explore Edge Colocation Nodes</div>
              <h2 className="section-h2">Browse actual nodes.<br/><em>Not abstract coverage claims.</em></h2>
              <p className="section-body--dark" style={{marginBottom:'28px'}}>Each Skynode is a specific location with specific characteristics you can evaluate — power availability, equipment space, connectivity, and physical access. Browse by market and capability, then request an evaluation call.</p>
              <div className="reassurance-list">
                {[
                  {title:'Carrier-neutral from day one',    desc:'Multiple upstream providers per node. No carrier lock-in. Your backhaul options stay open.'},
                  {title:'Managed power and cooling',       desc:'Power, cooling, and physical security handled by Skynode. You deploy; Skynode operates.'},
                  {title:'Compliance and permitting',       desc:'Site permitting, structural assessments, and utility coordination — all managed by Skynode.'},
                  {title:'One business day response',       desc:'Every edge inquiry is reviewed by a real person within one business day.'},
                ].map((r, i) => (
                  <div key={i} className="reassurance-item">
                    <div className="reassurance-icon"><svg viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5 7h8M5 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
                    <div><div className="reassurance-title">{r.title}</div><div className="reassurance-desc">{r.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal" style={{display:'flex',flexDirection:'column',gap:'16px',alignSelf:'start',paddingTop:'8px'}}>
              <div className="ai-sub-card">
                <div className="ai-sub-card-ico">
                  <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{fontSize:'13px',fontWeight:700,color:'rgb(var(--fg))',marginBottom:'4px'}}>AI / Inference Colocation</div>
                  <div style={{fontSize:'12px',color:'var(--tx-4)',lineHeight:'1.6',marginBottom:'12px'}}>Distributed GPU and inference infrastructure at urban edge nodes. Closer to users, devices, and cameras — built for the last-mile AI layer.</div>
                  <Link to="/contact" className="text-link" style={{fontSize:'12px',fontWeight:700,color:'var(--sky-blue)',display:'inline-flex',alignItems:'center',gap:'5px'}}>
                    Discuss AI Inference →
                  </Link>
                </div>
              </div>
              <Link to="/skynodes" className="btn btn-primary" style={{justifyContent:'center',width:'100%'}}>
                Browse Edge Colocation Nodes
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
        <div className="eyebrow" style={{justifyContent:'center'}}>Ready When You Are</div>
        <h2>Put your compute next to your users.<br/><em>Not three states away.</em></h2>
        <p>Tell us your workload, power requirements, and target market. We'll tell you whether we have a node that is worth your time.</p>
        <div className="cta-actions">
          <Link to="/skynodes" className="btn btn-primary" style={{padding:'16px 32px',fontSize:'15px'}}>Browse Edge Nodes</Link>
          <Link to="/contact"  className="btn btn-outline-light" style={{padding:'16px 32px',fontSize:'15px'}}>Talk to Skynode</Link>
        </div>
      </section>
    </>
  );
}
