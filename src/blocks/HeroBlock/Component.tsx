// src/blocks/HeroBlock/Component.tsx
'use client'
import React, { useEffect, useRef, useCallback } from 'react'
import { ChevronRight } from 'lucide-react'
import type { HeroBlock as HeroBlockType } from '@/payload-types'
import { Title, SubHeading, SubHeading2, Body } from '@/components/Text/typography'
import { PrimaryButton, SecondaryButton } from '@/components/Button/button'

// Updated interface for all hero sections
interface UpdatedHeroBlockType {
  primaryTitle?: string
  // secondaryTitle?: string
  bodyText?: string
  heroImg?:
    | {
        url?: string
        alt?: string
      }
    | string
  marqueeText?: string
  cardsDescription?: string
  cards?: Array<{
    title: string
    image:
      | {
          url?: string
          alt?: string
        }
      | string
    link?: string
  }>
  disableInnerContainer?: boolean
}

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

// Card Component
interface CardData {
  title: string
  image:
    | {
        url?: string
        alt?: string
      }
    | string
  link?: string
}

const Card: React.FC<{ card: CardData }> = ({ card }) => {
  const imageUrl = typeof card.image === 'object' && card.image.url ? card.image.url : ''
  const imageAlt = typeof card.image === 'object' && card.image.alt ? card.image.alt : card.title

  return (
    <div className="hover:bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group border-l-2 border-primary-600">
      <div className="aspect-[4/3] overflow-hidden">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-r-[16px]"
          />
        )}
      </div>
      <div className="p-6 flex flex-col gap-10 justify-between">
        <SubHeading2>{card.title}</SubHeading2>
        {card.link && (
          <a href={card.link} className="">
            <SecondaryButton>Learn More</SecondaryButton>
          </a>
        )}
      </div>
    </div>
  )
}

export const HeroBlock: React.FC<UpdatedHeroBlockType> = ({
  primaryTitle,
  // secondaryTitle,
  bodyText,
  heroImg,
  marqueeText,
  cardsDescription,
  cards,
  disableInnerContainer,
}) => {
  return (
    <section className="w-screen min-h-screen secondary-gradient mt-[-152px] flex flex-col gap-6 md:gap-16 pt-[152px] md:pt-[152px] pb-[72px]">
      {/* Content Section */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 max-w-8xl mx-auto px-4 md:px-20 mt-[88px] md:mt-[152px]">
        {/* Title Column */}
        <div className="w-full lg:w-2/3">
          {/* {(primaryTitle || secondaryTitle) && (
            <h1 className="space-grotesk-light text-4xl md:text-6xl lg:text-7xl leading-[120%] tracking-tighter text-dark-100">
              {primaryTitle && <span className="text-primary-700">{primaryTitle}</span>}
              {primaryTitle && secondaryTitle && ' '}
              {secondaryTitle}
            </h1>
          )} */}
          <Title className="text-darkBlue-100">{primaryTitle}</Title>
        </div>

        {/* Body Text Column */}
        <div className="w-full lg:w-1/3 py-4 lg:py-8 border-l-0 lg:border-l border-t lg:border-t-0 border-[#E8E8E8/20] flex flex-col items-start lg:items-center pl-0 lg:pl-8 pt-4 lg:pt-0">
          {bodyText && (
            <p className="manrope-light text-base md:text-lg leading-[150%] text-left lg:text-left text-dark-80">
              {bodyText}
            </p>
          )}
        </div>
      </div>

      {/* Image Section */}
      {heroImg && typeof heroImg === 'object' && 'url' in heroImg && heroImg.url && (
        <div className="w-full px-4 md:px-8 lg:px-20">
          <div className="relative w-full aspect-[1296/604] rounded-2xl md:rounded-[24px] overflow-hidden shadow-lg">
            <img
              src={heroImg.url}
              alt={
                ('alt' in heroImg && typeof heroImg.alt === 'string'
                  ? heroImg.alt
                  : primaryTitle) || 'Hero image'
              }
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Marquee Section */}
      {marqueeText && (
        <ScrollMarquee
          text={marqueeText}
          textClassName="text-black"
          padding="py-16"
          fadeEdges={false}
        />
      )}

      {/* Cards Section */}
      {cards && cards.length > 0 && (
        <div className="">
          <div className="max-w-8xl mx-auto px-4 md:px-20">
            {/* Header Section */}
            {cardsDescription && (
              <div className="flex justify-center gap-12 mb-12">
                <p className="manrope-light text-base md:text-lg leading-[150%] text-dark-80 text-center max-w-4xl">
                  {cardsDescription}
                </p>
              </div>
            )}

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {cards.map((card, index) => (
                <Card key={index} card={card} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
