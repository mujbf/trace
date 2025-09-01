// src/blocks/PostsBlock/Component.tsx
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PostsBlockClient } from './ClientComponent'

import type { Post } from '@/payload-types'

interface PostsBlockProps {
  title?: string
  subtitle?: string
  postsToShow?: 'all' | 'latest' | 'specific' | 'category'
  numberOfPosts?: number
  specificPosts?: Array<string | Post>
  selectedCategories?: Array<{
    id: string
    title: string
    slug: string
  }>
  limitByCategory?: number
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
  showPagination?: boolean
  postsPerPage?: number
  showExcerpt?: boolean
  gridLayout?: 'single-column' | 'two-column' | 'three-column'
  blockType?: 'postsBlock'
}

export const PostsBlock: React.FC<PostsBlockProps> = async (props) => {
  const {
    postsToShow = 'all',
    numberOfPosts = 6,
    specificPosts,
    selectedCategories,
    limitByCategory = 6,
    ...clientProps
  } = props

  const payload = await getPayload({ config: configPromise })

  let posts: Post[] = []

  try {
    switch (postsToShow) {
      case 'latest':
        const latestPosts = await payload.find({
          collection: 'posts',
          depth: 2,
          limit: numberOfPosts,
          sort: '-publishedAt',
          where: {
            _status: {
              equals: 'published',
            },
          },
        })
        posts = latestPosts.docs
        break

      case 'specific':
        if (specificPosts && specificPosts.length > 0) {
          const postIds = specificPosts
            .map((post) => (typeof post === 'string' ? post : post.id))
            .filter(Boolean)

          if (postIds.length > 0) {
            const specificPostsResult = await payload.find({
              collection: 'posts',
              depth: 2,
              where: {
                id: {
                  in: postIds,
                },
                _status: {
                  equals: 'published',
                },
              },
            })
            posts = specificPostsResult.docs
          }
        }
        break

      case 'category':
        if (selectedCategories && selectedCategories.length > 0) {
          const categoryIds = selectedCategories.map((cat) => cat.id).filter(Boolean)

          if (categoryIds.length > 0) {
            const categoryPosts = await payload.find({
              collection: 'posts',
              depth: 2,
              limit: limitByCategory,
              sort: '-publishedAt',
              where: {
                categories: {
                  in: categoryIds,
                },
                _status: {
                  equals: 'published',
                },
              },
            })
            posts = categoryPosts.docs
          }
        }
        break

      case 'all':
      default:
        const allPosts = await payload.find({
          collection: 'posts',
          depth: 2,
          limit: numberOfPosts || 50,
          sort: '-publishedAt',
          where: {
            _status: {
              equals: 'published',
            },
          },
        })
        posts = allPosts.docs
        break
    }
  } catch (error) {
    console.error('Error fetching posts for PostsBlock:', error)
    posts = []
  }

  // Transform posts to match the expected interface with proper type safety
  const transformedPosts = posts
    .filter((post): post is Post & { slug: string } =>
      Boolean(post && typeof post.slug === 'string' && post.slug.length > 0),
    )
    .map((post) => ({
      id: post.id,
      title: post.title || 'Untitled Post',
      slug: post.slug,
      excerpt: post.excerpt || undefined, // ✅ added this so ClientComponent can show it
      heroImage:
        typeof post.heroImage === 'object' && post.heroImage !== null && post.heroImage.url
          ? {
              url: post.heroImage.url,
              alt: post.heroImage.alt || post.title || 'Post image',
            }
          : undefined,
      content: post.content,
      categories: Array.isArray(post.categories)
        ? post.categories
            .filter(
              (
                cat,
              ): cat is NonNullable<typeof cat> & { title: string; id: string; slug?: string } =>
                Boolean(
                  cat && typeof cat === 'object' && cat !== null && 'title' in cat && 'id' in cat,
                ),
            )
            .map((cat) => ({
              id: cat.id,
              title: cat.title,
              slug:
                'slug' in cat && cat.slug ? cat.slug : cat.title.toLowerCase().replace(/\s+/g, '-'),
            }))
        : [],
      authors: Array.isArray(post.populatedAuthors)
        ? post.populatedAuthors
            .filter((author): author is NonNullable<typeof author> & { name: string; id: string } =>
              Boolean(author && typeof author === 'object' && author.name && author.id),
            )
            .map((author) => ({
              id: author.id,
              name: author.name,
            }))
        : [],
      publishedAt: post.publishedAt || undefined,
      meta: {
        description: post.meta?.description || undefined,
        image:
          typeof post.meta?.image === 'object' && post.meta.image !== null && post.meta.image.url
            ? {
                url: post.meta.image.url,
                alt: post.meta.image.alt || post.title || 'Post meta image',
              }
            : undefined,
      },
    }))

  return <PostsBlockClient {...clientProps} posts={transformedPosts} />
}
