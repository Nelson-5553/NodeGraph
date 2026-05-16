import { useEffect, useRef, useCallback, useState } from "react";
import { createSimulation, restartSimulation } from "../utils/simulationManager";
import { draw } from "../utils/canvasRenderer";
import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleMouseLeave,
  handleWheel,
} from "../utils/mouseEventHandler";
import { NodeGraphControls } from "./NodeGraphControls";

// ─── Default color palette por group ───────────────────────────────────────
const DEFAULT_COLORS = [
  "#a78bfa", "#34d399", "#60a5fa", "#f97316",
  "#f472b6", "#facc15", "#4ade80", "#e879f9",
];

// ─── Componente principal ───────────────────────────────────────────────────
export default function NodeGraph({
  nodes: rawNodes = [],
  links: rawLinks = [],
  viewGuide = true,
  colors = DEFAULT_COLORS,
  width = 800,
  height = 580,
  repulsion = 120,
  linkDistance = 55,
  className = "",
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

  // ── Función de dibujo (usa el módulo canvasRenderer) ──────────────────────
  const handleDraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const { scale, offsetX, offsetY, hoveredNode, nodes, links } = stateRef.current;
    
    const viewState = {
      scale,
      offsetX,
      offsetY,
      hoveredNode,
    };
    
    draw(canvas, nodes, links, viewState, colors);
  }, [colors]);

  // ── Construir / reconstruir simulación ─────────────────────────────────
  const buildSim = useCallback((nodes, links, rep, ls) => {
    if (simRef.current) simRef.current.stop();

    simRef.current = createSimulation(nodes, links, rep, ls, linkDistance, handleDraw);
  }, [handleDraw, linkDistance]);

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

    function onMouseDown(e) {
      handleMouseDown(e, container, canvas, stateRef.current, simRef.current);
    }

    function onMouseMove(e) {
      handleMouseMove(e, container, canvas, stateRef.current, tooltipRef.current, handleDraw);
    }

    function onMouseUp() {
      handleMouseUp(stateRef.current, container, simRef.current);
    }

    function onMouseLeave() {
      handleMouseLeave(stateRef.current, container, tooltipRef.current, handleDraw);
    }

    function onWheel(e) {
      handleWheel(e, canvas, stateRef.current, handleDraw);
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
  }, [rawNodes, rawLinks, repulsionVal, linkStrengthVal, buildSim, handleDraw, resizeCanvas, height]);

  // ── Restart helper ─────────────────────────────────────────────────────
  function restart() {
    const { nodes, links } = stateRef.current;
    restartSimulation(simRef.current, nodes);
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-grab ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
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
        <NodeGraphControls
          repulsionVal={repulsionVal}
          setRepulsionVal={setRepulsionVal}
          linkStrengthVal={linkStrengthVal}
          setLinkStrengthVal={setLinkStrengthVal}
          onRestart={restart}
        />
      )}
    </div>
  );
}
