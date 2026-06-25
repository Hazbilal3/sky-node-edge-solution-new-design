import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { usePageTitle } from '../hooks/usePageTitle';

const PARTNER_TYPES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 12v4M10 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'System Integrators',
    body: 'RF engineers, systems integrators, and technical consultants who build and manage broadcast, private communications, and edge infrastructure for their clients. Skynode gives your team qualified vertical assets to complete deployments faster and with better site data.',
    cta: 'Discuss a current project',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
        <path d="M3 3h18v6H3V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M3 15h18v6H3v-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M7 9v6M12 9v6M17 9v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Technology Vendors',
    body: 'Radio system manufacturers, broadcast equipment vendors, edge compute hardware companies, and networking technology providers whose customers need real vertical infrastructure to deploy their products. Skynode nodes are where your equipment gets installed.',
    cta: 'Explore a partnership',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Infrastructure Owners',
    body: 'Property owners, building managers, and real estate operators who want to understand the Skynode model and explore whether properties in their portfolio qualify as Skynode node candidates. The conversation starts with a property assessment.',
    cta: 'Learn about hosting a node',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Resellers & Consultants',
    body: 'Consultants and resellers who work with broadcast operators, private communications teams, or enterprise edge teams and want to bring Skynode into their client engagements. We work with partners who add value to the relationship.',
    cta: 'Start a conversation',
  },
];

