/**
 * Utilidades para cálculos de nodos y enlaces
 */

/**
 * Calcula el grado (número de conexiones) de un nodo
 * @param {string} id - ID del nodo
 * @param {Array} links - Array de enlaces
 * @returns {number} Número de conexiones
 */
export function getDegree(id, links) {
  return links.filter(l => l.source?.id === id || l.target?.id === id).length;
}

/**
 * Calcula el radio de un nodo basado en su grado
 * @param {Object} node - Objeto del nodo
 * @param {Array} links - Array de enlaces
 * @returns {number} Radio del nodo en unidades de simulación
 */
export function nodeRadius(node, links) {
  return 3 + Math.sqrt(getDegree(node.id, links)) * 1.8;
}
