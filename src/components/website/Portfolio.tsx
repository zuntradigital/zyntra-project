'use client'
import { useEffect, useState } from 'react'

const defaultProjects = [
  {
    title: 'Luxury Brand',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=600&q=80',
  },
  {
    title: 'Corporate Website',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80',
  },
  {
    title: 'Mobile App',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
  },
  {
    title: 'E-commerce',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80',
  },
  {
    title: 'Brand Identity',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=80',
  },
  {
    title: 'SaaS Dashboard',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
  },
  {
    title: 'Real Estate',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
  },
  {
    title: 'Restaurant Website',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  },
]

const categories = ['All', 'Branding', 'Web Development', 'UI/UX Design']

export default function Portfolio() {
  const [projects, setProjects] = useState(defaultProjects)
  const [active, setActive] = useState('All')
useEffect(() => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  fetch(`${baseUrl}/api/projects`)
    .then(r => r.json())
    .then(data => {
      if (data.data?.length > 0) setProjects(data.data)
    })
    .catch(() => {})
}, [])

  const filtered = active === 'All' ? projects : projects.filter((p: any) => p.category === active)

  return (
    <section style={{ background: '#0A0A0A', padding: '100px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <p style={{ color: '#C9A24A', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '14px', fontWeight: 500 }}>Our Portfolio</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#fff' }}>Selected Work</h2>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.8, maxWidth: '380px' }}>
            Explore some of our recent projects that showcase our creativity, expertise, and commitment to excellence.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              padding: '8px 20px', fontSize: '13px', borderRadius: '999px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: active === cat ? 600 : 400,
              background: active === cat ? '#C9A24A' : 'transparent',
              color: active === cat ? '#0A0A0A' : 'rgba(255,255,255,0.65)',
              border: `1px solid ${active === cat ? '#C9A24A' : 'rgba(255,255,255,0.15)'}`,
            }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {filtered.map((p: any, i: number) => (
            <div key={i}
              style={{ border: '1px solid rgba(201,162,74,0.15)', borderRadius: '10px', overflow: 'hidden', aspectRatio: '4/3', position: 'relative', cursor: 'pointer', transition: 'all 0.3s', background: '#111' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,162,74,0.6)'; e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,162,74,0.15)'; e.currentTarget.style.transform = 'scale(1)' }}>

              {/* Image */}
              <img
                src={p.image || defaultProjects[i % defaultProjects.length].image}
                alt={p.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, filter: 'brightness(0.75)' }}
              />

              {/* Gold top line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #C9A24A, transparent)', zIndex: 2 }} />

              {/* Gradient overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)', zIndex: 1 }} />

              {/* Text */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', zIndex: 2 }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '17px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{p.title}</h3>
                <p style={{ color: '#C9A24A', fontSize: '12px', fontWeight: 500 }}>{p.category}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href="/portfolio" style={{ display: 'inline-block', padding: '13px 36px', fontSize: '13px', fontWeight: 500, color: '#fff', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '6px', textDecoration: 'none' }}>
            View All Projects
          </a>
        </div>
      </div>
    </section>
  )
}
