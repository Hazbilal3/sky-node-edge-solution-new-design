import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { usePageTitle } from '../hooks/usePageTitle';

type Track = 'customer' | 'property';

const CUSTOMER_TYPES = [
  { id:'ai-compute',    label:'AI / Compute' },
  { id:'broadcasting',  label:'Broadcasting' },
  { id:'private-comms', label:'Private Communications' },
  { id:'experimental',  label:'Experimental / Emerging' },
  { id:'not-sure',      label:'Not sure yet' },
];

const USE_CASES = [
  { id:'broadcast-fm',  label:'Broadcast FM' },
  { id:'broadcast-tv',  label:'Broadcast TV' },
  { id:'private-p25',   label:'Private Comms / P25' },
  { id:'private-5g',    label:'Private 5G' },
  { id:'private-p2p',   label:'P2P Data Links' },
  { id:'edge-colo',     label:'Edge Colocation' },
  { id:'ai-inference',  label:'AI / Inference' },
  { id:'experimental',  label:'Experimental Systems' },
];

const MARKETS = [
  { id:'new-york',     label:'New York' },
  { id:'florida',      label:'Florida' },
  { id:'illinois',     label:'Illinois' },
  { id:'connecticut',  label:'Connecticut' },
  { id:'other',        label:'Other / Multi-metro' },
];

const TIMELINES = ['< 3 months', '3–6 months', '6–12 months', 'Just exploring'];

const HOW_HEARD = [
  'Web search', 'LinkedIn', 'Referral / Word of mouth',
  'Industry contact', 'Conference or event', 'Other',
];

const BUILDING_TYPES = [
  'Commercial office', 'Residential', 'Mixed-use', 'Industrial', 'Other',
];

