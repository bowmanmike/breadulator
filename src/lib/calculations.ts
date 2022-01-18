export function calcBakersPercentage(flour: number, other: number): number {
  return Math.round((other / flour) * 100);
}
