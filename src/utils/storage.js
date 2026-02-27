const HABITS_KEY = 'habit-tracker-habits'
const SETTINGS_KEY = 'habit-tracker-settings'

export function getHabits() {
  try {
    const raw = localStorage.getItem(HABITS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveHabits(habits) {
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits))
}

export function getSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    return raw
      ? JSON.parse(raw)
      : { notificationsEnabled: false, notificationTime: '09:00' }
  } catch {
    return { notificationsEnabled: false, notificationTime: '09:00' }
  }
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}
