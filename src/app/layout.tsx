import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Christopher Blackwell | Full-Stack Developer",
  description: "Full-stack developer specializing in modern web technologies, AI integration, and creating exceptional user experiences.",
  keywords: ["developer", "portfolio", "full-stack", "react", "nextjs", "typescript"],
  authors: [{ name: "Christopher Blackwell" }],
  openGraph: {
    title: "Christopher Blackwell | Full-Stack Developer",
    description: "Full-stack developer specializing in modern web technologies",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}