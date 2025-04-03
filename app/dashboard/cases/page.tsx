"use client";

import MainLayout from "../../components/MainLayout";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { FileText } from "lucide-react";

const caseStudies = [
  {
    id: 1,
    title: "Lagos Waterfront Development Success",
    description: "How a diaspora investor navigated complex regulations to build a successful waterfront property in Lagos.",
    category: "Success Story",
    region: "Lagos",
  },
  {
    id: 2,
    title: "Certificate of Occupancy Disputes in Abuja",
    description: "A cautionary tale of incomplete documentation leading to years of legal battles in the FCT.",
    category: "Cautionary Tale",
    region: "Abuja",
  },
  {
    id: 3,
    title: "Family Land Inheritance Complications",
    description: "The challenges faced when purchasing land with disputed family ownership in Port Harcourt.",
    category: "Cautionary Tale",
    region: "Port Harcourt",
  },
  {
    id: 4,
    title: "Rental Property Investment Portfolio",
    description: "How a small portfolio of rental properties in Ibadan created sustainable passive income.",
    category: "Success Story",
    region: "Ibadan",
  },
];

export default function CaseStudies() {
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
            <h1 className="text-3xl font-bold mb-4">Property Investment Case Studies</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-world examples of both cautionary tales and success stories from diaspora investors in Nigerian property.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{study.title}</CardTitle>
                      <FileText className="h-5 w-5 text-npira-blue" />
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Badge variant={study.category === "Success Story" ? "secondary" : "destructive"}
                        className={study.category === "Success Story" ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300" : ""}>
                        {study.category}
                      </Badge>
                      <Badge variant="outline">{study.region}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-foreground/80">
                      {study.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
