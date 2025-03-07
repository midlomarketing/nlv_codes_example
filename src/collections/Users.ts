import type { CollectionConfig } from 'payload'
import { BoldFeature, FixedToolbarFeature, ItalicFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { ContentWithMedia } from '@/blocks/ContentWithMedia/config'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  defaultPopulate: {
    slug: true,
    name: true,
  },
  fields: [
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'slug',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text'
    },
    {
      type: 'richText',
      name: 'test',
      editor: lexicalEditor({
        features: ({defaultFeatures}) => [
          ...defaultFeatures.filter((feature) => !['superscript', 'subscript', 'inlineCode'].includes(feature.key)),
          FixedToolbarFeature()
        ]
      })
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        ContentWithMedia
      ]
    },
    // Email added by default
    // Add more fields as needed
  ],
}
