import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { HeroDockProvider } from "../context/HeroDockContext.jsx";
import { useReveal } from "../hooks/useReveal.js";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import CursorLight from "./CursorLight.jsx";

/** Rola até a âncora (#sobre, #contato…) a cada navegação, ou ao topo. */
function useScrollToHash() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash && hash !== "#inicio") {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key]);
}

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useScrollToHash();
  useReveal(pathname);

  return (
    <HeroDockProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        {/* O cabeçalho é fixo; no início o hero fica por baixo dele. */}
        <main className={isHome ? "" : "pt-16 md:pt-[72px]"}>
          <Outlet />
        </main>
        <Footer />
        <CursorLight />
      </div>
    </HeroDockProvider>
  );
}
