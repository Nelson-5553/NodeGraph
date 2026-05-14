import { useEffect, useRef, useCallback, useState } from "react";
import * as d3 from "d3";

// ─── Default color palette por group ───────────────────────────────────────
const DEFAULT_COLORS = [
  "#a78bfa", "#34d399", "#60a5fa", "#f97316",
  "#f472b6", "#facc15", "#4ade80", "#e879f9",
];

// ─── Utilidades de coordenadas ──────────────────────────────────────────────
function toScreen(x, y, scale, offsetX, offsetY, dpr) {
  return [
    (x * scale + offsetX) * dpr,
    (y * scale + offsetY) * dpr,
  ];
}

function toSim(px, py, scale, offsetX, offsetY, dpr) {
  return [
    (px / dpr - offsetX) / scale,
    (py / dpr - offsetY) / scale,
  ];
}

// ─── Componente principal ───────────────────────────────────────────────────
export default function NodeGraph({
  nodes: rawNodes = [],
  links: rawLinks = [],
  backgroundColor = "#0d0d0d",
  viewGuide = true,
  colors = DEFAULT_COLORS,
  width = 800,
  height = 580,
  repulsion = 120,
  linkDistance = 55,
}) {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);
  const simRef       = useRef(null);
  const stateRef     = useRef({
    scale: 1, offsetX: 0, offsetY: 0,
    draggingNode: null, panStart: null, panOrig: null,
    hoveredNode: null, nodes: [], links: [],
  });
  const tooltipRef   = useRef(null);
  const [repulsionVal, setRepulsionVal]     = useState(repulsion);
  const [linkStrengthVal, setLinkStrengthVal] = useState(4);

  // ── Calcular grado de un nodo ──────────────────────────────────────────
  const getDegree = useCallback((id, links) =>
    links.filter(l => l.source?.id === id || l.target?.id === id).length,
  []);

  const nodeRadius = useCallback((d, links) =>
    3 + Math.sqrt(getDegree(d.id, links)) * 1.8,
  [getDegree]);

  // ── Función de dibujo ──────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { scale, offsetX, offsetY, hoveredNode, nodes, links } = stateRef.current;
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    ctx.save();

    // Links
    links.forEach(l => {
      if (!l.source?.x) return;
      const [x1, y1] = toScreen(l.source.x, l.source.y, scale, offsetX, offsetY, dpr);
      const [x2, y2] = toScreen(l.target.x, l.target.y, scale, offsetX, offsetY, dpr);
      const isHov = hoveredNode &&
        (l.source.id === hoveredNode.id || l.target.id === hoveredNode.id);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = isHov ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.07)";
      ctx.lineWidth   = (isHov ? 1.2 : 0.6) * dpr;
      ctx.stroke();
    });

    // Nodos
    nodes.forEach(d => {
      if (d.x == null) return;
      const [sx, sy] = toScreen(d.x, d.y, scale, offsetX, offsetY, dpr);
      const r     = nodeRadius(d, links) * scale * dpr;
      const color = colors[d.group % colors.length] ?? "#60a5fa";
      const isHov = hoveredNode?.id === d.id;

      // Glow ring al hacer hover
      if (isHov) {
        ctx.beginPath();
        ctx.arc(sx, sy, r + 5 * dpr, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth   = 1.5 * dpr;
        ctx.globalAlpha = 0.45;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fillStyle   = isHov ? "#fff" : color;
      ctx.globalAlpha = isHov ? 1 : 0.82;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Etiqueta
      const deg = getDegree(d.id, links);
      if (isHov || (deg >= 5 && scale > 0.55)) {
        const fs = Math.round(10 * scale * dpr);
        ctx.font         = `${fs}px sans-serif`;
        ctx.fillStyle    = isHov ? "#fff" : "rgba(220,215,205,0.9)";
        ctx.textAlign    = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(d.id, sx, sy + r + 9 * scale * dpr);
      }
    });

    ctx.restore();
  }, [colors, nodeRadius, getDegree]);

  // ── Construir / reconstruir simulación ─────────────────────────────────
  const buildSim = useCallback((nodes, links, rep, ls) => {
    if (simRef.current) simRef.current.stop();

    simRef.current = d3.forceSimulation(nodes)
      .force("link",      d3.forceLink(links).id(d => d.id).distance(linkDistance).strength(ls / 10))
      .force("charge",    d3.forceManyBody().strength(-rep))
      .force("center",    d3.forceCenter(0, 0))
      .force("collision", d3.forceCollide(10))
      .alphaDecay(0.015)
      .on("tick", draw);
  }, [draw, linkDistance]);

  // ── Resize canvas ──────────────────────────────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    const { width } = container.getBoundingClientRect();
    canvas.width  = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width  = width + "px";
    canvas.style.height = height + "px";
  }, [height]);

  // ── Efecto principal: montar simulación y eventos ──────────────────────
  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Clonar datos para que D3 pueda mutar
    const nodes = rawNodes.map(d => ({ ...d }));
    const links = rawLinks.map(([s, t]) => ({ source: s, target: t }));
    stateRef.current.nodes = nodes;
    stateRef.current.links = links;

    resizeCanvas();

    // Centrar offset
    const { width } = container.getBoundingClientRect();
    stateRef.current.offsetX = width / 2;
    stateRef.current.offsetY = height / 2;

    buildSim(nodes, links, repulsionVal, linkStrengthVal);

    // ── Handlers de mouse ──────────────────────────────────────────────
    function getNodeAt(px, py) {
      const { scale, offsetX, offsetY, nodes, links } = stateRef.current;
      const dpr = window.devicePixelRatio || 1;
      const [sx, sy] = toSim(px * dpr, py * dpr, scale, offsetX, offsetY, dpr);
      return nodes.find(d => {
        if (d.x == null) return false;
        const dx = d.x - sx, dy = d.y - sy;
        const r = nodeRadius(d, links) + 4;
        return dx * dx + dy * dy < r * r;
      });
    }

    function onMouseDown(e) {
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left, py = e.clientY - rect.top;
      const n = getNodeAt(px, py);
      if (n) {
        stateRef.current.draggingNode = n;
        n.fx = n.x; n.fy = n.y;
        simRef.current?.alphaTarget(0.3).restart();
        container.style.cursor = "grabbing";
      } else {
        stateRef.current.panStart = { x: e.clientX, y: e.clientY };
        stateRef.current.panOrig  = { x: stateRef.current.offsetX, y: stateRef.current.offsetY };
        container.style.cursor = "grabbing";
      }
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left, py = e.clientY - rect.top;
      const s = stateRef.current;

      if (s.draggingNode) {
        const dpr = window.devicePixelRatio || 1;
        const [sx, sy] = toSim(px * dpr, py * dpr, s.scale, s.offsetX, s.offsetY, dpr);
        s.draggingNode.fx = sx;
        s.draggingNode.fy = sy;
        return;
      }
      if (s.panStart) {
        s.offsetX = s.panOrig.x + (e.clientX - s.panStart.x);
        s.offsetY = s.panOrig.y + (e.clientY - s.panStart.y);
        draw();
        return;
      }

      const n = getNodeAt(px, py);
      s.hoveredNode = n ?? null;

      if (n && tooltipRef.current) {
        const deg = getDegree(n.id, s.links);
        tooltipRef.current.style.display = "block";
        tooltipRef.current.style.left    = (px + 14) + "px";
        tooltipRef.current.style.top     = (py - 8) + "px";
        tooltipRef.current.innerHTML     =
          `<strong style="color:#fff">${n.id}</strong><br>
           <span style="color:#888">${deg} enlace${deg !== 1 ? "s" : ""}</span>`;
        container.style.cursor = "pointer";
      } else {
        if (tooltipRef.current) tooltipRef.current.style.display = "none";
        container.style.cursor = s.panStart ? "grabbing" : "grab";
      }
      draw();
    }

    function onMouseUp() {
      const s = stateRef.current;
      if (s.draggingNode) {
        s.draggingNode.fx = null;
        s.draggingNode.fy = null;
        simRef.current?.alphaTarget(0);
        s.draggingNode = null;
      }
      s.panStart = null;
      container.style.cursor = "grab";
    }

    function onMouseLeave() {
      const s = stateRef.current;
      if (tooltipRef.current) tooltipRef.current.style.display = "none";
      s.hoveredNode = null;
      s.panStart    = null;
      if (s.draggingNode) {
        s.draggingNode.fx = null;
        s.draggingNode.fy = null;
        s.draggingNode    = null;
      }
      container.style.cursor = "grab";
      draw();
    }

    function onWheel(e) {
      e.preventDefault();
      const rect   = canvas.getBoundingClientRect();
      const px     = e.clientX - rect.left;
      const py     = e.clientY - rect.top;
      const factor = e.deltaY < 0 ? 1.12 : 0.89;
      const s      = stateRef.current;
      const newScale = Math.min(4, Math.max(0.15, s.scale * factor));
      s.offsetX = px - (px - s.offsetX) * (newScale / s.scale);
      s.offsetY = py - (py - s.offsetY) * (newScale / s.scale);
      s.scale   = newScale;
      draw();
    }

    canvas.addEventListener("mousedown",  onMouseDown);
    canvas.addEventListener("mousemove",  onMouseMove);
    canvas.addEventListener("mouseup",    onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("wheel",      onWheel, { passive: false });
    window.addEventListener("resize",     resizeCanvas);

    return () => {
      simRef.current?.stop();
      canvas.removeEventListener("mousedown",  onMouseDown);
      canvas.removeEventListener("mousemove",  onMouseMove);
      canvas.removeEventListener("mouseup",    onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("wheel",      onWheel);
      window.removeEventListener("resize",     resizeCanvas);
    };
  }, [rawNodes, rawLinks, repulsionVal, linkStrengthVal, buildSim, draw, resizeCanvas, nodeRadius, getDegree, height]);

  // ── Restart helper ─────────────────────────────────────────────────────
  function restart() {
    const { nodes, links } = stateRef.current;
    nodes.forEach(d => { delete d.x; delete d.y; delete d.vx; delete d.vy; });
    buildSim(nodes, links, repulsionVal, linkStrengthVal);
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: `${width}px`,
        height: `${height}px`,
        background: backgroundColor,
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "grab",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0 }}
      />

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          display: "none",
          background: "rgba(20,20,20,0.95)",
          color: "#e0dfd9",
          fontSize: "12px",
          padding: "6px 10px",
          borderRadius: "6px",
          border: "0.5px solid #444",
          pointerEvents: "none",
          zIndex: 10,
          maxWidth: "180px",
        }}
      />

      {/* Guía de controles */}
      {viewGuide && (
        <>
          {/* Controles de simulación */}
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: 12,
              display: "flex",
              gap: 10,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <label style={{ fontSize: 11, color: "#888", display: "flex", alignItems: "center", gap: 5 }}>
              Repulsión
              <input
                type="range" min={30} max={300} value={repulsionVal}
                style={{ width: 70 }}
                onChange={e => setRepulsionVal(+e.target.value)}
              />
            </label>
            <label style={{ fontSize: 11, color: "#888", display: "flex", alignItems: "center", gap: 5 }}>
              Enlace
              <input
                type="range" min={1} max={10} value={linkStrengthVal}
                style={{ width: 70 }}
                onChange={e => setLinkStrengthVal(+e.target.value)}
              />
            </label>
            <button
              onClick={restart}
              style={{
                fontSize: 11, padding: "4px 10px",
                background: "transparent", color: "#aaa",
                border: "0.5px solid #555", borderRadius: 5, cursor: "pointer",
              }}
            >
              ↺ Reiniciar
            </button>
          </div>

          {/* Leyenda de uso */}
          <div
            style={{
              position: "absolute",
              top: 12, right: 12,
              fontSize: 10, color: "#555",
              lineHeight: 1.7,
              userSelect: "none",
            }}
          >
            <div>⚡ Drag = mover nodo</div>
            <div>🖱 Scroll = zoom</div>
            <div>💡 Hover = ver nombre</div>
          </div>
        </>
      )}
    </div>
  );
}
