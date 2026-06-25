/* Shared node dataset — sourced from Skynode node CSV */

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
  /* ── New York (17 nodes) ─────────────────────────── */
  { id:'0001.NY', market:'New York',    neighborhood:'Midtown Manhattan',   asl:'TBC', services:['BC','PC','EC','P2P'], status:'active',     lat:40.75247, lng:-73.96768 },
  { id:'0002.NY', market:'New York',    neighborhood:'Midtown Manhattan',   asl:'TBC', services:['BC','PC','EC','P2P'], status:'active',     lat:40.76740, lng:-73.96178 },
  { id:'0003.NY', market:'New York',    neighborhood:'Brooklyn',            asl:'TBC', services:['BC','PC','EC','P2P'], status:'active',     lat:40.69186, lng:-73.98471 },
  { id:'0004.NY', market:'New York',    neighborhood:'Brooklyn',            asl:'TBC', services:['BC','PC','EC','P2P'], status:'active',     lat:40.58639, lng:-73.95358 },
  { id:'0005.NY', market:'New York',    neighborhood:'Midtown Manhattan',   asl:'TBC', services:['BC','PC','EC','P2P'], status:'active',     lat:40.76900, lng:-73.98154 },
  { id:'0006.NY', market:'New York',    neighborhood:'Financial District',  asl:'TBC', services:['BC','PC','EC','AI','P2P'], status:'active', lat:40.70335, lng:-74.00930 },
  { id:'0007.NY', market:'New York',    neighborhood:'Upper West Side',     asl:'TBC', services:['BC','PC','EC','P2P'], status:'active',     lat:40.79504, lng:-73.97594 },
  { id:'0008.NY', market:'New York',    neighborhood:'New Rochelle',        asl:'TBC', services:['BC','PC','EC','P2P'], status:'active',     lat:40.91244, lng:-73.78155 },
  { id:'0009.NY', market:'New York',    neighborhood:'Midtown Manhattan',   asl:'TBC', services:['BC','PC','EC','P2P'], status:'evaluating', lat:40.75620, lng:-73.98573 },
  { id:'0010.NY', market:'New York',    neighborhood:'Financial District',  asl:'TBC', services:['BC','PC','EC','AI','P2P'], status:'active', lat:40.71290, lng:-74.01323 },
  { id:'0011.NY', market:'New York',    neighborhood:'White Plains',        asl:'TBC', services:['BC','PC','EC','P2P'], status:'active',     lat:41.03223, lng:-73.76437 },
  { id:'0012.NY', market:'New York',    neighborhood:'JFK Area',            asl:'TBC', services:['BC','PC','EC','P2P'], status:'active',     lat:40.66724, lng:-73.79930 },
  { id:'0013.NY', market:'New York',    neighborhood:'JFK Area',            asl:'TBC', services:['BC','PC','EC','P2P'], status:'active',     lat:40.66723, lng:-73.79683 },
  { id:'0014.NY', market:'New York',    neighborhood:'Nassau County',       asl:'TBC', services:['BC','PC','EC','P2P'], status:'active',     lat:40.71460, lng:-73.60084 },
  { id:'0015.NY', market:'New York',    neighborhood:'Nassau County',       asl:'TBC', services:['BC','PC','EC','P2P'], status:'active',     lat:40.72017, lng:-73.58347 },
  { id:'0016.NY', market:'New York',    neighborhood:'Financial District',  asl:'TBC', services:['BC','PC','EC','P2P'], status:'evaluating', lat:40.70747, lng:-74.01072 },
  { id:'0017.NY', market:'New York',    neighborhood:'Financial District',  asl:'TBC', services:['BC','PC','EC','P2P'], status:'evaluating', lat:40.70827, lng:-74.01062 },

  /* ── Florida (1 node) ────────────────────────────── */
  { id:'0001.FL', market:'Florida',     neighborhood:'Miami',               asl:'TBC', services:['BC','PC','EC','AI','P2P'], status:'evaluating', lat:25.76304, lng:-80.19042 },

  /* ── Illinois (2 nodes) ──────────────────────────── */
  { id:'0001.IL', market:'Illinois',    neighborhood:'Chicago',             asl:'TBC', services:['BC','PC','EC','P2P'], status:'evaluating', lat:41.88875, lng:-87.62648 },
  { id:'0002.IL', market:'Illinois',    neighborhood:'Chicago',             asl:'TBC', services:['BC','PC','EC','P2P'], status:'evaluating', lat:41.89603, lng:-87.62863 },

  /* ── Connecticut (evaluating) ────────────────────── */
  { id:'0001.CT', market:'Connecticut', neighborhood:'Hartford',            asl:'TBC', services:['BC','PC','P2P'],     status:'evaluating' },
  { id:'0002.CT', market:'Connecticut', neighborhood:'New Haven',           asl:'TBC', services:['BC','PC','P2P'],     status:'evaluating' },
];

export const SVC_META: Record<SvcCode, { label: string; color: string; bg: string; pageHref: string }> = {
  BC:  { label:'Broadcasting',    color:'#C4B5FD', bg:'rgba(124,58,237,0.18)',  pageHref:'/broadcasting'              },
  PC:  { label:'Private Comms',   color:'#6BC0DD', bg:'rgba(64,156,188,0.18)',  pageHref:'/private-communications'    },
  EC:  { label:'Edge Colocation', color:'#5BE49B', bg:'rgba(91,228,155,0.18)',  pageHref:'/edge-colocation'           },
  AI:  { label:'AI / Inference',  color:'#A78BFA', bg:'rgba(167,139,250,0.18)', pageHref:'/edge-colocation/ai-inference' },
  '5G':{ label:'Private 5G',      color:'#FCD34D', bg:'rgba(252,211,77,0.18)',  pageHref:'/experimental'              },
  P2P: { label:'Point-to-Point',  color:'#FB923C', bg:'rgba(251,146,60,0.18)',  pageHref:'/solutions/point-to-point-links' },
  IoT: { label:'IoT / Sensors',   color:'#94A3B8', bg:'rgba(148,163,184,0.18)', pageHref:'/experimental'              },
};

export const ALL_SVCS: SvcCode[] = ['BC','PC','EC','AI','P2P'];

export const MARKET_TO_ROUTE: Record<string, string> = {
  'New York':    '/markets/new-york',
  'Connecticut': '/markets/connecticut',
  'Florida':     '/markets/florida',
  'Illinois':    '/markets/illinois',
};
