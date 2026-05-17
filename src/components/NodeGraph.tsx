import { useEffect, useRef, useCallback, useState } from "react";
import type { CSSProperties } from "react";
import type { FC } from "react";
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

// ─── Types ──────────────────────────────────────────────────────────────────

interface NodeElement {
  id: string;
  group: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string | NodeElement;
  target: string | NodeElement;
  
}

interface ViewState {
  scale: number;
  offsetX: number;
  offsetY: number;
  hoveredNode: NodeElement | null;
}

interface SimulationState {
  scale: number;
  offsetX: number;
  offsetY: number;
  draggingNode: NodeElement | null;
  panStart: { x: number; y: number } | null;
  panOrig: { x: number; y: number } | null;
  hoveredNode: NodeElement | null;
  nodes: NodeElement[];
  links: Array<{ source: NodeElement | string; target: NodeElement | string }>;
}

interface LinkStyles {
  linkColor?: string;
  linkWidth?: number;
  linkHoverColor?: string;
  linkHoverWidth?: number;
  nodeHoverColor?: string;
}

interface NodeLabelOptions {
  color?: string;
  hoverColor?: string;
  fontSize?: number;
  showOnHover?: boolean;
  minDegreeToShow?: number;
  minScaleToShow?: number;
}

interface NodeGraphProps {
  nodes?: NodeElement[];
  links?: string[][];
  viewGuide?: boolean;
  colors?: string[];
  width?: number;
  height?: number;
  repulsion?: number;
  linkDistance?: number;
  className?: string;
  linkColor?: string;
  linkWidth?: number;
  linkHoverColor?: string;
  linkHoverWidth?: number;
  nodeHoverColor?: string;
  nodeLabelColor?: string;
  nodeLabelHoverColor?: string;
  nodeLabelFontSize?: number;
  nodeLabelShowOnHover?: boolean;
  nodeLabelMinDegree?: number;
  nodeLabelMinScale?: number;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const DEFAULT_COLORS: string[] = [
  "#a78bfa", "#34d399", "#60a5fa", "#f97316",
  "#f472b6", "#facc15", "#4ade80", "#e879f9",
];

// ─── Component ──────────────────────────────────────────────────────────────

const NodeGraph: FC<NodeGraphProps> = ({
  nodes: rawNodes = [],
  links: rawLinks = [],
  viewGuide = true,
  colors = DEFAULT_COLORS,
  width = 800,
  height = 580,
  repulsion = 120,
  linkDistance = 55,
  className = "",
  linkColor = "rgba(255,255,255,0.45)",
  linkWidth = 0.6,
  linkHoverColor = "#ff0000",
  linkHoverWidth = 1.2,
  nodeHoverColor = "#fff",
  nodeLabelColor = "rgba(220,215,205,0.9)",
  nodeLabelHoverColor = "#fff",
  nodeLabelFontSize = 10,
  nodeLabelShowOnHover = false,
  nodeLabelMinDegree = 5,
  nodeLabelMinScale = 0.55,
}) => {
  // ── Refs ───────────────────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<any>(null);
  const stateRef = useRef<SimulationState>({
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    draggingNode: null,
    panStart: null,
    panOrig: null,
    hoveredNode: null,
    nodes: [],
    links: [],
  });
  const tooltipRef = useRef<HTMLDivElement>(null);

  // ── State ──────────────────────────────────────────────────────────────
  const [repulsionVal, setRepulsionVal] = useState<number>(repulsion);
  const [linkStrengthVal, setLinkStrengthVal] = useState<number>(4);

  // ── Drawing function ──────────────────────────────────────────────────
  const handleDraw = useCallback((): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { scale, offsetX, offsetY, hoveredNode, nodes, links } = stateRef.current;

    const viewState: ViewState = {
      scale,
      offsetX,
      offsetY,
      hoveredNode,
    };

    draw(canvas, nodes, links, viewState, colors, {
      linkColor,
      linkWidth,
      linkHoverColor,
      linkHoverWidth,
      nodeHoverColor,
      nodeLabelColor,
      nodeLabelHoverColor,
      nodeLabelFontSize,
      nodeLabelShowOnHover,
      nodeLabelMinDegree,
      nodeLabelMinScale,
    });
  }, [
    colors,
    linkColor,
    linkWidth,
    linkHoverColor,
    linkHoverWidth,
    nodeHoverColor,
    nodeLabelColor,
    nodeLabelHoverColor,
    nodeLabelFontSize,
    nodeLabelShowOnHover,
    nodeLabelMinDegree,
    nodeLabelMinScale,
  ]);

