import { db, eq, Deck, Card } from "astro:db";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

export const decks = {
  createDeck: defineAction({
    accept: "form",
    input: z.object({
      user: z.string(),
      name: z.string()
    }),
    handler: async ({name, user}) => {
      if (!user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "User not logged in."
        })
      }
      if (user && name.trim() === "") {
        throw new ActionError({
          code: "NOT_ACCEPTABLE",
          message: "Name is required."
        })
      }
      const updatedDecks = await db
        .insert(Deck)
        .values({ name: name, user: user, max_new_cards: 50 })
        .returning();
      return { data: updatedDecks };
    }
  }),
  editDeck: defineAction({
    accept: "form",
    input: z.object({
      user: z.string(),
      deck: z.number(),
      name: z.string(),
      max_new_cards: z.number()
    }),
    handler: async ({user, deck, name, max_new_cards}) => {
      const orgDeck = (await db.select().from(Deck).where(eq(Deck.id, deck)))[0]
      if (orgDeck.user != user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Unauthorized Access."
        })
      }
      if (user && name.trim() === "") {
        throw new ActionError({
          code: "NOT_ACCEPTABLE",
          message: "Name is required."
        })
      }
      const updatedDeck = await db
        .update(Deck)
        .set({ name: name, max_new_cards: max_new_cards })
        .where(eq(Deck.id, deck));
      return { updatedDeck };
    }
  }),
  deleteDeck: defineAction({
    accept: "form",
    input: z.object({
      user: z.string(),
      deck: z.number()
    }),
    handler: async ({user, deck}) => {
      const orgDeck = (await db.select().from(Deck).where(eq(Deck.id, deck)))[0]
      if (orgDeck.user != user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Unauthorized Access."
        })
      }
      await db.delete(Card).where(eq(Card.deck, deck))
      await db.delete(Deck).where(eq(Deck.id, deck))
      return;
    }
  })
}
