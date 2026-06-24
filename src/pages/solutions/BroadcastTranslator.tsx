import SolutionPage, { SolutionConfig } from './SolutionPage';

const cfg: SolutionConfig = {
  vertical: 'broadcasting',
  breadcrumb: 'FM Translator & Booster Site',
  headline: 'Urban fill for|translator and booster operations.',
  heroSub: 'Translators and boosters expand coverage into urban signal shadows and suburban gaps — but they need the right elevation and RF environment to work. Skynode nodes are evaluated specifically for translator and booster suitability across all four Skynode markets.',
  heroCard: {
    title: 'Translator / Booster Site — What to Expect',
    items: [
      { label: 'Elevation', value: 'TBC per site evaluation' },
      { label: 'TX power range', value: 'Up to 250W (translator) — TBC per site' },
      { label: 'Off-air receive quality', value: 'Evaluated per market RF environment' },
      { label: 'Backhaul options', value: 'IP audio / P2P / Metro Fabric' },
      { label: 'Markets served', value: 'New York · Florida · Illinois · Connecticut' },
    ],
    stat: 'TBC',
    statLabel: 'active nodes across Skynode markets',
  },
  trust: {
    eyebrow: 'Translator and Booster Specific',
    headline: 'Coverage fill where|signals disappear.',
    body: 'Urban canyons, building shadows, and terrain obstructions create coverage gaps that translators and boosters were designed to fill. Getting the site right — elevation, receive quality, backhaul — determines whether a translator project actually solves the problem or creates a new one.',
    features: [
      { title: 'Off-air receive path evaluation', body: 'Translator operation depends on reliable off-air reception of the parent station. Skynode evaluates the receive environment at each candidate node — line of sight to primary antenna, interference potential, and signal level estimates.' },
      { title: 'Urban fill gap analysis', body: 'We can help identify which nodes in a market are positioned to fill specific coverage gaps — useful for operators planning translator deployments before committing to a specific site.' },
      { title: 'Backhaul for IP-fed translators', body: 'FCC rules allow IP audio feeds to translators that replace off-air reception. Skynode evaluates broadband and fiber availability for nodes where IP delivery is a better fit than off-air receive.' },
      { title: 'Metro Fabric interconnection between sites', body: 'Translators and boosters that share a market with a primary Skynode site can take advantage of Metro Fabric low-latency interconnection for distribution and coordination.' },
    ],
  },
  specs: [
    { label: 'Elevation above grade', value: 'TBC', note: 'Confirmed during site evaluation' },
    { label: 'HAAT estimate', value: 'TBC', note: 'Provided for engineering review' },
    { label: 'Receive path quality', value: 'TBC', note: 'Evaluated per specific parent station' },
    { label: 'Max TX power accommodated', value: 'Up to 250W', note: 'FM translator power limits' },
    { label: 'IP backhaul availability', value: 'TBC', note: 'Evaluated per site' },
    { label: 'Metro Fabric access', value: 'TBC', note: 'Where Metro Fabric is active' },
  ],
  useCases: [
    { name: 'Urban signal shadow fill', body: 'Translators deployed to fill coverage gaps in downtown cores and dense urban neighborhoods — where the primary transmitter can\'t reach street level.', tags: ['Translator', 'Urban', 'Fill'] },
    { name: 'Suburban fringe coverage', body: 'Boosters and translators extending FM coverage into suburban fringe areas where the primary signal degrades below listenable quality.', tags: ['Booster', 'Suburban', 'Coverage Extension'] },
    { name: 'HD Radio translator deployment', body: 'HD Radio simulcast translators converting IBOC service to a separate analog frequency — require the same receive and transmit infrastructure as standard FM translators.', tags: ['Translator', 'HD Radio', 'IBOC'] },
    { name: 'Multi-site translator chain', body: 'Operators building translator chains across a market to achieve metro-wide coverage can use multiple Skynode nodes connected via Metro Fabric for distribution.', tags: ['Translator', 'Chain', 'Multi-Site'] },
  ],
  related: [
    { name: 'FM Primary Transmission Site',      href: '/solutions/broadcast-primary-site' },
    { name: 'Broadcast Backup & Auxiliary Site',  href: '/solutions/broadcast-backup-site' },
    { name: 'LPFM Transmitter Site',             href: '/solutions/broadcast-lpfm-site' },
    { name: 'Television Broadcast Site',          href: '/solutions/broadcast-tv-site' },
  ],
};

export default function BroadcastTranslator() {
  return <SolutionPage cfg={cfg} />;
}
