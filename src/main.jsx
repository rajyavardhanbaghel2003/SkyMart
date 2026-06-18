
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppRoutes from './routes/AppRoute.jsx'
import { UserProvider } from './components/context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
    <UserProvider>
        <AppRoutes/>
    </UserProvider>
)
