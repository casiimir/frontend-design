import { en } from "@/lib/locales/en";
import { it } from "@/lib/locales/it";

export const SUPPORTED_LOCALES = ["it", "en"] as const;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

const MESSAGES = {
  en,
  it,
} as const;

export type AppMessages = (typeof MESSAGES)[AppLocale];
export type LmsDictionary = AppMessages["ui"];
export type MockDictionary = AppMessages["mock"];

export function resolveLocale(rawLocale: string | null | undefined): AppLocale {
  if (!rawLocale) {
    return "it";
  }

  const normalizedLocale = rawLocale.toLowerCase();

  return SUPPORTED_LOCALES.includes(normalizedLocale as AppLocale)
    ? (normalizedLocale as AppLocale)
    : "it";
}

export function getMessages(locale: AppLocale): AppMessages {
  return MESSAGES[locale];
}

export function getLmsDictionary(locale: AppLocale): LmsDictionary {
  return getMessages(locale).ui;
}

export function getMockDictionary(locale: AppLocale): MockDictionary {
  return getMessages(locale).mock;
}
