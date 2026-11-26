import React, { useSyncExternalStore } from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'
import App from './App.jsx'
import Contents from './Contents.jsx'
import PageHead from './PageHead.jsx'
import './styles.css'

function subscribe(update) {
  window.addEventListener('popstate', update)
  return () => window.removeEventListener('popstate', update)
}

function Site() {
  const path = useSyncExternalStore(subscribe, () => location.pathname.replace(/\/?$/, '/'))
  return <>
    {createPortal(<PageHead path={path} />, document.head)}
    {path === '/poems/' ? <Contents /> : <App path={path} />}
  </>
}

// React takes ownership of the publication metadata on the first client render.
document.head.querySelectorAll('[data-publication]').forEach(tag => tag.remove())
createRoot(document.getElementById('root')).render(<React.StrictMode><Site /></React.StrictMode>)
