import { useEffect, useRef } from 'react';

interface SceneConfig {
  rows: number; scaleBack: number; rowGap: number; spacing: number;
  rxMax: number; baseLift: number; midMin: number; midMax: number;
  ampMin: number; ampMax: number; txBoost: number; packets: number;
  speed: number; pulseEvery: number; fog: number; rightTall: number;
}

const THEMES: Record<string, Record<string, string | string[]>> = {
  dark: {
    sky: ['#08161E','#0B1D28'], fog:'#0E2434', top:'#3E89AD', left:'#205168', right:'#143C50',
    edge:'#8FD6EE', grid:'#2E6E88', link:'#5AB4D6', node:'#368FB5', ring:'#9BDDF2',
    cyan:'#8AD2EC', violet:'#B49CFC', mast:'#B49CFC', pulse:'91,228,155'
  },
  light: {
    sky: ['#DAEFF5','#E9F5FA'], fog:'#CFE4EE', top:'#AFD4E4', left:'#83BAD2', right:'#67A3BE',
    edge:'#15648A', grid:'#8FBED2', link:'#1C6A89', node:'#134F6B', ring:'#15648A',
    cyan:'#1C6A89', violet:'#7C3AED', mast:'#7C3AED', pulse:'21,153,79'
  }
};

function curTheme() { return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
function hexToRgb(h: string) {
  if (h.charAt(0) === '#') { h = h.slice(1); return [parseInt(h.substr(0,2),16),parseInt(h.substr(2,2),16),parseInt(h.substr(4,2),16)]; }
  const m = h.match(/\d+/g) || ['0','0','0']; return [+m[0],+m[1],+m[2]];
}
function mix(h1:string,h2:string,t:number) {
  if(isNaN(t))t=0; if(t<0)t=0; if(t>1)t=1;
  const a=hexToRgb(h1),b=hexToRgb(h2);
  return 'rgb('+Math.round(a[0]+(b[0]-a[0])*t)+','+Math.round(a[1]+(b[1]-a[1])*t)+','+Math.round(a[2]+(b[2]-a[2])*t)+')';
}
function rgba(h:string,al:number) { const a=hexToRgb(h); return 'rgba('+a[0]+','+a[1]+','+a[2]+','+al+')'; }
function rand(a:number,b:number) { return a+Math.random()*(b-a); }
function lerp(a:number,b:number,t:number) { return a+(b-a)*t; }

export function useHeroBg(canvasRef: React.RefObject<HTMLCanvasElement | null>, cfg: SceneConfig) {
  const afRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W=0, H=0, dpr=1;
    let rows: any[] = [];
    let pal = THEMES[curTheme()];
    let lastPulse = 0;
    const margin = 60;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function build() {
      W = canvas!.clientWidth; H = canvas!.clientHeight; if(!W||!H) return;
      dpr = Math.min(window.devicePixelRatio||1,2);
      canvas!.width = W*dpr; canvas!.height = H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
      rows = [];
      const R=cfg.rows, groundY=H-cfg.baseLift, span=W+margin*2;
      for(let r=0;r<R;r++){
        const d=R<2?1:r/(R-1);
        const scale=lerp(cfg.scaleBack,1,d);
        const row: any = { d, scale, baseY:groundY-(R-1-r)*cfg.rowGap,
          fog:(1-d)*(cfg.fog||0), alpha:lerp(0.92,1,d), parK:lerp(0.22,1,d),
          rx:cfg.rxMax*scale, ry:cfg.rxMax*scale*0.5, bars:[], packets:[], uplinks:[], _pulses:[] };
        const n=Math.max(5,Math.round(span/(cfg.spacing*lerp(0.82,1,d)))), step=span/n;
        const stag=(r%2)?step*0.5:0;
        for(let i=0;i<n;i++){
          const bx=-margin+step*(i+0.5)+stag*0.3;
          const xn=Math.min(1,Math.max(0,bx/W));
          const hx=1+xn*(cfg.rightTall||0);
          row.bars.push({ x:bx,
            mid:rand(cfg.midMin,cfg.midMax)*scale*hx, amp:rand(cfg.ampMin,cfg.ampMax)*scale*hx,
            ph:rand(0,Math.PI*2), sp:rand(0.5,1.1)*cfg.speed });
        }
        row.txIndex=(r===R-1)?Math.min(n-1,Math.floor(n*0.82)):-1;
        if(row.txIndex>=0){ row.bars[row.txIndex].tx=true; row.bars[row.txIndex].mid+=cfg.txBoost*scale; row.bars[row.txIndex].amp*=0.6; }
        for(let u=0;u<n;u++){ if(Math.random()<0.30) row.uplinks.push({ bi:u, p:rand(-1.2,1), sp:rand(0.004,0.008)*cfg.speed }); }
        const npk=Math.round(cfg.packets*lerp(0.5,1,d));
        for(let p=0;p<npk;p++) row.packets.push(spawn(row));
        rows.push(row);
      }
    }

    function spawn(row: any) {
      const seg=Math.floor(Math.random()*(row.bars.length-1));
      return { seg, t:Math.random(), sp:rand(0.004,0.011)*cfg.speed, dir:Math.random()<0.5?1:-1,
               c:Math.random()<0.22?(pal.violet as string):(pal.cyan as string) };
    }

    function emit(row: any, bi: number) {
      const b=row.bars[bi]; if(!b) return;
      let seg,t,dir;
      if(bi<row.bars.length-1){ seg=bi; t=0.02; dir=1; } else { seg=bi-1; t=0.98; dir=-1; }
      if(seg<0) return;
      row.packets.push({ seg, t, sp:rand(0.005,0.009)*cfg.speed, dir, c:Math.random()<0.25?(pal.violet as string):(pal.cyan as string), synced:true });
      row._pulses.push({ x:b.nx, y:b.ny, r:3, a:0.55, c:hexToRgb(pal.cyan as string).join(',') });
      b.flash = performance.now();
    }

    function curH(b: any, time: number) { return reduce ? b.mid : b.mid + b.amp*Math.sin(time*0.00075*b.sp + b.ph); }

    function box(b: any, row: any, ox: number) {
      const rx=row.rx, ry=row.ry, cx=b.x+ox, by=row.baseY, ty=by-b.h;
      b.nx=cx; b.ny=ty; b.my=ty-16*row.scale;
      const Tn=[cx,ty-ry],Te=[cx+rx,ty],Ts=[cx,ty+ry],Tw=[cx-rx,ty];
      const Be=[cx+rx,by],Bs=[cx,by+ry],Bw=[cx-rx,by];
      function face(pts: number[][], base: string) {
        const g=ctx.createLinearGradient(0,ty-ry,0,by+ry);
        g.addColorStop(0,mix(base,pal.fog as string,row.fog));
        g.addColorStop(1,mix(mix(base,'#000000',0.20),pal.fog as string,row.fog));
        ctx.fillStyle=g; ctx.beginPath(); ctx.moveTo(pts[0][0],pts[0][1]);
        for(let i=1;i<pts.length;i++) ctx.lineTo(pts[i][0],pts[i][1]); ctx.closePath(); ctx.fill();
      }
      face([Te,Ts,Bs,Be], pal.right as string);
      face([Ts,Tw,Bw,Bs], pal.left as string);
      face([Tn,Te,Ts,Tw], pal.top as string);
      ctx.strokeStyle=rgba(pal.edge as string,0.45+0.45*row.d); ctx.lineWidth=1.1; ctx.stroke();
      if(b.tx){ ctx.strokeStyle=rgba(pal.mast as string,0.8); ctx.lineWidth=1.5*row.scale;
        ctx.beginPath(); ctx.moveTo(cx,ty); ctx.lineTo(cx,b.my); ctx.stroke(); }
    }

    function drawRow(row: any, time: number) {
      ctx.globalAlpha=row.alpha;
      const ox=Math.sin(time*0.0002)*6*row.parK;
      row.bars.forEach((b: any) => { b.h=curH(b,time); });
      row.bars.forEach((b: any) => { box(b,row,ox); });
      ctx.strokeStyle=rgba(pal.link as string,0.22+0.30*row.d); ctx.lineWidth=1.1*row.scale;
      for(let i=0;i<row.bars.length-1;i++){
        ctx.beginPath(); ctx.moveTo(row.bars[i].nx,row.bars[i].ny); ctx.lineTo(row.bars[i+1].nx,row.bars[i+1].ny); ctx.stroke();
      }
      row.packets=row.packets.filter((pk: any) => {
        const A=row.bars[pk.seg],B=row.bars[pk.seg+1];
        if(!A||!B){ if(pk.synced) return false; Object.assign(pk,spawn(row)); return true; }
        if(!reduce) pk.t+=pk.sp*pk.dir;
        if(pk.t>1||pk.t<0){ if(pk.synced) return false; Object.assign(pk,spawn(row)); return true; }
        const px=A.nx+(B.nx-A.nx)*pk.t, py=A.ny+(B.ny-A.ny)*pk.t;
        const tt=Math.min(1,Math.max(0,pk.t-0.07*pk.dir)), tx2=A.nx+(B.nx-A.nx)*tt, ty2=A.ny+(B.ny-A.ny)*tt;
        const grd=ctx.createLinearGradient(tx2,ty2,px,py); grd.addColorStop(0,rgba(pk.c,0)); grd.addColorStop(1,pk.c);
        ctx.strokeStyle=grd; ctx.lineWidth=1.7*row.scale; ctx.beginPath(); ctx.moveTo(tx2,ty2); ctx.lineTo(px,py); ctx.stroke();
        ctx.fillStyle=pk.c; ctx.beginPath(); ctx.arc(px,py,2*row.scale,0,Math.PI*2); ctx.fill();
        return true;
      });
      ctx.lineWidth=1.7*row.scale;
      row.uplinks.forEach((uu: any) => {
        const b=row.bars[uu.bi]; if(!b) return;
        if(!reduce){ uu.p+=uu.sp; if(uu.p>=1){ uu.p=-rand(0.2,1.6); emit(row,uu.bi); } }
        if(uu.p<0||uu.p>1) return;
        const by=row.baseY, hy=by-(by-b.ny)*uu.p, foot=Math.min(by,hy+14*row.scale);
        const grd=ctx.createLinearGradient(0,foot,0,hy);
        grd.addColorStop(0,rgba(pal.cyan as string,0)); grd.addColorStop(1,rgba(pal.cyan as string,0.6));
        ctx.strokeStyle=grd; ctx.beginPath(); ctx.moveTo(b.nx,foot); ctx.lineTo(b.nx,hy); ctx.stroke();
        ctx.fillStyle=rgba(pal.cyan as string,0.95); ctx.beginPath(); ctx.arc(b.nx,hy,1.9*row.scale,0,Math.PI*2); ctx.fill();
      });
      const tb=row.txIndex>=0?row.bars[row.txIndex]:null;
      row._pulses=row._pulses.filter((p: any) => { return p.a>0.02; });
      row._pulses.forEach((p: any) => {
        ctx.strokeStyle='rgba('+p.c+','+p.a+')'; ctx.lineWidth=1.4;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.stroke();
        p.r+=1.8; p.a*=0.88;
      });
      if(!reduce && tb) { ctx.fillStyle=rgba(pal.ring as string,0.85); ctx.beginPath(); ctx.arc(tb.nx,tb.my,3.5*row.scale,0,Math.PI*2); ctx.fill(); }
      ctx.globalAlpha=1;
    }

    function drawBg() {
      const skyArr = pal.sky as string[];
      const g=ctx.createLinearGradient(0,0,0,H);
      g.addColorStop(0,skyArr[0]); g.addColorStop(1,skyArr[1]);
      ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    }

    let animId: number;
    function frame(time: number) {
      pal=THEMES[curTheme()];
      ctx.clearRect(0,0,W,H); drawBg();
      if(!reduce && time-lastPulse>cfg.pulseEvery && rows.length>0){
        lastPulse=time;
        const row=rows[rows.length-1];
        const tb=row.txIndex>=0?row.bars[row.txIndex]:null;
        if(tb) row._pulses.push({x:tb.nx,y:tb.my,r:5,a:0.8,c:hexToRgb(pal.ring as string).join(',')});
      }
      rows.forEach(r => drawRow(r,time));
      animId=requestAnimationFrame(frame);
    }

    function onResize() { build(); }
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);
    build();
    animId=requestAnimationFrame(frame);
    afRef.current=animId;

    // Expose redraw for theme toggle
    (window as any).__skBgRedraw = () => { pal=THEMES[curTheme()]; };

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      delete (window as any).__skBgRedraw;
    };
  }, []);
}
