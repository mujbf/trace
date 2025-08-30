import type { Block } from 'payload'

export const LocationsBlock: Block = {
  slug: 'locationsBlock',
  interfaceName: 'LocationsBlock',
  fields: [
    {
      name: 'mainTitle',
      type: 'text',
      required: true,
      defaultValue: 'Our locations',
      admin: {
        description: 'Main marquee title text'
      }
    },
    {
      name: 'mapImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Custom map image (e.g., Sri Lanka map) - locations will be positioned on this image'
      }
    },
    {
      name: 'locations',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 15,
      admin: {
        description: 'List of locations to display'
      },
      fields: [
        {
          name: 'locationName',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the location (e.g., "TRACE Expert City Colombo 10")'
          }
        },
        // {
        //   name: 'locationAddress',
        //   type: 'text',
        //   admin: {
        //     description: 'Address or brief location description'
        //   }
        // },
        {
          name: 'locationDescription',
          type: 'textarea',
          admin: {
            description: 'Detailed description of the location (shown when expanded)'
          }
        },
        {
          name: 'locationImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Image of the location (shown when expanded)'
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
        },
        {
          name: 'coordinates',
          type: 'group',
          admin: {
            description: 'Map positioning - Use grid system (1-15 for both row and column). Leave empty to use default positions.',
          },
          fields: [
            {
              name: 'gridRow',
              type: 'number',
              min: 1,
              max: 15,
              admin: {
                description: 'Grid row position (1-15, top to bottom). 1=North, 15=South',
                step: 1
              }
            },
            {
              name: 'gridCol',
              type: 'number',
              min: 1,
              max: 15,
              admin: {
                description: 'Grid column position (1-15, left to right). 1=West, 15=East',
                step: 1
              }
            },
            {
              name: 'latitude',
              type: 'number',
              admin: {
                description: 'Actual latitude coordinate (for reference only - not used for positioning)'
              }
            },
            {
              name: 'longitude',
              type: 'number',
              admin: {
                description: 'Actual longitude coordinate (for reference only - not used for positioning)'
              }
            }
          ]
        }
      ]
    }
  ]
}