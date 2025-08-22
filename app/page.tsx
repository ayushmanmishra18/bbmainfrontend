import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
          <div className="container flex flex-col items-center text-center px-4">
            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900 dark:text-gray-100 max-w-3xl">
              Connecting Blood Banks, Donors, and Patients
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl">
              A comprehensive platform designed to streamline blood bank
              operations, facilitate donor-patient connections, and ensure
              efficient blood distribution across healthcare networks.
            </p>

            {/* Buttons Section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="px-8 py-4 rounded-lg text-base font-medium bg-white text-gray-900 shadow hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-gray-200"
              >
                <Link href="/register">Register</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="px-8 py-4 rounded-lg text-base font-medium bg-white text-gray-900 shadow hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-gray-200"
              >
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
