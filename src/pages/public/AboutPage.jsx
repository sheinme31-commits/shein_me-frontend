import { Link } from 'react-router-dom'
import { Heart, Truck, Shield, Star } from 'lucide-react'

function AboutPage() {
  return (
    <div className="min-h-screen bg-sf-cream pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-sf-rose-soft to-sf-sage-soft py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="sf-label mb-4">Notre histoire</p>
          <h1 className="font-display text-sf-text text-5xl md:text-6xl mb-6">
            Qui sommes-nous ?
          </h1>
          <p className="font-body text-sf-text-soft text-lg leading-relaxed">
            Soft Family Store, c'est avant tout une passion pour la mode familiale,
            douce et élégante.
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="sf-label mb-4">Notre mission</p>
            <h2 className="font-display text-sf-text text-4xl mb-4">
              La famille au cœur de tout
            </h2>
            <p className="font-body text-sf-text-soft leading-relaxed">
              Nous croyons que s'habiller en famille est un bonheur. C'est pourquoi nous
              proposons une sélection soignée de vêtements pour toute la famille —
              du nouveau-né aux parents — avec un souci constant de qualité et de confort.
            </p>
          </div>
          <div className="bg-sf-rose-soft rounded-2xl p-8 text-center">
            <span className="text-7xl block mb-4">👨‍👩‍👧‍👦</span>
            <p className="font-display text-sf-text text-2xl">Toute la famille</p>
          </div>
        </div>

        {/* Valeurs */}
        <div>
          <p className="sf-label mb-4 text-center">Nos valeurs</p>
          <h2 className="font-display text-sf-text text-4xl text-center mb-10">
            Ce qui nous définit
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Heart, title: 'Passion', desc: 'Chaque pièce est choisie avec amour pour votre famille.', color: 'bg-sf-rose-soft text-sf-rose-dark' },
              { icon: Shield, title: 'Qualité', desc: 'Des matières douces et résistantes, parfaites pour les enfants.', color: 'bg-sf-sage-soft text-sf-sage-dark' },
              { icon: Truck, title: 'Livraison', desc: 'Partout en Algérie, rapidement et en toute sécurité.', color: 'bg-amber-50 text-amber-600' },
              { icon: Star, title: 'Satisfaction', desc: 'Votre bonheur est notre priorité absolue.', color: 'bg-purple-50 text-purple-500' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-soft flex gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="font-display text-sf-text text-xl mb-1">{title}</h3>
                  <p className="font-body text-sf-text-soft text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link to="/products" className="btn-primary text-base px-10 py-4">
            Découvrir notre boutique 🛍️
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AboutPage