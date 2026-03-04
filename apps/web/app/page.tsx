"use client";

import { Shield } from "lucide-react";
import { motion } from "motion/react";
import UploadContractForm from "@/components/upload-contract-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-display font-bold text-lg text-foreground">
              ContractIQ
            </span>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground leading-tight">
              Analyze contracts
              <br />
              <span className="text-gradient">with precision</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-lg max-w-md mx-auto">
              Upload any contract and get instant AI-powered risk analysis,
              clause-by-clause breakdown, and negotiation tips.
            </p>
          </motion.div>

          <UploadContractForm />
        </div>
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        ContractIQ — AI-Powered Contract Intelligence
      </footer>
    </div>
  );
}
