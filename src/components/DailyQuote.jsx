import { getDailyQuote } from '../utils/quotes'

const quote = getDailyQuote()

export function DailyQuote() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-4 mb-5">
      <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wide mb-2">
        Daily Quote
      </p>
      <p className="text-sm text-gray-700 leading-relaxed italic">
        "{quote.text}"
      </p>
      <p className="text-xs text-gray-400 mt-2 text-right">— {quote.author}</p>
    </div>
  )
}
