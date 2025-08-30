import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { Calendar, ChevronRight, Clock, User } from 'lucide-react'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className=" ">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero post={post} />

      <div className="flex flex-col gap-4 py-8 md:py-20 yellow-gradient">
        <div className="container">
          {/* Post Title */}
          <div className="mx-auto mb-8">
            <h1 className="space-grotesk-light text-3xl md:text-5xl lg:text-6xl leading-[120%] tracking-tighter text-dark-100">
              {post?.title || 'Untitled Post'}
            </h1>
            {/* Author and Published Date */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-6 py-4 md:py-8 border-y border-dark-20/10">
              {post?.populatedAuthors &&
                Array.isArray(post.populatedAuthors) &&
                post.populatedAuthors.length > 0 && (
                  <div className="flex items-center gap-2">
                    <User className="text-dark-60" />
                    <span className="manrope-medium text-sm md:text-base text-dark-60">
                      {post.populatedAuthors
                        .filter((author) => author?.name) // Filter out authors without names
                        .map((author, index) => (
                          <span key={author?.id || index}>
                            {author?.name}
                            {index <
                              (post.populatedAuthors?.filter((a) => a?.name)?.length || 0) - 1 &&
                              ', '}
                          </span>
                        ))}
                    </span>
                  </div>
                )}

              {post?.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="text-dark-60" />
                  <time
                    dateTime={post.publishedAt}
                    className="manrope-medium text-sm md:text-base text-dark-60"
                  >
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              )}
            </div>
          </div>

          <RichText
            className="max-w-[48rem] mx-auto manrope-light text-sm md:text-lg leading-[150%] text-dark-80 my-0"
            data={post?.content}
            enableGutter={false}
          />

          {/* Updated Related Posts Section */}
          {post?.relatedPosts &&
            Array.isArray(post.relatedPosts) &&
            post.relatedPosts.length > 0 && (
              <div className="mt-16 mx-auto">
                <h2 className="manrope-semibold text-3xl leading-[120%] text-dark-100 mb-8 text-center">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {post.relatedPosts
                    .filter((relatedPost) => relatedPost && typeof relatedPost === 'object')
                    .map((relatedPost, index) => {
                      const typedPost = relatedPost as Post
                      return (
                        <article
                          key={typedPost?.id || index}
                          className="bg-transparent hover:bg-white rounded-r-2xl hover:shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-2 border-primary-600"
                        >
                          {/* Post Image */}
                          <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                            <div className="">
                              {typedPost?.heroImage && typeof typedPost.heroImage === 'object' ? (
                                <Media
                                  resource={typedPost.heroImage}
                                  className="w-full h-full object-cover rounded-r-2xl"
                                  priority={false}
                                />
                              ) : (
                                <img
                                  src="/assets/images/sample-2.png"
                                  alt={typedPost?.title || 'Post image'}
                                  className="w-full h-full object-cover rounded-r-2xl"
                                />
                              )}
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                              <div className="flex gap-2 mb-2 flex-wrap">
                                {typedPost?.categories &&
                                Array.isArray(typedPost.categories) &&
                                typedPost.categories.length > 0 ? (
                                  typedPost.categories
                                    .filter(
                                      (category) =>
                                        category &&
                                        typeof category === 'object' &&
                                        category !== null,
                                    )
                                    .map((category, catIndex) => (
                                      <span
                                        key={catIndex}
                                        className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-white text-sm backdrop-blur-sm manrope-light"
                                      >
                                        {(category as any)?.title || 'Category'}
                                      </span>
                                    ))
                                ) : (
                                  <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-white text-sm backdrop-blur-sm manrope-light">
                                    Article
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Post Content */}
                          <div className="p-6 bg-transparent flex flex-col gap-6">
                            <h3 className="manrope-semibold text-2xl leading-[150%] text-dark-100">
                              {typedPost?.title || 'Untitled Post'}
                            </h3>

                            <p className="manrope-light text-lg leading-[150%] text-dark-80">
                              {typedPost?.meta?.description ||
                                'Discover insights and updates in this comprehensive article covering the latest developments and expert analysis.'}
                            </p>

                            <Link
                              href={`/posts/${typedPost?.slug || '#'}`}
                              className="group relative w-fit flex items-center gap-2 manrope-medium text-base text-dark-80 transition-all duration-300 ease-out hover:text-primary-800 hover:gap-3"
                            >
                              <span className="relative overflow-hidden">
                                Learn More
                                {/* Animated underline */}
                                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-600 to-primary-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-full"></div>
                              </span>

                              {/* Arrow with smooth movement */}
                              <div className="relative overflow-hidden">
                                <ChevronRight className="w-4 h-4 transform transition-transform duration-300 ease-out group-hover:translate-x-1" />

                                {/* Arrow trail effect */}
                                <ChevronRight
                                  className="w-4 h-4 absolute top-0 left-0 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60 transition-all duration-300 ease-out delay-75"
                                  strokeWidth={1}
                                />
                              </div>
                            </Link>
                          </div>
                        </article>
                      )
                    })}
                </div>
              </div>
            )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
