import { BusinessProfile } from '../../types/businessProfile';
import { Tradeline } from '../../types/tradeline';
import { CreditArchitectScoreResult } from './calculateCreditArchitectScore';

export interface NextBestMove {
  title: string;
  reason: string;
  action: string;
  priority: 'low' | 'medium' | 'high';
}

export function getNextBestMove(
  _scoreResult: CreditArchitectScoreResult,
  profile: BusinessProfile,
  tradelines: Tradeline[]
): NextBestMove {

  if (profile.entityType === 'other' || profile.entityType === 'sole_proprietorship') {
    return {
      title: 'Formalize Business Entity',
      reason: 'Operating as a sole proprietorship limits your ability to separate personal and business credit.',
      action: 'Research forming an LLC or Corporation in your state.',
      priority: 'high'
    };
  }

  if (profile.einStatus !== 'active') {
    return {
      title: 'Obtain an EIN',
      reason: 'An Employer Identification Number (EIN) is required to open business bank accounts and apply for business credit.',
      action: 'Apply for a free EIN directly through the IRS website.',
      priority: 'high'
    };
  }

  if (!profile.businessBankAccount) {
    return {
      title: 'Open a Business Bank Account',
      reason: 'A dedicated business bank account is essential for financial separation and is often required by vendors and lenders.',
      action: 'Research business checking accounts and open one using your EIN and formation documents.',
      priority: 'high'
    };
  }

  if (!profile.dunsNumber) {
    return {
      title: 'Register for a DUNS Number',
      reason: 'A DUNS number is required to build a business credit profile with Dun & Bradstreet.',
      action: 'Apply for a free DUNS number on the D&B website.',
      priority: 'medium'
    };
  }

  const activeTradelines = tradelines.filter(t => t.status === 'active' || t.status === 'reporting').length;

  if (activeTradelines === 0) {
    return {
      title: 'Open Tier 1 Vendor Accounts',
      reason: 'You need active tradelines reporting to business credit bureaus to establish a credit profile.',
      action: 'Review the Directory for entry-level Net-30 vendors that report to major bureaus.',
      priority: 'high'
    };
  }

  if (activeTradelines < 3) {
    return {
      title: 'Add More Vendor Accounts',
      reason: 'Having 3-5 reporting tradelines strengthens your profile and prepares you for higher tiers of credit.',
      action: 'Consider adding 1-2 more Tier 1 or Tier 2 Net-30 accounts to your planner.',
      priority: 'medium'
    };
  }

  return {
    title: 'Monitor and Maintain',
    reason: 'Your foundation is strong. The key now is consistent, on-time payments.',
    action: 'Ensure all vendor invoices are paid early or on time, and verify they are reporting to bureaus.',
    priority: 'low'
  };
}