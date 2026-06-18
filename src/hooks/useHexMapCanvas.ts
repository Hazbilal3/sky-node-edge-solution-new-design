import { useEffect, useRef } from 'react';

export interface HexSvc {
  id: string; label: string; color: string; alpha: number;
}
export interface HexCity {
  name: string;
  hexes: Array<{ q:number; r:number; svc:string; label:string; }>;
  svcs: HexSvc[];
}

const CITIES: HexCity[] = [
  {
    name: 'NYC', svcs:[
      {id:'FM',label:'FM',color:'167,139,250',alpha:0.75},
      {id:'TV',label:'TV',color:'64,156,188',alpha:0.75},
      {id:'LPFM',label:'LPFM',color:'91,228,155',alpha:0.75},
      {id:'XL',label:'Translator',color:'251,191,36',alpha:0.75},
    ],
    hexes:[
      {q:0,r:0,svc:'FM',label:'Manhattan'},{q:1,r:0,svc:'TV',label:'Midtown'},
      {q:0,r:1,svc:'LPFM',label:'Harlem'},{q:-1,r:1,svc:'FM',label:'BK North'},
      {q:1,r:-1,svc:'TV',label:'Queens'},{q:2,r:0,svc:'XL',label:'Long Island'},
      {q:-1,r:0,svc:'LPFM',label:'BK South'},{q:0,r:-1,svc:'FM',label:'Bronx'},
      {q:2,r:-1,svc:'TV',label:'Nassau'},{q:-2,r:1,svc:'XL',label:'Staten Is'},
      {q:1,r:1,svc:'LPFM',label:'Flushing'},{q:-1,r:2,svc:'FM',label:'Bay Ridge'},
      {q:3,r:-1,svc:'TV',label:'Hempstead'},{q:0,r:2,svc:'XL',label:'Flatbush'},
    ]
  },
  {
    name: 'Chicago', svcs:[
      {id:'FM',label:'FM',color:'167,139,250',alpha:0.75},
      {id:'TV',label:'TV',color:'64,156,188',alpha:0.75},
      {id:'LPFM',label:'LPFM',color:'91,228,155',alpha:0.75},
      {id:'XL',label:'Translator',color:'251,191,36',alpha:0.75},
    ],
    hexes:[
      {q:0,r:0,svc:'FM',label:'Loop'},{q:1,r:0,svc:'TV',label:'Near North'},
      {q:0,r:1,svc:'LPFM',label:'South Side'},{q:-1,r:1,svc:'FM',label:'West Side'},
      {q:1,r:-1,svc:'TV',label:'Lincoln Park'},{q:2,r:0,svc:'XL',label:'Evanston'},
      {q:-1,r:0,svc:'LPFM',label:'Austin'},{q:0,r:-1,svc:'FM',label:'Wicker Park'},
      {q:2,r:-1,svc:'TV',label:'Skokie'},{q:-2,r:1,svc:'XL',label:'Oak Park'},
    ]
  },
  {
    name: 'Miami', svcs:[
      {id:'FM',label:'FM',color:'167,139,250',alpha:0.75},
      {id:'TV',label:'TV',color:'64,156,188',alpha:0.75},
      {id:'LPFM',label:'LPFM',color:'91,228,155',alpha:0.75},
      {id:'XL',label:'Translator',color:'251,191,36',alpha:0.75},
    ],
    hexes:[
      {q:0,r:0,svc:'FM',label:'Downtown'},{q:1,r:0,svc:'TV',label:'Brickell'},
      {q:0,r:1,svc:'LPFM',label:'Little Haiti'},{q:-1,r:1,svc:'FM',label:'Allapattah'},
      {q:1,r:-1,svc:'TV',label:'Wynwood'},{q:2,r:0,svc:'XL',label:'Coral Gables'},
      {q:-1,r:0,svc:'LPFM',label:'Overtown'},{q:0,r:-1,svc:'FM',label:'South Beach'},
    ]
  },
  {
    name: 'New Haven', svcs:[
      {id:'FM',label:'FM',color:'167,139,250',alpha:0.75},
      {id:'TV',label:'TV',color:'64,156,188',alpha:0.75},
      {id:'LPFM',label:'LPFM',color:'91,228,155',alpha:0.75},
      {id:'XL',label:'Translator',color:'251,191,36',alpha:0.75},
    ],
    hexes:[
      {q:0,r:0,svc:'FM',label:'Downtown'},{q:1,r:0,svc:'TV',label:'Fair Haven'},
      {q:0,r:1,svc:'LPFM',label:'West Haven'},{q:-1,r:1,svc:'FM',label:'Hamden'},
      {q:1,r:-1,svc:'TV',label:'East Haven'},{q:2,r:0,svc:'XL',label:'Orange'},
    ]
  },
  {
    name: 'Springfield', svcs:[
      {id:'FM',label:'FM',color:'167,139,250',alpha:0.75},
      {id:'TV',label:'TV',color:'64,156,188',alpha:0.75},
      {id:'LPFM',label:'LPFM',color:'91,228,155',alpha:0.75},
      {id:'XL',label:'Translator',color:'251,191,36',alpha:0.75},
    ],
    hexes:[
      {q:0,r:0,svc:'FM',label:'Downtown'},{q:1,r:0,svc:'TV',label:'East Springfield'},
      {q:0,r:1,svc:'LPFM',label:'South End'},{q:-1,r:1,svc:'FM',label:'Forest Park'},
      {q:1,r:-1,svc:'TV',label:'Indian Orchard'},{q:2,r:0,svc:'XL',label:'Longmeadow'},
    ]
  }
];

