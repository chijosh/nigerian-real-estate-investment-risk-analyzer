"use client";

import { useState } from "react";
import MainLayout from "../../components/MainLayout";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { DollarSign, Clipboard, Calculator, Info } from "lucide-react";
import { toast } from "sonner";

const regions = [
  { value: "lagos", label: "Lagos", landPrice: 8000000, constructionMultiplier: 1.4 },
  { value: "abuja", label: "Abuja", landPrice: 7500000, constructionMultiplier: 1.3 },
  { value: "portharcourt", label: "Port Harcourt", landPrice: 5000000, constructionMultiplier: 1.2 },
  { value: "ibadan", label: "Ibadan", landPrice: 3000000, constructionMultiplier: 1.1 },
];

const propertyTypes = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "mixed", label: "Mixed-Use" },
];

const additionalCosts = {
  legal: 0.05, // 5% of property value
  survey: 300000, // Fixed cost in Naira
  registration: 0.03, // 3% of property value
  agency: 0.025, // 2.5% of property value
  infrastructure: {
    lagos: 2000000,
    abuja: 1800000,
    portharcourt: 1500000,
    ibadan: 1000000,
  },
};

interface EstimateResult {
  landCost: number;
  constructionCost: number;
  legalFees: number;
  surveyFees: number;
  registrationFees: number;
  agencyFees: number;
  infrastructureCost: number;
  totalCost: number;
  exchangeRate: number;
  totalInUSD: number;
}

