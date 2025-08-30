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
        description: 'Contact form tabs and their associated forms'
      },
      fields: [
        {
          name: 'tabTitle',
          type: 'text',
          required: true,
          admin: {
            description: 'Title for the tab (e.g., "Book an appointment")'
          }
        },
        {
          name: 'tabSubtitle',
          type: 'text',
          admin: {
            description: 'Optional subtitle for the tab'
          }
        },
        {
          name: 'formFields',
          type: 'array',
          required: true,
          minRows: 1,
          admin: {
            description: 'Form fields for this tab'
          },
          fields: [
            {
              name: 'fieldLabel',
              type: 'text',
              required: true,
              admin: {
                description: 'Label for the form field'
              }
            },
            {
              name: 'fieldType',
              type: 'select',
              required: true,
              options: [
                { label: 'Text Input', value: 'text' },
                { label: 'Email Input', value: 'email' },
                { label: 'Phone Input', value: 'tel' },
                { label: 'Textarea', value: 'textarea' },
                { label: 'Select Dropdown', value: 'select' }
              ],
              admin: {
                description: 'Type of form field'
              }
            },
            {
              name: 'placeholder',
              type: 'text',
              admin: {
                description: 'Placeholder text for the field'
              }
            },
            {
              name: 'required',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Whether this field is required'
              }
            },
            {
              name: 'options',
              type: 'array',
              admin: {
                condition: (data, siblingData) => siblingData.fieldType === 'select',
                description: 'Options for select dropdown (only shown when field type is select)'
              },
              fields: [
                {
                  name: 'option',
                  type: 'text',
                  required: true
                }
              ]
            }
          ]
        },
        {
          name: 'submitButtonText',
          type: 'text',
          defaultValue: 'Submit',
          admin: {
            description: 'Text for the submit button'
          }
        }
      ]
    }
  ]
}