// src/blocks/PostsBlock/serverUtils.ts
import { getPayload } from 'payload'
import configPromise from '@payload-config'

interface PostsBlockData {
  postsToShow?: 'all' | 'latest' | 'specific' | 'category'
  numberOfPosts?: number
  specificPosts?: string[] // Array of post IDs
  selectedCategories?: string[] // Array of category IDs
  limitByCategory?: number
}

export async function fetchPostsForBlock(blockData: PostsBlockData) {
  const payload = await getPayload({ config: configPromise })

  try {
    switch (blockData.postsToShow) {
      case 'latest':
        return await payload.find({
          collection: 'posts',
          depth: 2,
          limit: blockData.numberOfPosts || 6,
          sort: '-publishedAt',
          where: {
            _status: {
              equals: 'published'
            }
          },
          select: {
            title: true,
            slug: true,
            heroImage: true,
            content: true,
            categories: true,
            authors: true,
            publishedAt: true,
            meta: true,
          },
        })

      case 'specific':
        if (!blockData.specificPosts || blockData.specificPosts.length === 0) {
          return { docs: [], totalDocs: 0, page: 1, totalPages: 1 }
        }
        
        return await payload.find({
          collection: 'posts',
          depth: 2,
          where: {
            id: {
              in: blockData.specificPosts
            },
            _status: {
              equals: 'published'
            }
          },
          select: {
            title: true,
            slug: true,
            heroImage: true,
            content: true,
            categories: true,
            authors: true,
            publishedAt: true,
            meta: true,
          },
        })

      case 'category':
        if (!blockData.selectedCategories || blockData.selectedCategories.length === 0) {
          return { docs: [], totalDocs: 0, page: 1, totalPages: 1 }
        }

        return await payload.find({
          collection: 'posts',
          depth: 2,
          limit: blockData.limitByCategory || 6,
          sort: '-publishedAt',
          where: {
            categories: {
              in: blockData.selectedCategories
            },
            _status: {
              equals: 'published'
            }
          },
          select: {
            title: true,
            slug: true,
            heroImage: true,
            content: true,
            categories: true,
            authors: true,
            publishedAt: true,
            meta: true,
          },
        })

      case 'all':
      default:
        return await payload.find({
          collection: 'posts',
          depth: 2,
          limit: 50, // Reasonable limit for all posts
          sort: '-publishedAt',
          where: {
            _status: {
              equals: 'published'
            }
          },
          select: {
            title: true,
            slug: true,
            heroImage: true,
            content: true,
            categories: true,
            authors: true,
            publishedAt: true,
            meta: true,
          },
        })
    }
  } catch (error) {
    console.error('Error fetching posts for PostsBlock:', error)
    return { docs: [], totalDocs: 0, page: 1, totalPages: 1 }
  }
}

// Helper function to process posts data for the component
export function processPostsData(postsResult: any) {
  if (!postsResult || !postsResult.docs) {
    return []
  }

  return postsResult.docs.map((post: any) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    heroImage: post.heroImage,
    content: post.content,
    categories: post.categories,
    authors: post.authors,
    publishedAt: post.publishedAt,
    meta: post.meta,
  }))
}