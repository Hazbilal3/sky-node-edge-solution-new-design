import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useHeroBg } from '../hooks/useHeroBg';

const FOOTER_CFG = {
  rows:2, scaleBack:0.66, rowGap:24, spacing:54, rxMax:24, baseLift:14,
  midMin:44, midMax:88, ampMin:12, ampMax:28, txBoost:30, packets:10,
  speed:0.55, pulseEvery:2100, fog:0.42, rightTall:0.5
};

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useHeroBg(canvasRef, FOOTER_CFG);

  return (
    <footer>
      <canvas ref={canvasRef} className="footer-bg-canvas" aria-hidden="true" />
      <div className="footer-scrim" aria-hidden="true" />
      <div className="container">
        <div className="footer-grid">
          <div>
            <img className="logo-on-light footer-logo-img" src="/logo-skynode-light-bg.svg" alt="Skynode Partners" />
            <img className="logo-on-dark  footer-logo-img" src="/logo-skynode-dark-bg.svg"  alt="Skynode Partners" />
            <p className="footer-tagline">Urban rooftop infrastructure for broadcast, private communications, edge computing, and emerging systems. NYC · MIA · CHI.</p>
          </div>
          <div>
            <div className="footer-col-title">Solutions</div>
            <ul className="footer-links">
              <li><Link to="/edge-colocation">Edge Colocation</Link></li>
              <li><Link to="/broadcasting">Broadcasting</Link></li>
              <li><Link to="/private-communications">Private Comms</Link></li>
              <li><Link to="/experimental">Experimental</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Platform</div>
            <ul className="footer-links">
              <li><Link to="/#fabric">Metro Fabric</Link></li>
              <li><Link to="/#about">How It Works</Link></li>
              <li><Link to="/#markets">Markets</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li><Link to="/#about">About</Link></li>
              <li><Link to="/property-owners">Property Owners</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="mailto:info@skynodepartners.com">info@skynodepartners.com</a></li>
              <li><a href="tel:+13472008058">+1 347 200 8058</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Skynode Partners Inc. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">skynodepartners.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
