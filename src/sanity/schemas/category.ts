import { defineArrayMember, defineField, defineType } from 'sanity'
import CategoryUrlInput from '../components/CategoryUrlInput'

export const category = defineType({
  name: 'category',
  title: 'Furniture Category',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'images', title: 'Images' },
    { name: 'gallery', title: 'Gallery' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'navLabel',
      title: 'Nav label (short)',
      type: 'string',
      group: 'content',
      description: 'Short label used in the header (e.g. Sofas, Bedroom).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      description: 'Used in the page URL: myyspacefurniture.com/[slug]',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageUrl',
      title: 'Page URL',
      type: 'string',
      group: 'content',
      description: 'Auto-filled from the slug. Opens the live category page.',
      components: { input: CategoryUrlInput },
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      group: 'content',
      description: 'Short line under the category title on the collection page.',
    }),

    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      group: 'images',
      options: { hotspot: true },
      description: 'Large image for the category page header. Upload here.',
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
    defineField({
      name: 'heroImageUrl',
      title: 'Hero image URL (optional fallback)',
      type: 'string',
      group: 'images',
      description: 'Only if not uploading — path like /products/loveseat (9).jpeg or a full https URL.',
    }),
    defineField({
      name: 'menuImage',
      title: 'Mega-menu image',
      type: 'image',
      group: 'images',
      options: { hotspot: true },
      description: 'Image shown in the desktop mega menu card for this collection.',
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
    defineField({
      name: 'menuImageUrl',
      title: 'Mega-menu image URL (optional fallback)',
      type: 'string',
      group: 'images',
      description: 'Only if not uploading — local path or https URL.',
    }),

    defineField({
      name: 'gallery',
      title: 'Gallery images',
      type: 'array',
      group: 'gallery',
      description: 'Product photos for this collection. Prefer uploading images; localSrc is a fallback.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'galleryItem',
          title: 'Gallery image',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              description: 'Upload the photo shown in the category gallery.',
            }),
            defineField({
              name: 'localSrc',
              title: 'Local / existing URL',
              type: 'string',
              description: 'Fallback path e.g. /products/loveseat (2).jpeg if not uploading.',
            }),
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'alt', media: 'image', subtitle: 'localSrc' },
            prepare({ title, media, subtitle }) {
              return {
                title: title || 'Gallery image',
                subtitle: subtitle || (media ? 'Uploaded image' : 'Add image or local path'),
                media,
              }
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'order',
      title: 'Nav order',
      type: 'number',
      group: 'settings',
      initialValue: 0,
      description: 'Lower numbers appear first in the header.',
    }),
    defineField({
      name: 'showInNav',
      title: 'Show in navigation',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
    }),
  ],
  orderings: [{ title: 'Nav order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      pageUrl: 'pageUrl',
      media: 'heroImage',
      menu: 'menuImage',
    },
    prepare({ title, slug, pageUrl, media, menu }) {
      const url = pageUrl || (slug ? `https://myyspacefurniture.com/${slug}` : 'Add a slug')
      return {
        title: title || 'Untitled category',
        subtitle: url,
        media: media || menu,
      }
    },
  },
})
