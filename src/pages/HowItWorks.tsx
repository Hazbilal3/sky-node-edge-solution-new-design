import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { usePageTitle } from '../hooks/usePageTitle';

const STEPS_CUSTOMER = [
  {
    n: '01',
    title: 'Browse the network or tell us what you need',
    body: 'Start at the Skynodes catalog and filter by market and service type — or skip straight to the contact form and describe your deployment. Either way, you end up in the same place: a conversation with a real person who understands your requirements.',
  },
  {
    n: '02',
    title: 'We match your requirements to available nodes',
    body: 'A Skynode team member reviews your inquiry within one business day and identifies which nodes in our portfolio fit your technical requirements — elevation, backhaul, service type, market, and any compliance considerations specific to your application.',
  },
  {
    n: '03',
    title: 'Site evaluation and qualification',
    body: 'For serious deployments, we conduct a formal site evaluation that covers RF path assessment, structural loading review, backhaul options, power availability, and regulatory requirements for your specific application and market.',
  },
  {
    n: '04',
    title: 'Agreement and access coordination',
    body: 'Once a site is qualified, Skynode coordinates the access agreement, permitting, structural assessment if required, and all building coordination. Our goal is to get you to a signed agreement with a clear installation timeline as quickly as the permitting allows.',
  },
  {
    n: '05',
    title: 'Installation and go-live',
    body: 'Skynode manages installation access and coordinates with building operations. Your equipment goes in on a managed schedule, with controlled access and minimal disruption. Post-installation, Skynode continues to manage the site relationship.',
  },
  {
    n: '06',
    title: 'Ongoing site management',
    body: 'The relationship doesn\'t end at go-live. Skynode maintains the site relationship, manages ongoing access for maintenance, handles any regulatory renewals, and serves as the point of contact between you and the building for the life of the deployment.',
  },
];

const STEPS_OWNER = [
  {
    n: '01',
    title: 'Submit your building for evaluation',
    body: 'Share the basics — location, building type, and what space you have available. Skynode reviews every inquiry and will tell you honestly whether your building is a strong candidate before anyone commits to anything.',
  },
  {
    n: '02',
    title: 'Site assessment',
    body: 'If your building looks promising, Skynode conducts a site assessment that covers elevation, structural characteristics, power availability, space configuration, and RF environment. The assessment is managed by Skynode at no cost to the building owner.',
  },
  {
    n: '03',
    title: 'Permitting and approval',
    body: 'Skynode manages the entire regulatory process — local permits, structural filings, state requirements, and any federal considerations. Clean documentation is maintained for ownership and counsel throughout. The building owner is kept informed without being burdened.',
  },
  {
    n: '04',
    title: 'Agreement and installation',
    body: 'The lease or license agreement is structured to protect the building and create aligned, recurring revenue for the owner. Installation is planned and staged to minimize disruption to tenants and building operations.',
  },
  {
    n: '05',
    title: 'Ongoing partnership',
    body: 'Skynode manages the tenant relationship, access coordination, and ongoing compliance. The building owner receives recurring income without ongoing operational burden. As demand for distributed infrastructure grows, so does the value of a well-managed site.',
  },
];

