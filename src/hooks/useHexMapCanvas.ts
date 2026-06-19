import { useEffect, useRef } from 'react';

const BASE_R = 16;
const OX = 170, OY = -27;

const SVC = {
  FM:         { fill:'rgba(167,139,250,0.82)', stroke:'#A78BFA', glow:'#7C3AED' },
  TV:         { fill:'rgba(107,192,221,0.82)', stroke:'#6BC0DD', glow:'#2D85B5' },
  LPFM:       { fill:'rgba(91,228,155,0.82)',  stroke:'#5BE49B', glow:'#16A34A' },
  Translator: { fill:'rgba(245,158,11,0.82)',  stroke:'#F59E0B', glow:'#D97706' },
} as const;

type SvcKey = keyof typeof SVC;

interface HexNode { col:number; row:number; type:SvcKey; id:string; asl:string; svc:SvcKey[]; }

const CITY_DATA: Array<{name:string; nodes:HexNode[]}> = [
  { name:'NYC', nodes:[
    {col:11,row:7, type:'FM',         id:'0302.NY', asl:"924'", svc:['FM','TV']},
    {col:12,row:6, type:'FM',         id:'0228.NY', asl:"712'", svc:['FM','Translator']},
    {col:10,row:7, type:'Translator', id:'0118.CT', asl:"641'", svc:['Translator','FM']},
    {col:11,row:8, type:'LPFM',       id:'0175.NY', asl:"543'", svc:['LPFM']},
    {col:12,row:7, type:'TV',         id:'0389.NY', asl:"831'", svc:['TV','FM']},
    {col:13,row:8, type:'TV',         id:'0156.NY', asl:"788'", svc:['TV']},
    {col:10,row:9, type:'LPFM',       id:'0445.NY', asl:"420'", svc:['LPFM','Translator']},
  ]},
  { name:'Chicago', nodes:[
    {col:11,row:7, type:'TV',         id:'0277.IL', asl:"788'", svc:['TV','FM']},
    {col:12,row:6, type:'FM',         id:'0391.IL', asl:"635'", svc:['FM']},
    {col:10,row:8, type:'Translator', id:'0144.IL', asl:"510'", svc:['Translator','LPFM']},
    {col:12,row:8, type:'LPFM',       id:'0503.IL', asl:"445'", svc:['LPFM']},
    {col:11,row:9, type:'FM',         id:'0318.IL', asl:"720'", svc:['FM','TV']},
  ]},
  { name:'Miami', nodes:[
    {col:11,row:7, type:'FM',         id:'0445.FL', asl:"522'", svc:['FM','TV']},
    {col:12,row:6, type:'Translator', id:'0331.FL', asl:"465'", svc:['Translator']},
    {col:10,row:7, type:'LPFM',       id:'0278.FL', asl:"380'", svc:['LPFM','FM']},
    {col:11,row:8, type:'TV',         id:'0512.FL', asl:"600'", svc:['TV']},
    {col:12,row:8, type:'FM',         id:'0209.FL', asl:"488'", svc:['FM','Translator']},
  ]},
  { name:'New Haven', nodes:[
    {col:11,row:7, type:'FM',         id:'0184.CT', asl:"720'", svc:['FM','TV']},
    {col:12,row:6, type:'Translator', id:'0097.CT', asl:"540'", svc:['Translator','FM']},
    {col:10,row:7, type:'LPFM',       id:'0063.CT', asl:"380'", svc:['LPFM']},
    {col:11,row:8, type:'TV',         id:'0221.CT', asl:"610'", svc:['TV','FM']},
    {col:13,row:7, type:'FM',         id:'0145.CT', asl:"495'", svc:['FM']},
  ]},
  { name:'Springfield', nodes:[
    {col:11,row:7, type:'FM',         id:'0312.MA', asl:"680'", svc:['FM','TV']},
    {col:12,row:6, type:'TV',         id:'0258.MA', asl:"820'", svc:['TV']},
    {col:10,row:8, type:'Translator', id:'0089.MA', asl:"430'", svc:['Translator','LPFM']},
    {col:12,row:8, type:'LPFM',       id:'0174.MA', asl:"360'", svc:['LPFM']},
    {col:11,row:9, type:'FM',         id:'0201.MA', asl:"560'", svc:['FM','Translator']},
  ]},
];

export const CITIES = CITY_DATA;

