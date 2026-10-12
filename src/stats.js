/** @typedef {import('./normalize.js').Show} Show */

/**
 * @typedef {object} GenreStats
 * @property {number} count скільки серіалів мають цей жанр
 * @property {number | null} averageRating середня оцінка цих серіалів
 */

/**
 * C4. Рахує статистику для кожного жанру.
 * Специфікація — ТЗ, C4.
 *
 * @param {Show[]} shows
 * @returns {Record<string, GenreStats>} ключ — назва жанру
 */
export function genreStats(shows) {
  /** @type {Record<string, { count: number, sum: number, rated: number }>} */
  const acc = Object.create(null);

  for (const show of shows) {
    // Кожен серіал враховується в жанрі лише один раз.
    for (const genre of new Set(show.genres)) {
      if (!acc[genre]) acc[genre] = { count: 0, sum: 0, rated: 0 };
      acc[genre].count += 1;
      if (show.rating !== null && show.rating !== undefined) {
        acc[genre].sum += show.rating;
        acc[genre].rated += 1;
      }
    }
  }

  // fromEntries створює власний ключ навіть для назви жанру '__proto__'.
  return Object.fromEntries(
    Object.entries(acc).map(([genre, { count, sum, rated }]) => [
      genre,
      { count, averageRating: rated === 0 ? null : Math.round((sum / rated) * 10) / 10 },
    ]),
  );
}
