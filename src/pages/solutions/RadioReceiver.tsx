import SolutionPage, { type SolutionConfig } from './SolutionPage';

const cfg: SolutionConfig = {
  vertical: 'private-comms',
  breadcrumb: 'Two-Way Radio Receiver Site',
  headline: 'Voted receiver sites|that improve system coverage.',
  heroSub: 'Receiver sites extend two-way radio coverage into areas your transmitters can\'t reach on their own â€” buildings, underground, and terrain gaps. Skynode nodes are evaluated for the receive path quality and backhaul that voted receiver deployments depend on.',
  heroCard: {
    title: 'Receiver Site â€” What to Expect',
    items: [
      { label: 'Elevation', value: 'TBC per site evaluation' },
      { label: 'Receive path quality', value: 'Evaluated per system and coverage need' },
      { label: 'Voter connectivity backhaul', value: 'IP backhaul â€” fiber / P2P / Metro Fabric' },
      { label: 'Power requirement', value: 'Lower than transmitter â€” TBC per site' },
      { label: 'Markets served', value: 'New York Â· Florida Â· Illinois Â· Connecticut' },
    ],
    stat: '99',
    statLabel: 'active nodes across Skynode markets',
  },
  trust: {
    eyebrow: 'Receive Infrastructure',
    headline: 'Better receive paths|improve the whole system.',
    body: 'Voted receiver systems improve coverage where subscribers transmit from marginal locations â€” parking garages, lower floors, terrain shadows. Getting receiver sites right requires attention to elevation, RF environment quality, and the IP backhaul that connects them to the voter controller.',
    features: [
      { title: 'Receive path RF environment evaluation', body: 'A receiver site that picks up interference is worse than no receiver site. Skynode evaluates the RF noise floor at each candidate node to confirm it\'s suitable for voted receive operation.' },
      { title: 'Low-latency voter backhaul', body: 'Voted receiver systems require low-latency IP connections between receive sites and the voter controller. Skynode evaluates fiber and point-to-point backhaul options for the timing characteristics voter systems require.' },
      { title: 'Strategic placement for coverage fills', body: 'Receiver sites are most valuable when placed strategically â€” covering subscriber transmit shadows not addressed by your transmitter sites. Skynode can help identify node placements that complement your existing transmitter infrastructure.' },
      { title: 'Simplified multi-site coordination', body: 'When transmitter and receiver sites are both on Skynode nodes in the same market, Metro Fabric interconnection provides direct low-latency paths between them â€” simplifying voter backhaul architecture.' },
    ],
  },
  specs: [
    { label: 'Elevation above grade', value: 'TBC', note: 'Confirmed during site evaluation' },
    { label: 'RF noise floor', value: 'TBC', note: 'Measured during site evaluation' },
    { label: 'Voter IP backhaul latency', value: 'TBC', note: 'Evaluated per site and path' },
    { label: 'Power requirement', value: 'Low â€” receive only', note: 'No transmit amplification' },
    { label: 'GPS for GNSS voting', value: 'TBC', note: 'Where applicable' },
    { label: 'Metro Fabric availability', value: 'TBC', note: 'Where Metro Fabric is active in market' },
  ],
  useCases: [
    { name: 'Voted receiver for P25 system', body: 'P25 trunked systems with voted receive infrastructure benefit from additional receiver sites that extend the receive footprint without adding transmitter complexity.', tags: ['P25', 'Voted', 'Receiver'] },
    { name: 'Coverage fill for subscriber weak zones', body: 'Areas where subscriber handhelds transmit at marginal power â€” lower building floors, parking structures, and terrain shadows â€” are ideal targets for additional receive sites.', tags: ['Coverage Fill', 'Subscriber', 'Marginal'] },
    { name: 'Interoperability receive site', body: 'Multi-agency interoperability deployments sometimes need additional receive coverage to ensure mutual monitoring of shared talkgroup traffic across jurisdiction boundaries.', tags: ['Interop', 'Multi-Agency', 'Public Safety'] },
    { name: 'Distributed receive antenna system', body: 'Organizations building distributed antenna systems (DAS) for in-building coverage sometimes need elevated outdoor receive sites to complement the indoor infrastructure.', tags: ['DAS', 'Distributed', 'Indoor-Outdoor'] },
  ],
  related: [
    { name: 'Two-Way Radio Transmitter Site',  href: '/solutions/two-way-radio-transmitter' },
    { name: 'Simulcast Radio Network',         href: '/solutions/simulcast-radio' },
    { name: 'Point-to-Point Data Links',       href: '/solutions/point-to-point-links' },
    { name: 'Secure Office-to-Office Network', href: '/solutions/office-to-office' },
  ],
};

export default function RadioReceiver() {
  return <SolutionPage cfg={cfg} />;
}
