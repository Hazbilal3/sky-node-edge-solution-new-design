import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
  const { pathname } = useLocation();
  useEffect(() => { document.title = '404 Not Found — Skynode Partners'; }, []);

  return (
    <>
      <style>{`
        .nf-wrap { min-height:70vh; display:flex; align-items:center; justify-content:center; text-align:center; padding:80px 20px; }
        .nf-inner { max-width:520px; }
        .nf-code { font-size:clamp(72px,14vw,140px); font-weight:900; letter-spacing:-0.04em; color:var(--teal-accent); opacity:0.18; line-height:1; margin-bottom:-16px; }
        .nf-h1 { font-size:clamp(24px,3.2vw,40px); font-weight:900; letter-spacing:-0.024em; color:rgb(var(--fg)); margin-bottom:14px; }
        .nf-sub { font-size:15px; color:var(--tx-3); line-height:1.8; margin-bottom:10px; }
        .nf-path { font-size:12px; color:var(--tx-6); font-family:monospace; margin-bottom:36px; }
        .nf-actions { display:flex; justify-content:center; gap:12px; flex-wrap:wrap; }
      `}</style>

      <div className="section-dark nf-wrap">
        <div className="nf-inner">
          <div className="nf-code">404</div>
          <h1 className="nf-h1">Page not found.</h1>
          <p className="nf-sub">The page you're looking for doesn't exist or has moved.</p>
          <p className="nf-path">{pathname}</p>
          <div className="nf-actions">
            <Link to="/"         className="btn btn-primary">Go to Home</Link>
            <Link to="/skynodes" className="btn btn-outline-light">Browse Nodes</Link>
            <Link to="/solutions"className="btn btn-outline-light">Solutions</Link>
          </div>
        </div>
      </div>
    </>
  );
}
