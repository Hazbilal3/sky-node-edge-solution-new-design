import { useParams, Link, Navigate } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { usePageTitle } from '../hooks/usePageTitle';
import { NODES, SVC_META, MARKET_TO_ROUTE } from '../data/nodes';

export default function NodeDetail() {
  const { id } = useParams<{ id: string }>();
  const node = NODES.find(n => n.id === id);
  useReveal();
  usePageTitle(node ? `Node ${node.id} — ${node.neighborhood}` : 'Node Not Found');

  if (!node) {
    return <Navigate to="/skynodes" replace />;
  }

  const statusColor = node.status === 'active' ? '#22C55E' : '#F59E0B';
  const statusBg    = node.status === 'active' ? 'rgba(34,197,94,0.12)' : 'rgba(245,158,11,0.12)';
  const statusLabel = node.status === 'active' ? 'Active' : 'Under Evaluation';

  const marketRoute = MARKET_TO_ROUTE[node.market] || '/skynodes';
  const marketSuffix = node.id.split('.')[1];

  return (
    <>
      <style>{`
        .nd-breadcrumb { padding:16px 0; border-bottom:1px solid var(--border-dark); background:var(--bg-credibility); }
        .nd-breadcrumb-inner { display:flex; gap:8px; align-items:center; font-size:13px; color:var(--tx-5); }
        .nd-bc-link { color:var(--tx-4); text-decoration:none; }
        .nd-bc-link:hover { color:rgb(var(--fg)); }

        .nd-hero { padding:80px 0 64px; border-bottom:1px solid var(--border-dark); }
        .nd-hero-inner { display:grid; grid-template-columns:1fr auto; gap:48px; align-items:start; }
        .nd-market-tag { display:inline-flex; align-items:center; gap:8px; font-size:12px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--teal-accent); margin-bottom:16px; }
        .nd-hero-id { font-size:clamp(28px,4vw,52px); font-weight:900; letter-spacing:-0.02em; color:rgb(var(--fg)); line-height:1; margin-bottom:6px; font-family:monospace; }
        .nd-hero-neighborhood { font-size:20px; font-weight:500; color:var(--tx-3); margin-bottom:20px; }
        .nd-status-pill { display:inline-flex; align-items:center; gap:7px; padding:6px 14px; border-radius:20px; font-size:12px; font-weight:700; letter-spacing:0.05em; }
        .nd-status-dot  { width:8px; height:8px; border-radius:50%; }

        .nd-card { background:var(--bg-card); border:1px solid var(--border-dark); border-radius:var(--r-lg); overflow:hidden; min-width:280px; }
        .nd-card-hdr { padding:12px 18px; border-bottom:1px solid var(--border-dark); background:rgba(var(--fg),0.03); font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--tx-5); }
        .nd-card-row  { display:flex; justify-content:space-between; align-items:center; padding:11px 18px; border-bottom:1px solid rgba(var(--fg),0.05); font-size:13px; }
        .nd-card-row:last-child { border-bottom:none; }
        .nd-card-lbl  { color:var(--tx-5); }
        .nd-card-val  { font-weight:700; color:rgb(var(--fg)); }

        .nd-svcs { padding:64px 0; border-bottom:1px solid var(--border-dark); }
        .nd-svc-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:14px; margin-top:32px; }
        .nd-svc-card { display:flex; gap:14px; padding:20px; border-radius:var(--r-md); text-decoration:none; transition:all .18s; border:1px solid var(--border-dark); background:rgba(var(--fg),0.02); }
        .nd-svc-card:hover { transform:translateY(-2px); }
        .nd-svc-icon { width:38px; height:38px; border-radius:var(--r-sm); display:flex; align-items:center; justify-content:center; font-size:15px; font-weight:900; flex-shrink:0; }
        .nd-svc-name { font-size:14px; font-weight:700; color:rgb(var(--fg)); margin-bottom:3px; }
        .nd-svc-hint { font-size:12px; color:var(--tx-5); }

        .nd-specs { padding:64px 0; border-bottom:1px solid var(--border-dark); background:var(--bg-credibility); }
        .nd-spec-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:14px; margin-top:32px; }
        .nd-spec-card { padding:18px 20px; border:1px solid var(--border-dark); border-radius:var(--r-md); background:var(--bg-card); }
        .nd-spec-lbl  { font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--tx-5); margin-bottom:7px; }
        .nd-spec-val  { font-size:17px; font-weight:900; color:var(--teal-accent); }
        .nd-spec-note { font-size:11px; color:var(--tx-6); margin-top:4px; font-style:italic; }

        .nd-nearby { padding:64px 0; border-bottom:1px solid var(--border-dark); }
        .nd-nearby-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:12px; margin-top:28px; }
        .nd-nearby-card { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; border:1px solid var(--border-dark); border-radius:var(--r-md); background:rgba(var(--fg),0.02); text-decoration:none; color:rgb(var(--fg)); font-size:13px; font-weight:600; transition:all .18s; }
        .nd-nearby-card:hover { border-color:var(--teal-accent); background:rgba(64,156,188,0.07); }

        .nd-cta { padding:80px 0; text-align:center; }
        .nd-cta h2 { font-size:clamp(26px,3.6vw,44px); font-weight:900; letter-spacing:-0.024em; color:rgb(var(--fg)); margin-bottom:14px; }
        .nd-cta p  { font-size:15px; color:var(--tx-3); max-width:460px; margin:0 auto 32px; line-height:1.8; }
        .nd-cta-btns { display:flex; justify-content:center; gap:12px; flex-wrap:wrap; }

        @media(max-width:760px){
          .nd-hero-inner { grid-template-columns:1fr; }
          .nd-card { min-width:unset; }
        }
      `}</style>

      {/* Breadcrumb */}
      <div className="nd-breadcrumb">
        <div className="container nd-breadcrumb-inner">
          <Link to="/skynodes" className="nd-bc-link">Skynodes</Link>
          <span>›</span>
          <Link to={marketRoute} className="nd-bc-link">{node.market}</Link>
          <span>›</span>
          <span style={{color:'rgb(var(--fg))',fontFamily:'monospace'}}>{node.id}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="nd-hero section-dark">
        <div className="container">
          <div className="nd-hero-inner">
            <div>
              <div className="nd-market-tag">
                <svg viewBox="0 0 14 14" fill="none" width="14" height="14">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 4v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {node.market} · Node {marketSuffix}
              </div>
              <div className="nd-hero-id">{node.id}</div>
              <div className="nd-hero-neighborhood">{node.neighborhood}</div>
              <div className="nd-status-pill" style={{background:statusBg,color:statusColor}}>
                <span className="nd-status-dot" style={{background:statusColor}}/>
                {statusLabel}
              </div>
            </div>

            <div className="nd-card reveal">
              <div className="nd-card-hdr">Node Specification</div>
              <div className="nd-card-row">
                <span className="nd-card-lbl">Node ID</span>
                <span className="nd-card-val" style={{fontFamily:'monospace'}}>{node.id}</span>
              </div>
              <div className="nd-card-row">
                <span className="nd-card-lbl">Market</span>
                <span className="nd-card-val">{node.market}</span>
              </div>
              <div className="nd-card-row">
                <span className="nd-card-lbl">Location</span>
                <span className="nd-card-val">{node.neighborhood}</span>
              </div>
              <div className="nd-card-row">
                <span className="nd-card-lbl">Elevation ASL</span>
                <span className="nd-card-val" style={{color:'var(--teal-accent)'}}>{node.asl}</span>
              </div>
              <div className="nd-card-row">
                <span className="nd-card-lbl">AGL</span>
                <span className="nd-card-val" style={{color:'var(--teal-accent)'}}>TBC</span>
              </div>
              <div className="nd-card-row">
                <span className="nd-card-lbl">Status</span>
                <span className="nd-card-val" style={{color:statusColor}}>{statusLabel}</span>
              </div>
              <div className="nd-card-row">
                <span className="nd-card-lbl">Services available</span>
                <span className="nd-card-val">{node.services.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="nd-svcs section-light">
        <div className="container">
          <div className="reveal">
            <div className="eyebrow eyebrow--dark">Available Services</div>
            <h2 style={{fontSize:'clamp(22px,2.8vw,34px)',fontWeight:900,letterSpacing:'-0.022em',color:'var(--light-text)',lineHeight:1.12,marginBottom:'10px'}}>
              What this node supports.
            </h2>
            <p style={{fontSize:'14px',color:'var(--light-muted)',marginBottom:0}}>
              Each service is evaluated and confirmed per engagement. Contact Skynode to discuss your specific requirements at this node.
            </p>
          </div>
          <div className="nd-svc-grid">
            {node.services.map(svc => {
              const m = SVC_META[svc];
              return (
                <Link key={svc} to={m.pageHref} className="nd-svc-card" style={{borderColor:m.bg}}>
                  <div className="nd-svc-icon" style={{background:m.bg,color:m.color}}>
                    <span style={{fontFamily:'monospace',fontSize:'13px',fontWeight:900}}>{svc}</span>
                  </div>
                  <div>
                    <div className="nd-svc-name" style={{color:m.color}}>{m.label}</div>
                    <div className="nd-svc-hint">Tap to learn more about this service →</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="nd-specs section-dark">
        <div className="container">
          <div className="reveal">
            <div className="eyebrow eyebrow--light">Technical Specifications</div>
            <h2 style={{fontSize:'clamp(22px,2.8vw,34px)',fontWeight:900,letterSpacing:'-0.022em',color:'rgb(var(--fg))',lineHeight:1.12,marginBottom:'10px'}}>
              Confirmed during <span style={{color:'var(--teal-accent)'}}>site evaluation.</span>
            </h2>
            <p style={{fontSize:'13px',color:'var(--tx-5)',fontStyle:'italic'}}>All specifications are TBC and confirmed per engagement after site survey. Values below are placeholders.</p>
          </div>
          <div className="nd-spec-grid">
            {[
              { label:'Elevation ASL',    value:'TBC', note:'Confirmed per site survey'       },
              { label:'Height AGL',       value:'TBC', note:'Confirmed per engagement'         },
              { label:'Power available',  value:'TBC', note:'kW capacity — evaluated per site' },
              { label:'Generator backup', value:'TBC', note:'Evaluated per site'               },
              { label:'Fiber access',     value:'TBC', note:'Evaluated per site'               },
              { label:'Metro Fabric',     value:'TBC', note:'Where active in market'           },
              { label:'GPS timing',       value:'TBC', note:'Required for simulcast / P25'     },
              { label:'Rack space',       value:'TBC', note:'For edge colocation use cases'    },
            ].map((s,i) => (
              <div key={i} className="nd-spec-card reveal">
                <div className="nd-spec-lbl">{s.label}</div>
                <div className="nd-spec-val">{s.value}</div>
                <div className="nd-spec-note">{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby nodes in same market */}
      <section className="nd-nearby section-light">
        <div className="container">
          <div className="reveal">
            <div className="eyebrow eyebrow--dark">Other Nodes in {node.market}</div>
            <h2 style={{fontSize:'clamp(20px,2.6vw,32px)',fontWeight:900,letterSpacing:'-0.022em',color:'var(--light-text)',lineHeight:1.12,marginBottom:'12px'}}>
              More nodes in this market.
            </h2>
          </div>
          <div className="nd-nearby-grid">
            {NODES
              .filter(n => n.market === node.market && n.id !== node.id)
              .map(n => (
                <Link key={n.id} to={`/skynodes/${n.id}`} className="nd-nearby-card">
                  <span>
                    <span style={{fontFamily:'monospace',marginRight:'10px',color:'var(--teal-accent)'}}>{n.id}</span>
                    {n.neighborhood}
                  </span>
                  <svg viewBox="0 0 12 12" fill="none" width="12" height="12" style={{color:'var(--tx-5)',flexShrink:0}}>
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              ))}
            <Link to={marketRoute} className="nd-nearby-card" style={{borderStyle:'dashed',color:'var(--tx-4)'}}>
              <span>View all {node.market} nodes →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="nd-cta section-dark">
        <div className="container">
          <div className="eyebrow eyebrow--light" style={{justifyContent:'center'}}>Interested in This Node</div>
          <h2>Tell us about your<br/><span style={{color:'var(--teal-accent)'}}>deployment at {node.id}.</span></h2>
          <p>Describe your service requirements, timeline, and technical constraints. We'll confirm qualification and provide detailed site specifications.</p>
          <div className="nd-cta-btns">
            <Link to="/contact"  className="btn btn-primary"      style={{padding:'16px 32px',fontSize:'15px'}}>Start an Inquiry</Link>
            <Link to="/skynodes" className="btn btn-outline-light" style={{padding:'16px 32px',fontSize:'15px'}}>Browse All Nodes</Link>
          </div>
        </div>
      </section>
    </>
  );
}
