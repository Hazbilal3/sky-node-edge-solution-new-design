import MarketPage from './MarketPage';

export default function Illinois() {
  return <MarketPage cfg={{
    name: 'Illinois',
    stateLabel: 'Illinois',
    cityIndex: 3,
    tagline: 'Urban density and elevation|in the Midwest\'s largest market.',
    heroSub: 'Chicago is one of the most technically demanding urban infrastructure markets in the country — high building density, strong broadcast heritage, active private communications and public safety deployments, and growing edge and AI infrastructure demand.',
    services: ['Broadcasting', 'Edge Colocation', 'AI / Inference', 'Private Comms', 'Private 5G'],
    highlights: [
      { title: 'Broadcast infrastructure depth', body: 'Chicago has one of the deepest broadcast infrastructure histories outside of New York — major FM and TV operations, active translator services, and strong private radio networks. Skynode nodes in Illinois are evaluated against these requirements.' },
      { title: 'Edge and AI infrastructure demand', body: 'Chicago\'s concentration of financial services, technology companies, and enterprise headquarters creates strong demand for edge colocation and AI inference infrastructure where latency to downtown users matters.' },
      { title: 'Public safety and P25 coverage', body: 'Illinois has significant public safety radio infrastructure requirements. Skynode nodes are evaluated for P25 compatibility, simulcast potential, and the backhaul and access characteristics that government deployments require.' },
      { title: 'Private 5G demand from enterprise', body: 'Chicago\'s manufacturing facilities, logistics hubs, and enterprise campuses create growing demand for private 5G infrastructure — nodes evaluated for CBRS deployment suitability and metro interconnection.' },
    ],
    nodes: [
      { id:'0488.IL', neighborhood:'Chicago Loop',       svcs:['Broadcasting','Edge Colocation','AI / Inference','Private Comms'], status:'active'     },
      { id:'0277.IL', neighborhood:'Chicago North Side', svcs:['Private 5G','IoT / Sensors'],                                      status:'active'     },
      { id:'0391.IL', neighborhood:'Chicago South Side', svcs:['Broadcasting','P2P Links'],                                        status:'active'     },
      { id:'0133.IL', neighborhood:'Chicago West Loop',  svcs:['Edge Colocation','Private 5G','P2P Links'],                       status:'evaluating' },
    ],
    calloutBody: 'Chicago combines broadcast heritage, enterprise edge demand, public safety requirements, and growing private 5G activity into one of the most technically rich deployment markets in the Skynode network. If your system needs to perform in the Midwest, Illinois is the right starting point.',
  }} />;
}
