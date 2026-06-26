import customGptsData from '../../../data/gpts/custom-gpts.normalized.json';
import type { CustomGpt } from '../../types/CustomGpt';

export interface CustomGptFilters {
  recommendedStage?: string;
  keyword?: string;
  category?: string;
  hasAccessUrl?: boolean;
}

function includes(value: unknown, query: string): boolean {
  return String(value || '').toLowerCase().includes(query.toLowerCase());
}

export function searchCustomGpts(filters: CustomGptFilters): CustomGpt[] {
  let gpts = customGptsData as CustomGpt[];

  if (filters.recommendedStage) {
    gpts = gpts.filter((gpt) => includes(gpt.recommended_stage, filters.recommendedStage || ''));
  }
  if (filters.keyword) {
    gpts = gpts.filter((gpt) => {
      const useCaseText = Array.isArray(gpt.useCases) ? gpt.useCases.join(' ') : '';
      return includes(gpt.keyword, filters.keyword || '') || includes(gpt.name, filters.keyword || '') || includes(gpt.description, filters.keyword || '') || includes(useCaseText, filters.keyword || '');
    });
  }
  if (filters.category) {
    gpts = gpts.filter((gpt) => includes(gpt.category, filters.category || ''));
  }
  if (filters.hasAccessUrl !== undefined) {
    gpts = gpts.filter((gpt) => Boolean(gpt.has_access_url || gpt.url) === filters.hasAccessUrl);
  }

  return gpts;
}
