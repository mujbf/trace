'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { PartnersBlock as PartnersBlockType } from '@/payload-types'

export const PartnersBlockComponent: React.FC<PartnersBlockType> = ({
  title,
  partners,
  rowsToShow: rawRowsToShow,
}) => {
  const rowsToShow = Number(rawRowsToShow ?? 1)

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // 6 logos per row on desktop, 3 on mobile
  const partnersPerRow = { desktop: 6, mobile: 3 }
  const partnersPerSlide = {
    desktop: partnersPerRow.desktop * rowsToShow,
    mobile: partnersPerRow.mobile * rowsToShow,
  }

  const totalSlides = {
    desktop: Math.ceil((partners?.length || 0) / partnersPerSlide.desktop),
    mobile: Math.ceil((partners?.length || 0) / partnersPerSlide.mobile),
  }

  const nextSlide = () => {
    if (isAnimating || !partners) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % totalSlides.desktop)
  }

  const prevSlide = () => {
    if (isAnimating || !partners) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + totalSlides.desktop) % totalSlides.desktop)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [currentSlide])

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && totalSlides.desktop > 1) {
        nextSlide()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isAnimating, totalSlides.desktop])

  const createRows = (partnersList: typeof partners) => {
    if (!partnersList) return []
    const rows = []
    for (let i = 0; i < rowsToShow; i++) {
      const rowPartners = partnersList.slice(
        i * partnersPerRow.desktop,
        (i + 1) * partnersPerRow.desktop,
      )
      if (rowPartners.length > 0) {
        rows.push(rowPartners)
      }
    }
    return rows
  }

  return (
    <section className="w-full py-16 lg:py-24 bg-white">
      {/* Header inside container */}
      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between mb-12 lg:mb-16">
          <h2 className="space-grotesk-light text-4xl md:text-5xl lg:text-6xl leading-[120%] tracking-tighter text-dark-100">
            {title}
          </h2>

          {totalSlides.desktop > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                className="p-3 rounded-full border-2 border-gray-200 hover:border-primary-700 hover:bg-primary-700 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                disabled={isAnimating}
                className="p-3 rounded-full bg-dark-100 text-white hover:bg-primary-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Full width partners slider */}
      <div className="relative overflow-hidden w-full">
        <div
          ref={containerRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            width: `${totalSlides.desktop * 100}%`,
          }}
        >
          {Array.from({ length: totalSlides.desktop }).map((_, slideIndex) => {
            const slideStartIndex = slideIndex * partnersPerSlide.desktop
            const slidePartners =
              partners?.slice(slideStartIndex, slideStartIndex + partnersPerSlide.desktop) || []
            const rows = createRows(slidePartners)

            return (
              <div
                key={slideIndex}
                className="w-full flex-shrink-0"
                style={{ width: `${100 / totalSlides.desktop}%` }}
              >
                <div className="space-y-0">
                  {rows.map((rowPartners, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-3 lg:grid-cols-6 gap-0">
                      {rowPartners.map((partner, partnerIndex) => {
                        const logoUrl =
                          partner.logo &&
                          typeof partner.logo === 'object' &&
                          'url' in partner.logo &&
                          partner.logo.url
                            ? partner.logo.url
                            : ''
                        const logoAlt =
                          partner.logo &&
                          typeof partner.logo === 'object' &&
                          'alt' in partner.logo &&
                          partner.logo.alt
                            ? partner.logo.alt
                            : partner.name || 'Partner logo'

                        return (
                          <div
                            key={`${slideIndex}-${rowIndex}-${partnerIndex}`}
                            className="group relative border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
                          >
                            <div className="aspect-square bg-white p-6 lg:p-8 flex items-center justify-center">
                              {logoUrl ? (
                                <img
                                  src={logoUrl}
                                  alt={logoAlt}
                                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                />
                              ) : (
                                <div className="text-gray-400 text-center">
                                  <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="text-lg lg:text-2xl font-bold">
                                      {partner.name?.charAt(0) || '?'}
                                    </span>
                                  </div>
                                  <p className="text-xs lg:text-sm font-medium truncate px-2">
                                    {partner.name}
                                  </p>
                                </div>
                              )}
                            </div>

                            {partner.name && logoUrl && (
                              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-dark-100 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                                {partner.name}
                              </div>
                            )}
                          </div>
                        )
                      })}

                      {/* Fill empty slots desktop */}
                      {Array.from({
                        length: partnersPerRow.desktop - rowPartners.length,
                      }).map((_, emptyIndex) => (
                        <div
                          key={`empty-${slideIndex}-${rowIndex}-${emptyIndex}`}
                          className="aspect-square bg-gray-50 border border-gray-200 hidden lg:block"
                        />
                      ))}

                      {/* Fill empty slots mobile */}
                      {Array.from({
                        length:
                          partnersPerRow.mobile -
                          (rowPartners.length % partnersPerRow.mobile === 0
                            ? partnersPerRow.mobile
                            : rowPartners.length % partnersPerRow.mobile),
                      }).map((_, emptyIndex) => (
                        <div
                          key={`mobile-empty-${slideIndex}-${rowIndex}-${emptyIndex}`}
                          className="aspect-square bg-gray-50 border border-gray-200 lg:hidden"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Slide Indicators */}
      {totalSlides.desktop > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalSlides.desktop }).map((_, index) => (
            <button
              key={index}
              onClick={() => !isAnimating && setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-primary-700 w-8' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
