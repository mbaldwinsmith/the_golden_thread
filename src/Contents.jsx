import { POEMS } from './data/poems.js'
import { introduction, poemPath } from './publication.js'

export default function Contents() {
  return <main className="contents">
    <a href="/">← The garden</a>
    <h1>All poems</h1>
    <p>{introduction}</p>
    <ol>{POEMS.map(poem => <li key={poem.id}><a href={poemPath(poem)}>{poem.title}</a></li>)}</ol>
  </main>
}
