const SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc'];

export function formatNumber(value: number, decimals = 2): string {
  if (!isFinite(value) || isNaN(value)) return '0';
  if (value < 1000) return value.toFixed(decimals);
  const tier = Math.floor(Math.log10(Math.abs(value)) / 3);
  const suffix = SUFFIXES[Math.min(tier, SUFFIXES.length - 1)];
  const scaled = value / Math.pow(1000, tier);
  return `${scaled.toFixed(decimals)}${suffix}`;
}

export function formatCurrency(value: number, decimals = 2): string {
  return `€${formatNumber(value, decimals)}`;
}

export function formatRate(value: number): string {
  return `+${formatCurrency(value)}/s`;
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.floor(seconds)}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}j`;
}
