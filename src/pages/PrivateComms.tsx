import { useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useBroadcastWaveCanvas } from '../hooks/useBroadcastWaveCanvas';
import { useHexMapCanvas, CITIES } from '../hooks/useHexMapCanvas';
import { useMetroFabricCanvas } from '../hooks/useMetroFabricCanvas';

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
  useBroadcastWaveCanvas(heroCanvasRef, { receiverCount:20, waveCount:6, waveSpeed:0.75 });
  useBroadcastWaveCanvas(ctaCanvasRef,  { receiverCount:12, waveCount:5, waveSpeed:0.65, centered:true });
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
        .final-cta { position:relative; padding:120px 28px; text-align:center; overflow:hidden; background:radial-gradient(ellipse 70% 80% at 50% 50%, rgba(32,101,132,0.12) 0%, transparent 70%), linear-gradient(180deg, rgba(var(--bg-base),0.96) 0%, rgba(var(--bg-base),0.92) 100%); }
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
                <span className="city-tag">Connecticut</span>
                <span className="city-tag">Florida</span>
                <span className="city-tag">Illinois</span>
                <span className="city-tag">New York</span>
              </div>
              <div className="eyebrow eyebrow--pc">Private Communications</div>
              <h1>Your network fails at the worst time.<br/>Usually it's the site.<br/><em>Start with a better one.</em></h1>
              <p className="hero-sub">Skynode provides urban rooftop infrastructure for private communications networks — P25, private 5G, P2P microwave, and IoT — where site quality determines operational reliability.</p>
              <div className="hero-actions">
                <a href="#pc-inquiry" className="btn btn-primary">Browse PC Sites</a>
                <a href="#pc-inquiry" className="btn btn-outline-light">Talk to Skynode</a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-visual-card">
                <div className="hero-visual-header">
                  <span className="visual-title">Private Comms-Rated Skynodes</span>
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
            {[
              {title:'P25/Simulcast infrastructure',desc:'Urban rooftop sites that support P25 conventional, trunked, and simulcast deployments — with the elevation and coverage geometry public safety actually needs.'},
              {title:'Private 5G coverage nodes',desc:'Carrier-grade infrastructure for private LTE and 5G deployments in dense urban environments where coverage gaps cost money and sometimes lives.'},
              {title:'P2P microwave paths',desc:'Verified point-to-point microwave paths between Skynode rooftop locations — evaluated for line of sight, clearance, and long-term reliability.'},
              {title:'IoT and sensor infrastructure',desc:'Urban node density and indoor access for IoT and environmental sensing deployments that need consistent, low-power backhaul.'},
              {title:'MANET and tactical systems',desc:'Flexible urban rooftop infrastructure for mesh, mobile ad-hoc, and tactical communications deployments that don\'t fit legacy frameworks.'},
              {title:'LMR migration support',desc:'Infrastructure for organizations navigating the migration from legacy LMR systems to IP-based or hybrid private communications architectures.'},
            ].map((f,i)=>(
              <div key={i} className="feature-item reveal">
                <div className="feature-icon">
                  <svg viewBox="0 0 18 18" fill="none"><path d="M12 2s-2 4-7 4 0 8 5 8 7-4 7-4-2-8-5-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
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
            <h2 className="section-h2">Every private comms deployment.<br/><em>One infrastructure platform.</em></h2>
          </div>
          <div className="usecases-grid">
            {[
              {name:'P25 / Simulcast Systems',desc:'Sites evaluated for P25 conventional, trunked, and simulcast deployments. Public safety coverage is non-negotiable — we start from that premise.',tags:['P25','Simulcast','Public Safety'],link:'Browse P25 sites'},
              {name:'Private 5G Networks',desc:'Carrier-neutral edge infrastructure for private LTE and 5G. Enterprise-grade coverage in dense urban environments, without a carrier dependency.',tags:['Private 5G','CBRS','Enterprise'],link:'Browse 5G nodes'},
              {name:'P2P Microwave',desc:'Verified point-to-point paths across urban rooftops. High-bandwidth, low-latency interconnects for organizations that need metro connectivity without carrier circuits.',tags:['P2P Microwave','High-Bandwidth','Metro Backhaul'],link:'Browse P2P paths'},
              {name:'IoT / Sensing Networks',desc:'Urban node density and physical access for IoT and environmental sensing deployments. Consistent backhaul for low-power devices that need to keep running.',tags:['IoT','Sensor Networks','LoRaWAN'],link:'Browse IoT nodes'},
              {name:'MANET / Tactical Systems',desc:'Flexible rooftop infrastructure for mesh and mobile ad-hoc network deployments. Urban high points that give your tactical systems the geometry they need.',tags:['MANET','Tactical Comms','Mesh'],link:'Explore MANET sites'},
              {name:'LMR Migration',desc:'Infrastructure for organizations navigating the LMR-to-IP transition. Sites that support hybrid deployments and give you a path forward without a hard cutover.',tags:['LMR Migration','Hybrid','P25-to-IP'],link:'Talk to an Engineer'},
            ].map((uc,i)=>(
              <div key={i} className="usecase-card reveal">
                <div className="usecase-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg></div>
                <div className="usecase-name">{uc.name}</div>
                <p className="usecase-desc">{uc.desc}</p>
                <div className="usecase-tags">{uc.tags.map(t=><span key={t} className="ptag">{t}</span>)}</div>
                <a href="#pc-inquiry" className="usecase-link">{uc.link} <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
              </div>
            ))}
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
