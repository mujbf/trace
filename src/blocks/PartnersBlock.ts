import type { Block } from 'payload'

export const PartnersBlock: Block = {
  slug: 'partnersBlock',
  interfaceName: 'PartnersBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Our key partners',
      admin: {
        description: 'Main title for the partners section'
      }
    },
    {
      name: 'rowsToShow',
      type: 'number',
      defaultValue: 1,
      min: 1,
      max: 10,
      admin: {
        description: 'Number of rows to display (6 logos per row on desktop, 3 on mobile)'
      }
    },
    {
      name: 'partners',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'List of partner organizations'
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the partner organization'
          }
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Partner logo image (preferably square format)'
          }
        },
        {
          name: 'website',
          type: 'text',
          admin: {
            description: 'Partner website URL (optional, for future use)'
          }
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Brief description of the partnership (optional, for future use)'
          }
        }
      ]
    }
  ]
}