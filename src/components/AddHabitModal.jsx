import { useState, useEffect } from 'react'

const PRESET_COLORS = [
  '#6366f1', // indigo
  '#ec4899', // pink
  '#f59e0b', // amber
  '#10b981', // emerald
  '#3b82f6', // blue
  '#ef4444', // red
]

export function AddHabitModal({ onSave, onClose, initial }) {
  const [name, setName] = useState(initial?.name ?? '')
  const [color, setColor] = useState(initial?.color ?? PRESET_COLORS[0])
  const [reminderOn, setReminderOn] = useState(initial?.reminderTime != null)
  const [reminderTime, setReminderTime] = useState(initial?.reminderTime ?? '09:00')
  const [monthlyGoal, setMonthlyGoal] = useState(initial?.monthlyGoal ?? '')

  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    const goal = monthlyGoal !== '' ? parseInt(monthlyGoal, 10) : null
    onSave(trimmed, color, reminderOn ? reminderTime : null, goal)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {initial ? 'Edit Habit' : 'New Habit'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Morning Run"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                  style={{
                    backgroundColor: c,
                    borderColor: color === c ? '#1f2937' : 'transparent',
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Daily reminder
              </label>
              <button
                type="button"
                onClick={() => setReminderOn((v) => !v)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  reminderOn ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    reminderOn ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            {reminderOn && (
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly goal <span className="text-gray-400 font-normal">(days — optional)</span>
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={monthlyGoal}
              onChange={(e) => setMonthlyGoal(e.target.value)}
              placeholder="e.g. 20"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 transition"
            >
              {initial ? 'Save' : 'Add Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
