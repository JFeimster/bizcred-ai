import { DashboardSnapshot } from '../../types/dashboardSnapshot';

const SENSITIVE_KEY_PATTERNS = [
  /token/i,
  /apikey/i,
  /secret/i,
  /password/i,
  /authorization/i,
  /bearer/i
];

function isSensitiveKey(key: string): boolean {
  return SENSITIVE_KEY_PATTERNS.some(pattern => pattern.test(key));
}

function sanitizeObject(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  const sanitized: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (!isSensitiveKey(key)) {
      sanitized[key] = sanitizeObject(value);
    }
  }
  return sanitized;
}

export function sanitizeSnapshotForExport(snapshot: DashboardSnapshot): DashboardSnapshot {
  return {
    meta: snapshot.meta,
    sections: sanitizeObject(snapshot.sections)
  };
}
