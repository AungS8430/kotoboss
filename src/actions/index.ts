import { db, Deck } from "astro:db";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  createDeck: defineAction({
    accept: "form",
    input: z.object({
      user: z.string(),
      name: z.string()
    }),
    handler: async ({name, user}) => {
      const updatedDecks = await db
        .insert(Deck)
        .values({ name: name, user: user, max_new_cards: 50, max_reviews: 500 })
        .returning();
      return { success: true };
    }
  })
}
