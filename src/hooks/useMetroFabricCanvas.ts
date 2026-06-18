import { useEffect } from 'react';

export function useMetroFabricCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = 480, H = 560;
    canvas.width = W; canvas.height = H;

    const TEAL = 'rgba(64,156,188,';
    const GREEN = 'rgba(91,228,155,';
    const VIOLET = 'rgba(167,139,250,';

    // fabric nodes
    const NODES = [
      {x:240,y:80, label:'Cloud GW',  type:'cloud'},
      {x:380,y:80, label:'Cloud GW2', type:'cloud'},
      {x:80, y:200,label:'Node NYC-1', type:'fabric'},
      {x:200,y:200,label:'Node NYC-2', type:'fabric'},
      {x:340,y:200,label:'Node MIA-1', type:'fabric'},
      {x:460,y:200,label:'Node CHI-1', type:'fabric'},
      {x:120,y:340,label:'Office A',   type:'office'},
      {x:260,y:340,label:'Office B',   type:'office'},
      {x:400,y:340,label:'Office C',   type:'office'},
      {x:180,y:460,label:'End User',   type:'end'},
      {x:320,y:460,label:'End User2',  type:'end'},
    ];

    const CONNECTIONS = [
      [0,2],[0,3],[1,4],[1,5],[2,6],[3,7],[4,8],[5,8],[6,9],[7,9],[7,10],[8,10]
    ];

    interface Pulse { conn:number; t:number; sp:number; c:string; dir:number; }
    const pulses: Pulse[] = [];

    function spawnPulse() {
      const conn = Math.floor(Math.random()*CONNECTIONS.length);
      const colors = [TEAL+'0.9)', GREEN+'0.9)', VIOLET+'0.9)'];
      pulses.push({ conn, t:0, sp:0.006+Math.random()*0.008, c:colors[Math.floor(Math.random()*3)], dir:Math.random()<0.5?1:-1 });
    }

    for(let i=0;i<12;i++) spawnPulse();

    let animId: number;
    function frame() {
      ctx.clearRect(0,0,W,H);

      // Background
      const bg=ctx.createLinearGradient(0,0,0,H);
      bg.addColorStop(0,'#08161E'); bg.addColorStop(1,'#0B1D28');
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

      // Draw connections
      CONNECTIONS.forEach(([a,b]) => {
        const na=NODES[a],nb=NODES[b];
        ctx.strokeStyle=TEAL+'0.18)'; ctx.lineWidth=1;
        ctx.setLineDash([4,6]);
        ctx.beginPath(); ctx.moveTo(na.x,na.y); ctx.lineTo(nb.x,nb.y); ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw pulses
      for(let i=pulses.length-1;i>=0;i--) {
        const pk=pulses[i];
        const [ai,bi]=CONNECTIONS[pk.conn];
        const na=NODES[ai],nb=NODES[bi];
        pk.t+=pk.sp*pk.dir;
        if(pk.t>1||pk.t<0){ pk.t=pk.dir>0?0:1; }
        const px=na.x+(nb.x-na.x)*pk.t, py=na.y+(nb.y-na.y)*pk.t;
        const tail=0.08;
        const tt=Math.max(0,Math.min(1,pk.t-tail*pk.dir));
        const tx2=na.x+(nb.x-na.x)*tt, ty2=na.y+(nb.y-na.y)*tt;
        const grd=ctx.createLinearGradient(tx2,ty2,px,py);
        grd.addColorStop(0,pk.c.replace('0.9)','0)')); grd.addColorStop(1,pk.c);
        ctx.strokeStyle=grd; ctx.lineWidth=2;
        ctx.beginPath(); ctx.moveTo(tx2,ty2); ctx.lineTo(px,py); ctx.stroke();
        ctx.fillStyle=pk.c; ctx.beginPath(); ctx.arc(px,py,3,0,Math.PI*2); ctx.fill();
      }

      // Randomly spawn
      if(Math.random()<0.02) spawnPulse();
      if(pulses.length>24) pulses.shift();

      // Draw nodes
      NODES.forEach((n) => {
        let col=TEAL+'0.85)';
        let size=6;
        if(n.type==='cloud'){ col=GREEN+'0.9)'; size=8; }
        if(n.type==='office'){ col=VIOLET+'0.85)'; size=5; }
        if(n.type==='end'){ col=TEAL+'0.6)'; size=4; }

        // Glow
        const grd=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,size*3);
        grd.addColorStop(0,col.replace('0.85)','0.18)').replace('0.9)','0.22)').replace('0.6)','0.12)'));
        grd.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=grd; ctx.beginPath(); ctx.arc(n.x,n.y,size*3,0,Math.PI*2); ctx.fill();

        ctx.fillStyle=col; ctx.beginPath(); ctx.arc(n.x,n.y,size,0,Math.PI*2); ctx.fill();
      });

      animId=requestAnimationFrame(frame);
    }

    animId=requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, []);
}
