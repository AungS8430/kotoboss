import { db, eq, Deck } from "astro:db";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const decks = {
  createDeck: defineAction({
    accept: "form",
    input: z.object({
      user: z.string(),
      name: z.string()
    }),
    handler: async ({name, user}) => {
      if (user && name.trim() === "") {
        return { success: false, error: "Name cannot be blank." };
      }
      const updatedDecks = await db
        .insert(Deck)
        .values({ name: name, user: user, max_new_cards: 50, max_reviews: 500 })
        .returning();
      return { success: true };
    }
  }),
  editDeck: defineAction({
    accept: "form",
    input: z.object({
      user: z.string(),
      deck: z.number(),
      name: z.string(),
      max_reviews: z.number(),
      max_new_cards: z.number()
    }),
    handler: async ({user, deck, name, max_reviews, max_new_cards}) => {
      const orgDeck = (await db.select().from(Deck).where(eq(Deck.id, deck)))[0]
      if (orgDeck.user != user) {
        return { success: false, error: "Access denied." }
      }
      if (user && name.trim() === "") {
        return { success: false, error: "Name cannot be blank." };
      }
      const updatedDeck = await db
        .update(Deck)
        .set({ name: name, max_new_cards: max_new_cards, max_reviews: max_reviews })
        .where(eq(Deck.id, deck));
      return { success: true };
    }
  })
}
