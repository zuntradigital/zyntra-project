'use client'
import { useState } from 'react'

export default function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) setSent(true)
    } catch {
      console.error('Error sending message')
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', padding: '14px 16px', background: '#111111',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
    color: '#fff', fontSize: '14px', outline: 'none',
    fontFamily: 'DM Sans, sans-serif', boxSizing: 'border-box' as const,
  }

  return (
    <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '140px 24px 100px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'start' }}>

      {/* Left Info */}
      <div>
        <p style={{ color: '#C9A24A', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 500 }}>Get In Touch</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '24px' }}>
          Let's Work<br /><span style={{ color: '#C9A24A' }}>Together</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, marginBottom: '48px', maxWidth: '400px' }}>
          Ready to elevate your digital presence? Fill out the form and our team will get back to you within 24 hours.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[
            { icon: '✉', label: 'Email Us', value: 'zuntradigital@gmail.com' },
            { icon: '✆', label: 'Call Us', value: '01505900090' },
            { icon: '◎', label: 'Visit Us', value: 'Al Haram, Giza Governorate' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(201,162,74,0.1)', border: '1px solid rgba(201,162,74,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A24A', fontSize: '18px', flexShrink: 0 }}>
                {item.icon}
              </div>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '4px' }}>{item.label}</p>
                <p style={{ color: '#fff', fontSize: '14px' }}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Form */}
      <div style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '40px' }}>
        {sent ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(201,162,74,0.15)', border: '1px solid rgba(201,162,74,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '28px' }}>✓</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.8rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>Message Sent!</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.7 }}>Thank you! We'll get back to you within 24 hours.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Start Your Project</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', display: 'block', marginBottom: '8px' }}>Full Name *</label>
                <input style={inputStyle} placeholder="John Smith" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', display: 'block', marginBottom: '8px' }}>Email *</label>
                <input style={inputStyle} placeholder="john@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
            </div>

            <div>
              <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', display: 'block', marginBottom: '8px' }}>Phone Number</label>
              <input style={inputStyle} placeholder="01505900090" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            </div>

            <div>
              <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', display: 'block', marginBottom: '8px' }}>Subject</label>
              <input style={inputStyle} placeholder="Project Inquiry" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
            </div>

            <div>
              <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', display: 'block', marginBottom: '8px' }}>Message *</label>
              <textarea style={{ ...inputStyle, height: '120px', resize: 'none' }} placeholder="Tell us about your project..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
            </div>

            <button onClick={handleSubmit} disabled={loading}
              style={{ width: '100%', padding: '16px', fontSize: '14px', fontWeight: 600, background: '#C9A24A', color: '#0A0A0A', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Sending...' : 'Send Message →'}
            </button>

            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', textAlign: 'center' }}>
              We'll respond within 24 hours ✓
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
