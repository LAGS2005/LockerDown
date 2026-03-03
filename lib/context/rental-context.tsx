'use client'

import React, { createContext, useContext, useState } from 'react'

export interface RentalData {
  location: string
  lockerSize: string
  duration: number
  startDate: string
  endDate: string
  totalPrice: number
}

interface RentalContextType {
  rentalData: RentalData | null
  setRentalData: (data: Partial<RentalData>) => void
  clearRentalData: () => void
}

const RentalContext = createContext<RentalContextType | undefined>(undefined)

export function RentalProvider({ children }: { children: React.ReactNode }) {
  const [rentalData, setRentalDataState] = useState<RentalData | null>(null)

  const setRentalData = (data: Partial<RentalData>) => {
    setRentalDataState((prev) => ({
      ...(prev || {
        location: '',
        lockerSize: '',
        duration: 1,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        totalPrice: 0,
      }),
      ...data,
    } as RentalData))
  }

  const clearRentalData = () => {
    setRentalDataState(null)
  }

  return (
    <RentalContext.Provider value={{ rentalData, setRentalData, clearRentalData }}>
      {children}
    </RentalContext.Provider>
  )
}

export function useRental() {
  const context = useContext(RentalContext)
  if (context === undefined) {
    throw new Error('useRental must be used within a RentalProvider')
  }
  return context
}
