import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

// Liga o hero (que anima o "D" grande) ao cabeçalho (onde o "D" pousa).
// `chrome.visible` mostra o cabeçalho; `chrome.docked` troca o "D" flutuante
// pelo logo fixo do cabeçalho.

const HeroDockContext = createContext(null);

const SETTLED = { visible: true, docked: true };

export function HeroDockProvider({ children }) {
  const brandRef = useRef(null);
  const [chrome, setChromeState] = useState(SETTLED);

  const setChrome = useCallback((visible, docked) => {
    setChromeState((prev) =>
      prev.visible === visible && prev.docked === docked ? prev : { visible, docked },
    );
  }, []);

  const value = useMemo(() => ({ brandRef, chrome, setChrome }), [chrome, setChrome]);

  return <HeroDockContext.Provider value={value}>{children}</HeroDockContext.Provider>;
}

export function useHeroDock() {
  const context = useContext(HeroDockContext);
  if (!context) throw new Error("useHeroDock precisa estar dentro de <HeroDockProvider>");
  return context;
}
