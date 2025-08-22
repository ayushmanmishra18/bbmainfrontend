import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Shield, Users, Activity, UsersRound, Heart, MapPin, Phone, Mail } from "lucide-react"

const features = [
  {
    title: "Secure Blood Bank Registration",
    description: "Register your blood bank with complete security and compliance measures.",
    icon: Shield,
  },
  {
    title: "Manage Administrators",
    description: "Efficiently manage administrators and their access levels.",
    icon: Users,
  },
  {
    title: "Track Donor & Patient Data",
    description: "Comprehensive tracking of donor histories and patient requirements.",
    icon: Activity,
  },
  {
    title: "Join Blood Bank Groups",
    description: "Collaborate with other blood banks through our group system.",
    icon: UsersRound,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Connecting Blood Banks,{" "}
                <span className="text-red-600">Donors</span>, and{" "}
                <span className="text-red-600">Patients</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                A comprehensive platform designed to streamline blood bank operations, 
                facilitate donor-patient connections, and ensure efficient blood distribution 
                across healthcare networks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link href="/register">Register Blood Bank</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage your blood bank operations efficiently
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-red-600" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
                <div className="text-muted-foreground">Registered Blood Banks</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-red-600 mb-2">10,000+</div>
                <div className="text-muted-foreground">Active Donors</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-red-600 mb-2">25,000+</div>
                <div className="text-muted-foreground">Lives Saved</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <Heart className="w-16 h-16 text-red-600 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join our network of blood banks and healthcare providers working 
                together to save lives every day.
              </p>
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/register">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}