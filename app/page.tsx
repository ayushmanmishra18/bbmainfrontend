import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="min-h-[90vh] flex items-center justify-center">
          <div className="container flex flex-col items-center text-center px-4">
            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
              Connecting Blood Banks, Donors, and Patients
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl">
              A comprehensive platform designed to streamline blood bank
              operations, facilitate donor-patient connections, and ensure
              efficient blood distribution across healthcare networks.
            </p>

            {/* Buttons Section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Register Button */}
              <Button
                asChild
                size="lg"
                className="px-8 py-4 rounded-lg text-base font-medium bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow"
              >
                <Link href="/register">Register</Link>
              </Button>

              {/* Login Button */}
              <Button
                asChild
                size="lg"
                className="px-8 py-4 rounded-lg text-base font-medium bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow"
              >
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
