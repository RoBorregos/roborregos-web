// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import BlogCard from '../../Blog/BlogCard'
import { posts } from '../../Blog/blogPosts'

const LATEST = 3

const HomeBlog = ({ language }: { language: number }) => {
  if (posts.length === 0) return null

  return (
    <section className="bg-gradient-to-b from-neutral-900 to-neutral-950 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title mb-10">{language === 0 ? 'Noticias' : 'News'}</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {posts.slice(0, LATEST).map((post) => (
            <BlogCard key={post.slug} post={post} language={language} />
          ))}
        </div>
        {posts.length > LATEST ? (
          <div className="mt-10 text-center">
            <Link to="/blog" className="rb-btn-outline">
              {language === 0 ? 'Ver todas' : 'See all posts'}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default HomeBlog
