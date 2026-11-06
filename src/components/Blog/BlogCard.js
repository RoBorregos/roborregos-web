// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import {
  localize, resolveImage, formatDate, onImageError, type Post,
} from './blogPosts'

type Props = {
  post: Post,
  language: number,
};

const BlogCard = ({ post, language }: Props) => (
  <Link
    to={`/blog/${post.slug}`}
    className="group flex flex-col overflow-hidden rounded-xl bg-card"
  >
    <div className="overflow-hidden">
      <img
        src={resolveImage(post.cover)}
        onError={onImageError}
        alt=""
        className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
    <div className="flex flex-1 flex-col p-6">
      <time dateTime={post.date} className="text-sm text-gray-400">
        {formatDate(post.date, language)}
      </time>
      <h3 className="mt-2 font-anton text-2xl uppercase tracking-wide text-white transition duration-300 group-hover:text-bright">
        {localize(post.title, language)}
      </h3>
      {post.summary ? (
        <p className="mt-3 leading-relaxed text-gray-300">{localize(post.summary, language)}</p>
      ) : null}
    </div>
  </Link>
)

export default BlogCard
