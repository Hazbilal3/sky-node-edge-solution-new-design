import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { usePageTitle } from '../hooks/usePageTitle';

const VALUES = [
  { title: 'Operators first', body: 'We build infrastructure. We understand what it means to have a transmitter go down at 2am. The people who work here are comfortable with that reality.' },
  { title: 'Honest about what we are', body: 'Skynode is a company building real infrastructure in real markets. We aren\'t a software company that happens to touch hardware, and we don\'t pretend to be.' },
  { title: 'Long-term view', body: 'Infrastructure companies that succeed do so over years and decades, not quarters. We think and act accordingly — including in how we hire and grow.' },
  { title: 'Technical depth matters', body: 'The work requires people who understand RF propagation, physical infrastructure operations, urban real estate, and network architecture. We value deep knowledge.' },
];

export default function Careers() {
  useReveal();
  usePageTitle('Careers');

  return (
    <>
      <style>{`
        .cr-hero { padding:112px 0 80px; }
        .cr-hero h1 { font-size:clamp(32px,4.4vw,56px); font-weight:900; line-height:1.09; letter-spacing:-0.026em; color:rgb(var(--fg)); margin-bottom:18px; }
        .cr-hero-sub { font-size:17px; color:var(--tx-3); line-height:1.78; max-width:580px; margin-bottom:36px; }

        .cr-values { padding:80px 0; border-top:1px solid var(--border-dark); }
        .cr-values-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:16px; margin-top:44px; }
        .cr-value-card  { padding:24px; border:1px solid var(--light-border); border-radius:var(--r-lg); background:var(--bg-light-card); }
        .cr-value-title { font-size:15px; font-weight:800; color:var(--light-text); margin-bottom:9px; }
        .cr-value-body  { font-size:13px; color:var(--light-muted); line-height:1.72; }

        .cr-roles { padding:80px 0; border-top:1px solid var(--border-dark); }
        .cr-roles-note { max-width:600px; padding:36px 40px; border:1px solid var(--border-dark); border-radius:var(--r-lg); background:rgba(var(--fg),0.02); }
        .cr-roles-note h3 { font-size:20px; font-weight:800; color:rgb(var(--fg)); margin-bottom:12px; }
        .cr-roles-note p  { font-size:15px; color:var(--tx-3); line-height:1.8; margin-bottom:20px; }

        .cr-areas { padding:80px 0; border-top:1px solid var(--border-dark); }
        .cr-areas-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; margin-top:40px; }
        .cr-area { padding:20px 22px; border:1px solid var(--border-dark); border-radius:var(--r-md); background:rgba(var(--fg),0.02); }
        .cr-area-title { font-size:14px; font-weight:700; color:rgb(var(--fg)); margin-bottom:5px; }
        .cr-area-body  { font-size:12px; color:var(--tx-5); line-height:1.65; }

        .cr-cta { padding:88px 0; text-align:center; }
        .cr-cta h2 { font-size:clamp(26px,3.4vw,44px); font-weight:900; letter-spacing:-0.024em; color:rgb(var(--fg)); margin-bottom:14px; }
        .cr-cta p  { font-size:16px; color:var(--tx-3); max-width:480px; margin:0 auto 32px; line-height:1.8; }
      `}</style>

      {/* Hero */}
      <section className="cr-hero section-dark">
        <div className="container">
          <div className="reveal">
            <div className="eyebrow eyebrow--light">Careers</div>
            <h1>Build the infrastructure<br/>layer with us.</h1>
            <p className="cr-hero-sub">
              Skynode is building a distributed vertical infrastructure network across major US metropolitan markets. The work is technical, operational, and long-term. If that sounds like where you want to spend your energy, read on.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="cr-values section-light">
        <div className="container">
          <div className="reveal">
            <div className="eyebrow eyebrow--dark">Who We Are</div>
            <h2 style={{fontSize:'clamp(24px,3vw,38px)',fontWeight:900,letterSpacing:'-0.023em',color:'var(--light-text)',lineHeight:1.12,marginBottom:'12px'}}>
              What working here<br/>actually looks like.
            </h2>
            <p style={{fontSize:'15px',color:'var(--light-muted)',maxWidth:'520px',lineHeight:1.8,marginBottom:0}}>
              Skynode is an infrastructure company at an early stage of building something that takes a long time to build. The people who thrive here are comfortable with that — and excited by it.
            </p>
          </div>
          <div className="cr-values-grid">
            {VALUES.map((v, i) => (
              <div key={i} className="cr-value-card reveal">
                <div className="cr-value-title">{v.title}</div>
                <div className="cr-value-body">{v.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current roles */}
      <section className="cr-roles section-dark">
        <div className="container">
          <div className="reveal">
            <div className="eyebrow eyebrow--light">Open Positions</div>
            <h2 style={{fontSize:'clamp(24px,3vw,38px)',fontWeight:900,letterSpacing:'-0.023em',color:'rgb(var(--fg))',lineHeight:1.12,marginBottom:'32px'}}>
              Where we're hiring.
            </h2>
          </div>
          <div className="cr-roles-note reveal">
            <h3>No open roles posted right now.</h3>
            <p>
              Skynode is at an early stage and we hire deliberately rather than at volume. When roles open, we post them here and reach out to people we already know in the network. If you think you should be on that list — send us a note anyway.
            </p>
            <Link to="/contact" className="btn btn-primary">Send a Note</Link>
          </div>
        </div>
      </section>

      {/* Areas we hire in */}
      <section className="cr-areas section-light">
        <div className="container">
          <div className="reveal">
            <div className="eyebrow eyebrow--dark">Areas We Hire In</div>
            <h2 style={{fontSize:'clamp(22px,2.8vw,34px)',fontWeight:900,letterSpacing:'-0.022em',color:'var(--light-text)',lineHeight:1.12,marginBottom:'12px'}}>
              The disciplines that build Skynode.
            </h2>
          </div>
          <div className="cr-areas-grid">
            {[
              { title:'RF & Broadcast Engineering', body:'Tower engineering, broadcast systems, RF propagation modeling, and FCC regulatory work.' },
              { title:'Private Communications', body:'P25, DMR, simulcast system design, LMR infrastructure, and public safety radio.' },
              { title:'Network & Edge Infrastructure', body:'Network architecture, edge compute deployment, microwave path engineering.' },
              { title:'Real Estate & Site Acquisition', body:'Urban real estate, zoning and permitting, property owner relationships, site development.' },
              { title:'Operations & Site Management', body:'Field operations, site maintenance, vendor coordination, asset tracking.' },
              { title:'Business Development', body:'Operator relationships, partner development, market expansion in broadcast, comms, and edge.' },
            ].map((a, i) => (
              <div key={i} className="cr-area reveal">
                <div className="cr-area-title">{a.title}</div>
                <div className="cr-area-body">{a.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cr-cta section-dark">
        <div className="container">
          <div className="eyebrow eyebrow--light" style={{justifyContent:'center'}}>Get in Touch</div>
          <h2>Interested in what<br/><span style={{color:'var(--teal-accent)'}}>Skynode is building?</span></h2>
          <p>Send us a note about your background and what you want to work on. We read every message and respond when there's a relevant opportunity.</p>
          <div style={{display:'flex',justifyContent:'center',gap:'12px',flexWrap:'wrap'}}>
            <Link to="/contact" className="btn btn-primary" style={{padding:'16px 32px',fontSize:'15px'}}>Send a Note</Link>
            <Link to="/about"   className="btn btn-outline-light" style={{padding:'16px 32px',fontSize:'15px'}}>About Skynode</Link>
          </div>
        </div>
      </section>
    </>
  );
}
