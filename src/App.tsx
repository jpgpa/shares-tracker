import { Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './shared/components/Navbar'
import { PortfolioPage } from './features/portfolio'
import { DashboardPage } from './features/dashboard'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <Routes>
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/portfolio" replace />} />
      </Routes>
    </div>
  )
}

export default App
