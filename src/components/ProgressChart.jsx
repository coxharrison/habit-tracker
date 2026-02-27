import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { getLast30Days } from '../utils/streaks'
import { format, parseISO } from 'date-fns'

export function ProgressChart({ completions, color }) {
  const days = getLast30Days()
  const data = days.map((date) => ({
    date,
    label: format(parseISO(date), 'MMM d'),
    done: completions.includes(date) ? 1 : 0,
  }))

  const completedCount = data.filter((d) => d.done).length

  return (
    <div>
      <p className="text-xs text-gray-500 mb-2">
        Last 30 days — {completedCount}/30 completed
      </p>
      <ResponsiveContainer width="100%" height={80}>
        <BarChart data={data} barGap={1} barCategoryGap={2}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 9, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
            interval={6}
          />
          <Tooltip
            formatter={(v) => (v ? 'Done' : 'Not done')}
            labelFormatter={(l) => l}
            contentStyle={{ fontSize: 11 }}
          />
          <Bar dataKey="done" radius={[2, 2, 0, 0]} maxBarSize={10}>
            {data.map((entry) => (
              <Cell
                key={entry.date}
                fill={entry.done ? color : '#e5e7eb'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
