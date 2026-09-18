import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Furniture Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'navLabel', title: 'Nav label (short)', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2 }),
    defineField({ name: 'heroImage', title: 'Hero image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroImageUrl', title: 'Hero image URL (fallback)', type: 'string' }),
    defineField({ name: 'menuImage', title: 'Mega-menu image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'menuImageUrl', title: 'Mega-menu image URL (fallback)', type: 'string' }),
    defineField({ name: 'order', title: 'Nav order', type: 'number', initialValue: 0 }),
    defineField({ name: 'showInNav', title: 'Show in navigation', type: 'boolean', initialValue: true }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryItem',
          fields: [
            { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
            { name: 'localSrc', type: 'string', title: 'Local / existing URL' },
            { name: 'alt', type: 'string', title: 'Alt text' },
          ],
          preview: {
            select: { title: 'alt', media: 'image', subtitle: 'localSrc' },
          },
        },
      ],
    }),
  ],
  orderings: [{ title: 'Nav order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'navLabel', media: 'menuImage' },
  },
})
