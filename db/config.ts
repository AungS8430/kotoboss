import { defineDb, defineTable, column } from 'astro:db';

const Card = defineTable({
  columns: {
    id: column.number(),
    deck: column.number(),
    difficulty: column.number(),
    due: column.date(),
    elapsed_days: column.number(),
    lapses: column.number(),
    last_review: column.date({ optional: true }),
    learning_steps: column.number(),
    reps: column.number(),
    scheduled_days: column.number(),
    stability: column.number(),
    state: column.number(),
    media: column.text({ optional: true })
  }
})

const Deck = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    user: column.text(),
    name: column.text(),
    max_new_cards: column.number(),
    max_reviews: column.number(),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: { Card, Deck }
});
