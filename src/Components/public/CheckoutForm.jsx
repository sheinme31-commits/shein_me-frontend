import { useState, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import wilayas from '../../data/wilayas'

function CheckoutForm({ onSubmit, loading }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', wilaya: '', commune: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Prénom requis'
    if (!form.lastName.trim()) e.lastName = 'Nom requis'
    if (!form.phone.trim()) e.phone = 'Téléphone requis'
    else if (!/^(0)(5|6|7)\d{8}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Numéro invalide (ex: 0551234567)'
    if (!form.wilaya) e.wilaya = 'Wilaya requise'
    if (!form.commune.trim()) e.commune = 'Commune requise'
    return e
  }

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    onSubmit(form)
  }

  const Field = ({ name, label, type = 'text', placeholder, autoComplete }) => (
    <div>
      <label className="block text-lm-taupe font-body font-light tracking-luxury
                         uppercase text-xs mb-3">{label}</label>
      <input
        type={type} name={name} value={form[name]} onChange={handleChange}
        placeholder={placeholder} autoComplete={autoComplete}
        className={`lm-input ${errors[name] ? 'border-red-400' : ''}`}
      />
      {errors[name] && <p className="mt-1 text-red-400 text-xs font-body">{errors[name]}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field name="firstName" label="Prénom" placeholder="Sophie" autoComplete="given-name" />
        <Field name="lastName" label="Nom" placeholder="Martin" autoComplete="family-name" />
      </div>
      <Field name="phone" label="Téléphone" type="tel" placeholder="0551234567" autoComplete="tel" />
      <div>
        <label className="block text-lm-taupe font-body font-light tracking-luxury uppercase text-xs mb-3">
          Wilaya
        </label>
        <div className="relative">
          <select name="wilaya" value={form.wilaya} onChange={handleChange}
            className={`lm-select w-full ${errors.wilaya ? 'border-red-400' : ''}`}>
            <option value="">Sélectionner</option>
            {wilayas.map((w) => (
              <option key={w.code} value={w.name}>{w.code} — {w.name}</option>
            ))}
          </select>
          <ChevronDown size={14} strokeWidth={1}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-lm-taupe pointer-events-none" />
        </div>
        {errors.wilaya && <p className="mt-1 text-red-400 text-xs font-body">{errors.wilaya}</p>}
      </div>
      <Field name="commune" label="Commune" placeholder="Votre commune" autoComplete="address-level2" />

      <button type="submit" disabled={loading} className="btn-primary w-full mt-4">
        {loading
          ? <span className="flex items-center gap-3">
              <span className="w-3 h-3 border border-lm-ivory/30 border-t-lm-ivory rounded-full animate-spin" />
              Traitement...
            </span>
          : 'Confirmer la commande'
        }
      </button>
    </form>
  )
}

export default CheckoutForm