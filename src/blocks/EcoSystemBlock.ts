import type { Block } from 'payload'

export const EcosystemBlock: Block = {
  slug: 'ecosystemBlock',
  interfaceName: 'EcosystemBlock',
  fields: [
    {
      name: 'titlePrefix',
      type: 'text',
      required: true,
      defaultValue: 'At the epicentre of a',
      admin: {
        description: 'First part of the title (before the highlighted text)'
      }
    },
    {
      name: 'titleHighlight',
      type: 'text',
      required: true,
      defaultValue: 'vibrant ecosystem',
      admin: {
        description: 'Highlighted part of the title (will be styled in primary color)'
      }
    },
    {
      name: 'ecosystemItems',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 10,
      admin: {
        description: 'Items in the ecosystem grid'
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Title of the ecosystem item (e.g., "Policymaking", "Private Sector Businesses")'
          }
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Description of the ecosystem item'
          }
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Image representing this ecosystem item'
          }
        },
        {
          name: 'buttonText',
          type: 'text',
          admin: {
            description: 'Text for the action button (e.g., "Learn More")'
          }
        },
        {
          name: 'buttonLink',
          type: 'text',
          admin: {
            description: 'URL or path for the action button',
            condition: (data, siblingData) => siblingData.buttonText
          }
        }
      ]
    }
  ]
}