// D3 force simulation setup and management

import * as d3 from "d3";

// Creates and configures D3 force simulation
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

// Restarts simulation, clearing positions and velocities
export function restartSimulation(simulation, nodes) {
  nodes.forEach(d => {
    delete d.x;
    delete d.y;
    delete d.vx;
    delete d.vy;
  });
  
  simulation.alpha(1).restart();
}