  // ── Build/rebuild simulation ───────────────────────────────────────────
  const buildSim = useCallback(
    (nodes: NodeElement[], links: any[], rep: number, ls: number): void => {
      if (simRef.current) simRef.current.stop();
      simRef.current = createSimulation(nodes, links, rep, ls, linkDistance, handleDraw);
    },
    [handleDraw, linkDistance]
  );

  // ── Resize canvas ──────────────────────────────────────────────────────
  const resizeCanvas = useCallback((): void => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const { width: containerWidth } = container.getBoundingClientRect();

    canvas.width = containerWidth * dpr;
    canvas.height = height * dpr;
    canvas.style.width = containerWidth + "px";
    canvas.style.height = height + "px";
  }, [height]);

  // ── Main effect: mount simulation and event listeners ──────────────────
  useEffect((): (() => void) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return () => {};

    // Clone data for D3 mutation
    const nodes: NodeElement[] = rawNodes.map((d) => ({ ...d }));
    const links: Array<{ source: string; target: string }> = rawLinks.map(([s, t]) => ({
      source: s,
      target: t,
    }));

    stateRef.current.nodes = nodes;
    stateRef.current.links = links;

    resizeCanvas();

    // Center offset
    const { width: containerWidth } = container.getBoundingClientRect();
    stateRef.current.offsetX = containerWidth / 2;
    stateRef.current.offsetY = height / 2;

    buildSim(nodes, links, repulsionVal, linkStrengthVal);

    // ── Mouse event handlers ────────────────────────────────────────────

    const onMouseDown = (e: MouseEvent): void => {
      handleMouseDown(e, container, canvas, stateRef.current, simRef.current);
    };

    const onMouseMove = (e: MouseEvent): void => {
      handleMouseMove(e, container, canvas, stateRef.current, tooltipRef.current, handleDraw);
    };

    const onMouseUp = (): void => {
      handleMouseUp(stateRef.current, container, simRef.current);
    };

    const onMouseLeave = (): void => {
      handleMouseLeave(stateRef.current, container, tooltipRef.current, handleDraw);
    };

    const onWheel = (e: WheelEvent): void => {
      handleWheel(e, canvas, stateRef.current, handleDraw);
    };

    // ── Add event listeners ────────────────────────────────────────────

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", resizeCanvas);

    // ── Cleanup ────────────────────────────────────────────────────────

    return (): void => {
      simRef.current?.stop();
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [rawNodes, rawLinks, repulsionVal, linkStrengthVal, buildSim, handleDraw, resizeCanvas, height]);

  // ── Styles ─────────────────────────────────────────────────────────────
  const containerStyle: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
  };

  const canvasStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
  };

  const tooltipStyle: CSSProperties = {
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
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-grab bg-amber-600 ${className}`}
      style={containerStyle}
    >
      <canvas ref={canvasRef} style={canvasStyle} />

      {/* Tooltip */}
      <div ref={tooltipRef} style={tooltipStyle} />

      {/* Controls guide */}
      {viewGuide && (
        <NodeGraphControls
          repulsionVal={repulsionVal}
          setRepulsionVal={setRepulsionVal}
          linkStrengthVal={linkStrengthVal}
          setLinkStrengthVal={setLinkStrengthVal}
        />
      )}
    </div>
  );
};

export default NodeGraph;
