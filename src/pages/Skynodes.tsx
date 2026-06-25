import { useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { usePageTitle } from '../hooks/usePageTitle';
import { useDroneSwarmCanvas } from '../hooks/useDroneSwarmCanvas';
import { useHexMapCanvas, CITIES } from '../hooks/useHexMapCanvas';

/* ─── Shared node dataset ──────────────────────────────────────────── */
import { NODES, SVC_META, ALL_SVCS } from '../data/nodes';
import type { SvcCode } from '../data/nodes';

const MARKETS = ['All','New York','Connecticut','Florida','Illinois'] as const;
type MarketFilter = typeof MARKETS[number];

/* ─── Drone swarm node positions ────────────────────────────────── */

const DRONE_NODES = [
  {rx:0.05,ry:0.14},{rx:0.18,ry:0.07},{rx:0.32,ry:0.18},{rx:0.48,ry:0.09},{rx:0.63,ry:0.21},{rx:0.78,ry:0.11},{rx:0.92,ry:0.24},
  {rx:0.11,ry:0.38},{rx:0.26,ry:0.48},{rx:0.44,ry:0.40},{rx:0.59,ry:0.52},{rx:0.74,ry:0.43},{rx:0.88,ry:0.56},
  {rx:0.07,ry:0.68},{rx:0.22,ry:0.76},{rx:0.38,ry:0.63},{rx:0.54,ry:0.78},{rx:0.70,ry:0.68},{rx:0.84,ry:0.80},{rx:0.96,ry:0.62},
];

const CITY_NAMES = CITIES.map(c => c.name);

export default function Skynodes() {
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const hexCanvasRef  = useRef<HTMLCanvasElement>(null);
  const hexTipRef     = useRef<HTMLDivElement>(null);

  const [market, setMarket]   = useState<MarketFilter>('All');
  const [svcs, setSvcs]       = useState<SvcCode[]>([]);
  const [cityIdx, setCityIdx] = useState(0);
  const [zoom, setZoom]       = useState(1);

  useReveal();
  usePageTitle('Skynodes');
  useDroneSwarmCanvas(heroCanvasRef, { nodes: DRONE_NODES, count: 14, speed: 1.1, links: 2 });
  useHexMapCanvas(hexCanvasRef, hexTipRef, cityIdx, zoom);

  /* Sync city tab with market filter */
  function handleMarketTab(m: MarketFilter) {
    setMarket(m);
    if (m !== 'All') {
      const i = CITY_NAMES.indexOf(m);
      if (i >= 0) setCityIdx(i);
    }
  }

  /* Toggle a service filter chip */
  function toggleSvc(s: SvcCode) {
    setSvcs(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  /* Filtered node list */
  const filtered = useMemo(() => NODES.filter(n => {
    const mOk = market === 'All' || n.market === market;
    const sOk = svcs.length === 0 || svcs.some(s => n.services.includes(s));
    return mOk && sOk;
  }), [market, svcs]);

  return (
    <>
      <style>{`
        /* ── Hero ──────────────────────────────── */
        .sk-hero { position:relative; overflow:hidden; padding:120px 0 80px; min-height:70vh; display:flex; align-items:center; }
        #skHeroCanvas { position:absolute; inset:0; width:100%; height:100%; z-index:0; pointer-events:none; }
        .sk-hero-scrim { position:absolute; inset:0; z-index:1;
          background:linear-gradient(160deg,rgba(8,18,28,0.82) 0%,rgba(8,18,28,0.65) 60%,rgba(8,18,28,0.80) 100%); }
        .sk-hero-inner { position:relative; z-index:2; display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:center; }
        .sk-hero h1 { font-size:clamp(36px,4.8vw,62px); font-weight:900; line-height:1.08; letter-spacing:-0.025em;
          color:rgb(var(--fg)); margin-bottom:20px; }
        .sk-hero h1 em { font-style:normal; color:var(--sky-blue); }
        .sk-hero-sub { font-size:16px; color:var(--tx-3); line-height:1.75; margin-bottom:36px; max-width:540px; }
        .sk-stat-row { display:flex; gap:32px; flex-wrap:wrap; margin-top:8px; }
        .sk-stat { display:flex; flex-direction:column; gap:3px; }
        .sk-stat-val { font-size:28px; font-weight:900; color:var(--sky-blue); line-height:1; }
        .sk-stat-lbl { font-size:11px; color:var(--tx-5); font-weight:600; letter-spacing:0.08em; text-transform:uppercase; }
        .sk-hero-card { background:var(--bg-card-glass); border:1px solid rgba(64,156,188,0.30); border-radius:var(--r-lg); overflow:hidden; backdrop-filter:blur(10px); }
        .sk-hero-card-hdr { background:linear-gradient(90deg,rgba(32,101,132,0.25) 0%,transparent 100%);
          padding:14px 20px; border-bottom:1px solid rgba(64,156,188,0.20); display:flex; justify-content:space-between; align-items:center; }
        .sk-hero-card-title { font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--tx-3); }
        .sk-hero-live { display:flex; align-items:center; gap:6px; font-size:11px; font-weight:700; color:var(--green); }
        .sk-hero-live::before { content:''; width:6px; height:6px; border-radius:50%; background:var(--green);
          box-shadow:0 0 6px var(--green); animation:pulse-green 2s infinite; }
        @keyframes pulse-green { 0%,100%{opacity:1}50%{opacity:0.5} }
        .sk-preview-row { display:flex; align-items:center; justify-content:space-between;
          padding:11px 20px; border-bottom:1px solid rgba(255,255,255,0.05); font-size:13px; }
        .sk-preview-row:last-child { border-bottom:none; }
        .sk-preview-id { font-weight:700; color:rgb(var(--fg)); display:flex; align-items:center; gap:6px; }
        .sk-preview-dot { width:7px; height:7px; border-radius:50%; }
        .sk-preview-dot--active { background:var(--green); box-shadow:0 0 5px var(--green); }
        .sk-preview-dot--eval   { background:#F59E0B; box-shadow:0 0 5px #F59E0B; }
        .sk-preview-svc { display:flex; gap:4px; }
        .sk-preview-badge { font-size:10px; font-weight:700; padding:2px 6px; border-radius:4px; }
        .sk-hero-card-foot { background:rgba(64,156,188,0.06); border-top:1px solid rgba(64,156,188,0.18);
          padding:14px 20px; display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; }
        .sk-foot-stat-val { font-size:18px; font-weight:900; color:var(--sky-blue); line-height:1; }
        .sk-foot-stat-lbl { font-size:10px; color:var(--tx-5); margin-top:2px; }

        /* ── Filter bar ─────────────────────────── */
        .sk-filter-section { background:var(--bg-light); border-bottom:1px solid var(--light-border); padding:0; position:sticky; top:62px; z-index:40; }
        .sk-market-tabs { display:flex; border-bottom:1px solid var(--light-border); }
        .sk-market-tab { flex:1; padding:14px 10px; font-size:13px; font-weight:700; text-align:center; cursor:pointer;
          border:none; background:transparent; color:var(--tx-4); letter-spacing:0.03em; border-bottom:2px solid transparent; transition:all .18s; }
        .sk-market-tab.active { color:var(--teal-primary); border-bottom-color:var(--teal-primary); }
        .sk-market-tab:hover:not(.active) { color:var(--teal-mid); background:rgba(32,101,132,0.04); }
        .sk-svc-chips { display:flex; gap:6px; flex-wrap:wrap; padding:12px 28px; }
        .sk-svc-chip { font-size:11px; font-weight:700; padding:5px 12px; border-radius:99px;
          border:1px solid var(--light-border); color:var(--tx-4); background:transparent; cursor:pointer; transition:all .15s; letter-spacing:0.04em; }
        .sk-svc-chip.active { border-color:transparent; }
        .sk-svc-chip:hover:not(.active) { background:rgba(32,101,132,0.06); border-color:rgba(32,101,132,0.25); }
        .sk-filter-reset { margin-left:auto; font-size:11px; color:var(--tx-5); background:transparent; border:none; cursor:pointer; padding:5px 8px; }
        .sk-filter-reset:hover { color:var(--teal-primary); }

        /* ── Map + grid layout ──────────────────── */
        .sk-browse { padding:56px 0 72px; }
        .sk-browse-grid { display:grid; grid-template-columns:480px 1fr; gap:40px; align-items:start; margin-bottom:52px; }
        .sk-map-wrap { position:sticky; top:148px; background:var(--bg-card); border:1px solid var(--border-dark); border-radius:var(--r-lg); overflow:hidden; }
        .sk-map-hdr { padding:12px 16px; border-bottom:1px solid var(--border-dark); display:flex; align-items:center; justify-content:space-between; background:rgba(64,156,188,0.06); }
        .sk-map-hdr-title { font-size:12px; font-weight:700; color:var(--tx-3); letter-spacing:0.08em; text-transform:uppercase; }
        .sk-zoom-row { display:flex; gap:4px; }
        .sk-zoom-btn { width:26px; height:26px; border-radius:6px; border:1px solid var(--border-dark); background:var(--bg-card); color:var(--tx-3); font-size:16px; line-height:1; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .15s; }
        .sk-zoom-btn:hover { border-color:var(--sky-blue); color:var(--sky-blue); }
        #skHexCanvas { width:100%; display:block; }
        .sk-map-legend { display:flex; gap:14px; flex-wrap:wrap; padding:10px 16px; border-top:1px solid var(--border-dark); }
        .sk-leg-item { display:flex; align-items:center; gap:5px; font-size:11px; color:var(--tx-5); }
        .sk-leg-dot { width:8px; height:8px; border-radius:50%; }

        /* ── Node cards ─────────────────────────── */
        .sk-results-hdr { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; }
        .sk-results-count { font-size:13px; color:var(--tx-4); }
        .sk-results-count strong { color:rgb(var(--fg)); }
        .sk-node-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:14px; }
        .sk-node-card { background:var(--bg-card); border:1px solid var(--border-dark); border-radius:var(--r-md); padding:20px;
          transition:all .2s ease; position:relative; overflow:hidden; }
        .sk-node-card:hover { border-color:rgba(64,156,188,0.40); transform:translateY(-2px); box-shadow:0 8px 28px rgba(32,101,132,0.16); }
        .sk-node-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; border-radius:var(--r-md) var(--r-md) 0 0; background:linear-gradient(90deg,var(--teal-primary),var(--sky-blue)); }
        .sk-node-card-top { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:12px; }
        .sk-node-id { font-size:16px; font-weight:900; color:rgb(var(--fg)); letter-spacing:0.02em; }
        .sk-node-status { display:flex; align-items:center; gap:5px; font-size:10px; font-weight:700; padding:3px 8px; border-radius:99px; }
        .sk-node-status--active { background:rgba(21,153,79,0.12); color:var(--green); }
        .sk-node-status--eval   { background:rgba(245,158,11,0.12); color:#F59E0B; }
        .sk-node-status::before { content:''; width:5px; height:5px; border-radius:50%; background:currentColor; }
        .sk-node-neighborhood { font-size:13px; color:var(--tx-4); margin-bottom:4px; display:flex; align-items:center; gap:5px; }
        .sk-node-market-tag { font-size:10px; font-weight:700; color:var(--tx-5); padding:2px 7px; border-radius:4px; border:1px solid var(--border-dark); background:rgba(var(--fg),0.03); }
        .sk-node-asl { font-size:12px; color:var(--tx-5); margin-bottom:14px; }
        .sk-node-svcs { display:flex; flex-wrap:wrap; gap:5px; margin-bottom:16px; }
        .sk-node-svc { font-size:10px; font-weight:700; padding:3px 8px; border-radius:5px; letter-spacing:0.04em; }
        .sk-node-foot { display:flex; align-items:center; justify-content:space-between; padding-top:12px; border-top:1px solid var(--border-dark); }
        .sk-node-link { font-size:12px; font-weight:700; color:var(--sky-blue); display:flex; align-items:center; gap:5px; text-decoration:none; transition:gap .15s; }
        .sk-node-link:hover { gap:8px; }
        .sk-node-link svg { width:11px; height:11px; }
        .sk-node-elev-lbl { font-size:11px; color:var(--tx-5); }

        /* ── Empty state ────────────────────────── */
        .sk-empty { padding:56px 24px; text-align:center; border:1px dashed var(--border-dark); border-radius:var(--r-lg); }
        .sk-empty-title { font-size:16px; font-weight:700; color:rgb(var(--fg)); margin-bottom:8px; }
        .sk-empty-body { font-size:14px; color:var(--tx-4); margin-bottom:20px; }

        /* ── Can't find section ─────────────────── */
        .sk-cant-find { background:rgba(32,101,132,0.04); border:1px solid var(--border-dark); border-radius:var(--r-lg); padding:40px; display:flex; gap:40px; align-items:center; margin-top:56px; }
        .sk-cant-find-left { flex:1; }
        .sk-cant-find-title { font-size:22px; font-weight:900; color:rgb(var(--fg)); letter-spacing:-0.02em; margin-bottom:10px; }
        .sk-cant-find-title em { font-style:normal; color:var(--sky-blue); }
        .sk-cant-find-body { font-size:14px; color:var(--tx-4); line-height:1.7; }
        .sk-cant-find-btns { display:flex; flex-direction:column; gap:10px; flex-shrink:0; min-width:200px; }

        /* ── Final CTA ──────────────────────────── */
        .sk-final { padding:100px 0; text-align:center; border-top:1px solid var(--border-dark); }
        .sk-final h2 { font-size:clamp(28px,4vw,46px); font-weight:900; letter-spacing:-0.025em; margin-bottom:16px; color:rgb(var(--fg)); }
        .sk-final h2 em { font-style:normal; color:var(--sky-blue); }
        .sk-final p { font-size:16px; color:var(--tx-3); max-width:480px; margin:0 auto 36px; line-height:1.7; }
        .sk-final-btns { display:flex; justify-content:center; gap:12px; flex-wrap:wrap; }

        @media(max-width:1100px){
          .sk-browse-grid { grid-template-columns:1fr; }
          .sk-map-wrap { position:static; }
          #skHexCanvas { max-height:340px; }
        }
        @media(max-width:900px){
          .sk-hero-inner { grid-template-columns:1fr; gap:40px; }
          .sk-node-grid { grid-template-columns:1fr; }
          .sk-cant-find { flex-direction:column; gap:24px; }
          .sk-cant-find-btns { flex-direction:row; min-width:unset; }
        }
        @media(max-width:600px){
          .sk-market-tab { font-size:12px; padding:12px 6px; }
          .sk-svc-chips { padding:10px 16px; }
          .sk-stat-row { gap:20px; }
        }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="sk-hero">
        <canvas ref={heroCanvasRef} id="skHeroCanvas" aria-hidden="true" />
        <div className="sk-hero-scrim" />
        <div className="container">
          <div className="sk-hero-inner">
            <div>
              <div className="city-tags">
                <span className="city-tag">New York</span>
                <span className="city-tag">Connecticut</span>
                <span className="city-tag">Florida</span>
                <span className="city-tag">Illinois</span>
              </div>
              <div className="eyebrow eyebrow--light">The Skynode Network</div>
              <h1 className="sk-hero-h1" style={{fontSize:'clamp(36px,4.8vw,62px)',fontWeight:900,lineHeight:1.08,letterSpacing:'-0.025em',color:'rgb(var(--fg))',marginBottom:'20px'}}>
                Browse the network.<br/><span style={{color:'var(--sky-blue)'}}>Find your node.</span>
              </h1>
              <p className="sk-hero-sub">
                TBC distributed infrastructure nodes across New York, Connecticut, Florida, and Illinois — each evaluated for broadcasting, private communications, edge colocation, AI inference, and private networking.
              </p>
              <div className="sk-stat-row">
                <div className="sk-stat">
                  <div className="sk-stat-val">TBC</div>
                  <div className="sk-stat-lbl">Total nodes</div>
                </div>
                <div className="sk-stat">
                  <div className="sk-stat-val">4</div>
                  <div className="sk-stat-lbl">Metro markets</div>
                </div>
                <div className="sk-stat">
                  <div className="sk-stat-val">7</div>
                  <div className="sk-stat-lbl">Service categories</div>
                </div>
              </div>
            </div>

            <div>
              <div className="sk-hero-card">
                <div className="sk-hero-card-hdr">
                  <span className="sk-hero-card-title">Recent Node Activity</span>
                  <span className="sk-hero-live">Network Active</span>
                </div>
                {[
                  { id:'0302.NY', neighborhood:'Midtown Manhattan',  svcs:['BC','EC','AI'],   status:'active'     },
                  { id:'0488.IL', neighborhood:'Chicago Loop',       svcs:['BC','EC','PC'],   status:'active'     },
                  { id:'0445.FL', neighborhood:'Miami–Dade',         svcs:['BC','P2P'],       status:'active'     },
                  { id:'0089.CT', neighborhood:'New Haven',          svcs:['PC','5G'],        status:'evaluating' },
                  { id:'0133.IL', neighborhood:'Chicago West Loop',  svcs:['EC','5G'],        status:'evaluating' },
                ].map(n => (
                  <div key={n.id} className="sk-preview-row">
                    <div className="sk-preview-id">
                      <span className={`sk-preview-dot sk-preview-dot--${n.status === 'active' ? 'active' : 'eval'}`}/>
                      {n.id}
                      <span style={{fontSize:'12px',color:'var(--tx-5)',fontWeight:400}}>{n.neighborhood}</span>
                    </div>
                    <div className="sk-preview-svc">
                      {(n.svcs as SvcCode[]).map(s => (
                        <span key={s} className="sk-preview-badge" style={{background:SVC_META[s].bg,color:SVC_META[s].color}}>{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="sk-hero-card-foot">
                  <div><div className="sk-foot-stat-val">TBC</div><div className="sk-foot-stat-lbl">Nodes active</div></div>
                  <div><div className="sk-foot-stat-val">TBC</div><div className="sk-foot-stat-lbl">Evaluating</div></div>
                  <div><div className="sk-foot-stat-val">4</div><div className="sk-foot-stat-lbl">Markets</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FILTER BAR ═══ */}
      <div className="sk-filter-section">
        <div className="sk-market-tabs">
          {MARKETS.map(m => (
            <button key={m} className={`sk-market-tab${market === m ? ' active' : ''}`} onClick={() => handleMarketTab(m)}>
              {m}
            </button>
          ))}
        </div>
        <div className="sk-svc-chips">
          <span style={{fontSize:'11px',fontWeight:700,color:'var(--tx-5)',alignSelf:'center',marginRight:'4px',whiteSpace:'nowrap'}}>Filter:</span>
          {ALL_SVCS.map(s => (
            <button
              key={s}
              className={`sk-svc-chip${svcs.includes(s) ? ' active' : ''}`}
              style={svcs.includes(s) ? { background: SVC_META[s].bg, color: SVC_META[s].color, borderColor: 'transparent' } : {}}
              onClick={() => toggleSvc(s)}
            >
              {SVC_META[s].label}
            </button>
          ))}
          {svcs.length > 0 && (
            <button className="sk-filter-reset" onClick={() => setSvcs([])}>Clear filters ×</button>
          )}
        </div>
      </div>

      {/* ═══ BROWSE ═══ */}
      <section className="sk-browse section-dark">
        <div className="container">
          <div className="sk-browse-grid">

            {/* Left: map */}
            <div className="sk-map-wrap reveal">
              <div className="sk-map-hdr">
                <span className="sk-map-hdr-title">
                  Node distribution — {market === 'All' ? CITY_NAMES[cityIdx] : market}
                </span>
                <div className="sk-zoom-row">
                  <button className="sk-zoom-btn" onClick={() => setZoom(z => Math.min(z+0.25, 2.5))}>+</button>
                  <button className="sk-zoom-btn" onClick={() => setZoom(z => Math.max(z-0.25, 0.5))}>−</button>
                </div>
              </div>
              <div style={{padding:'4px 0'}}>
                <div style={{display:'flex',gap:0,borderBottom:'1px solid var(--border-dark)'}}>
                  {CITY_NAMES.map((name, i) => (
                    <button key={name}
                      style={{flex:1,padding:'9px 4px',fontSize:'11px',fontWeight:700,background:'transparent',border:'none',
                        borderBottom:`2px solid ${cityIdx === i ? 'var(--sky-blue)' : 'transparent'}`,
                        color: cityIdx === i ? 'var(--sky-blue)' : 'var(--tx-5)', cursor:'pointer', transition:'all .15s'}}
                      onClick={() => { setCityIdx(i); setMarket(CITY_NAMES[i] as MarketFilter); }}>
                      {name}
                    </button>
                  ))}
                </div>
              </div>
              <canvas ref={hexCanvasRef} id="skHexCanvas" width={480} height={340} />
              <div ref={hexTipRef} className="hex-tip" style={{display:'none'}} />
              <div className="sk-map-legend">
                <div className="sk-leg-item"><span className="sk-leg-dot" style={{background:'#409CBC'}}/> P25 / Radio</div>
                <div className="sk-leg-item"><span className="sk-leg-dot" style={{background:'#6BC0DD'}}/> 5G</div>
                <div className="sk-leg-item"><span className="sk-leg-dot" style={{background:'#5BE49B'}}/> Edge / AI</div>
                <div className="sk-leg-item"><span className="sk-leg-dot" style={{background:'#F59E0B'}}/> Broadcast</div>
              </div>
            </div>

            {/* Right: node cards */}
            <div>
              <div className="sk-results-hdr">
                <div className="sk-results-count">
                  Showing <strong>{filtered.length}</strong> of {NODES.length} nodes
                  {market !== 'All' && <> in <strong>{market}</strong></>}
                  {svcs.length > 0 && <> matching <strong>{svcs.map(s => SVC_META[s].label).join(', ')}</strong></>}
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="sk-empty">
                  <div className="sk-empty-title">No nodes match those filters</div>
                  <div className="sk-empty-body">Try a different market or remove some service filters.</div>
                  <button className="btn btn-outline-dark" onClick={() => { setMarket('All'); setSvcs([]); }}>Reset filters</button>
                </div>
              ) : (
                <div className="sk-node-grid">
                  {filtered.map(node => (
                    <div key={node.id} className="sk-node-card reveal">
                      <div className="sk-node-card-top">
                        <div className="sk-node-id">{node.id}</div>
                        <div className={`sk-node-status sk-node-status--${node.status}`}>
                          {node.status === 'active' ? 'Active' : 'Evaluating'}
                        </div>
                      </div>
                      <div className="sk-node-neighborhood">
                        {node.neighborhood}
                        <span className="sk-node-market-tag">{node.market}</span>
                      </div>
                      <div className="sk-node-asl">Elevation: {node.asl}</div>
                      <div className="sk-node-svcs">
                        {node.services.map(s => (
                          <span key={s} className="sk-node-svc" style={{background:SVC_META[s].bg,color:SVC_META[s].color}}>
                            {SVC_META[s].label}
                          </span>
                        ))}
                      </div>
                      <div className="sk-node-foot">
                        <Link to={`/skynodes/${node.id}`} className="sk-node-link">
                          View node details
                          <svg viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </Link>
                        <Link to="/contact" style={{fontSize:'11px',color:'var(--tx-5)',textDecoration:'none'}}>
                          Inquire →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Can't find what you need */}
              <div className="sk-cant-find reveal">
                <div className="sk-cant-find-left">
                  <div className="sk-cant-find-title">Don't see the right node? <em>Tell us what you need.</em></div>
                  <div className="sk-cant-find-body">
                    Not every node is listed here yet, and the network is growing. If you have a specific market, elevation requirement, or service need — describe it. We'll tell you what we have or what we're evaluating.
                  </div>
                </div>
                <div className="sk-cant-find-btns">
                  <Link to="/contact" className="btn btn-primary" style={{justifyContent:'center'}}>Talk to Skynode</Link>
                  <Link to="/contact" className="btn btn-outline-dark" style={{justifyContent:'center',fontSize:'13px'}}>Submit a building</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Network note */}
          <div style={{borderTop:'1px solid var(--border-dark)',paddingTop:'28px',marginTop:'12px'}}>
            <p style={{fontSize:'12px',color:'var(--tx-6)',lineHeight:'1.7',maxWidth:'640px'}}>
              Node count, elevation data, and service availability are representative of the network in evaluation and active deployment. Actual confirmed figures for specific sites are provided during inquiry. All node listings labeled TBC reflect sites under active evaluation — final specifications confirmed per engagement.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="sk-final section-light">
        <div className="container">
          <div className="eyebrow eyebrow--dark" style={{justifyContent:'center'}}>Ready to Deploy</div>
          <h2>Found your node?<br/><em>Let's make it yours.</em></h2>
          <p>Tell us the node, the service type, and your timeline. We'll confirm availability and move forward.</p>
          <div className="sk-final-btns">
            <Link to="/contact" className="btn btn-primary" style={{padding:'16px 32px',fontSize:'15px'}}>Talk to Skynode</Link>
            <Link to="/contact" className="btn btn-outline-dark" style={{padding:'16px 32px',fontSize:'15px'}}>Submit a Property</Link>
          </div>
        </div>
      </section>
    </>
  );
}
