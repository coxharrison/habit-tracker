import { useState } from 'react'
import { isCompletedToday, getCurrentStreak } from '../utils/streaks'
import { ProgressChart } from './ProgressChart'
import { AddHabitModal } from './AddHabitModal'

export function HabitCard({ habit, onToggle, onUpdate, onDelete }) {
  const [showChart, setShowChart] = useState(false)
  const [editing, setEditing] = useState(false)

  const done = isCompletedToday(habit.completions)
  const streak = getCurrentStreak(habit.completions)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Color dot */}
        <span
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: habit.color }}
        />

        {/* Name */}
        <span className="flex-1 text-gray-800 font-medium text-sm">
          {habit.name}
        </span>

        {/* Streak badge */}
        {streak > 0 && (
          <span className="text-xs font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-0.5">
            🔥 {streak}
          </span>
        )}

        {/* Reminder badge */}
        {habit.reminderTime && (
          <span className="text-xs text-indigo-500 bg-indigo-50 rounded-full px-2 py-0.5">
            🔔 {habit.reminderTime}
          </span>
        )}

        {/* Chart toggle */}
        <button
          onClick={() => setShowChart((v) => !v)}
          className="text-gray-400 hover:text-gray-600 text-xs px-2 py-1 rounded-lg hover:bg-gray-100 transition"
          title="Show progress"
        >
          {showChart ? '▲' : '▼'}
        </button>

        {/* Edit */}
        <button
          onClick={() => setEditing(true)}
          className="text-gray-400 hover:text-gray-600 text-xs px-2 py-1 rounded-lg hover:bg-gray-100 transition"
          title="Edit habit"
        >
          ✏️
        </button>

        {/* Delete */}
        <button
          onClick={() => {
            if (confirm(`Delete "${habit.name}"?`)) onDelete(habit.id)
          }}
          className="text-gray-400 hover:text-red-500 text-xs px-2 py-1 rounded-lg hover:bg-red-50 transition"
          title="Delete habit"
        >
          🗑️
        </button>

        {/* Check-off button */}
        <button
          onClick={() => onToggle(habit.id)}
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
            done
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 text-transparent hover:border-green-400'
          }`}
        >
          ✓
        </button>
      </div>

      {showChart && (
        <div className="border-t border-gray-100 px-4 py-3">
          <ProgressChart completions={habit.completions} color={habit.color} />
        </div>
      )}

      {editing && (
        <AddHabitModal
          initial={habit}
          onSave={(name, color, reminderTime, monthlyGoal) => onUpdate(habit.id, name, color, reminderTime, monthlyGoal)}
          onClose={() => setEditing(false)}
        />
      )}
    </div>
  )
}
