"use client"

import { useState, useEffect } from "react"
import { SignIn, SignUp } from "@clerk/nextjs"
import { useAuth } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface SignInModalProps {
  children?: React.ReactNode
}

export function SignInModal({ children }: SignInModalProps) {
  const [open, setOpen] = useState(false)
  const { isSignedIn } = useAuth()

  // Close modal when user signs in
  useEffect(() => {
    if (isSignedIn) {
      setOpen(false)
    }
  }, [isSignedIn])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-sm w-full mx-4 p-0 border-0 shadow-none">
        <DialogHeader className="sr-only">
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Access your flashcard decks by signing in to your account
          </DialogDescription>
        </DialogHeader>
        <SignIn 
          routing="virtual"
          redirectUrl="/dashboard"
          afterSignInUrl="/dashboard"
          signUpFallbackRedirectUrl="/dashboard"
          appearance={{
            baseTheme: dark,
            elements: {
              rootBox: "w-full",
              card: "shadow-none border-none w-full rounded-lg p-6",
              formButtonPrimary: "text-sm",
              formFieldInput: "text-sm",
              footerActionText: "text-sm",
              footerActionLink: "text-sm",
            }
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

interface SignUpModalProps {
  children?: React.ReactNode
}

export function SignUpModal({ children }: SignUpModalProps) {
  const [open, setOpen] = useState(false)
  const { isSignedIn } = useAuth()

  // Close modal when user signs in
  useEffect(() => {
    if (isSignedIn) {
      setOpen(false)
    }
  }, [isSignedIn])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="default" size="sm">
            Sign Up
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-sm w-full mx-4 p-0 border-0 shadow-none">
        <DialogHeader className="sr-only">
          <DialogTitle>Sign Up</DialogTitle>
          <DialogDescription>
            Create a new account to start building your flashcard collection
          </DialogDescription>
        </DialogHeader>
        <SignUp 
          routing="virtual"
          redirectUrl="/dashboard"
          afterSignUpUrl="/dashboard"
          signInFallbackRedirectUrl="/dashboard"
          appearance={{
            baseTheme: dark,
            elements: {
              rootBox: "w-full",
              card: "shadow-none border-none w-full rounded-lg p-6",
              formButtonPrimary: "text-sm",
              formFieldInput: "text-sm",
              footerActionText: "text-sm",
              footerActionLink: "text-sm",
            }
          }}
        />
      </DialogContent>
    </Dialog>
  )
} 