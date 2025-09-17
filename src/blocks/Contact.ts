import type { Block } from 'payload'

export const ContactBlock: Block = {
  slug: 'contactBlock',
  interfaceName: 'ContactBlock',
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Background image for the contact section'
      }
    },
    {
      name: 'mainTitle',
      type: 'text',
      required: true,
      defaultValue: 'Get in touch',
      admin: {
        description: 'Main scrolling title text'
      }
    },
    {
      name: 'tabs',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 10,
      admin: {
        description: 'Contact section tabs (all will use the same contact form)'
      },
      fields: [
        {
          name: 'tabTitle',
          type: 'text',
          required: true,
          admin: {
            description: 'Title for the tab (e.g., "Book an appointment", "General Inquiry")'
          }
        },
        {
          name: 'tabSubtitle',
          type: 'text',
          admin: {
            description: 'Optional subtitle for the tab'
          }
        }
      ]
    }
  ]
}