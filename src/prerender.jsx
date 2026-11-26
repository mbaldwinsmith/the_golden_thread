import { renderToStaticMarkup } from 'react-dom/server'
import App from './App.jsx'
import Contents from './Contents.jsx'
import PageHead from './PageHead.jsx'
import ReaderPanel from './components/garden/ReaderPanel.jsx'
import { POEMS } from './data/poems.js'
import { poemAt } from './publication.js'

export function render(path) {
  const poem = poemAt(path)
  const page = poem ? <ReaderPanel poem={poem} index={POEMS.indexOf(poem)} total={POEMS.length} /> :
    path === '/poems/' ? <Contents /> : <App />
  return { body: renderToStaticMarkup(page), head: renderToStaticMarkup(<PageHead path={path} />) }
}
