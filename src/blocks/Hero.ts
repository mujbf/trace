// src/blocks/Hero.ts
import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  fields: [
    {
      name: 'primaryTitle',
      type: 'text',
      admin: {
        description: 'Part of the title that will appear in primary color (e.g., "Technologically Re-Awakening")'
      }
    },
    // {
    //   name: 'secondaryTitle',
    //   type: 'text',
    //   admin: {
    //     description: 'Part of the title that will appear in regular color (e.g., "Culture of Excellence")'
    //   }
    // },
    {
      name: 'bodyText',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Body text that will appear in the right column with border'
      }
    },
    {
      name: 'heroImg',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Hero image that will be displayed below the content section'
      }
    },
    {
      name: 'marqueeText',
      type: 'text',
      required: true,
      admin: {
        description: 'Text that will scroll horizontally in the marquee section'
      }
    },
    {
      name: 'cardsDescription',
      type: 'textarea',
      admin: {
        description: 'Description text that appears above the cards grid'
      }
    },
    {
      name: 'cards',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 10,
      admin: {
        description: 'Cards that will be displayed in the grid below the marquee'
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Title for this card'
          }
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Image for this card'
          }
        },
        {
          name: 'link',
          type: 'text',
          admin: {
            description: 'URL or path for the "Learn More" link (optional)'
          }
        }
      ]
    }
  ]
}