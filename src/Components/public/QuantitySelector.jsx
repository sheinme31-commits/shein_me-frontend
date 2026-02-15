import { Minus, Plus } from 'lucide-react'

function QuantitySelector({ value, min = 1, max = 99, onChange }) {
  return (
    <div className="flex items-center border-b border-lm-sand w-fit">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-10 h-10 flex items-center justify-center text-lm-taupe
                   hover:text-lm-noir transition-colors disabled:opacity-30"
      >
        <Minus size={12} strokeWidth={1} />
      </button>
      <input
        type="number" value={value} min={min} max={max}
        onChange={(e) => { const n = parseInt(e.target.value, 10); if (!isNaN(n)) onChange(Math.max(min, Math.min(max, n))) }}
        className="w-10 h-10 bg-transparent text-center text-lm-noir font-body font-light text-sm outline-none"
      />
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-10 h-10 flex items-center justify-center text-lm-taupe
                   hover:text-lm-noir transition-colors disabled:opacity-30"
      >
        <Plus size={12} strokeWidth={1} />
      </button>
    </div>
  )
}

export default QuantitySelector