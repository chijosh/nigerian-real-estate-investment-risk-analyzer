import { Region } from "./region.interface";

// Common types for use across interfaces
export type RiskLevel = 'low' | 'medium' | 'high' | 'very high';
export type LiquidityRating = 'very low' | 'low' | 'medium' | 'high' | 'very high';

export interface Property {
  title: string;
  riskLevel: RiskLevel;
  listingDate: string | Date;
  zone: string;
  legalStatus: string;
  certifications?: string[];
  riskFactors?: string[];
  price?: number;
  projectedTax?: number;
}

// src/types/additionalCost.ts
export interface AdditionalCost {
  name: string;
  description: string;
  percentage?: number;
  fixedAmount?: number;
}

// src/types/mitigationCost.ts
export interface MitigationCost {
  name: string;
  description: string;
  cost?: number;
  percentage?: number;
}

// src/types/mitigationCategory.ts
export interface MitigationCategory {
  [key: string]: MitigationCost[];
}

  
export interface PropertyType {
  type: string;
  basePrice: number;
  priceRange: string;
  additionalCosts: {
    name: string;
    percentage?: number;
    fixedAmount?: number;
    description: string;
  }[];
  riskLevel: string;
  estimatedReturnRate: string;
  liquidityRating: string;
}

// src/types/costEstimate.ts
export interface CostEstimate {
  regions: {
    [key: string]: Region;
  };
  mitigationCosts: MitigationCategory;
}

// src/types/risk.ts
export interface Risk {
  id: string;
  category: RiskCategory;
  title: string;
  description: string;
  severity: number; // 1-10 scale
  likelihood: number; // 1-10 scale
  impactAreas: string[];
  mitigationStrategies: string[];
}

export type RiskCategory = 'legal' | 'financial' | 'logistical' | 'market' | 'political';

// src/types/caseStudy.ts
export interface CaseStudy {
  id: string;
  title: string;
  type: 'success' | 'cautionary';
  location: string;
  summary: string;
  details: string;
  lessons: string[];
  yearOccurred: number;
  propertyType: string;
  riskFactors: string[];
}

// src/types/user.ts
export interface UserPreferences {
  region: string;
  propertyType: string;
  budget: number;
  riskTolerance: 'low' | 'medium' | 'high';
  investmentGoal: 'rental' | 'resale' | 'personal';
  timeHorizon: 'short' | 'medium' | 'long';
}

// src/types/calculations.ts
export interface CostBreakdown {
  baseCost: number;
  additionalCosts: {
    name: string;
    amount: number;
    percentage?: number;
  }[];
  totalCost: number;
  mitigationCosts: {
    name: string;
    amount: number;
    percentage?: number;
  }[];
  grandTotal: number;
}

export interface RiskScore {
  overall: number; // 0-100
  categories: {
    legal: number;
    financial: number;
    logistical: number;
    market: number;
    political: number;
  };
  topRisks: Risk[];
}

export interface ReturnForecast {
  estimatedAnnualReturn: {
    low: number;
    median: number;
    high: number;
  };
  breakevenTimeframe: {
    optimistic: number; // months
    realistic: number; // months
    pessimistic: number; // months
  };
  liquidityRating: LiquidityRating;
}