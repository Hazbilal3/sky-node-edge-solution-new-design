import { useEffect } from 'react';
import type { RefObject } from 'react';

export function useConstructionCanvas(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W: number, H: number, ground: number, maxH: number;
    let towers: { x: number; w: number; floorH: number; floors: number; top: number; delay: number }[] = [];
    let cranes: { x: number; base: number; mastTop: number; span: number; back: number; phase: number; speed: number }[] = [];
    let raf: number = 0;
    let start: number | null = null;

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const LINE = '64,156,188';      // teal accent
    const ACCENT = '107,192,221';   // sky

    function rnd(a: number, b: number) {
      return a + Math.random() * (b - a);
    }
    function ease(p: number) {
      return 1 - Math.pow(1 - p, 3);
    } // easeOutCubic

    function build() {
      if (!canvas) return;
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      ground = H - 1;
      const unit = Math.max(52, Math.min(96, W / 14));
      const floorH = unit * 0.52;
      maxH = Math.min(H * 0.66, 360);
      const maxFloors = Math.max(3, Math.floor(maxH / floorH));
      const n = Math.ceil(W / unit) + 1;
      towers = [];
      for (let i = 0; i < n; i++) {
        const floors = Math.round(rnd(3, maxFloors));
        towers.push({
          x: i * unit,
          w: unit,
          floorH: floorH,
          floors: floors,
          top: ground - floors * floorH,
          delay: i * 0.45 + rnd(0, 0.3), // staggered build start (seconds)
        });
      }
      // mount 1–2 tower cranes on the tallest frames
      const order = towers.slice().sort((a, b) => a.top - b.top);
      cranes = [];
      const nCranes = W > 900 ? 2 : 1;
      for (let c = 0; c < nCranes && c < order.length; c++) {
        const t = order[c];
        cranes.push({
          x: t.x + t.w,
          base: ground,
          mastTop: Math.max(t.top - rnd(48, 80), maxH * 0.12),
          span: unit * rnd(2.4, 3.2),
          back: unit * rnd(0.9, 1.2),
          phase: rnd(0, Math.PI * 2),
          speed: rnd(0.5, 0.75),
        });
      }
    }

    function line(x1: number, y1: number, x2: number, y2: number, a: number, w?: number) {
      if (!ctx) return;
      ctx.strokeStyle = `rgba(${LINE},${a})`;
      ctx.lineWidth = w || 1.2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    function joint(x: number, y: number, a: number) {
      if (!ctx) return;
      ctx.fillStyle = `rgba(${ACCENT},${a})`;
      ctx.beginPath();
      ctx.arc(x, y, 1.7, 0, Math.PI * 2);
      ctx.fill();
    }

    function draw(ts: number) {
      if (!ctx) return;
      if (start === null) start = ts;
      const el = (ts - start) / 1000; // seconds elapsed
      ctx.clearRect(0, 0, W, H);

      // ── steel frames rise floor by floor ──
      for (let i = 0; i < towers.length; i++) {
        const t = towers[i];
        const p = ease(Math.max(0, Math.min(1, (el - t.delay) / 3.2)));
        const builtH = t.floors * t.floorH * p;
        const buildY = ground - builtH;
        const xL = t.x, xR = t.x + t.w;
        line(xL, ground, xL, buildY, 0.20, 1.3);   // verticals
        line(xR, ground, xR, buildY, 0.20, 1.3);
        for (let f = 0; f <= t.floors; f++) {
          const fy = ground - f * t.floorH;
          if (fy < buildY - 0.5) break;             // not yet built this high
          line(xL, fy, xR, fy, 0.16, 1);            // floor beam
          joint(xL, fy, 0.5);
          joint(xR, fy, 0.5);   // bolted joints
          if (f < t.floors) {                        // diagonal cross-brace
            const fy2 = ground - (f + 1) * t.floorH;
            if (fy2 >= buildY - 0.5) {
              if (f % 2 === 0) line(xL, fy, xR, fy2, 0.10, 1);
              else line(xR, fy, xL, fy2, 0.10, 1);
            }
          }
        }
        if (p < 1) line(xL, buildY, xR, buildY, 0.34, 1.4); // active build edge
      }

      // ── tower cranes ──
      for (let c = 0; c < cranes.length; c++) {
        const cr = cranes[c];
        const cp = ease(Math.max(0, Math.min(1, (el - 0.4) / 2.4)));
        const mastTop = cr.base - (cr.base - cr.mastTop) * cp;
        line(cr.x, cr.base, cr.x, mastTop, 0.22, 1.5);       // mast
        for (let m = cr.base - 18; m > mastTop + 6; m -= 18) { // lattice rungs
          line(cr.x - 3, m, cr.x + 3, m - 9, 0.12, 1);
          line(cr.x + 3, m, cr.x - 3, m - 9, 0.12, 1);
        }
        if (cp > 0.6) {
          const ja = (cp - 0.6) / 0.4;                          // jib fade-in
          const jf = cr.x + cr.span, jb = cr.x - cr.back;
          line(cr.x, mastTop, jf, mastTop, 0.22 * ja, 1.4);  // jib
          line(cr.x, mastTop, jb, mastTop, 0.20 * ja, 1.4);  // counter-jib
          const apex = mastTop - 22;                            // A-frame + tie bars
          line(cr.x, mastTop, cr.x, apex, 0.16 * ja, 1);
          line(cr.x, apex, jf, mastTop, 0.10 * ja, 1);
          line(cr.x, apex, jb, mastTop, 0.10 * ja, 1);
          ctx.fillStyle = `rgba(${LINE},${0.18 * ja})`; // counterweight
          ctx.fillRect(jb - 2, mastTop, 10, 12);
          // trolley + hoisted load — perpetual, gentle work motion
          const tr = 0.5 + 0.45 * Math.sin(el * cr.speed + cr.phase);
          const tx = cr.x + (cr.span * 0.25) + (cr.span * 0.6) * tr;
          const reach = cr.base - mastTop;
          const hookY = mastTop + reach * (0.35 + 0.25 * (0.5 + 0.5 * Math.sin(el * cr.speed * 1.3 + cr.phase)));
          line(tx, mastTop, tx, hookY, 0.22 * ja, 1);         // hoist line
          ctx.fillStyle = `rgba(${ACCENT},${0.5 * ja})`;
          ctx.fillRect(tx - 7, hookY, 14, 3);                 // load beam
        }
      }

      raf = requestAnimationFrame(draw);
    }

    build();
    function handleResize() {
      build();
      start = null;
    }
    window.addEventListener('resize', handleResize);

    if (reduce) {
      start = performance.now() - 100000; // render a settled, completed frame
      draw(performance.now());
      if (raf) cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}
