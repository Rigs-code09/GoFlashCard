import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-73px)] bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Hero Section */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              GoFlashCard
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A flashcard application : Learn faster , one card at a time .
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="min-w-[140px]">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="min-w-[140px]">
              Browse Cards
            </Button>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Smart Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Adaptive flashcards that adjust to your learning pace and progress.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Beautiful UI</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Modern, responsive design with full dark mode support built with shadcn/ui.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track your learning journey with detailed analytics and insights.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
