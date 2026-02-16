import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingBag, Search, Menu, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const NAV_LINKS = [
  { to: '/products?category=Bébé', label: 'Bébé' },
  { to: '/products?category=Enfants', label: 'Enfants' },
  { to: '/products?category=Femme', label: 'Femme' },
  { to: '/products?category=Homme', label: 'Homme' },
  { to: '/products?category=Lingerie', label: 'Lingerie' },
  { to: '/products?category=Accessoires', label: 'Accessoires' },
  { to: '/about', label: 'Qui sommes-nous' },
]

function Navbar() {
  const { itemCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchVal.trim()) {
      navigate(`/products?search=${searchVal}`)
      setSearchOpen(false)
      setSearchVal('')
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
                     ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-soft' : 'bg-sf-cream/90 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18 py-3">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-sf-rose rounded-full flex items-center justify-center">
              <span className="font-display text-sf-text text-sm font-600">S</span>
            </div>
            <div>
              <p className="font-display text-sf-text text-lg leading-none">Soft Family</p>
              <p className="font-body text-sf-text-light text-[10px] tracking-widest uppercase">Store</p>
            </div>
          </Link>

          {/* Nav desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={label} to={to}
                className="font-body text-sf-text-soft text-sm hover:text-sf-text
                           transition-colors duration-200 relative group whitespace-nowrap">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sf-rose rounded-full
                                 group-hover:w-full transition-all duration-300" />
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Recherche */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    autoFocus value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="Rechercher..."
                    className="bg-sf-beige border border-sf-beige-dark rounded-full
                               px-4 py-1.5 text-sm font-body outline-none w-40
                               focus:border-sf-rose transition-all"
                  />
                  <button type="button" onClick={() => setSearchOpen(false)}
                    className="ml-2 text-sf-text-soft hover:text-sf-text">
                    <X size={16} />
                  </button>
                </form>
              ) : (
                <button onClick={() => setSearchOpen(true)}
                  className="p-2 text-sf-text-soft hover:text-sf-text transition-colors">
                  <Search size={20} strokeWidth={1.5} />
                </button>
              )}
            </div>

            {/* Panier */}
            <button onClick={() => navigate('/cart')}
              className="relative p-2 text-sf-text-soft hover:text-sf-text transition-colors">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-sf-rose
                                 text-sf-text text-[10px] font-body font-700
                                 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Burger mobile */}
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-sf-text-soft hover:text-sf-text transition-colors">
              {menuOpen ? <X size={20} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-sf-beige animate-fade-in">
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={label} to={to} onClick={() => setMenuOpen(false)}
                className="font-body text-sf-text-soft text-base hover:text-sf-rose
                           transition-colors py-1 border-b border-sf-beige">
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