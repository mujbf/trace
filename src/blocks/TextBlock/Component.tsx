// src/blocks/TextBlock/Component.tsx
'use client'
import React from 'react'
import RichText from '@/components/RichText'
import { Title } from '@/components/Text/typography'

// Interface for TextBlock
interface TextBlockType {
  title?: string
  bodyText?: any // Rich text content
  disableInnerContainer?: boolean
}

export const TextBlock: React.FC<TextBlockType> = ({ title, bodyText, disableInnerContainer }) => {
  return (
    <section className="w-screen py-16 md:py-32">
      {/* Content Section - Title and Body Text stacked vertically, centered */}
      <div className="max-w-8xl mx-auto px-4 md:px-20">
        <div className="flex flex-col items-center">
          <div className="w-full lg:w-2/3 flex flex-col gap-6 md:gap-8">
            {/* Title */}
            {title && (
              <div className="">
                <Title>{title}</Title>
              </div>
            )}

            {/* Body Text */}
            {bodyText && (
              <div className="relative">
                <div className="w-full pl-0 md:pl-8">
                  <div className="manrope-light text-base md:text-lg leading-[150%] text-dark-80 prose w-full">
                    <RichText data={bodyText} enableProse className="w-full" />
                  </div>
                </div>
                {/* Single continuous border with fade */}
                {/* <div
                  className="absolute left-0 top-0 w-[2px] hidden md:block"
                  style={{
                    height: '100%',
                    background:
                      'linear-gradient(to bottom, transparent 0%, #b1b1b1ff 60%, #696969ff 100%)',
                  }}
                /> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
