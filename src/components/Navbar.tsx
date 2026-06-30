import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

/* ─── Megamenu solution columns ─────────────────────────────────── */

const SOL_COLS = [
  {
    vertical: 'Broadcasting',
    color: '#C4B5FD',
    bg: 'rgba(124,58,237,0.10)',
    href: '/broadcasting',
    items: [
      { label: 'FM Primary Transmission',    href: '/solutions/broadcast-primary-site'    },
      { label: 'Television Broadcast',        href: '/solutions/broadcast-tv-site'         },
      { label: 'LPFM Transmitter',            href: '/solutions/broadcast-lpfm-site'       },
      { label: 'Translator & Booster',        href: '/solutions/broadcast-translator-site' },
      { label: 'Broadcast Backup / Auxiliary',href: '/solutions/broadcast-backup-site'     },
    ],
  },
  {
    vertical: 'Private Communications',
    color: '#6BC0DD',
    bg: 'rgba(64,156,188,0.10)',
    href: '/private-communications',
    items: [
      { label: 'Two-Way Radio Transmitter', href: '/solutions/two-way-radio-transmitter' },
      { label: 'Two-Way Radio Receiver',    href: '/solutions/two-way-radio-receiver'    },
      { label: 'Simulcast Radio Network',   href: '/solutions/simulcast-radio'           },
      { label: 'Office-to-Office Network',  href: '/solutions/office-to-office'          },
      { label: 'Point-to-Point Data Links', href: '/solutions/point-to-point-links'      },
    ],
  },
  {
    vertical: 'Edge Colocation',
    color: '#5BE49B',
    bg: 'rgba(91,228,155,0.10)',
    href: '/edge-colocation',
    items: [
      { label: 'Content Delivery / CDN',       href: '/solutions/cdn-edge-node'           },
      { label: 'Network Equipment Colocation', href: '/solutions/network-colocation'      },
      { label: 'Enterprise Edge Compute',      href: '/solutions/enterprise-edge'         },
      { label: 'Experimental Systems',         href: '/experimental'                      },
    ],
  },
];

