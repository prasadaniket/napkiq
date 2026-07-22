export function paginate<T>(
  items: T[],
  total: number,
  page: number,
  size: number
) {
  const totalPages = Math.ceil(total / size)
  return {
    content: items,
    totalElements: total,
    totalPages,
    size,
    number: page,
    first: page === 0,
    last: page >= totalPages - 1,
  }
}
