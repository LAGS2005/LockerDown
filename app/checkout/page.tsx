'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/context/auth-context'
import { useRental } from '@/lib/context/rental-context'
import { CheckCircle2, CreditCard } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function CheckoutPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const { rentalData, clearRentalData } = useRental()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardData, setCardData] = useState({
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!user || !rentalData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="max-w-md p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Start from the beginning</h2>
          <p className="text-muted-foreground mb-6">Your booking session has expired.</p>
          <Link href="/locker-selection">
            <Button className="w-full">New Booking</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').slice(0, 16)
      formattedValue = formattedValue.replace(/(\d{4})/g, '$1 ').trim()
    } else if (name === 'expiryDate') {
      formattedValue = value.slice(0, 5)
      if (formattedValue.length === 2 && !formattedValue.includes('/')) {
        formattedValue += '/'
      }
    } else if (name === 'cvv') {
      formattedValue = value.slice(0, 3)
    }

    setCardData((prev) => ({ ...prev, [name]: formattedValue }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.push('/confirmation')
      clearRentalData()
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <h1 className="text-2xl font-bold text-primary">Checkout</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Booking Review */}
            <Card className="p-6 border-border bg-secondary/5">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Booking Details
              </h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold text-foreground">{rentalData.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Locker Size</p>
                    <p className="font-semibold text-foreground">{rentalData.lockerSize}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-semibold text-foreground">
                      {new Date(rentalData.startDate).toLocaleDateString('en-US')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">End Date</p>
                    <p className="font-semibold text-foreground">
                      {new Date(rentalData.endDate).toLocaleDateString('en-US')}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Payment Method Selection */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Payment Method</h2>
              <div className="space-y-3">
                {[
                  { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                  { id: 'digital', label: 'Digital Wallet', icon: '📱' },
                  { id: 'bank', label: 'Bank Transfer', icon: '🏦' },
                ].map((method) => (
                  <Card
                    key={method.id}
                    className={`p-4 cursor-pointer border transition-all ${
                      paymentMethod === method.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => {}}
                        className="w-4 h-4"
                      />
                      <span className="text-lg">{method.icon}</span>
                      <span className="font-semibold text-foreground">{method.label}</span>
                    </label>
                  </Card>
                ))}
              </div>
            </div>

            {/* Card Payment Form */}
            {paymentMethod === 'card' && (
              <Card className="p-6 border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Card Details
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="cardHolder">Cardholder Name</Label>
                    <Input
                      id="cardHolder"
                      name="cardHolder"
                      placeholder="John Doe"
                      value={cardData.cardHolder}
                      onChange={handleCardChange}
                      disabled={isProcessing}
                      className="bg-input border-border mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.cardNumber}
                      onChange={handleCardChange}
                      disabled={isProcessing}
                      className="bg-input border-border mt-1 font-mono"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={cardData.expiryDate}
                        onChange={handleCardChange}
                        disabled={isProcessing}
                        className="bg-input border-border mt-1 font-mono"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={handleCardChange}
                        disabled={isProcessing}
                        className="bg-input border-border mt-1 font-mono"
                        type="password"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isProcessing || !cardData.cardHolder || cardData.cardNumber.length < 16}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="lg"
                  >
                    {isProcessing ? 'Processing...' : 'Complete Payment'}
                  </Button>
                </form>
              </Card>
            )}

            {/* Other Payment Methods */}
            {paymentMethod !== 'card' && (
              <Card className="p-6 border-border">
                <p className="text-muted-foreground mb-4">
                  {paymentMethod === 'digital'
                    ? 'Choose your digital wallet provider in the next step.'
                    : 'Bank transfer details will be provided after confirming your booking.'}
                </p>
                <Button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                >
                  {isProcessing ? 'Processing...' : 'Continue'}
                </Button>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-20">
              <h3 className="text-lg font-semibold text-foreground mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Locker Rental</span>
                  <span className="font-semibold text-foreground">${rentalData.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span className="font-semibold text-foreground">$0.00</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-foreground font-medium">Total</span>
                  <span className="text-3xl font-bold text-primary">
                    ${rentalData.totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Secure payment powered by trusted payment processor
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  ✓ 24/7 customer support
                </p>
                <p className="text-xs text-muted-foreground">
                  ✓ 100% refund guarantee
                </p>
                <p className="text-xs text-muted-foreground">
                  ✓ Cancel anytime
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
