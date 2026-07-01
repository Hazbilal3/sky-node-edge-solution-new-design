import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { usePageTitle } from '../hooks/usePageTitle';

const VALUES = [
  { title: 'Operators first',        body: 'We built this for the people who actually deploy networks — RF engineers, broadcast operators, IT teams, and edge infrastructure managers. Every decision is made with their constraints in mind.' },
  { title: 'Infrastructure honesty', body: 'We will tell you honestly if a node is not right for your application. We would rather lose a deal than oversell a site and create a problem we have to live with for years.' },
  { title: 'Compliance as a feature',body: 'Permits, structural assessments, and municipal approvals are not obstacles we navigate around — they are part of the product. Clean documentation, managed end to end.' },
  { title: 'Long-term alignment',    body: 'Our model works when sites succeed over time. That means we care about the quality and longevity of every deployment, not just the first transaction.' },
];

const STATS = [
  { val: '99',  lbl: 'Managed node locations'       },
  { val: '4',   lbl: 'Metro markets'                },
  { val: '40+', lbl: 'Combined years rooftop experience' },
  { val: '7',   lbl: 'Service categories supported' },
];

export default function About() {
  useReveal();
  usePageTitle('About');

  return (
    <>
      <style>{`
        .about-hero { padding:120px 0 96px; }
        .about-hero h1 { font-size:clamp(36px,5vw,64px); font-weight:900; line-height:1.07; letter-spacing:-0.028em; color:rgb(var(--fg)); margin-bottom:22px; }
        .about-hero h1 em { font-style:normal; color:var(--sky-blue); }
        .about-hero-sub { font-size:18px; color:var(--tx-3); line-height:1.78; max-width:680px; }
        .about-stat-row { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; margin-top:64px; padding-top:48px; border-top:1px solid var(--border-dark); }
        .about-stat { display:flex; flex-direction:column; gap:6px; }
        .about-stat-val { font-size:36px; font-weight:900; color:var(--sky-blue); line-height:1; }
        .about-stat-lbl { font-size:12px; color:var(--tx-4); line-height:1.5; }

        .about-mission { padding:96px 0; }
        .about-mission-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; }
        .about-mission-h2 { font-size:clamp(26px,3.4vw,42px); font-weight:900; line-height:1.12; letter-spacing:-0.025em; color:var(--light-text); margin-bottom:20px; }
        .about-mission-h2 em { font-style:normal; color:var(--teal-primary); }
        .about-mission-body { font-size:15px; color:var(--light-muted); line-height:1.82; margin-bottom:18px; }

        .about-values { padding:96px 0; border-top:1px solid var(--border-dark); border-bottom:1px solid var(--border-dark); }
        .about-values-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:56px; }
        .about-value-card { background:rgba(var(--fg),0.02); border:1px solid var(--border-dark); border-radius:var(--r-lg); padding:32px; position:relative; overflow:hidden; }
        .about-value-card::after { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,var(--teal-primary),var(--sky-blue)); }
        .about-value-title { font-size:17px; font-weight:700; color:rgb(var(--fg)); margin-bottom:10px; }
        .about-value-body  { font-size:14px; color:var(--tx-4); line-height:1.75; }

        .about-network { padding:96px 0; }
        .about-network-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; }
        .about-network-h2 { font-size:clamp(26px,3.4vw,42px); font-weight:900; line-height:1.12; letter-spacing:-0.025em; color:rgb(var(--fg)); margin-bottom:20px; }
        .about-network-h2 em { font-style:normal; color:var(--sky-blue); }

        .about-market-cards { display:flex; flex-direction:column; gap:12px; }
        .about-market-card { display:flex; align-items:center; justify-content:space-between; padding:18px 22px; background:rgba(var(--fg),0.02); border:1px solid var(--border-dark); border-radius:var(--r-md); text-decoration:none; transition:all .18s; }
        .about-market-card:hover { border-color:rgba(64,156,188,0.35); background:rgba(64,156,188,0.04); }
        .about-market-name { font-size:15px; font-weight:700; color:rgb(var(--fg)); }
        .about-market-svcs { font-size:12px; color:var(--tx-4); margin-top:2px; }
        .about-market-arrow { color:var(--tx-5); }

        .about-final { padding:100px 0; text-align:center; border-top:1px solid var(--border-dark); }
        .about-final h2 { font-size:clamp(28px,3.8vw,48px); font-weight:900; letter-spacing:-0.025em; color:rgb(var(--fg)); margin-bottom:16px; }
        .about-final h2 em { font-style:normal; color:var(--sky-blue); }
        .about-final p { font-size:16px; color:var(--tx-3); max-width:480px; margin:0 auto 36px; line-height:1.75; }
        .about-final-btns { display:flex; justify-content:center; gap:12px; flex-wrap:wrap; }

        @media(max-width:860px){
          .about-mission-grid,.about-values-grid,.about-network-grid { grid-template-columns:1fr; gap:40px; }
          .about-stat-row { grid-template-columns:1fr 1fr; gap:20px; }
        }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="about-hero section-dark">
        <div className="container">
          <div className="eyebrow eyebrow--light">About Skynode</div>
          <h1>Urban infrastructure<br/>for the networks<br/><em>that matter most.</em></h1>
          <p className="about-hero-sub">Skynode is a distributed infrastructure platform operating elevated, connected nodes across metropolitan markets — purpose-built for broadcasting, private communications, edge colocation, and emerging systems.</p>
          <div className="about-stat-row">
            {STATS.map((s, i) => (
              <div key={i} className="about-stat reveal">
                <div className="about-stat-val">{s.val}</div>
                <div className="about-stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MISSION ═══ */}
      <section className="about-mission section-light">
        <div className="container">
          <div className="about-mission-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow--dark">What We Do</div>
              <h2 className="about-mission-h2">We make urban rooftops<br/><em>work for the people who build networks.</em></h2>
            </div>
            <div className="reveal">
              <p className="about-mission-body">The modern metropolitan area is full of buildings with rooftops, mechanical rooms, and back-of-house spaces that sit idle — while network operators struggle to find good infrastructure. The shortage is not space. It is qualified, managed, compliant space with the right elevation, backhaul, and technical characteristics.</p>
              <p className="about-mission-body">Skynode solves that mismatch. We identify, evaluate, and operate elevated urban nodes — and we manage the regulatory, structural, and operational complexity that makes most owners reluctant to host communications infrastructure in the first place.</p>
              <p className="about-mission-body">The result is a distributed infrastructure platform that lets broadcasters, communications operators, edge compute teams, and enterprise IT deploy faster, with better sites, and less of the friction that has historically made urban infrastructure so difficult.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="about-values section-dark">
        <div className="container">
          <div className="section-header-center reveal" style={{textAlign:'left',margin:'0 0 56px'}}>
            <div className="eyebrow eyebrow--light">How We Work</div>
            <h2 style={{fontSize:'clamp(26px,3.4vw,42px)',fontWeight:900,letterSpacing:'-0.025em',lineHeight:1.12,color:'rgb(var(--fg))',marginBottom:'14px'}}>
              The principles behind<br/><span style={{color:'var(--sky-blue)'}}>every site we operate.</span>
            </h2>
          </div>
          <div className="about-values-grid">
            {VALUES.map((v, i) => (
              <div key={i} className="about-value-card reveal">
                <div className="about-value-title">{v.title}</div>
                <div className="about-value-body">{v.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NETWORK ═══ */}
      <section className="about-network section-light">
        <div className="container">
          <div className="about-network-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow--dark">The Network</div>
              <h2 className="about-network-h2">Operating in the markets<br/><em>where networks are built.</em></h2>
              <p style={{fontSize:'15px',color:'var(--light-muted)',lineHeight:1.8,marginBottom:'20px'}}>Skynode currently operates in New York, Connecticut, Florida, and Illinois — four of the most active markets for broadcasting, private communications, and edge infrastructure in the United States.</p>
              <p style={{fontSize:'15px',color:'var(--light-muted)',lineHeight:1.8,marginBottom:'32px'}}>Each market has a portfolio of nodes evaluated for the specific technical and regulatory environment of that city — not a generic template applied everywhere.</p>
              <Link to="/skynodes" className="btn btn-outline-dark">
                Browse the Full Node Network
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
            <div className="about-market-cards reveal">
              {[
                { name:'New York',    svcs:'Broadcasting · Private Comms · Edge Colocation · AI/Inference · P2P', href:'/markets/new-york'    },
                { name:'Connecticut', svcs:'Broadcasting · Private Comms · P25 · IoT',                            href:'/markets/connecticut'  },
                { name:'Florida',     svcs:'Broadcasting · Private Comms · Edge Colocation · P2P',                href:'/markets/florida'      },
                { name:'Illinois',    svcs:'Broadcasting · Edge Colocation · Private 5G · AI/Inference',          href:'/markets/illinois'     },
              ].map((m, i) => (
                <Link key={i} to={m.href} className="about-market-card">
                  <div>
                    <div className="about-market-name">{m.name}</div>
                    <div className="about-market-svcs">{m.svcs}</div>
                  </div>
                  <svg className="about-market-arrow" viewBox="0 0 12 12" fill="none" width="12" height="12">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROPERTY OWNERS ═══ */}
      <div className="callout-band">
        <div className="container">
          <div className="callout-inner reveal">
            <div>
              <div className="eyebrow eyebrow--light">For Property Owners</div>
              <h2 className="callout-h2">Your building could be<br/><em>part of the network.</em></h2>
              <p className="callout-body">Skynode partners with commercial, residential, and mixed-use building owners across its target markets — turning underutilized rooftop and mechanical space into long-term recurring revenue, with all permitting and compliance managed by Skynode.</p>
              <div className="callout-actions">
                <Link to="/property-owners" className="btn btn-primary">Learn About the Partner Model</Link>
                <Link to="/contact"         className="btn btn-outline-dark">Evaluate My Building</Link>
              </div>
            </div>
            <div className="metric-stack">
              <div className="metric-item"><span className="metric-lbl">Building types</span><span className="metric-val">Commercial · Residential · Mixed-use · Industrial</span></div>
              <div className="metric-item"><span className="metric-lbl">Permitting managed by Skynode</span><span className="metric-val">Local · State · Federal</span></div>
              <div className="metric-item"><span className="metric-lbl">Revenue model</span><span className="metric-val">Recurring, aligned with site success</span></div>
              <div className="metric-item"><span className="metric-lbl">Access coordination</span><span className="metric-val">Managed, scheduled, discreet</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ FINAL CTA ═══ */}
      <section className="about-final section-dark">
        <div className="container">
          <div className="eyebrow eyebrow--light" style={{justifyContent:'center'}}>Work With Skynode</div>
          <h2>Ready to talk infrastructure?<br/><em>So are we.</em></h2>
          <p>Whether you need a node, own a building, or want to understand what the network looks like in your market — the conversation starts here.</p>
          <div className="about-final-btns">
            <Link to="/contact"  className="btn btn-primary"       style={{padding:'16px 32px',fontSize:'15px'}}>Talk to Skynode</Link>
            <Link to="/skynodes" className="btn btn-outline-light" style={{padding:'16px 32px',fontSize:'15px'}}>Browse the Network</Link>
          </div>
        </div>
      </section>
    </>
  );
}
