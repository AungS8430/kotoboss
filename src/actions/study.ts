import { db, eq, lt, and, Deck, Card, Studies } from "astro:db";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import {type Card as CardType, type CardInput, fsrs, type FSRSParameters, type RecordLog, type RecordLogItem} from "ts-fsrs";

import {
  createEmptyCard,
  generatorParameters,
  FSRS,
} from "ts-fsrs";

export const study = {
  fetchCard: defineAction({
    input: z.object({
      deck_id: z.number(),
      user: z.string(),
    }),
    handler: async ({ deck_id, user }) => {
      if (!user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "User not logged in."
        });
      }
      const deck = (await db.select().from(Deck).where(eq(Deck.id, deck_id)))[0];
      if (!deck) {
        throw new ActionError({
          code: "NOT_FOUND",
          message: "Deck not found."
        });
      }
      if (deck.user !== user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Unauthorized Access."
        });
      }
      let state = 0;
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      let cards = await db.select().from(Card).where(and(eq(Card.deck, deck_id), lt(Card.due, tomorrow))).orderBy(Card.due, Card.stability, Card.difficulty);
      const studies = (await db.select().from(Studies).where(and(eq(Studies.deck, deck_id), eq(Studies.user, user), eq(Studies.date, today))))[0];
      if (cards.length === 0) {
        cards = await db.select().from(Card).where(and(eq(Card.deck, deck_id), eq(Card.state, 0))).limit(deck.max_new_cards - studies.new).orderBy(Card.id);
        state = 1
      }
      if (cards.length === 0) {
        state = -1
      }
      return { card: cards[0] || null, status: state };
    }
  }),
  studyAction: defineAction({
    input: z.object({
      deck_id: z.number(),
      card_id: z.number(),
      user: z.string(),
      grade: z.number()
    }),
    handler: async ({deck_id, card_id, user, grade}) => {
      if (!user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "User not logged in."
        });
      }
      const deck = (await db.select().from(Deck).where(eq(Deck.id, deck_id)))[0];
      if (!deck) {
        throw new ActionError({
          code: "NOT_FOUND",
          message: "Deck not found."
        });
      }
      if (deck.user !== user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Unauthorized Access."
        });
      }

      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const card = (await db.select().from(Card).where(and(eq(Card.deck, deck_id), eq(Card.id, card_id))))[0];

      let fsrsCard: CardInput = card;
      const params: FSRSParameters = generatorParameters();
      const f: FSRS = new FSRS(params);
      await f.next(fsrsCard, new Date(), grade, (async (R: RecordLogItem) => {
        await db.update(Card).set(R.card).where(and(eq(Card.id, card.id), eq(Card.deck, deck_id)));
      }))

      // Update studies
      const studies = (await db.select().from(Studies).where(and(eq(Studies.deck, deck_id), eq(Studies.user, user), eq(Studies.date, today))))[0];

      if (studies) {
        await db.update(Studies)
          .set({
            count: studies.count + 1,
            new: card.state === 0 ? studies.new + 1 : studies.new
          })
          .where(and(eq(Studies.deck, deck_id), eq(Studies.user, user), eq(Studies.date, today)));
      } else {
        await db.insert(Studies)
          .values({
            deck: deck_id,
            user,
            count: 1,
            date: today,
            new: card.state === 0 ? 1 : 0
          })
      }

      return true;
    }
  }),
  fetchStudies: defineAction({
    input: z.object({
      deck_id: z.number(),
      user: z.string(),
    }),
    handler: async ({ deck_id, user }) => {
      if (!user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "User not logged in."
        });
      }
      const deck = (await db.select().from(Deck).where(eq(Deck.id, deck_id)))[0];
      if (!deck) {
        throw new ActionError({
          code: "NOT_FOUND",
          message: "Deck not found."
        });
      }
      if (deck.user !== user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Unauthorized Access."
        });
      }
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const studies = (await db.select().from(Studies).where(eq(Studies.date, today))).find(s => s.deck === deck_id) || { new: 0 }
      const cards = await db.select().from(Card).where(eq(Card.deck, deck.id))
      return {
        new: Math.max(0, Math.min(deck.max_new_cards - studies.new, cards.filter(card => card.state === 0).length)),
        learn: cards.filter(card => card.state === (1 || 3)).length,
        review: cards.filter(card => card.state === 2 && card.due && new Date(card.due) < tomorrow).length
      }
    }
  }),
  fetchDeckName: defineAction({
    input: z.object({
      deck_id: z.number(),
      user: z.string(),
    }),
    handler: async ({ deck_id, user }) => {
      if (!user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "User not logged in."
        });
      }
      const deck = (await db.select().from(Deck).where(eq(Deck.id, deck_id)))[0];
      if (!deck) {
        throw new ActionError({
          code: "NOT_FOUND",
          message: "Deck not found."
        });
      }
      if (deck.user !== user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Unauthorized Access."
        });
      }
      return deck.name;
    }
  })
};