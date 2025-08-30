'use client'

import React, { useEffect, useRef, useCallback } from 'react'
import { ArrowRight } from 'lucide-react'
import type { ContentImageBlock as ContentImageBlockType } from '@/payload-types'
import RichText from '@/components/RichText'

// ScrollMarquee Component
interface ScrollMarqueeProps {
  text: string
  className?: string
  textClassName?: string
  speed?: number
  scrollSensitivity?: number
  repetitions?: number
  padding?: string
  fadeEdges?: boolean
  duration?: number
}

const ScrollMarquee: React.FC<ScrollMarqueeProps> = ({
  text,
  className = '',
  textClassName = 'text-black',
  speed = 1,
  scrollSensitivity = 0.25,
  repetitions = 6,
  padding = '',
  fadeEdges = true,
  duration = 45,
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const scrollDataRef = useRef({
    lastScrollY: 0,
    velocity: 0,
    offset: 0,
  })

  const updateAnimation = useCallback(() => {
    const element = marqueeRef.current
    if (!element) return

    const { lastScrollY, velocity, offset } = scrollDataRef.current
    const currentScrollY = window.scrollY
    const scrollDelta = currentScrollY - lastScrollY

    scrollDataRef.current.velocity = velocity * 0.85 + scrollDelta * 0.15
    scrollDataRef.current.offset = offset * 0.9 + scrollDataRef.current.velocity * scrollSensitivity

    element.style.transform = `translateX(${scrollDataRef.current.offset}px)`
    scrollDataRef.current.lastScrollY = currentScrollY
    rafRef.current = requestAnimationFrame(updateAnimation)
  }, [scrollSensitivity])

  useEffect(() => {
    scrollDataRef.current.lastScrollY = window.scrollY
    updateAnimation()

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [updateAnimation])

  const repeatedText = React.useMemo(
    () => Array.from({ length: repetitions }, () => text).join(' • '),
    [text, repetitions],
  )

  const containerClasses = React.useMemo(() => {
    const baseClasses = 'w-full overflow-hidden select-none py-4 md:py-8'
    const fadeClass = fadeEdges ? 'relative' : ''
    return [baseClasses, padding, fadeClass, className].filter(Boolean).join(' ')
  }, [padding, fadeEdges, className])

  const textClasses = React.useMemo(() => {
    const baseClasses =
      'inline-block whitespace-nowrap font-light tracking-tighter animate-marquee will-change-transform text-dark-20'
    const sizeClasses = 'text-4xl md:text-6xl lg:text-7xl'
    return [baseClasses, sizeClasses, textClassName].filter(Boolean).join(' ')
  }, [textClassName])

  return (
    <div className={containerClasses}>
      <div
        ref={marqueeRef}
        className={textClasses}
        style={
          {
            '--marquee-duration': `${duration}s`,
            '--marquee-distance': `-${100 / repetitions}%`,
            animationDuration: 'var(--marquee-duration)',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationName: 'marquee-scroll',
          } as React.CSSProperties
        }
      >
        {repeatedText}
      </div>

      {fadeEdges && (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/100 via-transparent to-white/100" />
      )}

      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(var(--marquee-distance));
          }
        }
      `}</style>
    </div>
  )
}

// Extended interface to include marquee and image container option
interface ExtendedContentImageBlockType extends ContentImageBlockType {
  marqueeText?: string
  imageContained?: boolean
}

export const ContentImageBlockComponent: React.FC<ExtendedContentImageBlockType> = ({
  marqueeText,
  title,
  description,
  buttonText,
  buttonLink,
  image,
  imagePosition = 'right', // Default to right if not specified
  imageContained = false, // Default to edge-to-edge if not specified
}) => {
  const imageUrl =
    image && typeof image === 'object' && 'url' in image && image.url ? image.url : ''
  const imageAlt =
    image && typeof image === 'object' && 'alt' in image && image.alt
      ? image.alt
      : title || 'Content image'

  // Determine if image should be on the left on desktop
  const isImageLeft = imagePosition === 'left'

  return (
    <section className="w-full overflow-hidden bg-white-100">
      {/* Optional Marquee Section */}
      {marqueeText && (
        <ScrollMarquee
          text={marqueeText}
          textClassName="text-black"
          padding="py-8 md:py-16"
          fadeEdges={false}
        />
      )}

      {/* Main Content Section */}
      <div className="w-full py-5 md:py-10">
        <div
          className={imageContained ? 'max-w-8xl mx-auto px-4 md:px-8 lg:px-12 xl:px-20' : 'w-full'}
        >
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 items-center min-h-[600px] ${
              isImageLeft ? 'lg:grid-flow-col-dense' : ''
            }`}
          >
            {/* Content Column */}
            <div
              className={`space-y-4 md:space-y-12 ${
                imageContained ? 'px-4 md:px-8 lg:px-12' : 'px-4 md:px-8 lg:px-12 xl:px-20'
              } ${isImageLeft ? 'lg:col-start-2' : ''} ${
                imageContained
                  ? isImageLeft
                    ? 'lg:pl-8'
                    : 'lg:pr-8'
                  : isImageLeft
                    ? 'lg:pl-8 xl:pl-12'
                    : 'lg:pr-8 xl:pr-12'
              }`}
            >
              {title && (
                <h2 className="space-grotesk-light text-4xl md:text-5xl lg:text-6xl leading-[120%] tracking-tighter text-dark-100">
                  {title}
                </h2>
              )}

              {description && (
                <div className="manrope-light text-base md:text-lg leading-[150%] text-dark-80 prose w-full">
                  <RichText data={description} enableProse />
                </div>
              )}

              {buttonText && buttonLink && (
                <a href={buttonLink}>
                  <button className="group relative w-fit px-5 py-4 mb-5 md:mt-10 rounded-full manrope-medium text-base text-dark-100 bg-white border border-dark-20 overflow-hidden transition-all duration-300 ease-out hover:text-light-100 hover:bg-primary-700 hover:border-primary-800 hover:scale-105 hover:shadow-lg hover:shadow-primary-700/25">
                    <span className="relative z-10 transition-transform duration-300 ease-out group-hover:scale-105">
                      {buttonText}
                    </span>

                    {/* Fluid background animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-full"></div>

                    {/* Ripple effect */}
                    <div className="absolute inset-0 rounded-full bg-primary-700 opacity-0 group-hover:opacity-20 transform scale-75 group-hover:scale-100 transition-all duration-700 ease-out"></div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  </button>
                </a>
              )}
            </div>

            {/* Image Column */}
            <div
              className={`relative w-full h-full aspect-square ${
                isImageLeft ? 'lg:col-start-1' : ''
              }`}
            >
              {imageUrl && (
                <div
                  className={`w-full h-full overflow-hidden shadow-lg ${
                    imageContained
                      ? 'rounded-2xl lg:rounded-2xl'
                      : `lg:shadow-none mx-0 md:mx-8 lg:mx-0 ${
                          isImageLeft
                            ? 'lg:rounded-r-3xl lg:rounded-l-none'
                            : 'lg:rounded-l-3xl lg:rounded-r-none'
                        }`
                  }`}
                >
                  <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
