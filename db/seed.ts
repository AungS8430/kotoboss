import { db, Deck, Card } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Deck).values([
		{ id: 1, user: "aungshome@outlook.com", name: "Test 1", max_new_cards: 10, max_reviews: 100 },
		{ id: 2, user: "aungshome@outlook.com", name: "Test 2", max_new_cards: 10, max_reviews: 100 },
		{ id: 3, user: "john@doe.gg", name: "Not Shown", max_new_cards: 10, max_reviews: 100}
	])
}
