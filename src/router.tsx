import React from 'react'
import { createHashRouter, createRoutesFromElements, createBrowserRouter, Route } from 'react-router-dom'
import ErrorPage from './components/error-page'
import { getDefaultLayout } from './components/layout'
import HomePage from './pages/home'
import { Dashboard, EmailLookup, PhoneLookup } from './pages'

type routes = {
  path: string
  Component: React.ReactElement
}

export const routerObjects: routes[] = [
  {
    path: '/',
    Component: <HomePage />,
  },
  {
    path: '/bulkmail/*',
    Component: <Dashboard />,
  },
  {
    path: '/emaillookup/*',
    Component: <EmailLookup />,
  },
  {
    path: '/phonelookup/*',
    Component: <PhoneLookup />,
  },
]

export const router = createBrowserRouter(
  createRoutesFromElements(
    routerObjects.map((route, index) => {
      return <Route key={index} path={route.path} element={route.Component} />
    }),
  ),
)

export function createRouter(): ReturnType<typeof createHashRouter> {
  const routeWrappers = routerObjects.map((router) => {
    // @ts-ignore TODO: better type support
    const getLayout = router.Component?.getLayout || getDefaultLayout
    const Component = router.Component!
    const page = getLayout(<Component />)
    return {
      ...router,
      element: page,
      Component: null,
      ErrorBoundary: ErrorPage,
    }
  })

  return createHashRouter(routeWrappers)
}
