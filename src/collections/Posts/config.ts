import { CollectionConfig } from 'payload'
import { ContentWithMedia } from '@/blocks/ContentWithMedia/config'
import { BlocksFeature, FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { TableOfContents } from '@/blocks/TableOfContents/config'
import {MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField} from '@payloadcms/plugin-seo/fields'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    listSearchableFields: ['slug', 'title', 'authors'],
    pagination: {
      limits: [0, 10, 20, 50],
      defaultLimit: 0
    },
    group: 'Posts',
    useAsTitle: 'title',
    description: 'This is a blog collection.',
    components: {
      beforeList: [
        {
          path: 'src/collections/Posts/components/beforeList.tsx#BeforeListContent'
        }
      ],
      afterList: [
        {
          path: 'src/collections/Posts/components/afterList.tsx#AfterListContent'
        }
      ],
      beforeListTable: [
        {
          path: 'src/collections/Posts/components/PostsByStatus.tsx#PostsByStatus'
        }
      ],
      Description: {
        path: 'src/collections/Posts/components/description.tsx#Description'
      }
    }
  },
  versions: {
    drafts: {
      schedulePublish: true,
    },
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
  },
  defaultSort: ['-number', '-title'],
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  defaultPopulate: {
    slug: true,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      admin: {
        components: {
          Error: {
            path: 'src/components/Admin/Fields/Error.tsx#Error'
          },
          Cell: {
            path: 'src/components/Admin/Fields/Cell.tsx#EmailCell'
          }
        }
      }
    },
    {
      name: 'list',
      type: 'array',
      admin: {
        components: {
          RowLabel: {
            path: 'src/components/Admin/Fields/Label.tsx#CustomRowLabel'
          }
        }
      },
      fields: [
        {
          type: 'text',
          name: 'listItem'
        }
      ],
      labels: {
        singular: 'list item',
        plural: 'list items'
      }
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: {
        position: 'sidebar',
        className: 'authors',
        components: {
          beforeInput: [
            {
              path: 'src/components/Admin/Fields/Authors.tsx#Authors'
            }
          ]
        }
      }
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              type: 'blocks',
              admin: {
                initCollapsed: true,
                isSortable: false,
              },
              blocks: [
                ContentWithMedia, TableOfContents,
              ],
              name: 'blockTest',
              label: false,
              minRows: 1,
              maxRows: 20,
            },
            {
              name: 'title',
              type: 'text',
              maxLength: 60,
              admin: {
                components: {
                  Label: {
                    path: 'src/components/Admin/Fields/Label.tsx#CustomTextLabel'
                  },
                  Description: {
                    path: 'src/components/Admin/Fields/Description.tsx#TitleDescription',
                    clientProps: {
                      defaultLength: 60
                    }
                  },
                  Cell: {
                    path: 'src/components/Admin/Fields/Cell.tsx#TitleCell'
                  }
                }
              }
            },
            {
              name: 'array',
              type: 'array',
              admin: {
                readOnly: true,
              },
              fields: [
                {
                  name: 'arrayText',
                  type: 'text'
                }
              ]
            },
            {
              name: 'date',
              type: 'date',
              // timezone: true,
            },
            {
              name: 'slug',
              type: 'text',
              admin: {
                components: {
                  Field: {
                    path: 'src/components/Admin/Fields/CustomTextField.tsx#CustomTextField'
                  }
                }
              }
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  BlocksFeature({
                    blocks: [ContentWithMedia, TableOfContents],
                  }),
                  FixedToolbarFeature(),
                ],
                admin: {
                  hideInsertParagraphAtEnd: true,
                },
              }),
            },
            {
              name: 'plaintext',
              type: 'textarea',
            },
            { name: 'number', type: 'number' },
          ],
        },
        {
          label: 'SEO',
          name: 'meta',
          fields: [
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaDescriptionField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            {
              name: 'canonicalUrl',
              label: 'Canonical URL',
              type: 'text',
              hooks: {
                beforeChange: [
                  async ({data, value}) => value ? value : `https://example.com/posts/${data?.slug}`
                ]
              }
            },
            PreviewField({
              hasGenerateFn: true,
            }),
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            })
          ]
        }
      ],
    },
  ],
  // hooks: {
  //   afterChange: [
  //     async ({req: {payload}, collection, doc}) => {
  //     const sendEmail = await payload.sendEmail({
  //       to: 'nick@midlowebdesign.com',
  //       subject: `Change made in ${collection.slug}`,
  //       html: `<div><h2>Changes made:</h2> <p>change made to <em>${doc.title}</em> in ${collection.slug}</p></div>`
  //     })
  //     }
  //   ]
  // }
}