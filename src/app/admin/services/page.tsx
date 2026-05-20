'use client'
import { useEffect, useState } from 'react'
import Topbar from '@/components/dashboard/Topbar'

export default function AdminServices() {
  const [services, setServices] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', icon: '' })
  const [editId, setEditId] = useState<string | null>(null)

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : ''
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  const fetchServices = async () => {
    const res = await fetch(`${baseUrl}/api/services`)
    const data = await res.json()
    setServices(data.data || [])
  }

  useEffect(() => { fetchServices() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editId) {
      await fetch(`${baseUrl}/api/services/${editId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(form)
      })
    } else {
      await fetch(`${baseUrl}/api/services`, {
        method: 'POST',
        headers,
        body: JSON.stringify(form)
      })
    }
    setForm({ title: '', description: '', icon: '' })
    setEditId(null)
    setShowForm(false)
    fetchServices()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return
    await fetch(`${baseUrl}/api/services/${id}`, { method: 'DELETE', headers })
    fetchServices()
  }

  const handleEdit = (s: any) => {
    setForm({ title: s.title, description: s.description, icon: s.icon })
    setEditId(s._id)
    setShowForm(true)
  }


  return (
    <div>
      <Topbar title="Services" />
      <div style={{ padding: '24px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px' }}>{services.length} services total</p>
          <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ title: '', description: '', icon: '' }) }}
            style={{ padding: '10px 20px', background: '#C9A24A', color: '#0A0A0A', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            + Add Service
          </button>
        </div>

        {showForm && (
          <div style={{ background: '#111111', border: '1px solid rgba(201,162,74,0.2)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>{editId ? 'Edit Service' : 'Add New Service'}</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '6px' }}>Title</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '6px' }}>Icon (emoji)</label>
                  <input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none' }} />
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '6px' }}>Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required rows={3}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" style={{ padding: '10px 24px', background: '#C9A24A', color: '#0A0A0A', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  {editId ? 'Update' : 'Save'}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  style={{ padding: '10px 24px', background: 'transparent', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Icon', 'Title', 'Description', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.40)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.30)', fontSize: '14px' }}>No services yet. Add your first service!</td></tr>
              ) : (
                services.map((s: any) => (
                  <tr key={s._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '14px 16px', fontSize: '20px' }}>{s.icon || '◈'}</td>
                    <td style={{ padding: '14px 16px', color: '#fff', fontSize: '14px', fontWeight: 500 }}>{s.title}</td>
                    <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.45)', fontSize: '13px', maxWidth: '300px' }}>{s.description?.substring(0, 60)}...</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 600, background: s.status === 'active' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: s.status === 'active' ? '#22C55E' : '#EF4444', border: `1px solid ${s.status === 'active' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}` }}>
                        {s.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleEdit(s)} style={{ padding: '6px 14px', background: 'rgba(201,162,74,0.1)', border: '1px solid rgba(201,162,74,0.2)', borderRadius: '6px', color: '#C9A24A', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => handleDelete(s._id)} style={{ padding: '6px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', color: '#EF4444', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
