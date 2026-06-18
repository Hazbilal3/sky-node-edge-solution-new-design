import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Broadcasting from './pages/Broadcasting'
import PrivateComms from './pages/PrivateComms'
import EdgeColocation from './pages/EdgeColocation'
import Experimental from './pages/Experimental'
import PropertyOwners from './pages/PropertyOwners'
import Contact from './pages/Contact'

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
        <Route path="/" element={<Home />} />
        <Route path="/broadcasting" element={<Broadcasting />} />
        <Route path="/private-communications" element={<PrivateComms />} />
        <Route path="/edge-colocation" element={<EdgeColocation />} />
        <Route path="/experimental" element={<Experimental />} />
        <Route path="/property-owners" element={<PropertyOwners />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
