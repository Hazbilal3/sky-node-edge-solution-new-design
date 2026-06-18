import { useEffect } from 'react';

interface WaveConfig {
  receiverCount: number;
  waveCount: number;
  waveSpeed: number;
  centered?: boolean; // if true, use center origin; else use TX position
}

export function useBroadcastWaveCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  cfg: WaveConfig
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W=0, H=0, dpr=1;
    let animId: number;

    interface Receiver { x:number; y:number; phase:number; glow:number; }
    interface Wave { r:number; maxR:number; alpha:number; }

    let receivers: Receiver[] = [];
    let waves: Wave[] = [];
    let TX = {x:0,y:0};

    function build() {
      W=canvas!.clientWidth; H=canvas!.clientHeight; if(!W||!H) return;
      dpr=Math.min(window.devicePixelRatio||1,2);
      canvas!.width=W*dpr; canvas!.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);

      TX = cfg.centered ? {x:W/2,y:H/2} : {x:W*0.74,y:H*0.46};

      receivers=[];
      for(let i=0;i<cfg.receiverCount;i++) {
        receivers.push({ x:Math.random()*W, y:Math.random()*H, phase:Math.random()*Math.PI*2, glow:0 });
      }

      const maxR=Math.sqrt(W*W+H*H);
      waves=[];
      for(let i=0;i<cfg.waveCount;i++) {
        waves.push({ r:(maxR/cfg.waveCount)*i, maxR, alpha:0 });
      }
    }

    function isDark() { return document.documentElement.getAttribute('data-theme')==='dark'; }

    function frame(_time: number) {
      if(!W||!H){ animId=requestAnimationFrame(frame); return; }
      ctx.clearRect(0,0,W,H);
      const dark=isDark();
      const waveCol = dark ? 'rgba(107,192,221,' : 'rgba(28,106,137,';
      const rxCol   = dark ? 'rgba(91,228,155,'  : 'rgba(21,153,79,';
      const txCol   = dark ? 'rgba(167,139,250,' : 'rgba(124,58,237,';

      const maxR=Math.sqrt(W*W+H*H);

      if(!reduce) {
        waves.forEach(w => {
          w.r+=cfg.waveSpeed;
          if(w.r>maxR) w.r=0;
          const fade = 1 - w.r/maxR;
          ctx.strokeStyle=waveCol+(fade*0.35)+')';
          ctx.lineWidth=1.5;
          ctx.beginPath(); ctx.arc(TX.x,TX.y,w.r,0,Math.PI*2); ctx.stroke();
        });
      }

      // Draw receivers
      receivers.forEach(rx => {
        // Check if wave near receiver
        let lit=false;
        waves.forEach(w => {
          const d=Math.sqrt((rx.x-TX.x)**2+(rx.y-TX.y)**2);
          if(Math.abs(w.r-d)<12) lit=true;
        });
        if(lit) rx.glow=1;
        rx.glow*=0.93;

        const a=0.25+rx.glow*0.75;
        const r=2.5+rx.glow*3;
        const grd=ctx.createRadialGradient(rx.x,rx.y,0,rx.x,rx.y,r*3);
        grd.addColorStop(0,rxCol+(a*0.4)+')'); grd.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=grd; ctx.beginPath(); ctx.arc(rx.x,rx.y,r*3,0,Math.PI*2); ctx.fill();
        ctx.fillStyle=rxCol+a+')'; ctx.beginPath(); ctx.arc(rx.x,rx.y,r,0,Math.PI*2); ctx.fill();
      });

      // Draw TX tower
      const tsize=7;
      const grd=ctx.createRadialGradient(TX.x,TX.y,0,TX.x,TX.y,tsize*4);
      grd.addColorStop(0,txCol+'0.35)'); grd.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=grd; ctx.beginPath(); ctx.arc(TX.x,TX.y,tsize*4,0,Math.PI*2); ctx.fill();
      ctx.fillStyle=txCol+'0.95)'; ctx.beginPath(); ctx.arc(TX.x,TX.y,tsize,0,Math.PI*2); ctx.fill();

      animId=requestAnimationFrame(frame);
    }

    const ro=new ResizeObserver(()=>build());
    ro.observe(canvas);
    build();
    animId=requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);
}
