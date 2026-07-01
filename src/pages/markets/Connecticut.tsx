import MarketPage from './MarketPage';

export default function Connecticut() {
  return <MarketPage cfg={{
    name: 'Connecticut',
    stateLabel: 'Connecticut',
    cityIndex: 1,
    tagline: 'Standalone infrastructure|available across Connecticut.',
    heroSub: 'Connecticut nodes are offered as independent standalone sites — not integrated into the Skynode Metro Fabric, but fully available for individual deployments. Each site is evaluated on its own merits and suited for translator operations, relay points, P25 infrastructure, and point-to-point links that require Connecticut-based elevation.',
    services: ['Broadcasting', 'Private Comms', 'P25', 'P2P Links'],
    highlights: [
      { title: 'Standalone deployment, independently offered', body: 'Connecticut nodes operate as independent sites rather than integrated Metro Fabric nodes. Suitable for single-site deployments, translator operations, relay points, and P25 infrastructure — without requiring a wider network commitment.' },
      { title: 'Corridor relay and translation', body: 'Connecticut nodes serve deployments that need coverage and relay capability between the New York and Boston markets — translator chains, point-to-point relay sites, and backhaul paths that benefit from Connecticut elevation.' },
      { title: 'Strong RF environments', body: 'Many Connecticut locations offer cleaner RF environments than comparable elevations in denser urban markets — better path clearance, lower interference floors, and stronger potential for LOS links to neighboring sites.' },
      { title: 'P25 and public safety infrastructure', body: 'Connecticut has active demand for public safety radio infrastructure. Skynode nodes in the market are evaluated for P25 compatibility, backhaul quality, and the operational characteristics that government and municipal deployments require.' },
    ],
    nodes: [
      { id:'0001.CT', neighborhood:'Hartford',  svcs:['Broadcasting', 'Private Comms', 'P2P Links'], status:'evaluating' },
      { id:'0002.CT', neighborhood:'New Haven', svcs:['Broadcasting', 'Private Comms', 'P2P Links'], status:'evaluating' },
    ],
    activeNodes: 'Evaluating',
    calloutBody: 'Connecticut nodes are standalone sites — independently available for translator services, P25 relay, and point-to-point links without requiring integration into a Metro Fabric deployment. Contact Skynode to discuss availability for your specific application.',
  }} />;
}
