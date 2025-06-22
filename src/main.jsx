import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UsuarioProvider } from './context/UsuarioContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsuarioProvider>
   <BrowserRouter>
    <App />
    </BrowserRouter>
    </UsuarioProvider>
  </StrictMode>,
)
