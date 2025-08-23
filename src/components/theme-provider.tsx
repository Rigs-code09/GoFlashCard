"use client"

import * as React from "react"

type ThemeProviderProps = {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  React.useEffect(() => {
    const root = window.document.documentElement
    // Always set dark mode
    root.classList.remove("light", "system")
    root.classList.add("dark")
  }, [])

  return <>{children}</>
}

// Keep the hook for compatibility but always return dark theme
export const useTheme = () => {
  return {
    theme: "dark" as const,
    setTheme: () => {}, // No-op since theme is always dark
  }
} 