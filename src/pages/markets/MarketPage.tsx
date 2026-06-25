import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useHexMapCanvas, CITIES } from '../../hooks/useHexMapCanvas';

export interface MarketConfig {
  name: string;
  stateLabel: string;
  cityIndex: number;
  tagline: string;
  heroSub: string;
  services: string[];
  highlights: { title: string; body: string }[];
  nodes: { id: string; neighborhood: string; svcs: string[]; status: 'active' | 'evaluating' }[];
  calloutBody: string;
}

const SVC_COLORS: Record<string, { color: string; bg: string }> = {
  Broadcasting:    { color:'#C4B5FD', bg:'rgba(124,58,237,0.15)' },
  'Private Comms': { color:'#6BC0DD', bg:'rgba(64,156,188,0.15)' },
  'Edge Colocation':{ color:'#5BE49B', bg:'rgba(91,228,155,0.15)' },
  'AI / Inference':{ color:'#A78BFA', bg:'rgba(167,139,250,0.15)' },
  'Private 5G':    { color:'#FCD34D', bg:'rgba(252,211,77,0.15)'  },
  'P2P Links':     { color:'#FB923C', bg:'rgba(251,146,60,0.15)'  },
  'IoT / Sensors': { color:'#94A3B8', bg:'rgba(148,163,184,0.15)' },
  P25:             { color:'#6BC0DD', bg:'rgba(64,156,188,0.15)'  },
  Simulcast:       { color:'#409CBC', bg:'rgba(64,156,188,0.12)'  },
};

