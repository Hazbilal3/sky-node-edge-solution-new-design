import SolutionPage, { type SolutionConfig } from './SolutionPage';

const cfg: SolutionConfig = {
  vertical: 'private-comms',
  breadcrumb: 'Point-to-Point Data Links',
  headline: 'High-capacity microwave backhaul|between fixed locations.',
  heroSub: 'Point-to-point microwave links move data at speeds that fiber-competitive alternatives can match — without waiting for fiber deployment. Skynode nodes provide the elevation, line-of-sight paths, and backhaul access that high-capacity P2P link deployments require.',
  heroCard: {
    title: 'P2P Data Link — What to Expect',
    items: [
      { label: 'Link type', value: 'Licensed microwave / millimeter wave' },
      { label: 'Throughput range', value: 'TBC — up to multi-Gbps on licensed paths' },
      { label: 'Path evaluation', value: 'LOS confirmed before engagement' },
      { label: 'Latency', value: '<1ms per hop typical' },
      { label: 'Markets served', value: 'New York · Florida · Illinois · Connecticut' },
    ],
    stat: 'TBC',
    statLabel: 'active nodes across Skynode markets',
  },
  trust: {
    eyebrow: 'Backhaul Infrastructure',
    headline: 'Fiber-competitive throughput|without waiting for fiber.',
    body: 'Fiber deployment timelines are often measured in months or years. Licensed microwave point-to-point links can deliver gigabit-class throughput on a timeline measured in weeks — using elevation on Skynode nodes to establish clear line-of-sight paths between your locations.',
    features: [
      { title: 'Multi-Gbps throughput on licensed frequencies', body: 'Licensed microwave bands in the 6–23 GHz range support throughput from hundreds of megabits to multi-gigabit — sufficient for most enterprise backhaul, broadcast contribution, and high-density data applications.' },
      { title: 'Sub-millisecond latency per hop', body: 'Point-to-point microwave links deliver consistent sub-millisecond one-way latency — important for financial trading systems, real-time media delivery, and latency-sensitive enterprise applications.' },
      { title: 'Path confirmation before commitment', body: 'Path viability is confirmed using terrain analysis and line-of-sight modeling before any equipment or lease commitment is made — you know the link will work before you commit resources to it.' },
      { title: 'Link aggregation and redundancy options', body: 'Critical paths can be protected using parallel links on different frequencies or with route diversity — providing link redundancy that fiber routes typically can\'t match in dense urban environments.' },
    ],
  },
  specs: [
    { label: 'Frequency bands', value: '6 / 11 / 18 / 23 GHz licensed', note: 'Plus 60 GHz unlicensed for short paths' },
    { label: 'Max throughput', value: 'TBC', note: 'Up to multi-Gbps on higher-order modulation' },
    { label: 'One-way latency', value: '<1ms per hop', note: 'Depends on path length' },
    { label: 'Path length range', value: 'TBC', note: 'Evaluated per frequency and antenna' },
    { label: 'Availability (licensed)', value: '99.999%', note: 'With proper fade margin design' },
    { label: 'FCC licensing', value: 'Included', note: 'Coordination and filing for licensed paths' },
  ],
  useCases: [
    { name: 'Broadcast contribution feed backhaul', body: 'Broadcast networks moving high-bitrate video contribution feeds between production facilities and transmission sites need reliable gigabit-class backhaul — P2P microwave provides it without carrier circuit complexity.', tags: ['Broadcasting', 'Contribution', 'Video'] },
    { name: 'Financial services low-latency trading link', body: 'Trading firms requiring ultra-low-latency connectivity between data centers use licensed microwave P2P links because sub-millisecond latency isn\'t achievable over fiber routes.', tags: ['Financial', 'Trading', 'Low Latency'] },
    { name: 'Enterprise multi-site backhaul ring', body: 'Multi-location enterprises building backhaul rings between facilities use point-to-point microwave links between Skynode nodes to create a private, high-capacity interconnection architecture.', tags: ['Enterprise', 'Ring', 'Backhaul'] },
    { name: 'ISP last-mile and backhaul extension', body: 'Internet service providers extending coverage or building backhaul capacity in a new market can use Skynode node elevation for microwave backhaul links that feed distribution infrastructure.', tags: ['ISP', 'Last Mile', 'Backhaul'] },
  ],
  related: [
    { name: 'Secure Office-to-Office Network',  href: '/solutions/office-to-office' },
    { name: 'Two-Way Radio Transmitter Site',   href: '/solutions/two-way-radio-transmitter' },
    { name: 'Simulcast Radio Network',          href: '/solutions/simulcast-radio' },
    { name: 'Two-Way Radio Receiver Site',      href: '/solutions/two-way-radio-receiver' },
  ],
};

export default function PointToPoint() {
  return <SolutionPage cfg={cfg} />;
}
