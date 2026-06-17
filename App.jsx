import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LandingPage from './pages/LandingPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'

import NotesPage from './pages/NotesPage.jsx'
import TutorPage from './pages/TutorPage.jsx'
import PlannerPage from './pages/PlannerPage.jsx'
import QuizPage from './pages/QuizPage.jsx'

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public Pages */}
        <Route path="/landing" element={<LandingPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/login" element={<LoginPage />} />


        {/* Dashboard */}
        <Route path="/" element={<DashboardLayout />}>

          <Route index element={<DashboardPage />} />

          <Route 
            path="notes" 
            element={<NotesPage />} 
          />

          <Route 
            path="tutor" 
            element={<TutorPage />} 
          />

          <Route 
            path="planner" 
            element={<PlannerPage />} 
          />

          <Route 
            path="quiz" 
            element={<QuizPage />} 
          />

        </Route>


        {/* Default */}
        <Route 
          path="*" 
          element={<Navigate to="/landing" replace />} 
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App