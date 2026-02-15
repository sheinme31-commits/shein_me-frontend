import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <div className="relative">
      <span onClick={handleClick} className="text-lm-cream text-xs cursor-default select-none">©</span>
      {showInput && (
        <input
          autoFocus type="text" value={value} onChange={handleChange}
          onBlur={() => { setShowInput(false); setValue(''); setClicks(0) }}
          className="absolute bottom-6 right-0 w-24 bg-lm-ivory border-b border-lm-sand
                     text-lm-noir text-xs font-body px-2 py-1 outline-none"
          placeholder="..."
        />
      )}
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-lm-noir text-lm-ivory mt-auto">
      {/* Marquee */}
      <div className="border-b border-lm-noir-soft overflow-hidden py-4">
        <div className="whitespace-nowrap animate-marquee inline-block">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="inline-block mx-12 font-display text-lg font-light
                                      tracking-luxury text-lm-sand/30 italic">
              La Mode 28 • Élégance • Prêt-à-Porter • Paris •{' '}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <p className="font-display text-3xl font-light tracking-luxury mb-4">LA MODE 28</p>
            <p className="text-lm-sand font-body font-light text-sm leading-relaxed max-w-xs">
              Une sélection raffinée de prêt-à-porter féminin, livrée dans toute l'Algérie.
            </p>
          </div>

          <div>
            <p className="lm-label text-lm-gold mb-6">Collections</p>
            <ul className="space-y-3">
              {['Tous les produits', 'Hauts', 'Bas', 'Jeans', 'Sacs'].map((cat) => (
                <li key={cat}>
                  <Link
                    to={cat === 'Tous les produits' ? '/products' : `/products?category=${cat}`}
                    className="text-lm-sand font-body font-light text-sm hover:text-lm-ivory
                               transition-colors duration-300"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="lm-label text-lm-gold mb-6">Informations</p>
            <ul className="space-y-3 text-lm-sand font-body font-light text-sm">
              <li>Livraison dans les 58 wilayas</li>
              <li>Paiement à la livraison</li>
              <li>Retour sous 7 jours</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-lm-noir-soft flex items-center justify-between">
          <p className="text-lm-sand/40 text-xs font-body font-light tracking-luxury">
            {new Date().getFullYear()} La Mode 28. Tous droits réservés.
          </p>
          <AdminSecretAccess />
        </div>
      </div>
    </footer>
  )
}

export default Footer