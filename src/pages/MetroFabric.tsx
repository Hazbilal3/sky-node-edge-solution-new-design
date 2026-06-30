import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { usePageTitle } from '../hooks/usePageTitle';
import { useDroneSwarmCanvas } from '../hooks/useDroneSwarmCanvas';
import { useMetroFabricCanvas } from '../hooks/useMetroFabricCanvas';

const HERO_NODES = [
  {rx:0.06,ry:0.16},{rx:0.22,ry:0.08},{rx:0.40,ry:0.18},{rx:0.58,ry:0.08},{rx:0.76,ry:0.20},{rx:0.93,ry:0.12},
  {rx:0.14,ry:0.42},{rx:0.32,ry:0.52},{rx:0.50,ry:0.40},{rx:0.68,ry:0.54},{rx:0.86,ry:0.44},{rx:0.97,ry:0.60},
  {rx:0.08,ry:0.72},{rx:0.26,ry:0.80},{rx:0.44,ry:0.68},{rx:0.62,ry:0.82},{rx:0.80,ry:0.70},{rx:0.95,ry:0.84},
];

const CTA_NODES = [
  {rx:0.10,ry:0.20},{rx:0.30,ry:0.10},{rx:0.52,ry:0.22},{rx:0.74,ry:0.12},{rx:0.92,ry:0.28},
  {rx:0.18,ry:0.52},{rx:0.42,ry:0.60},{rx:0.66,ry:0.48},{rx:0.88,ry:0.58},
  {rx:0.08,ry:0.78},{rx:0.30,ry:0.86},{rx:0.54,ry:0.76},{rx:0.78,ry:0.88},{rx:0.95,ry:0.74},
];

const BENEFITS = [
  {
    title: 'Latency: direct path, faster medium',
    detail: 'Skynode links go point-to-point across shorter distances, and wireless propagates faster than optical fiber. Both advantages compound. The result shows up in your measurements, not just our marketing.',
    icon: <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    val: '<5ms', valLabel: 'Intra-fabric latency (representative)',
  },
  {
    title: 'Uptime: multiple paths, automatic failover',
    detail: 'Single-path networks have a single point of failure. Metro Fabric routes across simultaneous links. When one degrades, traffic reroutes automatically. SLA-backed uptime with contractual teeth.',
    icon: <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    val: '99.9%', valLabel: 'Target uptime SLA (confirmed per engagement)',
  },
  {
    title: 'Bandwidth: dedicated capacity, no shared lanes',
    detail: 'Leased carrier circuits get oversold, throttled at peak, and repriced at renewal. Skynode links are dedicated to your deployment. No shared congestion, no contention penalties.',
    icon: <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><rect x="3" y="7" width="14" height="6" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    val: 'TBC', valLabel: 'Capacity per link (confirmed per node)',
  },
  {
    title: 'Connectivity: north-south and east-west',
    detail: 'Getting between your own sites across the metro — without the latency penalty and cost of a carrier circuit — is where Metro Fabric earns its place. Extends to private locations where fiber is not practical.',
    icon: <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    val: '4', valLabel: 'Metro markets interconnected',
  },
];

