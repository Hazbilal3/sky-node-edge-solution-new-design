import MarketPage from './MarketPage';

export default function Connecticut() {
  return <MarketPage cfg={{
    name: 'Connecticut',
    stateLabel: 'Connecticut',
    cityIndex: 1,
    tagline: 'Strategic elevation|across the Connecticut corridor.',
    heroSub: 'Connecticut offers unique infrastructure positioning — elevated nodes between the New York and Boston metro areas, with strong RF environments for broadcasting and private communications, and growing demand for edge and IoT infrastructure.',
    services: ['Broadcasting', 'Private Comms', 'P25', 'P2P Links', 'IoT / Sensors'],
    highlights: [
      { title: 'Corridor positioning between major metros', body: 'Connecticut nodes serve deployments that need coverage and backhaul between the New York and greater Boston markets — ideal for translator chains, relay sites, and point-to-point links that span the I-95 corridor.' },
      { title: 'Strong RF environments', body: 'Many Connecticut locations offer cleaner RF environments than comparable elevations in denser urban markets — better path clearance, lower interference floors, and stronger potential for LOS links to neighboring sites.' },
      { title: 'P25 and public safety infrastructure', body: 'Connecticut has active demand for public safety radio infrastructure. Skynode nodes in the market are evaluated for P25 compatibility, backhaul quality, and the operational characteristics that government and municipal deployments require.' },
      { title: 'IoT and smart city demand', body: 'Growing municipal technology initiatives in Connecticut create demand for elevated sensor infrastructure, environmental monitoring nodes, and resilient data collection points across the state.' },
    ],
    nodes: [
      { id:'0118.CT', neighborhood:'Hartford',   svcs:['Private Comms','IoT / Sensors'], status:'active'     },
      { id:'0234.CT', neighborhood:'Bridgeport', svcs:['Broadcasting','P2P Links'],      status:'active'     },
      { id:'0089.CT', neighborhood:'New Haven',  svcs:['Private Comms','Private 5G'],   status:'evaluating' },
    ],
    calloutBody: 'Connecticut nodes are particularly well-suited for deployments that span the New York–Boston corridor — translator chains, simulcast receiver sites, P2P relay links, and IoT infrastructure that needs consistent elevation across the state.',
  }} />;
}
