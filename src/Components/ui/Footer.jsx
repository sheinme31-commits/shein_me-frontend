// src/components/ui/Footer.jsx

import { Link } from 'react-router-dom'
import { Zap, Instagram, Twitter } from 'lucide-react'
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
    if (next >= 3) {
      setShowInput(true)
      setClicks(0)
    }
  }

  const handleChange = (e) => {
    const val = e.target.value
    setValue(val)
    if (val.toLowerCase() === 'admin') {
      setShowInput(false)
      setValue('')
      navigate('/admin/login')
    }
  }

  return (
    <div className="relative">
      <span
        onClick={handleClick}
        className="text-brand-gray-900 text-xs cursor-default select-none"
      >
        ©
      </span>
      {showInput && (
        <input
          autoFocus
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={() => { setShowInput(false); setValue(''); setClicks(0) }}
          className="absolute bottom-6 right-0 w-28 bg-brand-gray-900 border border-brand-gray-700
                     text-brand-white text-xs font-body px-2 py-1 outline-none
                     focus:border-brand-red"
          placeholder="..."
        />
      )}
    </div>
  )
}
function Footer() {
  return (
    <footer className="bg-brand-gray-900 border-t border-brand-gray-800 mt-auto">
      {/* Marquee décoratif */}
      <div className="overflow-hidden border-b border-brand-gray-800 py-3 bg-brand-red/5">
        <div className="whitespace-nowrap animate-marquee inline-block">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="inline-block mx-8 font-display text-xl tracking-widest text-brand-gray-700">
              SOLEKICKS • STREETWEAR • SNEAKERS • ALGÉRIE •{' '}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-brand-red flex items-center justify-center"
                   style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)' }}>
                <Zap size={12} className="text-white fill-white" />
              </div>
              <span className="font-display text-xl tracking-widest text-brand-white">SOLEKICKS</span>
            </Link>
            <p className="text-brand-gray-400 text-sm font-body leading-relaxed max-w-xs">
              La destination streetwear pour les passionnés de sneakers en Algérie.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading font-bold tracking-widest uppercase text-xs text-brand-red mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Accueil' },
                { to: '/products', label: 'Tous les produits' },
                { to: '/cart', label: 'Panier' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-brand-gray-400 hover:text-brand-red text-sm font-body
                               transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-3 h-px bg-brand-gray-700 group-hover:bg-brand-red
                                     transition-all duration-200 group-hover:w-5" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Infos */}
          <div>
            <h3 className="font-heading font-bold tracking-widest uppercase text-xs text-brand-red mb-4">
              Infos
            </h3>
            <p className="text-brand-gray-400 text-sm font-body mb-3">
              Livraison disponible dans toutes les wilayas d'Algérie.
            </p>
            <p className="text-brand-gray-400 text-sm font-body">
              Paiement à la livraison uniquement.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-brand-gray-800 flex flex-col sm:flex-row
                        items-center justify-between gap-4">
          <p className="text-brand-gray-600 text-xs font-body">
            © {new Date().getFullYear()} SOLEKICKS. Tous droits réservés.
          </p>
          <AdminSecretAccess />
        </div>
      </div>
    </footer>
  )
}

export default Footer