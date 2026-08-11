// Bandeiras simplificadas em SVG (emojis de bandeira não aparecem no Windows).
// Todas usam a mesma proporção 3:2 para ficarem alinhadas no seletor.

function BrazilFlag(props) {
  return (
    <svg viewBox="0 0 30 20" aria-hidden="true" {...props}>
      <rect width="30" height="20" fill="#009c3b" />
      <path d="M15 2.2 27.6 10 15 17.8 2.4 10Z" fill="#ffdf00" />
      <circle cx="15" cy="10" r="4.6" fill="#002776" />
      <path d="M10.6 9.1c3-.9 6.2-.5 8.9 1" stroke="#fff" strokeWidth="0.9" fill="none" />
    </svg>
  );
}

function UsaFlag(props) {
  const stripe = 20 / 13;
  return (
    <svg viewBox="0 0 30 20" aria-hidden="true" {...props}>
      <rect width="30" height="20" fill="#fff" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} y={i * 2 * stripe} width="30" height={stripe} fill="#b22234" />
      ))}
      <rect width="12" height={stripe * 7} fill="#3c3b6e" />
    </svg>
  );
}

function SpainFlag(props) {
  return (
    <svg viewBox="0 0 30 20" aria-hidden="true" {...props}>
      <rect width="30" height="20" fill="#aa151b" />
      <rect y="5" width="30" height="10" fill="#f1bf00" />
    </svg>
  );
}

export const FLAGS = {
  "pt-BR": BrazilFlag,
  en: UsaFlag,
  es: SpainFlag,
};