const USE_CASES = [
  {
    vertical: 'Broadcasting',
    color: '#C4B5FD',
    bg: 'rgba(124,58,237,0.12)',
    icon: <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><circle cx="10" cy="12" r="3" fill="currentColor"/><path d="M6.5 8a4.5 4.5 0 0 0 0 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M13.5 8a4.5 4.5 0 0 1 0 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M3.5 5a9 9 0 0 0 0 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/><path d="M16.5 5a9 9 0 0 1 0 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/></svg>,
    headline: 'Interconnect for simulcast, backup, and relay chains',
    body: 'Primary and backup site interconnection, simulcast timing distribution, translator relay chains, and STL-replacing private backhaul — all running across a dedicated fabric with no shared carrier circuits.',
    link: '/broadcasting',
  },
  {
    vertical: 'Private Communications',
    color: '#6BC0DD',
    bg: 'rgba(64,156,188,0.12)',
    icon: <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><circle cx="10" cy="11" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M6.5 7.5a5 5 0 0 0 0 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M13.5 7.5a5 5 0 0 1 0 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    headline: 'Repeater, receiver, and dispatch interconnection',
    body: 'Link repeater sites to receivers to dispatch centers across the metro over a private, resilient fabric — with the low latency that voted and simulcast radio systems require.',
    link: '/private-communications',
  },
  {
    vertical: 'Edge Colocation',
    color: '#5BE49B',
    bg: 'rgba(91,228,155,0.12)',
    icon: <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 10h6M7 13h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    headline: 'Distributed compute orchestration across nodes',
    body: 'Move workloads between edge nodes, synchronize distributed AI inference, and maintain consistent state across the metro without relying on public internet paths or overloaded carrier links.',
    link: '/edge-colocation',
  },
  {
    vertical: 'Enterprise Connectivity',
    color: '#FB923C',
    bg: 'rgba(251,146,60,0.12)',
    icon: <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><circle cx="5" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="15" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M7.5 10h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    headline: 'Office-to-office without carrier circuits',
    body: 'Private metropolitan connectivity between offices, data facilities, and critical assets — with lower latency, more routing control, and less reliance on shared public internet infrastructure.',
    link: '/private-communications',
  },
];

const HOW_STEPS = [
  {
    n: '01',
    title: 'Node-to-node wireless backhaul',
    desc: 'High-capacity point-to-point wireless links connect Skynode locations directly — shorter path, lower latency, dedicated capacity. No shared circuits, no carrier middle layer.',
  },
  {
    n: '02',
    title: 'Fiber interconnection where applicable',
    desc: 'Where dark fiber or lit circuits are available and cost-effective, Metro Fabric incorporates them as additional links — increasing redundancy without removing the speed advantage of wireless.',
  },
  {
    n: '03',
    title: 'Automatic failover and path redundancy',
    desc: 'Every Metro Fabric deployment is designed with redundant paths. When a link degrades, traffic reroutes automatically. The network self-heals before a ticket is opened.',
  },
  {
    n: '04',
    title: 'Private, managed, monitored',
    desc: 'Metro Fabric runs as a managed private network. No public internet exposure in the data path. Skynode monitors performance and responds to anomalies as part of the service.',
  },
];

