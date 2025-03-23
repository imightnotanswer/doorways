import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Doorway1 from './pages/doorway1.tsx'
import Layout from './components/Layout.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/doorway1" element={<Doorway1 />} />
          {/* Add more doorway routes as you create them */}
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>,
)
