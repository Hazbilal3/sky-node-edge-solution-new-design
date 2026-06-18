import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

const USE_CASES = [
  { id:'broadcast-fm',  label:'Broadcast FM' },
  { id:'broadcast-tv',  label:'Broadcast TV' },
  { id:'private-p25',   label:'Private Comms P25' },
  { id:'private-5g',    label:'Private Comms 5G' },
  { id:'private-p2p',   label:'Private Comms P2P' },
  { id:'edge-colo',     label:'Edge Colocation' },
  { id:'ai-inference',  label:'AI / Inference' },
  { id:'experimental',  label:'Experimental Systems' },
];

const MARKETS = [
  { id:'new-york',   label:'New York' },
  { id:'miami',      label:'Miami / FL' },
  { id:'chicago',    label:'Chicago / IL' },
  { id:'connecticut',label:'Connecticut' },
  { id:'other',      label:'Other / Multi-metro' },
];

export default function Contact() {
  const [step, setStep] = useState(1);
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
  const [specificArea, setSpecificArea] = useState('');
  const [timeline, setTimeline] = useState('');
  const [numSites, setNumSites] = useState('');
  const [details, setDetails] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useReveal();

  function toggleUseCase(id: string) {
    setSelectedUseCases(prev =>
      prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]
    );
  }

  function toggleMarket(id: string) {
    setSelectedMarkets(prev =>
      prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if(!name || !email) return;
    const subject = `Skynode Inquiry — ${selectedUseCases.join(', ')||'General'}`;
    const body = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      '',
      `Use Case(s): ${selectedUseCases.map(id=>USE_CASES.find(u=>u.id===id)?.label).join(', ')||'Not specified'}`,
      `Market(s): ${selectedMarkets.map(id=>MARKETS.find(m=>m.id===id)?.label).join(', ')||'Not specified'}`,
      `Specific Area: ${specificArea||'N/A'}`,
      `Timeline: ${timeline||'N/A'}`,
      `Number of Sites: ${numSites||'N/A'}`,
      '',
      `Project Details:`,
      details,
    ].join('\n');
    window.location.href = `mailto:info@skynodepartners.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  const totalSteps = 4;

  return (
    <>
      <style>{`
        .contact-hero { background:var(--bg-deep); padding:120px 0 64px; border-bottom:1px solid var(--border-dark); }
        .section-body { font-size:15px; color:var(--tx-3); line-height:1.75; margin-bottom:20px; }
      `}</style>

      {/* ═══ HERO BAND ═══ */}
      <div className="contact-hero">
        <div className="container">
          <div className="eyebrow">Contact Skynode</div>
          <h1 style={{fontSize:'clamp(28px,4vw,48px)',fontWeight:900,letterSpacing:'-0.025em',lineHeight:1.08,color:'rgb(var(--fg))',marginBottom:'16px'}}>
            Tell us what you're building.<br/><em style={{fontStyle:'normal',color:'var(--sky-blue)'}}>We'll tell you if we can help.</em>
          </h1>
          <p style={{fontSize:'17px',color:'var(--tx-3)',maxWidth:'540px',lineHeight:'1.7'}}>A real person reviews every inquiry. If we have what you need, we'll tell you. If we don't, we'll tell you that too.</p>
        </div>
      </div>

      {/* ═══ MAIN LAYOUT ═══ */}
      <section className="section-deep">
        <div className="container">
          <div className="contact-layout">
            {/* ── Main form ── */}
            <div>
              <div className="qualify-form-wrap">
                {submitted ? (
                  <div style={{textAlign:'center',padding:'48px 24px'}}>
                    <div style={{fontSize:'48px',marginBottom:'20px'}}>📡</div>
                    <div style={{fontSize:'20px',fontWeight:900,color:'rgb(var(--fg))',marginBottom:'12px'}}>Message sent.</div>
                    <div style={{fontSize:'15px',color:'var(--tx-4)',lineHeight:'1.7'}}>Your default email app has opened with a pre-filled message to Skynode. Send it when you're ready. We'll follow up within one business day.</div>
                    <Link to="/" className="btn btn-primary" style={{marginTop:'28px'}}>Back to Home</Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {/* Step indicator */}
                    <div className="step-indicator">
                      {Array.from({length:totalSteps}).map((_,i)=>(
                        <div key={i} className={`step-dot${step===i+1?' active':step>i+1?' done':''}`} />
                      ))}
                    </div>

                    {/* Step 1: Use case */}
                    {step===1 && (
                      <div className="qualify-step active">
                        <div className="qualify-title">What are you deploying?</div>
                        <div className="qualify-sub">Select all that apply. We'll route your inquiry to the right person.</div>
                        <div className="chip-group">
                          {USE_CASES.map(uc=>(
                            <button key={uc.id} type="button"
                              className={`chip${selectedUseCases.includes(uc.id)?' selected':''}`}
                              onClick={()=>toggleUseCase(uc.id)}>
                              {uc.label}
                            </button>
                          ))}
                        </div>
                        <div className="qualify-nav">
                          <button type="button" className="btn btn-primary" onClick={()=>setStep(2)}
                            disabled={selectedUseCases.length===0} style={{opacity:selectedUseCases.length===0?0.5:1}}>
                            Next: Markets →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Markets */}
                    {step===2 && (
                      <div className="qualify-step active">
                        <div className="qualify-title">Which markets?</div>
                        <div className="qualify-sub">Select the metro areas you're focused on.</div>
                        <div className="chip-group">
                          {MARKETS.map(m=>(
                            <button key={m.id} type="button"
                              className={`chip${selectedMarkets.includes(m.id)?' selected':''}`}
                              onClick={()=>toggleMarket(m.id)}>
                              {m.label}
                            </button>
                          ))}
                        </div>
                        <div className="form-group" style={{marginTop:'16px'}}>
                          <label className="form-label">Specific area or neighborhood (optional)</label>
                          <input className="form-input" type="text" placeholder="e.g. Midtown Manhattan, Brickell Miami…" value={specificArea} onChange={e=>setSpecificArea(e.target.value)} />
                        </div>
                        <div className="qualify-nav">
                          <button type="button" className="btn qualify-back" onClick={()=>setStep(1)}>← Back</button>
                          <button type="button" className="btn btn-primary" onClick={()=>setStep(3)}
                            disabled={selectedMarkets.length===0} style={{opacity:selectedMarkets.length===0?0.5:1}}>
                            Next: Project Details →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Project details */}
                    {step===3 && (
                      <div className="qualify-step active">
                        <div className="qualify-title">Project details</div>
                        <div className="qualify-sub">Help us understand the scope before we talk.</div>
                        <div className="form-2col">
                          <div className="form-group">
                            <label className="form-label">Timeline</label>
                            <select className="form-input" value={timeline} onChange={e=>setTimeline(e.target.value)}>
                              <option value="">Select</option>
                              <option>ASAP</option><option>1–3 months</option>
                              <option>3–6 months</option><option>6–12 months</option>
                              <option>Just exploring</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Number of sites</label>
                            <select className="form-input" value={numSites} onChange={e=>setNumSites(e.target.value)}>
                              <option value="">Select</option>
                              <option>1</option><option>2–5</option>
                              <option>6–10</option><option>10+</option>
                              <option>Not sure yet</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Project details</label>
                          <textarea className="form-input" rows={4}
                            placeholder="Describe your project — what you're deploying, what you need from the infrastructure, and any constraints or requirements we should know about…"
                            value={details} onChange={e=>setDetails(e.target.value)} />
                        </div>
                        <div className="qualify-nav">
                          <button type="button" className="btn qualify-back" onClick={()=>setStep(2)}>← Back</button>
                          <button type="button" className="btn btn-primary" onClick={()=>setStep(4)}>Next: Your Info →</button>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Contact info */}
                    {step===4 && (
                      <div className="qualify-step active">
                        <div className="qualify-title">Almost done.</div>
                        <div className="qualify-sub">Who should we follow up with?</div>
                        <div className="form-2col">
                          <div className="form-group"><label className="form-label">Your Name *</label><input className="form-input" type="text" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required /></div>
                          <div className="form-group"><label className="form-label">Company / Organization</label><input className="form-input" type="text" placeholder="Company or org name" value={company} onChange={e=>setCompany(e.target.value)} /></div>
                        </div>
                        <div className="form-2col">
                          <div className="form-group"><label className="form-label">Work Email *</label><input className="form-input" type="email" placeholder="you@company.com" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
                          <div className="form-group"><label className="form-label">Phone</label><input className="form-input" type="tel" placeholder="Optional" value={phone} onChange={e=>setPhone(e.target.value)} /></div>
                        </div>
                        <div className="qualify-nav">
                          <button type="button" className="btn qualify-back" onClick={()=>setStep(3)}>← Back</button>
                          <button type="submit" className="btn btn-primary">
                            Send to Skynode
                            <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </button>
                        </div>
                        <p style={{fontSize:'11px',color:'var(--tx-6)',marginTop:'14px',textAlign:'center',lineHeight:'1.5'}}>This will open your email app with a pre-filled message. Your info is used only to respond to your inquiry. No spam.</p>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="contact-sidebar">
              {/* What happens next */}
              <div className="sidebar-card reveal">
                <div className="sidebar-title">What happens next</div>
                <div className="next-steps">
                  {[
                    'You submit your inquiry using this form.',
                    'A real person at Skynode reviews it within one business day.',
                    'If we have what you need, we\'ll reach out directly to schedule a call.',
                    'If we don\'t, we\'ll tell you honestly — and suggest alternatives if we know of any.',
                  ].map((s,i)=>(
                    <div key={i} className="next-step">
                      <div className="next-step-num">{i+1}</div>
                      <div className="next-step-text">{s}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prefer to talk now */}
              <div className="sidebar-card reveal">
                <div className="sidebar-title">Prefer to talk now?</div>
                <div className="contact-list">
                  <div className="contact-item">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.6"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.6"/></svg>
                    <span><a href="mailto:info@skynodepartners.com">info@skynodepartners.com</a></span>
                  </div>
                  <div className="contact-item">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.93-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.6"/></svg>
                    <span><a href="tel:+13472008058">+1 347 200 8058</a></span>
                  </div>
                  <div className="contact-item">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.6"/></svg>
                    <span>New York · Miami · Chicago · Connecticut</span>
                  </div>
                </div>
              </div>

              {/* Property owners callout */}
              <div className="sidebar-card reveal">
                <div className="sidebar-title">Own a building?</div>
                <div className="po-callout">
                  <div className="po-callout-title">Check if your rooftop qualifies</div>
                  <p className="po-callout-body">If you're a property owner interested in hosting Skynode infrastructure, use our property evaluation form instead.</p>
                  <Link to="/property-owners" className="btn btn-outline-dark btn-sm">Evaluate My Building →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
