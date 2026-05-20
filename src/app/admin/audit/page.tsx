'use client'
import { useEffect, useState } from 'react'
import Topbar from '@/components/dashboard/Topbar'

export default function AuditLogs() {
  const [logs, setLogs] = useState([])

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : ''
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    fetch(`${baseUrl}/api/audit-logs`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => setLogs(data.data || []))
      .catch(() => {})
  }, [baseUrl, token])

  const actionColor: Record<string, string> = {
    CREATE: '#22C55E',
    UPDATE: '#C9A24A',
    DELETE: '#EF4444',
    LOGIN: '#3B82F6'
  }

  return (
    <div>
      <Topbar title="Audit Logs" />
      <div style={{ padding: '24px' }}>
        <div style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Action', 'Entity', 'Details', 'Date'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.40)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.30)', fontSize: '14px' }}>
                    No logs yet.
                  </td>
                </tr>
              ) : (
                logs.map((log: any) => (
                  <tr key={log._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          padding: '3px 10px',
                          borderRadius: '999px',
                          fontSize: '11px',
                          fontWeight: 600,
                          background: `${actionColor[log.action] || '#C9A24A'}15`,
                          color: actionColor[log.action] || '#C9A24A',
                          border: `1px solid ${actionColor[log.action] || '#C9A24A'}30`
                        }}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#fff', fontSize: '13px' }}>{log.entity}</td>
                    <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}>{log.details}</td>
                    <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>{new Date(log.createdAt).toLocaleString()}</td>
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
