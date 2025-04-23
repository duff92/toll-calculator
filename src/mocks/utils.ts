import { TollRules, VehicleType } from './types'

// Using the logic from the C# implementation to calculate toll fees
export const tollRules: TollRules = {
  maxDailyFee: 60,
  freeVehicleTypes: [
    VehicleType.Motorbike,
    VehicleType.Emergency,
    VehicleType.Diplomat,
    VehicleType.Foreign,
    VehicleType.Military,
    VehicleType.Bus,
  ],
  feeByTime: [
    { fromHour: 6, fromMinute: 0, toHour: 6, toMinute: 29, fee: 8 },
    { fromHour: 6, fromMinute: 30, toHour: 6, toMinute: 59, fee: 13 },
    { fromHour: 7, fromMinute: 0, toHour: 7, toMinute: 59, fee: 18 },
    { fromHour: 8, fromMinute: 0, toHour: 8, toMinute: 29, fee: 13 },
    { fromHour: 8, fromMinute: 30, toHour: 14, toMinute: 59, fee: 8 },
    { fromHour: 15, fromMinute: 0, toHour: 15, toMinute: 29, fee: 13 },
    { fromHour: 15, fromMinute: 30, toHour: 16, toMinute: 59, fee: 18 },
    { fromHour: 17, fromMinute: 0, toHour: 17, toMinute: 59, fee: 13 },
    { fromHour: 18, fromMinute: 0, toHour: 18, toMinute: 29, fee: 8 },
  ],
  // Sample holidays for 2023/2024
  holidayDates: [
    '2023-01-01',
    '2023-04-07',
    '2023-04-10',
    '2023-05-01',
    '2023-05-18',
    '2023-06-06',
    '2023-06-24',
    '2023-12-24',
    '2023-12-25',
    '2023-12-26',
    '2023-12-31',
    '2024-01-01',
    '2024-03-29',
    '2024-04-01',
    '2024-05-01',
    '2024-05-09',
    '2024-06-06',
    '2024-06-22',
    '2024-12-24',
    '2024-12-25',
    '2024-12-26',
    '2024-12-31',
  ],
}

/**
 * Determine if a vehicle is toll-free
 */
export function isTollFreeVehicle(vehicleType: string): boolean {
  return tollRules.freeVehicleTypes.includes(vehicleType as VehicleType)
}

/**
 * Determine if a date is toll-free (weekends and holidays)
 */
export function isTollFreeDate(date: Date): boolean {
  const day = date.getDay()
  // Weekend check (0 = Sunday, 6 = Saturday)
  if (day === 0 || day === 6) {
    return true
  }

  // Holiday check
  const dateStr = date.toISOString().split('T')[0]
  return tollRules.holidayDates.includes(dateStr)
}

/**
 * Calculate the toll fee for a specific date and vehicle
 */
export function getTollFee(timestamp: string, vehicleType: string): number {
  const date = new Date(timestamp)

  // Free if weekend, holiday, or toll-free vehicle
  if (isTollFreeDate(date) || isTollFreeVehicle(vehicleType)) {
    return 0
  }

  const hour = date.getHours()
  const minute = date.getMinutes()

  // Find matching time rule
  const matchingRule = tollRules.feeByTime.find((rule) => {
    const timeInMinutes = hour * 60 + minute
    const ruleStartMinutes = rule.fromHour * 60 + rule.fromMinute
    const ruleEndMinutes = rule.toHour * 60 + rule.toMinute

    return timeInMinutes >= ruleStartMinutes && timeInMinutes <= ruleEndMinutes
  })

  return matchingRule ? matchingRule.fee : 0
}

/**
 * Calculate the total fee for multiple passages in a day
 * Implementing the "once per hour" rule and max daily fee
 */
export function calculateDailyFee(
  passages: Array<{ timestamp: string; vehicleId: string }>,
): number {
  if (passages.length === 0) return 0

  // Sort passages by time
  const sortedPassages = [...passages].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  )

  let totalFee = 0
  let intervalStart = new Date(sortedPassages[0].timestamp)
  let highestFeeInInterval = 0

  for (const passage of sortedPassages) {
    const currentDate = new Date(passage.timestamp)
    const fee = getTollFee(passage.timestamp, passage.vehicleId)

    // Calculate time difference in minutes
    const diffInMinutes =
      (currentDate.getTime() - intervalStart.getTime()) / (1000 * 60)

    if (diffInMinutes <= 60) {
      // Within same hour interval, keep track of highest fee
      highestFeeInInterval = Math.max(highestFeeInInterval, fee)
    } else {
      // New interval - add highest fee from previous interval and reset
      totalFee += highestFeeInInterval
      intervalStart = currentDate
      highestFeeInInterval = fee
    }
  }

  // Add the last interval's fee
  totalFee += highestFeeInInterval

  // Cap at max daily fee
  return Math.min(totalFee, tollRules.maxDailyFee)
}
