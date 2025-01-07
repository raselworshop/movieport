import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './Router/Routes'
import AuthProvider from './Provider/AuthProvider'
import ThemeProvider from './Provider/ThemeProvider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={routes}></RouterProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
