CREATE INDEX "cards_deck_id_idx" ON "cards" USING btree ("deckId");--> statement-breakpoint
CREATE INDEX "cards_deck_created_idx" ON "cards" USING btree ("deckId","createdAt");--> statement-breakpoint
CREATE INDEX "decks_user_id_idx" ON "decks" USING btree ("userId");