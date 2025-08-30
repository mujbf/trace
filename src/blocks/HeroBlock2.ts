// src/blocks/Hero2.ts
import type { Block } from 'payload'

export const HeroBlock2: Block = {
  slug: 'heroBlock2',
  interfaceName: 'HeroBlock2',
  fields: [
    {
      name: 'primaryTitle',
      type: 'text',
      required: true,
      admin: {
        description: 'Main title that will appear in primary color'
      }
    },
    {
      name: 'bodyText',
      type: 'richText',
      required: true,
      admin: {
        description: 'Body text that will appear below the title'
      }
    },
    {
      name: 'heroImg',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Hero image that will be displayed full width below the content section'
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
      name: 'contentCardsDescription',
      type: 'richText',
      admin: {
        description: 'Description text that appears above the content cards (always visible)'
      }
    },
    {
      name: 'contentCards',
      type: 'array',
      minRows: 0,
      maxRows: 2,
      admin: {
        description: 'Optional content cards with sub headings and body text (up to 2 cards)'
      },
      fields: [
        {
          name: 'subHeading',
          type: 'text',
          required: true,
          admin: {
            description: 'Sub heading for this content card'
          }
        },
        {
          name: 'bodyText',
          type: 'richText',
          required: true,
          admin: {
            description: 'Body text for this content card'
          }
        }
      ]
    }
  ]
}