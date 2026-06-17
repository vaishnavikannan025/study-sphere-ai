import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { BookOpenCheck, Lock, Mail, ArrowRight } from 'lucide-react'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all credentials.')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token)
        setIsLoading(false)
        navigate("/")
      } else {
        setIsLoading(false)
        setError(data.message || "Login failed")
      }

    } catch (err) {
      setIsLoading(false)
      setError("Server error. Please try again.")
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at bottom, #111827, #0b0f19)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '440px',
        width: '100%',
        padding: '40px',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: 'var(--shadow-glass)'
      }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '32px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-indigo) 0%, var(--accent-cyan) 100%)',
            padding: '10px',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-glow)',
            display: 'flex'
          }}>
            <BookOpenCheck size={28} color="white" />
          </div>

          <h2 style={{
            fontSize: '1.6rem',
            fontWeight: '800',
            margin: 0,
            textAlign: 'center'
          }}>
            Sign in to <span className="text-gradient-indigo-cyan">Study Sphere AI</span>
          </h2>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Welcome back! Enter your details below.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            backgroundColor: 'rgba(244, 63, 94, 0.08)',
            border: '1px solid rgba(244, 63, 94, 0.2)',
            borderRadius: '10px',
            padding: '12px',
            color: 'var(--accent-rose)',
            fontSize: '0.85rem',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Email Address
            </label>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px' }} />
              <input
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input"
                style={{ paddingLeft: '48px' }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Password
            </label>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px' }} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input"
                style={{ paddingLeft: '48px' }}
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="glass-button glass-button-primary glow-indigo"
            style={{ width: '100%', marginTop: '8px' }}
          >
            <span>{isLoading ? 'Logging in...' : 'Sign In'}</span>
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '24px',
          fontSize: '0.85rem'
        }}>
          <span style={{ color: 'var(--text-muted)' }}>
            Don't have an account?
          </span>

          <Link
            to="/landing"
            style={{
              color: 'var(--accent-cyan)',
              fontWeight: 600,
              marginLeft: '6px'
            }}
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
