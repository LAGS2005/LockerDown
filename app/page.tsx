'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Lock, MapPin, Smartphone, Clock } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">Smart Locker</div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-secondary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-balance">
                Secure Storage Made Simple
              </h1>
              <p className="text-xl text-primary-foreground/90 text-pretty max-w-lg">
                Book premium storage lockers instantly. Access your items 24/7 with mobile monitoring and guaranteed security.
              </p>
              <div className="flex gap-4 pt-4">
                <Link href="/register">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center">
              <div className="relative w-full h-96 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <div className="text-center space-y-4">
                  <Lock className="w-24 h-24 text-accent mx-auto" />
                  <p className="text-white text-lg">Secure & Convenient</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Smart Locker?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need for secure, convenient storage at your fingertips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Lock,
                title: 'Bank-Level Security',
                description: 'Advanced encryption and 24/7 surveillance for complete peace of mind.',
              },
              {
                icon: MapPin,
                title: 'Prime Locations',
                description: 'Lockers at convenient downtown and airport locations.',
              },
              {
                icon: Smartphone,
                title: 'Mobile Access',
                description: 'Book, manage, and access your locker from anywhere with our app.',
              },
              {
                icon: Clock,
                title: 'Flexible Rentals',
                description: 'Book by the hour, day, week, or month. Cancel anytime.',
              },
            ].map((feature, idx) => (
              <Card key={idx} className="p-6 border border-border hover:border-primary/50 transition-colors">
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">No hidden fees. Pay only for what you use.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { size: 'Small', price: '$5.99', desc: 'Perfect for documents and small items' },
              { size: 'Medium', price: '$9.99', desc: 'Great for luggage and seasonal items', popular: true },
              { size: 'Large', price: '$14.99', desc: 'Ideal for furniture and bulk storage' },
            ].map((plan, idx) => (
              <Card
                key={idx}
                className={`p-8 border ${
                  plan.popular
                    ? 'border-primary bg-primary/5 shadow-lg scale-105'
                    : 'border-border'
                } transition-all`}
              >
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.size}</h3>
                <p className="text-4xl font-bold text-primary mb-2">{plan.price}</p>
                <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                  Choose Plan
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Secure Your Belongings?</h2>
          <p className="text-xl text-primary-foreground/90">
            Join thousands of customers who trust Smart Locker for their storage needs.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold text-primary mb-4">Smart Locker</div>
              <p className="text-sm text-muted-foreground">Secure storage, made simple.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Smart Locker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
