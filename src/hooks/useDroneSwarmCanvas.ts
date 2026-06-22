import { useEffect } from 'react';
import type { RefObject } from 'react';

interface DroneSwarmOptions {
  links?: number;
  count: number;
  speed: number;
  nodes: { rx: number; ry: number }[];
}

export function useDroneSwarmCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  options: DroneSwarmOptions
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W: number, H: number;
    let animId: number | null = null;

    function resize() {
      if (!canvas) return;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    }
    resize();
    window.addEventListener('resize', resize);

    function isLight() {
      return document.documentElement.getAttribute('data-theme') === 'light';
    }

    function amber(a: number, light: boolean) {
      return `rgba(${light ? '180,83,9' : '251,191,36'},${a})`;
    }

    function sky(a: number, light: boolean) {
      return `rgba(${light ? '28,106,137' : '107,192,221'},${a})`;
    }

    const NODES = options.nodes.map((n) => ({ rx: n.rx, ry: n.ry, glow: 0 }));

    function nx(i: number) {
      return NODES[i].rx * W;
    }
    function ny(i: number) {
      return NODES[i].ry * H;
    }

    function buildPairs(nodes: typeof NODES, k: number) {
      const pairs: [number, number][] = [];
      const seen: Record<string, number> = {};
      for (let i = 0; i < nodes.length; i++) {
        const d: [number, number][] = [];
        for (let j = 0; j < nodes.length; j++) {
          if (j !== i) {
            const dx = nodes[i].rx - nodes[j].rx;
            const dy = nodes[i].ry - nodes[j].ry;
            d.push([dx * dx + dy * dy, j]);
          }
        }
        d.sort((a, b) => a[0] - b[0]);
        for (let m = 0; m < k && m < d.length; m++) {
          const j2 = d[m][1];
          const a = Math.min(i, j2);
          const b = Math.max(i, j2);
          const key = `${a}-${b}`;
          if (!seen[key]) {
            seen[key] = 1;
            pairs.push([a, b]);
          }
        }
      }
      return pairs;
    }

    const PAIRS = buildPairs(NODES, options.links || 2);
    const pulses: { x: number; y: number; r: number; life: number }[] = [];

    function makeDrone() {
      const s = Math.floor(Math.random() * NODES.length);
      const t = Math.floor(Math.random() * NODES.length);
      return {
        x: NODES[s].rx * W,
        y: NODES[s].ry * H,
        vx: 0,
        vy: 0,
        target: t,
        phase: Math.random() * 6.283,
        speed: options.speed * (0.7 + Math.random() * 0.6),
        trail: [] as { x: number; y: number }[],
        kind: Math.random() < 0.2 ? 'sense' : 'drone',
      };
    }

    const drones: ReturnType<typeof makeDrone>[] = [];
    for (let i = 0; i < options.count; i++) {
      drones.push(makeDrone());
    }

    function step(dr: ReturnType<typeof makeDrone>) {
      const tx = NODES[dr.target].rx * W;
      const ty = NODES[dr.target].ry * H;
      const dx = tx - dr.x;
      const dy = ty - dr.y;
      const dist = Math.hypot(dx, dy) || 1;
      let ax = (dx / dist) * dr.speed;
      let ay = (dy / dist) * dr.speed;

      const wob = Math.sin(dr.phase + performance.now() * 0.0006) * dr.speed * 0.6 * Math.min(1, dist / 150);
      ax += (-dy / dist) * wob;
      ay += (dx / dist) * wob;

      dr.vx += (ax - dr.vx) * 0.08;
      dr.vy += (ay - dr.vy) * 0.08;
      dr.x += dr.vx;
      dr.y += dr.vy;
      dr.trail.push({ x: dr.x, y: dr.y });
      if (dr.trail.length > 15) dr.trail.shift();

      if (dist < 14) {
        NODES[dr.target].glow = 1;
        pulses.push({ x: tx, y: ty, r: 4, life: 1 });
        let nt;
        do {
          nt = Math.floor(Math.random() * NODES.length);
        } while (nt === dr.target && NODES.length > 1);
        dr.target = nt;
      }
    }

    function drawStatic(light: boolean) {
      if (!ctx) return;
      ctx.lineWidth = 1;
      ctx.strokeStyle = light ? 'rgba(32,101,132,0.08)' : 'rgba(64,156,188,0.09)';
      PAIRS.forEach((pr) => {
        ctx.beginPath();
        ctx.moveTo(nx(pr[0]), ny(pr[0]));
        ctx.lineTo(nx(pr[1]), ny(pr[1]));
        ctx.stroke();
      });
      NODES.forEach((n, i) => {
        const x = nx(i);
        const y = ny(i);
        if (n.glow > 0) {
          const g = ctx.createRadialGradient(x, y, 0, x, y, 22);
          g.addColorStop(0, amber(n.glow * 0.7, light));
          g.addColorStop(1, amber(0, light));
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, 22, 0, Math.PI * 2);
          ctx.fill();
          n.glow -= 0.02;
          if (n.glow < 0) n.glow = 0;
        }
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = light ? 'rgba(32,101,132,0.45)' : 'rgba(120,200,225,0.5)';
        ctx.fill();
      });
    }

    function drawDrone(dr: ReturnType<typeof makeDrone>, light: boolean) {
      if (!ctx) return;
      const col = dr.kind === 'sense' ? sky : amber;
      for (let i = 1; i < dr.trail.length; i++) {
        const a = (i / dr.trail.length) * 0.5;
        ctx.strokeStyle = col(a, light);
        ctx.lineWidth = (i / dr.trail.length) * 1.8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(dr.trail[i - 1].x, dr.trail[i - 1].y);
        ctx.lineTo(dr.trail[i].x, dr.trail[i].y);
        ctx.stroke();
      }
      const hg = ctx.createRadialGradient(dr.x, dr.y, 0, dr.x, dr.y, 7);
      hg.addColorStop(0, col(0.55, light));
      hg.addColorStop(1, col(0, light));
      ctx.fillStyle = hg;
      ctx.beginPath();
      ctx.arc(dr.x, dr.y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(dr.x, dr.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = light ? col(0.95, light) : 'rgba(255,255,255,0.92)';
      ctx.fill();
    }

    function frame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      const light = isLight();
      drawStatic(light);
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k];
        p.r += 0.9;
        p.life -= 0.02;
        if (p.life <= 0) {
          pulses.splice(k, 1);
          continue;
        }
        ctx.strokeStyle = amber(p.life * 0.5, light);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.stroke();
      }
      drones.forEach((dr) => {
        step(dr);
        drawDrone(dr, light);
      });
      animId = requestAnimationFrame(frame);
    }

    if (prefersReduced) {
      const light = isLight();
      drawStatic(light);
      drones.forEach((dr) => {
        dr.trail = [{ x: dr.x, y: dr.y }];
        drawDrone(dr, light);
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!animId) animId = requestAnimationFrame(frame);
        } else {
          if (animId) {
            cancelAnimationFrame(animId);
            animId = null;
          }
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [options.links, options.count, options.speed]); // intentionally omitting nodes to avoid unnecessary re-renders if static
}
