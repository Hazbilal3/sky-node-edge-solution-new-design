import SolutionPage, { type SolutionConfig } from './SolutionPage';

const cfg: SolutionConfig = {
  vertical: 'broadcasting',
  breadcrumb: 'LPFM Transmitter Site',
  headline: 'The right elevation for|low power FM operations.',
  heroSub: 'LPFM stations need real elevation without tower-scale costs or complexity. Skynode nodes give community broadcasters access to urban heights that were previously available only through complex multi-tenant tower agreements.',
  heroCard: {
    title: 'LPFM Site â€” What to Expect',
    items: [
      { label: 'Elevation', value: 'Per site evaluation' },
      { label: 'TX power range', value: '10Wâ€“100W accommodated' },
      { label: 'Backhaul options', value: 'IP audio / P2P / Metro Fabric' },
      { label: 'Power requirement', value: 'Standard commercial service' },
      { label: 'Markets served', value: 'New York Â· Florida Â· Illinois Â· Connecticut' },
    ],
    stat: '57',
    statLabel: 'active nodes across Skynode markets',
  },
  trust: {
    eyebrow: 'Built for Community Broadcasting',
    headline: 'Accessible elevation|without the overhead.',
    body: 'LPFM operators rarely have the resources to negotiate complex tower leases, manage multi-tenant RF environments, or absorb surprise costs. Skynode provides what community broadcasters actually need â€” clear terms, real elevation, and infrastructure that doesn\'t require a legal team to manage.',
    features: [
      { title: 'Right-sized for LPFM power levels', body: '10W and 100W LPFM transmitters have different structural and power requirements than full-power FM. Skynode sites are evaluated to confirm compatibility at LPFM power levels â€” no over-engineering, no unnecessary cost.' },
      { title: 'Accessible access procedures', body: 'Community broadcasters rely on the ability to reach their transmitter on reasonable notice. Skynode documents access procedures for every node and provides technical contacts that respond.' },
      { title: 'IP audio backhaul options', body: 'Modern LPFM operations use IP audio delivery rather than traditional STL. Skynode evaluates broadband availability at each node and supports IP-based program delivery approaches.' },
      { title: 'FCC compliance support', body: 'LPFM spectrum protection requirements, antenna height limits, and interference contour rules require accurate site data. Skynode provides the elevation and location data your engineering needs for FCC submissions.' },
    ],
  },
  specs: [
    { label: 'Elevation above grade', value: 'Per site', note: 'Confirmed during site evaluation' },
    { label: 'HAAT estimate', value: 'Per site', note: 'Provided for engineering review' },
    { label: 'Max TX power accommodated', value: 'Up to 100W', note: 'LPFM range' },
    { label: 'Power service', value: 'Standard commercial', note: 'Generator not required at LPFM levels' },
    { label: 'Internet backhaul', value: 'Per site', note: 'Evaluated per site' },
    { label: 'FCC data package', value: 'Included', note: 'Elevation, coordinates, AGL' },
  ],
  useCases: [
    { name: 'Community FM station transmitter', body: 'Non-commercial community stations operating under LPFM licenses need elevation without the complexity or cost of traditional tower leases â€” Skynode nodes provide a more accessible path.', tags: ['LPFM', 'Community', 'Non-commercial'] },
    { name: 'Religious and educational LPFM', body: 'Religious organizations and educational institutions operating LPFM stations have the same elevation needs as commercial operators but fewer resources to negotiate complex tower agreements.', tags: ['LPFM', 'Religious', 'Educational'] },
    { name: 'New LPFM station build-out', body: 'Organizations that have received new LPFM construction permits need to build out a transmitter site during their permit window â€” Skynode can accelerate site qualification.', tags: ['LPFM', 'CP', 'Build-Out'] },
    { name: 'Studio-to-transmitter simplification', body: 'LPFM operators moving from complex STL setups to IP audio delivery need reliable backhaul at the transmitter site â€” Skynode evaluates broadband options as part of site qualification.', tags: ['LPFM', 'STL', 'IP Audio'] },
  ],
  related: [
    { name: 'FM Primary Transmission Site',      href: '/solutions/broadcast-primary-site' },
    { name: 'FM Translator & Booster Site',       href: '/solutions/broadcast-translator-site' },
    { name: 'Broadcast Backup & Auxiliary Site',  href: '/solutions/broadcast-backup-site' },
    { name: 'Television Broadcast Site',          href: '/solutions/broadcast-tv-site' },
  ],
};

export default function BroadcastLPFM() {
  return <SolutionPage cfg={cfg} />;
}
