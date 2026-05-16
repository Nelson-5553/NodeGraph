/**
 * Lógica de renderizado en canvas para el grafo
 */

import { toScreen } from './coordinateUtils';
import { getDegree, nodeRadius } from './nodeUtils';

/**
 * Dibuja todos los enlaces en el canvas
 * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
 * @param {Array} links - Array de enlaces
 * @param {Object} viewState - Estado de vista (scale, offsetX, offsetY, hoveredNode)
 * @param {number} dpr - Device pixel ratio
 * @param {Object} linkStyles - Estilos de los enlaces
 */
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

/**
 * Dibuja el anillo de glow alrededor de un nodo cuando está en hover
 * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
 * @param {number} sx - Coordenada X en pantalla
 * @param {number} sy - Coordenada Y en pantalla
 * @param {number} r - Radio del nodo en pantalla
 * @param {string} color - Color del nodo
 * @param {number} dpr - Device pixel ratio
 */
function drawNodeGlow(ctx, sx, sy, r, color, dpr) {
  ctx.beginPath();
  ctx.arc(sx, sy, r + 5 * dpr, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5 * dpr;
  ctx.globalAlpha = 0.45;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

/**
 * Dibuja un nodo individual
 * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
 * @param {Object} node - Objeto del nodo
 * @param {number} sx - Coordenada X en pantalla
 * @param {number} sy - Coordenada Y en pantalla
 * @param {number} r - Radio del nodo en pantalla
 * @param {string} color - Color del nodo
 * @param {boolean} isHovered - Si el nodo está en hover
 * @param {number} dpr - Device pixel ratio
 */
function drawNode(ctx, node, sx, sy, r, color, isHovered, dpr) {
  ctx.beginPath();
  ctx.arc(sx, sy, r, 0, Math.PI * 2);
  ctx.fillStyle = isHovered ? "#fff" : color;
  ctx.globalAlpha = isHovered ? 1 : 0.82;
  ctx.fill();
  ctx.globalAlpha = 1;
}

/**
 * Dibuja la etiqueta de un nodo (si es necesario)
 * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
 * @param {Object} node - Objeto del nodo
 * @param {number} sx - Coordenada X en pantalla
 * @param {number} sy - Coordenada Y en pantalla
 * @param {number} r - Radio del nodo en pantalla
 * @param {number} degree - Número de conexiones del nodo
 * @param {boolean} isHovered - Si el nodo está en hover
 * @param {number} scale - Factor de escala actual
 * @param {number} dpr - Device pixel ratio
 */
function drawNodeLabel(ctx, node, sx, sy, r, degree, isHovered, scale, dpr) {
  if (isHovered || (degree >= 5 && scale > 0.55)) {
    const fs = Math.round(10 * scale * dpr);
    ctx.font = `${fs}px sans-serif`;
    ctx.fillStyle = isHovered ? "#fff" : "rgba(220,215,205,0.9)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.id, sx, sy + r + 9 * scale * dpr);
  }
}

/**
 * Dibuja todos los nodos en el canvas
 * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
 * @param {Array} nodes - Array de nodos
 * @param {Array} links - Array de enlaces
 * @param {Object} viewState - Estado de vista
 * @param {Array} colors - Paleta de colores
 * @param {number} dpr - Device pixel ratio
 */
function drawNodes(ctx, nodes, links, viewState, colors, dpr) {
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
    
    drawNode(ctx, node, sx, sy, r, color, isHovered, dpr);
    
    const degree = getDegree(node.id, links);
    drawNodeLabel(ctx, node, sx, sy, r, degree, isHovered, scale, dpr);
  });
}

/**
 * Función principal de renderizado
 * @param {HTMLCanvasElement} canvas - Elemento canvas
 * @param {Array} nodes - Array de nodos
 * @param {Array} links - Array de enlaces
 * @param {Object} viewState - Estado de vista
 * @param {Array} colors - Paleta de colores
 * @param {Object} linkStyles - Estilos de los enlaces (linkColor, linkWidth, linkHoverColor, linkHoverWidth)
 */
export function draw(canvas, nodes, links, viewState, colors, linkStyles = {}) {
  if (!canvas) return;
  
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.width;
  const H = canvas.height;
  
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  
  drawLinks(ctx, links, viewState, dpr, linkStyles);
  drawNodes(ctx, nodes, links, viewState, colors, dpr);
  
  ctx.restore();
}
