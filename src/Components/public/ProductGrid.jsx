import ProductCard from './ProductCard.jsx'

function ProductGrid({ products, loading, emptyMessage = 'Aucun article trouvé.' }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-[3/4] bg-lm-cream animate-pulse mb-4" />
            <div className="h-3 bg-lm-cream animate-pulse w-1/2 mb-2" />
            <div className="h-4 bg-lm-cream animate-pulse w-3/4 mb-2" />
            <div className="h-3 bg-lm-cream animate-pulse w-1/3" />
          </div>
        ))}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="font-display text-5xl font-light text-lm-sand italic mb-4">
          Aucun article
        </p>
        <p className="text-lm-taupe font-body font-light text-sm">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      {products.map((product, i) => (
        <div
          key={product._id}
          className="animate-fade-up"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}

export default ProductGrid