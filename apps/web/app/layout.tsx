import "@workspace/design-system/globals.css";
import { Providers } from "@/components/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background font-sans text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
