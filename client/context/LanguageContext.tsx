import { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from "react";
import en from "@/locales/en.json";
import bn from "@/locales/bn.json";

type Language = "en" | "bn";

interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const translations = { en, bn } as const;
const languageCache = new Map<string, string>();

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  // Update HTML lang attribute and localStorage
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  // Memoized translation function
  const t = useCallback(
    (key: string): string => {
      const cacheKey = `${language}:${key}`;
      if (languageCache.has(cacheKey)) {
        return languageCache.get(cacheKey)!;
      }

      const keys = key.split(".");
      let value: any = translations[language];

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          languageCache.set(cacheKey, key);
          return key;
        }
      }

      const result = typeof value === "string" ? value : key;
      languageCache.set(cacheKey, result);
      return result;
    },
    [language]
  );

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === "en" ? "bn" : "en"));
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const value = useMemo(
    () => ({
      language,
      t,
      toggleLanguage,
      setLanguage,
    }),
    [language, t, toggleLanguage, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
