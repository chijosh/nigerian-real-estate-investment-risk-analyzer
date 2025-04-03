"use client";

import MainLayout from "../../components/MainLayout";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Shield, AlertTriangle, Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";

const riskMitigationStrategies = [
  {
    id: "legal",
    title: "Legal Risk Mitigation",
    icon: <Shield className="h-6 w-6 text-blue-600" />,
    description: "Strategies to minimize legal risks in Nigerian property investment",
    strategies: [
      {
        title: "Comprehensive Title Search",
        description: "Conduct thorough background checks on property history through multiple sources, including the local Land Registry, traditional rulers, and community leaders."
      },
      {
        title: "Use Qualified Legal Representation",
        description: "Engage a reputable lawyer with specific expertise in Nigerian property law and the local jurisdiction where the property is located."
      },
      {
        title: "Proper Documentation",
        description: "Ensure all transactions are properly documented, witnessed, and registered with appropriate government agencies."
      },
      {
        title: "Family Verification",
        description: "When purchasing family land, obtain written consent from all relevant family members and clan heads to prevent future disputes."
      }
    ]
  },
  {
    id: "financial",
    title: "Financial Risk Mitigation",
    icon: <Shield className="h-6 w-6 text-green-600" />,
    description: "Strategies to protect your investment against financial risks",
    strategies: [
      {
        title: "Staged Payment Structure",
        description: "Arrange payments in stages tied to specific milestones and completion of work, rather than making large upfront payments."
      },
      {
        title: "Currency Hedging",
        description: "Consider hedging strategies to protect against Naira depreciation if making payments from abroad over an extended period."
      },
      {
        title: "Comprehensive Budget Planning",
        description: "Create a detailed budget that includes a 20-30% contingency for unexpected costs and potential inflation impacts."
      },
      {
        title: "Escrow Arrangements",
        description: "Use trusted third-party escrow services for large transactions to ensure funds are only released when conditions are met."
      }
    ]
  },
  {
    id: "logistical",
    title: "Logistical Risk Mitigation",
    icon: <Shield className="h-6 w-6 text-amber-600" />,
    description: "Strategies to address infrastructure and management challenges",
    strategies: [
      {
        title: "Local Project Management",
        description: "Hire a reputable project manager with local expertise who can provide regular updates and manage day-to-day operations."
      },
      {
        title: "Infrastructure Planning",
        description: "Invest in independent utility solutions such as boreholes, solar power, and backup generators to mitigate infrastructure deficits."
      },
      {
        title: "Regular Site Visits",
        description: "Schedule periodic visits (or arrange for trusted representatives) to verify progress and maintain accountability."
      },
      {
        title: "Quality Control Protocols",
        description: "Implement strict quality control measures and inspections at key construction phases before releasing additional funds."
      }
    ]
  },
  {
    id: "market",
    title: "Market Risk Mitigation",
    icon: <Shield className="h-6 w-6 text-purple-600" />,
    description: "Strategies to protect against market and political volatility",
    strategies: [
      {
        title: "Multiple Property Valuations",
        description: "Obtain independent valuations from multiple sources before purchasing to avoid overpaying."
      },
      {
        title: "Investment Diversification",
        description: "Spread investments across different property types and locations to reduce exposure to localized market downturns."
      },
      {
        title: "Phased Development Approach",
        description: "Consider a phased approach to development, allowing flexibility to adapt to changing market conditions."
      },
      {
        title: "Exit Strategy Planning",
        description: "Develop clear exit strategies before investing, with multiple options for monetizing or disposing of the property if needed."
      }
    ]
  }
];

export default function RiskMitigationStrategies() {
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
            <h1 className="text-3xl font-bold mb-4">Risk Mitigation Strategies</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Practical approaches to minimize the risks associated with property investment in Nigeria.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {riskMitigationStrategies.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      {category.icon}
                      <CardTitle>{category.title}</CardTitle>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.strategies.map((strategy, strategyIndex) => (
                        <AccordionItem key={`${category.id}-${strategyIndex}`} value={`item-${strategyIndex}`}>
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span>{strategy.title}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground pl-6">{strategy.description}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
                <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Important Note</h3>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  While these strategies can significantly reduce risks, investing in Nigerian property will always carry some degree of uncertainty.
                  We recommend working with trusted local experts and continuing to educate yourself about the specific challenges in your target region.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
