import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Page from './app/page'
import Test from './app/test'
import Infinete from './app/infinete-query'
import ZodForm from './app/zod-form-copy'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ZodForm />
    </QueryClientProvider>
  </StrictMode>,
)
