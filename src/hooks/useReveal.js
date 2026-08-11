import { useEffect } from "react";

/**
 * Revela elementos `.reveal` quando entram na tela (marca `data-revealed`).
 * O estado escondido só existe no CSS para quem não pediu menos movimento.
 */
export function useReveal(routeKey) {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal:not([data-revealed])");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [routeKey]);
}
