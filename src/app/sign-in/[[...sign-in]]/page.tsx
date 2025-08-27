import { SignIn } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function SignInPage() {
  const { userId } = await auth()
  
  // If user is already signed in, redirect to dashboard
  if (userId) {
    redirect("/dashboard")
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Header with navigation */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-foreground hover:text-foreground/80 transition-colors">
            GoFlashCard
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <X className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Sign-in form */}
      <div className="flex items-center justify-center min-h-[calc(100vh-73px)] p-4">
        <div className="w-full max-w-sm">
          <SignIn 
            fallbackRedirectUrl="/dashboard"
            signUpFallbackRedirectUrl="/sign-up"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-background border-border shadow-lg rounded-lg",
                headerTitle: "text-foreground",
                headerSubtitle: "text-muted-foreground",
                formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
                formFieldInput: "bg-background border-border text-foreground",
                footerActionText: "text-muted-foreground",
                footerActionLink: "text-primary hover:text-primary/90",
                dividerLine: "bg-border",
                dividerText: "text-muted-foreground",
              }
            }}
          />
        </div>
      </div>
    </div>
  )
} 