// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import {
  getPost, localize, resolveImage, formatDate, onImageError, type Block,
} from './blogPosts'

type Props = {
  slug: string,
  language: number,
};

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
            alt={localize(block.caption, language)}
            className="w-full rounded-xl"
          />
          {block.caption ? (
            <figcaption className="mt-2 text-center text-sm text-gray-400">
              {localize(block.caption, language)}
            </figcaption>
          ) : null}
        </figure>
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
          {localize(block.text, language)}
        </p>
      )
  }
}

const BlogPost = ({ slug, language }: Props) => {
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
      <h1 className="mt-6 font-jersey text-5xl leading-tight text-bright md:text-7xl">{title}</h1>
      <p className="mt-4 text-sm text-gray-400">
        <time dateTime={post.date}>{formatDate(post.date, language)}</time>
        {post.author ? ` · ${post.author}` : ''}
      </p>
      {post.cover ? (
        <img src={resolveImage(post.cover)} onError={onImageError} alt="" className="mt-8 w-full rounded-xl" />
      ) : null}
      <div className="mt-4">
        {(post.content || []).map((block, i) => renderBlock(block, i, language))}
      </div>
    </article>
  )
}

export default BlogPost
