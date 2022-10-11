export function parseUnixTimestamp(timestamp: string): Date {
  return new Date(parseInt(timestamp, 10) * 1000);
}
