import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { useBroadcastWaveCanvas } from '../hooks/useBroadcastWaveCanvas';

export default function PropertyOwners() {
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const ctaCanvasRef  = useRef<HTMLCanvasElement>(null);

  const [formData, setFormData] = useState({ name:'', title:'', role:'', email:'', phone:'', address:'', buildingType:'', access:'', power:'', comments:'' });
  const [formSuccess, setFormSuccess] = useState(false);

  useReveal();
  useBroadcastWaveCanvas(heroCanvasRef, { receiverCount:14, waveCount:5, waveSpeed:0.6 });
  useBroadcastWaveCanvas(ctaCanvasRef,  { receiverCount:10, waveCount:4, waveSpeed:0.5, centered:true });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const f = formData;
    if(!f.name || !f.role || !f.email || !f.address) return;
    setFormSuccess(true);
  }

  const WHY_CARDS = [
    {title:'We manage the permits',body:'Every permit, filing, and approval. Municipal, state, and federal — all coordinated by Skynode. You never have to navigate a zoning board on our behalf.'},
    {title:'Structured revenue, on paper',body:'We don\'t do handshakes. Revenue sharing is contractual, predictable, and tied to actual usage of your space — not vague promises about future upside.'},
    {title:'Low-profile equipment',body:'Skynode equipment is purpose-built for urban environments. Your tenants won\'t notice it. Your building\'s aesthetics won\'t change. Your neighbors won\'t complain.'},
    {title:'Professional site management',body:'24/7 monitoring, planned maintenance windows, and a dedicated operations team. We operate the site. You collect the revenue.'},
    {title:'No cap-ex required',body:'You don\'t need to invest anything. Skynode funds the installation, the equipment, and the ongoing operations. Your participation is the space.'},
    {title:'Multi-use from day one',body:'One rooftop can support broadcast, private communications, and edge compute simultaneously — each isolated, each generating its own revenue share.'},
  ];

  const QUAL_ITEMS = [
    {title:'Urban high-rise or mid-rise',body:'Buildings 6 stories and above. The higher, the better — elevation is the primary variable in broadcast and wireless coverage geometry.'},
    {title:'Rooftop or penthouse access',body:'Controlled rooftop or penthouse-floor access with a clear path for equipment installation. No shared-use restrictions that prevent managed infrastructure.'},
    {title:'Existing commercial power',body:'200A or greater commercial power service with space for a metered sub-panel. Generator interconnect is a plus but not required at most nodes.'},
    {title:'Urban market location',body:'Properties in New York, Miami, Chicago, Connecticut, and adjacent metro areas. Dense urban locations preferred — that\'s where coverage geometry creates the most value.'},
    {title:'Cooperative building management',body:'Property owners and managers willing to engage on a multi-year agreement. We\'re building long-term infrastructure, not short-term pop-up deployments.'},
    {title:'Structural capacity',body:'Roof structure capable of supporting distributed equipment loads. Skynode manages the structural assessment — we just need your willingness to have one done.'},
  ];

  return (
    <>
      <style>{`
        .hero { padding-top:100px; min-height:auto; padding-bottom:80px; }
        #heroCanvas { position:absolute; inset:0; width:100%; height:100%; z-index:0; pointer-events:none; }
        .final-cta { position:relative; padding:120px 28px; text-align:center; overflow:hidden; background:radial-gradient(ellipse 70% 80% at 50% 50%, rgba(32,101,132,0.12) 0%, transparent 70%), linear-gradient(180deg,rgba(var(--bg-base),0.96) 0%,rgba(var(--bg-base),0.92) 100%); }
        .final-cta > * { position:relative; z-index:1; }
        .section-body { font-size:15px; color:var(--tx-3); line-height:1.75; margin-bottom:20px; }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="hero" style={{position:'relative',overflow:'hidden'}}>
        <canvas ref={heroCanvasRef} id="heroCanvas" aria-hidden="true" />
        <div className="hero-scrim" />
        <div className="container" style={{position:'relative',zIndex:2}}>
          <div className="hero-inner">
            <div>
              <div className="eyebrow eyebrow--deep">For Property Owners</div>
              <h1>Your rooftop is already an asset.<br/><em>It's just not paying you yet.</em></h1>
              <p className="hero-sub">Skynode partners with property owners who want revenue from rooftop and back-of-house space without becoming infrastructure operators themselves. We handle the compliance, the equipment, and the operations. You handle the building.</p>
              <div className="hero-actions">
                <a href="#po-inquiry" className="btn btn-primary">Check My Building</a>
                <a href="#why" className="btn btn-outline-light">How It Works</a>
              </div>
            </div>
            <div>
              <div className="hero-eval-card">
                <div className="eval-header">
                  <span className="eval-title">Building Evaluation</span>
                  <span className="eval-badge"><span className="dot"/>Accepting Applications</span>
                </div>
                <div className="eval-rows">
                  {[
                    {label:'Height requirement',check:'6+ stories'},
                    {label:'Rooftop access',check:'Required'},
                    {label:'Commercial power',check:'200A+'},
                    {label:'Urban metro location',check:'NYC · MIA · CHI · CT'},
                    {label:'Revenue share',check:'Contractual'},
                    {label:'Compliance managed by Skynode',check:'Yes, end-to-end'},
                  ].map((r,i)=>(
                    <div key={i} className="eval-row">
                      <div className="eval-ico">
                        <svg viewBox="0 0 24 24" fill="none"><path d="M12 2L4 7v5c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V7l-8-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
                      </div>
                      <span className="eval-label">{r.label}</span>
                      <span className="eval-check">✓ {r.check}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility strip */}
      <div className="credibility"><div className="container"><div className="cred-inner"><span className="cred-label">Property owners and managers working with Skynode</span></div></div></div>

      {/* ═══ PARTNER MODEL ═══ */}
      <section className="section-deep" id="how">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow eyebrow--deep">The Partner Model</div>
            <h2 className="sec-h2">Three steps from conversation<br/>to <em>contractual revenue.</em></h2>
            <p className="sec-lead">We've made this as simple as we can without making it vague. Here's exactly how we work with property owners from first contact to operating infrastructure.</p>
          </div>
          <div className="partner-grid">
            {[
              {num:'01',title:'Building evaluation',body:'You tell us about your property. We evaluate it against our site requirements — elevation, power, access, and structural capacity. If it\'s a fit, we tell you what we can support and what the revenue structure looks like. No vague promises.'},
              {num:'02',title:'Agreement and compliance',body:'We put the revenue sharing arrangement on paper, manage all permits and structural assessments, and handle the utility coordination. You review and sign. We handle everything else.'},
              {num:'03',title:'Installation and operations',body:'Skynode installs and operates the infrastructure. 24/7 monitoring, planned maintenance, and a dedicated operations team. You collect your revenue share. We handle the rooftop.'},
            ].map((p,i)=>(
              <div key={i} className="partner-card reveal">
                <div className="partner-num">{p.num}</div>
                <div className="partner-title">{p.title}</div>
                <p className="partner-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PERMITTING CALLOUT ═══ */}
      <div className="permit-band">
        <div className="container">
          <div className="permit-inner">
            <div className="permit-icon">
              <svg viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4M7 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><rect x="7" y="2" width="10" height="4" rx="1" stroke="currentColor" strokeWidth="1.8"/></svg>
            </div>
            <div className="permit-content">
              <h2 className="permit-h2">We handle every permit. Every filing. Every approval.</h2>
              <p className="permit-body">Permitting for rooftop wireless infrastructure involves municipal, state, and in some cases federal filings. Most property owners have never navigated this process. We have — dozens of times. Skynode manages the entire compliance process from initial structural assessment to final installation approval. You're informed throughout. You don't have to do any of it.</p>
              <div className="permit-actions">
                <a href="#po-inquiry" className="btn btn-primary">Check My Building</a>
                <a href="#why" className="btn btn-outline-dark">Why Owners Work With Us</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ WHY SECTION ═══ */}
      <section className="section-light" id="why">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow eyebrow--deep">Why Owners Work With Us</div>
            <h2 className="sec-h2">We've heard every concern.<br/><em>Here's how we address each one.</em></h2>
            <p className="sec-lead">Property owners who've done rooftop infrastructure deals before usually have one of six concerns. Here's where we stand on all of them.</p>
          </div>
          <div className="why-cards">
            {WHY_CARDS.map((c,i)=>(
              <div key={i} className="why-card-po reveal">
                <div className="why-card-po-icon">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
                </div>
                <div className="why-card-po-title">{c.title}</div>
                <p className="why-card-po-body">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT BUILDINGS WORK ═══ */}
      <section className="section-deep" id="qualify">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow eyebrow--deep">What Buildings Work</div>
            <h2 className="sec-h2">Six criteria. One simple<br/><em>evaluation.</em></h2>
            <p className="sec-lead">Not every building is a fit, and we're not going to pretend otherwise. Here's what we look for. If your property meets these criteria, it's worth a conversation.</p>
          </div>
          <div className="qual-grid">
            {QUAL_ITEMS.map((q,i)=>(
              <div key={i} className="qual-item reveal">
                <div className="qual-icon">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4M12 2l8 3.5v5C20 17 16.5 20.5 12 22 7.5 20.5 4 17 4 10.5v-5L12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
                </div>
                <div><div className="qual-title">{q.title}</div><p className="qual-body">{q.body}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LEAD CAPTURE ═══ */}
      <section className="section-dark" id="po-inquiry">
        <div className="container">
          <div className="inquiry-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow--light">Is My Building a Fit?</div>
              <h2 className="sec-h2">Tell us about your property.<br/><em>We'll tell you if we can work together.</em></h2>
              <p className="section-body" style={{marginBottom:'32px'}}>We evaluate every property inquiry personally. If your building meets our criteria, we'll tell you what we can support and what the revenue structure looks like. If it's not a fit, we'll tell you that too.</p>
              <div className="reassurance-list">
                {[
                  {title:'Takes 2 minutes',desc:'Tell us your building address, height, and contact info. That\'s all we need to do a preliminary evaluation.'},
                  {title:'No commitment required',desc:'A preliminary evaluation is not an agreement. You find out if your building qualifies before we ask you to sign anything.'},
                  {title:'We follow up within one business day',desc:'A real person reviews every property inquiry within one business day. Not a bot. Not a CRM sequence. A person.'},
                  {title:'Your building stays yours',desc:'We operate infrastructure on your roof. You own the building. The lease agreement is standard commercial — no surprises.'},
                ].map((r,i)=>(
                  <div key={i} className="reassurance-item">
                    <div className="reassurance-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                    <div><div className="reassurance-title">{r.title}</div><div className="reassurance-desc">{r.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="inquiry-form reveal">
              <div className="form-title">Check My Building</div>
              <div className="form-sub">Takes 2 minutes. We follow up within one business day.</div>
              {formSuccess ? (
                <div className="form-success show">
                  <div className="form-success-icon">🏢</div>
                  <div className="form-success-title">We've got it.</div>
                  <div className="form-success-body">A real person will review your property within one business day. If your building is a fit, you'll hear from us directly.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-2col">
                    <div className="form-group"><label className="form-label">Your Name *</label><input className="form-input" type="text" placeholder="Full name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} required /></div>
                    <div className="form-group"><label className="form-label">Title</label><input className="form-input" type="text" placeholder="Your title" value={formData.title} onChange={e=>setFormData({...formData,title:e.target.value})} /></div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Your Role *</label>
                    <select className="form-input" value={formData.role} onChange={e=>setFormData({...formData,role:e.target.value})} required>
                      <option value="">Select role</option>
                      <option>Property Owner</option><option>Property Manager</option>
                      <option>Asset Manager</option><option>Developer</option>
                      <option>Legal / Counsel</option><option>Other</option>
                    </select>
                  </div>
                  <div className="form-2col">
                    <div className="form-group"><label className="form-label">Work Email *</label><input className="form-input" type="email" placeholder="you@company.com" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} required /></div>
                    <div className="form-group"><label className="form-label">Phone</label><input className="form-input" type="tel" placeholder="Optional" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} /></div>
                  </div>
                  <div className="form-group"><label className="form-label">Building Address *</label><input className="form-input" type="text" placeholder="123 Example Ave, New York NY" value={formData.address} onChange={e=>setFormData({...formData,address:e.target.value})} required /></div>
                  <div className="form-2col">
                    <div className="form-group">
                      <label className="form-label">Building Type</label>
                      <select className="form-input" value={formData.buildingType} onChange={e=>setFormData({...formData,buildingType:e.target.value})}>
                        <option value="">Select type</option>
                        <option>Commercial Office</option><option>Residential (Rental)</option>
                        <option>Mixed-Use</option><option>Industrial</option><option>Hotel</option><option>Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Rooftop Access</label>
                      <select className="form-input" value={formData.access} onChange={e=>setFormData({...formData,access:e.target.value})}>
                        <option value="">Select</option>
                        <option>Yes — controlled access</option><option>Yes — shared access</option>
                        <option>Penthouse / mechanical floor</option><option>Not sure</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Existing Power</label>
                    <select className="form-input" value={formData.power} onChange={e=>setFormData({...formData,power:e.target.value})}>
                      <option value="">Select</option>
                      <option>200A+ commercial service</option><option>100A commercial service</option>
                      <option>Residential only</option><option>Not sure</option>
                    </select>
                  </div>
                  <div className="form-group"><label className="form-label">Additional Comments</label><textarea className="form-input" placeholder="Anything else we should know about the building or your situation…" value={formData.comments} onChange={e=>setFormData({...formData,comments:e.target.value})} /></div>
                  <button className="btn btn-primary form-submit" type="submit">Check My Building</button>
                  <div className="form-privacy">Your information is used only to evaluate your property. No spam. No auto-dialers. We're in the infrastructure business.</div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="final-cta" style={{position:'relative'}}>
        <canvas ref={ctaCanvasRef} id="ctaCanvas" aria-hidden="true" />
        <div className="eyebrow" style={{justifyContent:'center'}}>Ready to Evaluate</div>
        <h2>Your rooftop. Our infrastructure.<br/><em>Contractual revenue for both.</em></h2>
        <p>Tell us about your property. If your building qualifies, we'll tell you what we can support and what the revenue structure looks like. Two minutes. One business day turnaround.</p>
        <div className="cta-actions">
          <a href="#po-inquiry" className="btn btn-primary" style={{padding:'16px 32px',fontSize:'15px'}}>Check My Building</a>
          <Link to="/contact" className="btn btn-outline-light" style={{padding:'16px 32px',fontSize:'15px'}}>Talk to Skynode</Link>
        </div>
      </section>
    </>
  );
}
