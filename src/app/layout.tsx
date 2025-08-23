import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { SignInModal, SignUpModal } from "@/components/auth-modals";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GoFlashCard - Learn with Smart Flashcards",
  description: "A modern flashcard application for effective learning",
};

function ClerkWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: "hsl(var(--primary))",
          colorBackground: "hsl(var(--background))",
          colorInputBackground: "hsl(var(--background))",
          colorText: "hsl(var(--foreground))",
        }
      }}
    >
      {children}
    </ClerkProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider>
          <ClerkWrapper>
            <div className="min-h-screen bg-background">
              <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                  <h1 className="text-xl font-bold text-foreground">GoFlashCard</h1>
                  <div className="flex items-center gap-4">
                    <SignedOut>
                      <SignInModal />
                      <SignUpModal />
                    </SignedOut>
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                  </div>
                </div>
              </header>
              <main className="bg-background text-foreground">
                {children}
              </main>
            </div>
          </ClerkWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
