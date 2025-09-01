// src/blocks/HeroBlock2/Component.tsx
'use client'
import React, { useEffect, useRef, useCallback } from 'react'
import RichText from '@/components/RichText'
import { Title, SubHeading, SubHeading2, Body } from '@/components/Text/typography'
import { PrimaryButton, SecondaryButton } from '@/components/Button/button'

// Updated interface for hero block 2
interface UpdatedHeroBlock2Type {
  primaryTitle?: string
  bodyText?: any // Rich text content
  button?: {
    text?: string
    link?: string
    type?: 'primary' | 'secondary'
  }
  heroImg?:
    | {
        url?: string
        alt?: string
      }
    | string
  heroImageFullWidth?: boolean
  backgroundColor?: 'primary-gradient' | 'secondary-gradient' | 'yellow-gradient'
  marqueeText?: string
  contentCardsDescription?: any // Rich text content
  contentCards?: Array<{
    subHeading: string
    bodyText: any // Rich text content
  }>
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

// Content Card Component
interface ContentCardData {
  subHeading: string
  bodyText: any // Rich text content
}

const ContentCard: React.FC<{ card: ContentCardData }> = ({ card }) => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="manrope-semibold text-2xl md:text-3xl leading-[130%] text-dark-100">
        {card.subHeading}
      </h3>
      <div className="manrope-light text-base md:text-lg leading-[150%] text-dark-80 prose w-full">
        <RichText data={card.bodyText} enableProse />
      </div>
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

export const HeroBlock2: React.FC<UpdatedHeroBlock2Type> = ({
  primaryTitle,
  bodyText,
  button,
  heroImg,
  heroImageFullWidth = true,
  backgroundColor = 'primary-gradient',
  marqueeText,
  contentCardsDescription,
  contentCards,
  disableInnerContainer,
  cards,
}) => {
  return (
    <section
      className={`w-screen min-h-screen ${backgroundColor} mt-[-152px] flex flex-col gap-6 md:gap-16 pt-[152px] md:pt-[152px] pb-[72px]`}
    >
      {/* Content Section - Title and Body Text stacked vertically, centered */}
      <div className="max-w-8xl mx-auto px-4 md:px-20 mt-[88px] md:mt-[152px]">
        <div className="flex flex-col items-center">
          <div className="w-full lg:w-2/3 flex flex-col gap-6 md:gap-8">
            {/* Title */}
            {primaryTitle && (
              <div className="">
                <Title>{primaryTitle}</Title>
              </div>
            )}

            {/* Body Text with continuous faded border */}
            {bodyText && (
              <div className="relative">
                <div className="w-full pl-0 md:pl-8">
                  <div className="manrope-light text-base md:text-lg leading-[150%] text-dark-80 prose w-full">
                    <RichText data={bodyText} enableProse className="w-full" />
                  </div>
                </div>
                {/* Single continuous border with fade */}
                {heroImg && (
                  <div
                    className="absolute left-0 top-0 w-[2px] hidden md:block"
                    style={{
                      height: button
                        ? 'calc(100% + 6rem + 4rem + 3rem)'
                        : 'calc(100% + 6rem + 4rem)', // Body height + gap to image + button height if present
                      background:
                        'linear-gradient(to bottom, transparent 0%, #b1b1b1ff 60%, #696969ff 100%)',
                    }}
                  />
                )}
              </div>
            )}

            {/* Optional Button */}
            {button && button.text && (
              <div className="flex justify-start pl-0 md:pl-8">
                {button.link ? (
                  <a href={button.link}>
                    {button.type === 'secondary' ? (
                      <SecondaryButton>{button.text}</SecondaryButton>
                    ) : (
                      <PrimaryButton>{button.text}</PrimaryButton>
                    )}
                  </a>
                ) : button.type === 'secondary' ? (
                  <SecondaryButton>{button.text}</SecondaryButton>
                ) : (
                  <PrimaryButton>{button.text}</PrimaryButton>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Section - Conditional full width or container width */}
      {heroImg && typeof heroImg === 'object' && 'url' in heroImg && heroImg.url && (
        <div className={heroImageFullWidth ? 'w-screen' : 'max-w-8xl px-4 md:px-20'}>
          <div
            className={`relative w-full aspect-[1296/604] ${!heroImageFullWidth ? 'rounded-lg overflow-hidden' : 'overflow-hidden'}`}
          >
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

      {/* Content Cards Section */}
      {(contentCardsDescription || (contentCards && contentCards.length > 0)) && (
        <div className="">
          <div className="max-w-8xl mx-auto px-4 md:px-20">
            {/* Header Section - Full width with left border */}
            {contentCardsDescription && (
              <div className="flex justify-center mb-12">
                <div className="w-full border-l-0 md:border-l-4 border-primary-700 pl-0 md:pl-8">
                  <div className="manrope-light text-base md:text-lg leading-[150%] text-dark-80 prose w-full">
                    <RichText data={contentCardsDescription} enableProse />
                  </div>
                </div>
              </div>
            )}

            {/* Content Cards Grid - Only show if cards exist */}
            {contentCards && contentCards.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {contentCards.map((card, index) => (
                  <ContentCard key={index} card={card} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cards Section */}
      {cards && cards.length > 0 && (
        <div className="">
          <div className="max-w-8xl mx-auto px-4 md:px-20">
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
