'use client'
import { useEffect, useState } from 'react'
import Topbar from '@/components/dashboard/Topbar'
import Pagination from '@/components/ui/Pagination'

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', category: 'Branding', status: 'published' })
  const [editId, setEditId] = useState<string | null>(null)

  // ✅ Pagination state
  const [page, setPage] = useState(1)
  const perPage = 5
  const paginated = projects.slice((page - 1) * perPage, page * perPage)

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : ''
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  const fetchProjects = async () => {
    const res = await fetch(`${baseUrl}/api/projects`)
    const data = await res.json()
    setProjects(data.data || [])
  }

  useEffect(() => { fetchProjects() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editId) {
      await fetch(`${baseUrl}/api/projects/${editId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(form)
      })
    } else {
      await fetch(`${baseUrl}/api/projects`, {
        method: 'POST',
        headers,
        body: JSON.stringify(form)
      })
    }
    setForm({ title: '', description: '', category: 'Branding', status: 'published' })
    setEditId(null)
    setShowForm(false)
    fetchProjects()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    await fetch(`${baseUrl}/api/projects/${id}`, { method: 'DELETE', headers })
    fetchProjects()
  }

  return (
    <div>
      <Topbar title="Projects" />
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px' }}>{projects.length} projects total</p>
          <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ title: '', description: '', category: 'Branding', status: 'published' }) }}
            style={{ padding: '10px 20px', background: '#C9A24A', color: '#0A0A0A', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            + Add Project
          </button>
        </div>

        {showForm && (
          <div style={{ background: '#111111', border: '1px solid rgba(201,162,74,0.2)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ color: '#fff', fontSize: '16px', marginBottom: '20px' }}>{editId ? 'Edit Project' : 'Add New Project'}</h3>
            <form onSubmit={handleSubmit}>
              {/* ... نفس الفورم زي ما هو ... */}
            </form>
          </div>
        )}

        {/* ✅ Table */}
        <div style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Title', 'Category', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.40)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.30)', fontSize: '14px' }}>No projects yet.</td></tr>
              ) : (
                paginated.map((p: any) => (
                  <tr key={p._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '14px 16px', color: '#fff', fontSize: '14px', fontWeight: 500 }}>{p.title}</td>
                    <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}>{p.category}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 600,
                        background: p.status === 'published' ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)',
                        color: p.status === 'published' ? '#22C55E' : 'rgba(255,255,255,0.45)',
                        border: `1px solid ${p.status === 'published' ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.1)'}`
                      }}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => { setForm({ title: p.title, description: p.description, category: p.category, status: p.status }); setEditId(p._id); setShowForm(true) }}
                          style={{ padding: '6px 14px', background: 'rgba(201,162,74,0.1)', border: '1px solid rgba(201,162,74,0.2)', borderRadius: '6px', color: '#C9A24A', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => handleDelete(p._id)}
                          style={{ padding: '6px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', color: '#EF4444', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ✅ Pagination بعد الجدول */}
        <Pagination 
          page={page} 
          total={projects.length} 
          perPage={perPage} 
          onPageChange={setPage} 
        />
      </div>
    </div>
  )
}
