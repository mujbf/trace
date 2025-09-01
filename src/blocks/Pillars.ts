// src/blocks/PillarsBlock.ts
import type { Block } from 'payload'

export const PillarsBlock: Block = {
  slug: 'pillarsBlock',
  interfaceName: 'PillarsBlock',
  fields: [
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
        description: 'Cards that will be displayed in the grid'
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