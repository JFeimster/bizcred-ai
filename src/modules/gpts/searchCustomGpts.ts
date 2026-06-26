import type { CustomGpt } from '../../types/CustomGpt';
import customGptsData from '../../../data/gpts/custom-gpts.normalized.json';

export interface CustomGptFilters {
  recommendedStage?: string;
  keyword?: string;
  category?: string;
  isDuplicate?: boolean;
  hasAccessUrl?: boolean;
}

export function searchCustomGpts(filters: CustomGptFilters): CustomGpt[] {
  let gpts = customGptsData as CustomGpt[];

  if (filters.recommendedStage) {
    gpts = gpts.filter(g => g.recommended_stage?.toLowerCase() === filters.recommendedStage?.toLowerCase());
  }
  if (filters.keyword) {
    gpts = gpts.filter(g => g.keyword?.toLowerCase().includes(filters.keyword!.toLowerCase()));
  }
  if (filters.category) {
    gpts = gpts.filter(g => g.category?.toLowerCase() === filters.category?.toLowerCase());
  }
  if (filters.isDuplicate !== undefined) {
    gpts = gpts.filter(g => g.is_duplicate === filters.isDuplicate);
  }
  if (filters.hasAccessUrl !== undefined) {
    gpts = gpts.filter(g => g.has_access_url === filters.hasAccessUrl);
  }

  return gpts;
}
