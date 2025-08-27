import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserDecks } from "@/db/queries";
import { Plus } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }

  // Get user's decks
  const decks = await getUserDecks(userId);

  return (
    <div className="min-h-[calc(100vh-73px)] bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Welcome to your Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your flashcard decks and track your learning progress.
            </p>
          </div>

          {/* User Decks */}
          <div className="space-y-6">
            {decks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {decks.map((deck) => (
                  <Link key={deck.id} href={`/decks/${deck.id}`} className="block">
                    <Card className="bg-card border-border hover:shadow-lg transition-shadow flex flex-col h-full cursor-pointer hover:border-primary/50">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-semibold line-clamp-2 min-h-[3.5rem] leading-relaxed">
                          {deck.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 pt-0">
                        {deck.description ? (
                          <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                            {deck.description}
                          </CardDescription>
                        ) : (
                          <CardDescription className="text-sm text-muted-foreground italic">
                            No description provided
                          </CardDescription>
                        )}
                      </CardContent>
                      <CardFooter className="pt-4 border-t border-border/50">
                        <span className="text-xs text-muted-foreground">
                          Updated {new Date(deck.updatedAt).toLocaleDateString()}
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  You haven't created any decks yet.
                </p>
                <p className="text-sm text-muted-foreground">
                  Get started by creating your first flashcard deck!
                </p>
              </div>
            )}

            {/* Create New Deck Button */}
            <div className="flex justify-center pt-6">
              <Button 
                size="lg" 
                className="min-w-[200px]"
                variant="default"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Deck
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 