import SolutionPage, { SolutionConfig } from './SolutionPage';

const cfg: SolutionConfig = {
  vertical: 'edge-colocation',
  breadcrumb: 'Network Equipment Colocation',
  headline: 'Secure space for|network infrastructure in the urban core.',
  heroSub: 'Network operators, ISPs, and enterprise teams that need to colocate routing, switching, and aggregation equipment within a Skynode market get access to maintained, secured, and powered infrastructure — without building a facility.',
  heroCard: {
    title: 'Network Colocation — What to Expect',
    items: [
      { label: 'Rack space', value: 'TBC per site — evaluated per engagement' },
      { label: 'Power (per rack)', value: 'TBC — evaluated per site capacity' },
      { label: 'Physical security', value: 'Evaluated per site — access controlled' },
      { label: 'Network connectivity', value: 'Fiber / Metro Fabric / P2P' },
      { label: 'Markets served', value: 'New York · Florida · Illinois · Connecticut' },
    ],
    stat: 'TBC',
    statLabel: 'active nodes across Skynode markets',
  },
  trust: {
    eyebrow: 'For Network Operators',
    headline: 'Infrastructure managed.|Your network, your gear.',
    body: 'Colocating network equipment in a Skynode node means you own and manage the equipment — Skynode provides the physical infrastructure, power, cooling, and access control that surrounds it. It\'s not a managed service. It\'s your gear in a well-maintained space.',
    features: [
      { title: 'Access-controlled, documented facilities', body: 'Every Skynode node has documented access procedures, technical contacts, and site access logging. Network operators need to know who can access their equipment and when — Skynode provides that accountability.' },
      { title: 'Power with backup for critical network gear', body: 'Routing and switching infrastructure can\'t tolerate unexpected power failures. Generator availability and UPS specs are evaluated for each node qualified for network colocation.' },
      { title: 'Metro Fabric interconnection between nodes', body: 'Network operators colocating equipment at multiple Skynode nodes in the same market benefit from Metro Fabric interconnection — a private, low-latency mesh between sites that doesn\'t depend on transit providers.' },
      { title: 'Fiber meets P2P for diverse uplink paths', body: 'Single-path connectivity creates single points of failure for network infrastructure. Skynode evaluates both fiber and point-to-point microwave uplink options at each node — giving operators a path to uplink redundancy.' },
    ],
  },
  specs: [
    { label: 'Rack space available', value: 'TBC', note: 'Confirmed per site engagement' },
    { label: 'Power per rack (kW)', value: 'TBC', note: 'Evaluated per site' },
    { label: 'UPS availability', value: 'TBC', note: 'Evaluated per site' },
    { label: 'Generator backup', value: 'TBC', note: 'Evaluated per site' },
    { label: 'Fiber availability', value: 'TBC', note: 'Evaluated per site' },
    { label: 'Physical security level', value: 'TBC', note: 'Evaluated per site' },
  ],
  useCases: [
    { name: 'ISP aggregation and distribution point', body: 'Internet service providers building out urban distribution infrastructure need access points positioned within the metro — Skynode nodes provide secured, powered colocation for aggregation routers and distribution switches.', tags: ['ISP', 'Aggregation', 'Distribution'] },
    { name: 'WISP backhaul aggregation', body: 'Wireless ISPs aggregating backhaul from multiple radio access sites need a central point within the coverage area to terminate microwave links and hand off to fiber — Skynode nodes are built for this architecture.', tags: ['WISP', 'Backhaul', 'Aggregation'] },
    { name: 'Enterprise SD-WAN edge node', body: 'Enterprise organizations deploying SD-WAN infrastructure across multiple markets benefit from colocating SD-WAN edge devices at Skynode nodes — closer to branch locations, with multiple uplink path options.', tags: ['Enterprise', 'SD-WAN', 'Edge'] },
    { name: 'Public safety network equipment', body: 'Municipal and state public safety networks routing P25, LTE FirstNet, or CAD/AVL traffic need colocated network equipment at urban sites — Skynode nodes meet the physical security and uptime requirements.', tags: ['Public Safety', 'P25', 'Network'] },
  ],
  related: [
    { name: 'Content Delivery & CDN Node', href: '/solutions/cdn-edge-node' },
    { name: 'Enterprise Edge Compute',     href: '/solutions/enterprise-edge' },
  ],
};

export default function NetworkColocation() {
  return <SolutionPage cfg={cfg} />;
}
