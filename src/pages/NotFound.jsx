import { Link } from "react-router";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <section className="container-site flex flex-col items-start py-28">
      <p className="font-display text-[clamp(4rem,14vw,9rem)] leading-none text-cream text-extrude">404</p>
      <h1 className="mt-6 text-3xl font-bold">{t("notFoundTitle")}</h1>
      <p className="mt-3 max-w-[48ch] text-lg text-haze">{t("notFoundText")}</p>
      <Link to="/" className="btn-block mt-8 bg-cream text-dusk">
        {t("notFoundButton")}
      </Link>
    </section>
  );
}
