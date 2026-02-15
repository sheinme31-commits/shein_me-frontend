import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'

function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-lm-ivory pt-20 flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center animate-fade-up">
        <div className="w-16 h-16 border border-lm-gold flex items-center justify-center mx-auto mb-10">
          <Check size={24} strokeWidth={1} className="text-lm-gold" />
        </div>

        <p className="lm-label mb-4">Commande confirmée</p>
        <h1 className="font-display font-light text-lm-noir text-6xl italic mb-6">
          Merci !
        </h1>
        <p className="text-lm-taupe font-body font-light leading-relaxed mb-2">
          Votre commande a bien été enregistrée.
        </p>
        <p className="text-lm-taupe font-body font-light leading-relaxed mb-12">
          Notre équipe vous contactera pour confirmer la livraison.
        </p>

        <div className="h-px bg-lm-sand mb-12" />

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products" className="btn-primary">Continuer mes achats</Link>
          <Link to="/" className="btn-outline">Accueil</Link>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPage