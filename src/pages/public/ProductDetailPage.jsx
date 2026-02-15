import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShoppingBag, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import api from '../../utils/api'
import { useCart } from '../../context/CartContext'
import SizeSelector from '../../Components/public/SizeSelector'
import QuantitySelector from '../../Components/public/QuantitySelector'
import toast from 'react-hot-toast'

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data)
        const firstAvailable = res.data.sizes?.find((s) => s.stock > 0)
        if (firstAvailable) setSelectedSize(firstAvailable.size)
      })
      .catch(() => navigate('/products'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-lm-ivory flex items-center justify-center pt-20">
        <div className="w-8 h-8 border border-lm-sand border-t-lm-gold rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) return null

  const maxStock = product.sizes?.find((s) => s.size === selectedSize)?.stock || 1
  const images = product.images?.length > 0 ? product.images : ['/placeholder.jpg']

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Veuillez sélectionner une taille')
      return
    }
    addToCart(product, selectedSize, quantity)
    toast.success(`${product.name} ajouté au panier`)
  }

  const prevImage = () => setCurrentImage((i) => (i === 0 ? images.length - 1 : i - 1))
  const nextImage = () => setCurrentImage((i) => (i === images.length - 1 ? 0 : i + 1))

  return (
    <div className="min-h-screen bg-lm-ivory pt-20">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-10 pb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-lm-taupe hover:text-lm-noir
                     transition-colors text-xs font-body font-light tracking-luxury
                     uppercase group"
        >
          <ArrowLeft size={12} strokeWidth={1}
            className="group-hover:-translate-x-1 transition-transform duration-300" />
          Retour
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* Galerie */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-[3/4] bg-lm-cream overflow-hidden group">
              <img
                src={images[currentImage]}
                alt={`${product.name} — ${currentImage + 1}`}
                className="w-full h-full object-cover transition-transform duration-700
                           group-hover:scale-105"
              />
              {images.length > 1 && (
                <>
                  <button onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10
                               bg-lm-ivory/80 flex items-center justify-center
                               opacity-0 group-hover:opacity-100 transition-opacity
                               hover:bg-lm-ivory">
                    <ChevronLeft size={16} strokeWidth={1} />
                  </button>
                  <button onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10
                               bg-lm-ivory/80 flex items-center justify-center
                               opacity-0 group-hover:opacity-100 transition-opacity
                               hover:bg-lm-ivory">
                    <ChevronRight size={16} strokeWidth={1} />
                  </button>
                  <div className="absolute bottom-4 right-4 bg-lm-ivory/80 px-3 py-1
                                  text-xs font-body font-light text-lm-taupe">
                    {currentImage + 1} / {images.length}
                  </div>
                </>
              )}
              <div className="absolute top-4 left-4">
                <span className="tag-lm">{product.category}</span>
              </div>
            </div>

            {/* Miniatures */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setCurrentImage(i)}
                    className={`aspect-[3/4] overflow-hidden border transition-all duration-300
                                ${i === currentImage
                                  ? 'border-lm-gold'
                                  : 'border-lm-cream hover:border-lm-sand'}`}>
                    <img src={img} alt={`Vue ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations */}
          <div className="flex flex-col gap-8 animate-fade-up">
            <div>
              <p className="lm-label mb-3">{product.brand}</p>
              <h1 className="font-display font-light text-lm-noir text-4xl sm:text-5xl
                              leading-tight mb-6">
                {product.name}
              </h1>
              <p className="font-display font-light text-lm-noir text-3xl">
                {(product.price ?? 0).toLocaleString('fr-DZ')}
                <span className="text-base text-lm-taupe font-body ml-2">DA</span>
              </p>
            </div>

            <div className="h-px bg-lm-sand" />

            {/* Tailles */}
            <div>
              <p className="text-lm-taupe font-body font-light tracking-luxury uppercase
                             text-xs mb-4">
                Taille
                {selectedSize && <span className="ml-3 text-lm-noir">{selectedSize}</span>}
              </p>
              <SizeSelector
                sizes={product.sizes || []}
                selected={selectedSize}
                onChange={(size) => { setSelectedSize(size); setQuantity(1) }}
              />
              {selectedSize && (
                <p className="text-lm-sand text-xs font-body font-light mt-3">
                  {maxStock} en stock
                </p>
              )}
            </div>

            {/* Quantité */}
            <div>
              <p className="text-lm-taupe font-body font-light tracking-luxury uppercase
                             text-xs mb-4">
                Quantité
              </p>
              <QuantitySelector
                value={quantity} min={1} max={maxStock} onChange={setQuantity}
              />
            </div>

            <button onClick={handleAddToCart} className="btn-primary w-full py-5 text-sm">
              <ShoppingBag size={14} strokeWidth={1} />
              Ajouter au panier
            </button>

            {/* Description */}
            {product.description && (
              <>
                <div className="h-px bg-lm-sand" />
                <div>
                  <p className="text-lm-taupe font-body font-light tracking-luxury uppercase
                                 text-xs mb-4">Description</p>
                  <p className="text-lm-taupe font-body font-light leading-relaxed text-sm">
                    {product.description}
                  </p>
                </div>
              </>
            )}

            {/* Livraison */}
            <div className="border border-lm-sand p-6">
              <p className="font-body font-light text-lm-noir text-sm mb-1">
                Livraison dans toute l'Algérie
              </p>
              <p className="text-lm-taupe text-xs font-body font-light">
                Paiement à la livraison · 2 à 5 jours ouvrables
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage