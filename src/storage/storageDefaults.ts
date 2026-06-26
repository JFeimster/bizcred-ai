import { BusinessProfile } from '../types/businessProfile';
import { Tradeline } from '../types/tradeline';
import { Roadmap } from '../types/roadmap';
import { Alert } from '../types/alert';

export const defaultBusinessProfile: BusinessProfile = {
  businessName: '',
  entityType: 'other',
  formationDate: '',
  einStatus: 'none',
  businessBankAccount: false,
  businessAddress: '',
  businessPhone: '',
  website: '',
  domainEmail: '',
  dunsNumber: '',
  businessLicense: false,
  monthlyRevenueRange: '0-1k',
  primaryGoal: ''
};

export const defaultTradelines: Tradeline[] = [];

export const defaultRoadmap: Roadmap = {
  currentPhase: 1,
  phases: [],
  generatedAt: new Date().toISOString()
};

export const defaultAlerts: Alert[] = [];