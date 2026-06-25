import SolutionPage, { type SolutionConfig } from './SolutionPage';

const cfg: SolutionConfig = {
  vertical: 'broadcasting',
  breadcrumb: 'Television Broadcast Site',
  headline: 'Urban elevation for|television transmission.',
  heroSub: 'TV broadcast infrastructure demands more than most vertical assets can deliver — power, access, structural capacity, and RF environments that work at scale. Skynode nodes are evaluated against the specific requirements of television operations.',
  heroCard: {
    title: 'TV Broadcast Site — What to Expect',
    items: [
      { label: 'Elevation', value: 'TBC per site evaluation' },
      { label: 'Structural capacity', value: 'Evaluated per antenna weight / wind load' },
      { label: 'Power capacity', value: 'High-draw TX accommodated — TBC per site' },
      { label: 'Backhaul options', value: 'Fiber / microwave / Metro Fabric' },
      { label: 'Markets served', value: 'New York · Florida · Illinois · Connecticut' },
    ],
    stat: 'TBC',
    statLabel: 'active nodes across Skynode markets',
  },
  trust: {
    eyebrow: 'What Television Operators Need',
    headline: 'Infrastructure that|scales with ATSC.',
    body: 'ATSC 3.0 deployments, SFN configurations, and the power demands of modern TV transmitters require more from a vertical asset than a legacy tower lease typically provides. Skynode works with TV operators to qualify nodes against these requirements before any lease discussion begins.',
    features: [
      { title: 'Structural evaluation for antenna systems', body: 'TV antenna systems have specific structural requirements — weight, wind load, and mount geometry. Skynode provides structural data on each node so your engineering team can evaluate feasibility before a site visit.' },
      { title: 'Power capacity for high-draw transmitters', body: 'High-power TV transmitters draw significantly more than comparable FM or private comms equipment. Power availability, transformer capacity, and backup generator sizing are assessed per site.' },
      { title: 'Backhaul for program delivery and STL', body: 'Program contribution feeds, STL circuits, and remote monitoring all require reliable backhaul. Fiber availability and point-to-point path viability are confirmed during site qualification.' },
      { title: 'SFN and ATSC 3.0 readiness', body: 'Single-frequency network deployments require precise GPS timing and reliable backhaul. Skynode evaluates each node for SFN suitability and ATSC 3.0 technical compatibility where applicable.' },
    ],
  },
  specs: [
    { label: 'Elevation above grade', value: 'TBC', note: 'Confirmed during site evaluation' },
    { label: 'Max antenna wind load', value: 'TBC', note: 'Per structural assessment' },
    { label: 'Max TX power draw (kW)', value: 'TBC', note: 'Varies by site and utility service' },
    { label: 'Generator backup', value: 'TBC', note: 'Evaluated per site' },
    { label: 'GPS / timing availability', value: 'TBC', note: 'Required for SFN' },
    { label: 'Fiber availability', value: 'TBC', note: 'Evaluated per site' },
  ],
  useCases: [
    { name: 'Primary TV transmitter site', body: 'Full-power TV stations seeking a primary transmitter location in a Skynode market can qualify nodes against their coverage engineering and structural requirements.', tags: ['TV', 'Full Power', 'Primary'] },
    { name: 'LPTV and Class A stations', body: 'Low-power TV and Class A stations typically need lower-cost access to elevation than full-power operations require — Skynode nodes can be more accessible entry points for these operators.', tags: ['TV', 'LPTV', 'Class A'] },
    { name: 'ATSC 3.0 transition site', body: 'Stations migrating to ATSC 3.0 or building SFN configurations need sites that can support GPS timing, reliable backhaul, and potentially higher-power transmitters than their current ATSC 1.0 setup.', tags: ['TV', 'ATSC 3.0', 'SFN'] },
    { name: 'Auxiliary and backup transmitter', body: 'FCC-licensed auxiliary TV transmitters need the same elevation and power access as primary sites — Skynode nodes that don\'t qualify as primary often qualify as auxiliary.', tags: ['TV', 'Auxiliary', 'FCC'] },
  ],
  related: [
    { name: 'FM Primary Transmission Site',      href: '/solutions/broadcast-primary-site' },
    { name: 'Broadcast Backup & Auxiliary Site',  href: '/solutions/broadcast-backup-site' },
    { name: 'FM Translator & Booster Site',       href: '/solutions/broadcast-translator-site' },
    { name: 'LPFM Transmitter Site',              href: '/solutions/broadcast-lpfm-site' },
  ],
};

export default function BroadcastTV() {
  return <SolutionPage cfg={cfg} />;
}
