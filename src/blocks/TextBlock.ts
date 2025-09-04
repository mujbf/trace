// src/blocks/TextBlock.ts
import type { Block } from 'payload'

export const TextBlock: Block = {
  slug: 'textBlock',
  interfaceName: 'TextBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Main title text'
      }
    },
    {
      name: 'bodyText',
      type: 'richText',
      required: true,
      admin: {
        description: 'Body text content'
      }
    }
  ]
}