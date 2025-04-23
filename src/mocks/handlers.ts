// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'
import { TollPassage, Vehicle, VehicleType } from './types'
import dayjs from 'dayjs'
import { nanoid } from './nanoid'

// Mock database
const vehicles = [
  {
    id: '1',
    type: VehicleType.Car,
    make: 'Toyota',
    model: 'Corolla',
    year: 2015,
    color: 'Blue',
    registrationNumber: 'ABC123',
  },
  {
    id: '2',
    type: VehicleType.Motorbike,
    make: 'Yamaha',
    model: 'YZF-R3',
    year: 2018,
    color: 'Red',
    registrationNumber: 'XYZ789',
  },
  {
    id: '3',
    type: VehicleType.Emergency,
    make: 'Ford',
    model: 'Explorer',
    year: 2020,
    color: 'White',
    registrationNumber: 'EMG001',
  },
  {
    id: '4',
    type: VehicleType.Diplomat,
    make: 'Mercedes',
    model: 'S-Class',
    year: 2019,
    color: 'Black',
    registrationNumber: 'DPL002',
  },
  {
    id: '5',
    type: VehicleType.Bus,
    make: 'Volvo',
    model: '7900',
    year: 2017,
    color: 'Yellow',
    registrationNumber: 'BUS003',
  },
  {
    id: '6',
    type: VehicleType.Truck,
    make: 'Scania',
    model: 'R450',
    year: 2016,
    color: 'Green',
    registrationNumber: 'TRK004',
  },
  {
    id: '7',
    type: VehicleType.Military,
    make: 'Humvee',
    model: 'M998',
    year: 2012,
    color: 'Camouflage',
    registrationNumber: 'MIL005',
  },
  {
    id: '8',
    type: VehicleType.Foreign,
    make: 'BMW',
    model: 'X5',
    year: 2021,
    color: 'Silver',
    registrationNumber: 'FRN006',
  },
  {
    id: '9',
    type: VehicleType.Tractor,
    make: 'John Deere',
    model: '5075E',
    year: 2014,
    color: 'Green',
    registrationNumber: 'TRC007',
  },
  // Add other vehicles from your Mirage setup
]

// Update the type definition for tollRules
interface YearFreeDays {
  [month: number]: number[]
}

interface FreeDays {
  [year: number]: YearFreeDays
}

// Toll rules
const tollRules = {
  maxDailyFee: 60,
  timeFees: [
    { start: { hour: 6, minute: 0 }, end: { hour: 6, minute: 29 }, fee: 8 },
    { start: { hour: 6, minute: 30 }, end: { hour: 6, minute: 59 }, fee: 13 },
    { start: { hour: 7, minute: 0 }, end: { hour: 7, minute: 59 }, fee: 18 },
    { start: { hour: 8, minute: 0 }, end: { hour: 8, minute: 29 }, fee: 13 },
    { start: { hour: 8, minute: 30 }, end: { hour: 14, minute: 59 }, fee: 8 },
    { start: { hour: 15, minute: 0 }, end: { hour: 15, minute: 29 }, fee: 13 },
    { start: { hour: 15, minute: 30 }, end: { hour: 16, minute: 59 }, fee: 18 },
    { start: { hour: 17, minute: 0 }, end: { hour: 17, minute: 59 }, fee: 13 },
    { start: { hour: 18, minute: 0 }, end: { hour: 18, minute: 29 }, fee: 8 },
  ],
  freeVehicleTypes: [
    VehicleType.Motorbike,
    VehicleType.Tractor,
    VehicleType.Emergency,
    VehicleType.Diplomat,
    VehicleType.Foreign,
    VehicleType.Military,
  ],
  freeMonths: [7], // July is toll-free
  freeDays: {
    // Sweden's holidays for 2023
    2023: {
      1: [1], // New Year's Day
      3: [28, 29], // Easter
      4: [1, 30], // Easter Monday, Walpurgis Night
      5: [1, 8, 9], // Labor Day, etc.
      6: [5, 6, 21], // National Day, Midsummer
      11: [1], // All Saints' Day
      12: [24, 25, 26, 31], // Christmas, New Year's Eve
    },
  } as FreeDays,
}

