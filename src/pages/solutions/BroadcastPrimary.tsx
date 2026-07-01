import SolutionPage, { type SolutionConfig } from './SolutionPage';

const cfg: SolutionConfig = {
  vertical: 'broadcasting',
  breadcrumb: 'FM Primary Transmission Site',
  headline: 'A better home for your|primary FM transmitter.',
  heroSub: 'Skynode nodes offer broadcast operators a real alternative to legacy tower agreements â€” urban elevation, owned and managed infrastructure, and the operational clarity that primary transmission sites demand.',
  heroCard: {
    title: 'FM Primary Site â€” What to Expect',
    items: [
      { label: 'Elevation', value: 'Per site evaluation' },
      { label: 'Power availability', value: 'Commercial + generator backup' },
      { label: 'Backhaul options', value: 'Fiber / point-to-point / Metro Fabric' },
      { label: 'Markets served', value: 'New York Â· Florida Â· Illinois Â· Connecticut' },
      { label: 'RF environment', value: 'Evaluated per market' },
    ],
    stat: '57',
    statLabel: 'active nodes across Skynode markets',
  },
  trust: {
    eyebrow: 'Why Operators Choose Skynode',
    headline: 'Designed for operators,|not landlords.',
    body: 'Most tower agreements were written for the tower owner\'s benefit. Skynode is built around what a broadcast operator actually needs â€” clear specs, real access, and infrastructure that isn\'t shared with a dozen other signals fighting for the same space.',
    features: [
      { title: 'Elevation matched to your coverage requirements', body: 'Site elevation data is provided upfront â€” not buried in a lease addendum. We evaluate each node against your specific coverage pattern before any engagement begins.' },
      { title: 'Power with a plan for continuity', body: 'Primary transmission sites need backup power. Skynode nodes are evaluated for generator availability, transfer switch specs, and load capacity as part of the site qualification process.' },
      { title: 'Backhaul that works for broadcast', body: 'STL and IP audio backhaul options are assessed for each node â€” fiber availability, point-to-point path viability, and Metro Fabric interconnection where applicable.' },
      { title: 'Operational clarity from day one', body: 'Access procedures, technical contacts, and site documentation are included in every engagement. No mystery, no middle layers between you and your transmitter.' },
    ],
  },
  specs: [
    { label: 'Elevation above grade', value: 'Per site', note: 'Confirmed during site evaluation' },
    { label: 'AGL equivalent', value: 'Per site', note: 'Confirmed per coverage modeling' },
    { label: 'Max TX power accommodated', value: 'Per site', note: 'Varies by market and site' },
    { label: 'Generator backup', value: 'Per site', note: 'Evaluated per site' },
    { label: 'Fiber availability', value: 'Per site', note: 'Evaluated per site' },
    { label: 'Coax run length (est.)', value: 'Per site', note: 'Confirmed during site walk' },
  ],
  useCases: [
    { name: 'Replacing a legacy tower lease', body: 'FM operators looking to move off aging or overloaded tower agreements find Skynode nodes offer comparable elevation without the complexity of multi-tenant tower relationships.', tags: ['FM', 'Primary', 'Tower Migration'] },
    { name: 'New market entry for FM operators', body: 'Stations entering a new market or expanding operations can qualify a Skynode site early in the process â€” before committing to lease terms that are difficult to exit.', tags: ['FM', 'New Market', 'Greenfield'] },
    { name: 'Station relocation or upgrade', body: 'When CP or license modifications require a new transmitter site, Skynode can evaluate nodes in the target coverage area and provide spec data for FCC engineering submissions.', tags: ['FM', 'CP', 'Engineering'] },
    { name: 'Backup site qualifying as primary', body: 'Operators who originally placed a node for backup purposes sometimes find the elevation and RF environment qualify it for primary use â€” particularly in competitive RF markets.', tags: ['FM', 'Upgrade', 'Dual-Use'] },
  ],
  related: [
    { name: 'FM Translator & Booster Site',     href: '/solutions/broadcast-translator-site' },
    { name: 'Broadcast Backup & Auxiliary Site', href: '/solutions/broadcast-backup-site' },
    { name: 'Television Broadcast Site',         href: '/solutions/broadcast-tv-site' },
    { name: 'LPFM Transmitter Site',             href: '/solutions/broadcast-lpfm-site' },
  ],
};

export default function BroadcastPrimary() {
  return <SolutionPage cfg={cfg} />;
}
