import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { usePageTitle } from '../hooks/usePageTitle';
import { useBroadcastWaveCanvas } from '../hooks/useBroadcastWaveCanvas';

export default function AiInference() {
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const ctaCanvasRef  = useRef<HTMLCanvasElement>(null);

  useReveal();
  usePageTitle('AI & Inference');
  useBroadcastWaveCanvas(heroCanvasRef, { receiverCount:20, waveCount:6, waveSpeed:0.9 });
  useBroadcastWaveCanvas(ctaCanvasRef,  { receiverCount:12, waveCount:4, waveSpeed:0.7, centered:true });

  return (
    <>
      <style>{`
        :root { --ai-green:#5BE49B; --ai-purple:#A78BFA; }
        .eyebrow--ai { color:var(--ai-green); }
        .eyebrow--ai::before { background:var(--ai-green); }
        .ai-hero-h1 em { font-style:normal; color:var(--ai-green); }
        .ai-feature { display:flex; gap:14px; align-items:flex-start; }
        .ai-feature-ico { width:40px; height:40px; border-radius:var(--r-sm); background:rgba(91,228,155,0.10); border:1px solid rgba(91,228,155,0.18); display:flex; align-items:center; justify-content:center; color:var(--ai-green); flex-shrink:0; }
        .ai-feature-ico svg { width:20px; height:20px; }
        .ai-feature-title { font-size:14px; font-weight:700; color:rgb(var(--fg)); margin-bottom:4px; }
        .ai-feature-desc { font-size:13px; color:var(--tx-4); line-height:1.65; }
        .ai-latency-card { background:var(--bg-card); border:1px solid var(--border-accent); border-radius:var(--r-lg); overflow:hidden; }
        .ai-latency-row { display:flex; align-items:center; gap:16px; padding:16px 20px; border-bottom:1px solid var(--border-dark); }
        .ai-latency-row:last-child { border-bottom:none; }
        .ai-latency-label { font-size:13px; font-weight:700; color:var(--tx-3); min-width:180px; }
        .ai-latency-bar-wrap { flex:1; height:8px; background:var(--bg-deep); border-radius:4px; overflow:hidden; }
        .ai-latency-bar { height:100%; border-radius:4px; }
        .ai-latency-val { font-size:12px; font-weight:700; min-width:56px; text-align:right; }
        .ai-latency-row.skynode .ai-latency-bar { background:var(--ai-green); }
        .ai-latency-row.skynode .ai-latency-val { color:var(--ai-green); }
        .ai-latency-row.regional .ai-latency-bar { background:#A78BFA; }
        .ai-latency-row.regional .ai-latency-val { color:#A78BFA; }
        .ai-latency-row.cloud .ai-latency-bar { background:var(--tx-6); }
        .ai-latency-row.cloud .ai-latency-val { color:var(--tx-4); }
        .ai-uc-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; margin-top:40px; }
        .ai-uc-card { background:var(--bg-card); border:1px solid var(--border-dark); border-radius:var(--r-lg); padding:24px; transition:border-color .15s; position:relative; overflow:hidden; }
        .ai-uc-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,var(--ai-green),var(--ai-purple)); }
        .ai-uc-card:hover { border-color:rgba(91,228,155,0.35); }
        .ai-uc-ico { width:40px; height:40px; border-radius:var(--r-sm); background:rgba(91,228,155,0.10); border:1px solid rgba(91,228,155,0.18); display:flex; align-items:center; justify-content:center; color:var(--ai-green); margin-bottom:14px; }
        .ai-uc-title { font-size:15px; font-weight:700; color:rgb(var(--fg)); margin-bottom:8px; }
        .ai-uc-desc { font-size:13px; color:var(--tx-4); line-height:1.65; }
        .ai-specs-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:0; border:1px solid var(--border-accent); border-radius:var(--r-lg); overflow:hidden; margin-top:32px; }
        .ai-spec-cell { padding:20px 24px; border-right:1px solid var(--border-dark); border-bottom:1px solid var(--border-dark); }
        .ai-spec-cell:nth-child(2n) { border-right:none; }
        .ai-spec-cell:nth-last-child(-n+2) { border-bottom:none; }
        .ai-spec-label { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.10em; color:var(--tx-5); margin-bottom:6px; }
        .ai-spec-val { font-size:15px; font-weight:700; color:var(--ai-green); }
        .ai-spec-note { font-size:11px; color:var(--tx-6); margin-top:4px; }
        .ai-grid-card { background:var(--bg-card); border:1px solid var(--border-accent); border-radius:var(--r-lg); padding:28px; }
        .ai-grid-card h3 { font-size:18px; font-weight:900; color:rgb(var(--fg)); margin-bottom:10px; }
        .ai-grid-steps { display:flex; flex-direction:column; gap:0; margin-top:20px; }
        .ai-grid-step { display:flex; gap:16px; padding:16px 0; border-bottom:1px solid var(--border-dark); }
        .ai-grid-step:first-child { padding-top:0; }
        .ai-grid-step:last-child { border-bottom:none; padding-bottom:0; }
        .ai-grid-num { font-size:24px; font-weight:900; color:var(--ai-green); opacity:0.30; line-height:1; min-width:28px; flex-shrink:0; }
        .ai-grid-text h4 { font-size:14px; font-weight:700; color:rgb(var(--fg)); margin-bottom:4px; }
        .ai-grid-text p { font-size:13px; color:var(--tx-4); line-height:1.65; }
        .ai-hero { padding-top:100px; padding-bottom:80px; min-height:auto; }
        #aiHeroCanvas { position:absolute; inset:0; width:100%; height:100%; z-index:0; pointer-events:none; }
        .ai-final-cta { position:relative; padding:120px 28px; text-align:center; overflow:hidden; background:radial-gradient(ellipse 70% 80% at 50% 50%, rgba(91,228,155,0.10) 0%, transparent 70%), linear-gradient(180deg,rgba(var(--bg-base),0.96) 0%,rgba(var(--bg-base),0.92) 100%); }
        .ai-final-cta > * { position:relative; z-index:1; }
        .ai-final-cta em { font-style:normal; color:var(--ai-green); }
        @media (max-width:768px) {
          .ai-uc-grid { grid-template-columns:1fr; }
          .ai-specs-grid { grid-template-columns:1fr; }
          .ai-spec-cell { border-right:none; }
          .ai-spec-cell:nth-last-child(-n+2) { border-bottom:1px solid var(--border-dark); }
          .ai-spec-cell:last-child { border-bottom:none; }
        }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="hero ai-hero" style={{position:'relative',overflow:'hidden'}}>
        <canvas ref={heroCanvasRef} id="aiHeroCanvas" aria-hidden="true" />
        <div className="hero-scrim" />
        <div className="container" style={{position:'relative',zIndex:2}}>
          <div className="hero-inner">
            <div>
              <div className="city-tags">
                <span className="city-tag">New York</span><span className="city-tag">Florida</span>
                <span className="city-tag">Illinois</span><span className="city-tag">Connecticut</span>
              </div>
              <div className="eyebrow eyebrow--ai">AI / Inference Colocation</div>
              <h1 className="ai-hero-h1">Build AI where<br/><em>the city actually happens.</em></h1>
              <p className="hero-sub">Distributed GPU and inference infrastructure at urban edge nodes — closer to users, devices, cameras, and the environments where decisions must happen in real time.</p>
              <div className="hero-actions">
                <Link to="/skynodes" className="btn btn-primary">Browse AI-Ready Nodes</Link>
                <Link to="/contact" className="btn btn-outline-light">Talk to Skynode</Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="ai-latency-card">
                <div style={{padding:'14px 20px 10px',borderBottom:'1px solid var(--border-dark)'}}>
                  <div style={{fontSize:'11px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.10em',color:'var(--tx-5)'}}>Inference Latency — User to Model</div>
                </div>
                <div className="ai-latency-row skynode">
                  <div className="ai-latency-label">Skynode metro node</div>
                  <div className="ai-latency-bar-wrap"><div className="ai-latency-bar" style={{width:'15%'}}/></div>
                  <div className="ai-latency-val">&lt;5ms</div>
                </div>
                <div className="ai-latency-row regional">
                  <div className="ai-latency-label">Regional edge DC</div>
                  <div className="ai-latency-bar-wrap"><div className="ai-latency-bar" style={{width:'42%'}}/></div>
                  <div className="ai-latency-val">~20ms</div>
                </div>
                <div className="ai-latency-row cloud">
                  <div className="ai-latency-label">Centralized cloud</div>
                  <div className="ai-latency-bar-wrap"><div className="ai-latency-bar" style={{width:'88%'}}/></div>
                  <div className="ai-latency-val">40–80ms</div>
                </div>
                <div style={{padding:'12px 20px',background:'rgba(91,228,155,0.05)',borderTop:'1px solid var(--border-dark)'}}>
                  <div style={{fontSize:'11px',color:'var(--tx-5)',lineHeight:'1.5'}}>Indicative figures. Per-node benchmarks available on evaluation.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE LATENCY PROBLEM ═══ */}
      <section className="section-light">
        <div className="container">
          <div className="why-header-split reveal">
            <div>
              <div className="eyebrow eyebrow--ai">The Problem</div>
              <h2 className="section-h2">Distant cloud regions are<br/><em>not an AI infrastructure strategy.</em></h2>
            </div>
            <div style={{paddingTop:'8px'}}>
              <p className="section-body">When your model runs three states away, every inference request pays the round-trip toll: 40ms to 80ms that compounds across every downstream system. For real-time applications — video AI, physical AI, interactive systems — that is not a performance concern. It is a product failure.</p>
              <p className="section-body">The problem is not the model. It is the infrastructure. Distant data centers mean latency, bandwidth cost, and architectural fragility. Skynode puts your GPU infrastructure inside the metro — at the last-mile layer where inference results have to arrive before the moment passes.</p>
            </div>
          </div>

          {/* Features */}
          <div className="why-feature-grid" style={{marginTop:'48px'}}>
            {[
              {title:'Metro-distributed inference',  desc:'Multiple urban nodes running your models in parallel — so the user in midtown and the camera on the rooftop both get a response in milliseconds, not seconds.'},
              {title:'GPU-dense configurations',     desc:'Power-dense rack configurations available at select nodes. Specific kW figures are per-node — confirmed on evaluation, not estimated in a brochure.'},
              {title:'Neutral host model',           desc:'Your hardware. Your models. Your network. Skynode provides the environment. You own the stack.'},
              {title:'Carrier-neutral backhaul',     desc:'Multiple upstream providers per node. No single carrier dependency. Built for workloads that cannot afford a backhaul outage at the wrong moment.'},
              {title:'Real urban buildings',         desc:'Not a lab. Not a testbed. Real managed locations with real elevation, power infrastructure, and physical security in the cities you are already in.'},
              {title:'Compliance-first execution',   desc:'Site permitting, structural assessments, and utility coordination managed by Skynode. Your team ships inference, not paperwork.'},
            ].map((f, i) => (
              <div key={i} className="ai-feature reveal">
                <div className="ai-feature-ico">
                  <svg viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5 7h8M5 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <div><div className="ai-feature-title">{f.title}</div><div className="ai-feature-desc">{f.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AI GRID CONCEPT ═══ */}
      <section className="section-dark">
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'64px',alignItems:'start'}}>
            <div className="reveal">
              <div className="eyebrow eyebrow--ai">The AI Grid Concept</div>
              <h2 className="section-h2">Distributed inference across<br/><em>metro nodes.</em></h2>
              <p className="section-body--dark">A single GPU node solves a latency problem. A connected grid of GPU nodes solves a scale problem. The Skynode AI Grid is the distributed inference layer that fills the gap between hyperscaler cloud and the physical world where your models need to run.</p>
              <p className="section-body--dark" style={{marginBottom:'28px'}}>Deploy at one node, expand across the metro as demand scales. Each node contributes compute capacity, backhaul, and physical presence — linked through the Skynode Metro Fabric.</p>
              <Link to="/metro-fabric" className="text-link" style={{display:'inline-flex',alignItems:'center',gap:'6px',fontSize:'14px',fontWeight:700,color:'var(--ai-green)'}}>
                Learn About Metro Fabric →
              </Link>
            </div>
            <div className="ai-grid-card reveal">
              <h3>How distributed inference scales with Skynode</h3>
              <p style={{fontSize:'13px',color:'var(--tx-4)',lineHeight:'1.65'}}>Start with one node. Expand as demand grows.</p>
              <div className="ai-grid-steps">
                {[
                  {n:'01', title:'Deploy at one metro node', body:'Install GPU infrastructure at a Skynode location in your target city. Begin serving inference to users, cameras, and sensors within that market.'},
                  {n:'02', title:'Expand across multiple nodes', body:'As demand grows, add capacity at additional nodes across the same metro. Workloads distribute across the grid — lower p99, better resilience.'},
                  {n:'03', title:'Operate as a connected compute fabric', body:'Multiple nodes linked through Metro Fabric operate as a single distributed inference layer — geographic redundancy, dedicated interconnect, and the ability to route inference based on proximity.'},
                ].map(s => (
                  <div key={s.n} className="ai-grid-step">
                    <div className="ai-grid-num">{s.n}</div>
                    <div className="ai-grid-text"><h4>{s.title}</h4><p>{s.body}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ USE CASES ═══ */}
      <section className="section-light">
        <div className="container">
          <div className="section-header-center reveal">
            <div className="eyebrow eyebrow--ai">What You Can Deploy</div>
            <h2 className="section-h2">Use cases that need inference<br/><em>in the room, not in the cloud.</em></h2>
          </div>
          <div className="ai-uc-grid">
            {[
              {
                title:'Real-Time Inference',
                desc:'Interactive AI applications — chat, search, recommendation — where the difference between 5ms and 50ms is the difference between feeling instant and feeling broken.',
                tags:['LLM Inference','Real-Time','Sub-10ms'],
                icon:<svg viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
              },
              {
                title:'Video AI &amp; Computer Vision',
                desc:'Process video streams from cameras, sensors, and drones at the edge. Detecting, classifying, and responding before the frames have time to travel to a distant data center and back.',
                tags:['Computer Vision','Video Processing','Edge Models'],
                icon:<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>,
              },
              {
                title:'Physical AI &amp; Spatial Intelligence',
                desc:'AI that operates in the physical world — robotics, autonomous systems, AR overlays, predictive maintenance — where the model has to respond to what is happening in the environment right now.',
                tags:['Physical AI','Robotics','AR/VR'],
                icon:<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" fill="currentColor"/><path d="M7.5 8.5a6.5 6.5 0 0 0 0 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M16.5 8.5a6.5 6.5 0 0 1 0 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M4.5 5.5a11 11 0 0 0 0 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.45"/><path d="M19.5 5.5a11 11 0 0 1 0 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.45"/></svg>,
              },
              {
                title:'Edge Model Serving &amp; Cascades',
                desc:'Serve smaller models at the edge, escalate to larger models only when confidence is low. Distributed inference architectures that reduce cloud egress and total inference cost without sacrificing quality.',
                tags:['Model Cascades','Edge Models','Cost Efficiency'],
                icon:<svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7"/><circle cx="19" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.7"/><path d="M7.5 12h9M13.8 7.2l3.8 3.3M10.2 7.2L6.4 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
              },
            ].map((uc, i) => (
              <div key={i} className="ai-uc-card reveal">
                <div className="ai-uc-ico">{uc.icon}</div>
                <div className="ai-uc-title" dangerouslySetInnerHTML={{__html: uc.title}} />
                <p className="ai-uc-desc">{uc.desc}</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:'5px',marginTop:'12px'}}>
                  {uc.tags.map(t => <span key={t} style={{fontSize:'11px',fontWeight:700,padding:'3px 10px',borderRadius:'20px',background:'rgba(91,228,155,0.08)',border:'1px solid rgba(91,228,155,0.22)',color:'var(--ai-green)'}}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INFRASTRUCTURE ═══ */}
      <section className="section-dark">
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'64px',alignItems:'start'}}>
            <div className="reveal">
              <div className="eyebrow eyebrow--ai">Infrastructure Specs</div>
              <h2 className="section-h2">What each node<br/><em>can support.</em></h2>
              <p className="section-body--dark" style={{marginBottom:'16px'}}>Every node is different. We do not publish standardized specs that may not apply to the specific location you are evaluating. What we can tell you is the range of what Skynode nodes have provided — and what you will get confirmed on evaluation.</p>
              <p className="section-body--dark">The specs below are indicative. Per-node confirmation is part of the evaluation process — not the marketing process.</p>
              <Link to="/contact" className="btn btn-primary" style={{marginTop:'28px'}}>
                Request a Node Evaluation
                <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
            <div className="reveal">
              <div className="ai-specs-grid">
                {[
                  {label:'Available Power',       val:'TBC per node',       note:'Confirmed in evaluation for each specific location'},
                  {label:'Equipment Space',        val:'TBC per node',       note:'Rack count and sq ft confirmed per site'},
                  {label:'Cooling',                val:'TBC per node',       note:'Cooling type and capacity vary by location'},
                  {label:'Connectivity',           val:'Fiber + wireless',   note:'Carrier access confirmed per node'},
                  {label:'Physical Security',      val:'Access-controlled',  note:'Specific protocols confirmed in evaluation'},
                  {label:'Metro Latency',          val:'&lt;5ms indicative', note:'Benchmark per market; confirmed per deployment'},
                ].map((s, i) => (
                  <div key={i} className="ai-spec-cell">
                    <div className="ai-spec-label">{s.label}</div>
                    <div className="ai-spec-val" dangerouslySetInnerHTML={{__html: s.val}} />
                    <div className="ai-spec-note">{s.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BROWSE NODES CTA ═══ */}
      <section className="section-light">
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'64px',alignItems:'center'}}>
            <div className="reveal">
              <div className="eyebrow eyebrow--ai">Browse AI-Ready Nodes</div>
              <h2 className="section-h2">Distributed urban inference<br/><em>is available now.</em></h2>
              <p className="section-body">Browse actual managed nodes in New York, Florida, Illinois, and Connecticut. Filter by market and capability. Request an evaluation call for the nodes that look like a fit — a real person at Skynode will follow up within one business day.</p>
              <div style={{display:'flex',gap:'12px',flexWrap:'wrap',marginTop:'28px'}}>
                <Link to="/skynodes" className="btn btn-primary">Browse AI-Ready Nodes</Link>
                <Link to="/contact" className="btn btn-outline-dark">Talk to Skynode</Link>
              </div>
            </div>
            <div className="reveal">
              <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                {[
                  {market:'New York',     note:'Dense urban coverage across five boroughs'},
                  {market:'Florida',      note:'Miami metro and surrounding markets'},
                  {market:'Illinois',     note:'Chicago metro — financial and industrial edge'},
                  {market:'Connecticut',  note:'Stamford/Greenwich financial corridor and beyond'},
                ].map(m => (
                  <div key={m.market} style={{display:'flex',alignItems:'center',gap:'14px',padding:'14px 18px',background:'var(--bg-card)',border:'1px solid var(--border-dark)',borderRadius:'var(--r-md)'}}>
                    <span style={{width:'8px',height:'8px',borderRadius:'50%',background:'var(--ai-green)',flexShrink:0}}/>
                    <div>
                      <div style={{fontSize:'14px',fontWeight:700,color:'rgb(var(--fg))'}}>{m.market}</div>
                      <div style={{fontSize:'12px',color:'var(--tx-5)'}}>{m.note}</div>
                    </div>
                    <Link to={`/markets/${m.market.toLowerCase().replace(' ','-')}`} style={{marginLeft:'auto',fontSize:'12px',fontWeight:700,color:'var(--ai-green)',textDecoration:'none',whiteSpace:'nowrap'}}>
                      Browse →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="ai-final-cta" style={{position:'relative'}}>
        <canvas ref={ctaCanvasRef} id="aiCtaCanvas" aria-hidden="true" style={{position:'absolute',inset:0,width:'100%',height:'100%',zIndex:0,pointerEvents:'none'}} />
        <div className="eyebrow" style={{justifyContent:'center'}}>Ready to Deploy</div>
        <h2>Distributed urban inference is<br/><em>not a future state.</em></h2>
        <p>Browse real nodes. Request an evaluation. We'll follow up within one business day.</p>
        <div className="cta-actions">
          <Link to="/skynodes" className="btn btn-primary" style={{padding:'16px 32px',fontSize:'15px'}}>Browse AI-Ready Nodes</Link>
          <Link to="/contact"  className="btn btn-outline-light" style={{padding:'16px 32px',fontSize:'15px'}}>Talk to Skynode</Link>
        </div>
      </section>
    </>
  );
}
