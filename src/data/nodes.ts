/* Shared node dataset — sourced from node updated.csv */

export type SvcCode = 'BC' | 'PC' | 'EC' | 'AI' | '5G' | 'P2P' | 'IoT';

export interface SkynodeEntry {
  id: string;
  market: 'New York' | 'Connecticut' | 'Florida' | 'Illinois';
  neighborhood: string;
  asl: string;
  services: SvcCode[];
  status: 'active' | 'evaluating';
}

export const NODES: SkynodeEntry[] = [
  /* ── Illinois (3 nodes) ──────────────────────────────────────── */
  { id:'0327.IL', market:'Illinois',    neighborhood:'The Loop',           asl:'1,450 ft', services:['BC','PC','EC','AI','P2P','IoT'], status:'active'     },
  { id:'0318.IL', market:'Illinois',    neighborhood:'Chicago',            asl:'1,389 ft', services:['BC','PC','EC','P2P','IoT'],      status:'evaluating' },
  { id:'0319.IL', market:'Illinois',    neighborhood:'Chicago',            asl:'470 ft',   services:['PC','EC','P2P','IoT'],           status:'evaluating' },

  /* ── Florida (3 nodes) ───────────────────────────────────────── */
  { id:'0333.FL', market:'Florida',     neighborhood:'Brickell',           asl:'868 ft',   services:['BC','PC','EC','AI','P2P','IoT'], status:'active'     },
  { id:'0302.FL', market:'Florida',     neighborhood:'Miami',              asl:'480 ft',   services:['PC','EC','AI','P2P','IoT'],      status:'evaluating' },
  { id:'0383.FL', market:'Florida',     neighborhood:'Dadeland / Kendall', asl:'280 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },

  /* ── Connecticut (2 nodes — evaluating) ─────────────────────── */
  { id:'0001.CT', market:'Connecticut', neighborhood:'Hartford',           asl:'TBC',      services:['BC','PC','P2P'],                 status:'evaluating' },
  { id:'0002.CT', market:'Connecticut', neighborhood:'New Haven',          asl:'TBC',      services:['BC','PC','P2P'],                 status:'evaluating' },

  /* ── New York (91 nodes) ─────────────────────────────────────── */
  { id:'0312.NY', market:'New York', neighborhood:'Financial District',    asl:'1,368 ft', services:['BC','PC','EC','AI','P2P','IoT'], status:'active'     },
  { id:'0328.NY', market:'New York', neighborhood:'Hudson Yards',          asl:'1,268 ft', services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0329.NY', market:'New York', neighborhood:'Midtown / Murray Hill', asl:'1,250 ft', services:['BC','PC','EC','AI','P2P','IoT'], status:'active'     },
  { id:'0330.NY', market:'New York', neighborhood:'Bryant Park',           asl:'1,200 ft', services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0331.NY', market:'New York', neighborhood:'Hudson Yards',          asl:'995 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0332.NY', market:'New York', neighborhood:'Hudson Yards',          asl:'935 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0300.NY', market:'New York', neighborhood:'Midtown Manhattan',     asl:'861 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0311.NY', market:'New York', neighborhood:'Midtown Manhattan',     asl:'809 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'evaluating' },
  { id:'0334.NY', market:'New York', neighborhood:'Midtown East',          asl:'808 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0335.NY', market:'New York', neighborhood:"Hell's Kitchen",        asl:'778 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0336.NY', market:'New York', neighborhood:'Penn District',         asl:'750 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0337.NY', market:'New York', neighborhood:'Midtown',               asl:'750 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0338.NY', market:'New York', neighborhood:'Times Square',          asl:'748 ft',   services:['BC','PC','EC','AI','P2P','IoT'], status:'active'     },
  { id:'0339.NY', market:'New York', neighborhood:'Midtown East',          asl:'687 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0307.NY', market:'New York', neighborhood:'Financial District',    asl:'687 ft',   services:['BC','PC','EC','AI','P2P','IoT'], status:'active'     },
  { id:'0340.NY', market:'New York', neighborhood:'Times Square',          asl:'685 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0341.NY', market:'New York', neighborhood:'Financial District',    asl:'681 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0342.NY', market:'New York', neighborhood:'Midtown',               asl:'674 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0343.NY', market:'New York', neighborhood:'Midtown',               asl:'670 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0344.NY', market:'New York', neighborhood:'Midtown East',          asl:'670 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0345.NY', market:'New York', neighborhood:'Midtown East',          asl:'663 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0346.NY', market:'New York', neighborhood:'Long Island City',      asl:'658 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0347.NY', market:'New York', neighborhood:'Midtown East',          asl:'648 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0348.NY', market:'New York', neighborhood:'Financial District',    asl:'640 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0349.NY', market:'New York', neighborhood:'Midtown East',          asl:'632 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0350.NY', market:'New York', neighborhood:'Midtown East',          asl:'632 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0351.NY', market:'New York', neighborhood:'Times Square',          asl:'632 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0301.NY', market:'New York', neighborhood:'Midtown Manhattan',     asl:'623 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0352.NY', market:'New York', neighborhood:'Midtown',               asl:'605 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0353.NY', market:'New York', neighborhood:'Midtown',               asl:'603 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0354.NY', market:'New York', neighborhood:'Midtown',               asl:'603 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0355.NY', market:'New York', neighborhood:'Theater District',      asl:'600 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0356.NY', market:'New York', neighborhood:'Midtown',               asl:'600 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0357.NY', market:'New York', neighborhood:'Midtown',               asl:'600 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0358.NY', market:'New York', neighborhood:'Midtown',               asl:'600 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0303.NY', market:'New York', neighborhood:'Brooklyn',              asl:'595 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0359.NY', market:'New York', neighborhood:'Midtown',               asl:'591 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0360.NY', market:'New York', neighborhood:'Midtown',               asl:'587 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0305.NY', market:'New York', neighborhood:'Midtown Manhattan',     asl:'583 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0361.NY', market:'New York', neighborhood:'Battery Park City',     asl:'577 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0362.NY', market:'New York', neighborhood:'Financial District',    asl:'575 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0363.NY', market:'New York', neighborhood:'Financial District',    asl:'575 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0364.NY', market:'New York', neighborhood:'Financial District',    asl:'575 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0365.NY', market:'New York', neighborhood:'Times Square',          asl:'575 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0366.NY', market:'New York', neighborhood:'Civic Center',          asl:'565 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0367.NY', market:'New York', neighborhood:'Midtown East',          asl:'564 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0368.NY', market:'New York', neighborhood:'Midtown East',          asl:'562 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0369.NY', market:'New York', neighborhood:'Financial District',    asl:'545 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'evaluating' },
  { id:'0370.NY', market:'New York', neighborhood:'Financial District',    asl:'539 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'evaluating' },
  { id:'0371.NY', market:'New York', neighborhood:'Financial District',    asl:'530 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0372.NY', market:'New York', neighborhood:'Financial District',    asl:'525 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0373.NY', market:'New York', neighborhood:'Financial District',    asl:'500 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active'     },
  { id:'0374.NY', market:'New York', neighborhood:'Financial District',    asl:'437 ft',   services:['PC','EC','AI','P2P','IoT'],      status:'active'     },
  { id:'0375.NY', market:'New York', neighborhood:'Bryant Park',           asl:'425 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0313.NY', market:'New York', neighborhood:'White Plains',          asl:'425 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0376.NY', market:'New York', neighborhood:'Financial District',    asl:'400 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0377.NY', market:'New York', neighborhood:'Financial District',    asl:'387 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0310.NY', market:'New York', neighborhood:'New Rochelle',          asl:'384 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0378.NY', market:'New York', neighborhood:'Hudson Yards',          asl:'350 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0379.NY', market:'New York', neighborhood:'Long Island City',      asl:'320 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0380.NY', market:'New York', neighborhood:'Midtown East',          asl:'308 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0381.NY', market:'New York', neighborhood:'NoMad',                 asl:'305 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0382.NY', market:'New York', neighborhood:'Financial District',    asl:'300 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0384.NY', market:'New York', neighborhood:'Herald Square',         asl:'270 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0385.NY', market:'New York', neighborhood:'Financial District',    asl:'250 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0386.NY', market:'New York', neighborhood:'Financial District',    asl:'250 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0387.NY', market:'New York', neighborhood:'NoMad',                 asl:'250 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0388.NY', market:'New York', neighborhood:'Chelsea',               asl:'230 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0389.NY', market:'New York', neighborhood:'Financial District',    asl:'230 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0390.NY', market:'New York', neighborhood:'Penn District',         asl:'230 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0391.NY', market:'New York', neighborhood:'Hudson Square',         asl:'200 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0309.NY', market:'New York', neighborhood:'Upper West Side',       asl:'200 ft',   services:['PC','EC','P2P','IoT'],           status:'evaluating' },
  { id:'0392.NY', market:'New York', neighborhood:'NoHo',                  asl:'175 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0393.NY', market:'New York', neighborhood:'Herald Square',         asl:'150 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0394.NY', market:'New York', neighborhood:'Long Island City',      asl:'150 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0317.NY', market:'New York', neighborhood:'Nassau County',         asl:'150 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0395.NY', market:'New York', neighborhood:'Brooklyn Navy Yard',    asl:'145 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0396.NY', market:'New York', neighborhood:'Long Island City',      asl:'130 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0397.NY', market:'New York', neighborhood:'Sunset Park',           asl:'120 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0398.NY', market:'New York', neighborhood:'Sunset Park',           asl:'120 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0399.NY', market:'New York', neighborhood:'Sunset Park',           asl:'120 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0400.NY', market:'New York', neighborhood:'Chelsea',               asl:'120 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0401.NY', market:'New York', neighborhood:'Long Island City',      asl:'120 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0402.NY', market:'New York', neighborhood:'Chelsea',               asl:'110 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0403.NY', market:'New York', neighborhood:'Penn District',         asl:'100 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0316.NY', market:'New York', neighborhood:'Nassau County',         asl:'100 ft',   services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0404.NY', market:'New York', neighborhood:'Chelsea',               asl:'90 ft',    services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0405.NY', market:'New York', neighborhood:'Hunts Point',           asl:'60 ft',    services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0304.NY', market:'New York', neighborhood:'Brooklyn',              asl:'60 ft',    services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0314.NY', market:'New York', neighborhood:'JFK',                   asl:'50 ft',    services:['PC','EC','P2P','IoT'],           status:'active'     },
  { id:'0315.NY', market:'New York', neighborhood:'JFK',                   asl:'50 ft',    services:['PC','EC','P2P','IoT'],           status:'active'     },
];

export const SVC_META: Record<SvcCode, { label: string; color: string; bg: string; pageHref: string }> = {
  BC:  { label:'Broadcasting',    color:'#C4B5FD', bg:'rgba(124,58,237,0.18)',  pageHref:'/broadcasting'                   },
  PC:  { label:'Private Comms',   color:'#6BC0DD', bg:'rgba(64,156,188,0.18)',  pageHref:'/private-communications'         },
  EC:  { label:'Edge Colocation', color:'#5BE49B', bg:'rgba(91,228,155,0.18)',  pageHref:'/edge-colocation'                },
  AI:  { label:'AI / Inference',  color:'#A78BFA', bg:'rgba(167,139,250,0.18)', pageHref:'/edge-colocation'                },
  '5G':{ label:'Private 5G',      color:'#FCD34D', bg:'rgba(252,211,77,0.18)',  pageHref:'/experimental'                   },
  P2P: { label:'Point-to-Point',  color:'#FB923C', bg:'rgba(251,146,60,0.18)',  pageHref:'/solutions/point-to-point-links' },
  IoT: { label:'IoT / Sensors',   color:'#94A3B8', bg:'rgba(148,163,184,0.18)', pageHref:'/experimental'                   },
};

export const ALL_SVCS: SvcCode[] = ['BC','PC','EC','AI','P2P'];

export const MARKET_TO_ROUTE: Record<string, string> = {
  'New York':    '/markets/new-york',
  'Connecticut': '/markets/connecticut',
  'Florida':     '/markets/florida',
  'Illinois':    '/markets/illinois',
};