export default function CostEstimator() {
  const [region, setRegion] = useState("lagos");
  const [propertyType, setPropertyType] = useState("residential");
  const [landSize, setLandSize] = useState<number>(500);
  const [constructionSize, setConstructionSize] = useState<number>(200);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number>(1500);

  const calculateEstimate = () => {
    if (!landSize || !constructionSize) {
      toast.error("Please enter all required fields");
      return;
    }

    const selectedRegion = regions.find(r => r.value === region);
    if (!selectedRegion) return;

    // Base costs
    const landCost = selectedRegion.landPrice * (landSize / 1000);

    // Construction costs per sqm vary by region and property type
    let constructionBaseRate = 250000; // Basic residential rate per sqm
    if (propertyType === "commercial") constructionBaseRate *= 1.5;
    if (propertyType === "mixed") constructionBaseRate *= 1.3;

    const constructionCost = constructionBaseRate * constructionSize * selectedRegion.constructionMultiplier;

    // Additional costs
    const propertyValue = landCost + constructionCost;
    const legalFees = propertyValue * additionalCosts.legal;
    const surveyFees = additionalCosts.survey;
    const registrationFees = propertyValue * additionalCosts.registration;
    const agencyFees = propertyValue * additionalCosts.agency;
    const infrastructureCost = additionalCosts.infrastructure[region as keyof typeof additionalCosts.infrastructure];

    // Total cost
    const totalCost = landCost + constructionCost + legalFees + surveyFees + registrationFees + agencyFees + infrastructureCost;

    // USD conversion
    const totalInUSD = totalCost / exchangeRate;

    setResult({
      landCost,
      constructionCost,
      legalFees,
      surveyFees,
      registrationFees,
      agencyFees,
      infrastructureCost,
      totalCost,
      exchangeRate,
      totalInUSD
    });

    setShowResult(true);
  };

  const formatCurrency = (value: number, currency = "NGN") => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency === "NGN" ? "NGN" : "USD",
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <MainLayout>
      <section className="py-10 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-4">Property Investment Cost Estimator</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate the total cost of your Nigerian property investment including hidden fees and expenses.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Investment Parameters</CardTitle>
                  <CardDescription>Enter the details of your planned investment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="region">Region</Label>
                      <Select value={region} onValueChange={setRegion}>
                        <SelectTrigger id="region">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem key={region.value} value={region.value}>
                              {region.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="propertyType">Property Type</Label>
                      <Select value={propertyType} onValueChange={setPropertyType}>
                        <SelectTrigger id="propertyType">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="landSize">Land Size (sqm)</Label>
                      <Input
                        id="landSize"
                        type="number"
                        placeholder="e.g. 500"
                        value={landSize || ""}
                        onChange={(e) => setLandSize(Number(e.target.value))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="constructionSize">Construction Size (sqm)</Label>
                      <Input
                        id="constructionSize"
                        type="number"
                        placeholder="e.g. 200"
                        value={constructionSize || ""}
                        onChange={(e) => setConstructionSize(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="exchangeRate">Exchange Rate (NGN to USD)</Label>
                    <Input
                      id="exchangeRate"
                      type="number"
                      placeholder="e.g. 1500"
                      value={exchangeRate || ""}
                      onChange={(e) => setExchangeRate(Number(e.target.value))}
                    />
                  </div>

                  <Button onClick={calculateEstimate} className="w-full bg-npira-blue hover:bg-npira-blue/90">
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate Total Investment Cost
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="bg-blue-50 dark:bg-blue-950/30">
                <CardHeader>
                  <CardTitle>Important Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      This estimator provides an approximation based on current market rates. Actual costs may vary.
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      Infrastructure costs include boreholes, generators, security installations, and other essential amenities.
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      This estimate doesn't include ongoing costs such as property management, maintenance, or taxes.
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      Exchange rates fluctuate daily and can significantly impact the total cost in foreign currency.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {showResult && result && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Estimated Investment Costs</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast.success("Estimate copied to clipboard!");
                      }}
                    >
                      <Clipboard className="h-4 w-4 mr-2" />
                      Copy Results
                    </Button>
                  </div>
                  <CardDescription>
                    Property in {regions.find(r => r.value === region)?.label}, {propertyTypes.find(t => t.value === propertyType)?.label.toLowerCase()} type with {landSize} sqm land and {constructionSize} sqm construction.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="naira">
                    <TabsList className="grid grid-cols-2 mb-6">
                      <TabsTrigger value="naira">Nigerian Naira (₦)</TabsTrigger>
                      <TabsTrigger value="usd">US Dollar ($)</TabsTrigger>
                    </TabsList>

                    <TabsContent value="naira">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-md">
                            <div className="text-sm text-muted-foreground">Land Cost</div>
                            <div className="text-xl font-semibold">{formatCurrency(result.landCost)}</div>
                          </div>

                          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-md">
                            <div className="text-sm text-muted-foreground">Construction Cost</div>
                            <div className="text-xl font-semibold">{formatCurrency(result.constructionCost)}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-md">
                            <div className="text-xs text-muted-foreground">Legal Fees</div>
                            <div className="text-base font-medium">{formatCurrency(result.legalFees)}</div>
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-md">
                            <div className="text-xs text-muted-foreground">Survey Fees</div>
                            <div className="text-base font-medium">{formatCurrency(result.surveyFees)}</div>
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-md">
                            <div className="text-xs text-muted-foreground">Registration</div>
                            <div className="text-base font-medium">{formatCurrency(result.registrationFees)}</div>
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-md">
                            <div className="text-xs text-muted-foreground">Agency Fees</div>
                            <div className="text-base font-medium">{formatCurrency(result.agencyFees)}</div>
                          </div>
                        </div>

                        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-md">
                          <div className="text-sm text-muted-foreground">Infrastructure & Utilities</div>
                          <div className="text-xl font-medium">{formatCurrency(result.infrastructureCost)}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Includes borehole, power backup, security systems, and essential amenities
                          </div>
                        </div>

                        <div className="p-6 bg-green-50 dark:bg-green-950/30 rounded-md">
                          <div className="text-sm font-medium text-muted-foreground">Total Investment Cost</div>
                          <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                            {formatCurrency(result.totalCost)}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="usd">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-md">
                            <div className="text-sm text-muted-foreground">Land Cost</div>
                            <div className="text-xl font-semibold">{formatCurrency(result.landCost / result.exchangeRate, "USD")}</div>
                          </div>

                          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-md">
                            <div className="text-sm text-muted-foreground">Construction Cost</div>
                            <div className="text-xl font-semibold">{formatCurrency(result.constructionCost / result.exchangeRate, "USD")}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-md">
                            <div className="text-xs text-muted-foreground">Legal Fees</div>
                            <div className="text-base font-medium">{formatCurrency(result.legalFees / result.exchangeRate, "USD")}</div>
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-md">
                            <div className="text-xs text-muted-foreground">Survey Fees</div>
                            <div className="text-base font-medium">{formatCurrency(result.surveyFees / result.exchangeRate, "USD")}</div>
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-md">
                            <div className="text-xs text-muted-foreground">Registration</div>
                            <div className="text-base font-medium">{formatCurrency(result.registrationFees / result.exchangeRate, "USD")}</div>
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-md">
                            <div className="text-xs text-muted-foreground">Agency Fees</div>
                            <div className="text-base font-medium">{formatCurrency(result.agencyFees / result.exchangeRate, "USD")}</div>
                          </div>
                        </div>

                        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-md">
                          <div className="text-sm text-muted-foreground">Infrastructure & Utilities</div>
                          <div className="text-xl font-medium">{formatCurrency(result.infrastructureCost / result.exchangeRate, "USD")}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Includes borehole, power backup, security systems, and essential amenities
                          </div>
                        </div>

                        <div className="p-6 bg-green-50 dark:bg-green-950/30 rounded-md">
                          <div className="text-sm font-medium text-muted-foreground">Total Investment Cost</div>
                          <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                            {formatCurrency(result.totalInUSD, "USD")}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            At exchange rate of ₦{result.exchangeRate} = $1 USD
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
