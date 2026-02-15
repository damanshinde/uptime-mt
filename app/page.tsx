import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  AlertCircle,
  Bell,
  CheckCircle2,
  Clock,
  Globe,
  LayoutDashboard,
  Mail,
  Monitor,
  Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">UpTime</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              Trusted by 10,000+ developers
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Monitor your services{" "}
              <span className="text-primary">24/7</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get instant alerts when your websites, APIs, and services go down.
              Track uptime, performance, and ensure your users never experience
              downtime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Monitoring Free
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required. Free plan available.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            {[
              { value: "99.99%", label: "Uptime Guarantee" },
              { value: "30s", label: "Check Interval" },
              { value: "15+", label: "Global Locations" },
              { value: "50ms", label: "Alert Speed" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Everything you need for monitoring
            </h2>
            <p className="text-muted-foreground">
              Comprehensive monitoring tools to keep your services running
              smoothly
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "Global Monitoring",
                description:
                  "Monitor from 15+ locations worldwide to detect regional outages and latency issues.",
              },
              {
                icon: Bell,
                title: "Instant Alerts",
                description:
                  "Get notified via email, Slack, Discord, SMS, or webhooks the moment issues arise.",
              },
              {
                icon: Clock,
                title: "Uptime Reports",
                description:
                  "Detailed historical data and beautiful reports to share with your team and clients.",
              },
              {
                icon: Shield,
                title: "SSL Monitoring",
                description:
                  "Track SSL certificate expiration and get alerts before they expire.",
              },
              {
                icon: Zap,
                title: "Performance Metrics",
                description:
                  "Monitor response times, latency, and performance trends over time.",
              },
              {
                icon: LayoutDashboard,
                title: "Public Status Pages",
                description:
                  "Beautiful status pages to communicate with your users during incidents.",
              },
            ].map((feature) => (
              <Card key={feature.title} className="border-0 shadow-sm">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">How it works</h2>
            <p className="text-muted-foreground">
              Get started in minutes with our simple setup process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Add Your Services",
                description:
                  "Add your websites, APIs, and services you want to monitor. Support for HTTP, HTTPS, TCP, and more.",
              },
              {
                step: "02",
                title: "Configure Alerts",
                description:
                  "Set up notification channels. Choose who gets alerted and how - email, Slack, SMS, or webhooks.",
              },
              {
                step: "03",
                title: "Stay Informed",
                description:
                  "Receive instant alerts when issues occur. Access detailed reports and analytics from your dashboard.",
              },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                <div className="text-6xl font-bold text-muted/30 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-border -ml-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground">
              Start free, upgrade when you need more
            </p>
          </div>

          <Tabs defaultValue="monthly" className="w-full max-w-5xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">
                  Yearly
                  <Badge variant="secondary" className="ml-2">
                    Save 20%
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="monthly">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Free Plan */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Free</CardTitle>
                    <CardDescription>For personal projects</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$0</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "5 monitors",
                        "1-minute intervals",
                        "Email notifications",
                        "3 months history",
                        "Public status page",
                      ].map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6" variant="outline">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>

                {/* Pro Plan */}
                <Card className="border-primary shadow-lg relative">
                  <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                  <CardHeader>
                    <CardTitle>Pro</CardTitle>
                    <CardDescription>For growing teams</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$15</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "50 monitors",
                        "30-second intervals",
                        "All notification channels",
                        "1 year history",
                        "Custom domain status page",
                        "Team collaboration",
                        "Priority support",
                      ].map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6">Start Free Trial</Button>
                  </CardContent>
                </Card>

                {/* Enterprise Plan */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Enterprise</CardTitle>
                    <CardDescription>For large organizations</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$99</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "Unlimited monitors",
                        "15-second intervals",
                        "All Pro features",
                        "Unlimited history",
                        "SSO & SAML",
                        "Custom integrations",
                        "Dedicated support",
                        "SLA guarantee",
                      ].map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6" variant="outline">
                      Contact Sales
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="yearly">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Free Plan Yearly */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Free</CardTitle>
                    <CardDescription>For personal projects</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$0</span>
                      <span className="text-muted-foreground">/year</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "5 monitors",
                        "1-minute intervals",
                        "Email notifications",
                        "3 months history",
                        "Public status page",
                      ].map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6" variant="outline">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>

                {/* Pro Plan Yearly */}
                <Card className="border-primary shadow-lg relative">
                  <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                  <CardHeader>
                    <CardTitle>Pro</CardTitle>
                    <CardDescription>For growing teams</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$144</span>
                      <span className="text-muted-foreground">/year</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "50 monitors",
                        "30-second intervals",
                        "All notification channels",
                        "1 year history",
                        "Custom domain status page",
                        "Team collaboration",
                        "Priority support",
                      ].map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6">Start Free Trial</Button>
                  </CardContent>
                </Card>

                {/* Enterprise Plan Yearly */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Enterprise</CardTitle>
                    <CardDescription>For large organizations</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$950</span>
                      <span className="text-muted-foreground">/year</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "Unlimited monitors",
                        "15-second intervals",
                        "All Pro features",
                        "Unlimited history",
                        "SSO & SAML",
                        "Custom integrations",
                        "Dedicated support",
                        "SLA guarantee",
                      ].map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6" variant="outline">
                      Contact Sales
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-16 text-center max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to start monitoring?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of developers who trust UpTime to keep their
              services running. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Get Started Free
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary-foreground/20 hover:bg-primary-foreground/10"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">UpTime</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Reliable uptime monitoring for modern teams. Keep your services
                running 24/7.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features">Features</Link>
                </li>
                <li>
                  <Link href="#pricing">Pricing</Link>
                </li>
                <li>
                  <Link href="#">Integrations</Link>
                </li>
                <li>
                  <Link href="#">API</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#">About</Link>
                </li>
                <li>
                  <Link href="#">Blog</Link>
                </li>
                <li>
                  <Link href="#">Careers</Link>
                </li>
                <li>
                  <Link href="#">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#">Documentation</Link>
                </li>
                <li>
                  <Link href="#">Help Center</Link>
                </li>
                <li>
                  <Link href="#">Status</Link>
                </li>
                <li>
                  <Link href="#">Security</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 UpTime. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
              <Link href="#">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
