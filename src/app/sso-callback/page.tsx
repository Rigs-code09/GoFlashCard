"use client"

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SSOCallback() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard after a short delay if callback handling fails
    const timeout = setTimeout(() => {
      router.push("/dashboard")
    }, 5000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
      <AuthenticateWithRedirectCallback />
    </div>
  )
} 