import { useState } from 'react'
import { format, isFuture, isToday, parseISO, getDaysInMonth, startOfMonth } from 'date-fns'
import { getCurrentStreak, getMonthDays } from '../utils/streaks'

function getMonthCompletionRate(completions, days) {
  const count = days.filter((d) => completions.includes(d)).length
  return Math.round((count / days.length) * 100)
}

export function MonthView({ habits }) {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())

  const days = getMonthDays(year, month)
  const monthLabel = format(new Date(year, month, 1), 'MMMM yyyy')
  const daysInMonth = getDaysInMonth(startOfMonth(new Date(year, month, 1)))

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
  }

  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
  }

  return (
    <div>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition"
        >
          ‹
        </button>
        <span className="font-semibold text-gray-800">{monthLabel}</span>
        <button
          onClick={nextMonth}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition"
        >
          ›
        </button>
      </div>

      {habits.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🌱</p>
          <p className="text-sm font-medium">No habits yet</p>
          <p className="text-xs mt-1">Add your first habit on the Habits tab</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '90px' }} />
              {days.map((_, i) => (
                <col key={i} style={{ width: '18px' }} />
              ))}
              <col style={{ width: '70px' }} />
            </colgroup>

            {/* Day-number header */}
            <thead>
              <tr>
                <th />
                {days.map((d) => {
                  const dayNum = parseInt(d.slice(-2), 10)
                  const isWeekend = [0, 6].includes(new Date(d + 'T12:00:00').getDay())
                  return (
                    <th
                      key={d}
                      className={`text-center pb-1 text-gray-400 font-normal ${isWeekend ? 'text-gray-300' : ''}`}
                      style={{ fontSize: '9px' }}
                    >
                      {dayNum}
                    </th>
                  )
                })}
                <th />
              </tr>
            </thead>

            <tbody>
              {habits.map((habit) => {
                const streak = getCurrentStreak(habit.completions)
                const rate = getMonthCompletionRate(habit.completions, days)
                const daysThisMonth = days.filter((d) => habit.completions.includes(d)).length

                return (
                  <tr key={habit.id} className="group">
                    {/* Habit name */}
                    <td className="pr-2 py-0.5">
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: habit.color }}
                        />
                        <span className="text-xs text-gray-700 truncate leading-none">
                          {habit.name}
                        </span>
                      </div>
                    </td>

                    {/* Day cells */}
                    {days.map((d) => {
                      const dateObj = parseISO(d + 'T12:00:00')
                      const completed = habit.completions.includes(d)
                      const future = isFuture(dateObj) && !isToday(dateObj)

                      let bg
                      if (completed) bg = habit.color
                      else if (future) bg = '#f3f4f6'
                      else bg = '#e5e7eb'

                      return (
                        <td key={d} className="p-px">
                          <div
                            className="rounded-sm"
                            style={{
                              width: '14px',
                              height: '14px',
                              backgroundColor: bg,
                              opacity: future ? 0.4 : 1,
                            }}
                            title={`${habit.name} — ${d}`}
                          />
                        </td>
                      )
                    })}

                    {/* Stats */}
                    <td className="pl-2 py-0.5">
                      {habit.monthlyGoal ? (
                        <div className="min-w-[64px]">
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {daysThisMonth}/{habit.monthlyGoal}d
                          </span>
                          <div className="w-full bg-gray-200 rounded-full mt-0.5" style={{ height: '4px' }}>
                            <div
                              className="rounded-full h-full"
                              style={{
                                width: `${Math.min(100, Math.round((daysThisMonth / habit.monthlyGoal) * 100))}%`,
                                backgroundColor: habit.color,
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          🔥{streak} · {rate}%
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-3 mt-4 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-indigo-500" />
          <span>Done</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-gray-300" />
          <span>Missed</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-gray-100 opacity-40 border border-gray-200" />
          <span>Future</span>
        </div>
      </div>
    </div>
  )
}
