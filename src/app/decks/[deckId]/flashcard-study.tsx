"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Card {
  id: number;
  front: string;
  back: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FlashcardStudyProps {
  cards: Card[];
}

export function FlashcardStudy({ cards }: FlashcardStudyProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState(new Set<number>());

  const currentCard = cards[currentIndex];
  const totalCards = cards.length;

  const nextCard = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setStudiedCards(prev => new Set([...prev, currentCard.id]));
    }
  };

  const resetProgress = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setStudiedCards(new Set());
  };

  if (!currentCard) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Progress</span>
          <span>{currentIndex + 1} of {totalCards}</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-300" 
            style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
          />
        </div>
        <div className="text-sm text-muted-foreground text-center">
          {studiedCards.size} of {totalCards} cards studied
        </div>
      </div>

      {/* Flashcard */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-2xl">
          <Card 
            className={cn(
              "cursor-pointer transition-all duration-300 min-h-[300px] flex items-center justify-center",
              "hover:shadow-lg",
              isFlipped && "bg-muted"
            )}
            onClick={flipCard}
          >
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-medium">
                  {isFlipped ? "Back" : "Front"}
                </div>
                <div className="text-2xl font-medium leading-relaxed">
                  {isFlipped ? currentCard.back : currentCard.front}
                </div>
                <div className="text-sm text-muted-foreground">
                  {isFlipped ? "Click to see front" : "Click to reveal answer"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-4">
        <Button 
          variant="outline" 
          onClick={prevCard}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <Button 
          variant="outline" 
          onClick={flipCard}
          className="min-w-[120px]"
        >
          {isFlipped ? "Show Front" : "Show Back"}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={nextCard}
          disabled={currentIndex === totalCards - 1}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Study Controls */}
      <div className="flex justify-center">
        <Button 
          variant="ghost" 
          onClick={resetProgress}
          className="text-muted-foreground"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Progress
        </Button>
      </div>

      {/* Study Stats */}
      {studiedCards.size === totalCards && (
        <Card className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
          <CardContent className="p-6 text-center">
            <div className="text-green-800 dark:text-green-200">
              <h3 className="text-lg font-semibold mb-2">🎉 Congratulations!</h3>
              <p>You've studied all {totalCards} cards in this deck!</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 