// Borda em degraus de blocos entre seções (vocabulário voxel de Roblox/Minecraft).
// `heights` = altura de cada degrau em blocos (0–3). Desenhado com clip-path.

const DEFAULT_HEIGHTS = [1, 2, 2, 3, 2, 1, 1, 2, 1, 0, 1, 2, 3, 3, 2, 1, 2, 1, 0, 1];

function buildPolygon(heights, flip) {
  const n = heights.length;
  const points = [flip ? "0% 0%" : "0% 100%"];

  heights.forEach((h, i) => {
    const offset = (h / 3) * 100;
    const y = flip ? 100 - offset : offset;
    const x0 = (i / n) * 100;
    const x1 = ((i + 1) / n) * 100;
    points.push(`${x0}% ${100 - y}%`, `${x1}% ${100 - y}%`);
  });

  points.push(flip ? "100% 0%" : "100% 100%");
  return `polygon(${points.join(", ")})`;
}

/**
 * Coloque dentro de uma seção `relative`. `position="bottom"` sobe a cor da
 * próxima seção; `position="top"` desce a cor da seção anterior.
 */
export default function StepEdge({ className, position = "bottom", heights = DEFAULT_HEIGHTS }) {
  const flip = position === "top";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 h-6 md:h-9 ${
        flip ? "-top-px" : "-bottom-px"
      } ${className}`}
      style={{ clipPath: buildPolygon(heights, flip) }}
    />
  );
}
