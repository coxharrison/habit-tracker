import { useState, useEffect, useRef, useCallback } from 'react'
import { format } from 'date-fns'
import { getSettings, saveSettings } from '../utils/storage'

export function useNotifications(habits) {
  const [settings, setSettings] = useState(() => getSettings())
  const intervalRef = useRef(null)

  const persist = useCallback((updated) => {
    setSettings(updated)
    saveSettings(updated)
  }, [])

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return false
    if (Notification.permission === 'granted') return true
    const result = await Notification.requestPermission()
    return result === 'granted'
  }, [])

  const setEnabled = useCallback(
    async (enabled) => {
      if (enabled) {
        const granted = await requestPermission()
        if (!granted) return
      }
      persist({ ...settings, notificationsEnabled: enabled })
    },
    [settings, persist, requestPermission]
  )

  // Check every minute if any habit's reminder time has arrived
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    if (!settings.notificationsEnabled) return
    if (Notification.permission !== 'granted') return

    intervalRef.current = setInterval(() => {
      const now = format(new Date(), 'HH:mm')
      const todayStr = format(new Date(), 'yyyy-MM-dd')

      for (const habit of habits) {
        if (!habit.reminderTime || habit.reminderTime !== now) continue

        const key = `habit-tracker-notified-${habit.id}`
        if (localStorage.getItem(key) === todayStr) continue

        localStorage.setItem(key, todayStr)
        new Notification(habit.name, { body: 'Time for your habit! 🌱' })
      }
    }, 60_000)

    return () => clearInterval(intervalRef.current)
  }, [settings.notificationsEnabled, habits])

  return { settings, setEnabled }
}
