import { db, Deck, Card, Studies } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// @ts-ignore
	await db.insert(Deck).values([
		{ id: 1, user: "aungshome@outlook.com", name: "Test 1", max_new_cards: 10, max_reviews: 0 },
		{ id: 2, user: "aungshome@outlook.com", name: "Test 2", max_new_cards: 10, max_reviews: 100 },
		{ id: 3, user: "john@doe.gg", name: "Not Shown", max_new_cards: 10, max_reviews: 100}
	])
	// @ts-ignore
	await db.insert(Card).values([
		// Deck 1
		{ id: 1, difficulty: 2, due: new Date('2099-12-31'), lapses: 0, last_review: null, learning_steps: 1, reps: 0, scheduled_days: 1, stability: 2, state: 0, media: "Card 1 for Deck 1", deck: 1 },
		{ id: 2, difficulty: 3, due: new Date('2025-06-02'), lapses: 1, last_review: new Date('2025-05-31'), learning_steps: 2, reps: 1, scheduled_days: 2, stability: 3, state: 1, media: "Card 2 for Deck 1", deck: 1 },
		{ id: 3, difficulty: 1, due: new Date('2099-12-31'), lapses: 0, last_review: null, learning_steps: 1, reps: 0, scheduled_days: 1, stability: 1, state: 0, media: "Card 3 for Deck 1", deck: 1 },
		{ id: 4, difficulty: 2, due: new Date('2025-06-10'), lapses: 0, last_review: new Date('2025-06-08'), learning_steps: 2, reps: 3, scheduled_days: 4, stability: 2, state: 1, media: "Card 4 for Deck 1", deck: 1 },
		{ id: 5, difficulty: 1, due: new Date('2099-12-31'), lapses: 0, last_review: null, learning_steps: 1, reps: 0, scheduled_days: 1, stability: 1, state: 0, media: "Card 5 for Deck 1", deck: 1 },
		{ id: 6, difficulty: 2, due: new Date('2025-06-16'), lapses: 2, last_review: new Date('2025-06-15'), learning_steps: 3, reps: 5, scheduled_days: 6, stability: 2, state: 2, media: "Card 6 for Deck 1 (state 2)", deck: 1 },

		// Deck 2
		{ id: 7, difficulty: 2, due: new Date('2099-12-31'), lapses: 0, last_review: null, learning_steps: 1, reps: 0, scheduled_days: 1, stability: 2, state: 0, media: "Card 1 for Deck 2", deck: 2 },
		{ id: 8, difficulty: 3, due: new Date('2025-06-05'), lapses: 1, last_review: new Date('2025-06-02'), learning_steps: 2, reps: 1, scheduled_days: 2, stability: 3, state: 1, media: "Card 2 for Deck 2", deck: 2 },
		{ id: 9, difficulty: 1, due: new Date('2099-12-31'), lapses: 0, last_review: null, learning_steps: 1, reps: 0, scheduled_days: 1, stability: 1, state: 0, media: "Card 3 for Deck 2", deck: 2 },
		{ id: 10, difficulty: 3, due: new Date('2025-06-12'), lapses: 0, last_review: new Date('2025-06-10'), learning_steps: 2, reps: 3, scheduled_days: 4, stability: 3, state: 1, media: "Card 4 for Deck 2", deck: 2 },
		{ id: 11, difficulty: 2, due: new Date('2099-12-31'), lapses: 0, last_review: null, learning_steps: 1, reps: 0, scheduled_days: 1, stability: 2, state: 0, media: "Card 5 for Deck 2", deck: 2 },
		{ id: 12, difficulty: 3, due: new Date('2025-06-17'), lapses: 2, last_review: new Date('2025-06-16'), learning_steps: 3, reps: 5, scheduled_days: 6, stability: 3, state: 2, media: "Card 6 for Deck 2 (state 2)", deck: 2 },

		// Deck 3
		{ id: 13, difficulty: 2, due: new Date('2099-12-31'), lapses: 0, last_review: null, learning_steps: 1, reps: 0, scheduled_days: 1, stability: 2, state: 0, media: "Card 1 for Deck 3", deck: 3 },
		{ id: 14, difficulty: 3, due: new Date('2025-06-08'), lapses: 1, last_review: new Date('2025-06-05'), learning_steps: 2, reps: 1, scheduled_days: 2, stability: 3, state: 1, media: "Card 2 for Deck 3", deck: 3 },
		{ id: 15, difficulty: 1, due: new Date('2099-12-31'), lapses: 0, last_review: null, learning_steps: 1, reps: 0, scheduled_days: 1, stability: 1, state: 0, media: "Card 3 for Deck 3", deck: 3 },
		{ id: 16, difficulty: 1, due: new Date('2025-06-14'), lapses: 0, last_review: new Date('2025-06-12'), learning_steps: 2, reps: 3, scheduled_days: 4, stability: 1, state: 1, media: "Card 4 for Deck 3", deck: 3 },
		{ id: 17, difficulty: 3, due: new Date('2099-12-31'), lapses: 0, last_review: null, learning_steps: 1, reps: 0, scheduled_days: 1, stability: 3, state: 0, media: "Card 5 for Deck 3", deck: 3 },
		{ id: 18, difficulty: 1, due: new Date('2025-06-18'), lapses: 2, last_review: new Date('2025-06-17'), learning_steps: 3, reps: 5, scheduled_days: 6, stability: 1, state: 2, media: "Card 6 for Deck 3 (state 2)", deck: 3 }
	])
	await db.insert(Studies).values([
		// Deck 1, user aungshome@outlook.com
		{ deck: 1, user: "aungshome@outlook.com", date: new Date('2025-06-01'), count: 3, new: 2, review: 1 },
		{ deck: 1, user: "aungshome@outlook.com", date: new Date('2025-06-02'), count: 2, new: 1, review: 1 },
		{ deck: 1, user: "aungshome@outlook.com", date: new Date('2025-06-03'), count: 4, new: 2, review: 2 },
		{ deck: 1, user: "aungshome@outlook.com", date: new Date('2025-06-04'), count: 1, new: 0, review: 1 },
		{ deck: 1, user: "aungshome@outlook.com", date: new Date('2025-06-05'), count: 0, new: 0, review: 0 },

		// Deck 2, user aungshome@outlook.com
		{ deck: 2, user: "aungshome@outlook.com", date: new Date('2025-06-04'), count: 2, new: 1, review: 1 },
		{ deck: 2, user: "aungshome@outlook.com", date: new Date('2025-06-05'), count: 3, new: 2, review: 1 },
		{ deck: 2, user: "aungshome@outlook.com", date: new Date('2025-06-06'), count: 1, new: 0, review: 1 },
		{ deck: 2, user: "aungshome@outlook.com", date: new Date('2025-06-07'), count: 0, new: 0, review: 0 },
		{ deck: 2, user: "aungshome@outlook.com", date: new Date('2025-07-01'), count: 2, new: 1, review: 1 },

		// Deck 3, user john@doe.gg
		{ deck: 3, user: "john@doe.gg", date: new Date('2025-06-07'), count: 1, new: 1, review: 0 },
		{ deck: 3, user: "john@doe.gg", date: new Date('2025-06-08'), count: 2, new: 1, review: 1 },
		{ deck: 3, user: "john@doe.gg", date: new Date('2025-06-09'), count: 3, new: 2, review: 1 },
		{ deck: 3, user: "john@doe.gg", date: new Date('2025-06-10'), count: 0, new: 0, review: 0 },
		{ deck: 3, user: "john@doe.gg", date: new Date('2025-06-11'), count: 1, new: 0, review: 1 }
	])
}