'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const defaultServices = [
  { title: 'Brand Identity', sub: 'Logo Design · Brand Identity · Guidelines', description: 'We craft unique brand identities that tell your story and connect with your audience.' },
  { title: 'Web Development', sub: 'Custom Websites · E-commerce · CMS', description: 'High-performance websites built with the latest technologies for perfect user experience.' },
  { title: 'UI/UX Design', sub: 'User Research · UI Design · Prototyping', description: 'We design intuitive and beautiful interfaces that users love.' },
  { title: 'Mobile Apps', sub: 'iOS · Android · Cross-platform', description: 'We design and develop stunning mobile experiences that engage and convert your users.' },
  { title: 'Digital Marketing', sub: 'SEO · Social Media · Paid Campaigns', description: 'Data-driven strategies that help your brand grow, scale, and dominate your market.' },
]

export default function ServicesClient() {
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
    <>
      <section style={{ padding: '140px 24px 80px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ color: '#C9A24A', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 500 }}>What We Do</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '24px' }}>
          Our <span style={{ color: '#C9A24A' }}>Services</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.8, maxWidth: '500px', margin: '0 auto' }}>
          We provide end-to-end digital solutions that help brands grow and succeed.
        </p>
      </section>

      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {services.map((s: any, i: number) => (
            <div key={i}
              style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '32px', flexWrap: 'wrap', transition: 'border-color 0.3s, transform 0.3s', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,162,74,0.4)'; e.currentTarget.style.transform = 'translateX(8px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateX(0)' }}
              onClick={() => router.push('/contact')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', minWidth: '200px' }}>
                <span style={{ color: 'rgba(201,162,74,0.4)', fontSize: '13px', fontWeight: 600, fontFamily: 'monospace' }}>0{i + 1}</span>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{s.title}</h3>
                  {s.sub && <p style={{ color: 'rgba(201,162,74,0.7)', fontSize: '12px' }}>{s.sub}</p>}
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.8, maxWidth: '520px', flex: 1 }}>{s.description}</p>

              {/* Arrow Button */}
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: '#C9A24A', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '18px', color: '#0A0A0A',
                flexShrink: 0, transition: 'transform 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                →
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>Ready to Get Started?</h2>
        <p style={{ color: 'rgba(255,255,255,0.50)', fontSize: '14px', marginBottom: '32px' }}>Let us build something extraordinary for your brand.</p>
        <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 36px', fontSize: '14px', fontWeight: 500, background: '#C9A24A', color: '#0A0A0A', borderRadius: '6px', textDecoration: 'none' }}>
          Start Your Project →
        </a>
      </section>
    </>
  )
}
