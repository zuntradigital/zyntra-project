'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#0A0A0A' }}>

      {/* CTA Section */}
      <div style={{ background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: 0, bottom: 0, width: '40%', height: '100%', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', right: '-5%', bottom: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(201,162,74,0.08) 0%, transparent 70%)', borderRadius: '50%' }}/>
        </div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '32px', flexWrap: 'wrap', position: 'relative' }}>
          <div style={{ maxWidth: '420px' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '16px' }}>
              Ready to Elevate<br />Your Brand?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.7 }}>
              Let's create something extraordinary together.<br />Your success is our mission.
            </p>
          </div>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 36px', fontSize: '14px', fontWeight: 500, background: '#C9A24A', color: '#0A0A0A', borderRadius: '6px', textDecoration: 'none' }}>
            Start Your Project →
          </Link>
        </div>
      </div>

      {/* Footer Links */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px', marginBottom: '48px' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #C9A24A, #9A7530)', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#0A0A0A' }}>Z</div>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '18px', fontWeight: 600, color: '#fff' }}>ZYNTRA</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: 1.75, marginBottom: '24px' }}>
              We are a digital agency focused on building high-end digital experiences that drive results.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { label: 'f', href: 'https://facebook.com' },
                { label: '𝕏', href: 'https://twitter.com' },
                { label: 'in', href: 'https://linkedin.com' },
                { label: '◉', href: 'https://instagram.com' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ width: '34px', height: '34px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '12px', textDecoration: 'none' }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '13px', fontWeight: 600, marginBottom: '20px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Quick Links</h4>
            {[
              { name: 'Home', href: '/' },
              { name: 'About Us', href: '/about' },
              { name: 'Services', href: '/services' },
              { name: 'Portfolio', href: '/portfolio' },
              { name: 'Contact', href: '/contact' },
            ].map(link => (
              <Link key={link.name} href={link.href}
                style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: '13px', marginBottom: '10px', textDecoration: 'none' }}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '13px', fontWeight: 600, marginBottom: '20px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Services</h4>
            {[
              { name: 'Brand Identity', href: '/services' },
              { name: 'Web Development', href: '/services' },
              { name: 'Mobile Experience', href: '/services' },
              { name: 'Digital Strategy', href: '/services' },
              { name: 'UI/UX Design', href: '/services' },
            ].map(s => (
              <Link key={s.name} href={s.href}
                style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: '13px', marginBottom: '10px', textDecoration: 'none' }}>
                {s.name}
              </Link>
            ))}
          </div>

     {/* Contact */}
<div>
  <h4 style={{ color: '#fff', fontSize: '13px', fontWeight: 600, marginBottom: '20px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
    Contact Us
  </h4>

  <a href="mailto:zuntradigital@gmail.com"
    style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
    <span style={{ color: '#C9A24A' }}>✉</span> zuntradigital@gmail.com
  </a>

  <a href="tel:+201505900090"
    style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
    <span style={{ color: '#C9A24A' }}>✆</span> 01505900090
  </a>

  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
    <span style={{ color: '#C9A24A' }}>◎</span> Al Haram, Giza Governorate
  </p>
</div>



        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ color: 'rgba(255,255,255,0.30)', fontSize: '12px' }}>© 2024 Zyntra. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {[
              { name: 'Privacy Policy', href: '/privacy' },
              { name: 'Terms of Service', href: '/terms' },
            ].map(s => (
              <Link key={s.name} href={s.href}
                style={{ color: 'rgba(255,255,255,0.30)', fontSize: '12px', textDecoration: 'none' }}>
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