// Initialize passages with sample data
const today = dayjs().toISOString().split('T')[0]

const passages = [
  {
    id: nanoid(),
    vehicleId: '1',
    timestamp: `${today}T07:15:00.000Z`,
    location: 'North Entrance',
    fee: 18,
  },
  {
    id: nanoid(),
    vehicleId: '1',
    timestamp: `${today}T08:45:00.000Z`,
    location: 'East Entrance',
    fee: 8,
  },
  {
    id: nanoid(),
    vehicleId: '1',
    timestamp: `${today}T16:30:00.000Z`,
    location: 'South Entrance',
    fee: 18,
  },
  // Add other sample passages
]

// Add new interface definitions
interface TollFeeBody {
  vehicleType: VehicleType
  timestamp: string
}

interface PassageBody {
  vehicleType: VehicleType
  timestamp: string
  location: string
}

// Helper functions
function isTollFreeVehicle(vehicleType: VehicleType) {
  return tollRules.freeVehicleTypes.includes(vehicleType)
}

function isTollFreeDate(date: string) {
  const dateObj = new Date(date)
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1 // JavaScript months are 0-based
  const day = dateObj.getDate()
  const dayOfWeek = dateObj.getDay()

  // Weekends are toll-free (0 = Sunday, 6 = Saturday)
  if (dayOfWeek === 0 || dayOfWeek === 6) return true

  // Certain months are toll-free (e.g., July)
  if (tollRules.freeMonths.includes(month)) return true

  // Check if it's a holiday

  if (
    tollRules.freeDays[year] &&
    tollRules.freeDays[year][month] &&
    tollRules.freeDays[year][month]?.includes(day)
  ) {
    return true
  }

  return false
}

function getTollFee(timestamp: string, vehicleType: VehicleType) {
  if (isTollFreeVehicle(vehicleType)) return 0
  if (isTollFreeDate(timestamp)) return 0

  const date = new Date(timestamp)
  const hour = date.getHours()
  const minute = date.getMinutes()

  // Find the matching time slot
  const timeSlot = tollRules.timeFees.find((slot) => {
    return (
      (hour > slot.start.hour ||
        (hour === slot.start.hour && minute >= slot.start.minute)) &&
      (hour < slot.end.hour ||
        (hour === slot.end.hour && minute <= slot.end.minute))
    )
  })

  return timeSlot ? timeSlot.fee : 0
}

function calculateDailyFee(passages: TollPassage[]) {
  if (!passages || passages.length === 0) return 0

  // Sort passages by timestamp
  const sortedPassages = [...passages].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  )

  let totalFee = 0
  let lastTimestamp = null
  let highestFeeInHour = 0

  for (const passage of sortedPassages) {
    const currentTime = new Date(passage.timestamp)

    if (lastTimestamp) {
      const diffInMillis = currentTime.getTime() - lastTimestamp.getTime()
      const diffInMinutes = diffInMillis / (1000 * 60)

      if (diffInMinutes <= 60) {
        // Within the same hour period, keep track of highest fee
        highestFeeInHour = Math.max(highestFeeInHour, passage.fee)
      } else {
        // New hour period, add the highest fee from previous period
        totalFee += highestFeeInHour
        highestFeeInHour = passage.fee
      }
    } else {
      // First passage
      highestFeeInHour = passage.fee
    }

    lastTimestamp = currentTime
  }

  // Add the last hour's fee
  totalFee += highestFeeInHour

  // Cap at max daily fee
  return Math.min(totalFee, tollRules.maxDailyFee)
}

