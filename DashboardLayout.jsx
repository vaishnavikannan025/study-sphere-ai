import React from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  BookOpen, 
  Bot, 
  Calendar, 
  Award, 
  LogOut, 
  BookOpenCheck,
  Bell,
  Search,
  User
} from 'lucide-react'

function DashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Study Notes', path: '/notes', icon: BookOpen },
    { name: 'AI Study Tutor', path: '/tutor', icon: Bot },
    { name: 'Planner', path: '/planner', icon: Calendar },
    { name: 'Quiz Arena', path: '/quiz', icon: Award },
  ]

  const handleLogout = () => {
    // Basic mock logout and redirect to login
    navigate('/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-dark-deep)' }}>
      {/* Sidebar navigation */}
      <aside className="glass-panel" style={{
        width: '260px',
        padding: '24px 16px',
        margin: '16px 0 16px 16px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        zIndex: 10
      }}>
        {/* Brand logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '8px', marginBottom: '40px' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-indigo) 0%, var(--accent-cyan) 100%)',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <BookOpenCheck size={24} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, letterSpacing: '-0.02em' }}>
              Study <span className="text-gradient-indigo-cyan">Sphere</span>
            </h2>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>AI Companion</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
          {menuItems.map((item) => {
            const IconComponent = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link 
                to={item.path} 
                key={item.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  color: isActive ? 'white' : 'var(--text-secondary)',
                  background: isActive ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.05) 100%)' : 'transparent',
                  border: isActive ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid transparent',
                  boxShadow: isActive ? 'inset 0 0 10px rgba(99, 102, 241, 0.05)' : 'none',
                  transition: 'var(--ease-in-out-smooth)'
                }}
                className={isActive ? '' : 'glass-panel-hover'}
              >
                <IconComponent size={20} color={isActive ? 'var(--accent-indigo)' : 'var(--text-secondary)'} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer actions */}
        <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
          <button 
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: '500',
              color: 'var(--accent-rose)',
              transition: 'var(--ease-in-out-smooth)'
            }}
            className="glass-panel-hover"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main View Container */}
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '16px' }}>
        {/* Top Header */}
        <header className="glass-panel" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 24px',
          borderRadius: '16px',
          marginBottom: '16px'
        }}>
          {/* Quick Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '6px 12px', borderRadius: '10px', width: '300px' }}>
            <Search size={16} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search notes, planner, cards..." 
              style={{ fontSize: '0.85rem', width: '100%', color: 'white' }}
            />
          </div>

          {/* User Widgets */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button className="glass-panel-hover" style={{ padding: '8px', borderRadius: '10px', border: '1px solid var(--border-glass)', cursor: 'pointer', position: 'relative' }}>
              <Bell size={18} />
              <span style={{ position: 'absolute', top: '4px', right: '4px', width: '6px', height: '6px', backgroundColor: 'var(--accent-cyan)', borderRadius: '50%' }}></span>
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: '1px solid var(--border-glass)', paddingLeft: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Alex Mercer</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Student Plan</span>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, var(--accent-indigo) 0%, var(--accent-cyan) 100%)',
                padding: '8px',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <User size={18} color="white" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="glass-panel" style={{ flexGrow: 1, borderRadius: '20px', overflowY: 'auto', padding: '0px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
