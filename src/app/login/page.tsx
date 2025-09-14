// src/app/login/page.tsx
"use client";
import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginAdmin } from "../../lib/api";
import FormInput from "../../components/ui/FormInput";
import PublicHeader from "../../components/layout/PublicHeader";
import PublicFooter from "../../components/layout/PublicFooter";

const LoginPage = () => {
  const [email, setEmail] = useState("admin@bloodbank.com");
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await loginAdmin(email, password);
      if (response.success) {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-subtle dark:bg-gray-950">
      <PublicHeader />
      {/* UPDATED: Increased top padding (pt-32) for better spacing */}
      <main className="flex-grow flex items-center justify-center p-4 pt-32 pb-12">
        {/* UPDATED: Removed glass effect, using a solid dark background */}
        <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-content dark:text-gray-100">
              Admin Login
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Access your Blood Bank Dashboard
            </p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md text-center">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              id="email"
              name="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FormInput
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-sm text-right">
              <a href="#" className="font-medium text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-8 py-3 font-bold text-blue-500 transition-all duration-300 rounded-md border-2 border-blue-500 bg-transparent hover:bg-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:border-gray-500 disabled:text-gray-500 disabled:bg-transparent"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-500 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
};

export default LoginPage;
