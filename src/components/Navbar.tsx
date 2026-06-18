import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isSolution = ['/broadcasting','/private-communications','/edge-colocation','/experimental'].includes(pathname);

  return (
    <>
      <nav id="mainNav" className={scrolled ? 'nav--scrolled' : ''}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <img className="logo-on-light" src="/logo-skynode-light-bg.svg" alt="Skynode Partners" />
            <img className="logo-on-dark"  src="/logo-skynode-dark-bg.svg"  alt="Skynode Partners" />
          </Link>

          <ul className="nav-links">
            <li className="nav-dd">
              <span className={`nav-dd-toggle${isSolution?' active':''}`} style={{cursor:'default'}}>
                Solutions
                <svg className="nav-dd-caret" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5L6 7.5l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div className="nav-dd-menu">
                <Link to="/edge-colocation">Edge Colocation</Link>
                <Link to="/broadcasting">Broadcasting</Link>
                <Link to="/private-communications">Private Communications</Link>
                <Link to="/experimental">Experimental Systems</Link>
              </div>
            </li>
            <li><Link to="/property-owners" className={pathname==='/property-owners'?'active':''}>For Property Owners</Link></li>
            <li><Link to="/#about" className={pathname==='/'?'':'active-away'}>About</Link></li>
          </ul>

          <div className="nav-cta">
            <Link to="/contact" className="btn btn-primary btn-sm">Contact</Link>
          </div>

          <button
            className="theme-toggle"
            type="button"
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

      <div className={`nav-mobile${mobileOpen?' open':''}`} id="mobileNav">
        <ul>
          <li className="nav-mobile-group">Solutions</li>
          <li><Link className="nav-mobile-sub" to="/edge-colocation">Edge Colocation</Link></li>
          <li><Link className="nav-mobile-sub" to="/broadcasting">Broadcasting</Link></li>
          <li><Link className="nav-mobile-sub" to="/private-communications">Private Communications</Link></li>
          <li><Link className="nav-mobile-sub" to="/experimental">Experimental Systems</Link></li>
          <li><Link to="/property-owners">For Property Owners</Link></li>
          <li><Link to="/#about">About</Link></li>
        </ul>
        <div className="nav-mobile-cta">
          <Link to="/contact" className="btn btn-primary">Contact</Link>
        </div>
      </div>
    </>
  );
}