export default function Contact() {
  const [track, setTrack] = useState<Track>('customer');

  /* ── Customer form state ── */
  const [step, setStep]                     = useState(1);
  const [selectedTypes, setSelectedTypes]   = useState<string[]>([]);
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);
  const [selectedMarkets, setSelectedMarkets]   = useState<string[]>([]);
  const [specificArea, setSpecificArea]     = useState('');
  const [timeline, setTimeline]             = useState('');
  const [numSites, setNumSites]             = useState('');
  const [details, setDetails]               = useState('');
  const [name, setName]                     = useState('');
  const [company, setCompany]               = useState('');
  const [email, setEmail]                   = useState('');
  const [phone, setPhone]                   = useState('');
  const [howHeard, setHowHeard]             = useState('');
  const [submitted, setSubmitted]           = useState(false);
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState('');

  /* ── Property owner form state ── */
  const [poName, setPoName]                 = useState('');
  const [poTitle, setPoTitle]               = useState('');
  const [poBuildingName, setPoBuildingName] = useState('');
  const [poEmail, setPoEmail]               = useState('');
  const [poPhone, setPoPhone]               = useState('');
  const [poAddress, setPoAddress]           = useState('');
  const [poBuildingType, setPoBuildingType] = useState('');
  const [poRoofAccess, setPoRoofAccess]     = useState('');
  const [poPower, setPoPower]               = useState('');
  const [poNotes, setPoNotes]               = useState('');
  const [poSubmitted, setPoSubmitted]       = useState(false);
  const [poLoading, setPoLoading]           = useState(false);
  const [poError, setPoError]               = useState('');

  useReveal();
  usePageTitle('Contact');

  const toggle = (arr: string[], setArr: (v: string[]) => void, id: string) =>
    setArr(arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id]);

  async function handleCustomerSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);
    setError('');
    const segmentLabels = selectedTypes.map(id => CUSTOMER_TYPES.find(t => t.id === id)?.label).filter(Boolean).join(', ') || 'General';
    const useCaseLabels = selectedUseCases.map(id => USE_CASES.find(u => u.id === id)?.label).filter(Boolean).join(', ') || '—';
    const marketLabels  = selectedMarkets.map(id => MARKETS.find(m => m.id === id)?.label).filter(Boolean).join(', ') || '—';
    try {
      const r = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: 'af413406-1e06-484a-9ded-990dddb8c285',
          subject: `[${segmentLabels}] Skynode Inquiry — ${name}`,
          from_name: name,
          replyto: email,
          'Name':           name,
          'Company':        company || '—',
          'Email':          email,
          'Phone':          phone || '—',
          'Segment':        segmentLabels,
          'Use Case(s)':    useCaseLabels,
          'Market(s)':      marketLabels,
          'Specific Area':  specificArea || '—',
          'Timeline':       timeline || '—',
          'Number of Sites':numSites || '—',
          'How they heard': howHeard || '—',
          'Project Details':details || '—',
        }),
      });
      const data = await r.json();
      if (!data.success) throw new Error(data.message || 'Submission failed');
      setSubmitted(true);
    } catch (err: any) {
      setError('Something went wrong. Please email info@skynodepartners.com directly.');
    } finally {
      setLoading(false);
    }
  }

  async function handlePoSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!poName || !poEmail) return;
    setPoLoading(true);
    setPoError('');
    try {
      const r = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: 'af413406-1e06-484a-9ded-990dddb8c285',
          subject: `[Property Inquiry] Skynode — ${poBuildingName || poName}`,
          from_name: poName,
          replyto: poEmail,
          'Name':              poName,
          'Title':             poTitle || '—',
          'Building / Company':poBuildingName || '—',
          'Email':             poEmail,
          'Phone':             poPhone || '—',
          'Address / Area':    poAddress || '—',
          'Building Type':     poBuildingType || '—',
          'Roof Accessible':   poRoofAccess || '—',
          'Power on Roof':     poPower || '—',
          'Notes':             poNotes || '—',
        }),
      });
      const data = await r.json();
      if (!data.success) throw new Error(data.message || 'Submission failed');
      setPoSubmitted(true);
    } catch (err: any) {
      setPoError('Something went wrong. Please email info@skynodepartners.com directly.');
    } finally {
      setPoLoading(false);
    }
  }

  const totalSteps = 4;

  return (
    <>
      {/* ═══ HERO ═══ */}
      <div className="contact-hero">
        <div className="container">
          <div className="eyebrow">Contact Skynode</div>
          <h1 style={{fontSize:'clamp(28px,4vw,48px)',fontWeight:900,letterSpacing:'-0.025em',lineHeight:1.08,color:'rgb(var(--fg))',margin:'10px 0 18px'}}>
            Let's figure out if Skynode<br/><em style={{fontStyle:'normal',color:'var(--sky-blue)'}}>is the right fit.</em>
          </h1>
          <p style={{fontSize:'17px',color:'var(--tx-3)',maxWidth:'580px',lineHeight:'1.75'}}>Whether you are evaluating a node for your infrastructure, looking to deploy equipment at scale, or considering making your building part of the Skynode platform — start here.</p>
        </div>
      </div>

      {/* ═══ MAIN LAYOUT ═══ */}
      <section className="section-deep">
        <div className="container">
          <div className="contact-layout">

            {/* ── FORM COLUMN ── */}
            <div>
              {/* Track toggle */}
              <div className="contact-track-toggle">
                <button
                  type="button"
                  className={`track-tab${track === 'customer' ? ' active' : ''}`}
                  onClick={() => { setTrack('customer'); setStep(1); }}>
                  <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><rect x="2" y="4" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 14v2M14 14v2M4 16h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  I need infrastructure
                </button>
                <button
                  type="button"
                  className={`track-tab${track === 'property' ? ' active' : ''}`}
                  onClick={() => setTrack('property')}>
                  <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M3 9.5 10 3l7 6.5V17a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M7 18v-6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  I own a building
                </button>
              </div>

              {/* ── CUSTOMER TRACK ── */}
              {track === 'customer' && (
                <div className="qualify-form-wrap qualify-form-wrap--joined">
                  {submitted ? (
                    <div style={{textAlign:'center',padding:'48px 24px'}}>
                      <svg viewBox="0 0 48 48" fill="none" width="48" height="48" style={{margin:'0 auto 20px',display:'block'}}><circle cx="24" cy="24" r="22" stroke="var(--teal-accent)" strokeWidth="2"/><path d="M14 24l7 7 13-13" stroke="var(--teal-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <h3 style={{fontSize:'20px',fontWeight:900,color:'rgb(var(--fg))',marginBottom:'12px'}}>Inquiry sent.</h3>
                      <p style={{fontSize:'15px',color:'var(--tx-4)',lineHeight:'1.7',maxWidth:'400px',margin:'0 auto'}}>Your message has been delivered to the right person at Skynode. Expect a follow-up within one business day. A confirmation has been sent to {email}.</p>
                      <Link to="/" className="btn btn-primary" style={{marginTop:'28px'}}>Back to Home</Link>
                    </div>
                  ) : (
                    <form onSubmit={handleCustomerSubmit}>
                      <div className="step-indicator">
                        {Array.from({length: totalSteps}).map((_, i) => (
                          <div key={i} className={`step-dot${step === i+1 ? ' active' : step > i+1 ? ' done' : ''}`} />
                        ))}
                      </div>

                      {/* Step 1 — Segment & use case */}
                      {step === 1 && (
                        <div className="qualify-step active">
                          <div className="qualify-title">What best describes you?</div>
                          <div className="qualify-sub">Select your primary segment. We'll route your inquiry to the right person.</div>
                          <div className="chip-group">
                            {CUSTOMER_TYPES.map(t => (
                              <button key={t.id} type="button"
                                className={`chip${selectedTypes.includes(t.id) ? ' selected' : ''}`}
                                onClick={() => toggle(selectedTypes, setSelectedTypes, t.id)}>
                                {t.label}
                              </button>
                            ))}
                          </div>
                          <div style={{marginBottom:'20px'}}>
                            <div className="form-label" style={{marginBottom:'10px'}}>Specific use case <span style={{fontWeight:400,textTransform:'none',letterSpacing:0}}>(optional)</span></div>
                            <div className="chip-group">
                              {USE_CASES.map(uc => (
                                <button key={uc.id} type="button"
                                  className={`chip${selectedUseCases.includes(uc.id) ? ' selected' : ''}`}
                                  onClick={() => toggle(selectedUseCases, setSelectedUseCases, uc.id)}>
                                  {uc.label}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="qualify-nav">
                            <button type="button" className="btn btn-primary" onClick={() => setStep(2)}
                              disabled={selectedTypes.length === 0} style={{opacity: selectedTypes.length === 0 ? 0.5 : 1}}>
                              Next: Markets →
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Step 2 — Markets */}
                      {step === 2 && (
                        <div className="qualify-step active">
                          <div className="qualify-title">Which markets?</div>
                          <div className="qualify-sub">Select the metro areas you're focused on.</div>
                          <div className="chip-group">
                            {MARKETS.map(m => (
                              <button key={m.id} type="button"
                                className={`chip${selectedMarkets.includes(m.id) ? ' selected' : ''}`}
                                onClick={() => toggle(selectedMarkets, setSelectedMarkets, m.id)}>
                                {m.label}
                              </button>
                            ))}
                          </div>
                          <div className="form-group" style={{marginTop:'16px'}}>
                            <label className="form-label">Specific area or neighborhood <span style={{fontWeight:400,textTransform:'none',letterSpacing:0}}>(optional)</span></label>
                            <input className="form-input" type="text"
                              placeholder="e.g. Midtown Manhattan, Brickell Miami…"
                              value={specificArea} onChange={e => setSpecificArea(e.target.value)} />
                          </div>
                          <div className="qualify-nav">
                            <button type="button" className="btn qualify-back" onClick={() => setStep(1)}>← Back</button>
                            <button type="button" className="btn btn-primary" onClick={() => setStep(3)}
                              disabled={selectedMarkets.length === 0} style={{opacity: selectedMarkets.length === 0 ? 0.5 : 1}}>
                              Next: Project Details →
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Step 3 — Project details */}
                      {step === 3 && (
                        <div className="qualify-step active">
                          <div className="qualify-title">Project details</div>
                          <div className="qualify-sub">Help us understand the scope before we talk.</div>
                          <div className="form-2col">
                            <div className="form-group">
                              <label className="form-label">Timeline</label>
                              <select className="form-input" value={timeline} onChange={e => setTimeline(e.target.value)}>
                                <option value="">Select</option>
                                {TIMELINES.map(t => <option key={t}>{t}</option>)}
                              </select>
                            </div>
                            <div className="form-group">
                              <label className="form-label">Number of sites</label>
                              <select className="form-input" value={numSites} onChange={e => setNumSites(e.target.value)}>
                                <option value="">Select</option>
                                <option>1</option><option>2–5</option>
                                <option>6–10</option><option>10+</option>
                                <option>Not sure yet</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Brief project description</label>
                            <textarea className="form-input" rows={4}
                              placeholder="Describe your project — what you're deploying, what you need from the infrastructure, and any constraints or requirements we should know about…"
                              value={details} onChange={e => setDetails(e.target.value)} />
                          </div>
                          <div className="qualify-nav">
                            <button type="button" className="btn qualify-back" onClick={() => setStep(2)}>← Back</button>
                            <button type="button" className="btn btn-primary" onClick={() => setStep(4)}>Next: Your Info →</button>
                          </div>
                        </div>
                      )}

                      {/* Step 4 — Contact info */}
                      {step === 4 && (
                        <div className="qualify-step active">
                          <div className="qualify-title">Almost done.</div>
                          <div className="qualify-sub">Who should we follow up with?</div>
                          <div className="form-2col">
                            <div className="form-group">
                              <label className="form-label">Full Name *</label>
                              <input className="form-input" type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Company / Organization</label>
                              <input className="form-input" type="text" placeholder="Company or org name" value={company} onChange={e => setCompany(e.target.value)} />
                            </div>
                          </div>
                          <div className="form-2col">
                            <div className="form-group">
                              <label className="form-label">Work Email *</label>
                              <input className="form-input" type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Phone</label>
                              <input className="form-input" type="tel" placeholder="Optional" value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="form-label">How did you hear about Skynode?</label>
                            <select className="form-input" value={howHeard} onChange={e => setHowHeard(e.target.value)}>
                              <option value="">Select</option>
                              {HOW_HEARD.map(h => <option key={h}>{h}</option>)}
                            </select>
                          </div>
                          <div className="qualify-nav">
                            <button type="button" className="btn qualify-back" onClick={() => setStep(3)}>← Back</button>
                            <button type="submit" className="btn btn-primary" disabled={loading} style={{opacity:loading?0.7:1}}>
                              {loading ? 'Sending…' : 'Send to Skynode'}
                              {!loading && <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                            </button>
                          </div>
                          {error && <p style={{fontSize:'13px',color:'#f87171',marginTop:'12px',textAlign:'center',lineHeight:'1.5'}}>{error}</p>}
                          <p style={{fontSize:'11px',color:'var(--tx-6)',marginTop:'10px',textAlign:'center',lineHeight:'1.5'}}>Your information is used only to respond to your inquiry. A confirmation will be sent to your email.</p>
                        </div>
                      )}
                    </form>
                  )}
                </div>
              )}

              {/* ── PROPERTY OWNER TRACK ── */}
              {track === 'property' && (
                <div className="qualify-form-wrap qualify-form-wrap--joined">
                  {poSubmitted ? (
                    <div style={{textAlign:'center',padding:'48px 24px'}}>
                      <svg viewBox="0 0 48 48" fill="none" width="48" height="48" style={{margin:'0 auto 20px',display:'block'}}><circle cx="24" cy="24" r="22" stroke="var(--teal-accent)" strokeWidth="2"/><path d="M14 24l7 7 13-13" stroke="var(--teal-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <h3 style={{fontSize:'20px',fontWeight:900,color:'rgb(var(--fg))',marginBottom:'12px'}}>Building submitted.</h3>
                      <p style={{fontSize:'15px',color:'var(--tx-4)',lineHeight:'1.7',maxWidth:'400px',margin:'0 auto'}}>Your building has been submitted for evaluation. We'll follow up within one business day. A confirmation has been sent to {poEmail}.</p>
                      <Link to="/" className="btn btn-primary" style={{marginTop:'28px'}}>Back to Home</Link>
                    </div>
                  ) : (
                    <form onSubmit={handlePoSubmit}>
                      <div className="qualify-title" style={{marginBottom:'6px'}}>Tell us about your building.</div>
                      <div className="qualify-sub">We'll evaluate it and follow up on whether it's a potential fit for Skynode infrastructure.</div>
                      <div className="form-2col">
                        <div className="form-group">
                          <label className="form-label">Full Name *</label>
                          <input className="form-input" type="text" placeholder="Full name" value={poName} onChange={e => setPoName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Your Title</label>
                          <input className="form-input" type="text" placeholder="e.g. Property Manager" value={poTitle} onChange={e => setPoTitle(e.target.value)} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Company / Building Name</label>
                        <input className="form-input" type="text" placeholder="Building or company name" value={poBuildingName} onChange={e => setPoBuildingName(e.target.value)} />
                      </div>
                      <div className="form-2col">
                        <div className="form-group">
                          <label className="form-label">Work Email *</label>
                          <input className="form-input" type="email" placeholder="you@company.com" value={poEmail} onChange={e => setPoEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Phone</label>
                          <input className="form-input" type="tel" placeholder="Optional" value={poPhone} onChange={e => setPoPhone(e.target.value)} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Building Address or Neighborhood</label>
                        <input className="form-input" type="text" placeholder="e.g. 123 Main St, or Midtown Manhattan" value={poAddress} onChange={e => setPoAddress(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Building Type</label>
                        <select className="form-input" value={poBuildingType} onChange={e => setPoBuildingType(e.target.value)}>
                          <option value="">Select</option>
                          {BUILDING_TYPES.map(t => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="form-2col">
                        <div className="form-group">
                          <label className="form-label">Roof accessible?</label>
                          <select className="form-input" value={poRoofAccess} onChange={e => setPoRoofAccess(e.target.value)}>
                            <option value="">Select</option>
                            <option>Yes</option><option>No</option><option>Not sure</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Existing power on roof?</label>
                          <select className="form-input" value={poPower} onChange={e => setPoPower(e.target.value)}>
                            <option value="">Select</option>
                            <option>Yes</option><option>No</option><option>Not sure</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Any comments</label>
                        <textarea className="form-input" rows={3}
                          placeholder="Anything else we should know about the building or your interest in a Skynode partnership…"
                          value={poNotes} onChange={e => setPoNotes(e.target.value)} />
                      </div>
                      <button type="submit" className="btn btn-primary" disabled={poLoading} style={{width:'100%',justifyContent:'center',marginTop:'8px',opacity:poLoading?0.7:1}}>
                        {poLoading ? 'Submitting…' : 'Submit for Evaluation'}
                        {!poLoading && <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </button>
                      {poError && <p style={{fontSize:'13px',color:'#f87171',marginTop:'12px',textAlign:'center',lineHeight:'1.5'}}>{poError}</p>}
                      <p style={{fontSize:'11px',color:'var(--tx-6)',marginTop:'10px',textAlign:'center',lineHeight:'1.5'}}>Your information is used only to evaluate your building. A confirmation will be sent to your email.</p>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* ── SIDEBAR ── */}
            <div className="contact-sidebar">
              <div className="sidebar-card reveal">
                <div className="sidebar-title">What happens next</div>
                <div className="next-steps">
                  {[
                    'Submit your inquiry using the form.',
                    'A real person at Skynode reviews it within one business day.',
                    'If we have what you need, we\'ll reach out to schedule a call.',
                    'If we don\'t, we\'ll tell you honestly — and suggest alternatives where we can.',
                  ].map((s, i) => (
                    <div key={i} className="next-step">
                      <div className="next-step-num">{i + 1}</div>
                      <div className="next-step-text">{s}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sidebar-card reveal">
                <div className="sidebar-title">Direct contact</div>
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
                    <span>New York · Florida · Illinois · Connecticut</span>
                  </div>
                </div>
              </div>

              <div className="sidebar-card reveal">
                <div className="sidebar-title">Not sure where to start?</div>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  <Link to="/skynodes" className="btn btn-outline-dark btn-sm">Browse Skynodes →</Link>
                  <Link to="/solutions" className="btn btn-outline-dark btn-sm">View All Solutions →</Link>
                  <Link to="/how-it-works" className="btn btn-outline-dark btn-sm">How It Works →</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
