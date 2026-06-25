import SolutionPage, { type SolutionConfig } from './SolutionPage';

const cfg: SolutionConfig = {
  vertical: 'edge-colocation',
  breadcrumb: 'Enterprise Edge Compute',
  headline: 'Compute infrastructure|inside the markets you serve.',
  heroSub: 'Hyperscale cloud infrastructure is optimized for scale — not for proximity to your users. Enterprise edge compute at Skynode nodes puts processing capacity where latency is lowest: within the urban markets where your customers, employees, and operations live.',
  heroCard: {
    title: 'Enterprise Edge Compute — What to Expect',
    items: [
      { label: 'Rack space', value: 'TBC per site — evaluated per engagement' },
      { label: 'Power (per rack)', value: 'TBC — evaluated per site' },
      { label: 'GPU / AI inference', value: 'Evaluated per site power and cooling' },
      { label: 'Network latency to metro', value: 'TBC per site — measured during qualification' },
      { label: 'Markets served', value: 'New York · Florida · Illinois · Connecticut' },
    ],
    stat: 'TBC',
    statLabel: 'active nodes across Skynode markets',
  },
  trust: {
    eyebrow: 'For Enterprise Infrastructure Teams',
    headline: 'Edge compute where|your users are.',
    body: 'Cloud regions are getting closer, but they\'re still not in your city. Edge compute at a Skynode node can be 5–15ms closer to your users than the nearest cloud availability zone — and for real-time AI inference, video processing, and latency-sensitive enterprise applications, that distance matters.',
    features: [
      { title: 'Urban positioning reduces application latency', body: 'Edge nodes within a metropolitan area are physically closer to end users than regional cloud infrastructure. For applications where response time is perceptible — AI assistants, real-time analytics, interactive applications — the distance reduction translates directly into better user experience.' },
      { title: 'AI inference at the edge', body: 'Running inference models at edge nodes reduces the round-trip to a centralized AI service — critical for real-time applications. Skynode evaluates each node for the power density and cooling capacity that GPU inference workloads require.' },
      { title: 'Data sovereignty and processing locality', body: 'Regulated industries and privacy-conscious organizations benefit from processing data within a specific market rather than routing it through centralized cloud infrastructure — edge nodes provide the geographic control that compliance requirements demand.' },
      { title: 'Private 5G and IoT data processing', body: 'Private 5G and IoT deployments generate data at the network edge. Colocating processing infrastructure at the same site where radio access equipment is deployed eliminates the latency of sending IoT data to a remote cloud before processing.' },
    ],
  },
  specs: [
    { label: 'Rack space available', value: 'TBC', note: 'Confirmed per site engagement' },
    { label: 'Power per rack (kW)', value: 'TBC', note: 'Evaluated per site — GPU workloads are power-dense' },
    { label: 'Cooling for GPU deployments', value: 'TBC', note: 'Evaluated per site — thermal capacity varies' },
    { label: 'Network latency to metro core', value: 'TBC', note: 'Measured during qualification' },
    { label: 'Metro Fabric connectivity', value: 'TBC', note: 'Where active in market' },
    { label: 'Physical security level', value: 'TBC', note: 'Evaluated per site' },
  ],
  useCases: [
    { name: 'AI inference at metropolitan scale', body: 'Enterprises running real-time AI inference for applications like computer vision, NLP processing, and recommendation engines benefit from inference infrastructure placed within the markets they serve.', tags: ['AI', 'Inference', 'Real-Time'] },
    { name: 'Private 5G edge processing', body: 'Private 5G deployments colocating mobile edge compute (MEC) infrastructure alongside radio access equipment — processing IoT and industrial data before it leaves the deployment site.', tags: ['Private 5G', 'MEC', 'IoT'] },
    { name: 'Real-time video analytics', body: 'Smart city, security, and industrial video analytics systems that process high-resolution video streams need compute infrastructure close enough to the camera network to avoid backhaul bottlenecks.', tags: ['Video Analytics', 'Smart City', 'Compute'] },
    { name: 'Financial services low-latency compute', body: 'Trading systems, risk calculation engines, and real-time financial analytics that benefit from compute proximity to market data sources and order routing infrastructure.', tags: ['Financial', 'Low Latency', 'Trading'] },
  ],
  related: [
    { name: 'Content Delivery & CDN Node',  href: '/solutions/cdn-edge-node' },
    { name: 'Network Equipment Colocation', href: '/solutions/network-colocation' },
    { name: 'AI / Inference page',          href: '/edge-colocation/ai-inference' },
  ],
};

export default function EnterpriseEdge() {
  return <SolutionPage cfg={cfg} />;
}
