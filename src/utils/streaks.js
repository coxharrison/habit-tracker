import { format, subDays, parseISO, differenceInCalendarDays, getDaysInMonth, startOfMonth, addDays } from 'date-fns'

function today() {
  return format(new Date(), 'yyyy-MM-dd')
}

export function isCompletedToday(completions) {
  return completions.includes(today())
}

export function getCurrentStreak(completions) {
  if (!completions.length) return 0

  const sorted = [...completions].sort().reverse()
  const todayStr = today()

  // Streak must include today or yesterday to be "current"
  const mostRecent = sorted[0]
  const daysSinceMostRecent = differenceInCalendarDays(
    parseISO(todayStr),
    parseISO(mostRecent)
  )
  if (daysSinceMostRecent > 1) return 0

  let streak = 0
  let checkDate = parseISO(mostRecent)

  for (const dateStr of sorted) {
    const date = parseISO(dateStr)
    const diff = differenceInCalendarDays(checkDate, date)
    if (diff === 0) {
      streak++
      checkDate = subDays(date, 1)
    } else {
      break
    }
  }

  return streak
}

export function getLongestStreak(completions) {
  if (!completions.length) return 0

  const sorted = [...completions].sort()
  let longest = 1
  let current = 1

  for (let i = 1; i < sorted.length; i++) {
    const diff = differenceInCalendarDays(
      parseISO(sorted[i]),
      parseISO(sorted[i - 1])
    )
    if (diff === 1) {
      current++
      longest = Math.max(longest, current)
    } else if (diff > 1) {
      current = 1
    }
  }

  return longest
}

export function getCompletionRate(completions, days = 30) {
  let completed = 0
  for (let i = 0; i < days; i++) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd')
    if (completions.includes(date)) completed++
  }
  return Math.round((completed / days) * 100)
}

export function getLast30Days() {
  return Array.from({ length: 30 }, (_, i) => {
    const date = subDays(new Date(), 29 - i)
    return format(date, 'yyyy-MM-dd')
  })
}

export function getMonthDays(year, month) {
  const first = startOfMonth(new Date(year, month, 1))
  const count = getDaysInMonth(first)
  return Array.from({ length: count }, (_, i) =>
    format(addDays(first, i), 'yyyy-MM-dd')
  )
}
