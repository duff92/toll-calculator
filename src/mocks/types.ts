/**
 * Types for the toll calculator mock API
 */

export interface TollFee {
  amount: number
  timestamp: string
  vehicleId: string
}

export interface TollPassage {
  id: string
  timestamp: string
  vehicleId: string
  fee: number
  location: string
}

export interface DailyTollSummary {
  date: string
  passages: TollPassage[]
  totalFee: number
  maxDailyFeeApplied: boolean
}

export interface TollCalculationRequest {
  vehicleType: string
  timestamp: string
}

export enum VehicleType {
  Car = 'Car',
  Motorbike = 'Motorbike',
  Emergency = 'Emergency',
  Diplomat = 'Diplomat',
  Foreign = 'Foreign',
  Military = 'Military',
  Tractor = 'Tractor',
  Bus = 'Bus',
  Truck = 'Truck',
}

export interface Vehicle {
  id: string
  type: VehicleType
  make: string
  model: string
  year: number
  color: string
  registrationNumber: string
}

export interface TollRulesByTime {
  fromHour: number
  fromMinute: number
  toHour: number
  toMinute: number
  fee: number
}

export interface TollRules {
  maxDailyFee: number
  freeVehicleTypes: string[]
  feeByTime: TollRulesByTime[]
  holidayDates: string[]
}
