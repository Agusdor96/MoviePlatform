import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { MovieProvider } from './context/MovieContext.jsx';
// import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MovieProvider> {/* Envuelve tu App con MovieProvider */}
      <App />
    </MovieProvider>
  </StrictMode>,
);
