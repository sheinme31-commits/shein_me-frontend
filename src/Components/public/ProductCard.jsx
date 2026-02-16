import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

const CATEGORY_COLORS = {
  'Bébé': 'bg-sf-rose text-sf-text',
  'Enfants': 'bg-sf-sage text-white',
  'Femme': 'bg-purple-100 text-purple-700',
  'Homme': 'bg-blue-100 text-blue-700',
  'Lingerie': 'bg-pink-100 text-pink-700',
  'Accessoires': 'bg-amber-100 text-amber-700',
}

function ProductCard({ product }) {
  const hasStock = product.sizes?.some((s) => s.stock > 0)
  const imageUrl = product.images?.[0] || '/placeholder.jpg'
  const badgeClass = CATEGORY_COLORS[product.category] || 'bg-sf-beige text-sf-text'

  return (
    <Link to={`/products/${product._id}`} className="card-product block group">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4] bg-sf-beige">
        <img
          src={imageUrl} alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500
                     group-hover:scale-105"
          loading="lazy"
        />
        {/* Badge catégorie */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-body font-700 px-3 py-1 rounded-full ${badgeClass}`}>
            {product.category}
          </span>
        </div>
        {/* Épuisé */}
        {!hasStock && (
          <Link to={`/products?category=${product.category}`}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 bg-white/70 flex flex-col items-center
                       justify-center gap-2">
            <span className="font-body font-600 text-sf-text-soft text-sm">Épuisé</span>
            <span className="font-body text-sf-rose text-xs underline
                             opacity-0 group-hover:opacity-100 transition-opacity">
              Articles similaires →
            </span>
          </Link>
        )}
      </div>

      {/* Infos */}
      <div className="p-4">
        <p className="font-body text-sf-text-light text-xs mb-1">{product.brand}</p>
        <h3 className="font-display text-sf-text text-lg leading-snug mb-2
                       group-hover:text-sf-rose transition-colors duration-300">
          {product.name}
        </h3>
        <p className="font-body font-700 text-sf-text text-base">
          {(product.price ?? 0).toLocaleString('fr-DZ')} DA
        </p>
      </div>
    </Link>
  )
}

export default ProductCard