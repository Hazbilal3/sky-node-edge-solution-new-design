import MarketPage from './MarketPage';

export default function NewYork() {
  return <MarketPage cfg={{
    name: 'New York',
    stateLabel: 'New York',
    cityIndex: 0,
    tagline: 'The densest infrastructure market|in the country.',
    heroSub: 'New York is Skynode\'s primary market — the highest concentration of nodes, the broadest service coverage, and the most active deployment activity across broadcasting, private communications, edge colocation, and AI inference.',
    services: ['Broadcasting', 'Private Comms', 'Edge Colocation', 'AI / Inference', 'P2P Links', 'IoT / Sensors'],
    highlights: [
      { title: 'Broadcast legacy, modern infrastructure', body: 'New York has the deepest history of urban broadcast infrastructure in the country. Skynode nodes are evaluated against that legacy — with RF environments, structural characteristics, and backhaul options that meet modern broadcast standards.' },
      { title: 'Edge density that matches real demand', body: 'High user density, financial services concentration, and media production activity make New York the strongest market for edge colocation and AI inference. Proximity to users and systems matters most where latency costs the most.' },
      { title: 'P25 and simulcast infrastructure', body: 'Public safety and private communications deployments in New York require sites that can handle the RF environment, interference profile, and backhaul demands of voted and simulcast systems. Skynode nodes are evaluated for exactly these requirements.' },
      { title: 'Metro Fabric coverage', body: 'New York has the most Metro Fabric-capable node pairs in the Skynode network — direct point-to-point links between nodes across the boroughs and surrounding markets.' },
    ],
    nodes: [
      { id:'0312.NY', neighborhood:'Financial District',  svcs:['Broadcasting','Edge Colocation','AI / Inference','P2P Links'], status:'active'     },
      { id:'0303.NY', neighborhood:'Brooklyn',           svcs:['Broadcasting','Private Comms','IoT / Sensors'],               status:'active'     },
      { id:'0346.NY', neighborhood:'Long Island City',   svcs:['Private Comms','Edge Colocation','P2P Links'],                status:'active'     },
      { id:'0329.NY', neighborhood:'Midtown / Murray Hill', svcs:['Broadcasting','Edge Colocation','AI / Inference'],         status:'active'     },
      { id:'0309.NY', neighborhood:'Upper West Side',    svcs:['Edge Colocation','P2P Links'],                               status:'evaluating' },
    ],
    activeNodes: 87,
    calloutBody: 'New York is Skynode\'s most active market — with the broadest range of service types, the densest node distribution, and the most developed Metro Fabric coverage. If your deployment needs to start anywhere, New York is the right first conversation.',
  }} />;
}