export { CITIES };

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
    const W = 760, H = 400;
    canvas.width = W; canvas.height = H;

    function getR() { return 28 * zoomRef.current; }

    function hexCenter(q:number, r:number): [number,number] {
      const R=getR();
      const x = W/2 + R * (3/2 * q);
      const y = H/2 + R * (Math.sqrt(3)/2 * q + Math.sqrt(3) * r);
      return [x,y];
    }

    function hexPath(cx:number, cy:number) {
      const R=getR();
      ctx.beginPath();
      for(let i=0;i<6;i++) {
        const angle = Math.PI/3*i - Math.PI/6;
        const px=cx+R*Math.cos(angle), py=cy+R*Math.sin(angle);
        i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
      }
      ctx.closePath();
    }

    function draw() {
      const city = CITIES[cityRef.current];
      ctx.clearRect(0,0,W,H);

      // Dark background
      ctx.fillStyle='#08161E'; ctx.fillRect(0,0,W,H);

      // Grid lines
      ctx.strokeStyle='rgba(64,156,188,0.08)'; ctx.lineWidth=0.5;
      for(let q=-6;q<=6;q++) for(let r=-5;r<=5;r++) {
        const [cx,cy]=hexCenter(q,r);
        hexPath(cx,cy); ctx.stroke();
      }

      // Filled hexes
      city.hexes.forEach(h => {
        const svc=city.svcs.find(s=>s.id===h.svc);
        if(!svc) return;
        const [cx,cy]=hexCenter(h.q,h.r);
        hexPath(cx,cy);
        ctx.fillStyle=`rgba(${svc.color},0.22)`; ctx.fill();
        ctx.strokeStyle=`rgba(${svc.color},0.65)`; ctx.lineWidth=1.5; ctx.stroke();

        const R=getR();
        ctx.fillStyle=`rgba(${svc.color},0.9)`;
        ctx.font=`bold ${Math.max(8,R*0.32)}px Satoshi,system-ui,sans-serif`;
        ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillText(svc.label, cx, cy-R*0.18);
        ctx.font=`${Math.max(7,R*0.26)}px Satoshi,system-ui,sans-serif`;
        ctx.fillStyle='rgba(255,255,255,0.55)';
        ctx.fillText(h.label, cx, cy+R*0.26);
      });
    }

    // Mouse hover for tooltip
    function onMouseMove(e: MouseEvent) {
      if(!tip) return;
      const rect=canvas!.getBoundingClientRect();
      const mx=(e.clientX-rect.left)*(W/rect.width);
      const my=(e.clientY-rect.top)*(H/rect.height);
      const city=CITIES[cityRef.current];
      let found=false;
      for(const h of city.hexes) {
        const [cx,cy]=hexCenter(h.q,h.r);
        const R=getR();
        const dist=Math.sqrt((mx-cx)**2+(my-cy)**2);
        if(dist<R*0.9) {
          const svc=city.svcs.find(s=>s.id===h.svc);
          tip.style.display='block';
          tip.style.left=(e.clientX-rect.left+12)+'px';
          tip.style.top=(e.clientY-rect.top-16)+'px';
          tip.innerHTML=`<div style="font-size:12px;font-weight:700;color:rgb(255,255,255,0.85)">${h.label}</div><div style="font-size:11px;color:rgba(${svc?.color||'64,156,188'},0.9);margin-top:3px">${svc?.label||h.svc}</div>`;
          found=true; break;
        }
      }
      if(!found) tip.style.display='none';
    }
    canvas.addEventListener('mousemove',onMouseMove);
    canvas.addEventListener('mouseleave',()=>{ if(tip) tip.style.display='none'; });

    draw();
    return () => {
      canvas.removeEventListener('mousemove',onMouseMove);
    };
  }, [cityIndex, zoom]);
}
