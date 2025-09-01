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
      name: 'button',
      type: 'group',
      admin: {
        description: 'Optional button that appears below the body text'
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          admin: {
            description: 'Button text'
          }
        },
        {
          name: 'link',
          type: 'text',
          admin: {
            description: 'Button URL or path'
          }
        },
        {
          name: 'type',
          type: 'select',
          defaultValue: 'primary',
          options: [
            {
              label: 'Primary Button',
              value: 'primary'
            },
            {
              label: 'Secondary Button',
              value: 'secondary'
            }
          ],
          admin: {
            description: 'Button style type'
          }
        }
      ]
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
      name: 'heroImageFullWidth',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Check to make hero image full viewport width, uncheck to keep it within container width'
      }
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'primary-gradient',
      options: [
        {
          label: 'Primary Gradient',
          value: 'primary-gradient'
        },
        {
          label: 'Secondary Gradient',
          value: 'secondary-gradient'
        },
        {
          label: 'Yellow Gradient',
          value: 'yellow-gradient'
        }
      ],
      admin: {
        description: 'Background color/gradient for the hero section'
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