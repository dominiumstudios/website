import { useLanguage } from "../i18n/LanguageContext.jsx";
import { DISCORD_URL, EMAIL, INSTAGRAM_URL, TIKTOK_URL, YOUTUBE_URL } from "../links.js";
import { DiscordIcon, InstagramIcon, MailIcon, TikTokIcon, YouTubeIcon } from "./icons.jsx";
import StepEdge from "./StepEdge.jsx";

const CHANNELS = [
  { name: "Discord", href: DISCORD_URL, Icon: DiscordIcon, descKey: "discordDesc", primary: true },
  { name: "YouTube", href: YOUTUBE_URL, Icon: YouTubeIcon, descKey: "youtubeDesc" },
  { name: "TikTok", href: TIKTOK_URL, Icon: TikTokIcon, descKey: "tiktokDesc" },
  { name: "Instagram", href: INSTAGRAM_URL, Icon: InstagramIcon, descKey: "instagramDesc" },
];

export default function Community() {
  const { t } = useLanguage();

  return (
    <section id="contato" className="relative bg-sunset pt-16 pb-32 text-dusk md:pt-20 md:pb-40">
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="reveal">
          <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02]">
            {t("communityTitle")}
          </h2>
          <p className="mt-5 max-w-[40ch] text-lg leading-[1.7] text-dusk/85">{t("communityText")}</p>

          <a
            href={`mailto:${EMAIL}`}
            className="group mt-10 inline-flex items-center gap-3.5 text-dusk"
          >
            <span className="grid size-11 shrink-0 place-items-center border-2 border-dusk">
              <MailIcon className="size-5" />
            </span>
            <span>
              <span className="block text-sm text-dusk/70">{t("emailLabel")}</span>
              <span className="font-bold break-all underline decoration-2 underline-offset-4 group-hover:decoration-ember">
                {EMAIL}
              </span>
            </span>
          </a>
        </div>

        <ul className="reveal grid gap-4 sm:grid-cols-2 [--reveal-delay:150ms]">
          {CHANNELS.map(({ name, href, Icon, descKey, primary }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-block min-h-24 w-full justify-start gap-4 px-5 py-4 text-left ${
                  primary ? "bg-dusk text-cream" : "bg-cream text-dusk"
                }`}
              >
                <Icon className={`size-8 shrink-0 ${primary ? "text-cream" : "text-ember"}`} />
                <span>
                  <span className="block text-lg leading-tight font-bold">{name}</span>
                  <span className={`block text-sm font-normal ${primary ? "text-haze" : "text-dusk/70"}`}>
                    {t(descKey)}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <StepEdge className="bg-dusk-deep" heights={[1, 1, 2, 1, 0, 1, 2, 2, 3, 2, 1, 1, 0, 1, 2, 1, 1, 2, 3, 2]} />
    </section>
  );
}
