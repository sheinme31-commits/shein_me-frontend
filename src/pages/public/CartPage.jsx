import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import CartItem from '../../Components/public/CartItem'
import CheckoutForm from '../../Components/public/CheckoutForm'
import api from '../../utils/api'
import toast from 'react-hot-toast'
import { useState } from 'react'
function CartPage() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  const handleOrder = async (customerInfo) => {
    if (items.length === 0) { toast.error('Votre panier est vide'); return }
    setSubmitting(true)
    try {
      await api.post('/orders', {
        customerInfo,
        items: items.map((item) => ({
          product: item.productId, name: item.name, size: item.size,
          quantity: item.quantity, price: item.price,
        })),
        total,
      })
      clearCart()
      navigate('/confirmation', { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de la commande.')
    } finally {
      setSubmitting(false) }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-lm-ivory pt-20 flex items-center justify-center">
        <div className="text-center px-4">
          <p className="font-display text-8xl font-light text-lm-cream italic mb-6">vide</p>
          <p className="font-display font-light text-lm-taupe text-2xl mb-2">Votre panier est vide</p>
          <p className="text-lm-taupe font-body font-light text-sm mb-10">
            Découvrez notre sélection
          </p>
          <Link to="/products" className="btn-primary">
            <ShoppingBag size={14} strokeWidth={1} /> Explorer la boutique
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-lm-ivory pt-20">
      <div className="bg-lm-cream border-b border-lm-sand py-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <button onClick={() => navigate('/products')}
            className="flex items-center gap-2 text-lm-taupe hover:text-lm-noir
                       transition-colors text-xs font-body font-light tracking-luxury
                       uppercase mb-6 group">
            <ArrowLeft size={12} strokeWidth={1}
              className="group-hover:-translate-x-1 transition-transform" />
            Continuer mes achats
          </button>
          <p className="lm-label mb-3">Récapitulatif</p>
          <h1 className="font-display font-light text-lm-noir text-5xl">Mon panier</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Articles */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-2 pb-4 border-b border-lm-sand">
              <p className="text-lm-taupe font-body font-light text-xs tracking-luxury uppercase">
                {items.length} article{items.length !== 1 ? 's' : ''}
              </p>
              <button onClick={clearCart}
                className="flex items-center gap-1 text-lm-sand hover:text-lm-taupe
                           transition-colors text-xs font-body font-light">
                <Trash2 size={11} strokeWidth={1} /> Vider
              </button>
            </div>
            {items.map((item) => <CartItem key={item.key} item={item} />)}
          </div>

          {/* Résumé */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-12">
              <div>
                <p className="lm-label mb-6">Total de la commande</p>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.key} className="flex justify-between text-sm font-body font-light">
                      <span className="text-lm-taupe truncate mr-4 flex-1">
                        {item.name} ×{item.quantity}
                      </span>
                      <span className="text-lm-noir whitespace-nowrap">
                        {(item.price * item.quantity).toLocaleString('fr-DZ')} DA
                      </span>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-lm-sand mb-6" />
                <div className="flex justify-between items-baseline">
                  <span className="font-body font-light text-lm-taupe tracking-luxury uppercase text-xs">
                    Total
                  </span>
                  <span className="font-display font-light text-lm-noir text-3xl">
                    {total.toLocaleString('fr-DZ')} DA
                  </span>
                </div>
                <p className="text-lm-sand text-xs font-body font-light mt-2 text-right">
                  Paiement à la livraison
                </p>
              </div>

              <div>
                <p className="lm-label mb-8">Informations de livraison</p>
                <CheckoutForm onSubmit={handleOrder} loading={submitting} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage