export function randint(start: number = 0, end: number = 0) {
  const difference = Math.abs((end || 0) - (start || 0));
  return start + (Math.floor(Math.random() * difference) % (difference || 1));
}
