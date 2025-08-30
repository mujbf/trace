// src/blocks/Hero3Block/Component.tsx
'use client'
import React, { useState } from 'react'
import type { HeroBlock as HeroBlockType } from '@/payload-types'
import { Title, SubHeading, SubHeading2, Body } from '@/components/Text/typography'
import { PrimaryButton, SecondaryButton } from '@/components/Button/button'

// Interface for Hero3 block
interface Hero3BlockType {
  primaryTitle?: string
  bodyText?: string
  buttonText?: string
  buttonLink?: string
  pillars?: Array<{
    title: string
    cards: Array<{
      title: string
      description?: string
      image:
        | {
            url?: string
            alt?: string
          }
        | string
      link?: string
    }>
  }>
  disableInnerContainer?: boolean
}

// Card Component for pillars
interface PillarCardData {
  title: string
  description?: string
  image:
    | {
        url?: string
        alt?: string
      }
    | string
  link?: string
}

// Helper function to render text with line breaks as paragraphs
const renderTextWithParagraphs = (text: string, className: string = '') => {
  return text
    .split('\n')
    .map((paragraph, index) =>
      paragraph.trim() ? (
        <p key={index} className={className}>
          {paragraph}
        </p>
      ) : null,
    )
    .filter(Boolean)
}

const PillarCard: React.FC<{ card: PillarCardData }> = ({ card }) => {
  const imageUrl = typeof card.image === 'object' && card.image.url ? card.image.url : ''
  const imageAlt = typeof card.image === 'object' && card.image.alt ? card.image.alt : card.title

  return (
    <div className="hover:bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group border-l-2 border-tertiary-500">
      <div className="aspect-[2/1] overflow-hidden">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-r-[16px]"
          />
        )}
      </div>
      <div className="p-6 flex flex-col gap-4 justify-between">
        <div>
          <SubHeading2>{card.title}</SubHeading2>
          {card.description && (
            <div className="mt-2 space-y-2">
              {renderTextWithParagraphs(
                card.description,
                'manrope-light text-base md:text-lg text-dark-80 leading-[150%]',
              )}
            </div>
          )}
        </div>
        {card.link && (
          <a href={card.link} className="">
            <SecondaryButton>Learn More</SecondaryButton>
          </a>
        )}
      </div>
    </div>
  )
}

export const Hero3Block: React.FC<Hero3BlockType> = ({
  primaryTitle,
  bodyText,
  buttonText,
  buttonLink,
  pillars,
  disableInnerContainer,
}) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="w-screen min-h-screen tertiary-gradient mt-[-152px] flex flex-col gap-6 md:gap-16 pt-[152px] md:pt-[152px] pb-[72px]">
      {/* Content Section */}

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 w-full px-4 md:px-20 mt-[88px] md:mt-[152px]">
        {/* Title Column */}
        <div className="w-full lg:w-2/3">
          <Title>{primaryTitle}</Title>
        </div>

        {/* Body Text and Button Column */}
        <div className="w-full lg:w-full py-4 lg:py-8 border-l-0 lg:border-l border-t lg:border-t-0 border-[#E8E8E8/20] flex flex-col items-start pl-0 lg:pl-8 pt-4 lg:pt-0 gap-6">
          {bodyText && (
            <div className="manrope-light text-base md:text-lg leading-[150%] text-left lg:text-left text-dark-80 space-y-4">
              {renderTextWithParagraphs(bodyText)}
            </div>
          )}

          {buttonText && buttonLink && (
            <a href={buttonLink} className="">
              <PrimaryButton>{buttonText}</PrimaryButton>
            </a>
          )}
        </div>
      </div>

      {/* Pillars Section */}
      {pillars && pillars.length > 0 && (
        <div className="max-w-8xl mx-auto px-4 md:px-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Tabs/Navigation Column */}
            <div className="w-full lg:w-2/5">
              <nav className="space-y-2">
                {pillars.map((pillar, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 border-l-2 ${
                      activeTab === index
                        ? 'bg-white shadow-md border-tertiary-500 text-dark-100'
                        : 'bg-transparent border-transparent text-dark-60 hover:bg-white/50 hover:text-dark-80'
                    }`}
                  >
                    <SubHeading2>{pillar.title}</SubHeading2>
                  </button>
                ))}
              </nav>
            </div>

            {/* Cards Column */}
            <div className="w-full lg:w-3/5">
              {pillars[activeTab] && pillars[activeTab].cards && (
                <div className="grid grid-cols-1 gap-6">
                  {pillars[activeTab].cards.map((card, index) => (
                    <PillarCard key={index} card={card} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
