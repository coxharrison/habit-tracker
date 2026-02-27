import { useState } from 'react'
import { format } from 'date-fns'
import { useHabits } from './hooks/useHabits'
import { useNotifications } from './hooks/useNotifications'
import { HabitCard } from './components/HabitCard'
import { AddHabitModal } from './components/AddHabitModal'
import { NotificationSettings } from './components/NotificationSettings'

function App() {
  const { habits, addHabit, updateHabit, deleteHabit, toggleToday } = useHabits()
  const { settings, setEnabled } = useNotifications(habits)
  const [showModal, setShowModal] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const todayLabel = format(new Date(), 'EEEE, MMMM d')
  const completedCount = habits.filter((h) =>
    h.completions.includes(format(new Date(), 'yyyy-MM-dd'))
  ).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Harry's Habit Tracker</h1>
            <p className="text-sm text-gray-500 mt-0.5">{todayLabel}</p>
          </div>
          <button
            onClick={() => setShowSettings((v) => !v)}
            className="text-gray-400 hover:text-gray-700 text-xl p-1 rounded-lg hover:bg-gray-100 transition"
            title="Settings"
          >
            ⚙️
          </button>
        </div>

        {/* Progress summary */}
        {habits.length > 0 && (
          <div className="bg-indigo-50 rounded-xl px-4 py-3 mb-5 flex items-center justify-between">
            <span className="text-sm text-indigo-700 font-medium">
              Today's progress
            </span>
            <span className="text-sm font-bold text-indigo-700">
              {completedCount}/{habits.length}
            </span>
          </div>
        )}

        {/* Settings panel */}
        {showSettings && (
          <div className="mb-4">
            <NotificationSettings
              settings={settings}
              onToggle={setEnabled}
            />
          </div>
        )}

        {/* Habit list */}
        <div className="space-y-3">
          {habits.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🌱</p>
              <p className="text-sm font-medium">No habits yet</p>
              <p className="text-xs mt-1">Add your first habit below</p>
            </div>
          ) : (
            habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={toggleToday}
                onUpdate={updateHabit}
                onDelete={deleteHabit}
              />
            ))
          )}
        </div>

        {/* FAB */}
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg text-2xl flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition"
          title="Add habit"
        >
          +
        </button>
      </div>

      {showModal && (
        <AddHabitModal
          onSave={addHabit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default App
