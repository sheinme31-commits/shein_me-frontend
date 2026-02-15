import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  const hasStock = product.sizes?.some((s) => s.stock > 0)
  const imageUrl = product.images?.[0] || '/placeholder.jpg'

  return (
    <Link to={`/products/${product._id}`} className="card-product block">
      {/* Image */}
      <div className="relative overflow-hidden bg-lm-cream aspect-[3/4]">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700
                     group-hover:scale-105"
          loading="lazy"
        />
        {!hasStock && (
          <Link
            to={`/products?category=${product.category}`}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 bg-lm-ivory/80 flex flex-col items-center
                       justify-center gap-3"
          >
            <span className="font-body font-light tracking-luxury uppercase text-xs text-lm-taupe">
              Épuisé
            </span>
            <span className="font-body font-light tracking-luxury uppercase text-xs
                             text-lm-gold border-b border-lm-gold/40 pb-px
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Articles similaires →
            </span>
          </Link>
        )}
      </div>

      {/* Infos */}
      <div className="pt-4 pb-2">
        <p className="text-lm-taupe font-body font-light text-xs tracking-luxury uppercase mb-1">
          {product.brand}
        </p>
        <h3 className="font-display font-light text-lm-noir text-lg leading-snug
                       group-hover:text-lm-gold transition-colors duration-300 mb-2">
          {product.name}
        </h3>
        <p className="font-body font-light text-lm-noir text-sm tracking-wider">
          {(product.price ?? 0).toLocaleString('fr-DZ')} DA
        </p>
      </div>
    </Link>
  )
}

export default ProductCard