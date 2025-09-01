// src/blocks/PostsBlock/config.ts
import type { Block } from 'payload'

export const PostsBlock: Block = {
  slug: 'postsBlock',
  interfaceName: 'PostsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false, // Made optional
      admin: {
        description: 'Optional main title for the posts section'
      }
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false, // Made optional
      admin: {
        description: 'Optional subtitle that appears below the main title'
      }
    },
    {
      name: 'postsToShow',
      type: 'select',
      defaultValue: 'all',
      options: [
        {
          label: 'All Posts',
          value: 'all'
        },
        {
          label: 'Latest Posts',
          value: 'latest'
        },
        {
          label: 'Specific Posts',
          value: 'specific'
        },
        {
          label: 'Posts by Category',
          value: 'category'
        }
      ],
      admin: {
        description: 'Choose which posts to display'
      }
    },
    {
      name: 'numberOfPosts',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 20,
      admin: {
        condition: (data, siblingData) => siblingData.postsToShow === 'latest',
        description: 'Number of latest posts to display'
      }
    },
    {
      name: 'specificPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      admin: {
        condition: (data, siblingData) => siblingData.postsToShow === 'specific',
        description: 'Select specific posts to display'
      }
    },
    {
      name: 'selectedCategories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        condition: (data, siblingData) => siblingData.postsToShow === 'category',
        description: 'Select categories to filter posts by'
      }
    },
    {
      name: 'limitByCategory',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 20,
      admin: {
        condition: (data, siblingData) => siblingData.postsToShow === 'category',
        description: 'Maximum number of posts to show from selected categories'
      }
    },
    {
      name: 'showHeroImage',
      type: 'checkbox',
      defaultValue: false, // Made optional by setting default to false
      admin: {
        description: 'Show the hero image section above the posts'
      }
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data, siblingData) => siblingData.showHeroImage,
        description: 'Background image for the hero section'
      }
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'white', // Changed default to white since hero image is now optional
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
        },
        {
          label: 'White',
          value: 'white'
        }
      ],
      admin: {
        description: 'Background color/gradient for the section'
      }
    },
    {
      name: 'showPagination',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Enable pagination for posts (Note: This is a visual indicator only - actual pagination requires custom implementation)'
      }
    },
    {
      name: 'postsPerPage',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 20,
      admin: {
        condition: (data, siblingData) => siblingData.showPagination,
        description: 'Number of posts per page when pagination is enabled'
      }
    },
    {
      name: 'showExcerpt',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show post excerpt/description'
      }
    },
    {
      name: 'gridLayout',
      type: 'select',
      defaultValue: 'zigzag', // Changed default to zigzag
      options: [
        {
          label: 'Single Column',
          value: 'single-column'
        },
        {
          label: 'Two Columns',
          value: 'two-column'
        },
        {
          label: 'Three Columns',
          value: 'three-column'
        },
        {
          label: 'Zigzag Layout (Desktop)', // Added new zigzag option
          value: 'zigzag'
        }
      ],
      admin: {
        description: 'Grid layout for the posts. Zigzag layout creates a staggered effect on desktop with 80px vertical offset between posts.'
      }
    }
  ]
}