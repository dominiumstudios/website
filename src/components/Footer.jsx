import { Link } from "react-router";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const LINKS = [
  { id: "inicio", key: "navHome" },
  { id: "sobre", key: "navAbout" },
  { id: "jogo", key: "navGame" },
  { id: "contato", key: "navContact" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto bg-dusk-deep text-haze">
      <div className="container-site flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-4">
          <img src="/assets/dominium.png" alt="" className="size-14 object-contain" />
          <div>
            <p className="font-display text-lg leading-none text-cream">Dominium Studios</p>
            <p className="mt-2 max-w-[34ch] text-sm leading-relaxed">{t("footerTagline")}</p>
          </div>
        </div>

        <nav aria-label="Rodapé" className="flex flex-wrap gap-x-7 gap-y-3 text-[15px]">
          {LINKS.map(({ id, key }) => (
            <Link key={id} to={`/#${id}`} className="transition-colors hover:text-cream">
              {t(key)}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-plum/60">
        <p className="container-site py-5 text-[13px] text-haze/75">
          © 2022–2026 Dominium Studios. {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
