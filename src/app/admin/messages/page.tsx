'use client'
import { useEffect, useState } from 'react'
import Topbar from '@/components/dashboard/Topbar'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<any>(null)

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : ''
  const headers = { Authorization: `Bearer ${token}` }
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    fetch(`${baseUrl}/api/messages`, { headers })
      .then(r => r.json())
      .then(data => {
        setMessages(data.data || [])
        setFiltered(data.data || [])
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!search) return setFiltered(messages)
    setFiltered(messages.filter((m: any) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase())
    ))
  }, [search, messages])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return
    await fetch(`${baseUrl}/api/messages/${id}`, {
      method: 'DELETE',
      headers: { ...headers, 'Content-Type': 'application/json' }
    })
    setMessages(messages.filter((m: any) => m._id !== id))
    setSelected(null)
  }

  return (
    <div>
      <Topbar title="Messages" />
      <div style={{ padding: '24px' }}>
        {/* Search */}
        <div style={{ marginBottom: '20px' }}>
          <input
            placeholder="🔍 Search messages..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '300px', background: '#111111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 16px', color: '#fff', fontSize: '14px', outline: 'none' }}
          />
        </div>

        <div style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Name', 'Email', 'Subject', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.40)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.30)', fontSize: '14px' }}>No messages found.</td></tr>
              ) : (
                filtered.map((m: any) => (
                  <tr key={m._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer' }} onClick={() => setSelected(m)}>
                    <td style={{ padding: '14px 16px', color: '#fff', fontSize: '14px', fontWeight: 500 }}>{m.name}</td>
                    <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}>{m.email}</td>
                    <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}>{m.subject || '-'}</td>
                    <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>{new Date(m.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 600, background: m.status === 'new' ? 'rgba(201,162,74,0.1)' : 'rgba(34,197,94,0.1)', color: m.status === 'new' ? '#C9A24A' : '#22C55E', border: `1px solid ${m.status === 'new' ? 'rgba(201,162,74,0.2)' : 'rgba(34,197,94,0.2)'}` }}>
                        {m.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <button onClick={e => { e.stopPropagation(); handleDelete(m._id) }} style={{ padding: '6px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', color: '#EF4444', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {selected && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '24px' }}>
            <div style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px', maxWidth: '500px', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 600 }}>Message Details</h3>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', fontSize: '20px', cursor: 'pointer' }}>✕</button>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '4px' }}>FROM</p>
                <p style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>{selected.name} — {selected.email}</p>
              </div>
              {selected.subject && (
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '4px' }}>SUBJECT</p>
                  <p style={{ color: '#fff', fontSize: '14px' }}>{selected.subject}</p>
                </div>
              )}
              <div style={{ marginBottom: '24px' }}>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '8px' }}>MESSAGE</p>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.7, background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px' }}>{selected.message}</p>
              </div>
              <button onClick={() => handleDelete(selected._id)} style={{ width: '100%', padding: '12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', color: '#EF4444', fontSize: '13px', cursor: 'pointer' }}>
                Delete Message
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
