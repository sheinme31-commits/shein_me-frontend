import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import api from '../../utils/api'
import ProductGrid from '../../Components/public/ProductGrid'

const CATEGORIES = [
  { label: 'Hauts', desc: 'Chemises, blouses, tops', category: 'Hauts' },
  { label: 'Bas', desc: 'Jupes, pantalons, shorts', category: 'Bas' },
  { label: 'Jeans', desc: 'Coupes actuelles & classiques', category: 'Jean' },
  { label: 'Sacs', desc: 'Maroquinerie & accessoires', category: 'Sacs' },
]

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/products')
      .then((res) => setProducts((res.data || []).slice(0, 8)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-lm-ivory">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end pb-24 overflow-hidden bg-lm-cream">
        {/* Fond texte décoratif */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <p className="font-display text-[20vw] font-light text-lm-sand/20 leading-none
                        tracking-widest whitespace-nowrap italic">
            élégance
          </p>
        </div>

        {/* Ligne verticale déco */}
        <div className="absolute left-10 top-32 bottom-32 w-px bg-lm-sand" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full pt-32">
          <div className="max-w-2xl">
            <p className="lm-label mb-6 animate-fade-up" style={{ animationDelay: '0ms' }}>
              Nouvelle Collection
            </p>
            <h1 className="font-display font-light text-lm-noir leading-none mb-6
                           animate-fade-up"
                style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', animationDelay: '100ms' }}>
              L'art du<br />
              <span className="italic text-lm-gold">bien paraître</span>
            </h1>
            <p className="text-lm-taupe font-body font-light text-base leading-relaxed
                          max-w-md mb-10 animate-fade-up"
               style={{ animationDelay: '200ms' }}>
              Une sélection soignée de pièces féminines intemporelles,
              livrées partout en Algérie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up"
                 style={{ animationDelay: '300ms' }}>
              <Link to="/products" className="btn-primary">
                Découvrir la collection
                <ArrowRight size={14} strokeWidth={1} />
              </Link>
              <Link to="/products?category=Sacs" className="btn-outline">
                Nouveaux sacs
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 right-10 flex flex-col items-center gap-3">
          <div className="w-px h-16 bg-gradient-to-b from-lm-sand to-transparent animate-line-grow" />
          <p className="font-body font-light text-lm-sand text-xs tracking-luxury uppercase
                        rotate-90 origin-center mt-4">
            Scroll
          </p>
        </div>
      </section>

      {/* ── Catégories ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-24">
        <div className="text-center mb-16">
          <p className="lm-label mb-4">Collections</p>
          <h2 className="font-display font-light text-lm-noir text-5xl md:text-6xl">
            Nos catégories
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map(({ label, desc, category }, i) => (
            <Link
              key={label}
              to={`/products?category=${category}`}
              className="group relative aspect-[3/4] bg-lm-cream overflow-hidden flex
                         items-end p-6 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Overlay hover */}
              <div className="absolute inset-0 bg-lm-noir/0 group-hover:bg-lm-noir/20
                              transition-all duration-500" />
              <div className="relative z-10">
                <p className="font-display font-light text-lm-noir text-2xl group-hover:text-lm-ivory
                               transition-colors duration-500 mb-1">
                  {label}
                </p>
                <p className="font-body font-light text-lm-taupe text-xs group-hover:text-lm-sand
                               transition-colors duration-500 tracking-wider">
                  {desc}
                </p>
              </div>
              {/* Ligne déco */}
              <div className="absolute bottom-0 left-0 h-0.5 bg-lm-gold w-0
                              group-hover:w-full transition-all duration-500" />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Divider décoratif ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex items-center gap-6">
          <div className="flex-1 h-px bg-lm-sand" />
          <p className="font-display italic text-lm-gold text-lg font-light">La Mode 28</p>
          <div className="flex-1 h-px bg-lm-sand" />
        </div>
      </div>

      {/* ── Nouveautés ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="lm-label mb-4">Sélection</p>
            <h2 className="font-display font-light text-lm-noir text-5xl md:text-6xl">
              Dernières pièces
            </h2>
          </div>
          <Link to="/products"
            className="hidden sm:flex items-center gap-2 font-body font-light
                       tracking-luxury uppercase text-xs text-lm-taupe
                       hover:text-lm-noir transition-colors group">
            Tout voir
            <ArrowRight size={12} strokeWidth={1}
              className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        <ProductGrid products={products} loading={loading} />

        <div className="flex justify-center mt-12 sm:hidden">
          <Link to="/products" className="btn-outline">Voir tous les articles</Link>
        </div>
      </section>

      {/* ── Bannière livraison ────────────────────────────────────────────── */}
      <section className="bg-lm-noir py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 text-center">
          <p className="font-display font-light text-lm-ivory text-4xl md:text-5xl
                        italic mb-4">
            Livraison dans toute l'Algérie
          </p>
          <p className="text-lm-sand font-body font-light mb-10 tracking-wider">
            58 wilayas · Paiement à la livraison · Retour facilité
          </p>
          <Link to="/products"
            className="inline-flex items-center gap-3 bg-lm-gold text-lm-white
                       font-body font-light tracking-luxury uppercase text-xs px-10 py-4
                       hover:bg-lm-ivory hover:text-lm-noir transition-all duration-500">
            Commander maintenant
            <ArrowRight size={14} strokeWidth={1} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage