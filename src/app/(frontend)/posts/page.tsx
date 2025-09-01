import type { Metadata } from 'next/types'
import Link from 'next/link'
import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { ChevronRight } from 'lucide-react'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <PageClient />

      {/* Hero Section with Team Photo */}
      <div className="relative w-full h-[480px] mb-16 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/images/sample-3.jpg')",
          }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/50 to-primary-200/30"></div>

        {/* Content */}
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <div className="text-center flex flex-col gap-10">
            <h1 className="space-grotesk-light text-7xl leading-[120%] tracking-tighter text-light-100">
              Latest News
            </h1>

            <p className="manrope-light text-lg leading-[150%] text-light-100">
              Stay updated with our latest insights, innovations, and developments
            </p>
          </div>
        </div>
      </div>

      {/* Posts Grid Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="mb-8">
          <PageRange
            collection="posts"
            currentPage={posts.page}
            limit={12}
            totalDocs={posts.totalDocs}
          />
        </div>

        {/* Custom Posts Grid Layout matching the image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {posts.docs.map((post, index) => (
            <article
              key={post.id || index}
              className="bg-transparent hover:bg-white rounded-r-2xl hover:shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-2 border-primary-600"
            >
              {/* Post Image Placeholder */}
              <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="">
                  <img src="assets/images/sample-2.png" alt="" className="w-full rounded-r-2xl" />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex gap-2 mb-2">
                    <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-white text-sm backdrop-blur-sm manrope-light">
                      News
                    </span>
                    <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-white text-sm backdrop-blur-sm manrope-light">
                      Technology
                    </span>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6 bg-transparent flex flex-col gap-6">
                <h3 className="manrope-semibold text-2xl leading-[150%] text-dark-100">
                  {post.title || 'Power and Energy Solutions'}
                </h3>

                <p className="manrope-light text-lg leading-[150%] text-dark-80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>

                <Link
                  href={`/posts/${post.slug}`}
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
          ))}
        </div>

        {/* Fallback for CollectionArchive if needed */}
        {/* <div className="hidden">
          <CollectionArchive posts={posts.docs} />
        </div> */}

        {/* Pagination */}
        <div className="flex justify-center">
          {posts.totalPages > 1 && posts.page && (
            <Pagination page={posts.page} totalPages={posts.totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `TRACE`,
  }
}
