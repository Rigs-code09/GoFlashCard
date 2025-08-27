import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserDeckStats } from "@/db/queries";

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }

  // Get user's deck statistics using query helper
  const totalDecks = await getUserDeckStats(userId);

  return (
    <div className="min-h-[calc(100vh-73px)] bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Welcome to your Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your flashcard decks and track your learning progress.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Decks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{totalDecks}</div>
                <CardDescription className="text-xs text-muted-foreground">
                  {totalDecks === 0 ? "Create your first deck to get started" : "Keep building your collection"}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Study Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">0</div>
                <CardDescription className="text-xs text-muted-foreground">
                  Start studying to track your progress
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Cards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">0</div>
                <CardDescription className="text-xs text-muted-foreground">
                  Add cards to your decks to start learning
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-card border-border hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">Create New Deck</CardTitle>
                  <CardDescription>
                    Start a new flashcard deck for any subject or topic.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="default" className="w-full">
                    Create Deck
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">Browse My Decks</CardTitle>
                  <CardDescription>
                    View and manage all your existing flashcard decks.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    View Decks
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">Study Mode</CardTitle>
                  <CardDescription>
                    Start a study session with your flashcards.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="secondary" className="w-full" disabled={totalDecks === 0}>
                    {totalDecks === 0 ? "Create a deck first" : "Start Studying"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Recent Activity</h2>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    {totalDecks === 0 
                      ? "Create your first deck to see activity here." 
                      : "Your recent study sessions and deck updates will appear here."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 