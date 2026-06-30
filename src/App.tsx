import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function ExternalRedirect({ to }: { to: string }) {
  useEffect(() => { window.location.href = to; }, [to]);
  return null;
}
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home           from './pages/Home'
import Broadcasting   from './pages/Broadcasting'
import PrivateComms   from './pages/PrivateComms'
import EdgeColocation from './pages/EdgeColocation'
import Experimental   from './pages/Experimental'
import PropertyOwners from './pages/PropertyOwners'
import Skynodes       from './pages/Skynodes'
import NodeDetail     from './pages/NodeDetail'
import MetroFabric    from './pages/MetroFabric'
import Solutions      from './pages/Solutions'
import About          from './pages/About'
import HowItWorks     from './pages/HowItWorks'
import Contact        from './pages/Contact'
import NotFound       from './pages/NotFound'

import NewYork        from './pages/markets/NewYork'
import Connecticut    from './pages/markets/Connecticut'
import Florida        from './pages/markets/Florida'
import Illinois       from './pages/markets/Illinois'

/* ─── Broadcasting solution sub-pages ─────────────────────────── */
import BroadcastPrimary    from './pages/solutions/BroadcastPrimary'
import BroadcastTV         from './pages/solutions/BroadcastTV'
import BroadcastLPFM       from './pages/solutions/BroadcastLPFM'
import BroadcastTranslator from './pages/solutions/BroadcastTranslator'
import BroadcastBackup     from './pages/solutions/BroadcastBackup'

/* ─── Private Communications solution sub-pages ───────────────── */
import RadioTransmitter from './pages/solutions/RadioTransmitter'
import RadioReceiver    from './pages/solutions/RadioReceiver'
import SimulcastRadio   from './pages/solutions/SimulcastRadio'
import OfficeToOffice   from './pages/solutions/OfficeToOffice'
import PointToPoint     from './pages/solutions/PointToPoint'

/* ─── Edge Colocation solution sub-pages ─────────────────────── */
import CdnEdgeNode        from './pages/solutions/CdnEdgeNode'
import NetworkColocation  from './pages/solutions/NetworkColocation'
import EnterpriseEdge     from './pages/solutions/EnterpriseEdge'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* ─── Core pages ─────────────────────────────────────── */}
        <Route path="/"                             element={<Home />}          />
        <Route path="/broadcasting"                 element={<Broadcasting />}   />
        <Route path="/private-communications"       element={<PrivateComms />}   />
        <Route path="/edge-colocation"              element={<EdgeColocation />} />
        <Route path="/edge-colocation/ai-inference" element={<Navigate to="/edge-colocation" replace />} />
        <Route path="/experimental"                 element={<Experimental />}   />
        <Route path="/property-owners"              element={<PropertyOwners />} />
        <Route path="/metro-fabric"                 element={<MetroFabric />}    />
        <Route path="/solutions"                    element={<Solutions />}      />
        <Route path="/about"                        element={<About />}          />
        <Route path="/how-it-works"                 element={<HowItWorks />}     />
        <Route path="/partners"                     element={<Navigate to="/" replace />} />
        <Route path="/careers"                      element={<ExternalRedirect to="https://skynodepartners.odoo.com/jobs" />} />
        <Route path="/contact"                      element={<Contact />}        />

        {/* ─── Skynodes ────────────────────────────────────────── */}
        <Route path="/skynodes"     element={<Skynodes />}          />
        <Route path="/skynodes/:id" element={<NodeDetail />}        />

        {/* ─── Markets ─────────────────────────────────────────── */}
        <Route path="/markets/new-york"    element={<NewYork />}      />
        <Route path="/markets/connecticut" element={<Connecticut />}  />
        <Route path="/markets/florida"     element={<Florida />}      />
        <Route path="/markets/illinois"    element={<Illinois />}     />

        {/* ─── Broadcasting solution sub-pages ─────────────────── */}
        <Route path="/solutions/broadcast-primary-site"    element={<BroadcastPrimary />}    />
        <Route path="/solutions/broadcast-tv-site"         element={<BroadcastTV />}         />
        <Route path="/solutions/broadcast-lpfm-site"       element={<BroadcastLPFM />}       />
        <Route path="/solutions/broadcast-translator-site" element={<BroadcastTranslator />} />
        <Route path="/solutions/broadcast-backup-site"     element={<BroadcastBackup />}     />

        {/* ─── Private Comms solution sub-pages ────────────────── */}
        <Route path="/solutions/two-way-radio-transmitter" element={<RadioTransmitter />} />
        <Route path="/solutions/two-way-radio-receiver"    element={<RadioReceiver />}    />
        <Route path="/solutions/simulcast-radio"           element={<SimulcastRadio />}   />
        <Route path="/solutions/office-to-office"          element={<OfficeToOffice />}   />
        <Route path="/solutions/point-to-point-links"      element={<PointToPoint />}     />

        {/* ─── Edge Colocation solution sub-pages ──────────────── */}
        <Route path="/solutions/cdn-edge-node"        element={<CdnEdgeNode />}       />
        <Route path="/solutions/network-colocation"   element={<NetworkColocation />}  />
        <Route path="/solutions/enterprise-edge"      element={<EnterpriseEdge />}     />

        {/* ─── 404 catch-all ───────────────────────────────────── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  )
}
