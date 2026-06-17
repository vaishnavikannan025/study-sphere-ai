import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { BookOpenCheck, Mail, Lock, User, ArrowRight } from 'lucide-react'

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password) {
      setError('Please fill all fields')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      })

      const data = await res.json()

      if (res.ok) {
        setIsLoading(false)
        alert("Account created successfully 🎉")
        navigate("/login")
      } else {
        setIsLoading(false)
        setError(data.message || "Registration failed")
      }

    } catch (err) {
      setIsLoading(false)
      setError("Server error. Try again.")
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
      <div style={{
        maxWidth: '440px',
        width: '100%',
        padding: '40px',
        borderRadius: '24px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)'
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <BookOpenCheck size={32} color="white" />
          <h2 style={{ color: 'white' }}>Create Account</h2>
          <p style={{ color: '#aaa' }}>Join Study Sphere AI</p>
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

          {/* Name */}
          <div style={{ position: 'relative' }}>
            <User style={{ position: 'absolute', left: 10, top: 10 }} />
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ paddingLeft: 40, width: '100%', padding: 10 }}
            />
          </div>

          {/* Email */}
          <div style={{ position: 'relative' }}>
            <Mail style={{ position: 'absolute', left: 10, top: 10 }} />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ paddingLeft: 40, width: '100%', padding: 10 }}
            />
          </div>

          {/* Password */}
          <div style={{ position: 'relative' }}>
            <Lock style={{ position: 'absolute', left: 10, top: 10 }} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingLeft: 40, width: '100%', padding: 10 }}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: 12,
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* Link to login */}
        <p style={{ marginTop: 15, textAlign: 'center', color: '#aaa' }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: '#38bdf8' }}>
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}

export default RegisterPage