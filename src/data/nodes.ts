/* Shared node dataset — sourced from node updated.csv */

export type SvcCode = 'BC' | 'PC' | 'EC' | 'AI' | '5G' | 'P2P' | 'IoT';

export interface SkynodeEntry {
  id: string;
  market: 'New York' | 'Connecticut' | 'Florida' | 'Illinois';
  neighborhood: string;
  asl: string;
  services: SvcCode[];
  status: 'active' | 'evaluating';
  lat?: number;
  lng?: number;
}

export const NODES: SkynodeEntry[] = [
  /* ── Illinois (3 nodes) ──────────────────────────────────────── */
  { id:'0001.IL', market:'Illinois',    neighborhood:'The Loop',           asl:'1,450 ft', services:['BC','PC','EC','AI','P2P','IoT'], status:'active',     lat:41.878876, lng:-87.635915 },
  { id:'0002.IL', market:'Illinois',    neighborhood:'Chicago',            asl:'1,389 ft', services:['BC','PC','EC','P2P','IoT'],      status:'evaluating', lat:41.888745, lng:-87.626480 },
  { id:'0003.IL', market:'Illinois',    neighborhood:'Chicago',            asl:'470 ft',   services:['PC','EC','P2P','IoT'],           status:'evaluating', lat:41.896026, lng:-87.628632 },

  /* ── Florida (3 nodes) ───────────────────────────────────────── */
  { id:'0001.FL', market:'Florida',     neighborhood:'Brickell',           asl:'868 ft',   services:['BC','PC','EC','AI','P2P','IoT'], status:'active',     lat:25.761720, lng:-80.191790 },
  { id:'0002.FL', market:'Florida',     neighborhood:'Miami',              asl:'480 ft',   services:['PC','EC','AI','P2P','IoT'],      status:'evaluating', lat:25.763039, lng:-80.190417 },
  { id:'0003.FL', market:'Florida',     neighborhood:'Dadeland / Kendall', asl:'280 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:25.684600, lng:-80.313800 },

  /* ── Connecticut (2 nodes — evaluating) ─────────────────────── */
  { id:'0001.CT', market:'Connecticut', neighborhood:'Hartford',           asl:'TBC',      services:['BC','PC','P2P'],                 status:'evaluating' },
  { id:'0002.CT', market:'Connecticut', neighborhood:'New Haven',          asl:'TBC',      services:['BC','PC','P2P'],                 status:'evaluating' },

  /* ── New York (91 nodes) ─────────────────────────────────────── */
  { id:'0001.NY', market:'New York', neighborhood:'Financial District',    asl:'1,368 ft', services:['BC','PC','EC','AI','P2P','IoT'], status:'active',     lat:40.712903, lng:-74.013229 },
  { id:'0002.NY', market:'New York', neighborhood:'Hudson Yards',          asl:'1,268 ft', services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.753930, lng:-74.001420 },
  { id:'0003.NY', market:'New York', neighborhood:'Midtown / Murray Hill', asl:'1,250 ft', services:['BC','PC','EC','AI','P2P','IoT'], status:'active',     lat:40.748420, lng:-73.985660 },
  { id:'0004.NY', market:'New York', neighborhood:'Bryant Park',           asl:'1,200 ft', services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.755560, lng:-73.984590 },
  { id:'0005.NY', market:'New York', neighborhood:'Hudson Yards',          asl:'995 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.752180, lng:-74.002990 },
  { id:'0006.NY', market:'New York', neighborhood:'Hudson Yards',          asl:'935 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.753010, lng:-74.003020 },
  { id:'0007.NY', market:'New York', neighborhood:'Midtown Manhattan',     asl:'861 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.752474, lng:-73.967684 },
  { id:'0008.NY', market:'New York', neighborhood:'Midtown Manhattan',     asl:'809 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'evaluating', lat:40.756199, lng:-73.985728 },
  { id:'0009.NY', market:'New York', neighborhood:'Midtown East',          asl:'808 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.754440, lng:-73.976010 },
  { id:'0010.NY', market:'New York', neighborhood:"Hell's Kitchen",        asl:'778 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.763380, lng:-73.986580 },
  { id:'0011.NY', market:'New York', neighborhood:'Penn District',         asl:'750 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.750640, lng:-73.993480 },
  { id:'0012.NY', market:'New York', neighborhood:'Midtown',               asl:'750 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.759640, lng:-73.981920 },
  { id:'0013.NY', market:'New York', neighborhood:'Times Square',          asl:'748 ft',   services:['BC','PC','EC','AI','P2P','IoT'], status:'active',     lat:40.755920, lng:-73.990280 },
  { id:'0014.NY', market:'New York', neighborhood:'Midtown East',          asl:'687 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.756490, lng:-73.973010 },
  { id:'0015.NY', market:'New York', neighborhood:'Financial District',    asl:'687 ft',   services:['BC','PC','EC','AI','P2P','IoT'], status:'active',     lat:40.703348, lng:-74.009296 },
  { id:'0016.NY', market:'New York', neighborhood:'Times Square',          asl:'685 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.758900, lng:-73.985090 },
  { id:'0017.NY', market:'New York', neighborhood:'Financial District',    asl:'681 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.705720, lng:-74.007830 },
  { id:'0018.NY', market:'New York', neighborhood:'Midtown',               asl:'674 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.760730, lng:-73.982640 },
  { id:'0019.NY', market:'New York', neighborhood:'Midtown',               asl:'670 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.762620, lng:-73.983720 },
  { id:'0020.NY', market:'New York', neighborhood:'Midtown East',          asl:'670 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.757020, lng:-73.976040 },
  { id:'0021.NY', market:'New York', neighborhood:'Midtown East',          asl:'663 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.755610, lng:-73.974490 },
  { id:'0022.NY', market:'New York', neighborhood:'Long Island City',      asl:'658 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.747460, lng:-73.944160 },
  { id:'0023.NY', market:'New York', neighborhood:'Midtown East',          asl:'648 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.754120, lng:-73.975920 },
  { id:'0024.NY', market:'New York', neighborhood:'Financial District',    asl:'640 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.701920, lng:-74.011930 },
  { id:'0025.NY', market:'New York', neighborhood:'Midtown East',          asl:'632 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.756040, lng:-73.970020 },
  { id:'0026.NY', market:'New York', neighborhood:'Midtown East',          asl:'632 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.758510, lng:-73.971210 },
  { id:'0027.NY', market:'New York', neighborhood:'Times Square',          asl:'632 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.756510, lng:-73.990390 },
  { id:'0028.NY', market:'New York', neighborhood:'Midtown Manhattan',     asl:'623 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.767403, lng:-73.961785 },
  { id:'0029.NY', market:'New York', neighborhood:'Midtown',               asl:'605 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.761310, lng:-73.981010 },
  { id:'0030.NY', market:'New York', neighborhood:'Midtown',               asl:'603 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.762540, lng:-73.978930 },
  { id:'0031.NY', market:'New York', neighborhood:'Midtown',               asl:'603 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.760030, lng:-73.982560 },
  { id:'0032.NY', market:'New York', neighborhood:'Theater District',      asl:'600 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.757020, lng:-73.984880 },
  { id:'0033.NY', market:'New York', neighborhood:'Midtown',               asl:'600 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.761020, lng:-73.981710 },
  { id:'0034.NY', market:'New York', neighborhood:'Midtown',               asl:'600 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.755620, lng:-73.983880 },
  { id:'0035.NY', market:'New York', neighborhood:'Midtown',               asl:'600 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.764520, lng:-73.981760 },
  { id:'0036.NY', market:'New York', neighborhood:'Brooklyn',              asl:'595 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.691863, lng:-73.984715 },
  { id:'0037.NY', market:'New York', neighborhood:'Midtown',               asl:'591 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.759330, lng:-73.981820 },
  { id:'0038.NY', market:'New York', neighborhood:'Midtown',               asl:'587 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.759610, lng:-73.980610 },
  { id:'0039.NY', market:'New York', neighborhood:'Midtown Manhattan',     asl:'583 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.768999, lng:-73.981544 },
  { id:'0040.NY', market:'New York', neighborhood:'Battery Park City',     asl:'577 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.713960, lng:-74.015240 },
  { id:'0041.NY', market:'New York', neighborhood:'Financial District',    asl:'575 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.703320, lng:-74.008560 },
  { id:'0042.NY', market:'New York', neighborhood:'Financial District',    asl:'575 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.706630, lng:-74.004430 },
  { id:'0043.NY', market:'New York', neighborhood:'Financial District',    asl:'575 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.705820, lng:-74.003010 },
  { id:'0044.NY', market:'New York', neighborhood:'Times Square',          asl:'575 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.755600, lng:-73.987080 },
  { id:'0045.NY', market:'New York', neighborhood:'Civic Center',          asl:'565 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.715030, lng:-74.003990 },
  { id:'0046.NY', market:'New York', neighborhood:'Midtown East',          asl:'564 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.753980, lng:-73.975690 },
  { id:'0047.NY', market:'New York', neighborhood:'Midtown East',          asl:'562 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.751500, lng:-73.974030 },
  { id:'0048.NY', market:'New York', neighborhood:'Financial District',    asl:'545 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'evaluating', lat:40.708275, lng:-74.010620 },
  { id:'0049.NY', market:'New York', neighborhood:'Financial District',    asl:'539 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'evaluating', lat:40.707474, lng:-74.010715 },
  { id:'0050.NY', market:'New York', neighborhood:'Financial District',    asl:'530 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.703500, lng:-74.013180 },
  { id:'0051.NY', market:'New York', neighborhood:'Financial District',    asl:'525 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.703610, lng:-74.011780 },
  { id:'0052.NY', market:'New York', neighborhood:'Financial District',    asl:'500 ft',   services:['BC','PC','EC','P2P','IoT'],      status:'active',     lat:40.713810, lng:-74.009520 },
  /* NY 0053–0091 below */
  { id:'0053.NY', market:'New York', neighborhood:'Financial District',    asl:'437 ft',   services:['PC','EC','AI','P2P','IoT'],      status:'active',     lat:40.704210, lng:-74.011320 },
  { id:'0054.NY', market:'New York', neighborhood:'Bryant Park',           asl:'425 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.753970, lng:-73.982980 },
  { id:'0055.NY', market:'New York', neighborhood:'White Plains',          asl:'425 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:41.032232, lng:-73.764370 },
  { id:'0056.NY', market:'New York', neighborhood:'Financial District',    asl:'400 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.705280, lng:-74.010720 },
  { id:'0057.NY', market:'New York', neighborhood:'Financial District',    asl:'387 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.710020, lng:-74.009410 },
  { id:'0058.NY', market:'New York', neighborhood:'New Rochelle',          asl:'384 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.912437, lng:-73.781553 },
  { id:'0059.NY', market:'New York', neighborhood:'Hudson Yards',          asl:'350 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.753600, lng:-74.002130 },
  { id:'0060.NY', market:'New York', neighborhood:'Long Island City',      asl:'320 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.751020, lng:-73.940990 },
  { id:'0061.NY', market:'New York', neighborhood:'Midtown East',          asl:'308 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.752180, lng:-73.974520 },
  { id:'0062.NY', market:'New York', neighborhood:'NoMad',                 asl:'305 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.745900, lng:-73.982610 },
  { id:'0063.NY', market:'New York', neighborhood:'Financial District',    asl:'300 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.709020, lng:-74.007310 },
  { id:'0064.NY', market:'New York', neighborhood:'Herald Square',         asl:'270 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.749110, lng:-73.987920 },
  { id:'0065.NY', market:'New York', neighborhood:'Financial District',    asl:'250 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.701560, lng:-74.011410 },
  { id:'0066.NY', market:'New York', neighborhood:'Financial District',    asl:'250 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.708820, lng:-74.004020 },
  { id:'0067.NY', market:'New York', neighborhood:'NoMad',                 asl:'250 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.743000, lng:-73.985470 },
  { id:'0068.NY', market:'New York', neighborhood:'Chelsea',               asl:'230 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.751470, lng:-74.006520 },
  { id:'0069.NY', market:'New York', neighborhood:'Financial District',    asl:'230 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.704380, lng:-74.013580 },
  { id:'0070.NY', market:'New York', neighborhood:'Penn District',         asl:'230 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.752690, lng:-73.994320 },
  { id:'0071.NY', market:'New York', neighborhood:'Hudson Square',         asl:'200 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.727410, lng:-74.011010 },
  { id:'0072.NY', market:'New York', neighborhood:'Upper West Side',       asl:'200 ft',   services:['PC','EC','P2P','IoT'],           status:'evaluating', lat:40.795039, lng:-73.975936 },
  { id:'0073.NY', market:'New York', neighborhood:'NoHo',                  asl:'175 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.729990, lng:-73.991980 },
  { id:'0074.NY', market:'New York', neighborhood:'Herald Square',         asl:'150 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.749430, lng:-73.986320 },
  { id:'0075.NY', market:'New York', neighborhood:'Long Island City',      asl:'150 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.742980, lng:-73.940870 },
  { id:'0076.NY', market:'New York', neighborhood:'Nassau County',         asl:'150 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.720166, lng:-73.583473 },
  { id:'0077.NY', market:'New York', neighborhood:'Brooklyn Navy Yard',    asl:'145 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.700820, lng:-73.970640 },
  { id:'0078.NY', market:'New York', neighborhood:'Long Island City',      asl:'130 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.743470, lng:-73.939540 },
  { id:'0079.NY', market:'New York', neighborhood:'Sunset Park',           asl:'120 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.655700, lng:-74.009480 },
  { id:'0080.NY', market:'New York', neighborhood:'Sunset Park',           asl:'120 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.645320, lng:-74.020480 },
  { id:'0081.NY', market:'New York', neighborhood:'Sunset Park',           asl:'120 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.647030, lng:-74.014980 },
  { id:'0082.NY', market:'New York', neighborhood:'Chelsea',               asl:'120 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.742380, lng:-74.006100 },
  { id:'0083.NY', market:'New York', neighborhood:'Long Island City',      asl:'120 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.753970, lng:-73.929030 },
  { id:'0084.NY', market:'New York', neighborhood:'Chelsea',               asl:'110 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.751530, lng:-74.006610 },
  { id:'0085.NY', market:'New York', neighborhood:'Penn District',         asl:'100 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.752170, lng:-73.996690 },
  { id:'0086.NY', market:'New York', neighborhood:'Nassau County',         asl:'100 ft',   services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.714596, lng:-73.600841 },
  { id:'0087.NY', market:'New York', neighborhood:'Chelsea',               asl:'90 ft',    services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.746010, lng:-74.009990 },
  { id:'0088.NY', market:'New York', neighborhood:'Hunts Point',           asl:'60 ft',    services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.806790, lng:-73.878560 },
  { id:'0089.NY', market:'New York', neighborhood:'Brooklyn',              asl:'60 ft',    services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.586393, lng:-73.953588 },
  { id:'0090.NY', market:'New York', neighborhood:'JFK',                   asl:'50 ft',    services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.667240, lng:-73.799296 },
  { id:'0091.NY', market:'New York', neighborhood:'JFK',                   asl:'50 ft',    services:['PC','EC','P2P','IoT'],           status:'active',     lat:40.667234, lng:-73.796835 },
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
