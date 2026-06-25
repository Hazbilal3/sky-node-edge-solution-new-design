import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import { usePageTitle } from '../../hooks/usePageTitle';

/* ─── Types ──────────────────────────────────────────────────────── */

export type SolutionVertical = 'broadcasting' | 'private-comms' | 'edge-colocation';

export type SolutionConfig = {
  vertical: SolutionVertical;
  breadcrumb: string;
  headline: string;           // use | to split into <em> second half
  heroSub: string;
  heroCard: {
    title: string;
    items: { label: string; value: string }[];
    stat: string;
    statLabel: string;
  };
  trust: {
    eyebrow: string;
    headline: string;
    body: string;
    features: { title: string; body: string }[];
  };
  specs: { label: string; value: string; note?: string }[];
  useCases?: { name: string; body: string; tags: string[] }[];
  related: { name: string; href: string }[];
};

/* ─── Vertical theme ─────────────────────────────────────────────── */

const THEMES: Record<SolutionVertical, {
  primary: string; mid: string; accent: string;
  bg: string; borderAlpha: string; pageLink: string; pageName: string;
}> = {
  'broadcasting': {
    primary:'#7C3AED', mid:'#9D5FF0', accent:'#C4B5FD',
    bg:'rgba(124,58,237,0.12)', borderAlpha:'rgba(124,58,237,0.30)',
    pageLink:'/broadcasting', pageName:'Broadcasting',
  },
  'private-comms': {
    primary:'#206584', mid:'#2D85B5', accent:'#6BC0DD',
    bg:'rgba(64,156,188,0.12)', borderAlpha:'rgba(64,156,188,0.30)',
    pageLink:'/private-communications', pageName:'Private Communications',
  },
  'edge-colocation': {
    primary:'#15993F', mid:'#21C55D', accent:'#5BE49B',
    bg:'rgba(91,228,155,0.12)', borderAlpha:'rgba(91,228,155,0.30)',
    pageLink:'/edge-colocation', pageName:'Edge Colocation',
  },
};

/* ─── Helpers ───────────────────────────────────────────────────── */

function formatHeadline(headline: string): string {
  const parts = headline.split('|');
  if (parts.length < 2) return headline;
  return parts[0] + '<br/><em>' + parts[1] + '</em>';
}

/* ─── Component ──────────────────────────────────────────────────── */

