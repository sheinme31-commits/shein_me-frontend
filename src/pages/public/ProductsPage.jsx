import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import api from '../../utils/api'
import ProductGrid from '../../Components/public/ProductGrid'

const CATEGORIES = ['Tous', 'Hauts', 'Bas', 'Jean', 'Sacs']

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const activeCategory = searchParams.get('category') || 'Tous'

  useEffect(() => {
    api.get('/products')
      .then((res) => setProducts(res.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => products.filter((p) => {
    const matchCat = activeCategory === 'Tous' || p.category === activeCategory
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  }), [products, activeCategory, search])

  const setCategory = (cat) => {
    if (cat === 'Tous') searchParams.delete('category')
    else searchParams.set('category', cat)
    setSearchParams(searchParams)
  }

  return (
    <div className="min-h-screen bg-lm-ivory">
      {/* En-tête */}
      <div className="bg-lm-cream pt-32 pb-16 border-b border-lm-sand">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <p className="lm-label mb-4">Catalogue</p>
          <h1 className="font-display font-light text-lm-noir text-5xl md:text-6xl mb-2">
            {activeCategory === 'Tous' ? 'Tous les articles' : activeCategory}
          </h1>
          <p className="text-lm-taupe font-body font-light text-sm">
            {loading ? '...' : `${filtered.length} pièce${filtered.length !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {/* Filtres */}
      <div className="sticky top-0 z-40 bg-lm-ivory/95 backdrop-blur-sm border-b border-lm-cream">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4
                        flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-6 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`font-body font-light tracking-luxury uppercase text-xs
                             transition-all duration-300 pb-1 border-b
                             ${activeCategory === cat
                               ? 'text-lm-noir border-lm-gold'
                               : 'text-lm-taupe border-transparent hover:text-lm-noir hover:border-lm-sand'
                             }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search size={12} strokeWidth={1}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-lm-taupe" />
            <input
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="bg-transparent border-b border-lm-sand text-lm-noir font-body
                         font-light text-xs pl-5 pr-6 py-2 outline-none focus:border-lm-gold
                         placeholder:text-lm-sand w-48 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-lm-taupe">
                <X size={10} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grille */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
        <ProductGrid products={filtered} loading={loading}
          emptyMessage="Aucun article dans cette catégorie." />
      </div>
    </div>
  )
}

export default ProductsPage