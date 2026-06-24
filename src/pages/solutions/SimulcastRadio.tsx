import SolutionPage, { SolutionConfig } from './SolutionPage';

const cfg: SolutionConfig = {
  vertical: 'private-comms',
  breadcrumb: 'Simulcast Radio Network',
  headline: 'Skynode infrastructure for|simultaneous multi-site transmission.',
  heroSub: 'Simulcast networks deliver seamless coverage across wide areas by synchronizing transmitters across multiple sites. The infrastructure requirements are demanding — GPS timing, low-latency backhaul, precise RF planning. Skynode nodes are evaluated against these exacting standards.',
  heroCard: {
    title: 'Simulcast Network — What to Expect',
    items: [
      { label: 'GPS timing availability', value: 'Required — evaluated per site' },
      { label: 'Backhaul latency', value: 'Low-latency required — TBC per path' },
      { label: 'Site-to-site sync', value: 'Via Metro Fabric or dedicated IP paths' },
      { label: 'System compatibility', value: 'P25, DMR, LTR, analog simulcast' },
      { label: 'Markets served', value: 'New York · Florida · Illinois · Connecticut' },
    ],
    stat: 'TBC',
    statLabel: 'active nodes across Skynode markets',
  },
  trust: {
    eyebrow: 'For Simulcast System Engineers',
    headline: 'Infrastructure that|meets simulcast timing requirements.',
    body: 'Simulcast systems fail when backhaul latency variation (jitter) exceeds system tolerance, GPS signals are unreliable, or RF overlap zones are poorly planned. Skynode addresses all three — GPS confirmation, backhaul latency measurement, and RF environment assessment — before any equipment goes on site.',
    features: [
      { title: 'GPS timing confirmation per site', body: 'Every Skynode simulcast candidate node is evaluated for GPS signal availability — rooftop access, sky view clarity, and signal quality — so timing-sensitive simulcast systems get the synchronization they need.' },
      { title: 'Backhaul latency characterization', body: 'Simulcast systems require IP backhaul paths with consistent latency between all sites. Skynode measures and documents backhaul latency for candidate nodes so system designers can confirm compatibility before deployment.' },
      { title: 'Metro Fabric for inter-site coordination', body: 'Where multiple Skynode nodes are active in the same market, Metro Fabric provides a private, low-latency interconnection path between simulcast sites — reducing dependence on public internet paths for timing-critical traffic.' },
      { title: 'RF overlap zone planning assistance', body: 'Simulcast performance depends on careful RF planning of the overlap zones between transmitter sites. Skynode provides the elevation and coordinate data that RF engineers need to model coverage boundaries accurately.' },
    ],
  },
  specs: [
    { label: 'GPS signal availability', value: 'TBC', note: 'Confirmed per site rooftop survey' },
    { label: 'Backhaul latency (one-way)', value: 'TBC', note: 'Measured per path during qualification' },
    { label: 'Backhaul jitter', value: 'TBC', note: 'Measured per path — critical for simulcast' },
    { label: 'Site-to-site interconnect', value: 'Metro Fabric / dedicated IP', note: 'TBC per market' },
    { label: 'Max transmitter separation', value: 'TBC', note: 'Per RF planning model' },
    { label: 'System protocol', value: 'P25 / DMR / Analog', note: 'TBC per engagement' },
  ],
  useCases: [
    { name: 'Wide-area coverage for enterprise radio', body: 'Enterprise radio systems covering large campuses, logistics networks, or multi-facility operations need simulcast to deliver consistent coverage without dead zones.', tags: ['Enterprise', 'Wide Area', 'Simulcast'] },
    { name: 'Public safety simulcast expansion', body: 'Public safety P25 trunked systems expanding coverage across municipal or county boundaries often need additional simulcast transmitter sites — Skynode nodes can fill gaps in the existing site network.', tags: ['Public Safety', 'P25', 'Expansion'] },
    { name: 'P25 Phase II simulcast migration', body: 'P25 Phase II TDMA trunked systems require the same simulcast infrastructure as Phase I — with the added complexity of TDMA slot synchronization. Skynode evaluates nodes against Phase II timing requirements.', tags: ['P25', 'Phase II', 'TDMA'] },
    { name: 'Distributed simulcast architecture', body: 'Systems moving from a single high-site simulcast approach to a distributed lower-site model for urban coverage improvement can use multiple Skynode nodes in the same market.', tags: ['Distributed', 'Urban', 'Low-Site'] },
  ],
  related: [
    { name: 'Two-Way Radio Transmitter Site', href: '/solutions/two-way-radio-transmitter' },
    { name: 'Two-Way Radio Receiver Site',    href: '/solutions/two-way-radio-receiver' },
    { name: 'Point-to-Point Data Links',      href: '/solutions/point-to-point-links' },
    { name: 'Secure Office-to-Office Network',href: '/solutions/office-to-office' },
  ],
};

export default function SimulcastRadio() {
  return <SolutionPage cfg={cfg} />;
}
