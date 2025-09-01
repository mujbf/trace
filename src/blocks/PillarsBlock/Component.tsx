// src/blocks/PillarsBlock/Component.tsx
'use client'
import React from 'react'
import { SubHeading2 } from '@/components/Text/typography'
import { SecondaryButton } from '@/components/Button/button'

// Interface for PillarsBlock
interface PillarsBlockType {
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

export const PillarsBlock: React.FC<PillarsBlockType> = ({ cardsDescription, cards }) => {
  // Don't render if no cards are provided
  if (!cards || cards.length === 0) {
    return null
  }

  return (
    <section className="w-full py-16 md:py-24">
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
    </section>
  )
}