export default function MetroFabric() {
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const ctaCanvasRef  = useRef<HTMLCanvasElement>(null);
  const metroRef1     = useRef<HTMLCanvasElement>(null);
  const metroRef2     = useRef<HTMLCanvasElement>(null);

  const [activeStep, setActiveStep] = useState(0);

  useReveal();
  usePageTitle('Metro Fabric');
  useDroneSwarmCanvas(heroCanvasRef, { nodes: HERO_NODES, count: 18, speed: 1.0, links: 2 });
  useDroneSwarmCanvas(ctaCanvasRef,  { nodes: CTA_NODES,  count: 10, speed: 0.85, links: 2 });
  useMetroFabricCanvas(metroRef1);
  useMetroFabricCanvas(metroRef2);

  return (
    <>
      <style>{`
        .mf-hero { position:relative; overflow:hidden; padding:120px 0 96px; min-height:76vh; display:flex; align-items:center; }
        #mfHeroCanvas { position:absolute; inset:0; width:100%; height:100%; z-index:0; pointer-events:none; }
        .mf-hero-scrim { position:absolute; inset:0; z-index:1;
          background:linear-gradient(155deg,rgba(8,18,28,0.88) 0%,rgba(8,18,28,0.62) 55%,rgba(8,18,28,0.82) 100%); }
        .mf-hero-inner { position:relative; z-index:2; max-width:720px; }
        .mf-hero h1 { font-size:clamp(36px,5vw,66px); font-weight:900; line-height:1.06; letter-spacing:-0.028em; color:rgb(var(--fg)); margin-bottom:22px; }
        .mf-hero h1 em { font-style:normal; color:var(--sky-blue); }
        .mf-hero-sub { font-size:17px; color:var(--tx-3); line-height:1.78; max-width:580px; margin-bottom:40px; }
        .mf-hero-actions { display:flex; gap:14px; flex-wrap:wrap; margin-bottom:56px; }
        .mf-stat-bar { display:flex; gap:40px; flex-wrap:wrap; padding-top:48px; border-top:1px solid rgba(64,156,188,0.20); }
        .mf-stat { display:flex; flex-direction:column; gap:4px; }
        .mf-stat-val { font-size:32px; font-weight:900; color:var(--sky-blue); line-height:1; }
        .mf-stat-lbl { font-size:11px; color:var(--tx-5); font-weight:600; letter-spacing:0.08em; text-transform:uppercase; }

        /* Problem section */
        .mf-problem { padding:100px 0; }
        .mf-problem-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
        .mf-problem-h2 { font-size:clamp(26px,3.4vw,42px); font-weight:900; line-height:1.12; letter-spacing:-0.025em; color:var(--light-text); margin-bottom:20px; }
        .mf-problem-h2 em { font-style:normal; color:var(--teal-primary); }
        .mf-problem-body { font-size:15px; color:var(--light-muted); line-height:1.8; margin-bottom:16px; }
        .mf-comparison { display:flex; flex-direction:column; gap:12px; }
        .mf-cmp-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .mf-cmp-card { padding:20px; border-radius:var(--r-md); }
        .mf-cmp-card--before { background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.18); }
        .mf-cmp-card--after  { background:rgba(64,156,188,0.06); border:1px solid rgba(64,156,188,0.22); }
        .mf-cmp-label { font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:8px; }
        .mf-cmp-label--before { color:rgba(239,68,68,0.8); }
        .mf-cmp-label--after  { color:var(--sky-blue); }
        .mf-cmp-item { font-size:13px; color:var(--light-text); line-height:1.6; display:flex; gap:7px; margin-bottom:5px; }
        .mf-cmp-item::before { content:''; flex-shrink:0; margin-top:6px; width:5px; height:5px; border-radius:50%; }
        .mf-cmp-card--before .mf-cmp-item::before { background:rgba(239,68,68,0.6); }
        .mf-cmp-card--after  .mf-cmp-item::before { background:var(--teal-primary); }

        /* How it works */
        .mf-how { padding:96px 0; border-top:1px solid var(--border-dark); border-bottom:1px solid var(--border-dark); }
        .mf-how-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; }
        .mf-steps { display:flex; flex-direction:column; gap:0; }
        .mf-step { display:flex; gap:20px; padding:24px 0; border-bottom:1px solid var(--border-dark); cursor:pointer; transition:all .2s; }
        .mf-step:last-child { border-bottom:none; }
        .mf-step.active { padding-left:4px; }
        .mf-step-n { font-size:11px; font-weight:700; color:var(--sky-blue); letter-spacing:0.1em; margin-top:2px; flex-shrink:0; width:28px; }
        .mf-step-title { font-size:15px; font-weight:700; color:rgb(var(--fg)); margin-bottom:6px; }
        .mf-step-desc { font-size:13px; color:var(--tx-4); line-height:1.7; max-height:0; overflow:hidden; transition:max-height .35s ease, opacity .25s; opacity:0; }
        .mf-step.active .mf-step-desc { max-height:200px; opacity:1; }
        .mf-step:not(.active) .mf-step-title { color:var(--tx-3); }
        .mf-canvas-col { position:sticky; top:100px; }
        .mf-canvas-wrap { background:var(--bg-card); border:1px solid var(--border-dark); border-radius:var(--r-lg); overflow:hidden; }
        .mf-canvas-hdr { padding:12px 18px; border-bottom:1px solid var(--border-dark); display:flex; justify-content:space-between; align-items:center; background:rgba(64,156,188,0.06); }
        .mf-canvas-title { font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--tx-3); }
        .mf-canvas-live { display:flex; align-items:center; gap:5px; font-size:11px; font-weight:700; color:var(--green); }
        .mf-canvas-live::before { content:''; width:6px; height:6px; border-radius:50%; background:var(--green); box-shadow:0 0 5px var(--green); animation:pulse-green 2s infinite; }
        @keyframes pulse-green { 0%,100%{opacity:1}50%{opacity:0.5} }
        .mf-canvas-legend { display:flex; gap:14px; padding:10px 18px; border-top:1px solid var(--border-dark); flex-wrap:wrap; }
        .mf-leg-item { display:flex; align-items:center; gap:5px; font-size:11px; color:var(--tx-5); }
        .mf-leg-dot { width:8px; height:8px; border-radius:50%; }

        /* Benefits */
        .mf-benefits { padding:96px 0; }
        .mf-benefits-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:56px; }
        .mf-benefit-card { background:var(--bg-card); border:1px solid var(--border-dark); border-radius:var(--r-lg); padding:32px; position:relative; overflow:hidden; transition:all .22s; }
        .mf-benefit-card:hover { border-color:rgba(64,156,188,0.40); transform:translateY(-3px); box-shadow:0 10px 32px rgba(32,101,132,0.18); }
        .mf-benefit-card::after { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,var(--teal-primary),var(--sky-blue)); }
        .mf-benefit-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; }
        .mf-benefit-icon { width:44px; height:44px; border-radius:var(--r-sm); background:rgba(64,156,188,0.12); border:1px solid rgba(64,156,188,0.20); display:flex; align-items:center; justify-content:center; color:var(--sky-blue); }
        .mf-benefit-val { text-align:right; }
        .mf-benefit-num { font-size:26px; font-weight:900; color:var(--sky-blue); line-height:1; }
        .mf-benefit-num-lbl { font-size:10px; color:var(--tx-5); }
        .mf-benefit-title { font-size:16px; font-weight:700; color:rgb(var(--fg)); margin-bottom:10px; }
        .mf-benefit-detail { font-size:13px; color:var(--tx-4); line-height:1.7; }

        /* Use cases */
        .mf-usecases { padding:96px 0; border-top:1px solid var(--border-dark); }
        .mf-usecase-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:56px; }
        .mf-usecase-card { border-radius:var(--r-lg); padding:28px; border:1px solid var(--border-dark); background:rgba(var(--fg),0.02); transition:all .2s; }
        .mf-usecase-card:hover { border-color:rgba(64,156,188,0.35); }
        .mf-usecase-icon { width:42px; height:42px; border-radius:var(--r-sm); display:flex; align-items:center; justify-content:center; margin-bottom:16px; }
        .mf-usecase-vertical { font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:8px; }
        .mf-usecase-headline { font-size:15px; font-weight:700; color:rgb(var(--fg)); margin-bottom:9px; }
        .mf-usecase-body { font-size:13px; color:var(--tx-4); line-height:1.7; margin-bottom:16px; }
        .mf-usecase-link { font-size:12px; font-weight:700; color:var(--sky-blue); display:flex; align-items:center; gap:5px; text-decoration:none; }
        .mf-usecase-link svg { transition:transform .15s; }
        .mf-usecase-link:hover svg { transform:translateX(3px); }

        /* Final CTA */
        .mf-final { position:relative; padding:120px 0; text-align:center; overflow:hidden; }
        #mfCtaCanvas { position:absolute; inset:0; width:100%; height:100%; z-index:0; pointer-events:none; }
        .mf-final-scrim { position:absolute; inset:0; z-index:1; background:radial-gradient(ellipse 70% 80% at 50% 50%, rgba(32,101,132,0.14) 0%, transparent 70%), linear-gradient(180deg,rgba(var(--bg-base),0.95) 0%,rgba(var(--bg-base),0.90) 100%); }
        .mf-final > *:not(canvas):not(.mf-final-scrim) { position:relative; z-index:2; }
        .mf-final h2 { font-size:clamp(30px,4.5vw,54px); font-weight:900; letter-spacing:-0.025em; color:rgb(var(--fg)); margin-bottom:16px; }
        .mf-final h2 em { font-style:normal; color:var(--sky-blue); }
        .mf-final p { font-size:16px; color:var(--tx-3); max-width:480px; margin:0 auto 40px; line-height:1.75; }
        .mf-final-btns { display:flex; justify-content:center; gap:14px; flex-wrap:wrap; }

        @media(max-width:900px){
          .mf-problem-grid, .mf-how-grid, .mf-benefits-grid, .mf-usecase-grid { grid-template-columns:1fr; gap:40px; }
          .mf-canvas-col { position:static; }
          .mf-cmp-row { grid-template-columns:1fr; }
          .mf-stat-bar { gap:24px; }
        }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="mf-hero">
        <canvas ref={heroCanvasRef} id="mfHeroCanvas" aria-hidden="true" />
        <div className="mf-hero-scrim" />
        <div className="container">
          <div className="mf-hero-inner">
            <div className="city-tags">
              <span className="city-tag">New York</span>
              <span className="city-tag">Connecticut</span>
              <span className="city-tag">Florida</span>
              <span className="city-tag">Illinois</span>
            </div>
            <div className="eyebrow eyebrow--light">Metro Fabric</div>
            <h1 className="mf-hero-h1" style={{fontSize:'clamp(36px,5vw,66px)',fontWeight:900,lineHeight:1.06,letterSpacing:'-0.028em',color:'rgb(var(--fg))',marginBottom:'22px'}}>
              Infrastructure that connects<br/><span style={{color:'var(--sky-blue)'}}>your infrastructure.</span>
            </h1>
            <p className="mf-hero-sub">
              Metro Fabric is live across New York — linking every Skynode location through point-to-point wireless backhaul, fiber, and high-capacity interconnect. Available for rapid deployment in Miami and Chicago. Every node in the network is interconnected.
            </p>
            <div className="mf-hero-actions">
              <Link to="/skynodes" className="btn btn-primary">Browse Metro-Fabric-Enabled Nodes</Link>
              <Link to="/contact"  className="btn btn-outline-light">Talk to Skynode</Link>
            </div>
            <div className="mf-stat-bar">
              <div className="mf-stat"><div className="mf-stat-val">4</div><div className="mf-stat-lbl">Metro markets</div></div>
              <div className="mf-stat"><div className="mf-stat-val">&lt;5ms</div><div className="mf-stat-lbl">Intra-fabric latency</div></div>
              <div className="mf-stat"><div className="mf-stat-val">99.9%</div><div className="mf-stat-lbl">Target uptime SLA</div></div>
              <div className="mf-stat"><div className="mf-stat-val">99</div><div className="mf-stat-lbl">Interconnected nodes</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE PROBLEM ═══ */}
      <section className="mf-problem section-light">
        <div className="container">
          <div className="mf-problem-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow--dark">The Problem With Isolated Sites</div>
              <h2 className="mf-problem-h2">A single site solves a proximity problem.<br/><em>A connected portfolio solves a network problem.</em></h2>
              <p className="mf-problem-body">Most distributed deployments stall at the first site. The second site adds coverage. But between site one and site two, there is no reliable, private, low-latency path. There is a carrier circuit that gets oversold, throttled, and repriced every renewal cycle.</p>
              <p className="mf-problem-body">Metro Fabric is the interconnect layer that makes a portfolio of sites behave like a single coordinated network — with path diversity, dedicated capacity, and none of the shared-circuit compromises.</p>
            </div>
            <div className="reveal">
              <div className="mf-comparison">
                <div className="mf-cmp-row">
                  <div className="mf-cmp-card mf-cmp-card--before">
                    <div className="mf-cmp-label mf-cmp-label--before">Carrier circuits</div>
                    {['Shared bandwidth, contention at peak','Oversold capacity, throttled without notice','Renegotiate price at every renewal','No path diversity unless you buy redundancy','Latency dictated by the carrier routing table'].map((t,i)=>(
                      <div key={i} className="mf-cmp-item">{t}</div>
                    ))}
                  </div>
                  <div className="mf-cmp-card mf-cmp-card--after">
                    <div className="mf-cmp-label mf-cmp-label--after">Metro Fabric</div>
                    {['Dedicated capacity, no shared lanes','Point-to-point wireless, no middleman','Fixed contract terms, transparent pricing','Redundant paths, automatic failover','Shortest physical path between your sites'].map((t,i)=>(
                      <div key={i} className="mf-cmp-item">{t}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="mf-how section-dark">
        <div className="container">
          <div className="eyebrow eyebrow--light reveal" style={{justifyContent:'flex-start'}}>How It Works</div>
          <div className="mf-how-grid">
            <div className="reveal">
              <h2 style={{fontSize:'clamp(26px,3.2vw,40px)',fontWeight:900,letterSpacing:'-0.025em',lineHeight:1.12,color:'rgb(var(--fg))',marginBottom:'36px'}}>
                A managed private network.<br/><span style={{color:'var(--sky-blue)'}}>End to end.</span>
              </h2>
              <div className="mf-steps">
                {HOW_STEPS.map((s, i) => (
                  <div key={i} className={`mf-step${activeStep === i ? ' active' : ''}`} onClick={() => setActiveStep(i)}>
                    <div className="mf-step-n">{s.n}</div>
                    <div>
                      <div className="mf-step-title">{s.title}</div>
                      <div className="mf-step-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mf-canvas-col reveal">
              <div className="mf-canvas-wrap">
                <div className="mf-canvas-hdr">
                  <span className="mf-canvas-title">Metro Fabric — Live Network View</span>
                  <span className="mf-canvas-live">Active</span>
                </div>
                <canvas ref={metroRef1} id="mfMetroCanvas1" width={480} height={500} style={{width:'100%',display:'block'}} />
                <div className="mf-canvas-legend">
                  <div className="mf-leg-item"><span className="mf-leg-dot" style={{background:'#5AB4D6'}}/> Cloud uplinks</div>
                  <div className="mf-leg-item"><span className="mf-leg-dot" style={{background:'#409CBC'}}/> Metro Fabric</div>
                  <div className="mf-leg-item"><span className="mf-leg-dot" style={{background:'#5BE49B'}}/> Private downlinks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BENEFITS ═══ */}
      <section className="mf-benefits section-light">
        <div className="container">
          <div className="section-header-center reveal">
            <div className="eyebrow eyebrow--dark">Why Metro Fabric</div>
            <h2 className="mf-problem-h2" style={{color:'var(--light-text)'}}>Four reasons your sites are better<br/><em>connected than isolated.</em></h2>
            <p style={{fontSize:'15px',color:'var(--light-muted)',lineHeight:1.75}}>Each advantage compounds the others. Lower latency at the link level means lower latency across every hop. Uptime at the path level means uptime across the deployment.</p>
          </div>
          <div className="mf-benefits-grid">
            {BENEFITS.map((b, i) => (
              <div key={i} className="mf-benefit-card reveal">
                <div className="mf-benefit-top">
                  <div className="mf-benefit-icon">{b.icon}</div>
                  <div className="mf-benefit-val">
                    <div className="mf-benefit-num">{b.val}</div>
                    <div className="mf-benefit-num-lbl">{b.valLabel}</div>
                  </div>
                </div>
                <div className="mf-benefit-title">{b.title}</div>
                <div className="mf-benefit-detail">{b.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ USE CASES ═══ */}
      <section className="mf-usecases section-dark">
        <div className="container">
          <div className="section-header-center reveal">
            <div className="eyebrow eyebrow--light">Metro Fabric Use Cases</div>
            <h2 style={{fontSize:'clamp(26px,3.4vw,42px)',fontWeight:900,letterSpacing:'-0.025em',lineHeight:1.12,color:'rgb(var(--fg))',marginBottom:'16px'}}>
              Across every vertical.<br/><span style={{color:'var(--sky-blue)'}}>One interconnect layer.</span>
            </h2>
            <p style={{fontSize:'15px',color:'var(--tx-3)',lineHeight:1.75}}>Metro Fabric is not a product for a single vertical. It is the interconnect layer that makes distributed infrastructure viable across broadcasting, private communications, edge compute, and enterprise connectivity.</p>
          </div>

          <div className="mf-usecase-grid">
            {USE_CASES.map((u, i) => (
              <div key={i} className="mf-usecase-card reveal">
                <div className="mf-usecase-icon" style={{background:u.bg}}>
                  <span style={{color:u.color}}>{u.icon}</span>
                </div>
                <div className="mf-usecase-vertical" style={{color:u.color}}>{u.vertical}</div>
                <div className="mf-usecase-headline">{u.headline}</div>
                <div className="mf-usecase-body">{u.body}</div>
                <Link to={u.link} className="mf-usecase-link">
                  Learn more
                  <svg viewBox="0 0 12 12" fill="none" width="11" height="11"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            ))}
          </div>

          {/* Second canvas instance */}
          <div style={{marginTop:'64px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px',alignItems:'center'}} className="reveal">
            <div className="mf-canvas-wrap">
              <div className="mf-canvas-hdr">
                <span className="mf-canvas-title">Metro Fabric — Network Visualization</span>
                <span className="mf-canvas-live">Active</span>
              </div>
              <canvas ref={metroRef2} id="mfMetroCanvas2" width={480} height={400} style={{width:'100%',display:'block'}} />
              <div className="mf-canvas-legend">
                <div className="mf-leg-item"><span className="mf-leg-dot" style={{background:'#5AB4D6'}}/> Cloud uplinks</div>
                <div className="mf-leg-item"><span className="mf-leg-dot" style={{background:'#409CBC'}}/> Metro Fabric</div>
                <div className="mf-leg-item"><span className="mf-leg-dot" style={{background:'#5BE49B'}}/> Private downlinks</div>
              </div>
            </div>
            <div>
              <div className="eyebrow eyebrow--light">The Network in Practice</div>
              <h3 style={{fontSize:'clamp(22px,2.8vw,34px)',fontWeight:900,letterSpacing:'-0.02em',color:'rgb(var(--fg))',marginBottom:'16px',lineHeight:1.15}}>
                Every node in your deployment <span style={{color:'var(--sky-blue)'}}>is one hop away.</span>
              </h3>
              <p style={{fontSize:'14px',color:'var(--tx-4)',lineHeight:1.75,marginBottom:'16px'}}>Metro Fabric is designed around the idea that every node in your deployment should be able to talk to every other node directly — without going through a public carrier or a distant data center.</p>
              <p style={{fontSize:'14px',color:'var(--tx-4)',lineHeight:1.75,marginBottom:'28px'}}>When a link degrades, the network reroutes. When a node goes offline, the rest of the fabric continues. The whole deployment becomes more reliable than any individual site within it.</p>
              <Link to="/contact" className="btn btn-outline-light" style={{display:'inline-flex'}}>
                Ask about Metro Fabric
                <svg className="arrow-icon" viewBox="0 0 16 16" fill="none" style={{width:14,height:14}}><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="mf-final">
        <canvas ref={ctaCanvasRef} id="mfCtaCanvas" aria-hidden="true" />
        <div className="mf-final-scrim" />
        <div className="eyebrow eyebrow--light" style={{justifyContent:'center'}}>Ready to Connect</div>
        <h2>Stop routing your sites<br/><em>through someone else's network.</em></h2>
        <p>Tell us how many sites you're connecting, what markets, and what the latency and uptime requirements are. We'll tell you what Metro Fabric can do for you.</p>
        <div className="mf-final-btns">
          <Link to="/contact"  className="btn btn-primary"       style={{padding:'16px 32px',fontSize:'15px'}}>Talk to Skynode</Link>
          <Link to="/skynodes" className="btn btn-outline-light" style={{padding:'16px 32px',fontSize:'15px'}}>Browse Connected Nodes</Link>
        </div>
      </section>
    </>
  );
}
