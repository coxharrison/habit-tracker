const QUOTES = [
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { text: "A year from now you may wish you had started today.", author: "Karen Lamb" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The difference between who you are and who you want to be is what you do.", author: "Unknown" },
  { text: "Consistency is the key to achieving and maintaining momentum.", author: "Darren Hardy" },
  { text: "You will never always be motivated. You have to learn to be disciplined.", author: "Unknown" },
  { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "The habit of persistence is the habit of victory.", author: "Herbert Kaufman" },
  { text: "Every day is a chance to be better than yesterday.", author: "Unknown" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "What you do every day matters more than what you do once in a while.", author: "Gretchen Rubin" },
  { text: "The groundwork for all happiness is good health.", author: "Leigh Hunt" },
  { text: "First forget inspiration. Habit is more dependable.", author: "Octavia Butler" },
  { text: "Small steps every day add up to big changes over time.", author: "Unknown" },
  { text: "A small daily task, if it really be daily, will beat the labours of a spasmodic Hercules.", author: "Anthony Trollope" },
  { text: "Your future self is watching you right now through your memories.", author: "Aubrey de Grey" },
  { text: "The secret to your success is found in your daily routine.", author: "John C. Maxwell" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
  { text: "Progress, not perfection.", author: "Unknown" },
  { text: "Show up. Do the work. Let the results follow.", author: "Unknown" },
  { text: "One day or day one. You decide.", author: "Unknown" },
]

export function getDailyQuote() {
  const start = new Date(new Date().getFullYear(), 0, 0)
  const diff = new Date() - start
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
  return QUOTES[dayOfYear % QUOTES.length]
}
