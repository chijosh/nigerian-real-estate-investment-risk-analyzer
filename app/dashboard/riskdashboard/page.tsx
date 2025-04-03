"use client";

import MainLayout from "../../components/MainLayout";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Progress } from "../../components/ui/progress";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { AlertTriangle } from "lucide-react";

const regions = [
  { name: "Lagos", value: "lagos" },
  { name: "Abuja", value: "abuja" },
  { name: "Port Harcourt", value: "portharcourt" },
  { name: "Ibadan", value: "ibadan" },
];

const riskFactors = {
  lagos: {
    legal: 75,
    financial: 68,
    logistical: 60,
    market: 65,
    security: 58,
    overall: 72,
  },
  abuja: {
    legal: 65,
    financial: 62,
    logistical: 55,
    market: 60,
    security: 52,
    overall: 65,
  },
  portharcourt: {
    legal: 70,
    financial: 65,
    logistical: 62,
    market: 58,
    security: 65,
    overall: 68,
  },
  ibadan: {
    legal: 68,
    financial: 60,
    logistical: 58,
    market: 62,
    security: 55,
    overall: 64,
  },
};

const legalRisks = [
  {
    id: "legal-1",
    title: "Fragmented Land Administration",
    description: "Nigeria operates multiple land registration systems across different states, creating inconsistencies and confusion.",
  },
  {
    id: "legal-2",
    title: "Land Use Act Complications",
    description: "The 1978 Land Use Act vests all land in state governments, meaning individuals can only obtain rights of occupancy rather than absolute ownership.",
  },
  {
    id: "legal-3",
    title: "Certificate of Occupancy (C of O) Challenges",
    description: "Many properties lack proper C of O documentation, the primary evidence of legal right to land use.",
  },
  {
    id: "legal-4",
    title: "Family Land Disputes",
    description: "Land often belongs to extended families, leading to multiple claimants challenging sales made by individual family members.",
  },
];

const financialRisks = [
  {
    id: "financial-1",
    title: "Currency Fluctuation",
    description: "The Nigerian Naira's instability affects property values and investment returns.",
  },
  {
    id: "financial-2",
    title: "Hidden Costs",
    description: "Numerous unexpected fees and charges often arise during the investment process.",
  },
  {
    id: "financial-3",
    title: "Inflation Impact",
    description: "High inflation rates can erode real returns on property investments.",
  },
  {
    id: "financial-4",
    title: "Transaction Fees",
    description: "Legal, agency, and government fees can add 15-20% to the total cost.",
  },
];

const logisticalRisks = [
  {
    id: "logistical-1",
    title: "Infrastructure Deficits",
    description: "Many areas lack reliable electricity, water, and road access.",
  },
  {
    id: "logistical-2",
    title: "Remote Management Challenges",
    description: "Managing property from abroad leads to dependence on potentially unreliable local agents.",
  },
  {
    id: "logistical-3",
    title: "Construction Quality Issues",
    description: "Inconsistent building standards and oversight leads to quality control problems.",
  },
  {
    id: "logistical-4",
    title: "Project Delays",
    description: "Construction projects frequently experience significant timeline extensions.",
  },
];

const marketRisks = [
  {
    id: "market-1",
    title: "Market Volatility",
    description: "Property values can fluctuate dramatically based on economic and political factors.",
  },
  {
    id: "market-2",
    title: "Rental Yield Uncertainty",
    description: "Expected rental income often doesn't materialize as projected.",
  },
  {
    id: "market-3",
    title: "Overvaluation",
    description: "Properties may be priced above their true market value, especially to diaspora investors.",
  },
  {
    id: "market-4",
    title: "Liquidity Concerns",
    description: "Selling property quickly if needed can be difficult and may require significant discounts.",
  },
];

