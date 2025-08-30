import type { Metadata } from 'next/types'
import React from 'react'
import { ChevronRight } from 'lucide-react'
import ScrollMarquee from './ScrollMarquee'
import TraceCardsGrid from './TraceCardsGrid'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function BlocksPage() {
  return (
    <div className="w-screen min-h-screen secondary-gradient -mt-20 flex flex-col gap-12">
      <div className="flex gap-12 max-w-8xl mx-auto px-4 md:px-20 mt-[152px]">
        <h1 className="space-grotesk-light text-7xl leading-[120%] tracking-tighter w-2/3 text-dark-100">
          <span className="text-primary-700">Technologically Re-Awakening</span> Culture of
          Excellence
        </h1>
        <div className="w-1/3 py-8 border-l border-[#E8E8E8] flex flex-col items-center pl-8">
          <p className="manrope-light text-lg leading-[150%]">
            Welcome to TRACE – Sri Lanka&apos;s dynamic Technology & Innovation Ecosystem dedicated
            to moving our nation up the global value chain science and engineering universities.
          </p>
        </div>
      </div>

      {/* Video Section */}
      <div className="w-full px-4 md:px-8 lg:px-20">
        <div className="relative w-full aspect-video rounded-2xl md:rounded-[24px] overflow-hidden shadow-lg">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/images/video-poster.jpg" // Optional poster image
          >
            <source src="/assets/videos/sample-1.mp4" type="video/mp4" />
            <source src="/assets/videos/trace-hero.webm" type="video/webm" />
            {/* Fallback for browsers that don't support video */}
            <img
              src="/assets/images/sample-1.png"
              alt="TRACE Technology Innovation Ecosystem"
              className="w-full h-full object-cover"
            />
          </video>
        </div>
      </div>

      <ScrollMarquee
        text="Our Pillars"
        fadeEdges={false}
        className=""
        textClassName="text-dark-20"
        scrollSensitivity={0.1}
        speed={0.1}
      />

      {/* CArd Section */}

      <TraceCardsGrid />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Sample Blocks Page',
    description:
      'A sample page showcasing various component blocks including text, buttons, cards, and more.',
  }
}
