// src/blocks/PostsBlock/ClientComponent.tsx
'use client'
import React from 'react'
import Link from 'next/link'
import { ChevronRight, Calendar, User } from 'lucide-react'

interface PostData {
  id: string
  title: string
  slug: string
  excerpt?: string // 👈 add this
  heroImage?: {
    url?: string
    alt?: string
  }
  content?: any
  categories?: Array<{
    id: string
    title: string
    slug: string
  }>
  authors?: Array<{
    id: string
    name: string
  }>
  publishedAt?: string
  meta?: {
    description?: string
    image?: {
      url?: string
      alt?: string
    }
  }
}

interface PostsBlockType {
  title?: string
  subtitle?: string
  showHeroImage?: boolean
  heroImage?: {
    url?: string
    alt?: string
  }
  backgroundColor?:
    | 'gradient-purple'
    | 'primary-gradient'
    | 'secondary-gradient'
    | 'yellow-gradient'
    | 'white'
  showExcerpt?: boolean
  gridLayout?: 'single-column' | 'two-column' | 'three-column' | 'zigzag'
  posts: PostData[]
}

// Post Card Component
const PostCard: React.FC<{
  post: PostData
  showExcerpt: boolean
}> = ({ post, showExcerpt }) => {
  const getExcerpt = (excerpt?: string, content?: any, metaDescription?: string): string => {
    if (excerpt) return excerpt // ✅ use backend excerpt first
    if (metaDescription) return metaDescription
    if (content && typeof content === 'object') {
      const extractText = (node: any): string => {
        if (typeof node === 'string') return node
        if (node?.children) return node.children.map(extractText).join(' ')
        if (node?.text) return node.text
        return ''
      }
      const text = extractText(content)
      return text.length > 200 ? text.substring(0, 200) + '...' : text
    }
    return 'Read more about this article...'
  }

  const excerpt = getExcerpt(post.excerpt, post.content, post.meta?.description)

  const postImage = post.heroImage?.url || post.meta?.image?.url || '/assets/images/sample-2.png'
  const postImageAlt = post.heroImage?.alt || post.meta?.image?.alt || post.title

  return (
    <article className="bg-transparent hover:bg-white rounded-r-2xl hover:shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-2 border-primary-600">
      {/* Post Image */}
      <div className="h-64 relative overflow-hidden">
        <img
          src={postImage}
          alt={postImageAlt}
          className="w-full h-full object-cover rounded-r-2xl"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex gap-2 flex-wrap">
              {post.categories.slice(0, 2).map((category) => (
                <span
                  key={category.id}
                  className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-white text-sm backdrop-blur-sm manrope-light"
                >
                  {category.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="p-6 bg-transparent flex flex-col gap-6">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-dark-60">
          {post.publishedAt && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span className="manrope-light">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          )}
          {post.authors && post.authors.length > 0 && (
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span className="manrope-light">{post.authors[0].name}</span>
            </div>
          )}
        </div>

        <h3 className="manrope-semibold text-2xl leading-[150%] text-dark-100">{post.title}</h3>

        {showExcerpt && (
          <p className="manrope-light text-lg leading-[150%] text-dark-80">{excerpt}</p>
        )}

        <Link
          href={`/posts/${post.slug}`}
          className="group relative w-fit flex items-center gap-2 manrope-medium text-base text-dark-80 transition-all duration-300 ease-out hover:text-primary-800 hover:gap-3"
        >
          <span className="relative overflow-hidden">
            Learn More
            <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-600 to-primary-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-full"></div>
          </span>
          <div className="relative overflow-hidden">
            <ChevronRight className="w-4 h-4 transform transition-transform duration-300 ease-out group-hover:translate-x-1" />
            <ChevronRight
              className="w-4 h-4 absolute top-0 left-0 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60 transition-all duration-300 ease-out delay-75"
              strokeWidth={1}
            />
          </div>
        </Link>
      </div>
    </article>
  )
}

export const PostsBlockClient: React.FC<PostsBlockType & { posts: any[] }> = ({
  title,
  subtitle,
  showHeroImage = false,
  heroImage,
  backgroundColor = 'gradient-purple',
  showExcerpt = true,
  gridLayout = 'two-column',
  posts = [],
}) => {
  const getBackgroundClass = (bgType: string) => {
    switch (bgType) {
      case 'gradient-purple':
        return 'bg-gradient-to-b from-purple-50 to-white'
      case 'primary-gradient':
        return 'primary-gradient'
      case 'secondary-gradient':
        return 'secondary-gradient'
      case 'yellow-gradient':
        return 'yellow-gradient'
      case 'white':
        return 'bg-white'
      default:
        return 'bg-gradient-to-b from-purple-50 to-white'
    }
  }

  const getGridClass = (layout: string) => {
    switch (layout) {
      case 'single-column':
        return 'grid-cols-1'
      case 'two-column':
        return 'grid-cols-1 lg:grid-cols-2'
      case 'three-column':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      case 'zigzag':
        return 'grid-cols-1 md:grid-cols-2'
      default:
        return 'grid-cols-1 lg:grid-cols-2'
    }
  }

  return (
    <section className={`w-full mt-[60px] ${getBackgroundClass(backgroundColor)}`}>
      {/* Hero Image (Optional) */}
      {showHeroImage && heroImage?.url && (
        <div className="relative w-full h-[480px] mb-16 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: heroImage?.url
                ? `url('${heroImage.url}')`
                : "url('/assets/images/sample-3.jpg')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/50 to-primary-200/30"></div>
        </div>
      )}

      {/* Title & Subtitle (Optional) */}
      {(title || subtitle) && (
        <div className="container mx-auto px-4 mb-12">
          {title && (
            <h2 className="space-grotesk-light text-5xl md:text-6xl leading-[120%] tracking-tighter text-dark-100 mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="manrope-light text-lg leading-[150%] text-dark-80">{subtitle}</p>
          )}
        </div>
      )}

      {/* Posts Section */}
      <div className="container mx-auto px-4 py-16">
        {posts.length > 0 ? (
          <div className={`grid ${getGridClass(gridLayout)} gap-8 md:gap-20 mb-16`}>
            {posts.map((post, index) => (
              <div
                key={post.id || index}
                className={gridLayout === 'zigzag' && index % 2 === 1 ? 'mt-20' : ''}
              >
                <PostCard post={post} showExcerpt={showExcerpt} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="manrope-light text-lg text-dark-60">No posts found.</p>
          </div>
        )}
      </div>
    </section>
  )
}
