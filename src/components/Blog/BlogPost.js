// @flow
import React, { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  getPost, localize, resolveImage, formatDate, onImageError, type Block,
} from './blogPosts'

type Props = {
  slug: string,
  language: number,
};

// Turns inline `[text](https://url)` into links; only http(s) URLs are accepted.
const renderLinks = (text: string) => text.split(/(\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g).map((part, i) => {
  const m = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/)
  return m ? (
    // eslint-disable-next-line react/no-array-index-key
    <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer" className="text-bright underline hover:text-white">{m[1]}</a>
  ) : part
})

const renderBlock = (block: Block, index: number, language: number) => {
  switch (block.type) {
    case 'heading':
      return (
        <h2 key={index} className="mt-10 font-anton text-2xl uppercase tracking-wide text-white md:text-3xl">
          {localize(block.text, language)}
        </h2>
      )
    case 'image':
      return (
        <figure key={index} className="my-8">
          <img
            src={resolveImage(block.src)}
            onError={onImageError}
            alt={localize(block.alt || block.caption, language)}
            className="w-full rounded-xl"
          />
          {block.caption ? (
            <figcaption className="mt-2 text-center text-sm text-gray-400">
              {localize(block.caption, language)}
            </figcaption>
          ) : null}
        </figure>
      )
    case 'quote':
      return (
        <figure key={index} className="my-10 border-l-4 border-roboblue pl-6">
          <blockquote className="text-xl italic leading-relaxed text-gray-100">
            {`“${localize(block.text, language)}”`}
          </blockquote>
          {block.author ? (
            <figcaption className="mt-4">
              <span className="font-anton uppercase tracking-wide text-white">{block.author}</span>
              {block.role ? <span className="text-gray-400">{` · ${localize(block.role, language)}`}</span> : null}
            </figcaption>
          ) : null}
        </figure>
      )
    case 'podium':
      return (
        <section key={index} className="my-8 rounded-xl bg-card px-6 py-5">
          {block.title ? (
            <h3 className="font-anton text-sm uppercase tracking-widest text-bright">
              {localize(block.title, language)}
            </h3>
          ) : null}
          <ol className="mt-2 divide-y divide-white/10">
            {(block.results || []).map((result) => (
              <li key={`${result.place}-${result.team}`} className="flex items-center gap-5 py-3">
                <span className="w-8 shrink-0 text-center font-jersey text-4xl leading-none text-bright">
                  {result.place}
                </span>
                <div>
                  <p className="font-anton text-xl uppercase tracking-wide text-white">{result.team}</p>
                  {result.school ? (
                    <p className="text-sm text-gray-400">{localize(result.school, language)}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )
    case 'video':
      return (
        <div key={index} className="my-8 aspect-video overflow-hidden rounded-xl">
          <iframe
            src={block.src}
            title={localize(block.caption, language) || `video-${index}`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )
    case 'paragraph':
    default:
      return (
        <p key={index} className="mt-5 text-lg leading-relaxed text-gray-200">
          {renderLinks(localize(block.text, language))}
        </p>
      )
  }
}

// The site sets `html { scroll-behavior: smooth }`, so the global scroll-to-top animates
// up from wherever Home was scrolled. Open posts at the top instantly, before paint.
const useInstantScrollTop = (slug: string) => {
  useLayoutEffect(() => {
    const root = document.documentElement
    if (!root) return undefined
    root.style.scrollBehavior = 'auto'
    // Reading the computed style forces the browser to apply the override now; without
    // this, scrollTo uses the stale `smooth` value and still animates.
    // eslint-disable-next-line no-void
    void window.getComputedStyle(root).scrollBehavior
    window.scrollTo(0, 0)
    root.style.scrollBehavior = ''
    return undefined
  }, [slug])
}

const BlogPost = ({ slug, language }: Props) => {
  useInstantScrollTop(slug)
  const post = getPost(slug)
  const back = (
    <Link to="/" className="text-sm text-gray-400 transition duration-300 hover:text-bright">
      <i className="fas fa-arrow-left mr-2" />
      {language === 0 ? 'Volver al inicio' : 'Back to home'}
    </Link>
  )

  if (!post) {
    document.title = 'RoBorregos | Blog'
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="section-title mb-6">404</h1>
        <p className="mb-8 text-gray-300">
          {language === 0 ? 'No encontramos esta publicación.' : "We couldn't find this post."}
        </p>
        {back}
      </section>
    )
  }

  const title = localize(post.title, language)
  document.title = `RoBorregos | ${title}`

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      {back}
      {post.category ? (
        <p className="mt-6 font-anton text-sm uppercase tracking-widest text-bright">
          {localize(post.category, language)}
        </p>
      ) : null}
      <h1 className={`${post.category ? 'mt-2' : 'mt-6'} font-jersey text-5xl leading-tight text-bright md:text-7xl`}>{title}</h1>
      <p className="mt-4 text-sm text-gray-400">
        <time dateTime={post.date}>{formatDate(post.date, language)}</time>
        {post.author ? ` · ${post.author}` : ''}
      </p>
      {post.cover ? (
        <img
          src={resolveImage(post.cover)}
          onError={onImageError}
          alt={localize(post.coverAlt, language)}
          className="mt-8 w-full rounded-xl"
        />
      ) : null}
      <div className="mt-4">
        {(post.content || []).map((block, i) => renderBlock(block, i, language))}
      </div>
    </article>
  )
}

export default BlogPost
