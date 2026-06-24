import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

const VERTICALS = [
  {
    slug: 'broadcasting',
    label: 'Broadcasting',
    color: '#C4B5FD',
    bg: 'rgba(124,58,237,0.10)',
    accent: '#7C3AED',
    icon: <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><circle cx="12" cy="13" r="3" fill="currentColor"/><path d="M7.5 8.5a6.5 6.5 0 0 0 0 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M16.5 8.5a6.5 6.5 0 0 1 0 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M4.5 5.5a11 11 0 0 0 0 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/><path d="M19.5 5.5a11 11 0 0 1 0 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/></svg>,
    headline: 'FM, TV, LPFM, Translator, Backup & Auxiliary',
    body: 'Broadcast-rated Skynodes for primary transmission, backup sites, translator relays, and auxiliary services. Evaluated for RF environment, structural loading, and backhaul — not just available rooftop footage.',
    solutions: [
      { name: 'FM Primary Transmission Site',     href: '/solutions/broadcast-primary-site'    },
      { name: 'Television Broadcast Site',         href: '/solutions/broadcast-tv-site'          },
      { name: 'LPFM Transmitter Site',             href: '/solutions/broadcast-lpfm-site'        },
      { name: 'Translator & Booster Site',         href: '/solutions/broadcast-translator-site'  },
      { name: 'Broadcast Backup & Auxiliary Site', href: '/solutions/broadcast-backup-site'      },
    ],
    pageLink: '/broadcasting',
  },
  {
    slug: 'private-comms',
    label: 'Private Communications',
    color: '#6BC0DD',
    bg: 'rgba(64,156,188,0.10)',
    accent: '#206584',
    icon: <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.7"/><path d="M7.5 8.5a6 6 0 0 0 0 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M16.5 8.5a6 6 0 0 1 0 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M4.5 5.5a10.5 10.5 0 0 0 0 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/><path d="M19.5 5.5a10.5 10.5 0 0 1 0 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/></svg>,
    headline: 'P25, Simulcast, P2P, Private 5G & Office-to-Office',
    body: 'Infrastructure for government and public safety radio, private 5G, point-to-point data links, simulcast networks, and secure enterprise connectivity — evaluated for RF path, backhaul, and long-term maintainability.',
    solutions: [
      { name: 'Two-Way Radio Transmitter Site',   href: '/solutions/two-way-radio-transmitter' },
      { name: 'Two-Way Radio Receiver Site',      href: '/solutions/two-way-radio-receiver'    },
      { name: 'Simulcast Radio Network',          href: '/solutions/simulcast-radio'           },
      { name: 'Secure Office-to-Office Network',  href: '/solutions/office-to-office'          },
      { name: 'Point-to-Point Data Links',        href: '/solutions/point-to-point-links'      },
    ],
    pageLink: '/private-communications',
  },
  {
    slug: 'edge-colocation',
    label: 'Edge Colocation',
    color: '#5BE49B',
    bg: 'rgba(91,228,155,0.10)',
    accent: '#15993F',
    icon: <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7"/><path d="M7 10h10M7 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="17" cy="14" r="1.5" fill="currentColor"/></svg>,
    headline: 'GPU Compute, CDN, AI Inference & Network Infrastructure',
    body: 'Secure edge colocation for AI inference, GPU workloads, content delivery, and network equipment — distributed across metropolitan nodes at real urban elevation with power, cooling, and redundant backhaul.',
    solutions: [
      { name: 'AI Inference & GPU Compute Node', href: '/edge-colocation/ai-inference'         },
      { name: 'Content Delivery & CDN Node',     href: '/solutions/cdn-edge-node'              },
      { name: 'Network Equipment Colocation',    href: '/solutions/network-colocation'         },
      { name: 'Enterprise Edge Compute',         href: '/solutions/enterprise-edge'            },
    ],
    pageLink: '/edge-colocation',
  },
  {
    slug: 'experimental',
    label: 'Experimental Systems',
    color: '#FCD34D',
    bg: 'rgba(252,211,77,0.10)',
    accent: '#B45309',
    icon: <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><path d="M9 3h6M10 3v6l-4 9h12l-4-9V3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    headline: 'UAS, AI Sensing, AR, Smart City & IoT',
    body: 'Elevated distributed nodes for drone operations, AI spatial sensing, augmented reality, smart-city infrastructure, and utility metering — with the access and compliance path already cleared.',
    solutions: [
      { name: 'Drone & UAS Operations',      href: '/contact' },
      { name: 'AI Spatial Sensing',          href: '/contact' },
      { name: 'Smart City Infrastructure',   href: '/contact' },
      { name: 'Utility Metering & IoT',      href: '/contact' },
    ],
    pageLink: '/experimental',
  },
];

