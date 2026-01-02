import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route,Navigate } from "react-router";
import './index.css'
import App from './App.tsx'
import Default from './pages/Default.tsx';
import Store from "./pages/Store.tsx"
createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/main/*" element={ <Default/>} />
        <Route path="/store/*" element={<Store/>}/>
        <Route path="/" element={<Navigate to="/main" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
