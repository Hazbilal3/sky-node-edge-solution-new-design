import SolutionPage, { SolutionConfig } from './SolutionPage';

const cfg: SolutionConfig = {
  vertical: 'private-comms',
  breadcrumb: 'Two-Way Radio Transmitter Site',
  headline: 'Urban elevation for|two-way radio transmitters.',
  heroSub: 'Two-way radio systems depend on transmitter site quality — height, coverage, backhaul, and power. Skynode nodes are evaluated for the specific requirements of conventional and trunked radio transmitter deployments across all four Skynode markets.',
  heroCard: {
    title: 'Radio Transmitter Site — What to Expect',
    items: [
      { label: 'Elevation', value: 'TBC per site evaluation' },
      { label: 'System compatibility', value: 'P25, DMR, NXDN, analog conventional' },
      { label: 'Power availability', value: 'Commercial + generator backup evaluated' },
      { label: 'Backhaul options', value: 'Fiber / P2P / Metro Fabric' },
      { label: 'Markets served', value: 'New York · Florida · Illinois · Connecticut' },
    ],
    stat: 'TBC',
    statLabel: 'active nodes across Skynode markets',
  },
  trust: {
    eyebrow: 'For Radio System Operators',
    headline: 'Built for the way|radio systems actually work.',
    body: 'Radio system operators need more than height — they need a site partner who understands the operational reality of two-way communications infrastructure. Skynode nodes are evaluated for the RF environment, backhaul paths, and power characteristics that make transmitter sites work long-term.',
    features: [
      { title: 'Coverage-first elevation evaluation', body: 'We evaluate each node against your specific coverage requirements — not just height above grade. HAAT estimates, terrain analysis, and coverage modeling inputs are provided during qualification.' },
      { title: 'P25, DMR, and trunked system compatibility', body: 'Modern radio systems require GPS for simulcast timing, reliable backhaul for controller connectivity, and stable RF environments. Skynode evaluates each node against these requirements.' },
      { title: 'Backhaul for system controllers', body: 'IP-based radio system controllers require reliable, low-latency backhaul to transmitter sites. Skynode evaluates fiber, point-to-point, and Metro Fabric options for each candidate node.' },
      { title: 'Power with emergency continuity', body: 'Public safety and enterprise radio systems can\'t afford transmitter site power failures. Generator availability, ATS specs, and fuel logistics are assessed during site qualification.' },
    ],
  },
  specs: [
    { label: 'Elevation above grade', value: 'TBC', note: 'Confirmed during site evaluation' },
    { label: 'HAAT estimate', value: 'TBC', note: 'Provided for coverage analysis' },
    { label: 'System protocols', value: 'P25 / DMR / NXDN / Analog', note: 'Evaluated per engagement' },
    { label: 'Generator backup', value: 'TBC', note: 'Evaluated per site' },
    { label: 'GPS availability', value: 'TBC', note: 'Required for simulcast timing' },
    { label: 'IP backhaul', value: 'TBC', note: 'Fiber / P2P evaluated per site' },
  ],
  useCases: [
    { name: 'Enterprise radio system transmitter', body: 'Corporate campuses, logistics operations, and healthcare systems with private radio networks need transmitter sites that deliver reliable coverage across their operations area.', tags: ['Enterprise', 'Radio', 'Trunked'] },
    { name: 'Public safety radio transmitter', body: 'Municipal and state public safety agencies deploying P25 or interoperable radio systems need sites that meet government operational standards for reliability, access, and documentation.', tags: ['Public Safety', 'P25', 'Government'] },
    { name: 'Remote and field operations coverage', body: 'Organizations that need radio coverage in areas their existing system doesn\'t reach — construction sites, remote facilities, event venues — can qualify Skynode nodes for temporary or permanent fill.', tags: ['Field Ops', 'Coverage Fill', 'Temporary'] },
    { name: 'System expansion transmitter', body: 'Radio systems growing beyond their existing coverage footprint need additional transmitter sites — Skynode provides a qualified path to expansion without building a tower.', tags: ['Expansion', 'Coverage', 'Additional Site'] },
  ],
  related: [
    { name: 'Two-Way Radio Receiver Site',     href: '/solutions/two-way-radio-receiver' },
    { name: 'Simulcast Radio Network',         href: '/solutions/simulcast-radio' },
    { name: 'Secure Office-to-Office Network', href: '/solutions/office-to-office' },
    { name: 'Point-to-Point Data Links',       href: '/solutions/point-to-point-links' },
  ],
};

export default function RadioTransmitter() {
  return <SolutionPage cfg={cfg} />;
}
