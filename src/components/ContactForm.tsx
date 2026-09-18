'use client'

import { useState, FormEvent } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const fieldClass =
  'w-full px-0 py-3 text-base bg-transparent border-0 border-b border-black/20 focus:border-[#1a1a1a] focus:ring-0 outline-none text-[#1a1a1a] placeholder:text-[#1a1a1a]/40'
const labelClass = 'block text-[11px] uppercase tracking-[0.18em] text-[#1a1a1a] mb-2'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+1',
    phone: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const phone = formData.phone ? formData.phone : 'Not provided'

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '33a0d229-8224-4903-b708-cccc64f2ade7',
          name: formData.name,
          email: formData.email,
          phone,
          subject: formData.subject ? `Myy Space Furniture: ${formData.subject}` : `New Contact from ${formData.name}`,
          message: formData.message,
        }),
      })
      const result = await response.json()
      if (result.success) {
        setStatus('success')
        setFormData({ name: '', email: '', countryCode: '+1', phone: '', subject: '', message: '' })
      } else {
        setStatus('error')
        setErrorMsg(result.message || `Error ${response.status}: Failed to send message.`)
      }
    } catch (err) {
      console.error('Submit error:', err)
      setStatus('error')
      setErrorMsg('Network error. Please try again later.')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-playfair font-light text-[#1a1a1a] mb-3">Message Sent</h3>
        <p className="text-[#1a1a1a]/70 mb-6 font-light">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
        <button
          onClick={() => setStatus('idle')}
          className="px-8 py-3 border border-[#1a1a1a] text-[11px] uppercase tracking-[0.18em] hover:bg-[#1a1a1a] hover:text-white transition"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={labelClass}>Name *</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={fieldClass}
          placeholder="Your name"
        />
      </div>
      <div>
        <label className={labelClass}>Email *</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={fieldClass}
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label className={labelClass}>Phone *</label>
        <PhoneInput
          country={'us'}
          value={formData.phone}
          onChange={(phone) => setFormData({ ...formData, phone })}
          inputClass="!w-full !bg-transparent !border-0 !border-b !border-black/20 !rounded-none !text-[#1a1a1a]"
          buttonClass="!bg-transparent !border-0 !border-b !border-black/20"
          dropdownClass="bg-white text-black"
          inputProps={{ required: true, name: 'phone', autoFocus: false }}
          enableSearch
        />
      </div>
      <div>
        <label className={labelClass}>Subject</label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className={fieldClass}
          placeholder="Subject"
        />
      </div>
      <div>
        <label className={labelClass}>Message *</label>
        <textarea
          rows={5}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`${fieldClass} resize-none`}
          placeholder="Your message..."
        />
      </div>

      {status === 'error' && (
        <div className="text-sm text-red-700">{errorMsg}</div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full px-6 py-3.5 border border-[#1a1a1a] text-[12px] uppercase tracking-[0.2em] hover:bg-[#1a1a1a] hover:text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
