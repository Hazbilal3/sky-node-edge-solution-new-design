import { useRef, useState } from 'react';
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
  const [zoom, setZoom] = useState(1);
  const [activeFilter, setActiveFilter] = useState('All');
  const [formSuccess, setFormSuccess] = useState(false);

  useReveal();
  useBroadcastWaveCanvas(heroCanvasRef, { receiverCount:24, waveCount:7, waveSpeed:0.8 });
  useBroadcastWaveCanvas(ctaCanvasRef,  { receiverCount:14, waveCount:6, waveSpeed:0.7, centered:true });
  useHexMapCanvas(hexCanvasRef, hexTipRef, cityIndex, zoom);
  useMetroFabricCanvas(metroRef);

  const CITY_NAMES = CITIES.map(c=>c.name);
  const filters = ['All','FM','TV','LPFM','Translator'];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormSuccess(true);
  }

  return (
    <>
      <style>{`
        :root[data-theme="dark"]  { --sky-blue: #A78BFA; --broadcast-violet: #A78BFA; }
        :root[data-theme="light"] { --sky-blue: #7C3AED; --broadcast-violet: #7C3AED; }
        .eyebrow--broadcast { color: var(--broadcast-violet); }
        .eyebrow--broadcast::before { background: var(--broadcast-violet); }
        .filter-chip { border: 1px solid rgba(167,139,250,0.35); color: var(--sky-blue); background: rgba(167,139,250,0.10); }
        .filter-chip.active, .filter-chip:hover { background: rgba(167,139,250,0.22); border-color: var(--sky-blue); }
        .svc-btn--on { background: rgba(167,139,250,0.15); color: var(--sky-blue); border: 1px solid rgba(167,139,250,0.38); }
        .hero-visual-header { background: linear-gradient(90deg, rgba(91,33,182,0.25) 0%, transparent 100%); }
        .hero-card-footer { background: rgba(167,139,250,0.07); border-top: 1px solid rgba(167,139,250,0.20); }
        .hero-card-stat-val { color: var(--sky-blue); }
        .usecase-card::after { background: linear-gradient(90deg, #5B21B6, #A78BFA); }
        .usecase-card:hover { border-color: rgba(167,139,250,0.45); box-shadow: 0 12px 40px rgba(91,33,182,0.20); }
        .usecase-icon { background: rgba(167,139,250,0.14); color: var(--sky-blue); }
        .ptag { background: rgba(167,139,250,0.10); border: 1px solid rgba(167,139,250,0.30); color: var(--sky-blue); }
        .usecase-link { color: var(--sky-blue); }
        .hex-map-topbar { background: linear-gradient(90deg, #5B21B6, #1A5570); }
        .metro-visual-header { background: linear-gradient(90deg, #5B21B6, #1A5570); }
        .node-type { color: var(--sky-blue); }
        .node-dot--on { background: var(--green); }
        .footer-links a.active-page { color: var(--sky-blue); }
        .section-h2 em { color: var(--sky-blue); }
        .feature-icon { width:40px; height:40px; border-radius:var(--r-sm); background:rgba(167,139,250,0.10); border:1px solid rgba(167,139,250,0.20); display:flex; align-items:center; justify-content:center; color:var(--sky-blue); flex-shrink:0; }
        .feature-item { display:flex; gap:14px; }
        .feature-title { font-size:14px; font-weight:700; color:rgb(var(--fg)); margin-bottom:4px; }
        .feature-desc { font-size:13px; color:var(--tx-4); line-height:1.65; }
        .node-dot { width:8px; height:8px; border-radius:50%; display:inline-block; margin-right:4px; }
        .node-dot--on  { background:var(--green); }
        .node-dot--off { background:rgba(var(--fg),0.20); }
        .node-name-cell { display:flex; align-items:center; gap:4px; }
        .node-site-id { font-size:13px; font-weight:700; color:var(--tx-1); }
        .node-asl { font-size:11px; color:var(--tx-5); margin-left:4px; }
        .node-row-item { display:flex; align-items:center; justify-content:space-between; padding:10px 16px; border-bottom:1px solid var(--border-dark); }
        .node-row-item:last-child { border-bottom:none; }
        .node-table { }
        .usecase-name { font-size:15px; font-weight:900; color:rgb(var(--fg)); margin-bottom:8px; }
        .usecase-desc { font-size:13px; color:var(--tx-4); line-height:1.65; margin-bottom:14px; }
        .usecase-tags { display:flex; flex-wrap:wrap; gap:5px; margin-bottom:14px; }
        .section-header-center { text-align:center; max-width:640px; margin:0 auto 48px; }
        .section-body { font-size:15px; color:var(--tx-3); line-height:1.75; margin-bottom:20px; }
        .section-body--dark { font-size:15px; color:var(--tx-3); line-height:1.75; }
        .credibility-inner { display:flex; align-items:center; gap:40px; flex-wrap:wrap; }
        .cred-logo { height:28px; background:rgba(var(--fg),0.08); border-radius:6px; }
        .hero { padding-top:100px; min-height:auto; padding-bottom:80px; }
        #heroCanvas { position:absolute; inset:0; width:100%; height:100%; z-index:0; pointer-events:none; }
        .final-cta { position:relative; padding:120px 28px; text-align:center; overflow:hidden; background:radial-gradient(ellipse 70% 80% at 50% 50%, rgba(91,33,182,0.12) 0%, transparent 70%), linear-gradient(180deg, rgba(var(--bg-base),0.96) 0%, rgba(var(--bg-base),0.92) 100%); }
        .final-cta > * { position:relative; z-index:1; }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="hero" style={{position:'relative',overflow:'hidden'}}>
        <canvas ref={heroCanvasRef} id="heroCanvas" aria-hidden="true" />
        <div className="hero-scrim" />
        <div className="hero-iso-bg">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
            <g stroke="#6BC0DD" opacity="0.5">
              <line x1="0" y1="400" x2="720" y2="0"/><line x1="0" y1="500" x2="900" y2="50"/>
              <line x1="0" y1="600" x2="1080" y2="60"/><line x1="200" y1="800" x2="1440" y2="200"/>
              <line x1="720" y1="0" x2="1440" y2="400"/><line x1="540" y1="0" x2="1440" y2="540"/>
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
              <h1>Your transmitter is live.<br/>Your city is listening.<br/><em>Because the site was right.</em></h1>
              <p className="hero-sub">Skynode gives broadcasters a better way to identify and evaluate urban broadcast infrastructure — from FM primary and backup to LPFM, translators, and auxiliary services. Move faster from site search to serious evaluation.</p>
              <div className="hero-actions">
                <a href="#broadcast-inquiry" className="btn btn-outline-light">Talk to Skynode</a>
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
                  {filters.map(f=>(
                    <span key={f} className={`filter-chip${activeFilter===f?' active':''}`} onClick={()=>setActiveFilter(f)}>{f}</span>
                  ))}
                </div>
                <div className="node-table">
                  {[
                    {id:'0302.NY',asl:"924'",svcs:['FM','TV']},
                    {id:'0118.CT',asl:"641'",svcs:['FM','Translator']},
                    {id:'0445.FL',asl:"522'",svcs:['FM','LPFM','Translator']},
                    {id:'0277.IL',asl:"788'",svcs:['TV','Translator']},
                    {id:'0391.IL',asl:"435'",svcs:['TV','LPFM']},
                  ].map(node=>(
                    <div key={node.id} className="node-row-item">
                      <div className="node-name-cell">
                        <span className="node-dot node-dot--on"/>
                        <span className="node-site-id">{node.id}</span>
                        <span className="node-asl">| ASL: {node.asl}</span>
                      </div>
                      <div className="node-svc-row">
                        {['FM','TV','LPFM','Translator'].map(s=>(
                          <span key={s} className={`svc-btn${node.svcs.includes(s)?' svc-btn--on':''}`}>{s}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hero-card-footer">
                  <div className="hero-card-stat">
                    <div className="hero-card-stat-val">22<span style={{fontSize:'14px',fontWeight:600}}>+</span></div>
                    <div className="hero-card-stat-lbl">Active broadcast-rated nodes</div>
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

      {/* Credibility strip */}
      <div className="credibility">
        <div className="container">
          <div className="credibility-inner">
            <span className="cred-label">Engineering teams that have trusted Skynode broadcast sites</span>
            <div className="cred-logo" style={{width:'88px'}}/>
            <div className="cred-logo" style={{width:'110px'}}/>
            <div className="cred-logo" style={{width:'76px'}}/>
            <div className="cred-logo" style={{width:'96px'}}/>
            <div className="cred-logo" style={{width:'84px'}}/>
          </div>
        </div>
      </div>

      {/* ═══ WHY SECTION ═══ */}
      <section className="section-light" id="why">
        <div className="container">
          <div className="why-header-split reveal">
            <div>
              <div className="eyebrow eyebrow--dark">Built for Broadcast</div>
              <h2 className="section-h2">No more starting from<br/><em>a blank map.</em></h2>
            </div>
            <div style={{paddingTop:'8px'}}>
              <p className="section-body">Every broadcast site search has historically started the same way: a blank map, months of cold landlord outreach, RF surveys that go nowhere, and dead ends that cost time you don't have. We've been on those rooftops. Literally.</p>
              <p className="section-body">Skynode has done the preliminary identification work for your market. Broadcast-rated nodes are evaluated for technical relevance — not just available square footage. You start with viable candidates, not a prayer.</p>
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
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#A78BFA'}}/> FM</span>
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#6BC0DD'}}/> TV</span>
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#5BE49B'}}/> LPFM</span>
                <span className="hex-leg-item"><span className="hex-leg-swatch" style={{background:'#F59E0B'}}/> Translator</span>
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

          {/* Feature strip */}
          <div className="why-feature-grid" style={{marginTop:'44px'}}>
            {[
              {title:'Broadcast-focused location strategy',desc:'Skynodes evaluated for RF environment, line of sight, and long-term maintainability — not just available square footage.'},
              {title:'Reduced site acquisition friction',desc:'Begin with a managed portfolio. Skip the blank-page sourcing and the landlords who don\'t call back.'},
              {title:'Compliance-first execution',desc:'Local, state, and federal permitting managed by Skynode — across FM, TV, LPFM, and auxiliary services.'},
              {title:'Operational credibility',desc:'40+ combined years on rooftops. We speak RF, understand line runs, and know what maintainable means in year seven.'},
              {title:'Multi-stakeholder readiness',desc:'Engineering, operations, and finance all have different needs. We\'re structured to serve all three without losing the plot.'},
              {title:'Fast-track buildout',desc:'Site-ready infrastructure means your equipment goes up faster. From agreement to on-air in weeks, not quarters.'},
            ].map((f,i)=>(
              <div key={i} className="feature-item reveal">
                <div className="feature-icon">
                  <svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M6.5 9l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
            <div className="eyebrow eyebrow--broadcast">Service Categories</div>
            <h2 className="section-h2">Every broadcast use case.<br/><em>One infrastructure platform.</em></h2>
            <p style={{fontSize:'15px',color:'var(--tx-3)',lineHeight:'1.7'}}>Broadcast-rated Skynodes support FM, television, LPFM, translators, backup facilities, and auxiliary services — each evaluated for technical relevance in its market.</p>
          </div>
          <div className="usecases-grid">
            {[
              {name:'FM Primary Transmission',desc:"Locations that create real coverage value while staying workable for the long term. Not every tall building is a good FM site. Ours have been evaluated to find the ones that are.",tags:['FM Primary','Full Power','ERP-Evaluated'],link:'Browse FM sites'},
              {name:'FM Backup & Redundancy',desc:"Backup transmission facilities for stations that understand what 'primary site failure' actually costs. Spoiler: more than the backup site would have.",tags:['FM Backup','Redundancy','Auxiliary Power'],link:'Browse backup sites'},
              {name:'Television Broadcast',desc:'Urban sites that support technically disciplined infrastructure planning for TV primary, backup, and auxiliary roles — with the operational discipline the medium demands.',tags:['TV Primary','TV Backup','Auxiliary'],link:'Browse TV sites'},
              {name:'LPFM Infrastructure',desc:"Practical and financially rational urban site options for LPFM operators who are tired of bespoke rooftop negotiations going nowhere. You're local. Your site search should be too.",tags:['LPFM','Urban Sites','Low Power'],link:'Browse LPFM sites'},
              {name:'Translator Sites',desc:'A portfolio of locations for translator deployment as part of a focused local strategy or a broader metro-wide coverage plan. Fill the gaps. Stop losing listeners to dead zones.',tags:['Translators','Coverage Extension','Metro'],link:'Browse translator sites'},
              {name:'Auxiliary Broadcast Services',desc:"Specialized use cases requiring strategically located rooftop infrastructure with dependable access and support conditions. If it needs a rooftop and an FCC filing, we probably have a node for it.",tags:['STL','Auxiliary','Studio-Transmitter Link'],link:'Explore auxiliary'},
            ].map((uc,i)=>(
              <div key={i} className="usecase-card reveal">
                <div className="usecase-icon">
                  <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="3" fill="currentColor"/><path d="M7.5 8.5a6.5 6.5 0 0 0 0 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M16.5 8.5a6.5 6.5 0 0 1 0 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                </div>
                <div className="usecase-name">{uc.name}</div>
                <p className="usecase-desc">{uc.desc}</p>
                <div className="usecase-tags">{uc.tags.map(t=><span key={t} className="ptag">{t}</span>)}</div>
                <a href="#broadcast-inquiry" className="usecase-link">{uc.link} <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
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
              <div className="eyebrow eyebrow--light">Metro Coverage</div>
              <h2 className="callout-h2">Your listeners are in the city.<br/><em>Your transmitter should be too.</em></h2>
              <p className="callout-body">Broadcast coverage is a function of elevation, location, and power. Two of those three are determined by where your transmitter lives. Skynode gives broadcast engineers a better starting point — sites evaluated for RF environment and line of sight, not just available rooftop square footage.</p>
              <div className="callout-actions">
                <a href="#broadcast-inquiry" className="btn btn-outline-light">Talk to an Engineer</a>
              </div>
            </div>
            <div className="metric-stack">
              <div className="metric-item"><span className="metric-lbl">Active markets</span><span className="metric-val">NYC · CHI · MIA · New Haven · Springfield</span></div>
              <div className="metric-item"><span className="metric-lbl">Broadcast service types</span><span className="metric-val">FM · TV · LPFM · Translator · Aux</span></div>
              <div className="metric-item"><span className="metric-lbl">Site evaluation criteria</span><span className="metric-val">RF · LOS · Power · Maintainability</span></div>
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
              <p className="section-body">Every network problem reduces to the same four concerns. Metro Fabric is a rooftop wireless mesh across urban markets that addresses all of them — direct point-to-point paths that cut latency, multiple simultaneous links that eliminate single points of failure, dedicated capacity without carrier congestion, and coverage that moves both north-south and east-west across the metro.</p>
              <div className="metro-features">
                {[
                  {title:'Latency: direct path, faster medium',desc:'Fiber follows conduit. Conduit follows streets. Skynode links go point-to-point — shorter distance, and wireless propagates faster than optical fiber does.'},
                  {title:'Uptime: multiple paths, automatic failover',desc:'Single-path networks have a single point of failure. Metro Fabric routes across simultaneous links — when one degrades, traffic reroutes automatically.'},
                  {title:'Bandwidth: dedicated capacity, no shared lanes',desc:'Leased carrier circuits get oversold, throttled at peak, and repriced at renewal. Skynode links are dedicated to your deployment.'},
                  {title:'Connectivity: north-south and east-west',desc:'Getting between your own sites across the metro — without the latency penalty and cost of a carrier circuit — is where Metro Fabric earns its place.'},
                ].map((f,i)=>(
                  <div key={i} className="metro-feature">
                    <div className="metro-feature-icon">
                      <svg viewBox="0 0 18 18" fill="none"><path d="M10.5 2L4 10h6.5l-3 6L16 8h-6.5l3-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                    </div>
                    <div><div className="metro-feature-title">{f.title}</div><div className="metro-feature-desc">{f.desc}</div></div>
                  </div>
                ))}
              </div>
              <div className="metro-usecases">
                {['Edge Compute','Broadcasting','Private Comms','Experimental'].map(t=><span key={t} className="metro-usecase-tag">{t}</span>)}
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
      <section className="section-dark" id="broadcast-inquiry">
        <div className="container">
          <div className="inquiry-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow--light">Start Your Site Search</div>
              <h2 className="section-h2">Tell us what you need.<br/><em>We'll tell you if we have it.</em></h2>
              <p className="section-body--dark" style={{marginBottom:'32px'}}>We're not going to sell you on a site before we know what you're building. Fill in the basics. A real person reviews every inquiry. If we have what you need, we'll tell you. If we don't, we'll tell you that too.</p>
              <div className="reassurance-list">
                {[
                  {title:'We manage the compliance',desc:'Permits, RF filings, structural assessments, municipal approvals — all handled by Skynode. You focus on the broadcast, not the paperwork.'},
                  {title:"Broadcast-rated means something",desc:'We don\'t apply the label loosely. Sites are evaluated for RF environment, line of sight, power availability, and long-term maintainability.'},
                  {title:'No hidden gotchas',desc:"We'll tell you what we know about a site upfront — including the things that might make it wrong for you."},
                  {title:'Real sites in real markets',desc:'New York. Miami. Chicago. Not concept art. Not renderings. Rooftops we operate — and have been operating.'},
                  {title:'One business day response',desc:"We review every broadcast inquiry within one business day. Because your coverage gap isn't getting smaller while you wait."},
                ].map((r,i)=>(
                  <div key={i} className="reassurance-item">
                    <div className="reassurance-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.5"/><path d="M4.5 13.5A6.5 6.5 0 0 1 2 7.5M13.5 13.5A6.5 6.5 0 0 0 16 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
                    <div><div className="reassurance-title">{r.title}</div><div className="reassurance-desc">{r.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="inquiry-form reveal">
              <div className="form-title">Find a broadcast site</div>
              <div className="form-sub">Takes 2 minutes. We follow up within one business day.</div>
              {formSuccess ? (
                <div className="form-success show">
                  <div className="form-success-icon">📡</div>
                  <div className="form-success-title">Got it.</div>
                  <div className="form-success-body">A real person will review your inquiry within one business day. If we have what you need, you'll hear from us.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-2col">
                    <div className="form-group"><label className="form-label">Full Name *</label><input className="form-input" type="text" placeholder="Your name" required /></div>
                    <div className="form-group"><label className="form-label">Company / Station *</label><input className="form-input" type="text" placeholder="Station or org name" required /></div>
                  </div>
                  <div className="form-2col">
                    <div className="form-group"><label className="form-label">Work Email *</label><input className="form-input" type="email" placeholder="you@station.com" required /></div>
                    <div className="form-group"><label className="form-label">Phone</label><input className="form-input" type="tel" placeholder="Optional" /></div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Market / DMA *</label>
                    <select className="form-input" required><option value="">Select market</option><option>New York</option><option>Miami</option><option>Chicago</option><option>Other</option></select>
                  </div>
                  <div className="form-2col">
                    <div className="form-group"><label className="form-label">Service Type *</label>
                      <select className="form-input" required><option value="">Select type</option><option>FM Primary</option><option>FM Backup</option><option>TV</option><option>LPFM</option><option>Translator</option><option>Auxiliary</option><option>Not Sure</option></select>
                    </div>
                    <div className="form-group"><label className="form-label">Power Requirement</label>
                      <select className="form-input"><option value="">Select range</option><option>&lt;1 kW TPO</option><option>1–5 kW</option><option>5–20 kW</option><option>20 kW+</option><option>Not Sure</option></select>
                    </div>
                  </div>
                  <div className="form-group"><label className="form-label">Additional Notes</label><textarea className="form-input" placeholder="Current site situation, specific RF requirements, backup redundancy goals…"/></div>
                  <button className="btn btn-primary form-submit" type="submit">Submit Broadcast Inquiry</button>
                  <div className="form-privacy">Your info is used only to evaluate site fit. No spam. No auto-dialers.</div>
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
        <h2>Stop searching for the right rooftop.<br/><em>Start evaluating it.</em></h2>
        <p>Tell us your market, service type, and power requirement. We'll tell you whether we have a node that's worth your time.</p>
        <div className="cta-actions">
          <a href="#broadcast-inquiry" className="btn btn-outline-light" style={{padding:'16px 32px',fontSize:'15px'}}>Talk to an Engineer</a>
        </div>
      </section>
    </>
  );
}
