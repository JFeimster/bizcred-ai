import { readLocal } from '../../storage/localStorageClient';
import { STORAGE_KEYS } from '../../storage/storageKeys';
import { DashboardSnapshot } from '../../types/dashboardSnapshot';

export function buildDashboardSnapshot(): DashboardSnapshot {
  const meta = {
    timestamp: new Date().toISOString(),
    version: '1.0',
    source: 'bizcred-ai-local'
  };

  const sections: DashboardSnapshot['sections'] = {};

  try {
    sections.profile = readLocal(STORAGE_KEYS.profile, null);
    sections.passport = readLocal(STORAGE_KEYS.passport, null);
    sections.tradelines = readLocal(STORAGE_KEYS.tradelines, null);
    sections.roadmap = readLocal(STORAGE_KEYS.roadmap, null);
    sections.alerts = readLocal(STORAGE_KEYS.alerts, null);
    sections.imports = readLocal(STORAGE_KEYS.importJobs, null);

    // Defaulting other sections to null since they might not be fully wired up in STORAGE_KEYS yet
    sections.exports = readLocal('bizcredit.v1.exports', null);
    sections.fundingTools = readLocal('bizcredit.v1.fundingTools', null);
    sections.customGpts = readLocal('bizcredit.v1.customGpts', null);
    sections.notionTemplateSources = readLocal('bizcredit.v1.notionTemplateSources', null);
  } catch {
    // Ensuring we never throw into the UI
  }

  return {
    meta,
    sections
  };
}
