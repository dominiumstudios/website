import { useEffect, useRef } from "react";

/** Brilho suave que segue o mouse (só com mouse e sem "reduzir movimento"). */
export default function CursorLight() {
  const ref = useRef(null);

  useEffect(() => {
    const fine = matchMedia("(pointer: fine)");

    function onMove(event) {
      const el = ref.current;
      if (!el || !fine.matches) return;
      el.style.opacity = "1";
      el.animate(
        { left: `${event.clientX}px`, top: `${event.clientY}px` },
        { duration: 650, fill: "forwards", easing: "ease-out" },
      );
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-40 hidden size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_122_61/0.13),transparent_65%)] opacity-0 transition-opacity duration-500 pointer-fine:block"
    />
  );
}
