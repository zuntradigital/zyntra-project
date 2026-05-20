'use client'
import { useEffect, useState } from 'react'
import Topbar from '@/components/dashboard/Topbar'
import StatsCard from '@/components/dashboard/StatsCard'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ services: 0, projects: 0, messages: 0, blog: 0 })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` }
    const baseUrl = process.env.NEXT_PUBLIC_API_URL

    Promise.all([
      fetch(`${baseUrl}/api/services`).then(r => r.json()),
      fetch(`${baseUrl}/api/projects`).then(r => r.json()),
      fetch(`${baseUrl}/api/messages`, { headers }).then(r => r.json()),
      fetch(`${baseUrl}/api/blog`).then(r => r.json()),
    ]).then(([services, projects, messages, blog]) => {
      setStats({
        services: services.data?.length || 0,
        projects: projects.data?.length || 0,
        messages: messages.data?.length || 0,
        blog: blog.data?.length || 0,
      })
    }).catch(() => {})
  }, [])

  return (
    <div>
      <Topbar title="Dashboard Overview" />
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <StatsCard title="Total Projects" value={stats.projects} icon="◉" color="#C9A24A" />
          <StatsCard title="Services" value={stats.services} icon="◈" color="#3B82F6" />
          <StatsCard title="Blog Posts" value={stats.blog} icon="✦" color="#22C55E" />
          <StatsCard title="Messages" value={stats.messages} icon="✉" color="#EF4444" />
        </div>

        {/* Welcome */}
        <div style={{ background: '#111111', border: '1px solid rgba(201,162,74,0.2)', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
            Welcome to ZYNTRA Dashboard 🎉
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.50)', fontSize: '14px' }}>
            Manage your website content, projects, and messages from here.
          </p>
        </div>
      </div>
    </div>
  )
}
