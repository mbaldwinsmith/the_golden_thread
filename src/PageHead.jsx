import { publication, author } from './publication.js'

export default function PageHead({ path }) {
  const { title, description, url, image, schema } = publication(path)
  return <>
    <title data-publication="">{title}</title>
    <meta data-publication="" name="author" content={author} />
    <meta data-publication="" name="description" content={description} />
    <link data-publication="" rel="canonical" href={url} />
    <meta data-publication="" property="og:type" content={schema.genre ? 'article' : 'website'} />
    <meta data-publication="" property="og:title" content={title} />
    <meta data-publication="" property="og:description" content={description} />
    <meta data-publication="" property="og:image" content={image} />
    <meta data-publication="" property="og:url" content={url} />
    <meta data-publication="" name="twitter:card" content="summary_large_image" />
    <meta data-publication="" name="twitter:title" content={title} />
    <meta data-publication="" name="twitter:description" content={description} />
    <meta data-publication="" name="twitter:image" content={image} />
    <script data-publication="" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replaceAll('<', '\\u003c') }} />
  </>
}
