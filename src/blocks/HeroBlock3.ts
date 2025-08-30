// src/blocks/Hero3.ts
import type { Block } from 'payload'

export const HeroBlock3: Block = {
  slug: 'heroBlock3',
  interfaceName: 'HeroBlock3',
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
      type: 'textarea',
      required: true,
      admin: {
        description: 'Body text that will appear below the title. Use line breaks to create paragraphs.'
      }
    },
    {
      name: 'buttonText',
      type: 'text',
      required: false,
      admin: {
        description: 'Text for the call-to-action button'
      }
    },
    {
      name: 'buttonLink',
      type: 'text',
      required: false,
      admin: {
        description: 'URL or path for the button link'
      }
    },
    {
      name: 'pillars',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      admin: {
        description: 'Pillar categories that will appear as tabs on the left, each containing related cards'
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Title for this pillar category (will appear as a tab)'
          }
        },
        {
          name: 'cards',
          type: 'array',
          minRows: 1,
          maxRows: 20,
          admin: {
            description: 'Cards that will be displayed when this pillar tab is active'
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
              name: 'description',
              type: 'textarea',
              required: false,
              admin: {
                description: 'Optional description text for this card. Use line breaks to create paragraphs.'
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
              required: false,
              admin: {
                description: 'Optional link URL for the "Learn More" button'
              }
            }
          ]
        }
      ]
    },
    {
      name: 'disableInnerContainer',
      type: 'checkbox',
      required: false,
      admin: {
        description: 'Disable inner container constraints for full-width content'
      }
    }
  ]
}