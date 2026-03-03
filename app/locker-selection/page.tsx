'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/lib/context/auth-context'
import { useRental } from '@/lib/context/rental-context'
import { MapPin, Check } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface Locker {
  id: string
  location: string
  address: string
  availableSmall: number
  availableMedium: number
  availableLarge: number
  distance: number
}

const MOCK_LOCKERS: Locker[] = [
  {
    id: '1',
    location: 'Downtown Hub',
    address: '123 Main St, City Center',
    availableSmall: 8,
    availableMedium: 5,
    availableLarge: 3,
    distance: 0.2,
  },
  {
    id: '2',
    location: 'Airport Terminal',
    address: 'International Airport, Terminal 2',
    availableSmall: 12,
    availableMedium: 9,
    availableLarge: 6,
    distance: 8.5,
  },
  {
    id: '3',
    location: 'Union Station',
    address: '456 Station Ave, North End',
    availableSmall: 4,
    availableMedium: 3,
    availableLarge: 2,
    distance: 2.1,
  },
  {
    id: '4',
    location: 'Shopping District',
    address: '789 Retail Way, Mall Area',
    availableSmall: 10,
    availableMedium: 7,
    availableLarge: 4,
    distance: 1.8,
  },
]

interface LockerSize {
  name: string
  key: 'small' | 'medium' | 'large'
  dimensions: string
  pricePerDay: number
  pricePerWeek: number
  pricePerMonth: number
}

const LOCKER_SIZES: LockerSize[] = [
  {
    name: 'Small',
    key: 'small',
    dimensions: '1ft × 1ft × 2ft',
    pricePerDay: 5.99,
    pricePerWeek: 35,
    pricePerMonth: 99,
  },
  {
    name: 'Medium',
    key: 'medium',
    dimensions: '2ft × 2ft × 3ft',
    pricePerDay: 9.99,
    pricePerWeek: 60,
    pricePerMonth: 179,
  },
  {
    name: 'Large',
    key: 'large',
    dimensions: '3ft × 3ft × 4ft',
    pricePerDay: 14.99,
    pricePerWeek: 90,
    pricePerMonth: 299,
  },
]

export default function LockerSelectionPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const { setRentalData } = useRental()
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="max-w-md p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Please log in first</h2>
          <p className="text-muted-foreground mb-6">You need to be logged in to select a locker.</p>
          <Link href="/login">
            <Button className="w-full">Go to Login</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const handleContinue = () => {
    if (selectedLocation && selectedSize) {
      const locker = MOCK_LOCKERS.find((l) => l.id === selectedLocation)
      const size = LOCKER_SIZES.find((s) => s.key === selectedSize)

      if (locker && size) {
        setRentalData({
          location: locker.location,
          lockerSize: size.name,
        })
        router.push('/rental-duration')
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Select Your Locker</h1>
          <p className="text-muted-foreground">Welcome, {user.name}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Location Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Choose a Location</h2>
              <p className="text-muted-foreground mb-6">Select the locker location closest to you</p>

              <div className="space-y-3">
                {MOCK_LOCKERS.map((locker) => (
                  <Card
                    key={locker.id}
                    className={`p-4 cursor-pointer border transition-all ${
                      selectedLocation === locker.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedLocation(locker.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold text-foreground">{locker.location}</h3>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {locker.distance} km away
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{locker.address}</p>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="font-semibold text-foreground">{locker.availableSmall}</span>
                            <p className="text-xs text-muted-foreground">Small available</p>
                          </div>
                          <div>
                            <span className="font-semibold text-foreground">{locker.availableMedium}</span>
                            <p className="text-xs text-muted-foreground">Medium available</p>
                          </div>
                          <div>
                            <span className="font-semibold text-foreground">{locker.availableLarge}</span>
                            <p className="text-xs text-muted-foreground">Large available</p>
                          </div>
                        </div>
                      </div>
                      {selectedLocation === locker.id && (
                        <Check className="w-6 h-6 text-primary flex-shrink-0 ml-2" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Choose a Size</h2>
              <p className="text-muted-foreground mb-6">Pick the locker size that fits your needs</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {LOCKER_SIZES.map((size) => (
                  <Card
                    key={size.key}
                    className={`p-6 cursor-pointer border transition-all ${
                      selectedSize === size.key
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedSize(size.key)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{size.name}</h3>
                        <p className="text-sm text-muted-foreground">{size.dimensions}</p>
                      </div>
                      {selectedSize === size.key && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="space-y-2 pt-4 border-t border-border">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Per Day</span>
                        <span className="font-semibold text-foreground">${size.pricePerDay}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Per Week</span>
                        <span className="font-semibold text-foreground">${size.pricePerWeek}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Per Month</span>
                        <span className="font-semibold text-foreground">${size.pricePerMonth}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <Card className="p-6 sticky top-20">
              <h3 className="text-lg font-semibold text-foreground mb-4">Booking Summary</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="font-semibold text-foreground">
                    {selectedLocation
                      ? MOCK_LOCKERS.find((l) => l.id === selectedLocation)?.location
                      : 'Not selected'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Size</p>
                  <p className="font-semibold text-foreground">
                    {selectedSize
                      ? LOCKER_SIZES.find((s) => s.key === selectedSize)?.name
                      : 'Not selected'}
                  </p>
                </div>
              </div>

              <Button
                onClick={handleContinue}
                disabled={!selectedLocation || !selectedSize}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                Continue to Duration
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
