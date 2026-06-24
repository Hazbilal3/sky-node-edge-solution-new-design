import SolutionPage, { SolutionConfig } from './SolutionPage';

const cfg: SolutionConfig = {
  vertical: 'private-comms',
  breadcrumb: 'Secure Office-to-Office Network',
  headline: 'Private connectivity|between your locations.',
  heroSub: 'Carrier circuits are expensive, slow to provision, and built for someone else\'s priorities. Skynode nodes give multi-location organizations a private point-to-point microwave path between offices — faster to provision, lower recurring cost, and completely off the public internet.',
  heroCard: {
    title: 'Office-to-Office Network — What to Expect',
    items: [
      { label: 'Link type', value: 'Licensed or unlicensed microwave P2P' },
      { label: 'Path length', value: 'TBC — evaluated per location pair' },
      { label: 'Throughput', value: 'TBC — evaluated per path and frequency' },
      { label: 'Latency', value: '<5ms where LOS path available' },
      { label: 'Markets served', value: 'New York · Florida · Illinois · Connecticut' },
    ],
    stat: 'TBC',
    statLabel: 'active nodes across Skynode markets',
  },
  trust: {
    eyebrow: 'Private Network Infrastructure',
    headline: 'Your traffic,|your path, your control.',
    body: 'When your offices are connected through carrier circuits, the carrier controls the path, the uptime SLA, and the provisioning timeline. A Skynode-based microwave link between offices puts your organization in control — and eliminates the monthly recurring cost of a leased line or MPLS circuit.',
    features: [
      { title: 'Private path — completely off the public internet', body: 'Microwave point-to-point links are Layer 1 — there\'s no packet routing through third-party networks, no shared internet infrastructure, and no exposure to the traffic and threats of the public internet.' },
      { title: 'Path viability confirmed before engagement', body: 'We confirm line-of-sight viability between proposed endpoints before any equipment or lease discussion begins — no surprises after you\'ve committed to the infrastructure plan.' },
      { title: 'Faster provisioning than carrier circuits', body: 'Carrier circuit orders take weeks to months. A point-to-point microwave link between two Skynode nodes can be provisioned significantly faster — typically measured in days to weeks once site qualification is complete.' },
      { title: 'FCC licensing support included', body: 'Licensed microwave links require FCC path coordination and licensing. Skynode\'s engagement process includes support for the FCC application process so your team doesn\'t need to navigate it alone.' },
    ],
  },
  specs: [
    { label: 'Link type', value: 'Licensed 6/11/18/23 GHz or unlicensed 60 GHz', note: 'Based on path length and throughput' },
    { label: 'Path length (max)', value: 'TBC', note: 'Depends on frequency and antenna' },
    { label: 'Throughput', value: 'TBC', note: 'Up to multi-Gbps on licensed bands' },
    { label: 'One-way latency', value: '<5ms (LOS path)', note: 'Depends on path length' },
    { label: 'Availability target', value: '99.999% (licensed path)', note: 'TBC per path diversity' },
    { label: 'FCC licensing', value: 'Included for licensed paths', note: 'Coordination and filing support' },
  ],
  useCases: [
    { name: 'Headquarters to branch office connectivity', body: 'Organizations with a primary office and one or more branches within a Skynode market can replace carrier circuits with a private microwave link — lower cost, higher control.', tags: ['Enterprise', 'HQ-Branch', 'Private Network'] },
    { name: 'Data center to office connection', body: 'Private microwave links between a data center colocation facility and an office building eliminate the latency and reliability risks of internet-dependent connectivity.', tags: ['Data Center', 'Colocation', 'Private'] },
    { name: 'Campus multi-building connectivity', body: 'Multi-building campuses that need high-throughput, low-latency connections between buildings can use short-path point-to-point links between Skynode nodes on each structure.', tags: ['Campus', 'Multi-Building', 'High Speed'] },
    { name: 'Disaster recovery primary-to-DR link', body: 'Organizations maintaining a disaster recovery facility need a reliable, low-latency path between primary and DR sites — a private microwave link eliminates internet-path risk for DR replication traffic.', tags: ['DR', 'Resilience', 'Replication'] },
  ],
  related: [
    { name: 'Point-to-Point Data Links',       href: '/solutions/point-to-point-links' },
    { name: 'Two-Way Radio Transmitter Site',  href: '/solutions/two-way-radio-transmitter' },
    { name: 'Simulcast Radio Network',         href: '/solutions/simulcast-radio' },
    { name: 'Two-Way Radio Receiver Site',     href: '/solutions/two-way-radio-receiver' },
  ],
};

export default function OfficeToOffice() {
  return <SolutionPage cfg={cfg} />;
}
