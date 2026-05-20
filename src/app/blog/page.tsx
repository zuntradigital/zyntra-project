'use client'
import { useEffect, useState } from 'react'
import Topbar from '@/components/dashboard/Topbar'

export default function AdminBlog() {
  const [posts, setPosts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', category: 'Design',
    tags: '', status: 'draft', metaTitle: '', metaDescription: '', metaKeywords: ''
  })

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : ''
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  const fetchPosts = async () => {
    const res = await fetch(`${baseUrl}/api/blog/admin/all`, { headers })
    const data = await res.json()
    setPosts(data.data || [])
  }

  useEffect(() => { fetchPosts() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const body = { ...form, tags: form.tags.split(',').map((t: string) => t.trim()).filter(Boolean) }
    if (editId) {
      await fetch(`${baseUrl}/api/blog/${editId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
      })
    } else {
      await fetch(`${baseUrl}/api/blog`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      })
    }
    setForm({ title: '', excerpt: '', content: '', category: 'Design', tags: '', status: 'draft', metaTitle: '', metaDescription: '', metaKeywords: '' })
    setEditId(null)
    setShowForm(false)
    fetchPosts()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return
    await fetch(`${baseUrl}/api/blog/${id}`, { method: 'DELETE', headers })
    fetchPosts()
  }

  const handleEdit = (p: any) => {
    setForm({
      title: p.title, excerpt: p.excerpt, content: p.content,
      category: p.category, tags: p.tags?.join(', ') || '',
      status: p.status, metaTitle: p.metaTitle || '',
      metaDescription: p.metaDescription || '', metaKeywords: p.metaKeywords || ''
    })
    setEditId(p._id)
    setShowForm(true)
  }

  const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none' }

  return (
    <div>
      <Topbar title="Blog" />
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px' }}>{posts.length} posts total</p>
          <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ title: '', excerpt: '', content: '', category: 'Design', tags: '', status: 'draft', metaTitle: '', metaDescription: '', metaKeywords: '' }) }}
            style={{ padding: '10px 20px', background: '#C9A24A', color: '#0A0A0A', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            + Add Post
          </button>
        </div>

        {showForm && (
          <div style={{ background: '#111111', border: '1px solid rgba(201,162,74,0.2)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ color: '#fff', fontSize: '16px', marginBottom: '20px' }}>{editId ? 'Edit Post' : 'Add New Post'}</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '6px' }}>Title *</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '6px' }}>Category</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                    style={{ ...inputStyle, background: '#1a1a1a' }}>
                    {['Design', 'Branding', 'Development', 'Strategy'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '6px' }}>Excerpt</label>
                <input value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} style={inputStyle} placeholder="Short description..." />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '6px' }}>Content *</label>
                <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required rows={6}
                  style={{ ...inputStyle, resize: 'vertical' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '6px' }}>Tags (comma separated)</label>
                  <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} style={inputStyle} placeholder="design, branding, web" />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '6px' }}>Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                    style={{ ...inputStyle, background: '#1a1a1a' }}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              {/* SEO Section */}
              <div style={{ background: 'rgba(201,162,74,0.05)', border: '1px solid rgba(201,162,74,0.15)', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
                <p style={{ color: '#C9A24A', fontSize: '12px', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>SEO Settings</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '6px' }}>Meta Title</label>
                    <input value={form.metaTitle} onChange={e => setForm({ ...form, metaTitle: e.target.value })} style={inputStyle} placeholder="SEO title..." />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '6px' }}>Meta Description</label>
                    <input value={form.metaDescription} onChange={e => setForm({ ...form, metaDescription: e.target.value })} style={inputStyle} placeholder="SEO description..." />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '6px' }}>Meta Keywords</label>
                    <input value={form.metaKeywords} onChange={e => setForm({ ...form, metaKeywords: e.target.value })} style={inputStyle} placeholder="keyword1, keyword2, keyword3" />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" style={{ padding: '10px 24px', background: '#C9A24A', color: '#0A0A0A', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  {editId ? 'Update' : 'Publish'}
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
                {['Title', 'Category', 'Tags', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.40)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.30)', fontSize: '14px' }}>No posts yet.</td></tr>
              ) : (
                posts.map((p: any) => (
                  <tr key={p._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '14px 16px', color: '#fff', fontSize: '14px', fontWeight: 500, maxWidth: '200px' }}>{p.title}</td>
                    <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}>{p.category}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {p.tags?.slice(0, 2).map((t: string) => (
                          <span key={t} style={{ padding: '2px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>{t}</span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 600, background: p.status === 'published' ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)', color: p.status === 'published' ? '#22C55E' : 'rgba(255,255,255,0.45)', border: `1px solid ${p.status === 'published' ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.1)'}` }}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>{new Date(p.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleEdit(p)} style={{ padding: '6px 14px', background: 'rgba(201,162,74,0.1)', border: '1px solid rgba(201,162,74,0.2)', borderRadius: '6px', color: '#C9A24A', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => handleDelete(p._id)} style={{ padding: '6px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', color: '#EF4444', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
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
