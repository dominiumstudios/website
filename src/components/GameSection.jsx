import { useLanguage } from "../i18n/LanguageContext.jsx";
import StepEdge from "./StepEdge.jsx";

const FEATURES = ["featureFast", "featureFriends", "featureRanking", "featureFun"];

// "?" desenhado em blocos 7×9 — o jogo ainda é segredo.
const MYSTERY_GLYPH = [
  "..###..",
  ".#...#.",
  ".....#.",
  "....#..",
  "...#...",
  "...#...",
  ".......",
  "...#...",
  ".......",
];

function MysteryBlock() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto grid aspect-[7/9] w-full max-w-[340px] grid-cols-7 gap-1 border-2 border-plum bg-dusk-deep p-3 shadow-[10px_10px_0_var(--color-plum)]"
    >
      {MYSTERY_GLYPH.join("")
        .split("")
        .map((cell, index) => (
          <span
            key={index}
            className={
              cell === "#"
                ? "bg-sunset shadow-[inset_-4px_-4px_0_rgb(0_0_0/0.18),inset_4px_4px_0_rgb(255_255_255/0.22)]"
                : "bg-plum/45"
            }
          />
        ))}
    </div>
  );
}

export default function GameSection() {
  const { t } = useLanguage();

  return (
    <section id="jogo" className="relative bg-dusk pt-20 pb-32 md:pt-24 md:pb-40">
      <div className="container-site grid items-center gap-16 lg:grid-cols-[1fr_0.8fr]">
        <div className="reveal">
          <p className="text-base font-medium text-sunset">{t("navGame")}</p>
          <h2 className="mt-2 font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-none">
            {t("gameTitle")}
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-[1.7] text-cream/85">
            {t("gameDescription")}
          </p>

          <ul className="mt-9 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {FEATURES.map((key) => (
              <li key={key} className="flex items-center gap-3.5 text-[17px]">
                <span aria-hidden="true" className="size-3 shrink-0 bg-sunset" />
                {t(key)}
              </li>
            ))}
          </ul>

          <p className="mt-9 border-l-4 border-ember pl-4 text-base text-haze">{t("gameNote")}</p>
        </div>

        <div className="reveal [--reveal-delay:150ms]">
          <MysteryBlock />
        </div>
      </div>

      <StepEdge className="bg-sunset" heights={[2, 1, 1, 0, 1, 1, 2, 3, 2, 1, 0, 1, 1, 2, 2, 3, 2, 1, 1, 2]} />
    </section>
  );
}
