import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { translate, Language } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Bangla only - no language switching
  const language: Language = "bn";

  // Set HTML lang attribute on mount
  useEffect(() => {
    document.documentElement.lang = "bn";
  }, []);

  // Memoized translation function
  const t = useCallback(
    (key: string): string => {
      return translate(key, "bn");
    },
    [],
  );

  // No-op functions for compatibility
  const toggleLanguage = useCallback(() => {
    // Language switching disabled - Bangla only
  }, []);

  const setLanguage = useCallback(() => {
    // Language switching disabled - Bangla only
  }, []);

  const value = useMemo(
    () => ({
      language,
      t,
      toggleLanguage,
      setLanguage,
    }),
    [t],
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
