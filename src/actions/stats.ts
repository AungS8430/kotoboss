import { db, and, eq, sum, Deck, Studies } from "astro:db";
import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";

export const stats = {
  getDecks: defineAction({
    input: z.object({
      user: z.string(),
    }),
    handler: async ({ user }) => {
      if (!user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "User not logged in."
        });
      }
      const decks = await db.select().from(Deck).where(eq(Deck.user, user));
      return { decks };
    }
  }),
  getStudies: defineAction({
    input: z.object({
      user: z.string(),
      deck: z.number().optional(),
    }),
    handler: async ({ user, deck }) => {
      if (!user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "User not logged in."
        });
      }
      if (deck) {
        const study = (await db.select().from(Studies).where(and(eq(Studies.deck, deck), eq(Studies.user, user)))).sort((a, b) => a.date.getTime() - b.date.getTime());
        if (!study || study.length === 0) {
          throw new ActionError({
            code: "NOT_FOUND",
            message: "No study data found for this deck."
          });
        }
        return { data: study };
      } else {
        const studies = await db.select({ date: Studies.date, user: Studies.user, count: sum(Studies.count),new: sum(Studies.new), learning: sum(Studies.learning), relearning: sum(Studies.relearning), young: sum(Studies.young), mature: sum(Studies.mature) }).from(Studies).where(eq(Studies.user, user)).groupBy(Studies.date).orderBy(Studies.date);
        if (!studies || studies.length === 0) {
          throw new ActionError({
            code: "NOT_FOUND",
            message: "No study data found for this user."
          });
        }
        const normalizedStudies = studies.map(s => ({
          ...s,
          count: Number(s.count),
          new: Number(s.new),
          learning: Number(s.learning),
          relearning: Number(s.relearning),
          young: Number(s.young),
          mature: Number(s.mature),
        }));
        return { data: normalizedStudies };
      }
    }
  })
}