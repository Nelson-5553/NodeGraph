/**
 * Lógica de simulación D3 (fuerzas, configuración)
 */

import * as d3 from "d3";

/**
 * Construye y configura la simulación D3
 * @param {Array} nodes - Array de nodos
 * @param {Array} links - Array de enlaces
 * @param {number} repulsion - Fuerza de repulsión (charge)
 * @param {number} linkStrength - Fuerza de enlace (0-10)
 * @param {number} linkDistance - Distancia deseada entre nodos enlazados
 * @param {Function} onTick - Callback a ejecutar en cada tick
 * @returns {d3.Simulation} La simulación creada
 */
export function createSimulation(
  nodes,
  links,
  repulsion,
  linkStrength,
  linkDistance,
  onTick
) {
  const simulation = d3.forceSimulation(nodes)
    .force("link", 
      d3.forceLink(links)
        .id(d => d.id)
        .distance(linkDistance)
        .strength(linkStrength / 10)
    )
    .force("charge", 
      d3.forceManyBody().strength(-repulsion)
    )
    .force("center", 
      d3.forceCenter(0, 0)
    )
    .force("collision", 
      d3.forceCollide(10)
    )
    .alphaDecay(0.015)
    .on("tick", onTick);
  
  return simulation;
}

/**
 * Reinicia la simulación (limpia posiciones y velocidades)
 * @param {d3.Simulation} simulation - La simulación a reiniciar
 * @param {Array} nodes - Array de nodos
 */
export function restartSimulation(simulation, nodes) {
  nodes.forEach(d => {
    delete d.x;
    delete d.y;
    delete d.vx;
    delete d.vy;
  });
  
  simulation.alpha(1).restart();
}
