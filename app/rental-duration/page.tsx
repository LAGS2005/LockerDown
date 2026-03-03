'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/context/auth-context'
import { useRental } from '@/lib/context/rental-context'
import { Calendar, DollarSign, Check } from 'lucide-react'
import { useState, useMemo } from 'react'
import Link from 'next/link'

const PRICING = {
  small: { day: 5.99, week: 35, month: 99 },
  medium: { day: 9.99, week: 60, month: 179 },
  large: { day: 14.99, week: 90, month: 299 },
}

type DurationType = 'days' | 'weeks' | 'months'

export default function RentalDurationPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const { rentalData, setRentalData } = useRental()
  const [durationType, setDurationType] = useState<DurationType>('days')
  const [duration, setDuration] = useState(1)

  const lockerSizeKey = (rentalData?.lockerSize?.toLowerCase() || 'small') as keyof typeof PRICING
  const pricing = PRICING[lockerSizeKey] || PRICING.small

  const totalPrice = useMemo(() => {
    if (durationType === 'days') return pricing.day * duration
    if (durationType === 'weeks') return pricing.week * duration
    return pricing.month * duration
  }, [durationType, duration, pricing])

  const calculateEndDate = () => {
    const start = new Date()
    const end = new Date(start)
    if (durationType === 'days') {
      end.setDate(end.getDate() + duration)
    } else if (durationType === 'weeks') {
      end.setDate(end.getDate() + duration * 7)
    } else {
      end.setMonth(end.getMonth() + duration)
    }
    return end
  }

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
          <p className="text-muted-foreground mb-6">Please select a locker first.</p>
          <Link href="/locker-selection">
            <Button className="w-full">Back to Selection</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const handleContinue = () => {
    const startDate = new Date()
    const endDate = calculateEndDate()

    setRentalData({
      duration,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      totalPrice,
    })
    router.push('/checkout')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <h1 className="text-2xl font-bold text-primary">Select Duration</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Duration Selection */}
          <div className="lg:col-span-2 space-y-8">
            {/* Duration Type Selection */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">How long do you need?</h2>
              <div className="grid grid-cols-3 gap-4">
                {(['days', 'weeks', 'months'] as DurationType[]).map((type) => (
                  <Card
                    key={type}
                    className={`p-4 cursor-pointer border transition-all ${
                      durationType === type
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => {
                      setDurationType(type)
                      setDuration(1)
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground capitalize">{type}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {type === 'days'
                            ? '24 hours'
                            : type === 'weeks'
                              ? '7 days'
                              : '30 days'}
                        </p>
                      </div>
                      {durationType === type && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Duration Input */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                How many {durationType}?
              </h2>
              <div className="max-w-sm">
                <Label htmlFor="duration" className="mb-2 block">
                  {durationType.charAt(0).toUpperCase() + durationType.slice(1)}
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  max="365"
                  value={duration}
                  onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                  className="bg-input border-border text-lg"
                />
              </div>
            </div>

            {/* Pricing Breakdown */}
            <Card className="p-6 border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Pricing Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {durationType === 'days'
                      ? `${pricing.day} per day × ${duration} day${duration > 1 ? 's' : ''}`
                      : durationType === 'weeks'
                        ? `${pricing.week} per week × ${duration} week${duration > 1 ? 's' : ''}`
                        : `${pricing.month} per month × ${duration} month${duration > 1 ? 's' : ''}`}
                  </span>
                  <span className="font-semibold text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            {/* Date Summary */}
            <Card className="p-6 border-border bg-secondary/5">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Rental Period
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                  <p className="font-semibold text-foreground">
                    {new Date().toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">End Date</p>
                  <p className="font-semibold text-foreground">
                    {calculateEndDate().toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div>
            <Card className="p-6 sticky top-20">
              <h3 className="text-lg font-semibold text-foreground mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="font-semibold text-foreground">{rentalData.location}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Locker Size</p>
                  <p className="font-semibold text-foreground">{rentalData.lockerSize}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                  <p className="font-semibold text-foreground">
                    {duration} {durationType}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-foreground">Total Price</span>
                  <span className="text-3xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Includes 24/7 access and security monitoring
                </p>
              </div>

              <Button
                onClick={handleContinue}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                Continue to Checkout
              </Button>

              <Button
                onClick={() => router.back()}
                variant="outline"
                className="w-full mt-2"
                size="lg"
              >
                Go Back
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
