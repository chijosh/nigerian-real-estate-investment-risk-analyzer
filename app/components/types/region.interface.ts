/**
 * TypeScript interfaces for region and property data
 */

import { PropertyType } from "./property.interface";

export interface AdditionalCost {
    name: string;
    description: string;
    percentage?: number;
    fixedAmount?: number;
    calculatedAmount?: number; // Used after calculation
  }

  
  export interface Region {
    name: string;
    propertyTypes: PropertyType[];
  }
  
  export interface MitigationCost {
    name: string;
    description: string;
    percentage?: number;
    cost?: number;
    calculatedAmount?: number; // Used after calculation
  }
  
  export interface MitigationCategory {
    [key: string]: MitigationCost[];
  }
  
  export interface CostEstimates {
    regions: {
      [key: string]: Region;
    };
    mitigationCosts: {
      [key: string]: MitigationCost[];
    };
  }
  
  export interface CostBreakdown {
    basePrice: number;
    legalFees: number;
    governmentCharges: number;
    agencyFees: number;
    developmentLevies: number;
    infrastructure: number;
    settlement: number;
    contingency: number;
    other: number;
  }
  
  export interface RiskAssessment {
    score: number;
    level: string;
    color: string;
    factors: {
      name: string;
      impact: 'low' | 'medium' | 'high' | 'very high';
      description: string;
    }[];
  }