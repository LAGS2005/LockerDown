'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle, Copy, Download } from 'lucide-react'
import { useState } from 'react'

export default function ConfirmationPage() {
  const [copied, setCopied] = useState(false)
  const confirmationNumber = 'SL' + Math.random().toString(36).substring(2, 11).toUpperCase()

  const handleCopy = () => {
    navigator.clipboard.writeText(confirmationNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-secondary">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Card className="border-0 shadow-2xl overflow-hidden">
          {/* Success Section */}
          <div className="bg-gradient-to-br from-primary to-secondary text-primary-foreground p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl"></div>
                <CheckCircle className="w-20 h-20 text-accent relative" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-lg text-primary-foreground/90">Your locker rental is secured and ready to use.</p>
          </div>

          {/* Details Section */}
          <div className="p-8 space-y-8">
            {/* Confirmation Number */}
            <div className="bg-secondary/5 border border-border rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-2">Confirmation Number</p>
              <div className="flex items-center gap-2 mt-2">
                <code className="text-2xl font-mono font-bold text-foreground">{confirmationNumber}</code>
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-secondary/10 rounded-lg transition-colors"
                  title="Copy confirmation number"
                >
                  <Copy className="w-5 h-5 text-primary" />
                </button>
              </div>
              {copied && <p className="text-xs text-primary mt-2">Copied to clipboard!</p>}
            </div>

            {/* Booking Details */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Booking Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-l-2 border-primary pl-4">
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="font-semibold text-foreground">Downtown Hub</p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <p className="text-sm text-muted-foreground mb-1">Locker Size</p>
                  <p className="font-semibold text-foreground">Medium</p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                  <p className="font-semibold text-foreground">
                    {new Date().toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <p className="text-sm text-muted-foreground mb-1">End Date</p>
                  <p className="font-semibold text-foreground">
                    {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">What's Next?</h3>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="font-bold text-primary min-w-fit">1.</span>
                  <span className="text-foreground">Download the Smart Locker app or use web access to activate your locker</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary min-w-fit">2.</span>
                  <span className="text-foreground">Visit the location and follow the on-screen access instructions</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary min-w-fit">3.</span>
                  <span className="text-foreground">Secure your items and lock the locker - you're all set!</span>
                </li>
              </ol>
            </div>

            {/* Access Information */}
            <Card className="p-6 border-border">
              <h3 className="font-semibold text-foreground mb-4">How to Access Your Locker</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">📱</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Mobile App</p>
                    <p className="text-sm text-muted-foreground">Open your locker with your smartphone using NFC or QR code</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">🔐</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Secure PIN Code</p>
                    <p className="text-sm text-muted-foreground">Set and manage your personal access PIN in the app</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">⏰</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">24/7 Access</p>
                    <p className="text-sm text-muted-foreground">Access your locker anytime during your rental period</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact Support */}
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <p className="text-muted-foreground mb-4">Need help? Our customer support team is available 24/7</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Button variant="outline" size="sm">
                  📧 Contact Support
                </Button>
                <Button variant="outline" size="sm">
                  📱 Chat with Us
                </Button>
                <Button variant="outline" size="sm">
                  📞 Call Us
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Link href="/dashboard" className="flex-1">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                  Go to Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Receipt
              </Button>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
              <p>Confirmation email has been sent to your registered email address</p>
              <p className="mt-2">Thank you for choosing Smart Locker!</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
