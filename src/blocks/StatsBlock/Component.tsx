// src/blocks/StatsBlock/Component.tsx
'use client'
import React, { useEffect, useRef, useCallback } from 'react'

// Updated interface for StatsBlock
interface StatsBlockType {
  marqueeText?: string
  statsTitle?: string
  statsDescription?: string
  primaryStats?: Array<{
    number: string
    label: string
    description?: string
  }>
  secondaryStats?: Array<{
    number: string
    label: string
    icon?:
      | {
          url?: string
          alt?: string
        }
      | string
  }>
  backgroundColor?: 'light' | 'dark' | 'gradient'
  disableInnerContainer?: boolean
}

// ScrollMarquee Component (reused from HeroBlock)
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

// Primary Stat Card Component (for large revenue figures)
interface PrimaryStatData {
  number: string
  label: string
  description?: string
}

const PrimaryStatCard: React.FC<{ stat: PrimaryStatData }> = ({ stat }) => {
  return (
    <div className="text-center mr-0 md:mr-8">
      {/* Large Number */}
      <div className="mb-2 md:mb-4">
        <span className="space-grotesk-light text-4xl md:text-6xl lg:text-7xl leading-[120%] tracking-tighter text-lightBlue-100">
          {stat.number}
        </span>
      </div>

      {/* Description */}
      {stat.description && (
        <p className="manrope-light text-base md:text-lg leading-[150%] text-dark-80 max-w-sm mx-auto">
          {stat.description}
        </p>
      )}
    </div>
  )
}

// Secondary Stat Card Component (for smaller stats with icons)
interface SecondaryStatData {
  number: string
  label: string
  icon?:
    | {
        url?: string
        alt?: string
      }
    | string
}

const SecondaryStatCard: React.FC<{ stat: SecondaryStatData }> = ({ stat }) => {
  const iconUrl = typeof stat.icon === 'object' && stat.icon?.url ? stat.icon.url : ''
  const iconAlt = typeof stat.icon === 'object' && stat.icon?.alt ? stat.icon.alt : stat.label

  return (
    <div className="text-center group">
      {/* Icon */}
      <div className="mb-2 md:mb-4 flex justify-center">
        {iconUrl ? (
          <img
            src={iconUrl}
            alt={iconAlt}
            className="w-12 h-12 md:w-16 md:h-16 object-contain opacity-40 group-hover:opacity-60 transition-opacity duration-300"
          />
        ) : (
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
        )}
      </div>

      {/* Number */}
      <div className="mb-2 md:mb-4">
        <span className="space-grotesk-light text-4xl md:text-5xl lg:text-6xl leading-[120%] tracking-tighter text-lightBlue-100">
          {stat.number}
        </span>
      </div>

      {/* Label */}
      <h3 className="manrope-light text-base md:text-lg leading-[150%] text-dark-60">
        {stat.label}
      </h3>
    </div>
  )
}

export const StatsBlock: React.FC<StatsBlockType> = ({
  marqueeText,
  statsTitle,
  statsDescription,
  primaryStats,
  secondaryStats,
  backgroundColor = 'light',
  disableInnerContainer,
}) => {
  // Background classes based on backgroundColor prop
  const backgroundClasses = React.useMemo(() => {
    switch (backgroundColor) {
      case 'dark':
        return 'bg-dark-100'
      case 'gradient':
        return 'secondary-gradient'
      case 'light':
      default:
        return 'bg-white'
    }
  }, [backgroundColor])

  // Text color classes based on background
  const textColorClasses = React.useMemo(() => {
    switch (backgroundColor) {
      case 'dark':
        return {
          title: 'text-white',
          description: 'text-gray-300',
          marquee: 'text-white',
        }
      default:
        return {
          title: 'text-dark-100',
          description: 'text-dark-80',
          marquee: 'text-black',
        }
    }
  }, [backgroundColor])

  const containerClasses = disableInnerContainer ? 'w-screen' : 'w-screen'

  return (
    <section className={`${containerClasses} ${backgroundClasses} py-5 md:py-10`}>
      {/* Marquee Section */}
      {marqueeText && (
        <div className="mb-5 md:mb-20">
          <ScrollMarquee
            text={marqueeText}
            textClassName={textColorClasses.marquee}
            padding="py-8 md:py-12"
            fadeEdges={false}
          />
        </div>
      )}

      {/* Stats Content Section */}
      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-20 mb-5 md:mb-10">
        {/* Header Section */}
        {/* {(statsTitle || statsDescription) && (
          <div className="text-center mb-16 md:mb-20 lg:mb-24">
            {statsTitle && (
              <h2
                className={`space-grotesk-light text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[120%] tracking-tighter mb-6 md:mb-8 ${textColorClasses.title}`}
              >
                {statsTitle}
              </h2>
            )}

            {statsDescription && (
              <div className="max-w-4xl mx-auto">
                <p
                  className={`manrope-light text-lg md:text-xl leading-[150%] ${textColorClasses.description}`}
                >
                  {statsDescription}
                </p>
              </div>
            )}
          </div>
        )} */}

        {/* Primary Stats Section (Large Revenue Figures) */}
        {primaryStats && primaryStats.length > 0 && (
          <div className="mb-10 md:mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {primaryStats.map((stat, index) => (
                <div key={index} className="relative">
                  <PrimaryStatCard stat={stat} />
                  {/* Vertical divider line between primary stats on desktop */}
                  {index === 0 && primaryStats.length > 1 && (
                    <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-32 bg-[#ECECEC]"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Secondary Stats Grid (Smaller stats with icons) */}
        {secondaryStats && secondaryStats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            {secondaryStats.map((stat, index) => (
              <SecondaryStatCard key={index} stat={stat} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
