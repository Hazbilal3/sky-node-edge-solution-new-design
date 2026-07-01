import MarketPage from './MarketPage';

export default function Florida() {
  return <MarketPage cfg={{
    name: 'Florida',
    stateLabel: 'Florida',
    cityIndex: 2,
    tagline: 'Broadcast and comms infrastructure|across Florida\'s major metros.',
    heroSub: 'Florida is one of the most active broadcasting markets in the country — with high translator and LPFM activity, strong private communications demand, and growing edge infrastructure requirements across the Miami, Orlando, and Tampa Bay corridors.',
    services: ['Broadcasting', 'Private Comms', 'Edge Colocation', 'P2P Links'],
    highlights: [
      { title: 'High broadcast activity across the state', body: 'Florida has one of the highest concentrations of FM translators, LPFM stations, and secondary broadcast services in the country. Skynode nodes in Florida are evaluated specifically for broadcast loading, backhaul, and the RF environments these services require.' },
      { title: 'Multi-market coverage opportunities', body: 'The Miami, Orlando, and Tampa corridors create a multi-market deployment opportunity — Skynode nodes positioned to serve all three with overlapping coverage and Metro Fabric links between connected sites.' },
      { title: 'Private communications demand', body: 'Florida\'s public safety, logistics, and enterprise sectors drive consistent demand for P25, private 5G, and point-to-point communications infrastructure. Skynode nodes in the market are evaluated for these requirements.' },
      { title: 'Edge infrastructure growth', body: 'Rapid population growth and increasing financial services and tech sector presence in Miami make it a growing market for edge colocation — proximity to Latin American connectivity infrastructure adds additional strategic value.' },
    ],
    nodes: [
      { id:'0445.FL', neighborhood:'Miami–Dade',    svcs:['Broadcasting','Edge Colocation','P2P Links'],    status:'active'     },
      { id:'0156.FL', neighborhood:'Orlando Metro', svcs:['Broadcasting','Private Comms'],                  status:'active'     },
      { id:'0312.FL', neighborhood:'Tampa Bay',     svcs:['Edge Colocation','Private 5G','IoT / Sensors'], status:'evaluating' },
    ],
    activeNodes: 2,
    calloutBody: 'Florida\'s combination of high broadcast activity, multi-market geography, and growing tech sector makes it one of Skynode\'s most strategically valuable markets. Broadcast operators, private communications teams, and edge infrastructure deployments all find a strong fit here.',
  }} />;
}