/* ─── Component ──────────────────────────────────────────────────── */

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [solOpen,     setSolOpen]     = useState(false); // mobile accordion
  const [ddHover,     setDdHover]     = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const ddRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setSolOpen(false); }, [pathname]);

  // Close megamenu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) {
        setDdHover(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isSolActive = pathname.startsWith('/solutions') ||
    ['/broadcasting','/private-communications','/edge-colocation','/experimental'].includes(pathname);

  return (
    <>
      <style>{`
        /* ── Megamenu ──────────────────────────────────────────── */
        .nav-dd { position:relative; }
        .nav-dd:hover .nav-megamenu,
        .nav-dd.open   .nav-megamenu { opacity:1; visibility:visible; transform:translateY(0); pointer-events:auto; }
        .nav-megamenu {
          position:absolute; top:calc(100% + 8px); left:50%; transform:translateX(-50%) translateY(-6px);
          width:700px; max-width:calc(100vw - 32px);
          background:var(--bg-card); border:1px solid var(--border-dark);
          border-radius:var(--r-lg); box-shadow:0 20px 60px rgba(0,0,0,0.32);
          opacity:0; visibility:hidden; pointer-events:none;
          transition:opacity .18s, transform .18s, visibility .18s;
          z-index:1000; overflow:hidden;
        }
        .nav-mm-top {
          display:grid; grid-template-columns:repeat(3,1fr);
          border-bottom:1px solid var(--border-dark);
        }
        .nav-mm-col { padding:20px 18px 16px; }
        .nav-mm-col:not(:last-child) { border-right:1px solid var(--border-dark); }
        .nav-mm-vert-link {
          display:flex; align-items:center; gap:8px; text-decoration:none;
          font-size:12px; font-weight:800; letter-spacing:0.06em; text-transform:uppercase;
          margin-bottom:12px; padding:6px 8px; border-radius:var(--r-sm);
          transition:background .15s;
        }
        .nav-mm-vert-link:hover { background:rgba(var(--fg),0.05); }
        .nav-mm-vert-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
        .nav-mm-items { display:flex; flex-direction:column; gap:1px; }
        .nav-mm-item {
          display:block; padding:7px 8px; border-radius:var(--r-sm);
          text-decoration:none; font-size:13px; color:var(--tx-4);
          transition:background .12s, color .12s;
          white-space:nowrap;
        }
        .nav-mm-item:hover { background:rgba(var(--fg),0.06); color:rgb(var(--fg)); }
        .nav-mm-bottom {
          display:flex; align-items:center; justify-content:space-between;
          padding:12px 18px; background:rgba(var(--fg),0.02);
        }
        .nav-mm-bottom-link {
          font-size:12px; font-weight:700; color:var(--teal-accent); text-decoration:none;
          display:inline-flex; align-items:center; gap:5px;
        }
        .nav-mm-bottom-link:hover { color:var(--sky-blue); }

        /* ── Mobile accordion ─────────────────────────────────── */
        .nav-mobile-acc { overflow:hidden; transition:max-height .25s ease; }
        .nav-mobile-acc.closed { max-height:0; }
        .nav-mobile-acc.open   { max-height:900px; }
        .nav-mob-vert-hdr { font-size:11px; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; color:var(--tx-5); padding:8px 20px 4px; }
        .nav-mob-sol-item { display:block; padding:9px 20px 9px 32px; color:var(--tx-4); text-decoration:none; font-size:14px; border-bottom:none; }
        .nav-mob-sol-item:hover { color:rgb(var(--fg)); background:rgba(var(--fg),0.04); }

        @media(max-width:900px) { .nav-megamenu { display:none; } }
      `}</style>

      <nav id="mainNav" className={scrolled ? 'nav--scrolled' : ''}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <img className="logo-on-light" src="/logo-skynode-light-bg.svg" alt="Skynode Partners" />
            <img className="logo-on-dark"  src="/logo-skynode-dark-bg.svg"  alt="Skynode Partners" />
          </Link>

          <ul className="nav-links">
            {/* ── Solutions megamenu ── */}
            <li className={`nav-dd${ddHover ? ' open' : ''}`} ref={ddRef}
                onMouseEnter={() => setDdHover(true)}
                onMouseLeave={() => setDdHover(false)}>
              <Link to="/solutions" className={`nav-dd-toggle${isSolActive ? ' active' : ''}`}>
                Solutions
                <svg className="nav-dd-caret" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5L6 7.5l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <div className="nav-megamenu">
                <div className="nav-mm-top">
                  {SOL_COLS.map(col => (
                    <div key={col.vertical} className="nav-mm-col">
                      <Link to={col.href} className="nav-mm-vert-link" style={{color:col.color}}>
                        <span className="nav-mm-vert-dot" style={{background:col.color}}/>
                        {col.vertical}
                      </Link>
                      <div className="nav-mm-items">
                        {col.items.map(item => (
                          <Link key={item.href} to={item.href} className="nav-mm-item">{item.label}</Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="nav-mm-bottom">
                  <Link to="/solutions" className="nav-mm-bottom-link">
                    All solutions overview
                    <svg viewBox="0 0 12 12" fill="none" width="11" height="11"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                  <Link to="/metro-fabric" className="nav-mm-bottom-link">
                    Metro Fabric
                    <svg viewBox="0 0 12 12" fill="none" width="11" height="11"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </div>
              </div>
            </li>

            <li><Link to="/skynodes"       className={pathname==='/skynodes'||pathname.startsWith('/skynodes/')?'active':''}>Skynodes</Link></li>
            <li><Link to="/property-owners"className={pathname==='/property-owners'?'active':''}>For Property Owners</Link></li>
            <li><Link to="/about"          className={pathname==='/about'?'active':''}>About</Link></li>
          </ul>

          <div className="nav-cta">
            <Link to="/contact" className="btn btn-primary btn-sm">Get Started</Link>
          </div>

          <button
            className="theme-toggle" type="button"
            onClick={toggleTheme}
            aria-label="Toggle colour theme"
            aria-pressed={theme === 'dark'}
            title="Switch light / dark theme"
          >
            <svg className="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
            </svg>
            <span className="theme-toggle-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>

          <button className="nav-hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── Mobile nav ── */}
      <div className={`nav-mobile${mobileOpen ? ' open' : ''}`} id="mobileNav">
        <ul>
          {/* Solutions accordion */}
          <li>
            <button
              style={{width:'100%',textAlign:'left',background:'none',border:'none',padding:'14px 20px',cursor:'pointer',color:'rgb(var(--fg))',fontSize:'15px',fontWeight:700,display:'flex',justifyContent:'space-between',alignItems:'center'}}
              onClick={() => setSolOpen(o => !o)}
            >
              Solutions
              <svg viewBox="0 0 12 12" fill="none" width="14" height="14" style={{transform:solOpen?'rotate(180deg)':'rotate(0)',transition:'transform .2s'}}>
                <path d="M3 4.5L6 7.5l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className={`nav-mobile-acc ${solOpen ? 'open' : 'closed'}`}>
              {SOL_COLS.map(col => (
                <div key={col.vertical}>
                  <div className="nav-mob-vert-hdr" style={{color:col.color}}>{col.vertical}</div>
                  {col.items.map(item => (
                    <Link key={item.href} to={item.href} className="nav-mob-sol-item">{item.label}</Link>
                  ))}
                </div>
              ))}
              <div style={{borderTop:'1px solid var(--border-dark)',margin:'8px 0'}}/>
              <Link to="/solutions"    className="nav-mob-sol-item" style={{fontWeight:700,color:'var(--teal-accent)'}}>All Solutions →</Link>
              <Link to="/metro-fabric" className="nav-mob-sol-item" style={{fontWeight:700,color:'var(--teal-accent)'}}>Metro Fabric →</Link>
            </div>
          </li>

          <li><Link to="/skynodes">Skynodes</Link></li>
          <li><Link to="/property-owners">For Property Owners</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="nav-mobile-cta">
          <Link to="/contact" className="btn btn-primary">Get Started</Link>
        </div>
      </div>
    </>
  );
}