export const handlers = [
  // Get all vehicles
  http.get('/api/vehicles', () => {
    return HttpResponse.json({ vehicles })
  }),

  // Get toll rules
  http.get('/api/toll-rules', () => {
    return HttpResponse.json(tollRules)
  }),

  // Get vehicle by registration number
  http.get('/api/vehicles/:registrationNumber', ({ params }) => {
    const { registrationNumber } = params
    const vehicle = vehicles.find(
      (v) => v.registrationNumber === registrationNumber,
    )

    if (!vehicle) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Vehicle not found',
      })
    }

    return HttpResponse.json(vehicle)
  }),

  // Get passages for a vehicle
  http.get('/api/passages/:vehicleId', ({ params }) => {
    const { vehicleId } = params
    const vehiclePassages = passages.filter((p) => p.vehicleId === vehicleId)
    return HttpResponse.json(vehiclePassages)
  }),

  // Calculate toll fee
  http.post('/api/calculate-toll', async ({ request }) => {
    const body = (await request.json()) as TollFeeBody
    const { vehicleType, timestamp } = body

    if (!vehicleType || !timestamp) {
      return new HttpResponse(
        JSON.stringify({ error: 'Vehicle type and timestamp are required' }),
        { status: 400 },
      )
    }

    const fee = getTollFee(timestamp, vehicleType)

    return HttpResponse.json({
      fee,
      vehicleType,
      timestamp,
      isFree: fee === 0,
      reason: isTollFreeVehicle(vehicleType)
        ? 'Vehicle type is toll-free'
        : fee === 0
          ? 'Time or date is toll-free'
          : 'Standard toll applies',
    })
  }),
  // Record a new toll passage
  http.post('/api/passages', async ({ request }) => {
    const body = (await request.json()) as PassageBody
    const { vehicleType, timestamp, location } = body

    if (!vehicleType || !timestamp || !location) {
      return new HttpResponse(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 },
      )
    }

    // Find or create the vehicle
    let vehicle = vehicles.find((v: Vehicle) => v.type === vehicleType)
    if (!vehicle) {
      vehicle = {
        id: nanoid(),
        type: vehicleType,
        make: 'Unknown',
        model: 'Unknown',
        year: new Date().getFullYear(),
        color: 'Unknown',
        registrationNumber: nanoid(),
      }
      vehicles.push(vehicle)
    }

    // Calculate fee
    const fee = getTollFee(timestamp, vehicleType)

    // Create the passage
    const passage = {
      id: nanoid(),
      vehicleId: vehicle?.id ?? '',
      timestamp,
      location,
      fee,
    }

    passages.push(passage)

    return HttpResponse.json(passage)
  }),
  // Get passages with filtering
  http.get('/api/passages', ({ request }) => {
    const url = new URL(request.url)
    const date = url.searchParams.get('date')
    const numberOfDays = url.searchParams.get('numberOfDays')
    const vehicleId = url.searchParams.get('vehicleId')

    let filteredPassages = [...passages]

    // Filter by date if provided
    if (date) {
      const dateStart = new Date(date)
      dateStart.setHours(0, 0, 0, 0)

      const dateEnd = new Date(date)
      if (numberOfDays) {
        const days = Number(numberOfDays)
        if (days > 30) {
          dateEnd.setMonth(dateEnd.getMonth() + Math.floor(days / 30))
          dateEnd.setDate(dateEnd.getDate() + (days % 30))
        } else {
          dateEnd.setDate(dateEnd.getDate() + days)
        }
      }
      dateEnd.setHours(23, 59, 59, 999)

      filteredPassages = filteredPassages.filter((passage) => {
        const passageDate = new Date(passage.timestamp)
        return (
          dayjs(passageDate).isBefore(dayjs(dateEnd)) &&
          dayjs(passageDate).isAfter(dayjs(dateStart))
        )
      })
    }

    // Filter by vehicleId if provided
    if (vehicleId) {
      filteredPassages = filteredPassages.filter(
        (passage) => passage.vehicleId === vehicleId,
      )
    }

    // Group passages by date
    const passagesByDate = filteredPassages.reduce(
      (acc: Record<string, TollPassage[]>, passage) => {
        const date = passage.timestamp.split('T')[0]
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(passage)
        return acc
      },
      {},
    )

    // Calculate daily summaries
    const dailySummaries = Object.keys(passagesByDate).map((date) => {
      const dailyPassages = passagesByDate[date]
      const totalFee = calculateDailyFee(dailyPassages)

      return {
        date,
        passages: dailyPassages,
        totalFee,
        maxDailyFeeApplied: totalFee >= tollRules.maxDailyFee,
      }
    })

    return HttpResponse.json({ dailySummaries })
  }),
]
