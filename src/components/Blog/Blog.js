// @flow
import React from 'react'
import BlogCard from './BlogCard'
import { posts } from './blogPosts'

const Blog = ({ language }: { language: number }) => {
  document.title = 'RoBorregos | Blog'

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="section-title mb-10">{language === 0 ? 'Noticias' : 'News'}</h1>
        {posts.length === 0 ? (
          <p className="text-gray-400">{language === 0 ? 'Próximamente.' : 'Coming soon.'}</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} language={language} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Blog
