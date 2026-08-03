import { ref } from "vue";
import { messages } from "./messages";
import { productText } from "./productLocale";

const STORAGE_KEY = "svastaonica-locale";
const saved = typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
const locale = ref(saved === "en" || saved === "hr" ? saved : "hr");

function applyDocumentLang(lang) {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lang === "en" ? "en" : "hr";
  }
}

applyDocumentLang(locale.value);

export function useI18n() {
  function t(key) {
    const dict = messages[locale.value] || messages.hr;
    const value = key.split(".").reduce((obj, part) => obj?.[part], dict);
    return value ?? key;
  }

  /** Localized product field (name / subheading / description) with HR fallback. */
  function pt(product, field) {
    return productText(product, field, locale.value);
  }

  function setLocale(lang) {
    if (lang !== "hr" && lang !== "en") return;
    locale.value = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyDocumentLang(lang);
  }

  return { locale, t, pt, setLocale };
}