export default function SolutionPage({ cfg }: { cfg: SolutionConfig }) {
  const t = THEMES[cfg.vertical];
  useReveal();
  usePageTitle(cfg.breadcrumb);

  const [h1main, h1em] = cfg.headline.split('|');

  return (
    <>
      <style>{`
        .sp-accent { color:${t.accent}; }
        .sp-bg     { background:${t.bg}; }
        .sp-border { border-color:${t.borderAlpha}; }

        .sp-hero { padding:120px 0 80px; position:relative; overflow:hidden; }
        .sp-hero::before { content:''; position:absolute; inset:0;
          background:radial-gradient(ellipse 60% 70% at 75% 45%, ${t.bg} 0%, transparent 65%); pointer-events:none; }
        .sp-hero-inner { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; position:relative; }
        .sp-hero h1 { font-size:clamp(32px,4.5vw,58px); font-weight:900; line-height:1.08; letter-spacing:-0.026em; color:rgb(var(--fg)); margin-bottom:20px; }
        .sp-hero-sub { font-size:16px; color:var(--tx-3); line-height:1.78; margin-bottom:36px; max-width:520px; }
        .sp-hero-actions { display:flex; gap:12px; flex-wrap:wrap; }

        .sp-hero-card { background:var(--bg-card-glass); border:1px solid ${t.borderAlpha}; border-radius:var(--r-lg); overflow:hidden; backdrop-filter:blur(10px); }
        .sp-card-hdr { padding:14px 20px; border-bottom:1px solid ${t.borderAlpha}; background:${t.bg}; }
        .sp-card-hdr-title { font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:${t.accent}; }
        .sp-card-item { display:flex; justify-content:space-between; align-items:center; padding:12px 20px; border-bottom:1px solid rgba(255,255,255,0.05); font-size:13px; }
        .sp-card-item:last-of-type { border-bottom:none; }
        .sp-card-label { color:var(--tx-4); }
        .sp-card-value { font-weight:700; color:rgb(var(--fg)); text-align:right; max-width:55%; }
        .sp-card-foot { padding:16px 20px; background:${t.bg}; border-top:1px solid ${t.borderAlpha}; display:flex; gap:16px; }
        .sp-card-stat-val { font-size:22px; font-weight:900; color:${t.accent}; line-height:1; }
        .sp-card-stat-lbl { font-size:11px; color:var(--tx-5); margin-top:3px; }

        .sp-trust { padding:96px 0; }
        .sp-trust-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; }
        .sp-trust-h2 { font-size:clamp(26px,3.4vw,42px); font-weight:900; line-height:1.12; letter-spacing:-0.025em; color:var(--light-text); margin-bottom:16px; }
        .sp-trust-h2 em { font-style:normal; color:${t.primary}; }
        .sp-trust-body { font-size:15px; color:var(--light-muted); line-height:1.8; margin-bottom:0; }
        .sp-features { display:flex; flex-direction:column; gap:14px; }
        .sp-feature { display:flex; gap:14px; padding:18px 20px; background:var(--bg-light-card); border:1px solid var(--light-border); border-radius:var(--r-md); }
        .sp-feature-icon { width:36px; height:36px; border-radius:var(--r-sm); background:${t.bg}; border:1px solid ${t.borderAlpha}; display:flex; align-items:center; justify-content:center; color:${t.accent}; flex-shrink:0; }
        .sp-feature-icon svg { width:16px; height:16px; }
        .sp-feature-title { font-size:14px; font-weight:700; color:var(--light-text); margin-bottom:3px; }
        .sp-feature-body  { font-size:13px; color:var(--light-muted); line-height:1.65; }

        .sp-specs { padding:80px 0; border-top:1px solid var(--border-dark); }
        .sp-specs-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:16px; margin-top:40px; }
        .sp-spec-card { background:var(--bg-card); border:1px solid var(--border-dark); border-radius:var(--r-md); padding:20px; }
        .sp-spec-label { font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--tx-5); margin-bottom:8px; }
        .sp-spec-value { font-size:18px; font-weight:900; color:${t.accent}; line-height:1.2; }
        .sp-spec-note  { font-size:11px; color:var(--tx-6); margin-top:5px; font-style:italic; }

        .sp-usecases { padding:80px 0; border-top:1px solid var(--border-dark); }
        .sp-uc-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; margin-top:40px; }
        .sp-uc-card { background:var(--bg-card); border:1px solid var(--border-dark); border-radius:var(--r-lg); padding:24px; position:relative; overflow:hidden; transition:all .2s; }
        .sp-uc-card:hover { border-color:${t.borderAlpha}; transform:translateY(-2px); }
        .sp-uc-card::after { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,${t.primary},${t.accent}); }
        .sp-uc-name { font-size:15px; font-weight:700; color:rgb(var(--fg)); margin-bottom:9px; }
        .sp-uc-body { font-size:13px; color:var(--tx-4); line-height:1.7; margin-bottom:14px; }
        .sp-uc-tags { display:flex; flex-wrap:wrap; gap:5px; }
        .sp-uc-tag  { font-size:10px; font-weight:700; padding:3px 8px; border-radius:5px; background:${t.bg}; color:${t.accent}; }

        .sp-related { padding:80px 0; border-top:1px solid var(--border-dark); }
        .sp-related-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; margin-top:36px; }
        .sp-related-card { display:flex; align-items:center; justify-content:space-between; padding:16px 20px; background:rgba(var(--fg),0.02); border:1px solid var(--border-dark); border-radius:var(--r-md); text-decoration:none; color:rgb(var(--fg)); transition:all .18s; }
        .sp-related-card:hover { border-color:${t.borderAlpha}; background:${t.bg}; }
        .sp-related-name { font-size:14px; font-weight:600; }

        .sp-final { padding:96px 0; text-align:center; border-top:1px solid var(--border-dark); }
        .sp-final h2 { font-size:clamp(28px,3.8vw,48px); font-weight:900; letter-spacing:-0.025em; color:rgb(var(--fg)); margin-bottom:16px; }
        .sp-final p { font-size:16px; color:var(--tx-3); max-width:480px; margin:0 auto 36px; line-height:1.75; }
        .sp-final-btns { display:flex; justify-content:center; gap:12px; flex-wrap:wrap; }

        @media(max-width:860px){
          .sp-hero-inner,.sp-trust-grid { grid-template-columns:1fr; gap:40px; }
        }
      `}</style>

      {/* ═══ BREADCRUMB ═══ */}
      <div style={{padding:'16px 0',borderBottom:'1px solid var(--border-dark)',background:'var(--bg-credibility)'}}>
        <div className="container" style={{display:'flex',gap:'8px',alignItems:'center',fontSize:'13px',color:'var(--tx-5)'}}>
          <Link to="/solutions" style={{color:'var(--tx-4)',textDecoration:'none'}}>Solutions</Link>
          <span>›</span>
          <Link to={t.pageLink} style={{color:'var(--tx-4)',textDecoration:'none'}}>{t.pageName}</Link>
          <span>›</span>
          <span style={{color:'rgb(var(--fg))'}}>{cfg.breadcrumb}</span>
        </div>
      </div>

      {/* ═══ HERO ═══ */}
      <section className="sp-hero section-dark">
        <div className="container">
          <div className="sp-hero-inner">
            <div>
              <div className="eyebrow eyebrow--light" style={{color:t.accent}}>
                <span style={{display:'inline-block',width:'20px',height:'1.5px',background:t.accent,marginRight:'10px',verticalAlign:'middle'}}/>
                {t.pageName}
              </div>
              <h1>
                {h1main}
                {h1em && <><br/><span style={{color:t.accent}}>{h1em}</span></>}
              </h1>
              <p className="sp-hero-sub">{cfg.heroSub}</p>
              <div className="sp-hero-actions">
                <Link to="/skynodes" className="btn btn-primary">Browse Nodes for This Use Case</Link>
                <Link to="/contact"  className="btn btn-outline-light">Talk to Skynode</Link>
              </div>
            </div>

            <div>
              <div className="sp-hero-card">
                <div className="sp-card-hdr">
                  <div className="sp-card-hdr-title">{cfg.heroCard.title}</div>
                </div>
                {cfg.heroCard.items.map((item, i) => (
                  <div key={i} className="sp-card-item">
                    <span className="sp-card-label">{item.label}</span>
                    <span className="sp-card-value">{item.value}</span>
                  </div>
                ))}
                <div className="sp-card-foot">
                  <div>
                    <div className="sp-card-stat-val">{cfg.heroCard.stat}</div>
                    <div className="sp-card-stat-lbl">{cfg.heroCard.statLabel}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST SECTION ═══ */}
      <section className="sp-trust section-light">
        <div className="container">
          <div className="sp-trust-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow--dark">{cfg.trust.eyebrow}</div>
              <h2 className="sp-trust-h2" dangerouslySetInnerHTML={{__html: formatHeadline(cfg.trust.headline)}} />
              <p className="sp-trust-body">{cfg.trust.body}</p>
            </div>
            <div className="sp-features reveal">
              {cfg.trust.features.map((f, i) => (
                <div key={i} className="sp-feature">
                  <div className="sp-feature-icon">
                    <svg viewBox="0 0 18 18" fill="none"><path d="M3 9l5 5 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <div className="sp-feature-title">{f.title}</div>
                    <div className="sp-feature-body">{f.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SPECS ═══ */}
      {cfg.specs.length > 0 && (
        <section className="sp-specs section-dark">
          <div className="container">
            <div className="reveal">
              <div className="eyebrow eyebrow--light">Site Specifications</div>
              <h2 style={{fontSize:'clamp(24px,3vw,38px)',fontWeight:900,letterSpacing:'-0.022em',lineHeight:1.12,color:'rgb(var(--fg))',marginBottom:'8px'}}>
                What to expect from a <span style={{color:t.accent}}>{cfg.breadcrumb.toLowerCase()}.</span>
              </h2>
              <p style={{fontSize:'13px',color:'var(--tx-5)',fontStyle:'italic'}}>All specifications are TBC and confirmed per engagement during site evaluation.</p>
            </div>
            <div className="sp-specs-grid">
              {cfg.specs.map((s, i) => (
                <div key={i} className="sp-spec-card reveal">
                  <div className="sp-spec-label">{s.label}</div>
                  <div className="sp-spec-value">{s.value}</div>
                  {s.note && <div className="sp-spec-note">{s.note}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ USE CASES ═══ */}
      {cfg.useCases && cfg.useCases.length > 0 && (
        <section className="sp-usecases section-light">
          <div className="container">
            <div className="reveal">
              <div className="eyebrow eyebrow--dark">Who Uses This</div>
              <h2 style={{fontSize:'clamp(24px,3vw,38px)',fontWeight:900,letterSpacing:'-0.022em',lineHeight:1.12,color:'var(--light-text)',marginBottom:'14px'}}>
                Applications for the <em style={{fontStyle:'normal',color:t.primary}}>{cfg.breadcrumb.toLowerCase()}.</em>
              </h2>
            </div>
            <div className="sp-uc-grid">
              {cfg.useCases.map((uc, i) => (
                <div key={i} className="sp-uc-card reveal">
                  <div className="sp-uc-name">{uc.name}</div>
                  <div className="sp-uc-body">{uc.body}</div>
                  <div className="sp-uc-tags">{uc.tags.map(tag => <span key={tag} className="sp-uc-tag">{tag}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ RELATED SOLUTIONS ═══ */}
      {cfg.related.length > 0 && (
        <section className="sp-related section-dark">
          <div className="container">
            <div className="reveal">
              <div className="eyebrow eyebrow--light">Related Solutions</div>
              <h2 style={{fontSize:'clamp(22px,2.8vw,34px)',fontWeight:900,letterSpacing:'-0.022em',lineHeight:1.12,color:'rgb(var(--fg))',marginBottom:'14px'}}>
                Other <span style={{color:t.accent}}>{t.pageName.toLowerCase()}</span> solutions.
              </h2>
            </div>
            <div className="sp-related-grid">
              {cfg.related.map((r, i) => (
                <Link key={i} to={r.href} className="sp-related-card">
                  <span className="sp-related-name">{r.name}</span>
                  <svg viewBox="0 0 12 12" fill="none" width="12" height="12" style={{color:'var(--tx-5)',flexShrink:0}}>
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              ))}
              <Link to={t.pageLink} className="sp-related-card" style={{borderStyle:'dashed',color:'var(--tx-4)'}}>
                <span className="sp-related-name" style={{fontStyle:'italic'}}>Back to {t.pageName} overview →</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══ FINAL CTA ═══ */}
      <section className="sp-final section-light">
        <div className="container">
          <div className="eyebrow eyebrow--dark" style={{justifyContent:'center'}}>Ready to Deploy</div>
          <h2 style={{color:'var(--light-text)'}}>Tell us what you need.<br/><span style={{color:t.primary}}>We'll find your site.</span></h2>
          <p style={{color:'var(--light-muted)'}}>Describe your market, technical requirements, and timeline. A real person reviews every inquiry within one business day.</p>
          <div className="sp-final-btns">
            <Link to="/contact"  className="btn btn-primary"      style={{padding:'16px 32px',fontSize:'15px'}}>Talk to Skynode</Link>
            <Link to="/skynodes" className="btn btn-outline-dark" style={{padding:'16px 32px',fontSize:'15px'}}>Browse All Nodes</Link>
          </div>
        </div>
      </section>
    </>
  );
}

