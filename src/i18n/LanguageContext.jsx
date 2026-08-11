import { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_LANGUAGE, translations } from "./translations.js";

const STORAGE_KEY = "dominium-language";

const LanguageContext = createContext(null);

/** Converte um código de idioma ("pt-PT", "en-US", "es-MX"…) para um suportado. */
function matchLanguage(code) {
  if (!code) return null;
  if (translations[code]) return code;
  const base = code.toLowerCase().split("-")[0];
  if (base === "pt") return "pt-BR";
  return translations[base] ? base : null;
}

function readSavedLanguage() {
  try {
    return matchLanguage(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null; // Armazenamento indisponível (ex.: navegação privada).
  }
}

function detectDeviceLanguage() {
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const code of preferred) {
    const match = matchLanguage(code);
    if (match) return match;
  }
  return null;
}

/** Ordem: escolha salva da pessoa → idioma do aparelho → padrão (PT-BR). */
function initialLanguage() {
  return readSavedLanguage() ?? detectDeviceLanguage() ?? DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(initialLanguage);
  const dictionary = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = dictionary.pageTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", dictionary.metaDescription);
  }, [language, dictionary]);

  // Só salva quando a pessoa escolhe; até lá, o site segue o idioma do aparelho.
  function setLanguage(next) {
    const lang = matchLanguage(next) ?? DEFAULT_LANGUAGE;
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Armazenamento indisponível — a escolha vale só para esta visita.
    }
  }

  const value = {
    language,
    setLanguage,
    t: (key) => dictionary[key] ?? "",
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage precisa estar dentro de <LanguageProvider>");
  }
  return context;
}
