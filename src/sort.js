/** @typedef {import('./normalize.js').Show} Show */

/**
 * C3. Повертає новий масив серіалів, відсортований за полем `key`.
 * Специфікація — ТЗ, C3.
 *
 * @param {Show[]} shows
 * @param {'name' | 'year' | 'rating'} key
 * @param {'asc' | 'desc'} [direction]
 * @returns {Show[]}
 */
export function sortShows(shows, key, direction = 'asc') {
  const dir = direction === 'desc' ? -1 : 1;
  const copy = [...shows];

  if (key === 'name') {
    copy.sort((a, b) => a.name.localeCompare(b.name) * dir);
    return copy;
  }

  copy.sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    const aNull = av === null || av === undefined;
    const bNull = bv === null || bv === undefined;
    if (aNull && bNull) return 0;
    if (aNull) return 1;
    if (bNull) return -1;
    return (av - bv) * dir;
  });
  return copy;
}
