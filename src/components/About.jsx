import { useLanguage } from "../i18n/LanguageContext.jsx";
import StepEdge from "./StepEdge.jsx";

export default function About() {
  const { t } = useLanguage();

  const facts = [
    { label: t("factSince"), value: "2022" },
    { label: t("factPlatforms"), value: t("factPlatformsValue") },
    { label: t("factFocus"), value: t("factFocusValue") },
  ];

  return (
    <section id="sobre" className="relative bg-peach pt-20 pb-32 text-dusk md:pt-28 md:pb-40">
      <div className="container-site grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <h2 className="reveal font-display text-[clamp(2.2rem,5.2vw,4.2rem)] leading-[1.02]">
          {t("aboutTitle")}
        </h2>

        <div className="reveal lg:pt-3 [--reveal-delay:120ms]">
          <p className="max-w-[58ch] text-lg leading-[1.7] text-dusk/85">{t("aboutText")}</p>

          <dl className="mt-10 grid border-t-2 border-dusk">
            {facts.map(({ label, value }) => (
              <div
                key={label}
                className="grid grid-cols-[9rem_1fr] items-baseline gap-4 border-b-2 border-dusk/15 py-4"
              >
                <dt className="text-sm font-medium text-dusk/65">{label}</dt>
                <dd className="text-lg font-bold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <StepEdge className="bg-dusk" heights={[0, 1, 1, 2, 3, 2, 2, 1, 0, 0, 1, 2, 2, 1, 2, 3, 3, 2, 1, 1]} />
    </section>
  );
}
