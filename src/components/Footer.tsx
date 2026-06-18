import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
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
