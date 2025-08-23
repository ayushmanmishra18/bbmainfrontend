"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-lg">BloodBankGroup</span>
          </Link>
        </div>

        {/* Middle: Navigation */}
        <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Login/Register Buttons (Desktop only) - Show only on home page */}
          {pathname === '/' && (
            <div className="hidden md:flex items-center gap-3">
              <Button
                asChild
                className="bg-white text-gray-900 shadow hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-gray-200"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="bg-white text-gray-900 shadow hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-gray-200"
              >
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="flex flex-col space-y-2 p-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Login/Register - Show only on home page */}
            {pathname === '/' && (
              <div className="flex flex-col gap-2 mt-4">
                <Button
                  asChild
                  className="bg-white text-gray-900 shadow hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-gray-200"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="bg-white text-gray-900 shadow hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-gray-200"
                >
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
