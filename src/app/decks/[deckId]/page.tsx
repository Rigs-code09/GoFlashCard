import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDeckById, getDeckCards } from "@/db/queries";
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, Plus, Edit } from "lucide-react";
import { FlashcardStudy } from "./flashcard-study";
import { AddCardModal } from "@/components/AddCardModal";

interface DeckPageProps {
  params: {
    deckId: string;
  };
}

export default async function DeckPage({ params }: DeckPageProps) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }

  const deckId = parseInt(params.deckId, 10);
  
  if (isNaN(deckId)) {
    notFound();
  }

  // Get deck and cards
  const [deck, cards] = await Promise.all([
    getDeckById(deckId, userId),
    getDeckCards(deckId, userId)
  ]);

  if (!deck) {
    notFound();
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                {deck.title}
              </h1>
              {deck.description && (
                <p className="text-xl text-muted-foreground">
                  {deck.description}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{cards.length} cards</span>
                <span>•</span>
                <span>Updated {new Date(deck.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Study Interface */}
          {cards.length > 0 ? (
            <div className="space-y-6">
              <FlashcardStudy cards={cards} />
              
              {/* Card Management */}
              <div className="flex flex-wrap gap-4 justify-center">
                <AddCardModal deckId={deckId} />
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Deck
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Card className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle>No cards yet</CardTitle>
                  <CardDescription>
                    This deck doesn't have any flashcards yet. Add some cards to start studying!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AddCardModal 
                    deckId={deckId}
                    trigger={
                      <Button className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Card
                      </Button>
                    }
                  />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 