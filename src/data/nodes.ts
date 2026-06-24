/* Shared node dataset — used by Skynodes list page and NodeDetail page */

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
  { id:'0302.NY', market:'New York',    neighborhood:'Midtown Manhattan',  asl:'TBC', services:['BC','EC','AI','P2P'], status:'active'     },
  { id:'0118.NY', market:'New York',    neighborhood:'Brooklyn Heights',   asl:'TBC', services:['BC','PC','IoT'],      status:'active'     },
  { id:'0445.NY', market:'New York',    neighborhood:'Long Island City',   asl:'TBC', services:['PC','5G','P2P'],      status:'active'     },
  { id:'0277.NY', market:'New York',    neighborhood:'The Bronx',          asl:'TBC', services:['BC','PC'],            status:'active'     },
  { id:'0391.NY', market:'New York',    neighborhood:'Upper Manhattan',    asl:'TBC', services:['EC','AI','P2P'],      status:'evaluating' },
  { id:'0118.CT', market:'Connecticut', neighborhood:'Hartford',           asl:'TBC', services:['PC','IoT'],           status:'active'     },
  { id:'0234.CT', market:'Connecticut', neighborhood:'Bridgeport',         asl:'TBC', services:['BC','P2P'],           status:'active'     },
  { id:'0089.CT', market:'Connecticut', neighborhood:'New Haven',          asl:'TBC', services:['PC','5G'],            status:'evaluating' },
  { id:'0445.FL', market:'Florida',     neighborhood:'Miami–Dade',         asl:'TBC', services:['BC','EC','P2P'],      status:'active'     },
  { id:'0156.FL', market:'Florida',     neighborhood:'Orlando Metro',      asl:'TBC', services:['BC','PC'],            status:'active'     },
  { id:'0312.FL', market:'Florida',     neighborhood:'Tampa Bay',          asl:'TBC', services:['EC','5G','IoT'],      status:'evaluating' },
  { id:'0488.IL', market:'Illinois',    neighborhood:'Chicago Loop',       asl:'TBC', services:['BC','EC','AI','PC'],  status:'active'     },
  { id:'0277.IL', market:'Illinois',    neighborhood:'Chicago North Side', asl:'TBC', services:['5G','IoT'],           status:'active'     },
  { id:'0391.IL', market:'Illinois',    neighborhood:'Chicago South Side', asl:'TBC', services:['BC','P2P'],           status:'active'     },
  { id:'0133.IL', market:'Illinois',    neighborhood:'Chicago West Loop',  asl:'TBC', services:['EC','5G','P2P'],      status:'evaluating' },
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

export const ALL_SVCS: SvcCode[] = ['BC','PC','EC','AI','5G','P2P','IoT'];

export const MARKET_TO_ROUTE: Record<string, string> = {
  'New York':    '/markets/new-york',
  'Connecticut': '/markets/connecticut',
  'Florida':     '/markets/florida',
  'Illinois':    '/markets/illinois',
};
