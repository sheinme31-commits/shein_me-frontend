import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Instagram, Facebook, Heart, Truck, CreditCard } from 'lucide-react'

function AdminSecretAccess() {
  const [clicks, setClicks] = useState(0)
  const [showInput, setShowInput] = useState(false)
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const handleClick = () => {
    const next = clicks + 1
    setClicks(next)
    if (next >= 3) { setShowInput(true); setClicks(0) }
  }

  const handleChange = (e) => {
    const val = e.target.value
    setValue(val)
    if (val.toLowerCase() === 'admin') {
      setShowInput(false); setValue(''); navigate('/admin/login')
    }
  }

  return (
    <div className="relative inline-block">
      <span onClick={handleClick}
        className="text-sf-beige-dark text-xs cursor-default select-none">©</span>
      {showInput && (
        <input autoFocus type="text" value={value} onChange={handleChange}
          onBlur={() => { setShowInput(false); setValue(''); setClicks(0) }}
          className="absolute bottom-6 right-0 w-24 bg-white border border-sf-beige-dark
                     text-sf-text text-xs font-body px-2 py-1 rounded-lg outline-none
                     shadow-soft"
          placeholder="..." />
      )}
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-sf-beige mt-auto">
      {/* Bandeau avantages */}
      <div className="bg-sf-rose-soft border-y border-sf-rose/30 py-4">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-sf-rose rounded-full flex items-center justify-center">
              <Truck size={18} className="text-sf-text" />
            </div>
            <div>
              <p className="font-body font-700 text-sf-text text-sm">Livraison rapide</p>
              <p className="font-body text-sf-text-soft text-xs">Dans toutes les wilayas</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-sf-sage rounded-full flex items-center justify-center">
              <CreditCard size={18} className="text-white" />
            </div>
            <div>
              <p className="font-body font-700 text-sf-text text-sm">Paiement à la livraison</p>
              <p className="font-body text-sf-text-soft text-xs">100% sécurisé</p>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden py-3 border-b border-sf-beige-dark">
        <div className="whitespace-nowrap animate-marquee inline-block">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="inline-block mx-10 font-display text-sf-text-light italic text-sm">
              SheinMe Store • Mode & Tendance • Bébé • Enfants • Femme • Homme •
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-sf-rose rounded-full flex items-center justify-center">
                <span className="font-display text-sf-text text-sm">S</span>
              </div>
              <div>
                <p className="font-display text-sf-text text-xl">SheinMe Store</p>
              </div>
            </div>
            <p className="font-body text-sf-text-soft text-sm leading-relaxed max-w-xs mb-6">
              Mode douce et élégante pour toute la famille, du nouveau-né aux parents.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-sf-rose rounded-full flex items-center
                                    justify-center hover:bg-sf-rose-dark transition-colors">
                <Instagram size={16} className="text-sf-text" />
              </a>
              <a href="#" className="w-9 h-9 bg-sf-rose rounded-full flex items-center
                                    justify-center hover:bg-sf-rose-dark transition-colors">
                <Facebook size={16} className="text-sf-text" />
              </a>
            </div>
          </div>

          {/* Catégories */}
          <div>
            <p className="sf-label mb-4">Catégories</p>
            <ul className="space-y-2">
              {['Bébé', 'Enfants', 'Femme', 'Homme', 'Lingerie', 'Accessoires'].map((cat) => (
                <li key={cat}>
                  <Link to={`/products?category=${cat}`}
                    className="font-body text-sf-text-soft text-sm hover:text-sf-rose
                               transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Infos */}
          <div>
            <p className="sf-label mb-4">Informations</p>
            <ul className="space-y-2">
              <li>
                <Link to="/about"
                  className="font-body text-sf-text-soft text-sm hover:text-sf-rose transition-colors">
                  Qui sommes-nous
                </Link>
              </li>
              <li className="font-body text-sf-text-soft text-sm">Livraison 58 wilayas</li>
              <li className="font-body text-sf-text-soft text-sm">Retour sous 7 jours</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-sf-beige-dark flex items-center justify-between">
          <p className="font-body text-sf-text-light text-xs flex items-center gap-1">
            <AdminSecretAccess />
            {' '}{new Date().getFullYear()} SheinMe Store. Fait avec{' '}
            <Heart size={10} className="text-sf-rose fill-sf-rose" /> en Algérie
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer