import { getDeckCards } from "@/db/queries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FlashcardStudy } from "./flashcard-study";
import { AddCardModal } from "@/components/AddCardModal";
import { Edit, Plus, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

interface DeckCardsContentProps {
  deckId: number;
  userId: string;
}

export async function DeckCardsContent({ deckId, userId }: DeckCardsContentProps) {
  try {
    // Load cards separately - this happens after the page is already shown
    const cards = await getDeckCards(deckId, userId);

    return (
      <>
        {/* Study Interface */}
        {cards.length > 0 ? (
          <div className="space-y-6">
            {/* Card count info */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {cards.length} card{cards.length !== 1 ? 's' : ''} in this deck
              </p>
            </div>
            
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
      </>
    );
  } catch (error) {
    console.error('Error loading deck cards:', error);
    
    // Error state
    return (
      <div className="text-center py-12">
        <Card className="max-w-md mx-auto border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" />
              Unable to load cards
            </CardTitle>
            <CardDescription>
              There was an issue loading the flashcards for this deck. You can still add new cards or try navigating back.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Link href={`/decks/${deckId}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </Link>
              <AddCardModal deckId={deckId} />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
} 