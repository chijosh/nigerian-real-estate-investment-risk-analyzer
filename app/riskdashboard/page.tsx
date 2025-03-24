'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Info, AlertTriangle, AlertCircle } from 'lucide-react';
import { RiskMeter } from './RiskMeter';
import { RiskRadarChart } from './RiskRadarChart';
import regionsData from '../components/data/regions.json';
import riskData from '../components/data/risks.json';

interface RiskDashboardProps {
  onShowInfo: () => void;
}

const RiskDashboard: React.FC<RiskDashboardProps> = ({
  onShowInfo
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('lagos');
  const [selectedRiskCategory, setSelectedRiskCategory] = useState('legal');


  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
  };

  const regions = regionsData.regions;
  const risks = riskData.risks;
  
  const currentRegion = regions.find(r => r.id === selectedRegion) || regions[0];
  const riskCategories = [
    { id: 'legal', label: 'Legal Risks', icon: <AlertCircle className="h-5 w-5 mr-2" /> },
    { id: 'financial', label: 'Financial Risks', icon: <AlertTriangle className="h-5 w-5 mr-2" /> },
    { id: 'logistical', label: 'Logistical Risks', icon: <AlertTriangle className="h-5 w-5 mr-2" /> },
    { id: 'market', label: 'Market & Political Risks', icon: <AlertTriangle className="h-5 w-5 mr-2" /> }
  ];

  console.log({currentRegion});
  

  const currentRisks = risks.filter(risk => risk.category === selectedRiskCategory);
  const regionRiskData = currentRegion.riskScores;

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 pr-6 pl-6 sm:pr-4 sm:pl-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">Property Investment Risk Dashboard</h2>
          <p className="text-gray-500">
            Analyze and visualize investment risks across different regions in Nigeria
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedRegion} onValueChange={handleRegionChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.id} value={region.id}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={onShowInfo}>
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6  p-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Risk Overview: {currentRegion.name}</CardTitle>
            <CardDescription>
              Comprehensive view of investment risk factors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RiskRadarChart regionData={regionRiskData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overall Risk Assessment</CardTitle>
            <CardDescription>Based on combined risk factors</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <RiskMeter value={currentRegion.overallRiskScore} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Risk Details</CardTitle>
          <CardDescription>
            Detailed breakdown of specific risk factors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="legal" value={selectedRiskCategory} onValueChange={setSelectedRiskCategory}>
            <TabsList className="grid grid-cols-4">
              {riskCategories.map(category => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center">
                  {category.icon}
                  <span className="hidden md:inline">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {riskCategories.map(category => (
              <TabsContent key={category.id} value={category.id}>
                <div className="space-y-4">
                  {currentRisks.map((risk, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{risk.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {risk.factors.map((factor, idx) => (
                            <li key={idx} className="flex items-start">
                              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold">{factor.title}</p>
                                <p className="text-gray-600">{factor.description}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskDashboard;