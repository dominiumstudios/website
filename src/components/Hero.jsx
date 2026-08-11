import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { useHeroDock } from "../context/HeroDockContext.jsx";
import StepEdge from "./StepEdge.jsx";

const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Tamanho e posição iniciais do "D" grande, por faixa de largura de tela. */
function startPose(vw, vh) {
  const mobile = vw <= 560;
  const tablet = vw <= 900;

  // Limites de largura e altura impedem o "D" de invadir o texto em telas baixas.
  const size = mobile
    ? Math.min(vw * 0.68, vh * 0.36, 280)
    : tablet
      ? Math.min(vw * 0.56, vh * 0.42, 340)
      : Math.min(vw * 0.34, vh * 0.49, 390);

  return { size, x: vw / 2, y: vh * (mobile ? 0.26 : tablet ? 0.28 : 0.3) };
}

/**
 * Abertura em rolagem "presa" (estilo Apple): o site começa com o "D" grande
 * no centro; ao rolar, o texto some e o "D" viaja até o logo do cabeçalho.
 */
export default function Hero() {
  const { t } = useLanguage();
  const { brandRef, setChrome } = useHeroDock();

  const heroRef = useRef(null);
  const copyRef = useRef(null);
  const logoRef = useRef(null);
  const cueRef = useRef(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const copy = copyRef.current;
    const logo = logoRef.current;
    const cue = cueRef.current;

    let start = null;
    let end = null;
    let frame = 0;

    function measure() {
      start = startPose(window.innerWidth, window.innerHeight);
      const b = brandRef.current?.getBoundingClientRect();
      end = b
        ? { size: b.width, x: b.left + b.width / 2, y: b.top + b.height / 2 }
        : { ...start, size: 0 };

      logo.style.width = `${start.size}px`;
      logo.style.height = `${start.size}px`;
    }

    function update() {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const vh = window.innerHeight;
      const travel = Math.max(hero.offsetHeight - vh, 1);
      const progress = clamp(-rect.top / travel);

      // Viagem longa e suave, só depois de a composição inicial ficar um instante.
      const dock = easeInOut(clamp((progress - 0.2) / 0.6));
      // O texto some cedo, antes de o "D" poder cruzar por cima dele.
      const copyFade = 1 - easeInOut(clamp((progress - 0.13) / 0.18));
      // Troca para o logo do cabeçalho só no finalzinho.
      const handoff = easeInOut(clamp((progress - 0.73) / 0.1));

      const size = lerp(start.size, end.size, dock);
      const x = lerp(start.x, end.x, dock);
      const y = lerp(start.y, end.y, dock);

      logo.style.transform = `translate3d(${x - start.size / 2}px, ${y - start.size / 2}px, 0) scale(${size / start.size})`;
      logo.style.opacity = rect.bottom < 0 ? "0" : `${1 - handoff}`;

      copy.style.opacity = `${copyFade}`;
      copy.style.transform = `translate(-50%, -50%) translateY(${lerp(0, -16, 1 - copyFade)}px)`;
      copy.style.pointerEvents = copyFade < 0.2 ? "none" : "";
      cue.style.opacity = `${clamp(1 - progress * 3.4)}`;

      // O menu fica ausente enquanto o "D" está grande e só aparece perto do fim.
      const visible = rect.bottom < 0 || progress > 0.58 || rect.bottom < vh * 0.7;
      const docked = rect.bottom < 0 || progress > 0.7 || rect.bottom < vh * 0.56;
      setChrome(visible, docked);
    }

    function requestUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    function remeasure() {
      measure();
      update();
    }

    remeasure();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", remeasure);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", remeasure);
      setChrome(true, true);
    };
  }, [brandRef, setChrome]);

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative h-[205svh] min-[561px]:h-[220svh] min-[901px]:h-[235svh]"
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-[radial-gradient(circle_at_50%_40%,rgb(110_4_10/0.15),transparent_25%),var(--color-dusk-deep)]">
        {/* Grade sutil e brilho vermelho atrás do "D" */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.03)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.03)_1px,transparent_1px)] bg-size-[80px_80px] opacity-[0.12] mask-[radial-gradient(circle_at_center,#000_16%,transparent_68%)]"
        />
        <div
          aria-hidden="true"
          className="absolute top-[38%] left-1/2 h-[340px] w-[560px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgb(130_5_10/0.14)] blur-[90px]"
        />

        <div
          ref={copyRef}
          style={{ transform: "translate(-50%, -50%)" }}
          className="absolute top-[66%] left-1/2 w-[92%] max-w-[760px] text-center will-change-[opacity,transform] min-[561px]:top-[70%] min-[561px]:w-[90%] min-[901px]:top-[74%]"
        >
          <h1 className="text-[1.45rem] leading-[1.2] font-light tracking-[0.18em] uppercase min-[561px]:text-[clamp(1.75rem,3.15vw,2.95rem)] min-[561px]:tracking-[0.28em]">
            Dominium Studios
          </h1>
          <p className="mt-3.5 text-[0.9rem] text-haze min-[561px]:mt-[18px] min-[561px]:text-[clamp(0.95rem,1.1vw,1.05rem)]">
            {t("heroSubtitle")}
          </p>
          <Link
            to="/#sobre"
            className="mx-auto mt-[22px] flex w-max flex-col items-center gap-2 text-[0.9rem] text-ember before:mb-2 before:h-px before:w-[72px] before:bg-[linear-gradient(90deg,transparent,var(--color-ember),transparent)] before:content-[''] min-[561px]:mt-[30px]"
          >
            {t("heroExplore")}
            <span aria-hidden="true" className="text-lg">
              ↓
            </span>
          </Link>
        </div>

        {/* Indicador de rolagem (só em telas largas) */}
        <div
          ref={cueRef}
          aria-hidden="true"
          className="absolute top-1/2 left-[34px] hidden -translate-y-1/2 items-start gap-3 min-[901px]:flex"
        >
          <span className="relative block h-[156px] w-px overflow-hidden bg-[#373333]">
            <span className="absolute -left-px block h-4 w-[3px] animate-scroll-cue bg-ember" />
          </span>
          <span className="text-[0.6rem] tracking-[0.18em] text-ember uppercase">{t("scrollCue")}</span>
        </div>
      </div>

      {/* "D" flutuante: fixo na tela, movido via transform a cada quadro */}
      <img
        ref={logoRef}
        src="/assets/dominium.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[60] origin-center object-contain drop-shadow-[0_20px_40px_rgb(0_0_0/0.55)] will-change-transform"
      />

      <StepEdge className="z-10 bg-peach" />
    </section>
  );
}
