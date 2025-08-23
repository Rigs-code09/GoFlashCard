"use client"

import { SignIn, SignUp } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface SignInModalProps {
  children?: React.ReactNode
}

export function SignInModal({ children }: SignInModalProps) {
  return (
    <Dialog>
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
        </DialogHeader>
        <SignIn 
          routing="hash"
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
  return (
    <Dialog>
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
        </DialogHeader>
        <SignUp 
          routing="hash"
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