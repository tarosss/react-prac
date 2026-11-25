import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Three from './app/three'
import Test from './app/test'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Three />
    </QueryClientProvider>
  </StrictMode>,
)