export default function Partners() {
  useReveal();
  usePageTitle('Partners');

  return (
    <>
      <style>{`
        .pt-hero { padding:112px 0 80px; }
        .pt-hero h1 { font-size:clamp(32px,4.4vw,56px); font-weight:900; line-height:1.09; letter-spacing:-0.026em; color:rgb(var(--fg)); margin-bottom:18px; }
        .pt-hero-sub { font-size:17px; color:var(--tx-3); line-height:1.78; max-width:580px; margin-bottom:36px; }

        .pt-types { padding:80px 0; border-top:1px solid var(--border-dark); }
        .pt-types-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:20px; margin-top:48px; }
        .pt-type-card { padding:28px; border:1px solid var(--border-dark); border-radius:var(--r-lg); background:rgba(var(--fg),0.02); transition:all .2s; position:relative; overflow:hidden; }
        .pt-type-card:hover { border-color:rgba(64,156,188,0.4); transform:translateY(-2px); }
        .pt-type-card::after { content:''; position:absolute; top:0;left:0;right:0;height:2px; background:linear-gradient(90deg,var(--teal-primary),var(--sky-blue)); opacity:0; transition:.2s; }
        .pt-type-card:hover::after { opacity:1; }
        .pt-icon { width:44px; height:44px; border-radius:var(--r-md); background:rgba(64,156,188,0.12); border:1px solid rgba(64,156,188,0.25); display:flex; align-items:center; justify-content:center; color:var(--teal-accent); margin-bottom:16px; }
        .pt-type-title { font-size:17px; font-weight:800; color:rgb(var(--fg)); margin-bottom:10px; }
        .pt-type-body  { font-size:14px; color:var(--tx-4); line-height:1.72; margin-bottom:18px; }
        .pt-type-cta   { font-size:13px; font-weight:700; color:var(--teal-accent); text-decoration:none; display:inline-flex; align-items:center; gap:5px; }
        .pt-type-cta:hover { color:var(--sky-blue); }

        .pt-note { padding:72px 0; border-top:1px solid var(--border-dark); border-bottom:1px solid var(--border-dark); }
        .pt-note-inner { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
        .pt-note h2 { font-size:clamp(24px,3vw,38px); font-weight:900; letter-spacing:-0.023em; color:'var(--light-text)'; line-height:1.12; margin-bottom:16px; }
        .pt-note p  { font-size:15px; color:var(--light-muted); line-height:1.8; }
        .pt-commitments { display:flex; flex-direction:column; gap:12px; }
        .pt-commitment  { display:flex; gap:12px; align-items:flex-start; padding:14px 16px; border:1px solid var(--light-border); border-radius:var(--r-md); background:var(--bg-light-card); }
        .pt-check { width:22px; height:22px; border-radius:50%; background:rgba(64,156,188,0.15); display:flex; align-items:center; justify-content:center; color:var(--teal-accent); flex-shrink:0; margin-top:1px; }
        .pt-commitment-text { font-size:14px; color:var(--light-text); line-height:1.6; }

        .pt-cta { padding:88px 0; text-align:center; }
        .pt-cta h2 { font-size:clamp(26px,3.4vw,44px); font-weight:900; letter-spacing:-0.024em; color:rgb(var(--fg)); margin-bottom:14px; }
        .pt-cta p  { font-size:16px; color:var(--tx-3); max-width:460px; margin:0 auto 32px; line-height:1.8; }

        @media(max-width:860px){ .pt-note-inner { grid-template-columns:1fr; gap:36px; } }
      `}</style>

      {/* Hero */}
      <section className="pt-hero section-dark">
        <div className="container">
          <div className="reveal">
            <div className="eyebrow eyebrow--light">Partners</div>
            <h1>Work with Skynode.</h1>
            <p className="pt-hero-sub">
              Skynode works with integrators, technology vendors, property owners, and consultants who are building or enabling infrastructure across the markets we serve. If you are working with clients who need what Skynode provides, let's talk.
            </p>
            <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
              <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
              <Link to="/skynodes" className="btn btn-outline-light">Browse the Network</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partner types */}
      <section className="pt-types section-light">
        <div className="container">
          <div className="reveal">
            <div className="eyebrow eyebrow--dark">Who We Work With</div>
            <h2 style={{fontSize:'clamp(24px,3vw,38px)',fontWeight:900,letterSpacing:'-0.023em',color:'var(--light-text)',lineHeight:1.12,marginBottom:'12px'}}>
              Partners who bring value<br/>to the relationship.
            </h2>
            <p style={{fontSize:'15px',color:'var(--light-muted)',maxWidth:'520px',lineHeight:1.8,marginBottom:0}}>
              Skynode partner engagements are practical, not program-driven — if you are working on deployments where Skynode infrastructure would be a fit, the conversation starts with what you're building.
            </p>
          </div>
          <div className="pt-types-grid">
            {PARTNER_TYPES.map((pt, i) => (
              <div key={i} className="pt-type-card reveal">
                <div className="pt-icon">{pt.icon}</div>
                <div className="pt-type-title">{pt.title}</div>
                <div className="pt-type-body">{pt.body}</div>
                <Link to="/contact" className="pt-type-cta">
                  {pt.cta}
                  <svg viewBox="0 0 12 12" fill="none" width="11" height="11"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we partner */}
      <section className="pt-note section-light">
        <div className="container">
          <div className="pt-note-inner">
            <div className="reveal">
              <div className="eyebrow eyebrow--dark">How Skynode Partners</div>
              <h2 style={{color:'var(--light-text)'}}>Practical partnerships, not partner programs.</h2>
              <p>Skynode doesn't run a formal partner program with tiers, certifications, or co-marketing requirements. If you're working on infrastructure deployments that Skynode nodes would help complete — for broadcast, private communications, edge, or any combination — reach out directly and we'll work out the right structure for what you're building.</p>
            </div>
            <div className="pt-commitments reveal">
              {[
                'Skynode is transparent about what our sites can and cannot support — no overpromising during the pre-sales process.',
                'We provide site data early so partners and their clients can make informed decisions before committing to engagements.',
                'Technical contacts at Skynode are accessible throughout a deployment — not just during the sales process.',
                'Partner referrals are acknowledged and respected. We don\'t circumvent relationships to work directly with end clients.',
              ].map((c, i) => (
                <div key={i} className="pt-commitment">
                  <div className="pt-check">
                    <svg viewBox="0 0 12 12" fill="none" width="12" height="12"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div className="pt-commitment-text">{c}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-cta section-dark">
        <div className="container">
          <div className="eyebrow eyebrow--light" style={{justifyContent:'center'}}>Start the Conversation</div>
          <h2>Tell us what you're<br/><span style={{color:'var(--teal-accent)'}}>building together.</span></h2>
          <p>Describe the deployment, the client, and the infrastructure gap. We'll respond within one business day.</p>
          <div style={{display:'flex',justifyContent:'center',gap:'12px',flexWrap:'wrap'}}>
            <Link to="/contact"  className="btn btn-primary"      style={{padding:'16px 32px',fontSize:'15px'}}>Contact Skynode</Link>
            <Link to="/about"    className="btn btn-outline-light" style={{padding:'16px 32px',fontSize:'15px'}}>About Skynode</Link>
          </div>
        </div>
      </section>
    </>
  );
}
