// src/blocks/Stats.ts
import type { Block } from 'payload'

export const Stats: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  fields: [
    {
      name: 'marqueeText',
      type: 'text',
      admin: {
        description: 'Text that will scroll horizontally in the marquee section (optional)'
      }
    },
    // {
    //   name: 'statsTitle',
    //   type: 'text',
    //   admin: {
    //     description: 'Main title for the stats section (e.g., "Numbers That Tell Our Story")'
    //   }
    // },
    // {
    //   name: 'statsDescription',
    //   type: 'textarea',
    //   admin: {
    //     description: 'Description text that appears below the title and above the stats'
    //   }
    // },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'light',
      options: [
        {
          label: 'Light',
          value: 'light'
        },
        {
          label: 'Dark',
          value: 'dark'
        },
        {
          label: 'Gradient',
          value: 'gradient'
        }
      ],
      admin: {
        description: 'Background style for the entire stats section'
      }
    },
    {
      name: 'primaryStats',
      type: 'array',
      maxRows: 2,
      admin: {
        description: 'Large primary statistics (like revenue figures) - maximum 2 items'
      },
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          admin: {
            description: 'The large statistic number (e.g., "LKR 150+ Million", "LKR 3+ Billion")'
          }
        },
        {
          name: 'label',
          type: 'text',
          admin: {
            description: 'Label for this primary statistic (optional, used internally)'
          }
        },
        {
          name: 'description',
          type: 'text',
          admin: {
            description: 'Description text below the number (e.g., "Direct Income to the Government")'
          }
        }
      ]
    },
    {
      name: 'secondaryStats',
      type: 'array',
      maxRows: 8,
      admin: {
        description: 'Smaller secondary statistics with icons - displays in grid format'
      },
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          admin: {
            description: 'The statistic number (e.g., "2500+", "10+", "25+", "1000+")'
          }
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Label for this statistic (e.g., "Tech Experts", "Corporates", "Startups")'
          }
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Icon image for this statistic (optional)'
          }
        }
      ]
    },
    {
      name: 'disableInnerContainer',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Disable the inner container constraints for full-width layout'
      }
    }
  ]
}