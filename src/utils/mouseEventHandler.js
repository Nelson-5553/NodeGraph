// Mouse event handling (click, drag, pan, zoom)

import { toSim } from './coordinateUtils';
import { nodeRadius } from './nodeUtils';

// Finds node at mouse coordinates
export function getNodeAt(px, py, state) {
  const { scale, offsetX, offsetY, nodes, links } = state;
  const dpr = window.devicePixelRatio || 1;
  const [sx, sy] = toSim(px * dpr, py * dpr, scale, offsetX, offsetY, dpr);
  
  return nodes.find(d => {
    if (d.x == null) return false;
    const dx = d.x - sx;
    const dy = d.y - sy;
    const r = nodeRadius(d, links) + 4;
    return dx * dx + dy * dy < r * r;
  });
}

// Handles mouse down (node drag or pan start)
export function handleMouseDown(event, container, canvas, state, simulation) {
  const rect = canvas.getBoundingClientRect();
  const px = event.clientX - rect.left;
  const py = event.clientY - rect.top;
  
  const node = getNodeAt(px, py, state);
  
  if (node) {
    state.draggingNode = node;
    node.fx = node.x;
    node.fy = node.y;
    simulation?.alphaTarget(0.3).restart();
    container.style.cursor = "grabbing";
  } else {
    state.panStart = { x: event.clientX, y: event.clientY };
    state.panOrig = { x: state.offsetX, y: state.offsetY };
    container.style.cursor = "grabbing";
  }
}

// Handles mouse move (drag, pan, hover detection)
export function handleMouseMove(event, container, canvas, state, tooltip, onDraw) {
  const rect = canvas.getBoundingClientRect();
  const px = event.clientX - rect.left;
  const py = event.clientY - rect.top;
  
  // Handle node drag
  if (state.draggingNode) {
    const dpr = window.devicePixelRatio || 1;
    const [sx, sy] = toSim(px * dpr, py * dpr, state.scale, state.offsetX, state.offsetY, dpr);
    state.draggingNode.fx = sx;
    state.draggingNode.fy = sy;
    return;
  }

  // Handle pan
  if (state.panStart) {
    state.offsetX = state.panOrig.x + (event.clientX - state.panStart.x);
    state.offsetY = state.panOrig.y + (event.clientY - state.panStart.y);
    onDraw();
    return;
  }

  // Update node hover state
  const node = getNodeAt(px, py, state);
  state.hoveredNode = node ?? null;

  // Update tooltip display
  if (node && tooltip) {
    const degree = state.links.filter(l => l.source?.id === node.id || l.target?.id === node.id).length;
    tooltip.style.display = "block";
    tooltip.style.left = (px + 14) + "px";
    tooltip.style.top = (py - 8) + "px";
    tooltip.innerHTML = 
      `<strong style="color:#fff">${node.id}</strong><br>
       <span style="color:#888">${degree} link${degree !== 1 ? "s" : ""}</span>`;
    container.style.cursor = "pointer";
  } else {
    if (tooltip) tooltip.style.display = "none";
    container.style.cursor = state.panStart ? "grabbing" : "grab";
  }

  onDraw();
}

// Handles mouse up (end drag or pan)
export function handleMouseUp(state, container, simulation) {
  if (state.draggingNode) {
    state.draggingNode.fx = null;
    state.draggingNode.fy = null;
    simulation?.alphaTarget(0);
    state.draggingNode = null;
  }
  state.panStart = null;
  container.style.cursor = "grab";
}

// Handles mouse leave canvas
export function handleMouseLeave(state, container, tooltip, onDraw) {
  if (tooltip) tooltip.style.display = "none";
  state.hoveredNode = null;
  state.panStart = null;
  
  if (state.draggingNode) {
    state.draggingNode.fx = null;
    state.draggingNode.fy = null;
    state.draggingNode = null;
  }
  
  container.style.cursor = "grab";
  onDraw();
}

// Handles wheel event (zoom)
export function handleWheel(event, canvas, state, onDraw) {
  event.preventDefault();
  
  const rect = canvas.getBoundingClientRect();
  const px = event.clientX - rect.left;
  const py = event.clientY - rect.top;
  const factor = event.deltaY < 0 ? 1.12 : 0.89;
  
  const newScale = Math.min(4, Math.max(0.15, state.scale * factor));
  state.offsetX = px - (px - state.offsetX) * (newScale / state.scale);
  state.offsetY = py - (py - state.offsetY) * (newScale / state.scale);
  state.scale = newScale;
  
  onDraw();
}
