import { POEMS } from './data/poems.js'

export const origin = 'https://thegoldenthread.garden'
export const author = 'Mark Baldwin-Smith'
export const introduction = 'Thirteen poems by Mark Baldwin-Smith follow a golden thread from exile, through the garden, to communion.'
export const poemPath = poem => '/poems/' + poem.id + '/'
export const poemAt = path => POEMS.find(poem => poemPath(poem) === path.replace(/\/?$/, '/'))
export const neighbour = (index, step) => POEMS[(index + step + POEMS.length) % POEMS.length]

export function publication(path) {
  const poem = poemAt(path)
  const contents = path === '/poems/'
  const title = poem ? poem.title + ' — The Golden Thread' :
    contents ? 'All poems — The Golden Thread' : 'The Golden Thread — a garden of poems'
  const description = poem ? poem.title + ' by ' + author + '. ' + poem.epigraph : introduction
  const url = origin + path
  const image = origin + '/' + (poem?.image || 'images/favicon.png')
  const schema = {
    '@context': 'https://schema.org',
    '@type': poem ? 'CreativeWork' : 'CollectionPage',
    name: poem?.title || 'The Golden Thread',
    author: { '@type': 'Person', name: author },
    url, image,
    ...(poem ? { genre: 'Poetry', isPartOf: { '@type': 'CreativeWork', name: 'The Golden Thread', url: origin + '/' } } : {}),
  }
  return { title, description, url, image, schema }
}

// Modified clicks retain normal browser behaviour, including opening a new tab.
export function followLink(event, action) {
  if (event.button || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
  event.preventDefault()
  action()
}
