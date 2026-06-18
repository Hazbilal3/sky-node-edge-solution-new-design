import { useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { useHeroBg } from '../hooks/useHeroBg';
import { useMetroFabricCanvas } from '../hooks/useMetroFabricCanvas';

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
  const metroRef  = useRef<HTMLCanvasElement>(null);
  const hexPaths  = useMemo(() => genHexPaths(), []);

  useReveal();
  useHeroBg(heroBgRef, HERO_CFG);
  useMetroFabricCanvas(metroRef);

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
                <a className="market-pill" href="#engineer">Connecticut</a>
                <a className="market-pill" href="#engineer">Florida</a>
                <a className="market-pill" href="#engineer">Illinois</a>
                <a className="market-pill" href="#engineer">New York</a>
              </div>
              <h1 className="hero-title">Edge compute. Live broadcast. <em>Private comms.</em> One network.</h1>
              <p className="hero-sub">City center nodes. Carrier-neutral. Milliseconds from your market. Drop in and go.</p>
              <p className="hero-body">Skynode provides access to managed sites with the elevation, space, power, and connectivity needed to support real communications and compute deployments in dense metropolitan environments.</p>
              <div className="hero-cta">
                <a href="#engineer" className="btn btn-primary">
                  Speak to an Engineer
                  <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a href="#markets" className="btn btn-outline-light">Is My Building a Fit?</a>
              </div>
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

      {/* ═══ TRUST STRIP ═══ */}
      <section className="trust">
        <div className="container trust-inner">
          <span className="trust-lbl">Infrastructure trusted by</span>
          <div className="trust-logos">
            <span className="trust-chip">Broadcast Operators</span>
            <span className="trust-chip">Neocloud / GPUaaS</span>
            <span className="trust-chip">Public Safety</span>
            <span className="trust-chip">Property Partners</span>
          </div>
        </div>
      </section>

      {/* ═══ CATEGORY CARDS ═══ */}
      <section className="section-surface" id="solutions">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow">Solution Categories</div>
            <h2 className="sec-h2">Four infrastructure categories. <em>One metropolitan platform.</em></h2>
            <p className="sec-lead">One shared foundation of IT-grade power, cooling, connectivity, and physical security underpins every category. It is built to support critical life safety users and placed where your signals and workloads actually live. Pick the use case and the infrastructure is already engineered for it.</p>
          </div>
          <div className="cat-grid">
            <Link className="cat-card violet reveal" to="/broadcasting">
              <div className="bar" />
              <div className="cat-ico"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="3" fill="currentColor"/><path d="M7.5 8.5a6.5 6.5 0 0 0 0 9M16.5 8.5a6.5 6.5 0 0 1 0 9M4.5 6a10 10 0 0 0 0 14M19.5 6a10 10 0 0 1 0 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg></div>
              <h3>Broadcasting</h3>
              <p className="cat-snark">On buildings that were built before streaming was a thing.</p>
              <p className="cat-desc">Broadcast infrastructure for FM, television, LPFM, translators, backup facilities, and auxiliary services.</p>
              <div className="cat-tags"><span className="tag">FM / TV</span><span className="tag">LPFM</span><span className="tag">Translator</span><span className="tag">Aux Sites</span></div>
              <span className="text-link">Explore Broadcasting <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </Link>
            <Link className="cat-card reveal" to="/private-communications">
              <div className="bar" />
              <div className="cat-ico"><svg viewBox="0 0 24 24" fill="none"><rect x="9" y="3" width="6" height="13" rx="3" stroke="currentColor" strokeWidth="1.6"/><path d="M6 11a6 6 0 0 0 12 0M12 19v2M9 21h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg></div>
              <h3>Private Communications</h3>
              <p className="cat-snark">Infrastructure that performs when it matters.</p>
              <p className="cat-desc">Private comms for enterprises, government, two-way radio networks, private 5G, and point-to-point data links.</p>
              <div className="cat-tags"><span className="tag">P25 / Simulcast</span><span className="tag">Private 5G</span><span className="tag">P2P Microwave</span></div>
              <span className="text-link">Explore Private Comms <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </Link>
            <Link className="cat-card reveal" to="/edge-colocation">
              <div className="bar" />
              <div className="cat-ico"><svg viewBox="0 0 24 24" fill="none"><rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><rect x="10" y="10" width="4" height="4" rx="1" fill="currentColor"/></svg></div>
              <h3>Edge Colocation</h3>
              <p className="cat-snark">AI inference latency measured in milliseconds, not excuses.</p>
              <p className="cat-desc">Secure edge environments for compute, AI inference, storage, caching, and network equipment closer to demand centers.</p>
              <div className="cat-tags"><span className="tag">AI / GPU Inference</span><span className="tag">Low Latency</span><span className="tag">Neutral Host</span></div>
              <span className="text-link">Explore Edge Colocation <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </Link>
            <Link className="cat-card reveal" to="/experimental">
              <div className="bar" />
              <div className="cat-ico"><svg viewBox="0 0 24 24" fill="none"><path d="M10.5 3v6L5 18.5A2 2 0 0 0 6.8 21.5h10.4A2 2 0 0 0 19 18.5L13.5 9V3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M9 3h6M8 15h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg></div>
              <h3>Experimental</h3>
              <p className="cat-snark">For operators building what doesn't have a procurement category yet.</p>
              <p className="cat-desc">Infrastructure for drones, autonomous systems, sensing, AR, smart city, and next-generation urban applications.</p>
              <div className="cat-tags"><span className="tag">UAS / Drone</span><span className="tag">Spatial AI</span><span className="tag">Smart City</span></div>
              <span className="text-link">Explore Experimental <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ AI / INFERENCE ═══ */}
      <section className="section-page" id="ai">
        <div className="container">
          <div className="ai-wrap">
            <div className="reveal">
              <div className="eyebrow eyebrow--deep">AI &amp; Inference</div>
              <h2 className="sec-h2">Your tokens shouldn't <em>cross a time zone.</em></h2>
              <p className="sec-lead">In-metro inference for neoclouds and GPUaaS providers. Deploy GPU capacity close to downtown, near the users, cameras, and sensors where real-time decisions actually happen, without a twelve-month data center buildout.</p>
              <div className="hero-cta">
                <a href="#engineer" className="btn btn-primary">
                  Speak to an Engineer
                  <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
            <div className="reveal">
              <div className="ai-strip">
                <div className="ai-cell"><div className="v">&lt;5 ms<span style={{fontSize:'13px'}}>*</span></div><div className="k">Metro latency target</div></div>
                <div className="ai-cell"><div className="v">NYC · MIA · CHI</div><div className="k">Network markets</div></div>
                <div className="ai-cell"><div className="v">&gt;120 kW<span style={{fontSize:'13px'}}>**</span></div><div className="k">Power density</div></div>
                <div className="ai-cell"><div className="v" style={{fontSize:'18px'}}>Wireless · Fiber</div><div className="k">Connectivity options</div></div>
              </div>
              <p className="caveat">*Target figure. Per-node specs confirmed on deployment. **Conditions vary per node.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY SKYNODE ═══ */}
      <section className="section-surface">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow">Why Skynode</div>
            <h2 className="sec-h2">A better way to <em>deploy infrastructure</em> across a city</h2>
            <p className="sec-lead">Skynode is a platform for organizations that need physical infrastructure closer to where signals travel, data is generated, and services are delivered. We identify, develop, and manage strategically valuable rooftop and edge locations, then prepare them for practical deployment.</p>
          </div>
          <div className="why-2col">
            <div className="why-item reveal"><div className="wn"><svg viewBox="0 0 24 24" fill="none"><path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6"/></svg></div><div><h4>Real urban placement</h4><p>Built around real sites in real metropolitan environments, not coverage claims on a map.</p></div></div>
            <div className="why-item reveal"><div className="wn"><svg viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg></div><div><h4>Faster path to deployment</h4><p>Begin with a managed portfolio of candidate locations. Deploy at one node, expand across many.</p></div></div>
            <div className="why-item reveal"><div className="wn"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="3" y="14" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><path d="M7 7h.01M7 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></div><div><h4>More than a rooftop</h4><p>Supports actual deployment requirements: equipment, access, power, and connectivity.</p></div></div>
            <div className="why-item reveal"><div className="wn"><svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="6" r="2" stroke="currentColor" strokeWidth="1.6"/><circle cx="19" cy="6" r="2" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="18" r="2" stroke="currentColor" strokeWidth="1.6"/><path d="M6.7 7.6l4.3 8.8M17.3 7.6l-4.3 8.8M7 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div><div><h4>Distributed by design</h4><p>Operate across a connected metro-wide fabric, not a single isolated site.</p></div></div>
          </div>
        </div>
      </section>

      {/* ═══ METRO FABRIC ═══ */}
      <section className="section-surface" id="fabric">
        <div className="container">
          <div className="metro-grid">
            {/* LEFT: copy */}
            <div className="reveal">
              <div className="eyebrow eyebrow--deep">Metro Fabric</div>
              <h2 className="sec-h2">Latency. Uptime. Bandwidth. Connectivity.<br/><em>All four. One fabric.</em></h2>
              <p className="sec-lead">Every network problem reduces to the same four concerns. Metro Fabric is a rooftop wireless mesh across urban markets that addresses all of them: direct point-to-point paths that cut latency, multiple simultaneous links that eliminate single points of failure, dedicated capacity without carrier congestion, and coverage that moves both north-south and east-west across the metro.</p>
              <div className="metro-features">
                <div className="metro-feature">
                  <div className="metro-feature-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M10.5 2L4 10h6.5l-3 6L16 8h-6.5l3-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg></div>
                  <div><div className="metro-feature-title">Latency: direct path, faster medium</div><div className="metro-feature-desc">Fiber follows conduit. Conduit follows streets. Skynode links go point-to-point, with shorter distance, and wireless propagates faster than optical fiber does. Both advantages compound. The result shows up in your measurements, not just our marketing.</div></div>
                </div>
                <div className="metro-feature">
                  <div className="metro-feature-icon"><svg viewBox="0 0 18 18" fill="none"><path d="M9 2l5.5 2.3v4.9C14.5 13 12 15.8 9 17c-3-1.2-5.5-4-5.5-7.8V4.3L9 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M6.5 9l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <div><div className="metro-feature-title">Uptime: multiple paths, automatic failover</div><div className="metro-feature-desc">Single-path networks have a single point of failure. Metro Fabric routes across simultaneous links, so when one degrades, traffic reroutes automatically. Resilience by architecture, not a best-effort promise.</div></div>
                </div>
                <div className="metro-feature">
                  <div className="metro-feature-icon"><svg viewBox="0 0 18 18" fill="none"><rect x="2" y="6" width="14" height="6" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M6 9h6M5 6V4.5M9 6V4M13 6V4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg></div>
                  <div><div className="metro-feature-title">Bandwidth: dedicated capacity, no shared lanes</div><div className="metro-feature-desc">Leased carrier circuits get oversold, throttled at peak, and repriced at renewal. Skynode links are dedicated to your deployment. No shared congestion. Capacity that scales with your footprint, not with what a carrier will sell you this quarter.</div></div>
                </div>
                <div className="metro-feature">
                  <div className="metro-feature-icon"><svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2" fill="currentColor"/><line x1="9" y1="2" x2="9" y2="7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><line x1="9" y1="11" x2="9" y2="16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><line x1="2" y1="9" x2="7" y2="9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><line x1="11" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></div>
                  <div><div className="metro-feature-title">Connectivity: north-south and east-west</div><div className="metro-feature-desc">Getting to your upstream infrastructure is usually solved. Getting between your own sites across the metro, without the latency penalty and cost of a carrier circuit, is where Metro Fabric earns its place. Extends to your private locations where fiber isn't practical.</div></div>
                </div>
              </div>
              <div className="metro-usecases">
                <span className="metro-usecase-tag">Edge Compute</span>
                <span className="metro-usecase-tag">Broadcasting</span>
                <span className="metro-usecase-tag">Private Comms</span>
                <span className="metro-usecase-tag">Experimental</span>
              </div>
              <a href="#engineer" className="btn btn-outline-deep" style={{marginTop:'28px'}}>
                Speak to an Engineer
                <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>

            {/* RIGHT: Metro Fabric network pulse animation */}
            <div className="metro-anim-wrap reveal">
              <canvas ref={metroRef} id="metroCanvas" width={480} height={560} />
              <div className="metro-anim-legend">
                <div className="metro-legend-item"><span className="metro-legend-dot metro-legend-dot--cloud" />Cloud uplinks</div>
                <div className="metro-legend-item"><span className="metro-legend-dot metro-legend-dot--fabric" />Metro Fabric</div>
                <div className="metro-legend-item"><span className="metro-legend-dot metro-legend-dot--private" />Private downlinks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOLUTIONS PREVIEW ═══ */}
      <section className="section-page">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow">Solutions</div>
            <h2 className="sec-h2">Built for <em>latency-sensitive, location-sensitive,</em> and infrastructure-heavy use cases</h2>
          </div>
          <div className="sol-compact-grid">
            <div className="sol-compact-card reveal"><span className="sdot" /><div className="stext"><h4>AI Grid</h4><p>Distributed inference capacity</p></div></div>
            <div className="sol-compact-card reveal"><span className="sdot" /><div className="stext"><h4>Content Delivery</h4><p>Metro-edge CDN &amp; caching</p></div></div>
            <div className="sol-compact-card reveal"><span className="sdot" /><div className="stext"><h4>Smart City</h4><p>Sensing &amp; urban applications</p></div></div>
            <div className="sol-compact-card reveal"><span className="sdot" /><div className="stext"><h4>Edge Inference</h4><p>Real-time, in-market compute</p></div></div>
            <div className="sol-compact-card reveal"><span className="sdot" /><div className="stext"><h4>Simulcast Radio</h4><p>P25 &amp; two-way networks</p></div></div>
            <div className="sol-compact-card reveal"><span className="sdot" /><div className="stext"><h4>Private 5G</h4><p>Enterprise &amp; campus networks</p></div></div>
          </div>
          <div style={{marginTop:'32px'}} className="reveal">
            <a href="#engineer" className="text-link">Speak to an Engineer <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
          </div>
        </div>
      </section>

      {/* ═══ PROPERTY OWNERS ═══ */}
      <section className="section-surface" id="markets">
        <div className="container">
          <div className="po-wrap">
            <div className="reveal">
              <div className="eyebrow eyebrow--deep">For Property Owners</div>
              <h2 className="sec-h2">Your rooftop is already an asset. <em>It's just not paying.</em></h2>
              <p className="sec-lead">Skynode partners with property owners who want revenue from rooftop and back-of-house space without becoming infrastructure operators themselves.</p>
              <div className="po-benefits">
                <div className="po-card"><div className="pc"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 3.5v5C20 17 16.5 20.5 12 22 7.5 20.5 4 17 4 11.5v-5L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg></div><div><h4>We manage the compliance</h4><p>Permitting, structural, and utility coordination handled end-to-end by Skynode.</p></div></div>
                <div className="po-card"><div className="pc"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></div><div><h4>Structured revenue sharing</h4><p>Turn underused space into a recurring, contractual revenue stream.</p></div></div>
                <div className="po-card"><div className="pc"><svg viewBox="0 0 24 24" fill="none"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6"/></svg></div><div><h4>Discreet, managed operations</h4><p>Low-profile equipment and professional site management. Your tenants won't notice.</p></div></div>
              </div>
            </div>
            <div className="inquiry-form reveal">
              <h3>Is my building a fit?</h3>
              <p className="sub">Tell us about your property and we'll evaluate it.</p>
              <form onSubmit={e => e.preventDefault()}>
                <div className="field"><label htmlFor="addr">Building Address</label><input id="addr" type="text" placeholder="123 Example Ave" /></div>
                <div className="field-row">
                  <div className="field"><label htmlFor="city-h">City</label><input id="city-h" type="text" placeholder="New York" /></div>
                  <div className="field"><label htmlFor="height">Building Height</label><select id="height"><option>Under 6 stories</option><option>6–15 stories</option><option>15–30 stories</option><option>30+ stories</option></select></div>
                </div>
                <div className="field-row">
                  <div className="field"><label htmlFor="own-name">Your Name</label><input id="own-name" type="text" placeholder="Full name" /></div>
                  <div className="field"><label htmlFor="own-role">Your Role</label><select id="own-role"><option>Property Owner</option><option>Property Manager</option><option>Asset Manager</option><option>Legal / Counsel</option></select></div>
                </div>
                <div className="field"><label htmlFor="own-email">Work Email</label><input id="own-email" type="email" placeholder="you@company.com" /></div>
                <button className="btn btn-primary" style={{width:'100%',justifyContent:'center',marginTop:'6px'}} type="submit">Check My Building</button>
                <p className="reassure"><em>Takes 2 minutes. We follow up within one business day.</em> No spam. We're not that desperate.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT / TRUST ═══ */}
      <section className="section-page" id="about">
        <div className="container">
          <div className="sec-head reveal" style={{marginBottom:'8px'}}>
            <div className="eyebrow">About Skynode</div>
            <h2 className="sec-h2">Built by people who've actually <em>climbed the rooftops</em></h2>
            <p className="sec-lead">Skynode is built around the practical realities of deploying and managing infrastructure in dense urban environments, serving technical, operational, and financial teams alike.</p>
          </div>
          <div className="about-stats">
            <div className="about-stat reveal"><div className="v">40<span>+</span></div><div className="k">Combined years of rooftop experience*</div></div>
            <div className="about-stat reveal"><div className="v">3</div><div className="k">Active metro markets</div></div>
            <div className="about-stat reveal"><div className="v">22<span>+</span></div><div className="k">Active &amp; pipeline nodes</div></div>
          </div>
          <div className="tcard-grid">
            <div className="tcard reveal"><p className="quote">"We needed GPU capacity downtown without a year-long buildout. Skynode had real locations we could evaluate the same week."</p><div className="who"><div className="av"></div><div><div className="nm">Edge / AI Operator</div><div className="rl">Testimonial, to be sourced</div></div></div></div>
            <div className="tcard reveal"><p className="quote">"Rooftop transmission sites with the elevation and line of sight we actually require. The site work was handled professionally."</p><div className="who"><div className="av"></div><div><div className="nm">FM / TV Broadcaster</div><div className="rl">Testimonial, to be sourced</div></div></div></div>
            <div className="tcard reveal"><p className="quote">"They handled the compliance and the tenants never noticed. The revenue share is real and the operations are discreet."</p><div className="who"><div className="av"></div><div><div className="nm">Property Owner</div><div className="rl">Testimonial, to be sourced</div></div></div></div>
          </div>
          <p className="caveat reveal">*Combined team experience. Figure pending final confirmation.</p>
        </div>
      </section>

      {/* ═══ FINAL CTA — SPEAK TO AN ENGINEER ═══ */}
      <section className="final-cta" id="engineer">
        <div className="container">
          <h2 className="reveal">Stop explaining latency. <br/>Start fixing it.</h2>
          <p className="reveal">Tell us what you're deploying: a transmission site, a private communications path, an edge colocation environment, or a next-generation metro build. An engineer follows up within one business day.</p>
          <form className="engineer-form reveal" onSubmit={e => e.preventDefault()}>
            <div className="field-row">
              <div className="field"><label htmlFor="eng-name">Your Name</label><input id="eng-name" type="text" placeholder="Full name" /></div>
              <div className="field"><label htmlFor="eng-email">Work Email</label><input id="eng-email" type="email" placeholder="you@company.com" /></div>
            </div>
            <div className="field-row">
              <div className="field"><label htmlFor="eng-co">Company</label><input id="eng-co" type="text" placeholder="Company" /></div>
              <div className="field"><label htmlFor="eng-seg">Segment</label><select id="eng-seg"><option>AI / Compute</option><option>Broadcasting</option><option>Private Communications</option><option>Experimental</option><option>Other</option></select></div>
            </div>
            <div className="field"><label htmlFor="eng-msg">What are you deploying?</label><textarea id="eng-msg" rows={3} placeholder="Brief project description" /></div>
            <button className="btn btn-primary" style={{width:'100%',justifyContent:'center',marginTop:'6px'}} type="submit">
              Speak to an Engineer
              <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <p className="reassure" style={{textAlign:'center'}}><em>Own a building instead?</em> <a href="#markets" style={{color:'var(--sky-blue)',fontWeight:700}}>See if your rooftop is a fit →</a></p>
          </form>
        </div>
      </section>
    </>
  );
}
