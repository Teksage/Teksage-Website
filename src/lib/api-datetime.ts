/** Parse datetimes from FastAPI — naive values are UTC (`datetime.utcnow()`). */
export function parseApiDateTime(value: string): Date {
  const trimmed = value.trim();
  if (!trimmed) return new Date(NaN);

  if (/[zZ]$|[+-]\d{2}:?\d{2}$/.test(trimmed)) {
    return new Date(trimmed);
  }

  const normalized = trimmed.includes("T")
    ? trimmed
    : trimmed.replace(" ", "T");
  const base = normalized.split(".")[0] ?? normalized;
  return new Date(`${base}Z`);
}

export function isValidDate(d: Date): boolean {
  return !Number.isNaN(d.getTime());
}
