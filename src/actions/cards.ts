import { db, eq, Deck, Card } from "astro:db";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

export const cards = {
  createCard: defineAction({
    accept: "form",
    input: z.object({
      user: z.string(),
      deck: z.number(),
      front: z.string(),
      back: z.string()
    }),
    handler: async ({ user, deck, front, back }) => {
      if (!user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "User not logged in."
        });
      }
      if (user && front.trim() === "") {
        throw new ActionError({
          code: "NOT_ACCEPTABLE",
          message: "Front is required."
        });
      }
      if (user && back.trim() === "") {
        throw new ActionError({
          code: "NOT_ACCEPTABLE",
          message: "Back is required."
        });
      }
      const updatedCards = await db
        .insert(Card)
        .values({ deck: deck, difficulty: 1, due: new Date('2099-12-31'), lapses: 0, learning_steps: 1, reps: 0, scheduled_days: 1, stability: 1, state: 0, front: front, back: back })
        .returning();
      return { data: updatedCards };
    }
  }),

  editCard: defineAction({
    accept: "form",
    input: z.object({
      user: z.string(),
      card: z.number(),
      front: z.string(),
      back: z.string()
    }),
    handler: async ({ user, card, front, back }) => {
      const orgCard = (await db.select().from(Card).where(eq(Card.id, card)))[0];
      if (!orgCard) {
        throw new ActionError({
          code: "NOT_FOUND",
          message: "Card not found."
        });
      }
      const deck = (await db.select().from(Deck).where(eq(Deck.id, orgCard.deck)))[0];
      if (!user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "User not logged in."
        });
      }
      if (deck.user !== user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Unauthorized Access."
        });
      }
      if (user && front.trim() === "") {
        throw new ActionError({
          code: "NOT_ACCEPTABLE",
          message: "Front is required."
        });
      }
      if (user && back.trim() === "") {
        throw new ActionError({
          code: "NOT_ACCEPTABLE",
          message: "Back is required."
        });
      }
      const updatedCard = await db
        .update(Card)
        .set({ front, back })
        .where(eq(Card.id, card));
      return { updatedCard };
    }
  }),
  deleteCard: defineAction({
    accept: "form",
    input: z.object({
      user: z.string(),
      card: z.number()
    }),
    handler: async ({ user, card }) => {
      const orgCard = (await db.select().from(Card).where(eq(Card.id, card)))[0];
      if (!orgCard) {
        throw new ActionError({
          code: "NOT_FOUND",
          message: "Card not found."
        });
      }
      const deck = (await db.select().from(Deck).where(eq(Deck.id, orgCard.deck)))[0];
      if (!user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "User not logged in."
        });
      }
      if (deck.user !== user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Unauthorized Access."
        });
      }
      await db.delete(Card).where(eq(Card.id, card));
      return { success: true };
    }
  })
}