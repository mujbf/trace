'use client'

import React from 'react'
import { ChevronRight, ArrowRight } from 'lucide-react'
import type { EcosystemBlock as EcosystemBlockType } from '@/payload-types'

export const EcosystemBlockComponent: React.FC<EcosystemBlockType> = ({
  titlePrefix,
  titleHighlight,
  ecosystemItems,
}) => {
  return (
    <section className="w-full py-5 md:py-10 bg-white-100">
      <div className="max-w-8xl mx-auto">
        {/* Main Title */}
        <div className="text-center mb-4 md:mb-10">
          <h2 className="space-grotesk-light text-4xl md:text-5xl lg:text-6xl leading-[120%] tracking-tighter text-dark-100">
            {titlePrefix} <span className="text-darkBlue-100">{titleHighlight}</span>
          </h2>
        </div>

        {/* Ecosystem Timeline - Desktop / Grid - Mobile */}
        <div>
          {/* Mobile Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-8">
            {ecosystemItems &&
              ecosystemItems.map((item, index) => {
                const isEven = index % 2 === 0
                const imageUrl =
                  item.image &&
                  typeof item.image === 'object' &&
                  'url' in item.image &&
                  item.image.url
                    ? item.image.url
                    : ''
                const imageAlt =
                  item.image &&
                  typeof item.image === 'object' &&
                  'alt' in item.image &&
                  item.image.alt
                    ? item.image.alt
                    : item.title || 'Ecosystem item'

                return (
                  <div
                    key={index}
                    className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-start px-4`}
                  >
                    {/* Image */}
                    <div className="w-full flex-shrink-0">
                      {imageUrl && (
                        <div className="aspect-[160/260] rounded-xl overflow-hidden shadow-lg">
                          <img
                            src={imageUrl}
                            alt={imageAlt}
                            className="w-full h-full object-cover"
                            width={160}
                            height={260}
                          />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      <h3 className="manrope-semibold text-lg md:text-xl leading-[150%] text-dark-100">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="manrope-light text-base md:text-lg text-dark-80 leading-[150%]">
                          {item.description}
                        </p>
                      )}

                      {item.buttonText && item.buttonLink && (
                        <a href={item.buttonLink}>
                          <button className="group relative w-fit flex items-center gap-2 manrope-medium text-base text-dark-80 transition-all duration-300 ease-out hover:text-primary-800 hover:gap-3">
                            <span className="relative overflow-hidden">
                              {item.buttonText}
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
                          </button>
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
          </div>

          {/* Desktop Timeline Layout */}
          <div className="hidden lg:block relative max-w-7xl mx-auto mb-5 md:mb-10">
            {ecosystemItems && ecosystemItems.length > 0 && (
              <>
                {/* Central timeline line - FIXED: Now stops at the last card */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 top-0 w-1 bg-[#ECECEC]"
                  style={{
                    height: `${Math.floor((ecosystemItems.length - 1) / 2) * 350 + 120 + 152}px`,
                  }}
                ></div>

                {ecosystemItems.map((item, index) => {
                  const isLeft = index % 2 === 0
                  // POSITIONING LOGIC - This is where card spacing is controlled:
                  const baseSpacing = Math.floor(index / 2) * 350 // Increased from 200px to 300px for more vertical space
                  const sideOffset = (index % 2) * 120 // Right-side cards offset by 120px down

                  const imageUrl =
                    item.image &&
                    typeof item.image === 'object' &&
                    'url' in item.image &&
                    item.image.url
                      ? item.image.url
                      : ''
                  const imageAlt =
                    item.image &&
                    typeof item.image === 'object' &&
                    'alt' in item.image &&
                    item.image.alt
                      ? item.image.alt
                      : item.title || 'Ecosystem item'

                  return (
                    <div
                      key={index}
                      className={`absolute w-full flex items-start ${
                        isLeft ? 'justify-start' : 'justify-end'
                      }`}
                      style={{ top: `${baseSpacing + sideOffset}px` }}
                    >
                      {/* Horizontal connector line - FIXED: Lines now go to the center of cards */}
                      <div
                        className={`absolute w-16 h-1 bg-[#ECECEC] z-0 ${
                          isLeft
                            ? 'right-1/2 mr-0.5' // Left cards get lines extending LEFT from center
                            : 'left-1/2 ml-0.5' // Right cards get lines extending RIGHT from center
                        }`}
                        style={{ top: '150px' }} // FIXED: Positioned to align with card center
                      ></div>

                      {/* Timeline dot at end of connector line - FIXED: Dots now aligned with card center */}
                      <div
                        className={`absolute w-3 h-3 bg-[#ECECEC] rounded-full border-2 border-gray-50 z-10 transform -translate-y-1/2 ${
                          isLeft
                            ? 'right-1/2 mr-16' // Left cards get dots on the LEFT side
                            : 'left-1/2 ml-16' // Right cards get dots on the RIGHT side
                        }`}
                        style={{ top: '152px' }} // FIXED: Positioned to align with card center
                      ></div>

                      {/* Card container - CARD WIDTH CONTROL: Adjust these classes to change card width */}
                      <div
                        className={`${isLeft ? 'pr-20' : 'pl-20'} ${
                          // CARD WIDTH SETTINGS - Change these to adjust card width across screen sizes:
                          'w-full md:w-1/2' // Current: 41.67% on lg, 40% on xl, 41.67% on 2xl, 40% on 2xl+
                          // Alternative options:
                          // 'w-1/2 lg:w-5/12 xl:w-2/5 2xl:w-1/3'     // Wider cards: 50%, 41.67%, 40%, 33.33%
                          // 'w-5/12 lg:w-1/3 xl:w-2/5 2xl:w-5/12'    // Narrower cards: 41.67%, 33.33%, 40%, 41.67%
                          // 'w-2/5'                                   // Fixed 40% on all screens
                        }`}
                      >
                        <div className="bg-white rounded-2xl p-6 xl:p-8 hover:shadow-md transition-all duration-300 relative z-10">
                          <div className={`flex gap-6 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                            {/* Image */}
                            {imageUrl && (
                              <div className="flex-shrink-0">
                                <div className="w-full h-full rounded-xl overflow-hidden">
                                  <img
                                    src={imageUrl}
                                    alt={imageAlt}
                                    className="max-w-40 h-full object-cover aspect-[160/260]"
                                  />
                                </div>
                              </div>
                            )}

                            {/* Content */}
                            <div className="flex flex-col justify-between">
                              <div className="flex flex-col gap-2 md:gap-4">
                                <h3 className="manrope-semibold text-lg md:text-xl leading-[150%] text-dark-100">
                                  {item.title}
                                </h3>
                                {item.description && (
                                  <p className="manrope-light text-base leading-[150%] text-dark-80">
                                    {item.description}
                                  </p>
                                )}
                              </div>

                              {item.buttonText && item.buttonLink && (
                                <a href={item.buttonLink}>
                                  <button className="group relative w-fit flex items-center gap-2 manrope-medium text-base text-dark-80 transition-all duration-300 ease-out hover:text-primary-800 hover:gap-3">
                                    <span className="relative overflow-hidden">
                                      {item.buttonText}
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
                                  </button>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* Add padding at bottom to accommodate staggered layout */}
                <div
                  style={{
                    paddingBottom: `${Math.ceil((ecosystemItems?.length || 0) / 2) * 300 + 200}px`,
                  }}
                ></div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
