import React from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  BookOpenCheck, 
  Bot, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  Clock 
} from 'lucide-react'

function LandingPage() {
  const features = [
    {
      icon: Bot,
      title: 'Active AI Tutor',
      description: 'Engage with an interactive tutor that walks you through complex notes, equations, and code blocks.',
      color: 'var(--accent-indigo)'
    },
    {
      icon: Layers,
      title: 'Contextual RAG Ingestion',
      description: 'Upload PDFs and textbooks. Our system indexes and retrieves exact matches for accurate, hallucination-free guidance.',
      color: 'var(--accent-cyan)'
    },
    {
      icon: Sparkles,
      title: 'Structured Quiz Builder',
      description: 'Convert any study materials into instant multiple-choice assessments with immediate grades and answers feedback.',
      color: 'var(--accent-emerald)'
    },
    {
      icon: Clock,
      title: 'Adaptive Planner',
      description: 'Organize study sessions, prioritize tasks, and keep track of upcoming assignments with an interactive checklist.',
      color: 'var(--accent-amber)'
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #131d35 0%, var(--bg-dark-deep) 70%)',
      padding: '0 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Navigation Bar */}
      <header className="glass-panel" style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        borderRadius: '16px',
        marginTop: '24px',
        zIndex: 5
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-indigo) 0%, var(--accent-cyan) 100%)',
            padding: '6px',
            borderRadius: '8px',
            display: 'flex'
          }}>
            <BookOpenCheck size={20} color="white" />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>
            Study <span className="text-gradient-indigo-cyan">Sphere</span>
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link to="/login" className="glass-button glass-button-secondary" style={{ padding: '8px 20px', borderRadius: '10px', fontSize: '0.9rem' }}>
            Sign In
          </Link>
          <Link to="/login" className="glass-button glass-button-primary" style={{ padding: '8px 20px', borderRadius: '10px', fontSize: '0.9rem' }}>
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '100px 24px 60px 24px',
        zIndex: 2
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(99, 102, 241, 0.08)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          padding: '6px 16px',
          borderRadius: '50px',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: '#818cf8',
          marginBottom: '24px',
          boxShadow: 'inset 0 0 10px rgba(99, 102, 241, 0.1)'
        }}>
          <Sparkles size={14} />
          <span>Supercharging Learning with Retrieval AI</span>
        </div>
        
        <h1 style={{
          fontSize: '4.5rem',
          fontWeight: 800,
          lineHeight: '1.1',
          maxWidth: '850px',
          marginBottom: '24px',
          fontFamily: "'Outfit', sans-serif"
        }}>
          Master Any Subject with <br />
          <span className="text-gradient-indigo-cyan">Study Sphere AI</span>
        </h1>
        
        <p style={{
          fontSize: '1.25rem',
          color: 'var(--text-secondary)',
          maxWidth: '650px',
          lineHeight: '1.6',
          marginBottom: '40px'
        }}>
          Upload your notes, textbooks, or research documents, and let our semantic engine build custom summaries, generate quizzes, and act as your 24/7 personal tutor.
        </p>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link to="/login" className="glass-button glass-button-primary glow-indigo" style={{ padding: '14px 32px', fontSize: '1.05rem' }}>
            <span>Enter the Sphere</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{
        maxWidth: '1200px',
        width: '100%',
        padding: '60px 24px 100px 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
        zIndex: 2
      }}>
        {features.map((feature, idx) => {
          const IconComp = feature.icon
          return (
            <div 
              key={idx} 
              className="glass-panel glass-panel-hover" 
              style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', borderRadius: '20px' }}
            >
              <div style={{
                background: `rgba(${feature.color === 'var(--accent-indigo)' ? '99, 102, 241' : feature.color === 'var(--accent-cyan)' ? '6, 182, 212' : feature.color === 'var(--accent-emerald)' ? '16, 185, 129' : '245, 158, 11'}, 0.1)`,
                border: `1px solid rgba(${feature.color === 'var(--accent-indigo)' ? '99, 102, 241' : feature.color === 'var(--accent-cyan)' ? '6, 182, 212' : feature.color === 'var(--accent-emerald)' ? '16, 185, 129' : '245, 158, 11'}, 0.2)`,
                padding: '12px',
                borderRadius: '12px',
                width: 'fit-content'
              }}>
                <IconComp size={24} color={feature.color} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '700' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', flexGrow: 1 }}>{feature.description}</p>
            </div>
          )
        })}
      </section>

      {/* Floating abstract decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '40%',
        right: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>
    </div>
  )
}

export default LandingPage
