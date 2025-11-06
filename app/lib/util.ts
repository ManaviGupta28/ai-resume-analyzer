/**
 * Convert a size in bytes to a human-readable string using binary units (KB, MB, GB).
 * - Uses 1 KB = 1024 bytes.
 * - Shows up to 2 decimal places, trimmed (no trailing zeros).
 * - Caps at GB (for larger sizes, still shows in GB).
 */
export function formatSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB'] as const;
  let unitIndex = 0;
  let size = bytes;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  const rounded = size >= 100
    ? Math.round(size)
    : size >= 10
      ? Math.round(size * 10) / 10
      : Math.round(size * 100) / 100;

  return `${rounded} ${units[unitIndex]}`;
}

export default formatSize;

export const generateUUID = () => crypto.randomUUID();