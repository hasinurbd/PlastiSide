import { useState, useEffect, useCallback, useMemo } from "react";
import en from "@/locales/en.json";
import bn from "@/locales/bn.json";

type Language = "en" | "bn";

const translations = { en, bn } as const;

// Memoized language cache
const languageCache = new Map<string, string>();

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  // Update HTML lang attribute and localStorage
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "bn" ? "ltr" : "ltr"; // Both are LTR, but leaving for future RTL support
  }, [language]);

  // Get current translation object
  const currentTranslations = useMemo(() => {
    return translations[language];
  }, [language]);

  // Memoized translation function
  const t = useCallback(
    (key: string): string => {
      // Check cache first
      const cacheKey = `${language}:${key}`;
      if (languageCache.has(cacheKey)) {
        return languageCache.get(cacheKey)!;
      }

      const keys = key.split(".");
      let value: any = currentTranslations;

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          // Key not found, cache and return key
          languageCache.set(cacheKey, key);
          return key;
        }
      }

      const result = typeof value === "string" ? value : key;
      // Cache the result
      languageCache.set(cacheKey, result);
      return result;
    },
    [currentTranslations, language]
  );

  // Memoized toggle function
  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "bn" : "en"));
  }, []);

  // Memoized setLanguage function
  const setLanguageMemo = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  return {
    language,
    t,
    toggleLanguage,
    setLanguage: setLanguageMemo,
  };
};
