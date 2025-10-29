import en from "@/locales/en.json";
import bn from "@/locales/bn.json";

export type Language = "en" | "bn";

const translations = { en, bn } as const;

// Cache for translated strings to avoid repeated lookups
class TranslationCache {
  private cache = new Map<string, string>();

  get(key: string): string | undefined {
    return this.cache.get(key);
  }

  set(key: string, value: string): void {
    this.cache.set(key, value);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

const cache = new TranslationCache();

/**
 * Translate a key to the current language
 * Supports nested keys with dot notation: "auth.email"
 */
export function translate(key: string, language: Language): string {
  const cacheKey = `${language}:${key}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  const keys = key.split(".");
  let value: any = translations[language];

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      // Key not found
      cache.set(cacheKey, key);
      return key;
    }
  }

  const result = typeof value === "string" ? value : key;
  cache.set(cacheKey, result);
  return result;
}

/**
 * Check if a translation key exists
 */
export function hasTranslation(key: string, language: Language): boolean {
  const keys = key.split(".");
  let value: any = translations[language];

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return false;
    }
  }

  return typeof value === "string";
}

/**
 * Get all available languages
 */
export function getAvailableLanguages(): Language[] {
  return ["en", "bn"];
}

/**
 * Clear the translation cache (useful for hot reload)
 */
export function clearTranslationCache(): void {
  cache.clear();
}

/**
 * Get language name in its own language
 */
export function getLanguageName(language: Language): string {
  return translate("common.languageName", language);
}
