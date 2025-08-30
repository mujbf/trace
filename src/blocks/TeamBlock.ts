import type { Block } from 'payload'

export const TeamBlock: Block = {
  slug: 'teamBlock',
  interfaceName: 'TeamBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Our core team',
      admin: {
        description: 'Main title for the team section'
      }
    },
    {
      name: 'teamSections',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Different sections of the team (e.g., Board of Advisors, Directors, Operations)'
      },
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
          admin: {
            description: 'Title for this team section (e.g., "Board of Advisors", "Board of Directors")'
          }
        },
        {
          name: 'members',
          type: 'array',
          required: true,
          minRows: 1,
          admin: {
            description: 'Team members in this section'
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                description: 'Full name of the team member'
              }
            },
            {
              name: 'position',
              type: 'text',
              admin: {
                description: 'Job title or position (e.g., "Chief Executive Officer", "Senior Advisor")'
              }
            },
            // {
            //   name: 'company',
            //   type: 'text',
            //   admin: {
            //     description: 'Company or organization (if different from main organization)'
            //   }
            // },
            {
              name: 'photo',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Professional headshot photo (preferably square format)'
              }
            },
            {
              name: 'bio',
              type: 'textarea',
              admin: {
                description: 'Brief biography or description (shown on hover)'
              }
            },
            {
              name: 'email',
              type: 'email',
              admin: {
                description: 'Contact email address (optional)'
              }
            },
            {
              name: 'linkedin',
              type: 'text',
              admin: {
                description: 'LinkedIn profile URL (optional)'
              }
            },
            {
              name: 'twitter',
              type: 'text',
              admin: {
                description: 'Twitter profile URL (optional)'
              }
            }
          ]
        }
      ]
    }
  ]
}