const METRO_FABRIC = {
  headline: 'Metro Fabric — the interconnect layer',
  body: 'A single node solves a proximity problem. Metro Fabric connects your nodes into a coordinated network — dedicated point-to-point backhaul, redundant paths, and automatic failover across every market Skynode serves.',
  link: '/metro-fabric',
};

export default function Solutions() {
  useReveal();

  return (
    <>
      <style>{`
        .sol-hero { padding:120px 0 80px; background:linear-gradient(160deg,rgba(var(--bg-base),1) 0%,rgba(32,101,132,0.06) 60%,rgba(var(--bg-base),1) 100%); }
        .sol-hero h1 { font-size:clamp(36px,5vw,64px); font-weight:900; line-height:1.07; letter-spacing:-0.028em; color:rgb(var(--fg)); margin-bottom:20px; }
        .sol-hero h1 em { font-style:normal; color:var(--sky-blue); }
        .sol-hero-sub { font-size:17px; color:var(--tx-3); line-height:1.78; max-width:600px; margin-bottom:0; }
        .sol-hero-actions { display:flex; gap:12px; flex-wrap:wrap; margin-top:36px; }

        .sol-verticals { padding:80px 0 96px; }
        .sol-vertical { margin-bottom:72px; }
        .sol-vertical:last-child { margin-bottom:0; }
        .sol-v-grid { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start; }
        .sol-v-icon { width:52px; height:52px; border-radius:var(--r-md); display:flex; align-items:center; justify-content:center; margin-bottom:20px; }
        .sol-v-eyebrow { font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:10px; }
        .sol-v-h2 { font-size:clamp(22px,2.8vw,34px); font-weight:900; letter-spacing:-0.022em; line-height:1.13; color:rgb(var(--fg)); margin-bottom:14px; }
        .sol-v-body { font-size:15px; color:var(--tx-3); line-height:1.78; margin-bottom:22px; }
        .sol-v-link { display:inline-flex; align-items:center; gap:6px; font-size:13px; font-weight:700; text-decoration:none; padding:9px 18px; border-radius:var(--r-btn); border:1px solid; transition:all .18s; }

        .sol-solution-list { display:flex; flex-direction:column; gap:10px; }
        .sol-solution-item { display:flex; align-items:center; justify-content:space-between; padding:16px 20px; background:rgba(var(--fg),0.02); border:1px solid var(--border-dark); border-radius:var(--r-md); text-decoration:none; color:rgb(var(--fg)); transition:all .18s; }
        .sol-solution-item:hover { background:rgba(var(--fg),0.04); border-color:rgba(64,156,188,0.35); }
        .sol-solution-name { font-size:14px; font-weight:600; }
        .sol-solution-arrow { color:var(--tx-5); transition:transform .15s; }
        .sol-solution-item:hover .sol-solution-arrow { transform:translateX(3px); color:var(--sky-blue); }

        .sol-divider { border:none; border-top:1px solid var(--border-dark); margin:64px 0; }

        .sol-metro-band { background:linear-gradient(135deg,var(--bg-callout-1),var(--bg-callout-2),var(--bg-callout-3)); border-top:1px solid var(--border-accent); border-bottom:1px solid var(--border-accent); padding:72px 0; }
        .sol-metro-inner { display:grid; grid-template-columns:1fr auto; gap:64px; align-items:center; }
        .sol-metro-h2 { font-size:clamp(24px,3.2vw,40px); font-weight:900; letter-spacing:-0.022em; color:rgb(var(--fg)); margin-bottom:14px; }
        .sol-metro-h2 em { font-style:normal; color:var(--sky-blue); }
        .sol-metro-body { font-size:15px; color:var(--tx-3); line-height:1.75; max-width:560px; }

        .sol-final { padding:100px 0; text-align:center; }
        .sol-final h2 { font-size:clamp(28px,3.8vw,48px); font-weight:900; letter-spacing:-0.025em; color:rgb(var(--fg)); margin-bottom:16px; }
        .sol-final h2 em { font-style:normal; color:var(--sky-blue); }
        .sol-final p { font-size:16px; color:var(--tx-3); max-width:480px; margin:0 auto 36px; line-height:1.75; }
        .sol-final-btns { display:flex; justify-content:center; gap:12px; flex-wrap:wrap; }

        @media(max-width:860px){ .sol-v-grid,.sol-metro-inner { grid-template-columns:1fr; gap:40px; } }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="sol-hero section-dark">
        <div className="container">
          <div className="eyebrow eyebrow--light">Solutions</div>
          <h1>Every vertical.<br/><em>One infrastructure platform.</em></h1>
          <p className="sol-hero-sub">Skynode nodes are evaluated and rated across four infrastructure verticals — broadcasting, private communications, edge colocation, and experimental systems. Browse by use case or start with the Skynodes catalog.</p>
          <div className="sol-hero-actions">
            <Link to="/skynodes" className="btn btn-primary">Browse All Nodes</Link>
            <Link to="/contact"  className="btn btn-outline-light">Talk to Skynode</Link>
          </div>
        </div>
      </section>

      {/* ═══ VERTICALS ═══ */}
      <section className="sol-verticals section-light">
        <div className="container">
          {VERTICALS.map((v, vi) => (
            <div key={v.slug} className="sol-vertical reveal">
              <div className="sol-v-grid">
                <div>
                  <div className="sol-v-icon" style={{background:v.bg}}>
                    <span style={{color:v.color}}>{v.icon}</span>
                  </div>
                  <div className="sol-v-eyebrow" style={{color:v.color}}>{v.label}</div>
                  <h2 className="sol-v-h2">{v.headline}</h2>
                  <p className="sol-v-body">{v.body}</p>
                  <Link to={v.pageLink} className="sol-v-link"
                    style={{color:v.color, borderColor:`${v.color}44`, background:`${v.bg}`}}>
                    Go to {v.label} page
                    <svg viewBox="0 0 12 12" fill="none" width="11" height="11"><path d="M2 6h8M5 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </div>
                <div className="sol-solution-list">
                  {v.solutions.map((s, si) => (
                    <Link key={si} to={s.href} className="sol-solution-item">
                      <span className="sol-solution-name">{s.name}</span>
                      <svg className="sol-solution-arrow" viewBox="0 0 12 12" fill="none" width="12" height="12">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  ))}
                  <Link to="/skynodes" className="sol-solution-item" style={{borderStyle:'dashed',color:'var(--tx-4)'}}>
                    <span className="sol-solution-name" style={{fontStyle:'italic'}}>Browse all {v.label.toLowerCase()} nodes →</span>
                  </Link>
                </div>
              </div>
              {vi < VERTICALS.length - 1 && <hr className="sol-divider"/>}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ METRO FABRIC BAND ═══ */}
      <div className="sol-metro-band">
        <div className="container">
          <div className="sol-metro-inner reveal">
            <div>
              <div className="eyebrow eyebrow--light">Metro Fabric</div>
              <h2 className="sol-metro-h2">{METRO_FABRIC.headline.replace(' — ', '.\n').split('\n').map((l,i) => i===0 ? l : <><br/><em key={i}>{l}</em></>)}</h2>
              <p className="sol-metro-body">{METRO_FABRIC.body}</p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'12px',alignItems:'flex-start',flexShrink:0}}>
              <Link to="/metro-fabric" className="btn btn-primary">Learn About Metro Fabric</Link>
              <Link to="/skynodes"     className="btn btn-outline-light">Browse Connected Nodes</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ FINAL CTA ═══ */}
      <section className="sol-final section-dark">
        <div className="container">
          <div className="eyebrow eyebrow--light" style={{justifyContent:'center'}}>Not Sure Where to Start?</div>
          <h2>Tell us what you need.<br/><em>We'll find the right node.</em></h2>
          <p>Describe your market, service type, and what you're trying to accomplish. A real person reviews every inquiry within one business day.</p>
          <div className="sol-final-btns">
            <Link to="/contact"  className="btn btn-primary"       style={{padding:'16px 32px',fontSize:'15px'}}>Talk to Skynode</Link>
            <Link to="/skynodes" className="btn btn-outline-light" style={{padding:'16px 32px',fontSize:'15px'}}>Browse All Nodes</Link>
          </div>
        </div>
      </section>
    </>
  );
}
