import { useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { usePageTitle } from '../hooks/usePageTitle';
import { useHeroBg } from '../hooks/useHeroBg';

const HERO_CFG = {
  rows:3, scaleBack:0.55, rowGap:48, spacing:56, rxMax:30, baseLift:70,
  midMin:170, midMax:300, ampMin:50, ampMax:110, txBoost:90, packets:18,
  speed:1, pulseEvery:950, fog:0.5, rightTall:0.65
};

function genHexPaths(): string[] {
  const R = 16, cx = 1.5 * R, cy = Math.sqrt(3) * R, W = 520, H = 320;
  const paths: string[] = [];
  for (let col = -1; col * cx < W + R; col++) {
    for (let row = -1; row * cy < H + cy; row++) {
      const x = col * cx, y = row * cy + ((col & 1) ? cy / 2 : 0);
      let d = '';
      for (let i = 0; i < 6; i++) {
        const a = Math.PI / 3 * i;
        d += (i ? 'L' : 'M') + (x + R * Math.cos(a)).toFixed(1) + ' ' + (y + R * Math.sin(a)).toFixed(1);
      }
      paths.push(d + 'Z');
    }
  }
  return paths;
}

type FabDotStyle = React.CSSProperties & { '--sx': string; '--sy': string; '--ex': string; '--ey': string };

export default function Home() {
  const heroBgRef = useRef<HTMLCanvasElement>(null);
  const hexPaths  = useMemo(() => genHexPaths(), []);

  useReveal();
  usePageTitle('');
  useHeroBg(heroBgRef, HERO_CFG);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <header className="hero" id="top">
        <canvas ref={heroBgRef} className="hero-bg-canvas" aria-hidden="true" />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="container">
          <div className="hero-grid">
            {/* Left: copy */}
            <div className="hero-content">
              <div className="hero-markets">
                <span className="market-pill">Connecticut</span>
                <span className="market-pill">Florida</span>
                <span className="market-pill">Illinois</span>
                <span className="market-pill">New York</span>
              </div>
              <h1 className="hero-title">Infrastructure for the <em>Metropolitan Edge.</em></h1>
              <p className="hero-sub">The most valuable edge infrastructure is not far from the city. It is inside it.</p>
              <p className="hero-body">Skynode provides access to managed sites with the elevation, space, power, and connectivity needed to support real communications and compute deployments in dense metropolitan environments.</p>
              <div className="hero-cta">
                <Link to="/contact" className="btn btn-primary">
                  Schedule a Call
                  <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <Link to="/solutions" className="btn btn-outline-light">Explore Solutions</Link>
              </div>
              <Link to="/skynodes" className="text-link" style={{display:'inline-flex',alignItems:'center',gap:'6px',marginTop:'20px'}}>
                View Skynodes
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            {/* Right: Metro Fabric Panel */}
            <aside className="hero-fabric" aria-label="Skynode metro fabric">
              <div className="fab-head">
                <span className="fab-title">Skynode Metro Fabric</span>
                <span className="fab-status"><span className="dot" />Network Operational</span>
              </div>
              <svg className="fab-map" viewBox="0 0 520 320" role="img" aria-labelledby="fabTitle fabDesc" preserveAspectRatio="xMidYMid meet">
                <title id="fabTitle">Skynode metro fabric map</title>
                <desc id="fabDesc">Network nodes in Chicago, Springfield, New Haven, New York City and Miami, linked across the metro fabric.</desc>
                <g>{hexPaths.map((d, i) => <path key={i} d={d} className="fab-hex" />)}</g>
                <line className="fab-link" x1="68" y1="83" x2="113" y2="55"/>
                <line className="fab-link" x1="113" y1="55" x2="415" y2="71"/>
                <line className="fab-link" x1="415" y1="71" x2="439" y2="63"/>
                <line className="fab-link" x1="415" y1="71" x2="278" y2="270"/>
                <line className="fab-link" x1="113" y1="55" x2="278" y2="270"/>
                <g className="fab-dot" style={{ transform:'translate(68px,83px)', '--sx':'68px','--sy':'83px','--ex':'113px','--ey':'55px', animationDuration:'2.4s', animationDelay:'-0.6s' } as FabDotStyle}><circle className="glow" r="3.2"/><circle className="core" r="2"/></g>
                <g className="fab-dot" style={{ transform:'translate(113px,55px)', '--sx':'113px','--sy':'55px','--ex':'415px','--ey':'71px', animationDuration:'3.6s', animationDelay:'0s' } as FabDotStyle}><circle className="glow" r="3.2"/><circle className="core" r="2"/></g>
                <g className="fab-dot" style={{ transform:'translate(113px,55px)', '--sx':'113px','--sy':'55px','--ex':'415px','--ey':'71px', animationDuration:'3.6s', animationDelay:'-1.8s' } as FabDotStyle}><circle className="glow" r="3.2"/><circle className="core" r="2"/></g>
                <g className="fab-dot" style={{ transform:'translate(439px,63px)', '--sx':'439px','--sy':'63px','--ex':'415px','--ey':'71px', animationDuration:'2.4s', animationDelay:'-1.2s' } as FabDotStyle}><circle className="glow" r="3.2"/><circle className="core" r="2"/></g>
                <g className="fab-dot" style={{ transform:'translate(278px,270px)', '--sx':'278px','--sy':'270px','--ex':'415px','--ey':'71px', animationDuration:'3.4s', animationDelay:'0s' } as FabDotStyle}><circle className="glow" r="3.2"/><circle className="core" r="2"/></g>
                <g className="fab-dot" style={{ transform:'translate(278px,270px)', '--sx':'278px','--sy':'270px','--ex':'415px','--ey':'71px', animationDuration:'3.4s', animationDelay:'-1.7s' } as FabDotStyle}><circle className="glow" r="3.2"/><circle className="core" r="2"/></g>
                <g className="fab-dot" style={{ transform:'translate(278px,270px)', '--sx':'278px','--sy':'270px','--ex':'113px','--ey':'55px', animationDuration:'3.5s', animationDelay:'-2s' } as FabDotStyle}><circle className="glow" r="3.2"/><circle className="core" r="2"/></g>
                <g><circle className="fab-pulse" cx="113" cy="55" r="9" style={{animationDelay:'0s'}}/><circle className="fab-ring" cx="113" cy="55" r="9"/><circle className="fab-core" cx="113" cy="55" r="3"/><text className="fab-label" x="106" y="45" textAnchor="end">CHICAGO</text></g>
                <g><circle className="fab-pulse" cx="68" cy="83" r="7" style={{animationDelay:'0.4s'}}/><circle className="fab-ring" cx="68" cy="83" r="7"/><circle className="fab-core" cx="68" cy="83" r="2.4"/><text className="fab-label" x="68" y="101" textAnchor="middle">SPRINGFIELD</text></g>
                <g><circle className="fab-pulse" cx="439" cy="63" r="7" style={{animationDelay:'0.8s'}}/><circle className="fab-ring" cx="439" cy="63" r="7"/><circle className="fab-core" cx="439" cy="63" r="2.4"/><text className="fab-label" x="439" y="48" textAnchor="middle">NEW HAVEN</text></g>
                <g><circle className="fab-pulse" cx="415" cy="71" r="9" style={{animationDelay:'1.2s'}}/><circle className="fab-ring" cx="415" cy="71" r="9"/><circle className="fab-core" cx="415" cy="71" r="3"/><text className="fab-label" x="424" y="86" textAnchor="start">NYC</text></g>
                <g><circle className="fab-pulse" cx="278" cy="270" r="7" style={{animationDelay:'1.6s'}}/><circle className="fab-ring" cx="278" cy="270" r="7"/><circle className="fab-core" cx="278" cy="270" r="2.4"/><text className="fab-label" x="278" y="256" textAnchor="middle">MIAMI</text></g>
              </svg>
              <div className="fab-matrix">
                <div className="fab-row"><span className="fab-city">New York City</span><div className="fab-tags"><span className="tag">Edge Compute</span><span className="tag">Broadcasting</span><span className="tag">Private Comms</span><span className="tag">Experimental</span></div></div>
                <div className="fab-row"><span className="fab-city">New Haven</span><div className="fab-tags"><span className="tag">Edge Compute</span><span className="tag">Broadcasting</span><span className="tag">Private Comms</span><span className="tag">Experimental</span></div></div>
                <div className="fab-row"><span className="fab-city">Chicago</span><div className="fab-tags"><span className="tag">Edge Compute</span><span className="tag">Broadcasting</span><span className="tag">Private Comms</span><span className="tag">Experimental</span></div></div>
                <div className="fab-row"><span className="fab-city">Springfield</span><div className="fab-tags"><span className="tag">Edge Compute</span><span className="tag">Broadcasting</span><span className="tag">Private Comms</span><span className="tag">Experimental</span></div></div>
                <div className="fab-row"><span className="fab-city">Miami</span><div className="fab-tags"><span className="tag">Edge Compute</span><span className="tag">Broadcasting</span><span className="tag">Private Comms</span><span className="tag">Experimental</span></div></div>
              </div>
            </aside>
          </div>
        </div>
      </header>

      {/* ═══ PROOF POINTS STRIP ═══ */}
      <div className="proof-strip">
        <div className="container">
          <p className="proof-strip-hl">Built for infrastructure that has to work in the real world</p>
          <div className="proof-points">
            <div className="proof-point">
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M10 18s7-5 7-10A7 7 0 1 0 3 8c0 5 7 10 7 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="10" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5"/></svg>
              <span>Strategically managed urban sites</span>
            </div>
            <div className="proof-point">
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><rect x="2" y="4" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 14v2M14 14v2M4 16h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <span>Support for broadcast, wireless, and edge deployments</span>
            </div>
            <div className="proof-point">
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><circle cx="4" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="16" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="10" cy="15" r="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5.5 6.5 9 13.5M14.5 6.5 11 13.5M6 5h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              <span>Distributed metro architecture, not isolated one-off locations</span>
            </div>
            <div className="proof-point">
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M4 15 7 9l3 3 2-4 4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>Designed to move buyers from concept to location-specific evaluation</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ WHAT SKYNODE IS ═══ */}
      <section className="section-page">
        <div className="container">
          <div className="what-grid">
            <div className="reveal">
              <div className="eyebrow">What Skynode Is</div>
              <h2 className="sec-h2">A better way to deploy infrastructure <em>across a city.</em></h2>
              <p className="sec-lead">Skynode is a platform for organizations that need physical infrastructure closer to where signals travel, data is generated, and services are delivered. We identify, develop, and manage strategically valuable rooftop and edge locations, then prepare them for practical deployment.</p>
            </div>
            <div className="what-steps reveal">
              <div className="what-step">
                <div className="what-step-num">01</div>
                <div>
                  <h4>Deploy at one node</h4>
                  <p>Begin with a single managed location matched to your market, coverage area, and technical requirements.</p>
                </div>
              </div>
              <div className="what-step">
                <div className="what-step-num">02</div>
                <div>
                  <h4>Expand across multiple nodes</h4>
                  <p>Scale your footprint across additional Skynodes in the same market or across markets as your deployment grows.</p>
                </div>
              </div>
              <div className="what-step">
                <div className="what-step-num">03</div>
                <div>
                  <h4>Operate across a connected metro footprint</h4>
                  <p>Multiple interconnected nodes form the Skynode Metro Fabric — a distributed platform for metro-scale communications and compute.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CATEGORY CARDS ═══ */}
      <section className="section-surface" id="solutions">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow">Solution Categories</div>
            <h2 className="sec-h2">Four infrastructure categories. <em>One metropolitan platform.</em></h2>
          </div>
          <div className="cat-grid">
            <Link className="cat-card violet reveal" to="/broadcasting">
              <div className="bar" />
              <div className="cat-ico"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="3" fill="currentColor"/><path d="M7.5 8.5a6.5 6.5 0 0 0 0 9M16.5 8.5a6.5 6.5 0 0 1 0 9M4.5 6a10 10 0 0 0 0 14M19.5 6a10 10 0 0 1 0 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg></div>
              <h3>Broadcasting</h3>
              <p className="cat-desc">Broadcast infrastructure for FM, television, LPFM, translators, backup facilities, and auxiliary services.</p>
              <div className="cat-tags"><span className="tag">FM / TV</span><span className="tag">LPFM</span><span className="tag">Translator</span><span className="tag">Aux Sites</span></div>
              <span className="text-link">Explore Broadcasting <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </Link>
            <Link className="cat-card reveal" to="/private-communications">
              <div className="bar" />
              <div className="cat-ico"><svg viewBox="0 0 24 24" fill="none"><rect x="9" y="3" width="6" height="13" rx="3" stroke="currentColor" strokeWidth="1.6"/><path d="M6 11a6 6 0 0 0 12 0M12 19v2M9 21h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg></div>
              <h3>Private Communications</h3>
              <p className="cat-desc">Private communications infrastructure for enterprises, government, two-way radio networks, private 5G, and point-to-point data links.</p>
              <div className="cat-tags"><span className="tag">P25 / Simulcast</span><span className="tag">Private 5G</span><span className="tag">P2P Microwave</span></div>
              <span className="text-link">Explore Private Communications <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </Link>
            <Link className="cat-card reveal" to="/edge-colocation">
              <div className="bar" />
              <div className="cat-ico"><svg viewBox="0 0 24 24" fill="none"><rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><rect x="10" y="10" width="4" height="4" rx="1" fill="currentColor"/></svg></div>
              <h3>Edge Colocation</h3>
              <p className="cat-desc">Secure edge environments for compute, AI inference, storage, caching, and network equipment closer to users and demand centers.</p>
              <div className="cat-tags"><span className="tag">AI / GPU Inference</span><span className="tag">Low Latency</span><span className="tag">Neutral Host</span></div>
              <span className="text-link">Explore Edge Colocation <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </Link>
            <Link className="cat-card reveal" to="/experimental">
              <div className="bar" />
              <div className="cat-ico"><svg viewBox="0 0 24 24" fill="none"><path d="M10.5 3v6L5 18.5A2 2 0 0 0 6.8 21.5h10.4A2 2 0 0 0 19 18.5L13.5 9V3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M9 3h6M8 15h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg></div>
              <h3>Experimental</h3>
              <p className="cat-desc">Infrastructure for drones, autonomous systems, sensing, AR, smart city, and next-generation urban applications.</p>
              <div className="cat-tags"><span className="tag">UAS / Drone</span><span className="tag">Spatial AI</span><span className="tag">Smart City</span></div>
              <span className="text-link">Explore Experimental <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ WHY SKYNODE ═══ */}
      <section className="section-page">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow">Why Skynode</div>
            <h2 className="sec-h2">Why infrastructure buyers <em>use Skynode</em></h2>
          </div>
          <div className="why-2col">
            <div className="why-item reveal">
              <div className="wn"><svg viewBox="0 0 24 24" fill="none"><path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6"/></svg></div>
              <div><h4>Real urban placement</h4><p>Built around real sites in real metropolitan environments — not coverage claims on a map.</p></div>
            </div>
            <div className="why-item reveal">
              <div className="wn"><svg viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg></div>
              <div><h4>Faster path to deployment</h4><p>Begin with a managed portfolio of candidate locations — not a blank-page site search.</p></div>
            </div>
            <div className="why-item reveal">
              <div className="wn"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="3" y="14" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><path d="M7 7h.01M7 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></div>
              <div><h4>More than a rooftop</h4><p>Supports actual deployment requirements: equipment, access, power, and connectivity.</p></div>
            </div>
            <div className="why-item reveal">
              <div className="wn"><svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="6" r="2" stroke="currentColor" strokeWidth="1.6"/><circle cx="19" cy="6" r="2" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="18" r="2" stroke="currentColor" strokeWidth="1.6"/><path d="M6.7 7.6l4.3 8.8M17.3 7.6l-4.3 8.8M7 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
              <div><h4>Distributed by design</h4><p>Operate across a metro-wide fabric — not a single isolated site.</p></div>
            </div>
            <div className="why-item reveal" style={{gridColumn:'1 / -1'}}>
              <div className="wn"><svg viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.6"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              <div><h4>Built for multiple stakeholders</h4><p>Technical, operational, and financial teams all served — structured for the full buying committee.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOLUTIONS PREVIEW ═══ */}
      <section className="section-surface">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow">Solutions</div>
            <h2 className="sec-h2">Built for <em>latency-sensitive, location-sensitive,</em> and infrastructure-heavy use cases</h2>
          </div>
          <div className="sol-compact-grid">
            <div className="sol-compact-card reveal"><span className="sdot" /><div className="stext"><h4>AI Grid</h4><p>Distributed inference capacity across metro nodes</p></div></div>
            <div className="sol-compact-card reveal"><span className="sdot" /><div className="stext"><h4>Content Delivery</h4><p>Metro-edge CDN &amp; caching</p></div></div>
            <div className="sol-compact-card reveal"><span className="sdot" /><div className="stext"><h4>Smart City</h4><p>Sensing &amp; urban applications</p></div></div>
            <div className="sol-compact-card reveal"><span className="sdot" /><div className="stext"><h4>Edge Inference</h4><p>Real-time, in-market compute</p></div></div>
            <div className="sol-compact-card reveal"><span className="sdot" /><div className="stext"><h4>Simulcast Radio</h4><p>P25 &amp; two-way networks</p></div></div>
            <div className="sol-compact-card reveal"><span className="sdot" /><div className="stext"><h4>Private 5G</h4><p>Enterprise &amp; campus networks</p></div></div>
          </div>
          <div style={{marginTop:'32px'}} className="reveal">
            <Link to="/solutions" className="text-link">
              View All Solutions
              <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SKYNODES PREVIEW ═══ */}
      <section className="section-page">
        <div className="container">
          <div className="sn-preview-grid">
            <div className="reveal">
              <div className="eyebrow">Skynodes</div>
              <h2 className="sec-h2">Browse actual nodes, <em>not just abstract coverage claims.</em></h2>
              <p className="sec-lead">The Skynodes section is where infrastructure strategy becomes location-specific evaluation. Each Skynode is a real, managed location with documented characteristics for broadcast, private communications, edge compute, and experimental deployment.</p>
              <div style={{marginTop:'32px'}}>
                <Link to="/skynodes" className="btn btn-primary">
                  View Skynodes
                  <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>
            <div className="sn-market-cards reveal">
              <Link to="/markets/new-york" className="sn-market-card">
                <div className="sn-market-name">New York</div>
                <div className="sn-market-cats"><span className="tag">Broadcasting</span><span className="tag">Private Comms</span><span className="tag">Edge Compute</span><span className="tag">Experimental</span></div>
                <span className="sn-market-link">Browse nodes <svg viewBox="0 0 16 16" fill="none" width="12" height="12"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              </Link>
              <Link to="/markets/florida" className="sn-market-card">
                <div className="sn-market-name">Florida</div>
                <div className="sn-market-cats"><span className="tag">Broadcasting</span><span className="tag">Private Comms</span><span className="tag">Edge Compute</span><span className="tag">Experimental</span></div>
                <span className="sn-market-link">Browse nodes <svg viewBox="0 0 16 16" fill="none" width="12" height="12"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              </Link>
              <Link to="/markets/illinois" className="sn-market-card">
                <div className="sn-market-name">Illinois</div>
                <div className="sn-market-cats"><span className="tag">Broadcasting</span><span className="tag">Private Comms</span><span className="tag">Edge Compute</span><span className="tag">Experimental</span></div>
                <span className="sn-market-link">Browse nodes <svg viewBox="0 0 16 16" fill="none" width="12" height="12"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              </Link>
              <Link to="/markets/connecticut" className="sn-market-card">
                <div className="sn-market-name">Connecticut</div>
                <div className="sn-market-cats"><span className="tag">Broadcasting</span><span className="tag">Private Comms</span><span className="tag">Edge Compute</span><span className="tag">Experimental</span></div>
                <span className="sn-market-link">Browse nodes <svg viewBox="0 0 16 16" fill="none" width="12" height="12"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROPERTY OWNERS PREVIEW ═══ */}
      <section className="section-surface">
        <div className="container">
          <div className="po-preview-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow--deep">For Property Owners</div>
              <h2 className="sec-h2">Turn underused rooftop space into <em>infrastructure revenue.</em></h2>
              <p className="sec-lead">Skynode partners with property owners who want to generate additional revenue from rooftop and back-of-house space without becoming infrastructure operators themselves.</p>
              <div className="po-benefits">
                <div className="po-card">
                  <div className="pc"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 3.5v5C20 17 16.5 20.5 12 22 7.5 20.5 4 17 4 11.5v-5L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg></div>
                  <div><h4>We manage the buildout</h4><p>Permitting, structural, and utility coordination handled end-to-end by Skynode.</p></div>
                </div>
                <div className="po-card">
                  <div className="pc"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <div><h4>Structured revenue sharing</h4><p>Turn underused space into a recurring, contractual revenue stream.</p></div>
                </div>
                <div className="po-card">
                  <div className="pc"><svg viewBox="0 0 24 24" fill="none"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6"/></svg></div>
                  <div><h4>Discreet, managed operations</h4><p>Low-profile equipment and professional site management with minimal tenant disruption.</p></div>
                </div>
              </div>
              <div style={{marginTop:'28px'}}>
                <Link to="/property-owners" className="btn btn-outline-deep">
                  For Property Owners
                  <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>
            <div className="po-preview-cta reveal">
              <div className="po-eval-card">
                <p className="eyebrow eyebrow--deep" style={{marginBottom:'14px'}}>Is my building a fit?</p>
                <p style={{fontSize:'14px',color:'var(--tx-3)',lineHeight:'1.75',marginBottom:'24px'}}>Buildings with elevation, utility infrastructure, and available rooftop or mechanical space in our target markets may qualify for a Skynode partnership.</p>
                <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'24px'}}>
                  <div className="eval-row">
                    <div className="eval-ico"><svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6"/></svg></div>
                    <span className="eval-label">Elevated position in urban market</span>
                    <span className="eval-check">✓</span>
                  </div>
                  <div className="eval-row">
                    <div className="eval-ico"><svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg></div>
                    <span className="eval-label">Existing utility infrastructure on site</span>
                    <span className="eval-check">✓</span>
                  </div>
                  <div className="eval-row">
                    <div className="eval-ico"><svg viewBox="0 0 24 24" fill="none" width="14" height="14"><rect x="3" y="4" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="3" y="14" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/></svg></div>
                    <span className="eval-label">Available rooftop or mechanical space</span>
                    <span className="eval-check">✓</span>
                  </div>
                  <div className="eval-row">
                    <div className="eval-ico"><svg viewBox="0 0 24 24" fill="none" width="14" height="14"><circle cx="5" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="19" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="18" r="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6.7 7.6l4.3 8.8M17.3 7.6l-4.3 8.8M7 6h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg></div>
                    <span className="eval-label">Located in NY, FL, IL, or CT market</span>
                    <span className="eval-check">✓</span>
                  </div>
                </div>
                <Link to="/property-owners" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}>
                  Let's Evaluate Your Property
                  <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT / TRUST ═══ */}
      <section className="section-page" id="about">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow">About Skynode</div>
            <h2 className="sec-h2">Built by operators who understand <em>rooftop communications infrastructure.</em></h2>
            <p className="sec-lead">Skynode is built around the practical realities of deploying and managing infrastructure in dense urban environments, serving technical, operational, and financial teams alike.</p>
            <div style={{display:'flex',gap:'24px',flexWrap:'wrap',marginTop:'20px'}}>
              <Link to="/about" className="text-link">About Us <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></Link>
              <Link to="/careers" className="text-link">Careers <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></Link>
            </div>
          </div>
          <div className="about-stats">
            <div className="about-stat reveal"><div className="v">40<span>+</span></div><div className="k">Combined years of broadcast engineering</div></div>
            <div className="about-stat reveal"><div className="v">4</div><div className="k">Active metro markets</div></div>
            <div className="about-stat reveal"><div className="v">99</div><div className="k">Managed node locations</div></div>
          </div>
          <p className="caveat reveal" style={{marginTop:'12px'}}>*Combined team experience. Exact node count to be confirmed.</p>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="final-cta">
        <div className="container">
          <h2 className="reveal">Bring your infrastructure closer to <em>where the city operates.</em></h2>
          <p className="reveal">Whether you are evaluating a transmission site, private communications path, edge colocation environment, or next-generation metro deployment, Skynode provides a more structured starting point for infrastructure inside the market.</p>
          <div className="cta-actions reveal" style={{marginTop:'36px'}}>
            <Link to="/contact" className="btn btn-primary">
              Schedule a Call
              <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link to="/skynodes" className="btn btn-outline-light">Explore Skynodes</Link>
          </div>
        </div>
      </section>
    </>
  );
}
