import { useState, useCallback } from 'react'
import { format } from 'date-fns'
import { getHabits, saveHabits } from '../utils/storage'

function today() {
  return format(new Date(), 'yyyy-MM-dd')
}

function generateId() {
  return crypto.randomUUID()
}

export function useHabits() {
  const [habits, setHabits] = useState(() => getHabits())

  const persist = useCallback((updated) => {
    setHabits(updated)
    saveHabits(updated)
  }, [])

  const addHabit = useCallback(
    (name, color, reminderTime = null) => {
      const habit = {
        id: generateId(),
        name,
        color,
        reminderTime,
        createdAt: today(),
        completions: [],
      }
      persist([...habits, habit])
    },
    [habits, persist]
  )

  const updateHabit = useCallback(
    (id, name, color, reminderTime) => {
      persist(
        habits.map((h) => (h.id === id ? { ...h, name, color, reminderTime } : h))
      )
    },
    [habits, persist]
  )

  const deleteHabit = useCallback(
    (id) => {
      persist(habits.filter((h) => h.id !== id))
    },
    [habits, persist]
  )

  const toggleToday = useCallback(
    (id) => {
      const todayStr = today()
      persist(
        habits.map((h) => {
          if (h.id !== id) return h
          const completions = h.completions.includes(todayStr)
            ? h.completions.filter((d) => d !== todayStr)
            : [...h.completions, todayStr]
          return { ...h, completions }
        })
      )
    },
    [habits, persist]
  )

  return { habits, addHabit, updateHabit, deleteHabit, toggleToday }
}
