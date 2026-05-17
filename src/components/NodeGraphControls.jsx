/**
 * Componente para los controles de simulación y leyenda de uso
 */
export function NodeGraphControls({
  repulsionVal,
  setRepulsionVal,
  linkStrengthVal,
  setLinkStrengthVal,
}) {
  return (
    <>
      {/* Controles de simulación */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: 12,
          display: "flex",
          gap: 10,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <label
          style={{
            fontSize: 11,
            color: "#888",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          Repulsión
          <input
            type="range"
            min={30}
            max={300}
            value={repulsionVal}
            style={{ width: 70 }}
            onChange={e => setRepulsionVal(+e.target.value)}
          />
        </label>

        <label
          style={{
            fontSize: 11,
            color: "#888",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          Enlace
          <input
            type="range"
            min={1}
            max={10}
            value={linkStrengthVal}
            style={{ width: 70 }}
            onChange={e => setLinkStrengthVal(+e.target.value)}
          />
        </label>
      </div>

      {/* Leyenda de uso */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          fontSize: 10,
          color: "#555",
          lineHeight: 1.7,
          userSelect: "none",
        }}
      >
        <div>⚡ Drag = mover nodo</div>
        <div>🖱 Scroll = zoom</div>
        <div>💡 Hover = ver nombre</div>
      </div>
    </>
  );
}
