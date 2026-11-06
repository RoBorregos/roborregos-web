// @flow
import placeholder from '../../images/placeholder-rectangle.png'

// Posts live in src/data/blog/<slug>.json and their images in src/images/blog/.
// Both are collected at build time, so publishing a post only means adding files in a PR.
// require.context is webpack-only; under Jest it doesn't exist, so we fall back to empty.

type Localized = string | { es?: string, en?: string };

export type Block = {
  type: 'paragraph' | 'heading' | 'image' | 'video',
  text?: Localized,
  src?: string,
  caption?: Localized,
};

export type Post = {
  slug: string,
  title: Localized,
  date: string,
  author?: string,
  cover?: string,
  summary?: Localized,
  draft?: boolean,
  content: Array<Block>,
};

let postFiles = null
let imageFiles = null
try {
  postFiles = require.context('../../data/blog', false, /\.json$/)
  imageFiles = require.context('../../images/blog', true, /\.(jpe?g|png|webp|gif)$/i)
} catch (err) {
  // Not running under webpack (e.g. Jest): no posts.
}

const loadPosts = (): Array<Post> => {
  if (!postFiles) return []
  return postFiles
    .keys()
    .map((key) => ({ file: key.replace(/^\.\//, ''), data: postFiles(key) }))
    .filter(({ file, data }) => !file.startsWith('_') && !data.draft)
    .map(({ file, data }) => ({ ...data, slug: file.replace(/\.json$/, '') }))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export const posts: Array<Post> = loadPosts()

export const getPost = (slug: string): ?Post => posts.find((p) => p.slug === slug)

export const localize = (value: ?Localized, language: number): string => {
  if (value == null) return ''
  if (typeof value === 'string') return value
  const preferred = language === 0 ? value.es : value.en
  return preferred || value.es || value.en || ''
}

export const resolveImage = (src: ?string): string => {
  if (!src) return placeholder
  if (/^https?:\/\//.test(src)) return src
  if (!imageFiles) return placeholder
  try {
    const mod = imageFiles(`./${src.replace(/^\.?\//, '')}`)
    return mod.default || mod
  } catch (err) {
    return placeholder
  }
}

// For <img onError>: swap a broken external URL for the placeholder (once).
export const onImageError = (e: SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget
  if (img.src !== placeholder) img.src = placeholder
}

export const formatDate = (date: string, language: number): string => {
  // Parse as a local date so "2026-11-09" doesn't shift a day in UTC-negative timezones.
  const [y, m, d] = date.split('-').map(Number)
  const parsed = new Date(y, (m || 1) - 1, d || 1)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString(language === 0 ? 'es-MX' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}
