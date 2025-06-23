import { db, Deck, Card } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Deck).values([
		{ id: 1, user: "aungshome@outlook.com", name: "Test 1", max_new_cards: 10, max_reviews: 100 },
		{ id: 2, user: "aungshome@outlook.com", name: "Test 2", max_new_cards: 10, max_reviews: 100 },
		{ id: 3, user: "john@doe.gg", name: "Not Shown", max_new_cards: 10, max_reviews: 100}
	])
	await db.insert(Card).values([
		// Deck 1
		{ id: 1, difficulty: 2, due: new Date('2024-06-01'), elapsed_days: 0, lapses: 0, last_review: null, learning_steps: 1, reps: 0, scheduled_days: 1, stability: 2, state: 0, media: "Card 1 for Deck 1", deck: 1 },
		{ id: 2, difficulty: 3, due: new Date('2024-06-02'), elapsed_days: 1, lapses: 1, last_review: new Date('2024-05-31'), learning_steps: 2, reps: 1, scheduled_days: 2, stability: 3, state: 1, media: "Card 2 for Deck 1", deck: 1 },
		{ id: 3, difficulty: 1, due: new Date('2024-06-03'), elapsed_days: 2, lapses: 0, last_review: new Date('2024-06-01'), learning_steps: 1, reps: 2, scheduled_days: 3, stability: 1, state: 0, media: "Card 3 for Deck 1", deck: 1 },
		{ id: 4, difficulty: 2, due: new Date('2024-06-10'), elapsed_days: 3, lapses: 0, last_review: new Date('2024-06-08'), learning_steps: 2, reps: 3, scheduled_days: 4, stability: 2, state: 1, media: "Card 4 for Deck 1", deck: 1 },
		{ id: 5, difficulty: 1, due: new Date('2024-06-11'), elapsed_days: 4, lapses: 1, last_review: new Date('2024-06-09'), learning_steps: 1, reps: 4, scheduled_days: 5, stability: 1, state: 0, media: "Card 5 for Deck 1", deck: 1 },
		{ id: 6, difficulty: 2, due: new Date('2024-06-16'), elapsed_days: 5, lapses: 2, last_review: new Date('2024-06-15'), learning_steps: 3, reps: 5, scheduled_days: 6, stability: 2, state: 2, media: "Card 6 for Deck 1 (state 2)", deck: 1 },

		// Deck 2
		{ id: 1, difficulty: 2, due: new Date('2024-06-04'), elapsed_days: 0, lapses: 0, last_review: null, learning_steps: 1, reps: 0, scheduled_days: 1, stability: 2, state: 0, media: "Card 1 for Deck 2", deck: 2 },
		{ id: 2, difficulty: 3, due: new Date('2024-06-05'), elapsed_days: 1, lapses: 1, last_review: new Date('2024-06-02'), learning_steps: 2, reps: 1, scheduled_days: 2, stability: 3, state: 1, media: "Card 2 for Deck 2", deck: 2 },
		{ id: 3, difficulty: 1, due: new Date('2024-06-06'), elapsed_days: 2, lapses: 0, last_review: new Date('2024-06-04'), learning_steps: 1, reps: 2, scheduled_days: 3, stability: 1, state: 0, media: "Card 3 for Deck 2", deck: 2 },
		{ id: 4, difficulty: 3, due: new Date('2024-06-12'), elapsed_days: 3, lapses: 0, last_review: new Date('2024-06-10'), learning_steps: 2, reps: 3, scheduled_days: 4, stability: 3, state: 1, media: "Card 4 for Deck 2", deck: 2 },
		{ id: 5, difficulty: 2, due: new Date('2024-06-13'), elapsed_days: 4, lapses: 1, last_review: new Date('2024-06-11'), learning_steps: 1, reps: 4, scheduled_days: 5, stability: 2, state: 0, media: "Card 5 for Deck 2", deck: 2 },
		{ id: 6, difficulty: 3, due: new Date('2024-06-17'), elapsed_days: 5, lapses: 2, last_review: new Date('2024-06-16'), learning_steps: 3, reps: 5, scheduled_days: 6, stability: 3, state: 2, media: "Card 6 for Deck 2 (state 2)", deck: 2 },

		// Deck 3
		{ id: 1, difficulty: 2, due: new Date('2024-06-07'), elapsed_days: 0, lapses: 0, last_review: null, learning_steps: 1, reps: 0, scheduled_days: 1, stability: 2, state: 0, media: "Card 1 for Deck 3", deck: 3 },
		{ id: 2, difficulty: 3, due: new Date('2024-06-08'), elapsed_days: 1, lapses: 1, last_review: new Date('2024-06-05'), learning_steps: 2, reps: 1, scheduled_days: 2, stability: 3, state: 1, media: "Card 2 for Deck 3", deck: 3 },
		{ id: 3, difficulty: 1, due: new Date('2024-06-09'), elapsed_days: 2, lapses: 0, last_review: new Date('2024-06-07'), learning_steps: 1, reps: 2, scheduled_days: 3, stability: 1, state: 0, media: "Card 3 for Deck 3", deck: 3 },
		{ id: 4, difficulty: 1, due: new Date('2024-06-14'), elapsed_days: 3, lapses: 0, last_review: new Date('2024-06-12'), learning_steps: 2, reps: 3, scheduled_days: 4, stability: 1, state: 1, media: "Card 4 for Deck 3", deck: 3 },
		{ id: 5, difficulty: 3, due: new Date('2024-06-15'), elapsed_days: 4, lapses: 1, last_review: new Date('2024-06-13'), learning_steps: 1, reps: 4, scheduled_days: 5, stability: 3, state: 0, media: "Card 5 for Deck 3", deck: 3 },
		{ id: 6, difficulty: 1, due: new Date('2024-06-18'), elapsed_days: 5, lapses: 2, last_review: new Date('2024-06-17'), learning_steps: 3, reps: 5, scheduled_days: 6, stability: 1, state: 2, media: "Card 6 for Deck 3 (state 2)", deck: 3 }
	])
}
