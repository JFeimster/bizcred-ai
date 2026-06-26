import { readLocal } from '../../storage/localStorageClient';
import { STORAGE_KEYS } from '../../storage/storageKeys';
import type { Tradeline } from '../../types/tradeline';

function escapeCsvField(field: unknown): string {
  if (field === null || field === undefined) return '';
  const value = String(field);
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function exportTradelinesCsv(): string {
  const tradelines = readLocal<Tradeline[]>(STORAGE_KEYS.tradelines, []);
  const headers = ['id', 'vendorName', 'accountType', 'tier', 'status', 'limitAmount', 'balanceAmount', 'reportsTo', 'notes', 'vendorId', 'dateOpened', 'lastReported'];

  const rows = tradelines.map((item) => [
    item.id,
    item.vendorName,
    item.accountType,
    item.tier,
    item.status,
    item.limitAmount,
    item.balanceAmount,
    item.reportsTo.join(';'),
    item.notes,
    item.vendorId || '',
    item.dateOpened || '',
    item.lastReported || ''
  ]);

  return [headers.join(','), ...rows.map((row) => row.map(escapeCsvField).join(','))].join('\n');
}
