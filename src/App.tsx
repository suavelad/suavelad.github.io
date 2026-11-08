import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
const Professional = lazy(() => import('./pages/Professional'))
const Research = lazy(() => import('./pages/Research'))
const Publications = lazy(() => import('./pages/Publications'))
const Education = lazy(() => import('./pages/Education'))
const Community = lazy(() => import('./pages/Community'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))
import { canonical, metaFor, pages } from './seo'

/** Keep <head> in sync with the route for client-side navigation. */
function useHead(pathname: string) {
  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/'
    const known = pages.some((p) => p.path === path)
    const m = metaFor(path)
    const title = known ? m.title : 'Page not found | Sunday Ajayi'
    document.title = title
    const set = (sel: string, attr: string, val: string) => document.head.querySelector(sel)?.setAttribute(attr, val)
    set('meta[name="description"]', 'content', m.description)
    set('link[rel="canonical"]', 'href', canonical(path))
    set('meta[property="og:title"]', 'content', title)
    set('meta[property="og:description"]', 'content', m.description)
    set('meta[property="og:url"]', 'content', canonical(path))
    set('meta[name="twitter:title"]', 'content', title)
    set('meta[name="twitter:description"]', 'content', m.description)
    set('meta[name="robots"]', 'content', known ? 'index, follow, max-image-preview:large' : 'noindex')
  }, [pathname])
}

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  useHead(pathname)

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="professional" element={<Professional />} />
        <Route path="research" element={<Research />} />
        <Route path="publications" element={<Publications />} />
        <Route path="education" element={<Education />} />
        <Route path="community" element={<Community />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </Suspense>
  )
}
