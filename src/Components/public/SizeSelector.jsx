function SizeSelector({ sizes = [], selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map(({ size, stock }) => {
        const isSelected = selected === size
        const outOfStock = stock === 0
        return (
          <button
            key={size}
            onClick={() => !outOfStock && onChange(size)}
            disabled={outOfStock}
            className={`min-w-[48px] h-10 px-3 font-body font-light text-xs
                        tracking-luxury uppercase transition-all duration-300 border
                        ${isSelected
                          ? 'bg-lm-noir border-lm-noir text-lm-ivory'
                          : outOfStock
                            ? 'border-lm-cream text-lm-sand cursor-not-allowed line-through'
                            : 'border-lm-sand text-lm-noir hover:border-lm-noir'
                        }`}
          >
            {size}
          </button>
        )
      })}
    </div>
  )
}

export default SizeSelector