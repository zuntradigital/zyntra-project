'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const defaultServices = [
  { icon: '✏️', title: 'Brand Identity', description: 'We craft unique brand identities that tell your story and connect with your audience.' },
  { icon: '🖥️', title: 'Web Development', description: 'High-performance websites built with the latest technologies for perfect user experience.' },
  { icon: '📱', title: 'Mobile Experience', description: 'We design and develop stunning mobile experiences that engage and convert your users.' },
  { icon: '📊', title: 'Digital Strategy', description: 'Data-driven strategies that help your brand grow, scale, and dominate your market.' },
]

export default function Services() {
  const [services, setServices] = useState(defaultServices)
  const router = useRouter()
useEffect(() => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  fetch(`${baseUrl}/api/services`)
    .then(r => r.json())
    .then(data => {
      if (data.data?.length > 0) setServices(data.data)
    })
    .catch(() => {})
}, [])

  return (
    <section style={{ background: '#0A0A0A', padding: '100px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '64px', gap: '32px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ color: '#C9A24A', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '14px', fontWeight: 500 }}>What We Do</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
              Premium Services for<br />Ambitious Brands
            </h2>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.8, maxWidth: '380px' }}>
            We combine creativity, strategy, and cutting-edge technology to deliver digital solutions that drive results.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {services.map((s: any) => (
            <div key={s.title}
              style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '32px 24px', cursor: 'pointer', transition: 'border-color 0.3s, transform 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,162,74,0.45)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)' }}>
              <div style={{ fontSize: '28px', marginBottom: '20px' }}>{s.icon || '◈'}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '20px', fontWeight: 600, color: '#fff', marginBottom: '12px' }}>{s.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', lineHeight: 1.75, marginBottom: '20px' }}>{s.description}</p>
              <span onClick={() => router.push('/services')}
                style={{ color: '#C9A24A', fontSize: '13px', fontWeight: 500, cursor: 'pointer', textDecoration: 'none' }}>
                Learn More →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
