// Ícones SVG do site. Todos usam `currentColor`.

export function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

export function YouTubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M21.3 7.2a2.8 2.8 0 0 0-2-2C17.5 4.7 12 4.7 12 4.7s-5.5 0-7.3.5a2.8 2.8 0 0 0-2 2A28 28 0 0 0 2.2 12a28 28 0 0 0 .5 4.8 2.8 2.8 0 0 0 2 2c1.8.5 7.3.5 7.3.5s5.5 0 7.3-.5a2.8 2.8 0 0 0 2-2 28 28 0 0 0 .5-4.8 28 28 0 0 0-.5-4.8ZM10 8.8l5.2 3.2-5.2 3.2V8.8Z"
      />
    </svg>
  );
}

export function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M14.2 3c.3 1.8 1.3 3.1 3 3.9 1 .5 1.9.7 2.8.8v2.8c-1.6-.1-3.2-.6-4.6-1.5v5.8a5.4 5.4 0 1 1-5.4-5.4c.5 0 .9.1 1.4.2v2.8a2.6 2.6 0 1 0 1.9 2.5V3h.9Z"
      />
    </svg>
  );
}

export function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} aria-hidden="true" {...props}>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DiscordIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M19.5 5.3A16 16 0 0 0 15.8 4l-.5 1a14 14 0 0 0-6.6 0l-.5-1a16 16 0 0 0-3.7 1.3C2.1 8.8 1.4 12.2 1.7 15.6a15 15 0 0 0 4.6 2.3l1.1-1.5a10 10 0 0 1-1.7-.8l.4-.3c3.3 1.5 7 1.5 10.3 0l.4.3a10 10 0 0 1-1.7.8l1.1 1.5a15 15 0 0 0 4.6-2.3c.4-4-.7-7.3-1.3-10.3ZM8.3 14c-1 0-1.8-.9-1.8-2s.8-2 1.8-2c1 0 1.8.9 1.8 2s-.8 2-1.8 2Zm7.4 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2c1 0 1.8.9 1.8 2s-.8 2-1.8 2Z"
      />
    </svg>
  );
}