export function useHexMapCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  tooltipRef: React.RefObject<HTMLDivElement | null>,
  cityIndex: number,
  zoom: number
) {
  const zoomRef = useRef(zoom);
  const cityRef = useRef(cityIndex);

  useEffect(() => { zoomRef.current = zoom; }, [zoom]);
  useEffect(() => { cityRef.current = cityIndex; }, [cityIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const tip = tooltipRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = 900, H = 400;
    canvas.width = W; canvas.height = H;

    function hexCenterBase(col: number, row: number) {
      const hW = Math.sqrt(3) * BASE_R;
      return {
        x: col * 1.5 * BASE_R + BASE_R + OX,
        y: row * hW + (col % 2 === 1 ? hW / 2 : 0) + BASE_R + OY,
      };
    }

    function hexCenter(col: number, row: number) {
      const b = hexCenterBase(col, row);
      const cx = W / 2, cy = H / 2;
      const z = zoomRef.current;
      return { x: cx + (b.x - cx) * z, y: cy + (b.y - cy) * z };
    }

    function drawHex(cx:number, cy:number, r:number, fill:string|null, stroke:string|null, lw:number) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i;
        const px = cx + r * Math.cos(a), py = cy + r * Math.sin(a);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      if (fill)   { ctx.fillStyle = fill;     ctx.fill(); }
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
    }

    function render() {
      const isDark = document.documentElement.dataset.theme === 'dark';
      ctx.clearRect(0, 0, W, H);

      // Background — theme-aware
      ctx.fillStyle = isDark ? '#091520' : '#E7F3F9';
      ctx.fillRect(0, 0, W, H);
      const rg = ctx.createRadialGradient(W/2, H*0.44, 0, W/2, H*0.44, W*0.62);
      rg.addColorStop(0, isDark ? 'rgba(32,101,132,0.13)' : 'rgba(32,101,132,0.10)');
      rg.addColorStop(1, 'rgba(32,101,132,0)');
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, W, H);

      const r = BASE_R * zoomRef.current;

      // Full hex grid
      for (let col = -2; col <= 46; col++) {
        for (let row = -2; row <= 28; row++) {
          const { x, y } = hexCenter(col, row);
          if (x < -r*3 || x > W+r*3 || y < -r*3 || y > H+r*3) continue;
          drawHex(x, y, r - 0.5, null, isDark ? 'rgba(64,156,188,0.13)' : 'rgba(32,101,132,0.20)', 0.75);
        }
      }

      const nodes = CITY_DATA[cityRef.current].nodes;

      // Glow pass (behind hexes)
      nodes.forEach(n => {
        const { x, y } = hexCenter(n.col, n.row);
        const s = SVC[n.type];
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3.2);
        g.addColorStop(0, s.glow + '30');
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(x - r*3.5, y - r*3.5, r*7, r*7);
      });

      // Node hexes (no labels — colour only)
      nodes.forEach(n => {
        const { x, y } = hexCenter(n.col, n.row);
        const s = SVC[n.type];
        drawHex(x, y, r, s.fill, s.stroke, 1.5);
      });
    }

    // Hover tooltip
    function onMouseMove(e: MouseEvent) {
      if (!tip) return;
      const rect = canvas!.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (W / rect.width);
      const my = (e.clientY - rect.top)  * (H / rect.height);
      const r = BASE_R * zoomRef.current;
      let hit: HexNode | null = null;
      for (const n of CITY_DATA[cityRef.current].nodes) {
        const { x, y } = hexCenter(n.col, n.row);
        if (Math.hypot(mx - x, my - y) < r * 1.05) { hit = n; break; }
      }
      if (hit) {
        const { x, y } = hexCenter(hit.col, hit.row);
        const sx = (x / W) * rect.width;
        const sy = (y / H) * rect.height;
        const s = SVC[hit.type];
        tip.style.display = 'block';
        tip.style.left = Math.min(sx + r*(rect.width/W) + 10, rect.width - 178) + 'px';
        tip.style.top  = Math.max(sy - 46, 6) + 'px';
        tip.innerHTML  = `
          <div style="font-size:13px;font-weight:800;color:${s.stroke};margin-bottom:3px">${hit.id}</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-bottom:8px">ASL: ${hit.asl}</div>
          <div style="display:flex;gap:4px;flex-wrap:wrap">
            ${hit.svc.map(sv=>`<span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:4px;background:${SVC[sv].glow}22;color:${SVC[sv].stroke};border:1px solid ${SVC[sv].stroke}44">${sv}</span>`).join('')}
          </div>`;
        canvas!.style.cursor = 'crosshair';
      } else {
        tip.style.display = 'none';
        canvas!.style.cursor = 'default';
      }
    }

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', () => { if (tip) tip.style.display = 'none'; });

    render();

    const themeObserver = new MutationObserver(() => render());
    themeObserver.observe(document.documentElement, { attributes:true, attributeFilter:['data-theme'] });

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
      themeObserver.disconnect();
    };
  }, [cityIndex, zoom]);
}