export default function HowItWorks() {
  useReveal();
  usePageTitle('How It Works');

  return (
    <>
      <style>{`
        .hiw-hero { padding:120px 0 80px; }
        .hiw-hero h1 { font-size:clamp(36px,5vw,64px); font-weight:900; line-height:1.07; letter-spacing:-0.028em; color:rgb(var(--fg)); margin-bottom:20px; }
        .hiw-hero h1 em { font-style:normal; color:var(--sky-blue); }
        .hiw-hero-sub { font-size:17px; color:var(--tx-3); line-height:1.78; max-width:600px; }
        .hiw-track-tabs { display:flex; gap:0; border:1px solid var(--border-dark); border-radius:var(--r-md); overflow:hidden; width:fit-content; margin-top:40px; }
        .hiw-track-tab { padding:12px 24px; font-size:14px; font-weight:700; background:transparent; border:none; color:var(--tx-4); cursor:pointer; transition:all .18s; }
        .hiw-track-tab.active { background:var(--sky-blue); color:rgb(var(--bg-base)); }

        .hiw-process { padding:80px 0; }
        .hiw-process-grid { display:grid; grid-template-columns:320px 1fr; gap:72px; align-items:start; }
        .hiw-track-header { position:sticky; top:90px; }
        .hiw-track-h2 { font-size:clamp(22px,2.8vw,34px); font-weight:900; letter-spacing:-0.022em; line-height:1.13; color:var(--light-text); margin-bottom:14px; }
        .hiw-track-h2 em { font-style:normal; color:var(--teal-primary); }
        .hiw-track-desc { font-size:14px; color:var(--light-muted); line-height:1.75; margin-bottom:28px; }
        .hiw-jump { font-size:13px; color:var(--teal-primary); font-weight:600; text-decoration:underline; }

        .hiw-steps { display:flex; flex-direction:column; gap:0; }
        .hiw-step { display:flex; gap:24px; padding:32px 0; border-bottom:1px solid var(--border-dark); }
        .hiw-step:last-child { border-bottom:none; }
        .hiw-step-left { display:flex; flex-direction:column; align-items:center; gap:0; flex-shrink:0; width:40px; }
        .hiw-step-n { width:36px; height:36px; border-radius:50%; background:rgba(64,156,188,0.12); border:1.5px solid rgba(64,156,188,0.35); display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:900; color:var(--sky-blue); flex-shrink:0; }
        .hiw-step-line { width:1.5px; flex:1; background:var(--border-dark); margin-top:8px; min-height:40px; }
        .hiw-step:last-child .hiw-step-line { display:none; }
        .hiw-step-title { font-size:17px; font-weight:700; color:rgb(var(--fg)); margin-bottom:10px; }
        .hiw-step-body  { font-size:14px; color:var(--tx-4); line-height:1.78; }

        .hiw-divider { border:none; border-top:1px solid var(--border-dark); margin:0; }

        .hiw-faq { padding:96px 0; }
        .hiw-faq-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:56px; }
        .hiw-faq-item { background:rgba(var(--fg),0.02); border:1px solid var(--border-dark); border-radius:var(--r-md); padding:28px; }
        .hiw-faq-q { font-size:15px; font-weight:700; color:rgb(var(--fg)); margin-bottom:10px; }
        .hiw-faq-a { font-size:13px; color:var(--tx-4); line-height:1.78; }

        .hiw-final { padding:100px 0; text-align:center; border-top:1px solid var(--border-dark); }
        .hiw-final h2 { font-size:clamp(28px,3.8vw,48px); font-weight:900; letter-spacing:-0.025em; color:rgb(var(--fg)); margin-bottom:16px; }
        .hiw-final h2 em { font-style:normal; color:var(--sky-blue); }
        .hiw-final p { font-size:16px; color:var(--tx-3); max-width:480px; margin:0 auto 36px; line-height:1.75; }
        .hiw-final-btns { display:flex; justify-content:center; gap:12px; flex-wrap:wrap; }

        @media(max-width:860px){
          .hiw-process-grid { grid-template-columns:1fr; gap:40px; }
          .hiw-track-header { position:static; }
          .hiw-faq-grid { grid-template-columns:1fr; }
        }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="hiw-hero section-dark">
        <div className="container">
          <div className="eyebrow eyebrow--light">How It Works</div>
          <h1>From inquiry to deployment.<br/><em>Here's the process.</em></h1>
          <p className="hiw-hero-sub">Whether you're deploying infrastructure or offering a building, Skynode manages the complexity end to end — from site evaluation through permitting, installation, and ongoing management.</p>
        </div>
      </section>

      {/* ═══ CUSTOMER PROCESS ═══ */}
      <section className="hiw-process section-light" id="customer">
        <div className="container">
          <div className="hiw-process-grid">
            <div className="hiw-track-header reveal">
              <div className="eyebrow eyebrow--dark">For Network Operators</div>
              <h2 className="hiw-track-h2">How to deploy<br/><em>on a Skynode.</em></h2>
              <p className="hiw-track-desc">From first inquiry to live deployment — what to expect, in the order it happens.</p>
              <Link to="/contact" className="btn btn-primary" style={{display:'inline-flex',marginBottom:'14px'}}>Start an Inquiry</Link>
              <br/>
              <a href="#owner" className="hiw-jump">For property owners, see below ↓</a>
            </div>
            <div className="hiw-steps">
              {STEPS_CUSTOMER.map((s, i) => (
                <div key={i} className="hiw-step reveal">
                  <div className="hiw-step-left">
                    <div className="hiw-step-n">{s.n}</div>
                    <div className="hiw-step-line"/>
                  </div>
                  <div>
                    <div className="hiw-step-title">{s.title}</div>
                    <div className="hiw-step-body">{s.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="hiw-divider"/>

      {/* ═══ PROPERTY OWNER PROCESS ═══ */}
      <section className="hiw-process section-light" id="owner">
        <div className="container">
          <div className="hiw-process-grid">
            <div className="hiw-track-header reveal">
              <div className="eyebrow eyebrow--dark">For Property Owners</div>
              <h2 className="hiw-track-h2">How to partner<br/><em>with Skynode.</em></h2>
              <p className="hiw-track-desc">What happens when you submit your building — and what Skynode handles so you don't have to.</p>
              <Link to="/contact"         className="btn btn-primary"    style={{display:'inline-flex',marginBottom:'14px'}}>Submit My Building</Link>
              <br/>
              <Link to="/property-owners" className="hiw-jump" style={{textDecoration:'underline'}}>Read more about the partner model →</Link>
            </div>
            <div className="hiw-steps">
              {STEPS_OWNER.map((s, i) => (
                <div key={i} className="hiw-step reveal">
                  <div className="hiw-step-left">
                    <div className="hiw-step-n">{s.n}</div>
                    <div className="hiw-step-line"/>
                  </div>
                  <div>
                    <div className="hiw-step-title">{s.title}</div>
                    <div className="hiw-step-body">{s.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="hiw-faq section-dark">
        <div className="container">
          <div className="reveal">
            <div className="eyebrow eyebrow--light">Common Questions</div>
            <h2 style={{fontSize:'clamp(26px,3.4vw,42px)',fontWeight:900,letterSpacing:'-0.025em',lineHeight:1.12,color:'rgb(var(--fg))',marginBottom:'14px'}}>
              What people usually ask<br/><span style={{color:'var(--sky-blue)'}}>before they reach out.</span>
            </h2>
          </div>
          <div className="hiw-faq-grid">
            {[
              { q:'How long does site qualification take?',      a:'It depends on the complexity of the application and the permitting requirements for your market. Simple deployments can move from inquiry to agreement in a few weeks. More complex applications with federal regulatory components take longer. We will give you an honest timeline after reviewing your inquiry.' },
              { q:'What if you don\'t have a node in my market?', a:'We operate in New York, Connecticut, Florida, and Illinois currently. If you need a market we don\'t cover, tell us — we track demand by market and it informs where the network expands next.' },
              { q:'Can I evaluate multiple sites simultaneously?', a:'Yes. We commonly work with operators who need multiple sites across a market or across markets. We can evaluate and qualify nodes in parallel to match your timeline.' },
              { q:'What does "TBC" mean on site specifications?',  a:'TBC means the specification has not yet been confirmed for that specific node. Final specs — elevation, power, backhaul capacity — are confirmed during site evaluation for your specific engagement. We use TBC rather than a number we haven\'t verified.' },
              { q:'How is Metro Fabric priced?',                   a:'Metro Fabric pricing depends on the number of sites, link distances, and capacity requirements. It\'s structured as a managed service with a fixed monthly cost. Contact us for a quote once your site needs are defined.' },
              { q:'What happens if a node goes offline?',          a:'Skynode manages the site relationship and coordinates with the building on access, power, and maintenance. For Metro Fabric deployments, redundant path routing means a single link failure reroutes automatically before you notice.' },
              { q:'Do you work with building managers, not just owners?', a:'Yes. We work with property owners, asset managers, property managers, building operations teams, and legal/counsel. The right person to start the conversation is whoever manages decisions about rooftop and mechanical space.' },
              { q:'What is the minimum deployment size?',          a:'We evaluate single-site deployments. There is no minimum. That said, the value of the Skynode network — and Metro Fabric in particular — increases with the number of sites. We work with both single-site and multi-site operators.' },
            ].map((faq, i) => (
              <div key={i} className="hiw-faq-item reveal">
                <div className="hiw-faq-q">{faq.q}</div>
                <div className="hiw-faq-a">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="hiw-final section-light">
        <div className="container">
          <div className="eyebrow eyebrow--dark" style={{justifyContent:'center'}}>Ready to Start</div>
          <h2>Still have questions?<br/><em>Just ask.</em></h2>
          <p>A real person reviews every inquiry within one business day and will give you a straight answer — including if Skynode is not the right fit.</p>
          <div className="hiw-final-btns">
            <Link to="/contact"  className="btn btn-primary"       style={{padding:'16px 32px',fontSize:'15px'}}>Talk to Skynode</Link>
            <Link to="/skynodes" className="btn btn-outline-dark"  style={{padding:'16px 32px',fontSize:'15px'}}>Browse the Network</Link>
          </div>
        </div>
      </section>
    </>
  );
}