export default function RiskDashboard() {
  const [selectedRegion, setSelectedRegion] = useState("lagos");
  const risks = riskFactors[selectedRegion as keyof typeof riskFactors];

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { label: "High Risk", color: "text-riskLevel-high" };
    if (score >= 50) return { label: "Medium Risk", color: "text-amber-500" };
    return { label: "Low Risk", color: "text-green-500" };
  };

  const getProgressColor = (score: number) => {
    if (score >= 70) return "bg-riskLevel-high";
    if (score >= 50) return "bg-amber-500";
    return "bg-green-500";
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <MainLayout>
      <section className="py-10 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            className="mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-3xl font-bold mb-2">Property Investment Risk Dashboard</h1>
            <p className="text-muted-foreground">
              Analyze and visualize investment risks across different regions in Nigeria
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Risk Overview: {regions.find(r => r.value === selectedRegion)?.name}</CardTitle>
                    <Select
                      value={selectedRegion}
                      onValueChange={setSelectedRegion}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region.value} value={region.value}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <CardDescription>Comprehensive view of investment risk factors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Legal Risk</span>
                        <span>{risks.legal}%</span>
                      </div>
                      <Progress value={risks.legal} className={getProgressColor(risks.legal)} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Financial Risk</span>
                        <span>{risks.financial}%</span>
                      </div>
                      <Progress value={risks.financial} className={getProgressColor(risks.financial)} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Logistical Risk</span>
                        <span>{risks.logistical}%</span>
                      </div>
                      <Progress value={risks.logistical} className={getProgressColor(risks.logistical)} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Market Risk</span>
                        <span>{risks.market}%</span>
                      </div>
                      <Progress value={risks.market} className={getProgressColor(risks.market)} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Security Risk</span>
                        <span>{risks.security}%</span>
                      </div>
                      <Progress value={risks.security} className={getProgressColor(risks.security)} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Overall Risk Assessment</CardTitle>
                  <CardDescription>Based on combined risk factors</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                  <div className="relative w-full max-w-[200px] h-[100px] overflow-hidden">
                    <div className="absolute w-full h-[200px] rounded-t-full bg-gradient-to-r from-green-500 via-amber-500 to-red-500" />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-500" />
                    <div
                      className="absolute bottom-0 transform translate-x(-50%) -translate-y-1/2 w-1 h-16 bg-black"
                      style={{ left: `${risks.overall}%` }}
                    />
                  </div>

                  <div className={`text-xl font-bold mb-2 ${getRiskLevel(risks.overall).color}`}>
                    {getRiskLevel(risks.overall).label}
                  </div>

                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
                    <span>Risk Score: {risks.overall}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Risk Details</CardTitle>
                <CardDescription>Detailed breakdown of specific risk factors</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="legal" className="w-full">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="legal">Legal Risks</TabsTrigger>
                    <TabsTrigger value="financial">Financial Risks</TabsTrigger>
                    <TabsTrigger value="logistical">Logistical Risks</TabsTrigger>
                    <TabsTrigger value="market">Market & Political Risks</TabsTrigger>
                  </TabsList>

                  <TabsContent value="legal" className="space-y-4">
                    {legalRisks.map((risk) => (
                      <Alert key={risk.id} className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/50">
                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <div className="ml-2">
                          <h4 className="font-medium text-amber-800 dark:text-amber-500">{risk.title}</h4>
                          <AlertDescription className="text-sm text-amber-700 dark:text-amber-300">
                            {risk.description}
                          </AlertDescription>
                        </div>
                      </Alert>
                    ))}
                  </TabsContent>

                  <TabsContent value="financial" className="space-y-4">
                    {financialRisks.map((risk) => (
                      <Alert key={risk.id} className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/50">
                        <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <div className="ml-2">
                          <h4 className="font-medium text-blue-800 dark:text-blue-500">{risk.title}</h4>
                          <AlertDescription className="text-sm text-blue-700 dark:text-blue-300">
                            {risk.description}
                          </AlertDescription>
                        </div>
                      </Alert>
                    ))}
                  </TabsContent>

                  <TabsContent value="logistical" className="space-y-4">
                    {logisticalRisks.map((risk) => (
                      <Alert key={risk.id} className="border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-950/50">
                        <AlertTriangle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        <div className="ml-2">
                          <h4 className="font-medium text-purple-800 dark:text-purple-500">{risk.title}</h4>
                          <AlertDescription className="text-sm text-purple-700 dark:text-purple-300">
                            {risk.description}
                          </AlertDescription>
                        </div>
                      </Alert>
                    ))}
                  </TabsContent>

                  <TabsContent value="market" className="space-y-4">
                    {marketRisks.map((risk) => (
                      <Alert key={risk.id} className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/50">
                        <AlertTriangle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <div className="ml-2">
                          <h4 className="font-medium text-green-800 dark:text-green-500">{risk.title}</h4>
                          <AlertDescription className="text-sm text-green-700 dark:text-green-300">
                            {risk.description}
                          </AlertDescription>
                        </div>
                      </Alert>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
