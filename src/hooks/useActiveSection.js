import { useEffect, useState } from "react";

/**
 * Retorna o id da última `section[id]` cujo topo já passou do ponto de
 * referência (scroll + offset). Usado para destacar o link ativo do menu.
 */
export function useActiveSection({ enabled = true, fallback = "inicio", offset = 150 } = {}) {
  const [active, setActive] = useState(fallback);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }

    function update() {
      const scrollPoint = window.scrollY + offset;
      let current = fallback;

      document.querySelectorAll("section[id]").forEach((section) => {
        if (scrollPoint >= section.offsetTop) current = section.id;
      });

      setActive(current);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [enabled, fallback, offset]);

  return active;
}
