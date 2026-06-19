import { useEffect } from 'react';

export function useMetroFabricCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = 480, H = 560;
    canvas.width = W; canvas.height = H;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function drawCloud(cx: number, cy: number, glowAlpha: number) {
      const bumps = [{dx:-11,dy:5,r:9},{dx:0,dy:-3,r:11},{dx:12,dy:4,r:8}];
      if (glowAlpha > 0) {
        const gr = ctx.createRadialGradient(cx,cy,0,cx,cy,26);
        gr.addColorStop(0,`rgba(91,228,155,${glowAlpha*0.3})`);
        gr.addColorStop(1,'rgba(91,228,155,0)');
        ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(cx,cy,26,0,Math.PI*2); ctx.fill();
      }
      bumps.forEach(b => {
        ctx.beginPath(); ctx.arc(cx+b.dx, cy+b.dy, b.r, 0, Math.PI*2);
        ctx.fillStyle='rgba(32,101,132,0.09)'; ctx.fill();
        ctx.strokeStyle='rgba(64,156,188,0.25)'; ctx.lineWidth=0.8; ctx.stroke();
      });
      ctx.fillStyle='rgba(32,101,132,0.38)';
      ctx.font='8px "Satoshi",system-ui,sans-serif'; ctx.textAlign='center';
      ctx.fillText('CLOUD', cx, cy+24);
    }

    function drawOffice(cx: number, cy: number, glowAlpha: number) {
      if (glowAlpha > 0) {
        const gr = ctx.createRadialGradient(cx,cy-11,0,cx,cy-11,22);
        gr.addColorStop(0,`rgba(167,139,250,${glowAlpha*0.3})`);
        gr.addColorStop(1,'rgba(167,139,250,0)');
        ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(cx,cy-11,22,0,Math.PI*2); ctx.fill();
      }
      const bw=20, bh=22, bx=cx-10, by=cy-bh;
      ctx.fillStyle='rgba(32,101,132,0.09)'; ctx.strokeStyle='rgba(64,156,188,0.25)'; ctx.lineWidth=0.8;
      ctx.fillRect(bx,by,bw,bh); ctx.strokeRect(bx,by,bw,bh);
      ctx.fillStyle='rgba(64,156,188,0.20)';
      for (let r=0;r<3;r++) for (let c=0;c<2;c++) ctx.fillRect(bx+3+c*9, by+3+r*6, 4, 3);
      ctx.fillStyle='rgba(32,101,132,0.38)';
      ctx.font='8px "Satoshi",system-ui,sans-serif'; ctx.textAlign='center';
      ctx.fillText('PRIVATE', cx, cy+10);
    }

    const nodeData = [
      {rx:0.18,ry:0.20,label:'BK-1'},{rx:0.44,ry:0.15,label:'MN-3'},{rx:0.74,ry:0.20,label:'QN-2'},
      {rx:0.28,ry:0.46,label:'MN-7'},{rx:0.60,ry:0.44,label:'MN-9'},{rx:0.16,ry:0.70,label:'BK-4'},
      {rx:0.84,ry:0.60,label:'QN-5'},{rx:0.50,ry:0.73,label:'BK-6'}
    ];
    const nodes = nodeData.map(d => ({x:d.rx*W, y:d.ry*H, label:d.label, glow:0}));
    const clouds = [{x:W*0.27,y:24,glow:0},{x:W*0.73,y:24,glow:0}];
    const offices = [{x:W*0.16,y:H-18,glow:0},{x:W*0.50,y:H-18,glow:0},{x:W*0.82,y:H-18,glow:0}];

    const conns = [[0,1],[1,2],[0,3],[1,3],[1,4],[2,4],[3,4],[2,6],[4,6],[3,5],[5,7],[4,7]];
    const pulses = conns.map((c,i) => ({conn:c, t:i/conns.length, speed:0.0022+(i%4)*0.0007}));

    const uplinks = [{ni:0,ci:0},{ni:1,ci:0},{ni:2,ci:1}];
    const upPulses = uplinks.map((u,i) => ({u, t:i/uplinks.length*0.6, speed:0.003}));

    const downlinks = [{ni:5,oi:0},{ni:7,oi:1},{ni:6,oi:2}];
    const downPulses = downlinks.map((d,i) => ({d, t:i/downlinks.length*0.6, speed:0.003}));

    function dashedLine(x1:number,y1:number,x2:number,y2:number,color:string) {
      ctx.save(); ctx.setLineDash([4,5]); ctx.beginPath();
      ctx.moveTo(x1,y1); ctx.lineTo(x2,y2);
      ctx.strokeStyle=color; ctx.lineWidth=1.1; ctx.stroke();
      ctx.setLineDash([]); ctx.restore();
    }

    let animId: number;

    function drawFrame() {
      ctx.clearRect(0,0,W,H);

      // Fabric-to-fabric connections
      conns.forEach(c => {
        const a=nodes[c[0]], b=nodes[c[1]];
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
        ctx.strokeStyle='rgba(32,101,132,0.13)'; ctx.lineWidth=1.4; ctx.stroke();
      });

      // Cloud uplinks (dashed green)
      uplinks.forEach(u => {
        const n=nodes[u.ni], c=clouds[u.ci];
        dashedLine(n.x,n.y,c.x,c.y,'rgba(91,228,155,0.20)');
      });

      // Private downlinks (dashed violet)
      downlinks.forEach(d => {
        const n=nodes[d.ni], o=offices[d.oi];
        dashedLine(n.x,n.y,o.x,o.y,'rgba(167,139,250,0.20)');
      });

      if (!prefersReduced) {
        // Fabric pulses (teal)
        pulses.forEach(p => {
          p.t += p.speed; if (p.t>=1){p.t=0; nodes[p.conn[1]].glow=1;}
          const a=nodes[p.conn[0]], b=nodes[p.conn[1]];
          const x=a.x+(b.x-a.x)*p.t, y=a.y+(b.y-a.y)*p.t;
          const al=p.t<0.1?p.t/0.1:p.t>0.9?(1-p.t)/0.1:1;
          const grd=ctx.createRadialGradient(x,y,0,x,y,9);
          grd.addColorStop(0,`rgba(64,156,188,${al*0.3})`); grd.addColorStop(1,'rgba(64,156,188,0)');
          ctx.fillStyle=grd; ctx.beginPath(); ctx.arc(x,y,9,0,Math.PI*2); ctx.fill();
          ctx.beginPath(); ctx.arc(x,y,2.8,0,Math.PI*2); ctx.fillStyle=`rgba(64,156,188,${al})`; ctx.fill();
        });

        // Uplink pulses (green, node→cloud)
        upPulses.forEach(p => {
          p.t += p.speed; if (p.t>=1){p.t=0; clouds[p.u.ci].glow=1;}
          const n=nodes[p.u.ni], c=clouds[p.u.ci];
          const x=n.x+(c.x-n.x)*p.t, y=n.y+(c.y-n.y)*p.t;
          const al=p.t<0.1?p.t/0.1:p.t>0.9?(1-p.t)/0.1:1;
          ctx.beginPath(); ctx.arc(x,y,2.8,0,Math.PI*2); ctx.fillStyle=`rgba(91,228,155,${al})`; ctx.fill();
        });

        // Downlink pulses (violet, node→office)
        downPulses.forEach(p => {
          p.t += p.speed; if (p.t>=1){p.t=0; offices[p.d.oi].glow=1;}
          const n=nodes[p.d.ni], o=offices[p.d.oi];
          const x=n.x+(o.x-n.x)*p.t, y=n.y+(o.y-n.y)*p.t;
          const al=p.t<0.1?p.t/0.1:p.t>0.9?(1-p.t)/0.1:1;
          ctx.beginPath(); ctx.arc(x,y,2.8,0,Math.PI*2); ctx.fillStyle=`rgba(167,139,250,${al})`; ctx.fill();
        });
      }

      // Draw clouds
      clouds.forEach(c => {
        if (c.glow>0) c.glow=Math.max(0,c.glow-0.018);
        drawCloud(c.x,c.y,c.glow);
      });

      // Draw offices
      offices.forEach(o => {
        if (o.glow>0) o.glow=Math.max(0,o.glow-0.018);
        drawOffice(o.x,o.y,o.glow);
      });

      // Draw fabric nodes
      nodes.forEach(n => {
        if (n.glow>0) {
          n.glow=Math.max(0,n.glow-0.016);
          const gr=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,22);
          gr.addColorStop(0,`rgba(107,192,221,${n.glow*0.38})`);
          gr.addColorStop(1,'rgba(107,192,221,0)');
          ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(n.x,n.y,22,0,Math.PI*2); ctx.fill();
        }
        ctx.beginPath(); ctx.arc(n.x,n.y,6,0,Math.PI*2);
        ctx.fillStyle='rgba(32,101,132,0.10)'; ctx.fill();
        ctx.strokeStyle='rgba(107,192,221,0.55)'; ctx.lineWidth=1.2; ctx.stroke();
        ctx.beginPath(); ctx.arc(n.x,n.y,4.5,0,Math.PI*2);
        ctx.fillStyle='#206584'; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x,n.y,1.8,0,Math.PI*2);
        ctx.fillStyle='#fff'; ctx.fill();
        ctx.fillStyle='rgba(32,101,132,0.45)';
        ctx.font='9px "Satoshi",system-ui,sans-serif'; ctx.textAlign='center';
        ctx.fillText(n.label, n.x, n.y+17);
      });

      animId = requestAnimationFrame(drawFrame);
    }

    // Only animate when visible
    let started = false;
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (!started) { started=true; animId=requestAnimationFrame(drawFrame); }
      } else {
        if (animId) { cancelAnimationFrame(animId); animId=0; started=false; }
      }
    }, {threshold:0.1});
    io.observe(canvas);

    return () => {
      io.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);
}
