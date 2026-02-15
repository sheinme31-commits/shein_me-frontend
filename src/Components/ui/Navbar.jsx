import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const CATEGORIES = [
  { to: '/products', label: 'Tous les produits' },
  { to: '/products?category=Hauts', label: 'Hauts' },
  { to: '/products?category=Bas', label: 'Bas' },
  { to: '/products?category=Jean', label: 'Jeans' },
  { to: '/products?category=Sacs', label: 'Sacs' },
]

function Navbar() {
  const { itemCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
                     ${scrolled
                       ? 'bg-lm-ivory/95 backdrop-blur-sm border-b border-lm-sand'
                       : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex items-center justify-between h-20">

          {/* Menu burger mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-lm-noir"
          >
            {menuOpen ? <X size={20} strokeWidth={1} /> : <Menu size={20} strokeWidth={1} />}
          </button>

          {/* Logo centré */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <div className="text-center">
              <p className="font-display text-2xl font-light tracking-luxury text-lm-noir">
                LA MODE 28
              </p>
            </div>
          </Link>

          {/* Nav desktop */}
          <div className="hidden md:flex items-center gap-8 flex-1">
            {CATEGORIES.map(({ to, label }) => (
              <NavLink
                key={label}
                to={to}
                className="font-body font-light tracking-luxury uppercase text-xs
                           text-lm-taupe hover:text-lm-noir transition-colors duration-300
                           relative group"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-lm-gold
                                 group-hover:w-full transition-all duration-500" />
              </NavLink>
            ))}
          </div>

          {/* Panier */}
          <button
            onClick={() => navigate('/cart')}
            className="relative text-lm-noir hover:text-lm-gold transition-colors duration-300 ml-auto md:ml-0"
          >
            <ShoppingBag size={20} strokeWidth={1} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-lm-gold text-white
                               text-[9px] font-body flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-lm-ivory border-t border-lm-sand animate-fade-in">
          <div className="px-6 py-8 flex flex-col gap-6">
            {CATEGORIES.map(({ to, label }) => (
              <NavLink
                key={label}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="font-body font-light tracking-luxury uppercase text-sm
                           text-lm-taupe hover:text-lm-noir transition-colors"
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar