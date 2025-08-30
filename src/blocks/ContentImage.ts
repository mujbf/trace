// src/blocks/ContentImage.ts
import type { Block } from 'payload'

export const ContentImage: Block = {
  slug: 'contentImage',
  interfaceName: 'ContentImageBlock',
  fields: [
    {
      name: 'marqueeText',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional scrolling marquee text that appears above the content section',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Main title that will appear in the content section',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: {
        description: 'Rich text content that will appear below the title',
      },
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
      admin: {
        description: 'Text for the call-to-action button',
      },
    },
    {
      name: 'buttonLink',
      type: 'text',
      required: true,
      admin: {
        description: 'URL or path for the button link',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Image that will extend to the screen edge on desktop',
      },
    },
    {
      name: 'imagePosition',
      type: 'select',
      options: [
        {
          label: 'Right (Content Left, Image Right)',
          value: 'right',
        },
        {
          label: 'Left (Image Left, Content Right)',
          value: 'left',
        },
      ],
      defaultValue: 'right',
      admin: {
        description:
          'Choose which side the image appears on (desktop only - mobile is always full width)',
      },
    },
    {
      name: 'imageContained',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'When checked, image stays within container with padding. When unchecked, image extends to screen edge (default behavior)',
      },
    },
  ],
}