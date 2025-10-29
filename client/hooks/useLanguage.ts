import { useState, useEffect, useCallback } from "react";
import { translate, Language } from "@/lib/translations";

export const useLanguage = () => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  // Update HTML lang attribute and localStorage on language change
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  // Memoized translation function
  const t = useCallback(
    (key: string): string => {
      return translate(key, language);
    },
    [language]
  );

  // Memoized toggle function
  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === "en" ? "bn" : "en"));
  }, []);

  // Memoized setLanguage function
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  return {
    language,
    t,
    toggleLanguage,
    setLanguage,
  };
};
