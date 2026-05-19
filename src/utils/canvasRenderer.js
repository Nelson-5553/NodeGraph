// Canvas rendering logic for graph visualization

import { toScreen } from './coordinateUtils';
import { getDegree, nodeRadius } from './nodeUtils';

// Draws all links on canvas
function drawLinks(ctx, links, viewState, dpr, linkStyles = {}) {
  const { scale, offsetX, offsetY, hoveredNode } = viewState;
  const {
    linkColor = "rgba(255,255,255,0.07)",
    linkWidth = 0.6,
    linkHoverColor = "rgba(255,255,255,0.45)",
    linkHoverWidth = 1.2,
  } = linkStyles;
  
  links.forEach(l => {
    if (!l.source?.x) return;
    
    const [x1, y1] = toScreen(l.source.x, l.source.y, scale, offsetX, offsetY, dpr);
    const [x2, y2] = toScreen(l.target.x, l.target.y, scale, offsetX, offsetY, dpr);
    
    const isHovered = hoveredNode &&
      (l.source.id === hoveredNode.id || l.target.id === hoveredNode.id);
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = isHovered ? linkHoverColor : linkColor;
    ctx.lineWidth = (isHovered ? linkHoverWidth : linkWidth) * dpr;
    ctx.stroke();
  });
}

// Draws glow ring around hovered nodes
function drawNodeGlow(ctx, sx, sy, r, color, dpr) {
  ctx.beginPath();
  ctx.arc(sx, sy, r + 5 * dpr, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5 * dpr;
  ctx.globalAlpha = 0.45;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

// Draws a single node circle
function drawNode(ctx, node, sx, sy, r, color, isHovered, dpr, nodeHoverColor = "#fff") {
  ctx.beginPath();
  ctx.arc(sx, sy, r, 0, Math.PI * 2);
  ctx.fillStyle = isHovered ? nodeHoverColor : color;
  ctx.globalAlpha = isHovered ? 1 : 0.82;
  ctx.fill();
  ctx.globalAlpha = 1;
}

// Draws node labels based on degree and zoom level
function drawNodeLabel(ctx, node, sx, sy, r, degree, isHovered, scale, dpr, labelOptions = {}) {
  const {
    color = "rgba(220,215,205,0.9)",
    hoverColor = "#fff",
    fontSize = 10,
    showOnHover = false,
    minDegreeToShow = 5,
    minScaleToShow = 0.55,
  } = labelOptions;

  // Determine label visibility based on config
  let shouldShowLabel = false;

  if (isHovered) {
    shouldShowLabel = true;
  } else if (showOnHover) {
    shouldShowLabel = false;
  } else {
    shouldShowLabel = degree >= minDegreeToShow && scale > minScaleToShow;
  }

  if (shouldShowLabel) {
    const fs = Math.round(fontSize * scale * dpr);
    ctx.font = `${fs}px sans-serif`;
    ctx.fillStyle = isHovered ? hoverColor : color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.name || node.id, sx, sy + r + 9 * scale * dpr);
  }
}

// Draws all nodes on canvas
function drawNodes(ctx, nodes, links, viewState, colors, dpr, nodeHoverColor = "#fff", labelOptions = {}) {
  const { scale, offsetX, offsetY, hoveredNode } = viewState;
  
  nodes.forEach(node => {
    if (node.x == null) return;
    
    const [sx, sy] = toScreen(node.x, node.y, scale, offsetX, offsetY, dpr);
    const r = nodeRadius(node, links) * scale * dpr;
    const color = colors[node.group % colors.length] ?? "#60a5fa";
    const isHovered = hoveredNode?.id === node.id;
    
    if (isHovered) {
      drawNodeGlow(ctx, sx, sy, r, color, dpr);
    }
    
    drawNode(ctx, node, sx, sy, r, color, isHovered, dpr, nodeHoverColor);
    
    const degree = getDegree(node.id, links);
    drawNodeLabel(ctx, node, sx, sy, r, degree, isHovered, scale, dpr, labelOptions);
  });
}

// Main render function
export function draw(canvas, nodes, links, viewState, colors, linkStyles = {}) {
  if (!canvas) return;
  
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.width;
  const H = canvas.height;
  const { nodeHoverColor = "#fff" } = linkStyles;
  
  const labelOptions = {
    color: linkStyles.nodeLabelColor,
    hoverColor: linkStyles.nodeLabelHoverColor,
    fontSize: linkStyles.nodeLabelFontSize,
    showOnHover: linkStyles.nodeLabelShowOnHover,
    minDegreeToShow: linkStyles.nodeLabelMinDegree,
    minScaleToShow: linkStyles.nodeLabelMinScale,
  };
  
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  
  drawLinks(ctx, links, viewState, dpr, linkStyles);
  drawNodes(ctx, nodes, links, viewState, colors, dpr, nodeHoverColor, labelOptions);
  
  ctx.restore();
}
