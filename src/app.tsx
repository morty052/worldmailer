import React, { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ClerkProvider } from '@clerk/clerk-react'

const secret = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export default function App() {
  const queryClient = useMemo(() => new QueryClient({}), [])
  return (
    <ClerkProvider publishableKey={secret}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </ClerkProvider>
  )
}
