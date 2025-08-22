import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Target, Eye, Users } from "lucide-react"

const teamMembers = [
  {
    name: "Dr. Sarah Johnson",
    role: "Chief Medical Officer",
    description: "Leading blood bank operations with 15+ years of experience",
  },
  {
    name: "Michael Chen",
    role: "Technology Director",
    description: "Developing innovative solutions for blood bank management",
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Manager",
    description: "Ensuring smooth coordination between blood banks and donors",
  },
  {
    name: "David Thompson",
    role: "Quality Assurance Lead",
    description: "Maintaining the highest standards in blood safety protocols",
  },
]

const stats = [
  { label: "Blood Banks Onboarded", value: "500+" },
  { label: "Donors Registered", value: "25,000+" },
  { label: "Lives Saved", value: "50,000+" },
  { label: "Cities Covered", value: "150+" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
          <div className="container max-w-4xl text-center">
            <Heart className="w-16 h-16 text-red-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About BloodBankGroup</h1>
            <p className="text-xl text-muted-foreground">
              We're on a mission to revolutionize blood donation and distribution through technology, 
              connecting blood banks, donors, and patients in a seamless network that saves lives.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-8 h-8 text-red-600" />
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                </div>
                <CardContent className="p-0">
                  <p className="text-muted-foreground">
                    To create a comprehensive platform that connects blood banks, donors, and patients, 
                    ensuring efficient blood distribution and saving lives through innovative technology 
                    and seamless coordination.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Eye className="w-8 h-8 text-red-600" />
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                </div>
                <CardContent className="p-0">
                  <p className="text-muted-foreground">
                    To build a world where blood shortage is eliminated through smart technology, 
                    efficient management, and a strong network of committed blood banks and donors 
                    working together to save lives.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <p className="text-xl text-muted-foreground">
                Numbers that reflect our commitment to saving lives
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <Users className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Our Team</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Meet the dedicated professionals working to make blood donation more efficient and accessible
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{member.name}</h3>
                    <p className="text-red-600 font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}