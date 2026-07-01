import SolutionPage, { type SolutionConfig } from './SolutionPage';

const cfg: SolutionConfig = {
  vertical: 'edge-colocation',
  breadcrumb: 'Content Delivery & CDN Node',
  headline: 'Distributed edge infrastructure|closer to urban audiences.',
  heroSub: 'CDN operators and content networks need edge nodes positioned within metropolitan areas â€” not in hyperscale data centers at the edge of the metro. Skynode nodes place compute and caching infrastructure where your audience actually is.',
  heroCard: {
    title: 'CDN Edge Node â€” What to Expect',
    items: [
      { label: 'Rack space', value: 'per site â€” evaluated per engagement' },
      { label: 'Power (per rack)', value: 'â€” evaluated per site capacity' },
      { label: 'Network connectivity', value: 'Fiber / Metro Fabric / P2P uplink' },
      { label: 'Cooling', value: 'Evaluated per site capacity and layout' },
      { label: 'Markets served', value: 'New York Â· Florida Â· Illinois Â· Connecticut' },
    ],
    stat: '99',
    statLabel: 'active nodes across Skynode markets',
  },
  trust: {
    eyebrow: 'For CDN and Content Operators',
    headline: 'Latency to end users|starts with where you colocate.',
    body: 'A CDN node in a central data center 40 miles from your audience is delivering content over the same path as a server in another country. A Skynode node in the urban core cuts that path dramatically â€” and the latency difference shows up in every quality metric that matters for streaming, gaming, and real-time content.',
    features: [
      { title: 'Urban core positioning, not metro edge', body: 'Skynode nodes are positioned within urban markets â€” not at the fringe where land is cheaper. For CDN operators, this means a physically shorter path to end-user last-mile infrastructure.' },
      { title: 'Metro Fabric for multi-node distribution', body: 'CDN operators running multiple PoPs in the same Skynode market can interconnect them via Metro Fabric â€” a private, low-latency mesh that replaces transit-dependent inter-PoP paths.' },
      { title: 'Power and cooling for compute-dense deployments', body: 'Edge CDN nodes often run compact, high-density compute. Skynode evaluates power density, cooling capacity, and airflow at each site â€” not all rooftop colocation environments support the same thermal loads.' },
      { title: 'Fiber and P2P uplink options', body: 'CDN nodes need reliable upstream connectivity to origin infrastructure. Skynode confirms fiber availability and point-to-point path options for uplink connectivity at each candidate node.' },
    ],
  },
  specs: [
    { label: 'Rack space available', value: 'Per site', note: 'Confirmed per site engagement' },
    { label: 'Power per rack (kW)', value: 'Per site', note: 'Evaluated per site infrastructure' },
    { label: 'Cooling method', value: 'Per site', note: 'Air / mechanical â€” evaluated per site' },
    { label: 'Fiber availability', value: 'Per site', note: 'Evaluated per site' },
    { label: 'Metro Fabric access', value: 'Per site', note: 'Where active in market' },
    { label: 'Network latency to city center', value: 'Per site', note: 'Measured per site' },
  ],
  useCases: [
    { name: 'Streaming media edge caching', body: 'Video streaming platforms deploying edge caching nodes to reduce latency and improve quality of experience for urban subscribers â€” particularly for live streaming where buffering is not tolerable.', tags: ['Streaming', 'Video', 'Caching'] },
    { name: 'Gaming CDN edge node', body: 'Online gaming CDN infrastructure is latency-sensitive in ways that traditional content delivery is not. Edge nodes positioned in urban cores reduce round-trip times for game state updates and matchmaking traffic.', tags: ['Gaming', 'Real-Time', 'Low Latency'] },
    { name: 'Enterprise content distribution', body: 'Enterprises distributing software updates, large file transfers, and internal media content to urban offices benefit from edge nodes positioned within the metro â€” faster delivery, lower WAN cost.', tags: ['Enterprise', 'Software Distribution', 'WAN'] },
    { name: 'Last-mile CDN PoP', body: 'CDN networks building out last-mile PoP infrastructure within urban markets use Skynode nodes to position caching servers closer to ISP peering points and subscriber last-mile networks.', tags: ['CDN', 'PoP', 'Last Mile'] },
  ],
  related: [
    { name: 'Network Equipment Colocation',  href: '/solutions/network-colocation' },
    { name: 'Enterprise Edge Compute',       href: '/solutions/enterprise-edge' },
  ],
};

export default function CdnEdgeNode() {
  return <SolutionPage cfg={cfg} />;
}
