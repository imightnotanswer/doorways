import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Doorway1 from './pages/doorway1'
import Doorway1Part2 from './pages/doorway1_part2'
import Doorway2 from './pages/doorway2'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/doorway1" element={<Doorway1 />} />
        <Route path="/doorway1_part2" element={<Doorway1Part2 />} />
        <Route path="/doorway2" element={<Doorway2 />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)
