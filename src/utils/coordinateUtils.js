/**
 * Utilidades para conversión de coordenadas entre el sistema de simulación y pantalla
 */

/**
 * Convierte coordenadas de simulación a pantalla
 * @param {number} x - Coordenada X en simulación
 * @param {number} y - Coordenada Y en simulación
 * @param {number} scale - Factor de escala actual
 * @param {number} offsetX - Desplazamiento X de la vista
 * @param {number} offsetY - Desplazamiento Y de la vista
 * @param {number} dpr - Device pixel ratio
 * @returns {[number, number]} Coordenadas en pantalla
 */
export function toScreen(x, y, scale, offsetX, offsetY, dpr) {
  return [
    (x * scale + offsetX) * dpr,
    (y * scale + offsetY) * dpr,
  ];
}

/**
 * Convierte coordenadas de pantalla a simulación
 * @param {number} px - Coordenada X en pantalla
 * @param {number} py - Coordenada Y en pantalla
 * @param {number} scale - Factor de escala actual
 * @param {number} offsetX - Desplazamiento X de la vista
 * @param {number} offsetY - Desplazamiento Y de la vista
 * @param {number} dpr - Device pixel ratio
 * @returns {[number, number]} Coordenadas en simulación
 */
export function toSim(px, py, scale, offsetX, offsetY, dpr) {
  return [
    (px / dpr - offsetX) / scale,
    (py / dpr - offsetY) / scale,
  ];
}
