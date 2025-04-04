import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PortfolioApp from './PortfolioApp'
import AdminPage from './pages/admin/AdminPage'
import './index.css'
import { ThemeProvider } from './state/ThemeContext'
import { ProjectProvider } from './state/ProjectContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ProjectProvider>
          <Routes>
            <Route path="/" element={<PortfolioApp />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </ProjectProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)