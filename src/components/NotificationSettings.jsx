export function NotificationSettings({ settings, onToggle }) {
  const supported = 'Notification' in window

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <h2 className="text-sm font-semibold text-gray-700 mb-1">Reminders</h2>
      <p className="text-xs text-gray-400 mb-3">Set reminder times on individual habits</p>

      {!supported && (
        <p className="text-xs text-red-500">
          Notifications are not supported in this browser.
        </p>
      )}

      {supported && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Enable habit reminders</span>
            <button
              onClick={() => onToggle(!settings.notificationsEnabled)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                settings.notificationsEnabled ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  settings.notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {Notification.permission === 'denied' && (
            <p className="text-xs text-amber-600">
              Notifications are blocked. Please allow them in your browser settings.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
