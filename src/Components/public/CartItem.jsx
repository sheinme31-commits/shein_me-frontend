import { Trash2 } from 'lucide-react'
import QuantitySelector from './QuantitySelector'
import { useCart } from '../../context/CartContext'

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()
  return (
    <div className="flex gap-6 py-8 border-b border-lm-cream">
      <div className="w-24 h-32 bg-lm-cream flex-shrink-0 overflow-hidden">
        {item.image
          ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          : <div className="w-full h-full" />
        }
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-lm-taupe font-body font-light text-xs tracking-luxury uppercase mb-1">
            {item.brand}
          </p>
          <h4 className="font-display font-light text-lm-noir text-xl mb-1">{item.name}</h4>
          <p className="text-lm-taupe font-body font-light text-xs tracking-luxury uppercase">
            Taille {item.size}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <QuantitySelector
            value={item.quantity} min={1} max={item.maxStock}
            onChange={(qty) => updateQuantity(item.key, qty)}
          />
          <div className="flex items-center gap-6">
            <span className="font-body font-light text-lm-noir">
              {(item.price * item.quantity).toLocaleString('fr-DZ')} DA
            </span>
            <button
              onClick={() => removeFromCart(item.key)}
              className="text-lm-sand hover:text-lm-noir transition-colors"
            >
              <Trash2 size={14} strokeWidth={1} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem