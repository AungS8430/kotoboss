import { defineDb, defineTable, column } from 'astro:db';

const Studies = defineTable({
  columns: {
    deck: column.number(),
    user: column.text(),
    date: column.date(),
    count: column.number(),
    new: column.number()
  },
  indexes: [
    {
      on: ["deck", "date", "user"],
      unique: true,
      name: "id"
    }
  ]
})

const Card = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    deck: column.number(),
    difficulty: column.number(),
    elapsed_days: column.number(),
    due: column.date(),
    lapses: column.number(),
    last_review: column.date({ optional: true }),
    learning_steps: column.number(),
    reps: column.number(),
    scheduled_days: column.number(),
    stability: column.number(),
    state: column.number(),
    media: column.text({ optional: true }),
    front: column.text(),
    back: column.text()
  }
})

const Deck = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    user: column.text(),
    name: column.text(),
    max_new_cards: column.number(),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: { Card, Deck, Studies }
});
