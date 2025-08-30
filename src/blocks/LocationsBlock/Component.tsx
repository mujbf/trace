'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronDown, ArrowRight } from 'lucide-react'
import type { LocationsBlock as LocationsBlockType } from '@/payload-types'
import { Title, SubHeading, SubHeading2, Body } from '@/components/Text/typography'

// ScrollMarquee Component (imported from HeroBlock)
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

export const LocationsBlockComponent: React.FC<LocationsBlockType> = ({
  mainTitle,
  locations,
  mapImage,
}) => {
  const [activeLocation, setActiveLocation] = useState(0)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  // Grid-based positioning system for Sri Lanka map (15x15 grid)
  // Users can specify grid positions (row, column) for precise placement
  const getGridPosition = (gridRow: number, gridCol: number) => {
    const rowPercent = (gridRow / 15) * 100
    const colPercent = (gridCol / 15) * 100
    return { top: `${rowPercent}%`, left: `${colPercent}%` }
  }

  // Default grid positions for common Sri Lankan cities
  const defaultGridPositions = [
    { row: 4, col: 7 }, // Colombo area
    { row: 5, col: 6 }, // Colombo suburbs
    { row: 3, col: 8 }, // Colombo 02
    { row: 2, col: 9 }, // Jaffna area
    { row: 6, col: 8 }, // Kalutara/Panadura area
    { row: 3, col: 10 }, // Kandy area
    { row: 7, col: 9 }, // Galle area
    { row: 8, col: 8 }, // Matara area
    { row: 6, col: 10 }, // Nuwara Eliya area
    { row: 5, col: 11 }, // Badulla area
    { row: 4, col: 12 }, // Batticaloa area
    { row: 2, col: 11 }, // Trincomalee area
    { row: 4, col: 9 }, // Kurunegala area
    { row: 5, col: 9 }, // Kegalle area
    { row: 6, col: 7 }, // Ratnapura area
  ]

  const getMapPosition = (index: number) => {
    if (locations && locations[index]?.coordinates) {
      // If custom grid coordinates are provided, use them
      const coords = locations[index].coordinates
      if (coords && typeof coords === 'object' && 'gridRow' in coords && 'gridCol' in coords) {
        const gridRow = coords.gridRow
        const gridCol = coords.gridCol
        if (
          typeof gridRow === 'number' &&
          typeof gridCol === 'number' &&
          gridRow > 0 &&
          gridCol > 0
        ) {
          return getGridPosition(gridRow, gridCol)
        }
      }
    }

    // Fall back to default positions
    const position = defaultGridPositions[index % defaultGridPositions.length]
    return getGridPosition(position.row, position.col)
  }

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index)
    setActiveLocation(index)
  }

  const handleMapClick = (index: number) => {
    setActiveLocation(index)
    setExpandedCard(index)
  }

  return (
    <section className="w-screen tertiary-gradient relative overflow-hidden py-5 md:py-10">
      {/* Background decorative elements - similar to hero */}
      {/* <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-300/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 left-1/4 w-20 h-20 bg-primary-400/40 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-primary-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-dark-100/10 rounded-full"></div>
        <div className="absolute bottom-40 left-32 w-12 h-12 bg-dark-100/15 rounded-full"></div>
        <div className="absolute top-32 left-40 w-8 h-8 bg-dark-100/20 rounded-full"></div>
      </div> */}

      {/* Marquee Title */}

      <ScrollMarquee
        text={mainTitle}
        textClassName="text-dark-20"
        padding="mb-5 md:mb-10"
        fadeEdges={false}
        duration={40}
      />

      <div className="relative z-20 pb-16 px-4 md:px-8 lg:px-20">
        <div className="max-w-8xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Left Side - Custom Map Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative w-full max-w-2xl mx-auto">
                {/* Map Image Container */}
                <div className="relative w-full aspect-square">
                  {mapImage && (
                    <img
                      src={
                        typeof mapImage === 'object' && 'url' in mapImage && mapImage.url
                          ? mapImage.url
                          : typeof mapImage === 'string'
                            ? mapImage
                            : ''
                      }
                      alt={
                        typeof mapImage === 'object' && 'alt' in mapImage && mapImage.alt
                          ? mapImage.alt
                          : 'Sri Lanka Map'
                      }
                      className="w-full h-full object-contain opacity-50"
                    />
                  )}

                  {/* Location markers positioned absolutely */}
                  <div className="absolute inset-0">
                    {locations &&
                      locations.map((location, index) => {
                        const position = getMapPosition(index)

                        return (
                          <button
                            key={index}
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 ${
                              activeLocation === index
                                ? 'w-4 h-4 md:w-6 md:h-6'
                                : 'w-3 h-3 md:w-4 md:h-4'
                            }`}
                            style={{
                              top: position.top,
                              left: position.left,
                            }}
                            onClick={() => handleMapClick(index)}
                          >
                            <div
                              className={`w-full h-full rounded-full transition-all duration-300 ${
                                activeLocation === index
                                  ? 'bg-red-600 shadow-lg'
                                  : 'bg-dark-100 shadow-md'
                              }`}
                            />
                            {/* Location name tooltip */}
                            <div
                              className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-dark-100 text-white text-xs rounded whitespace-nowrap transition-all duration-300 ${
                                activeLocation === index ? 'opacity-100' : 'opacity-0'
                              }`}
                            >
                              {location.locationName}
                            </div>
                          </button>
                        )
                      })}
                  </div>
                </div>

                {/* Map Legend/Instructions */}
                {/* <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-lg md:rounded-[16px] p-4 md:p-6">
                  <h4 className="space-grotesk-medium text-lg md:text-xl text-dark-100 mb-2">
                    Interactive Map
                  </h4>
                  <p className="manrope-light text-sm md:text-base text-dark-60 leading-[150%]">
                    Click on the markers to explore our locations across Sri Lanka
                  </p>
                </div> */}
              </div>
            </div>

            {/* Right Side - Location Cards */}
            <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
              {locations &&
                locations.map((location, index) => (
                  <div
                    key={index}
                    className={`bg-white/24  backdrop-blur-sm rounded-sm shadow-lg transition-all duration-300 overflow-hidden ${
                      activeLocation === index
                        ? 'border-l-4 border-tertiary-600 shadow-xl bg-white'
                        : ''
                    }`}
                  >
                    <button
                      onClick={() => toggleCard(index)}
                      className="w-full p-4 md:p-6 text-left flex items-center justify-between hover:bg-white/50 transition-colors duration-300"
                    >
                      <div className="flex-1">
                        <SubHeading2>{location.locationName}</SubHeading2>
                        {/* {location.locationAddress && (
                          <p className="manrope-light text-base md:text-lg text-dark-80 leading-[150%] mt-1">
                            {location.locationAddress}
                          </p>
                        )} */}
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 md:w-6 md:h-6 text-dark-60 transition-transform duration-300 ${
                          expandedCard === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Expanded Content */}
                    <div
                      className={`transition-all duration-300 overflow-hidden bg-white ${
                        expandedCard === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-200/50">
                        <div className="flex flex-col md:flex-row gap-4 pt-4">
                          <div className="flex-1">
                            {location.locationDescription && (
                              <p className="manrope-light text-base000 text-dark-80 leading-[150%] mb-4">
                                {location.locationDescription}
                              </p>
                            )}
                            {location.buttonText && location.buttonLink && (
                              <a
                                href={location.buttonLink}
                                className="group relative w-fit flex items-center gap-2 manrope-medium text-sm md:text-base text-dark-80 transition-all duration-300 ease-out hover:text-primary-800 hover:gap-3"
                              >
                                <span className="relative overflow-hidden">
                                  {location.buttonText}
                                  <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-600 to-primary-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-full"></div>
                                </span>

                                <div className="relative overflow-hidden">
                                  <ArrowRight className="w-4 h-4 transform transition-transform duration-300 ease-out group-hover:translate-x-1" />
                                </div>
                              </a>
                            )}
                          </div>
                          {location.locationImage && (
                            <div className="md:w-1/3">
                              <img
                                src={
                                  typeof location.locationImage === 'object' &&
                                  'url' in location.locationImage
                                    ? location.locationImage.url || ''
                                    : ''
                                }
                                alt={location.locationName}
                                className="w-full h-32 md:h-24 lg:h-32 object-cover rounded-lg md:rounded-[8px]"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
