// Coordinate conversion utilities

// Converts simulation coordinates to screen coordinates
export function toScreen(x, y, scale, offsetX, offsetY, dpr) {
  return [
    (x * scale + offsetX) * dpr,
    (y * scale + offsetY) * dpr,
  ];
}

// Converts screen coordinates to simulation coordinates
export function toSim(px, py, scale, offsetX, offsetY, dpr) {
  return [
    (px / dpr - offsetX) / scale,
    (py / dpr - offsetY) / scale,
  ];
}
