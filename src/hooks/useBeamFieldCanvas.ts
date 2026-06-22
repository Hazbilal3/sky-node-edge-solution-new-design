import { useEffect } from 'react';

interface BeamNode { rx: number; ry: number; }
interface BeamOpts {
  nodes: BeamNode[];
  links?: number;
  spawnEvery: number;
  spawnJitter: number;
}

interface Beam {
  a: number; b: number;
  ax: number; ay: number; bx: number; by: number;
  bolt: {x:number;y:number}[];
  life: number; dur: number; flick: number;
}

export function useBeamFieldCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  opts: BeamOpts
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0, H = 0;
    function resize() {
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width  = W;
      canvas!.height = H;
    }
    resize();
    window.addEventListener('resize', resize);

    const NODES = opts.nodes;
    const nodeGlow = NODES.map(() => 0);

    function isLight() { return document.documentElement.dataset.theme !== 'dark'; }

    function buildPairs(nodes: BeamNode[], k: number): [number,number][] {
      const pairs: [number,number][] = [], seen: Record<string,1> = {};
      for (let i = 0; i < nodes.length; i++) {
        const d: [number,number][] = [];
        for (let j = 0; j < nodes.length; j++) {
          if (j === i) continue;
          const dx = nodes[i].rx - nodes[j].rx, dy = nodes[i].ry - nodes[j].ry;
          d.push([dx*dx + dy*dy, j]);
        }
        d.sort((a,b) => a[0]-b[0]);
        for (let m = 0; m < k && m < d.length; m++) {
          const j2 = d[m][1];
          const a = Math.min(i,j2), b = Math.max(i,j2), key = `${a}-${b}`;
          if (!seen[key]) { seen[key] = 1; pairs.push([a,b]); }
        }
      }
      return pairs;
    }
    const PAIRS = buildPairs(NODES, opts.links ?? 2);

    function genBolt(ax:number,ay:number,bx:number,by:number) {
      const pts: {x:number;y:number}[] = [{x:ax,y:ay}];
      const dx=bx-ax, dy=by-ay, len=Math.hypot(dx,dy)||1;
      const nx=-dy/len, ny=dx/len;
      const amp = Math.min(42, len*0.16);
      const segs = 7 + Math.floor(Math.random()*4);
      for (let i=1;i<segs;i++) {
        const t=i/segs, taper=Math.sin(t*Math.PI);
        const off=(Math.random()*2-1)*amp*taper;
        pts.push({x:ax+dx*t+nx*off, y:ay+dy*t+ny*off});
      }
      pts.push({x:bx,y:by});
      return pts;
    }

    const beams: Beam[] = [];
    function spawn() {
      if (!PAIRS.length) return;
      const pr = PAIRS[Math.floor(Math.random()*PAIRS.length)];
      const a = NODES[pr[0]], b = NODES[pr[1]];
      const ax=a.rx*W, ay=a.ry*H, bx=b.rx*W, by=b.ry*H;
      beams.push({a:pr[0],b:pr[1],ax,ay,bx,by,bolt:genBolt(ax,ay,bx,by),life:0,dur:52+Math.random()*52,flick:0});
      nodeGlow[pr[0]] = 1;
    }

    function poly(pts:{x:number;y:number}[], color:string, width:number) {
      ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y);
      for (let i=1;i<pts.length;i++) ctx.lineTo(pts[i].x,pts[i].y);
      ctx.strokeStyle=color; ctx.lineWidth=width; ctx.lineJoin='round'; ctx.lineCap='round'; ctx.stroke();
    }

    function drawStaticAndNodes(light:boolean) {
      ctx.lineWidth=1;
      ctx.strokeStyle = light ? 'rgba(32,101,132,0.10)' : 'rgba(64,156,188,0.10)';
      PAIRS.forEach(pr => {
        const a=NODES[pr[0]], b=NODES[pr[1]];
        ctx.beginPath(); ctx.moveTo(a.rx*W,a.ry*H); ctx.lineTo(b.rx*W,b.ry*H); ctx.stroke();
      });
      NODES.forEach((n,i) => {
        const x=n.rx*W, y=n.ry*H;
        if (nodeGlow[i]>0) {
          const g=ctx.createRadialGradient(x,y,0,x,y,20);
          g.addColorStop(0,`rgba(${light?'64,156,188':'107,192,221'},${nodeGlow[i]*0.8})`);
          g.addColorStop(1,'rgba(64,156,188,0)');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,20,0,Math.PI*2); ctx.fill();
          nodeGlow[i] = Math.max(0, nodeGlow[i]-0.015);
        }
        ctx.beginPath(); ctx.arc(x,y,2.6,0,Math.PI*2);
        ctx.fillStyle = light ? 'rgba(32,101,132,0.55)' : 'rgba(120,200,225,0.6)';
        ctx.fill();
      });
    }

    let animId = 0, spawnTimer = 0;
    function frame() {
      ctx.clearRect(0,0,W,H);
      const light = isLight();
      drawStaticAndNodes(light);

      spawnTimer--;
      if (spawnTimer<=0) { spawn(); spawnTimer=opts.spawnEvery+Math.random()*opts.spawnJitter; }

      const glowCol = light ? '64,156,188' : '107,192,221';
      const coreCol = light ? '205,240,252' : '235,250,255';

      for (let k=beams.length-1;k>=0;k--) {
        const bm=beams[k];
        bm.life++; bm.flick++;
        if (bm.flick>10) { bm.bolt=genBolt(bm.ax,bm.ay,bm.bx,bm.by); bm.flick=0; }
        const p=bm.life/bm.dur;
        if (p>=1) { beams.splice(k,1); nodeGlow[bm.b]=1; continue; }
        const env = Math.max(0, Math.min(1, p<0.16 ? p/0.16 : (1-(p-0.16)/0.84)));
        poly(bm.bolt,`rgba(${glowCol},${env*0.28})`,7);
        poly(bm.bolt,`rgba(${glowCol},${env*0.55})`,3);
        poly(bm.bolt,`rgba(${coreCol},${env*0.92})`,1.3);
        const hx=bm.ax+(bm.bx-bm.ax)*p, hy=bm.ay+(bm.by-bm.ay)*p;
        const hg=ctx.createRadialGradient(hx,hy,0,hx,hy,8);
        hg.addColorStop(0,`rgba(${coreCol},${env})`);
        hg.addColorStop(1,`rgba(${glowCol},0)`);
        ctx.fillStyle=hg; ctx.beginPath(); ctx.arc(hx,hy,8,0,Math.PI*2); ctx.fill();
      }
      animId=requestAnimationFrame(frame);
    }

    if (prefersReduced) { drawStaticAndNodes(isLight()); return; }

    let started = false;
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (!started) { started=true; animId=requestAnimationFrame(frame); }
      } else {
        if (animId) { cancelAnimationFrame(animId); animId=0; started=false; }
      }
    }, { threshold: 0.05 });
    io.observe(canvas);

    return () => {
      io.disconnect();
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);
}
