import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { usePageTitle } from '../hooks/usePageTitle';

const VALUES = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" width="22" height="22"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: 'Infrastructure that lasts',
    body: 'We build things properly the first time. Every node is evaluated, documented, and deployed with long-term reliability in mind — not just to close a deal.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" width="22" height="22"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
    title: 'Operators first',
    body: 'Our customers are engineers and operators who need things to work. We speak their language, hold ourselves to their standards, and deliver what we say we will.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" width="22" height="22"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.6"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
    title: 'Small team, real ownership',
    body: 'Skynode is an early-stage company. The people who join now will shape how this platform grows — with direct responsibility across markets, customers, and product.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" width="22" height="22"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: 'High standards, low politics',
    body: 'We hire people who want to do good work and be done with it. No layers, no unnecessary process — just the right people solving real problems.',
  },
];

const DISCIPLINES = [
  { label: 'RF & Broadcast Engineering',     icon: '📡' },
  { label: 'Network Infrastructure',          icon: '🔌' },
  { label: 'Business Development & Sales',    icon: '📈' },
  { label: 'Market Operations',               icon: '🗺️' },
  { label: 'Software & Platform Engineering', icon: '💻' },
  { label: 'Permitting & Compliance',         icon: '📋' },
];

export default function Careers() {
  useReveal();
  usePageTitle('Careers');

  return (
    <>
      <style>{`
        .careers-hero { padding:120px 0 80px; background:linear-gradient(160deg,rgba(var(--bg-base),1) 0%,rgba(32,101,132,0.07) 60%,rgba(var(--bg-base),1) 100%); }
        .careers-hero h1 { font-size:clamp(34px,5vw,62px); font-weight:900; line-height:1.07; letter-spacing:-0.028em; color:rgb(var(--fg)); margin-bottom:20px; }
        .careers-hero h1 em { font-style:normal; color:var(--sky-blue); }
        .careers-hero-sub { font-size:17px; color:var(--tx-3); line-height:1.78; max-width:580px; }

        .careers-no-openings { padding:80px 0; }
        .careers-no-openings-inner { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
        .careers-badge { display:inline-flex; align-items:center; gap:8px; padding:8px 16px; border-radius:999px; background:rgba(91,228,155,0.10); border:1px solid rgba(91,228,155,0.25); font-size:12px; font-weight:700; color:var(--teal-accent); letter-spacing:.07em; text-transform:uppercase; margin-bottom:24px; }
        .careers-badge-dot { width:7px; height:7px; border-radius:50%; background:var(--teal-accent); animation:pulse-dot 2s infinite; }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(0.8)} }
        .careers-no-openings h2 { font-size:clamp(24px,3.2vw,40px); font-weight:900; letter-spacing:-0.022em; line-height:1.12; color:rgb(var(--fg)); margin-bottom:16px; }
        .careers-no-openings h2 em { font-style:normal; color:var(--sky-blue); }
        .careers-no-openings p { font-size:15px; color:var(--tx-3); line-height:1.78; margin-bottom:28px; }
        .careers-notify-card { background:rgba(var(--fg),0.03); border:1px solid var(--border-dark); border-radius:var(--r-lg); padding:28px 32px; }
        .careers-notify-card h3 { font-size:15px; font-weight:700; color:rgb(var(--fg)); margin-bottom:8px; }
        .careers-notify-card p { font-size:13px; color:var(--tx-4); line-height:1.7; margin-bottom:16px; }

        .careers-values { padding:80px 0; }
        .careers-values-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:24px; margin-top:48px; }
        .careers-value-card { padding:28px; background:rgba(var(--fg),0.02); border:1px solid var(--border-dark); border-radius:var(--r-lg); transition:border-color .18s; }
        .careers-value-card:hover { border-color:rgba(64,156,188,0.3); }
        .careers-value-icon { width:44px; height:44px; border-radius:var(--r-md); background:rgba(64,156,188,0.10); display:flex; align-items:center; justify-content:center; color:var(--sky-blue); margin-bottom:16px; }
        .careers-value-title { font-size:15px; font-weight:700; color:rgb(var(--fg)); margin-bottom:8px; }
        .careers-value-body { font-size:13px; color:var(--tx-4); line-height:1.72; }

        .careers-disciplines { padding:72px 0; }
        .careers-disciplines-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:40px; }
        .careers-discipline-pill { display:flex; align-items:center; gap:12px; padding:16px 20px; background:rgba(var(--fg),0.02); border:1px solid var(--border-dark); border-radius:var(--r-md); font-size:13px; font-weight:600; color:var(--tx-3); transition:all .18s; }
        .careers-discipline-pill:hover { background:rgba(var(--fg),0.04); color:rgb(var(--fg)); border-color:rgba(64,156,188,0.25); }
        .careers-discipline-icon { font-size:18px; }

        .careers-cta { padding:100px 0; text-align:center; }
        .careers-cta h2 { font-size:clamp(26px,3.5vw,44px); font-weight:900; letter-spacing:-0.025em; color:rgb(var(--fg)); margin-bottom:16px; }
        .careers-cta h2 em { font-style:normal; color:var(--sky-blue); }
        .careers-cta p { font-size:16px; color:var(--tx-3); max-width:480px; margin:0 auto 36px; line-height:1.75; }
        .careers-cta-btns { display:flex; justify-content:center; gap:12px; flex-wrap:wrap; }

        @media(max-width:860px){
          .careers-no-openings-inner { grid-template-columns:1fr; gap:40px; }
          .careers-values-grid { grid-template-columns:1fr; }
          .careers-disciplines-grid { grid-template-columns:repeat(2,1fr); }
        }
        @media(max-width:520px){
          .careers-disciplines-grid { grid-template-columns:1fr; }
        }
      `}</style>

      {/* HERO */}
      <section className="careers-hero section-dark">
        <div className="container">
          <div className="eyebrow eyebrow--light">Careers at Skynode</div>
          <h1>Build the infrastructure<br/><em>cities run on.</em></h1>
          <p className="careers-hero-sub">Skynode is building a distributed network of urban infrastructure nodes across broadcast, private communications, and edge computing. We're a small team doing work that matters — and we're growing carefully.</p>
        </div>
      </section>

      {/* NO OPENINGS */}
      <section className="careers-no-openings section-light">
        <div className="container">
          <div className="careers-no-openings-inner reveal">
            <div>
              <div className="careers-badge">
                <span className="careers-badge-dot" />
                Hiring status
              </div>
              <h2>No open positions<br/><em>at this time.</em></h2>
              <p>We don't hire to fill headcount — we hire when we find the right person for a specific need. Positions will be posted here when they open. Check back, or reach out directly if you think you belong here.</p>
              <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
                <Link to="/contact" className="btn btn-primary">Send a speculative application</Link>
                <a href="https://www.linkedin.com/company/skynode-partners" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">Follow on LinkedIn</a>
              </div>
            </div>
            <div className="careers-notify-card">
              <h3>Interested in future roles?</h3>
              <p>Send us a note through the contact form — tell us what you do, what kind of work you're looking for, and why Skynode. We read every message and keep strong candidates on file when something opens up.</p>
              <Link to="/contact" className="btn btn-outline-dark btn-sm" style={{width:'100%',justifyContent:'center'}}>
                Get in touch →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="careers-values section-dark">
        <div className="container">
          <div className="reveal">
            <div className="eyebrow eyebrow--light">How we work</div>
            <h2 style={{fontSize:'clamp(24px,3vw,38px)',fontWeight:900,letterSpacing:'-0.022em',color:'rgb(var(--fg))',marginBottom:'8px',lineHeight:1.12}}>What working at Skynode looks like.</h2>
            <p style={{fontSize:'15px',color:'var(--tx-3)',maxWidth:'560px',lineHeight:1.75}}>We're early-stage, technically demanding, and operating in markets where precision matters. Here's what we value in the people we work with.</p>
          </div>
          <div className="careers-values-grid">
            {VALUES.map((v, i) => (
              <div key={i} className="careers-value-card reveal">
                <div className="careers-value-icon">{v.icon}</div>
                <div className="careers-value-title">{v.title}</div>
                <div className="careers-value-body">{v.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section className="careers-disciplines section-light">
        <div className="container reveal">
          <div className="eyebrow">Areas we hire in</div>
          <h2 style={{fontSize:'clamp(22px,2.8vw,34px)',fontWeight:900,letterSpacing:'-0.02em',color:'rgb(var(--fg))',marginBottom:'10px',lineHeight:1.13}}>The disciplines that keep Skynode running.</h2>
          <p style={{fontSize:'15px',color:'var(--tx-3)',maxWidth:'520px',lineHeight:1.75}}>When we do hire, it's typically across these areas. If your background touches any of these and you're interested in the work we do, reach out.</p>
          <div className="careers-disciplines-grid">
            {DISCIPLINES.map((d, i) => (
              <div key={i} className="careers-discipline-pill">
                <span className="careers-discipline-icon">{d.icon}</span>
                {d.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="careers-cta section-dark">
        <div className="container">
          <div className="eyebrow eyebrow--light" style={{justifyContent:'center'}}>Think you belong here?</div>
          <h2>Don't wait for a job post.<br/><em>Reach out.</em></h2>
          <p>The best hires we'll make probably won't happen through a job listing. If you do serious work in infrastructure, RF engineering, or network operations — we want to hear from you.</p>
          <div className="careers-cta-btns">
            <Link to="/contact" className="btn btn-primary" style={{padding:'16px 32px',fontSize:'15px'}}>Send us a note</Link>
            <a href="https://www.linkedin.com/company/skynode-partners" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light" style={{padding:'16px 32px',fontSize:'15px'}}>LinkedIn</a>
          </div>
        </div>
      </section>
    </>
  );
}
