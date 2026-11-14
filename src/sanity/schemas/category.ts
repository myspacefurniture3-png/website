import { defineArrayMember, defineField, defineType } from 'sanity'
import CategoryUrlInput from '../components/CategoryUrlInput'
import { GalleryImageItem, GalleryImagePreview } from '../components/GalleryImagePreview'

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
      description: 'Short label. Live collections: Sofas & Sectionals, Bedroom Sets, Dining Sets, Kids & Bunk Beds, Outdoor.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      description:
        'Live slugs: sofas-sectionals, bedroom-sets, dining-sets, kids-bunk-beds, outdoor. Retired slugs redirect and should stay unpublished.',
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
      description: 'Collection card image used when a menu or category tile needs a photo.',
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
      description:
        'Drop photos onto this grid, or click Upload and select many files at once. Each file is added to the gallery.',
      options: { layout: 'grid' },
      of: [
        defineArrayMember({
          type: 'image',
          title: 'Gallery image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
            defineField({
              name: 'localSrc',
              title: 'Local / existing URL',
              type: 'string',
              description: 'Only for a photo that already lives on the site, such as /Website/IMG_4500.PNG.',
            }),
          ],
          components: {
            item: GalleryImageItem,
            preview: GalleryImagePreview,
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
      description: 'Lower numbers appear first. Live order: 1 Sofas, 2 Bedroom, 3 Dining, 4 Kids, 5 Outdoor.',
    }),
    defineField({
      name: 'showInNav',
      title: 'Show in navigation',
      type: 'boolean',
      group: 'settings',
      description:
        'Turn off for retired collections (mattresses, vanities, custom, leather sectionals, fabric sectionals). Only the five live slugs are published on the site and in the sitemap.',
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
