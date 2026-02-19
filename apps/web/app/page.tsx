import { LmsScreen } from "@/components/lms-screen";
import { resolveLocale } from "@/lib/i18n";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const locale = resolveLocale(resolvedSearchParams?.lang);

  return <LmsScreen locale={locale} />;
}
