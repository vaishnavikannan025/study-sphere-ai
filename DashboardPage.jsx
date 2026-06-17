import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Flame, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  Plus, 
  Clock, 
  Compass, 
  CheckSquare, 
  ChevronRight,
  Sparkles
} from 'lucide-react'

function DashboardPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Read Chapter 4 of Physics Textbook', priority: 'High', isCompleted: false },
    { id: 2, title: 'Generate Biology Enzyme Quiz', priority: 'Medium', isCompleted: false },
    { id: 3, title: 'Revise Computer Networks Notes', priority: 'Low', isCompleted: true },
  ])

  const [newTitle, setNewTitle] = useState('')

  const handleToggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
  }

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    const newTask = {
      id: Date.now(),
      title: newTitle,
      priority: 'Medium',
      isCompleted: false
    }
    setTasks([...tasks, newTask])
    setNewTitle('')
  }

  const recentDocuments = [
    { title: 'Biology_Genetics_Lec2.pdf', size: '2.4 MB', chunks: 18, date: 'Uploaded 2 hours ago' },
    { title: 'Introduction_To_Algorithms.pdf', size: '14.2 MB', chunks: 112, date: 'Uploaded 1 day ago' },
    { title: 'Database_Normalization_Guide.txt', size: '48 KB', chunks: 6, date: 'Uploaded 3 days ago' },
  ]

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Welcome Banner */}
      <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Welcome back, Alex!</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Here is what is happening on your study dashboard today.</p>
        </div>
        
        {/* Study Streak Display */}
        <div className="glass-panel" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 20px',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          background: 'rgba(245, 158, 11, 0.04)',
          borderRadius: '14px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex',
            boxShadow: '0 0 15px rgba(245, 158, 11, 0.2)'
          }}>
            <Flame size={18} color="white" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Current Streak</span>
            <h3 style={{ fontSize: '1.1rem', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
              6 Days <span style={{ color: 'var(--accent-amber)' }}>🔥</span>
            </h3>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px'
      }}>
        {/* Metric 1 */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            background: 'var(--accent-indigo-glow)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BookOpen size={24} color="var(--accent-indigo)" />
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Study Materials</p>
            <h2 style={{ fontSize: '1.75rem', marginTop: '4px' }}>4 Files</h2>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            background: 'var(--accent-cyan-glow)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={24} color="var(--accent-cyan)" />
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Quizzes Finished</p>
            <h2 style={{ fontSize: '1.75rem', marginTop: '4px' }}>12 Taken</h2>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            background: 'var(--accent-emerald-glow)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CheckSquare size={24} color="var(--accent-emerald)" />
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Tasks Completed</p>
            <h2 style={{ fontSize: '1.75rem', marginTop: '4px' }}>18 Done</h2>
          </div>
        </div>
      </section>

      {/* Main Grid Panels */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Side: Recent Materials and Visual Analytics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Recent Materials */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem' }}>Recent Materials</h3>
              <Link to="/notes" style={{ fontSize: '0.85rem', color: 'var(--accent-indigo)', display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                <span>View all</span>
                <ChevronRight size={16} />
              </Link>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentDocuments.map((doc, idx) => (
                <div 
                  key={idx} 
                  className="glass-panel-hover" 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-glass)',
                    background: 'rgba(255, 255, 255, 0.01)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '10px',
                      borderRadius: '8px',
                      display: 'flex',
                      color: 'var(--text-secondary)'
                    }}>
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{doc.title}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {doc.size} • {doc.chunks} Embed Chunks
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{doc.date}</span>
                    <Link to="/tutor" className="glass-button glass-button-secondary" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem' }}>
                      Study
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Activity (SVG Rendered Chart) */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Weekly Study Analytics</h3>
            <div style={{ width: '100%', height: '180px', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingTop: '20px' }}>
              {/* SVG background grid lines */}
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <line x1="0" y1="35" x2="100%" y2="35" stroke="var(--border-glass)" />
                <line x1="0" y1="85" x2="100%" y2="85" stroke="var(--border-glass)" />
                <line x1="0" y1="135" x2="100%" y2="135" stroke="var(--border-glass)" />
              </svg>

              {/* Data points */}
              {[
                { day: 'Mon', hours: 1.5, height: '40px' },
                { day: 'Tue', hours: 4.2, height: '110px' },
                { day: 'Wed', hours: 3.0, height: '80px' },
                { day: 'Thu', hours: 5.5, height: '140px' },
                { day: 'Fri', hours: 2.0, height: '55px' },
                { day: 'Sat', hours: 4.8, height: '125px' },
                { day: 'Sun', hours: 1.0, height: '25px' }
              ].map((data, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 1 }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{data.hours}h</span>
                  <div style={{
                    width: '32px',
                    height: data.height,
                    background: 'linear-gradient(to top, var(--accent-indigo), var(--accent-cyan))',
                    borderRadius: '6px 6px 0 0',
                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.2)',
                    transition: 'var(--ease-in-out-smooth)'
                  }} className="glow-indigo"></div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Planner Task Checklist */}
        <div className="glass-panel" style={{ padding: '24px', minHeight: '380px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Study Checklist</h3>
          
          <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <input 
              type="text" 
              placeholder="Add next task..." 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="glass-input"
              style={{ padding: '8px 12px', fontSize: '0.85rem' }}
            />
            <button type="submit" className="glass-button glass-button-primary" style={{ padding: '8px', borderRadius: '10px' }}>
              <Plus size={16} />
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1 }}>
            {tasks.map((task) => (
              <div 
                key={task.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-glass)',
                  background: task.isCompleted ? 'rgba(255, 255, 255, 0.005)' : 'rgba(255, 255, 255, 0.015)',
                  opacity: task.isCompleted ? 0.6 : 1,
                  transition: 'var(--ease-in-out-smooth)'
                }}
              >
                <button 
                  onClick={() => handleToggleTask(task.id)}
                  style={{ cursor: 'pointer', marginTop: '2px', color: task.isCompleted ? 'var(--accent-emerald)' : 'var(--text-muted)' }}
                >
                  {task.isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                </button>
                <div style={{ flexGrow: 1 }}>
                  <p style={{
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    textDecoration: task.isCompleted ? 'line-through' : 'none',
                    color: task.isCompleted ? 'var(--text-muted)' : 'var(--text-primary)'
                  }}>{task.title}</p>
                  <span style={{
                    display: 'inline-block',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: task.priority === 'High' ? 'var(--accent-rose)' : task.priority === 'Medium' ? 'var(--accent-amber)' : 'var(--accent-cyan)',
                    marginTop: '4px'
                  }}>{task.priority} Priority</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
