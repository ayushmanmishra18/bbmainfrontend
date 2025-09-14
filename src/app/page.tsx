// src/app/page.tsx
import React from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import Link from "next/link";
import { ShieldCheck, Share2, AreaChart } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <PublicHeader />

      <main className="flex-grow">
        {/* 1. Hero Section */}
        <section className="relative pt-40 pb-24 text-center overflow-hidden">
          <div className="absolute inset-0 bg-subtle dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))]"></div>

          <div className="container mx-auto px-4 relative">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
              The Digital Backbone for
              <br />
              India's Lifeline.
            </h1>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/register"
                className="px-8 py-3 text-lg font-bold text-blue-500 bg-transparent border-2 border-blue-500 rounded-md hover:bg-blue-500/10 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Register Your Blood Bank
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Key Features Section */}
        <section className="py-24 bg-background dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Digitize, Collaborate, and Save Lives
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Our platform provides the essential tools to operate
                efficiently, transparently, and collaboratively.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-16">
              {/* Feature 1 */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-2">
                <div className="flex items-center justify-center h-16 w-16 bg-subtle dark:bg-gray-800 rounded-full mb-5 mx-auto">
                  <ShieldCheck className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Real-Time Inventory
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Eliminate guesswork with a live, digital inventory. Reduce
                  wastage and track every unit in real-time.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-2">
                <div className="flex items-center justify-center h-16 w-16 bg-subtle dark:bg-gray-800 rounded-full mb-5 mx-auto">
                  <Share2 className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Seamless Collaboration
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Collaborate seamlessly within a network of banks. Fulfill
                  urgent needs faster with digital transfers.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-2">
                <div className="flex items-center justify-center h-16 w-16 bg-subtle dark:bg-gray-800 rounded-full mb-5 mx-auto">
                  <AreaChart className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Powerful Reporting
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Make data-driven decisions. Generate insightful reports and
                  manage compliance with one click.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-subtle dark:bg-gray-900 py-20">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-4">Ready to Modernize?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Join a growing network of modern institutions. Digitize your
              operations today.
            </p>
            <Link
              href="/register"
              className="px-8 py-3 text-lg font-bold text-blue-500 bg-transparent border-2 border-blue-500 rounded-md hover:bg-blue-500/10 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Get Started Now
            </Link>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
