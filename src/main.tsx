import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import PortfolioApp from './PortfolioApp'

// Import theme provider if you implement a ThemeContext
// import { ThemeProvider } from './contexts/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Wrap with ThemeProvider if you implement theming */}
    {/* <ThemeProvider> */}
      <PortfolioApp />
    {/* </ThemeProvider> */}
  </React.StrictMode>
)