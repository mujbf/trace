import React from 'react'
import { ArrowRight } from 'lucide-react'
import { ChevronRight } from 'lucide-react'

interface CardData {
  id: number
  title: string
  image: string
  link: string
}

const cardData: CardData[] = [
  {
    id: 1,
    title: 'Accelerators & Incubators',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop&auto=format',
    link: '#',
  },
  {
    id: 2,
    title: 'Education & Talent Management',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop&auto=format',
    link: '#',
  },
  {
    id: 3,
    title: 'Industry & Business Transformation',
    image:
      'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=250&fit=crop&auto=format',
    link: '#',
  },
  {
    id: 4,
    title: 'Design & Creativity Center',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop&auto=format',
    link: '#',
  },
  {
    id: 5,
    title: 'Community Hub',
    image:
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop&auto=format',
    link: '#',
  },
]

const Card: React.FC<{ card: CardData }> = ({ card }) => {
  return (
    <div className="hover:bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group border-l-2 border-primary-600">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-r-[16px]"
        />
      </div>
      <div className="p-6 flex flex-col gap-10 justify-between">
        <h3 className="manrope-semibold text-2xl leading-[150%]">{card.title}</h3>
        <button className="group relative w-fit flex items-center gap-2 manrope-medium text-base text-dark-80 transition-all duration-300 ease-out hover:text-primary-800 hover:gap-3">
          <span className="relative overflow-hidden">
            Learn More
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
      </div>
    </div>
  )
}

const TraceCardsGrid: React.FC = () => {
  return (
    <div className="py-16">
      <div className="max-w-8xl mx-auto px-4 md:px-20">
        {/* Header Section */}
        <div className="flex justify-center gap-12 mb-12">
          <p className="manrope-light text-lg leading-[150%] text-dark-80 text-center max-w-4xl">
            TRACE empowers Sri Lankan businesses through comprehensive tech solutions, innovation
            support, and strategic guidance for sustainable growth and digital transformation.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {cardData.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TraceCardsGrid
