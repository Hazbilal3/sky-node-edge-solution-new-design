import SolutionPage, { type SolutionConfig } from './SolutionPage';

const cfg: SolutionConfig = {
  vertical: 'broadcasting',
  breadcrumb: 'Broadcast Backup & Auxiliary Site',
  headline: 'A backup transmitter site|that actually stays ready.',
  heroSub: 'FCC auxiliary transmitter authorizations require real infrastructure â€” not a paper filing. Skynode nodes give broadcast operators a backup site that is maintained, accessible, and ready to activate when the primary goes down.',
  heroCard: {
    title: 'Backup / Auxiliary Site â€” What to Expect',
    items: [
      { label: 'Elevation', value: 'Per site evaluation' },
      { label: 'Power availability', value: 'Commercial + generator evaluated per site' },
      { label: 'Activation lead time', value: 'â€” confirmed per engagement' },
      { label: 'Backhaul options', value: 'Fiber / IP / Metro Fabric' },
      { label: 'Markets served', value: 'New York Â· Florida Â· Illinois Â· Connecticut' },
    ],
    stat: '57',
    statLabel: 'active nodes across Skynode markets',
  },
  trust: {
    eyebrow: 'Backup Infrastructure That Works',
    headline: 'Ready to air|when your primary isn\'t.',
    body: 'Many broadcasters have auxiliary transmitter authorizations but no operational site to back them up. A Skynode node changes that â€” a real, maintained, access-controlled site with the elevation and power you need to get back on air fast.',
    features: [
      { title: 'Site that stays maintained', body: 'A backup site that nobody visits until there\'s an emergency is a backup site that fails when you need it most. Skynode nodes are active, maintained infrastructure â€” not dark rooms nobody checks until the phone rings at 2am.' },
      { title: 'Power and generator options', body: 'Emergency operation requires confident power. Skynode evaluates generator availability, automatic transfer switch specs, and fuel logistics as part of qualifying a node for backup use.' },
      { title: 'Rapid activation capability', body: 'When a primary site fails, activation time matters. We work with operators during the setup phase to document the exact steps needed to switch to the backup â€” so activation can happen without having to figure anything out under pressure.' },
      { title: 'FCC auxiliary authorization support', body: 'Skynode provides the site data â€” elevation, coordinates, antenna height â€” needed for FCC auxiliary transmitter authorization applications. We\'ve helped engineers file clean applications that approve quickly.' },
    ],
  },
  specs: [
    { label: 'Elevation above grade', value: 'Per site', note: 'Confirmed during site evaluation' },
    { label: 'Generator availability', value: 'Per site', note: 'Evaluated per site' },
    { label: 'ATS rating', value: 'Per site', note: 'Evaluated per site' },
    { label: 'Activation time (est.)', value: 'Per site', note: 'Confirmed per engagement setup' },
    { label: 'Backhaul redundancy', value: 'Per site', note: 'Primary + backup paths evaluated' },
    { label: 'FCC data package', value: 'Included', note: 'For auxiliary authorization filing' },
  ],
  useCases: [
    { name: 'FCC auxiliary transmitter authorization', body: 'Broadcast operators filing for or maintaining auxiliary transmitter authorizations need a real site behind the filing â€” Skynode provides the site data and infrastructure.', tags: ['Backup', 'FCC', 'Auxiliary'] },
    { name: 'Emergency backup for primary FM site', body: 'FM stations that need a backup transmitter site in the same market as their primary, ready to activate when tower access is lost or equipment fails.', tags: ['Backup', 'FM', 'Emergency'] },
    { name: 'Backup for TV operations', body: 'Television stations with auxiliary transmitter authorizations need a site that can get them back on air â€” at reduced power if necessary â€” while the primary is being repaired.', tags: ['Backup', 'TV', 'Reduced Power'] },
    { name: 'Generator-tested standby site', body: 'Operators who treat emergency preparedness seriously need a backup site they can actually test on a schedule â€” generator runs, antenna checks, and documented activation procedures.', tags: ['Backup', 'Testing', 'Preparedness'] },
  ],
  related: [
    { name: 'FM Primary Transmission Site',  href: '/solutions/broadcast-primary-site' },
    { name: 'Television Broadcast Site',      href: '/solutions/broadcast-tv-site' },
    { name: 'FM Translator & Booster Site',   href: '/solutions/broadcast-translator-site' },
    { name: 'LPFM Transmitter Site',          href: '/solutions/broadcast-lpfm-site' },
  ],
};

export default function BroadcastBackup() {
  return <SolutionPage cfg={cfg} />;
}
