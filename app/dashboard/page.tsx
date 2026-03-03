'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/lib/context/auth-context'
import { useRouter } from 'next/navigation'
import {
  Lock,
  MapPin,
  Calendar,
  DollarSign,
  LogOut,
  Plus,
  Clock,
  AlertCircle,
  ArrowRight,
} from 'lucide-react'

interface ActiveRental {
  id: string
  location: string
  size: string
  startDate: string
  endDate: string
  daysRemaining: number
  totalPrice: number
  status: 'active' | 'expiring-soon'
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()

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
          <Link href="/login">
            <Button className="w-full">Go to Login</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const mockRentals: ActiveRental[] = [
    {
      id: '1',
      location: 'Downtown Hub',
      size: 'Medium',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      daysRemaining: 7,
      totalPrice: 60,
      status: 'active',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Smart Locker Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 border-border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Rentals</p>
                <p className="text-3xl font-bold text-foreground">{mockRentals.length}</p>
              </div>
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Manage your lockers</p>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
                <p className="text-3xl font-bold text-foreground">$60.00</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Account Status</p>
                <p className="text-xl font-bold text-primary">Good Standing</p>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">No issues</p>
          </Card>
        </div>

        {/* Active Rentals */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Active Rentals</h2>
            <Link href="/locker-selection">
              <Button className="gap-2" size="sm">
                <Plus className="w-4 h-4" />
                New Booking
              </Button>
            </Link>
          </div>

          {mockRentals.length > 0 ? (
            <div className="space-y-4">
              {mockRentals.map((rental) => (
                <Card
                  key={rental.id}
                  className={`p-6 border transition-all ${
                    rental.status === 'expiring-soon'
                      ? 'border-destructive/50 bg-destructive/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Location
                      </p>
                      <p className="font-semibold text-foreground">{rental.location}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Locker Size</p>
                      <p className="font-semibold text-foreground">{rental.size}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Days Remaining
                      </p>
                      <p className={`font-semibold ${
                        rental.daysRemaining <= 2 ? 'text-destructive' : 'text-foreground'
                      }`}>
                        {rental.daysRemaining} days
                      </p>
                    </div>

                    <div className="flex items-end justify-between md:justify-start gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total</p>
                        <p className="font-semibold text-foreground">${rental.totalPrice.toFixed(2)}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-2">
                        Manage
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {rental.status === 'expiring-soon' && (
                    <div className="mt-4 pt-4 border-t border-destructive/20 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-destructive">
                        This rental will expire soon. Consider extending it to avoid service interruption.
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 border-border text-center">
              <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Active Rentals</h3>
              <p className="text-muted-foreground mb-6">Start by booking your first locker</p>
              <Link href="/locker-selection">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Book a Locker
                </Button>
              </Link>
            </Card>
          )}
        </div>

        {/* Rental History */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Rental History</h2>
          <Card className="p-6 border-border">
            <p className="text-muted-foreground text-center py-8">No rental history yet</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
