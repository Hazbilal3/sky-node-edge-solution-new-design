import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useHeroBg } from '../hooks/useHeroBg';

const FOOTER_CFG = {
  rows:2, scaleBack:0.66, rowGap:24, spacing:54, rxMax:24, baseLift:14,
  midMin:44, midMax:88, ampMin:12, ampMax:28, txBoost:30, packets:10,
  speed:0.55, pulseEvery:2100, fog:0.42, rightTall:0.5
};

const FOOTER_COLS = [
  {
    title: 'Broadcasting',
    links: [
      { label: 'FM Primary Transmission',     href: '/solutions/broadcast-primary-site'    },
      { label: 'Television Broadcast',         href: '/solutions/broadcast-tv-site'         },
      { label: 'LPFM Transmitter',             href: '/solutions/broadcast-lpfm-site'       },
      { label: 'Translator & Booster',         href: '/solutions/broadcast-translator-site' },
      { label: 'Backup & Auxiliary',           href: '/solutions/broadcast-backup-site'     },
      { label: 'Broadcasting overview →',      href: '/broadcasting'                        },
    ],
  },
  {
    title: 'Private Communications',
    links: [
      { label: 'Radio Transmitter Site',    href: '/solutions/two-way-radio-transmitter' },
      { label: 'Radio Receiver Site',       href: '/solutions/two-way-radio-receiver'    },
      { label: 'Simulcast Radio Network',   href: '/solutions/simulcast-radio'           },
      { label: 'Office-to-Office Network',  href: '/solutions/office-to-office'          },
      { label: 'Point-to-Point Links',      href: '/solutions/point-to-point-links'      },
      { label: 'Private Comms overview →',  href: '/private-communications'              },
    ],
  },
  {
    title: 'Edge Colocation',
    links: [
      { label: 'Content Delivery / CDN',   href: '/solutions/cdn-edge-node'        },
      { label: 'Network Colocation',       href: '/solutions/network-colocation'   },
      { label: 'Enterprise Edge Compute',  href: '/solutions/enterprise-edge'      },
      { label: 'AI / Inference',           href: '/edge-colocation'                },
      { label: 'Experimental Systems',     href: '/experimental'                   },
      { label: 'Edge Colocation overview →',href: '/edge-colocation'              },
    ],
  },
  {
    title: 'Platform & Network',
    links: [
      { label: 'Skynodes',            href: '/skynodes'         },
      { label: 'Metro Fabric',        href: '/metro-fabric'     },
      { label: 'New York',            href: '/markets/new-york' },
      { label: 'Connecticut',         href: '/markets/connecticut' },
      { label: 'Florida',             href: '/markets/florida'  },
      { label: 'Illinois',            href: '/markets/illinois' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About',              href: '/about'            },
      { label: 'How It Works',       href: '/how-it-works'     },
      { label: 'Solutions Overview', href: '/solutions'        },
      { label: 'For Property Owners',href: '/property-owners'  },
      { label: 'Careers',            href: 'https://skynodepartners.odoo.com/jobs', external: true },
    ],
  },
];

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useHeroBg(canvasRef, FOOTER_CFG);

  return (
    <footer>
      <style>{`
        .footer-new { position:relative; padding:72px 0 0; overflow:hidden; }
        .footer-top { display:grid; grid-template-columns:240px repeat(5,1fr); gap:40px; margin-bottom:56px; }
        .footer-brand-tagline { font-size:13px; color:var(--tx-5); line-height:1.72; margin-top:14px; max-width:200px; }
        .footer-contact-block { margin-top:20px; display:flex; flex-direction:column; gap:6px; }
        .footer-contact-link { font-size:12px; color:var(--tx-5); text-decoration:none; display:flex; align-items:center; gap:7px; transition:color .15s; }
        .footer-contact-link:hover { color:var(--teal-accent); }
        .footer-col-title { font-size:11px; font-weight:800; letter-spacing:0.1em; text-transform:uppercase; color:var(--tx-6); margin-bottom:14px; }
        .footer-links { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:7px; }
        .footer-links a { font-size:13px; color:var(--tx-4); text-decoration:none; transition:color .15s; }
        .footer-links a:hover { color:rgb(var(--fg)); }
        .footer-links a[href$="→"] { color:var(--teal-accent); font-weight:700; }
        .footer-divider { border:none; border-top:1px solid var(--border-dark); margin:0; }
        .footer-bottom-new { display:flex; justify-content:space-between; align-items:center; padding:20px 0 24px; flex-wrap:wrap; gap:12px; }
        .footer-bottom-new span { font-size:12px; color:var(--tx-6); }
        .footer-bottom-links-new { display:flex; gap:20px; }
        .footer-bottom-links-new a { font-size:12px; color:var(--tx-6); text-decoration:none; transition:color .15s; }
        .footer-bottom-links-new a:hover { color:var(--tx-4); }

        @media(max-width:1100px){
          .footer-top { grid-template-columns:repeat(3,1fr); gap:32px; }
        }
        @media(max-width:680px){
          .footer-top { grid-template-columns:1fr 1fr; gap:28px; }
          .footer-top > div:first-child { grid-column:1/-1; }
          .footer-bottom-new { flex-direction:column; align-items:flex-start; gap:10px; }
        }
        @media(max-width:480px){
          .footer-top { grid-template-columns:1fr; gap:28px; }
          .footer-bottom-new span { font-size:11px; line-height:1.6; }
          .footer-bottom-links-new { flex-wrap:wrap; gap:12px; }
        }
      `}</style>

      <canvas ref={canvasRef} className="footer-bg-canvas" aria-hidden="true" />
      <div className="footer-scrim" aria-hidden="true" />

      <div className="container footer-new">
        <div className="footer-top">
          {/* Brand column */}
          <div>
            <img className="logo-on-light footer-logo-img" src="/logo-skynode-light-bg.svg" alt="Skynode Partners" />
            <img className="logo-on-dark  footer-logo-img" src="/logo-skynode-dark-bg.svg"  alt="Skynode Partners" />
            <p className="footer-brand-tagline">Urban rooftop infrastructure for broadcast, private communications, edge computing, and emerging systems.</p>
            <div className="footer-contact-block">
              <a href="mailto:info@skynodepartners.com" className="footer-contact-link">
                <svg viewBox="0 0 16 16" fill="none" width="13" height="13"><rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.3"/></svg>
                info@skynodepartners.com
              </a>
              <a href="tel:+13472008058" className="footer-contact-link">
                <svg viewBox="0 0 16 16" fill="none" width="13" height="13"><path d="M3 2h2.5l1 3-1.5 1a8 8 0 003 3l1-1.5 3 1V11a2 2 0 01-2 2C6 13 3 10 3 5a2 2 0 012-3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
                +1 347 200 8058
              </a>
              <a href="https://www.linkedin.com/company/skynode-partners" target="_blank" rel="noopener noreferrer" className="footer-contact-link">
                <svg viewBox="0 0 16 16" fill="none" width="13" height="13"><rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M4 6.5v5M4 4.5v.01M7 11.5V9c0-1.1.9-2 2-2s2 .9 2 2v2.5M7 6.5v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                LinkedIn
              </a>
              <Link to="/contact" className="footer-contact-link" style={{color:'var(--teal-accent)',fontWeight:700}}>
                <svg viewBox="0 0 16 16" fill="none" width="13" height="13"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Start an inquiry →
              </Link>
            </div>
          </div>

          {/* Solution + company columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              <ul className="footer-links">
                {col.links.map(l => (
                  <li key={l.href}>
                    {(l as any).external
                      ? <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                      : <Link to={l.href}>{l.label}</Link>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom-new">
          <span>© 2026 Skynode Partners Inc. All rights reserved. · New York · Florida · Illinois · Connecticut</span>
          <div className="footer-bottom-links-new">
            <Link to="/how-it-works">How It Works</Link>
            <Link to="/skynodes">Browse Nodes</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
