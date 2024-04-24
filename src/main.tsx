import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import ScrollToTop from './components/common/ScrollToTop.ts'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
)
