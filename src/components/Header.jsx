import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { LANGUAGES } from "../i18n/translations.js";
import { useActiveSection } from "../hooks/useActiveSection.js";
import { DISCORD_URL } from "../links.js";
import { DiscordIcon } from "./icons.jsx";
import { FLAGS } from "./Flags.jsx";
import { useHeroDock } from "../context/HeroDockContext.jsx";

const NAV_ITEMS = [
  { id: "inicio", key: "navHome" },
  { id: "sobre", key: "navAbout" },
  { id: "jogo", key: "navGame" },
  { id: "contato", key: "navContact" },
];

function LanguageSwitch() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div role="group" aria-label={t("languageLabel")} className="flex border-2 border-plum">
      {LANGUAGES.map(({ value, label, name }) => {
        const selected = value === language;
        const Flag = FLAGS[value];
        return (
          <button
            key={value}
            type="button"
            lang={value}
            title={name}
            aria-label={name}
            aria-pressed={selected}
            onClick={() => setLanguage(value)}
            className={`flex h-8 items-center gap-1.5 px-2 text-xs font-bold transition ${
              selected ? "bg-plum text-cream" : "text-haze opacity-60 hover:text-cream hover:opacity-100"
            }`}
          >
            <Flag className="h-3 w-[18px] shrink-0 shadow-[0_0_0_1px_rgb(255_255_255/0.15)]" />
            <span aria-hidden="true">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function Header() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection({ enabled: pathname === "/" });
  const { brandRef, chrome } = useHeroDock();

  // Se o hero esconder o cabeçalho (rolando de volta ao topo), fecha o menu.
  useEffect(() => {
    if (!chrome.visible) setMenuOpen(false);
  }, [chrome.visible]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[opacity,background-color,border-color] duration-300 ${
        chrome.visible
          ? "opacity-100"
          : "pointer-events-none opacity-0 focus-within:pointer-events-auto focus-within:opacity-100"
      } ${
        scrolled || menuOpen
          ? "border-b-2 border-plum bg-dusk/95 backdrop-blur-md"
          : "border-b-2 border-transparent bg-dusk"
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <Link to="/#inicio" className="flex shrink-0 items-center gap-3" onClick={closeMenu}>
          <img
            ref={brandRef}
            src="/assets/dominium.png"
            alt=""
            className={`size-10 object-contain transition-opacity duration-300 ${
              chrome.docked ? "opacity-100" : "opacity-0"
            }`}
          />
          <span className="font-display text-sm leading-none md:text-base">
            Dominium
            <span className="block text-[0.7em] tracking-[0.18em] text-haze">Studios</span>
          </span>
        </Link>

        <nav
          aria-label="Principal"
          className={`absolute inset-x-0 top-full flex-col border-b-2 border-plum bg-dusk px-4 pb-6 lg:static lg:flex lg:flex-row lg:items-center lg:gap-1 lg:border-0 lg:bg-transparent lg:p-0 ${
            menuOpen ? "flex" : "hidden"
          }`}
        >
          {NAV_ITEMS.map(({ id, key }) => {
            const isActive = active === id;
            return (
              <Link
                key={id}
                to={`/#${id}`}
                onClick={closeMenu}
                aria-current={isActive ? "location" : undefined}
                className={`border-b border-plum py-3.5 text-lg font-medium transition-colors lg:border-0 lg:px-3.5 lg:py-2 lg:text-[15px] ${
                  isActive ? "text-sunset" : "text-cream/80 hover:text-cream"
                }`}
              >
                {t(key)}
              </Link>
            );
          })}

          <div className="mt-5 flex items-center justify-between gap-4 lg:hidden">
            <LanguageSwitch />
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="btn-block bg-ember text-cream">
              <DiscordIcon className="size-5" />
              {t("discordButton")}
            </a>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <LanguageSwitch />
          </div>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-block hidden min-h-10 bg-ember px-4 text-[15px] text-cream lg:inline-flex"
          >
            <DiscordIcon className="size-5" />
            {t("discordButton")}
          </a>

          <button
            type="button"
            aria-label={t("menuLabel")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-11 place-items-center border-2 border-plum lg:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 h-0.5 w-full bg-cream transition-transform duration-200 ${
                  menuOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute top-1.5 left-0 h-0.5 w-full bg-cream transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-full bg-cream transition-transform duration-200 ${
                  menuOpen ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