export default function MarketPage({ cfg }: { cfg: MarketConfig }) {
  const hexCanvasRef = useRef<HTMLCanvasElement>(null);
  const hexTipRef    = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);

  useReveal();
  usePageTitle(`${cfg.name} — Skynode Market`);
  useHexMapCanvas(hexCanvasRef, hexTipRef, cfg.cityIndex, zoom);

  const CITY_NAMES = CITIES.map(c => c.name);

  return (
    <>
      <style>{`
        .mkt-hero { padding:120px 0 80px; }
        .mkt-hero h1 { font-size:clamp(36px,5vw,66px); font-weight:900; line-height:1.07; letter-spacing:-0.028em; color:rgb(var(--fg)); margin-bottom:20px; }
        .mkt-hero h1 em { font-style:normal; color:var(--sky-blue); }
        .mkt-hero-sub { font-size:17px; color:var(--tx-3); line-height:1.78; max-width:580px; margin-bottom:36px; }
        .mkt-hero-actions { display:flex; gap:12px; flex-wrap:wrap; }

        .mkt-map-section { padding:80px 0; }
        .mkt-map-grid { display:grid; grid-template-columns:1fr 480px; gap:56px; align-items:start; }
        .mkt-svc-list { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:28px; }
        .mkt-svc-badge { font-size:12px; font-weight:700; padding:5px 12px; border-radius:99px; }
        .mkt-highlights { display:flex; flex-direction:column; gap:16px; margin-top:28px; }
        .mkt-highlight { display:flex; gap:14px; padding:18px 20px; background:rgba(var(--fg),0.02); border:1px solid var(--border-dark); border-radius:var(--r-md); }
        .mkt-highlight-icon { width:36px; height:36px; border-radius:var(--r-sm); background:rgba(64,156,188,0.12); border:1px solid rgba(64,156,188,0.22); display:flex; align-items:center; justify-content:center; color:var(--sky-blue); flex-shrink:0; }
        .mkt-highlight-title { font-size:14px; font-weight:700; color:rgb(var(--fg)); margin-bottom:4px; }
        .mkt-highlight-body  { font-size:13px; color:var(--tx-4); line-height:1.7; }

        .mkt-map-wrap { background:var(--bg-card); border:1px solid var(--border-dark); border-radius:var(--r-lg); overflow:hidden; }
        .mkt-map-hdr { padding:12px 16px; border-bottom:1px solid var(--border-dark); display:flex; justify-content:space-between; background:rgba(64,156,188,0.06); }
        .mkt-map-title { font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--tx-3); }
        .mkt-zoom-row { display:flex; gap:4px; }
        .mkt-zoom-btn { width:24px; height:24px; border-radius:5px; border:1px solid var(--border-dark); background:var(--bg-card); color:var(--tx-3); font-size:14px; cursor:pointer; display:flex; align-items:center; justify-content:center; }
        .mkt-zoom-btn:hover { border-color:var(--sky-blue); color:var(--sky-blue); }
        .mkt-city-tabs { display:flex; border-bottom:1px solid var(--border-dark); }
        .mkt-city-tab { flex:1; padding:9px 4px; font-size:11px; font-weight:700; background:transparent; border:none; border-bottom:2px solid transparent; color:var(--tx-5); cursor:pointer; transition:all .15s; text-align:center; }
        .mkt-city-tab.active { color:var(--sky-blue); border-bottom-color:var(--sky-blue); }
        .mkt-map-legend { display:flex; gap:12px; padding:10px 16px; border-top:1px solid var(--border-dark); flex-wrap:wrap; }
        .mkt-leg-item { display:flex; align-items:center; gap:5px; font-size:11px; color:var(--tx-5); }
        .mkt-leg-dot { width:7px; height:7px; border-radius:50%; }

        .mkt-nodes { padding:80px 0; border-top:1px solid var(--border-dark); }
        .mkt-node-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:40px; }
        .mkt-node-card { background:var(--bg-card); border:1px solid var(--border-dark); border-radius:var(--r-md); padding:20px; position:relative; overflow:hidden; transition:all .2s; }
        .mkt-node-card:hover { border-color:rgba(64,156,188,0.38); transform:translateY(-2px); box-shadow:0 8px 24px rgba(32,101,132,0.14); }
        .mkt-node-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,var(--teal-primary),var(--sky-blue)); }
        .mkt-node-id { font-size:15px; font-weight:900; color:rgb(var(--fg)); margin-bottom:4px; display:flex; align-items:center; gap:7px; }
        .mkt-node-status { width:7px; height:7px; border-radius:50%; }
        .mkt-node-status--active { background:var(--green); box-shadow:0 0 5px var(--green); }
        .mkt-node-status--eval   { background:#F59E0B; }
        .mkt-node-neighborhood { font-size:12px; color:var(--tx-4); margin-bottom:12px; }
        .mkt-node-svcs { display:flex; flex-wrap:wrap; gap:4px; margin-bottom:14px; }
        .mkt-node-svc { font-size:10px; font-weight:700; padding:2px 7px; border-radius:4px; }
        .mkt-node-foot { border-top:1px solid var(--border-dark); padding-top:10px; }
        .mkt-node-link { font-size:12px; font-weight:700; color:var(--sky-blue); text-decoration:none; display:flex; align-items:center; gap:4px; }

        .mkt-cta { padding:100px 0; text-align:center; border-top:1px solid var(--border-dark); }
        .mkt-cta h2 { font-size:clamp(28px,3.8vw,48px); font-weight:900; letter-spacing:-0.025em; color:rgb(var(--fg)); margin-bottom:16px; }
        .mkt-cta h2 em { font-style:normal; color:var(--sky-blue); }
        .mkt-cta p { font-size:16px; color:var(--tx-3); max-width:480px; margin:0 auto 36px; line-height:1.75; }
        .mkt-cta-btns { display:flex; justify-content:center; gap:12px; flex-wrap:wrap; }

        @media(max-width:960px){ .mkt-map-grid { grid-template-columns:1fr; } }
        @media(max-width:700px){ .mkt-node-grid { grid-template-columns:1fr 1fr; } }
        @media(max-width:480px){ .mkt-node-grid { grid-template-columns:1fr; } }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="mkt-hero section-dark">
        <div className="container">
          <div className="city-tags">
            {cfg.services.slice(0, 4).map(s => <span key={s} className="city-tag">{s}</span>)}
          </div>
          <div className="eyebrow eyebrow--light">{cfg.stateLabel} Market</div>
          <h1>{cfg.tagline.split('|').map((part, i) =>
            i === 1 ? <em key={i}>{part}</em> : <span key={i}>{part}</span>
          )}</h1>
          <p className="mkt-hero-sub">{cfg.heroSub}</p>
          <div className="mkt-hero-actions">
            <Link to="/skynodes" className="btn btn-primary">Browse {cfg.name} Nodes</Link>
            <Link to="/contact"  className="btn btn-outline-light">Talk to Skynode</Link>
          </div>
        </div>
      </section>

      {/* ═══ MAP + HIGHLIGHTS ═══ */}
      <section className="mkt-map-section section-light">
        <div className="container">
          <div className="mkt-map-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow--dark">Available Services</div>
              <h2 style={{fontSize:'clamp(24px,3vw,38px)',fontWeight:900,letterSpacing:'-0.022em',lineHeight:1.12,color:'var(--light-text)',marginBottom:'16px'}}>
                Infrastructure categories<br/>active in <em style={{fontStyle:'normal',color:'var(--teal-primary)'}}>{cfg.name}.</em>
              </h2>
              <div className="mkt-svc-list">
                {cfg.services.map(s => {
                  const meta = SVC_COLORS[s] || { color:'var(--sky-blue)', bg:'rgba(64,156,188,0.12)' };
                  return (
                    <span key={s} className="mkt-svc-badge" style={{background:meta.bg,color:meta.color}}>{s}</span>
                  );
                })}
              </div>
              <div className="mkt-highlights">
                {cfg.highlights.map((h, i) => (
                  <div key={i} className="mkt-highlight">
                    <div className="mkt-highlight-icon">
                      <svg viewBox="0 0 18 18" fill="none" width="16" height="16">
                        <path d="M3 9l5 5 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <div className="mkt-highlight-title">{h.title}</div>
                      <div className="mkt-highlight-body">{h.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal">
              <div className="mkt-map-wrap">
                <div className="mkt-map-hdr">
                  <span className="mkt-map-title">Node Distribution — {cfg.name}</span>
                  <div className="mkt-zoom-row">
                    <button className="mkt-zoom-btn" onClick={() => setZoom(z => Math.min(z+0.25, 2.5))}>+</button>
                    <button className="mkt-zoom-btn" onClick={() => setZoom(z => Math.max(z-0.25, 0.5))}>−</button>
                  </div>
                </div>
                <div className="mkt-city-tabs">
                  {CITY_NAMES.map((name, i) => (
                    <button key={name}
                      className={`mkt-city-tab${i === cfg.cityIndex ? ' active' : ''}`}
                      onClick={() => {}}>
                      {name}
                    </button>
                  ))}
                </div>
                <canvas ref={hexCanvasRef} width={480} height={340} style={{width:'100%',display:'block'}} />
                <div ref={hexTipRef} className="hex-tip" style={{display:'none'}} />
                <div className="mkt-map-legend">
                  <div className="mkt-leg-item"><span className="mkt-leg-dot" style={{background:'#7C3AED'}}/> Broadcasting</div>
                  <div className="mkt-leg-item"><span className="mkt-leg-dot" style={{background:'#409CBC'}}/> Private Comms</div>
                  <div className="mkt-leg-item"><span className="mkt-leg-dot" style={{background:'#5BE49B'}}/> Edge / AI</div>
                  <div className="mkt-leg-item"><span className="mkt-leg-dot" style={{background:'#F59E0B'}}/> Other</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NODE CARDS ═══ */}
      <section className="mkt-nodes section-dark">
        <div className="container">
          <div className="reveal">
            <div className="eyebrow eyebrow--light">Representative Nodes</div>
            <h2 style={{fontSize:'clamp(24px,3vw,38px)',fontWeight:900,letterSpacing:'-0.022em',lineHeight:1.12,color:'rgb(var(--fg))',marginBottom:'14px'}}>
              Active and evaluating nodes<br/><span style={{color:'var(--sky-blue)'}}>in {cfg.name}.</span>
            </h2>
            <p style={{fontSize:'15px',color:'var(--tx-3)',lineHeight:1.75,maxWidth:'560px'}}>Node details — elevation, confirmed services, and exact specifications — are provided during site evaluation. All specs labeled TBC reflect sites under active evaluation.</p>
          </div>
          <div className="mkt-node-grid">
            {cfg.nodes.map(node => {
              return (
                <div key={node.id} className="mkt-node-card reveal">
                  <div className="mkt-node-id">
                    <span className={`mkt-node-status mkt-node-status--${node.status}`}/>
                    {node.id}
                  </div>
                  <div className="mkt-node-neighborhood">{node.neighborhood}</div>
                  <div className="mkt-node-svcs">
                    {node.svcs.map(s => {
                      const meta = SVC_COLORS[s] || { color:'var(--sky-blue)', bg:'rgba(64,156,188,0.12)' };
                      return <span key={s} className="mkt-node-svc" style={{background:meta.bg,color:meta.color}}>{s}</span>;
                    })}
                  </div>
                  <div className="mkt-node-foot">
                    <Link to={`/skynodes/${node.id}`} className="mkt-node-link">
                      View node details
                      <svg viewBox="0 0 12 12" fill="none" width="11" height="11"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Link>
                  </div>
                </div>
              );
            })}
            <div className="mkt-node-card reveal" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'12px',border:'1px dashed var(--border-dark)',background:'transparent',textAlign:'center',padding:'28px'}}>
              <div style={{fontSize:'13px',color:'var(--tx-4)',lineHeight:1.7}}>Not seeing the right node? Describe what you need and we'll check the full portfolio.</div>
              <Link to="/contact" className="btn btn-outline-dark" style={{fontSize:'13px',padding:'9px 18px'}}>Talk to Skynode</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CALLOUT BAND ═══ */}
      <div className="callout-band">
        <div className="container">
          <div className="callout-inner reveal">
            <div>
              <div className="eyebrow eyebrow--light">Deploy in {cfg.name}</div>
              <h2 className="callout-h2">The right site in the right market<br/><em>makes everything else easier.</em></h2>
              <p className="callout-body">{cfg.calloutBody}</p>
              <div className="callout-actions">
                <Link to="/skynodes" className="btn btn-outline-light">Browse {cfg.name} Nodes</Link>
                <Link to="/contact"  className="btn btn-outline-dark">Talk to Skynode</Link>
              </div>
            </div>
            <div className="metric-stack">
              <div className="metric-item"><span className="metric-lbl">Market</span><span className="metric-val">{cfg.name}</span></div>
              <div className="metric-item"><span className="metric-lbl">Active nodes</span><span className="metric-val">TBC</span></div>
              <div className="metric-item"><span className="metric-lbl">Service categories</span><span className="metric-val">{cfg.services.join(' · ')}</span></div>
              <div className="metric-item"><span className="metric-lbl">Metro Fabric</span><span className="metric-val">Available across connected nodes</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ FINAL CTA ═══ */}
      <section className="mkt-cta section-dark">
        <div className="container">
          <div className="eyebrow eyebrow--light" style={{justifyContent:'center'}}>Ready to Deploy in {cfg.name}</div>
          <h2>Tell us what you need.<br/><em>We'll find your node.</em></h2>
          <p>Describe your market, service type, and requirements. A real person reviews every inquiry within one business day.</p>
          <div className="mkt-cta-btns">
            <Link to="/contact"  className="btn btn-primary"       style={{padding:'16px 32px',fontSize:'15px'}}>Talk to Skynode</Link>
            <Link to="/skynodes" className="btn btn-outline-light" style={{padding:'16px 32px',fontSize:'15px'}}>Browse All Nodes</Link>
          </div>
        </div>
      </section>
    </>
  );
}
