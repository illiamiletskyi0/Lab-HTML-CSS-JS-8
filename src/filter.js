/** @typedef {import('./normalize.js').Show} Show */

/**
 * @typedef {object} FilterOptions
 * @property {string | null} [query] частина назви
 * @property {string | null} [genre] жанр
 * @property {number | null} [minRating] мінімальна оцінка
 */

/**
 * C2. Повертає серіали, які відповідають усім заданим фільтрам.
 * Специфікація — ТЗ, C2.
 *
 * @param {Show[]} shows
 * @param {FilterOptions} [options]
 * @returns {Show[]}
 */
export function filterShows(shows, options) {
  const { query, genre, minRating } = options ?? {};

  const q = typeof query === 'string' ? query.trim().toLowerCase() : '';
  const g = typeof genre === 'string' ? genre : '';
  const useQuery = q !== '';
  const useGenre = g !== '';
  const useRating = minRating !== undefined && minRating !== null && minRating !== 0;

  return shows.filter((show) => {
    if (useQuery && !show.name.toLowerCase().includes(q)) return false;
    if (useGenre && !show.genres.includes(g)) return false;
    if (useRating && (show.rating === null || show.rating === undefined || show.rating < minRating)) {
      return false;
    }
    return true;
  });
}
