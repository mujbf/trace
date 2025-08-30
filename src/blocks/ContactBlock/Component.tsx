'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import type { ContactBlock as ContactBlockType } from '@/payload-types'
import { Title, SubHeading, SubHeading2, Body } from '@/components/Text/typography'
import { PrimaryButton, SecondaryButton } from '@/components/Button/button'

// ScrollMarquee Component (matching hero block)
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

export const ContactBlockComponent: React.FC<ContactBlockType> = ({
  backgroundImage,
  mainTitle,
  tabs,
}) => {
  const [activeTab, setActiveTab] = useState(0)

  const backgroundImageUrl =
    backgroundImage &&
    typeof backgroundImage === 'object' &&
    'url' in backgroundImage &&
    backgroundImage.url
      ? backgroundImage.url
      : ''

  return (
    <section className="w-screen min-h-screen secondary-gradient flex flex-col gap-6 md:gap-16 pt-[60px]">
      {/* Hero Image Section */}
      {backgroundImageUrl && (
        <div className="w-screen relative aspect-[3/1] overflow-hidden">
          <img
            src={backgroundImageUrl}
            alt="Contact hero image"
            className="w-full h-fit object-cover"
          />
        </div>
      )}

      {/* Marquee Section */}
      {mainTitle && (
        <ScrollMarquee
          text={mainTitle}
          textClassName="text-black"
          padding="py-16"
          fadeEdges={false}
        />
      )}

      {/* Main Content */}
      <div className="pb-16 px-4 md:px-8 lg:px-12 xl:px-20">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Side - Navigation Tabs */}
            <div className="space-y-4">
              {tabs &&
                tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`w-full text-left p-6 rounded-lg transition-all duration-300 group border-l-2 ${
                      activeTab === index
                        ? 'bg-white shadow-lg border-primary-600 hover:shadow-lg'
                        : 'bg-white/90 hover:bg-white hover:shadow-md border-transparent hover:border-primary-600'
                    }`}
                  >
                    <h3
                      className={`manrope-semibold text-lg md:text-xl leading-[150%] transition-colors duration-300 ${
                        activeTab === index
                          ? 'text-primary-700'
                          : 'text-dark-100 group-hover:text-primary-700'
                      }`}
                    >
                      {tab.tabTitle}
                    </h3>
                    {tab.tabSubtitle && (
                      <p className="manrope-light text-dark-60 mt-2 text-base md:text-lg leading-[150%]">
                        {tab.tabSubtitle}
                      </p>
                    )}
                  </button>
                ))}
            </div>

            {/* Right Side - Active Form */}
            <div className="bg-white/10 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              {tabs && tabs[activeTab] && (
                <div>
                  <div className="mb-6 md:mb-8">
                    <h2 className="space-grotesk-medium text-2xl md:text-3xl lg:text-4xl leading-[120%] tracking-tighter text-dark-100 mb-2">
                      {tabs[activeTab].tabTitle}
                    </h2>
                    {tabs[activeTab].tabSubtitle && (
                      <p className="manrope-light text-base md:text-lg leading-[150%] text-dark-80">
                        {tabs[activeTab].tabSubtitle}
                      </p>
                    )}
                  </div>

                  {/* Form Fields */}
                  <form className="space-y-6">
                    {tabs[activeTab].formFields?.map((field, fieldIndex) => (
                      <div key={fieldIndex}>
                        {field.fieldType === 'text' && (
                          <input
                            type="text"
                            placeholder={field.placeholder || field.fieldLabel}
                            className="w-full px-4 py-3 md:py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent manrope-regular text-base transition-all duration-200 hover:border-gray-300"
                          />
                        )}
                        {field.fieldType === 'email' && (
                          <input
                            type="email"
                            placeholder={field.placeholder || field.fieldLabel}
                            className="w-full px-4 py-3 md:py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent manrope-regular text-base transition-all duration-200 hover:border-gray-300"
                          />
                        )}
                        {field.fieldType === 'tel' && (
                          <input
                            type="tel"
                            placeholder={field.placeholder || field.fieldLabel}
                            className="w-full px-4 py-3 md:py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent manrope-regular text-base transition-all duration-200 hover:border-gray-300"
                          />
                        )}
                        {field.fieldType === 'textarea' && (
                          <textarea
                            placeholder={field.placeholder || field.fieldLabel}
                            rows={4}
                            className="w-full px-4 py-3 md:py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent manrope-regular text-base resize-none transition-all duration-200 hover:border-gray-300"
                          />
                        )}
                        {field.fieldType === 'select' && (
                          <select className="w-full px-4 py-3 md:py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent manrope-regular text-base transition-all duration-200 hover:border-gray-300 bg-white">
                            <option value="">
                              {field.placeholder || `Select ${field.fieldLabel}`}
                            </option>
                            {field.options?.map((option, optionIndex) => (
                              <option key={optionIndex} value={option.id || option.option}>
                                {option.option}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    ))}

                    <button
                      type="submit"
                      className="group relative w-full px-5 py-4 rounded-full manrope-medium text-base text-dark-100 bg-white border border-dark-20 overflow-hidden transition-all duration-300 ease-out hover:text-light-100 hover:bg-primary-700 hover:border-primary-800 hover:scale-105 hover:shadow-lg hover:shadow-primary-700/25"
                    >
                      <span className="relative z-10 transition-transform duration-300 ease-out group-hover:scale-105">
                        {tabs[activeTab].submitButtonText || 'Submit'}
                      </span>

                      {/* Fluid background animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-full"></div>

                      {/* Ripple effect */}
                      <div className="absolute inset-0 rounded-full bg-primary-700 opacity-0 group-hover:opacity-20 transform scale-75 group-hover:scale-100 transition-all duration-700 ease-out"></div>

                      {/* Shimmer effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
