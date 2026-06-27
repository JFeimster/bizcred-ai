import type { DashboardSnapshot } from '../../types/dashboardSnapshot';

const SENSITIVE_KEY_PATTERNS = [
  /token/i,
  /apikey/i,
  /api_key/i,
  /secret/i,
  /password/i,
  /authorization/i,
  /bearer/i
];

function isSensitiveKey(key: string): boolean {
  return SENSITIVE_KEY_PATTERNS.some((pattern) => pattern.test(key));
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function sanitizeObject(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeObject(item));
  }

  if (!isPlainRecord(value)) {
    return value;
  }

  const sanitized: Record<string, unknown> = {};
  for (const [key, nestedValue] of Object.entries(value)) {
    if (!isSensitiveKey(key)) {
      sanitized[key] = sanitizeObject(nestedValue);
    }
  }

  return sanitized;
}

export function sanitizeSnapshotForExport(snapshot: DashboardSnapshot): DashboardSnapshot {
  return {
    meta: snapshot.meta,
    sections: sanitizeObject(snapshot.sections) as DashboardSnapshot['sections']
  };
}
