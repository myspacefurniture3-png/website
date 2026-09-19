import { defineArrayMember, defineField, defineType } from 'sanity'

const JOURNAL_CATEGORIES = [
  { title: 'Buying Guide', value: 'Buying Guide' },
  { title: 'Interior Tips', value: 'Interior Tips' },
  { title: 'Shopping Guide', value: 'Shopping Guide' },
  { title: 'Trends', value: 'Trends' },
  { title: 'Care & Maintenance', value: 'Care & Maintenance' },
  { title: 'Showroom', value: 'Showroom' },
]

export const post = defineType({
  name: 'post',
  title: 'Journal',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'display', title: 'Display' },
    { name: 'seo', title: 'SEO' },
    { name: 'advanced', title: 'Advanced' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'Main headline on the article page and journal cards.',
      validation: (rule) => rule.required().min(8).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      description: 'URL path: myyspacefurniture.com/blog/[slug]',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      group: 'content',
      description: 'Short eyebrow above the title (e.g. Showroom Notes).',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'Deck / summary shown on cards and under the hero. Keep it punchy.',
      validation: (rule) => rule.max(280).warning('Aim for under 280 characters for cards.'),
    }),
    defineField({
      name: 'featuredQuote',
      title: 'Pull quote',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Optional large quote highlighted on the article page.',
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: 'body',
      title: 'Article body',
      type: 'array',
      group: 'content',
      description: 'Write the full article here. Use headings, quotes, images, and callouts.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) =>
                      rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
                  }),
                  defineField({
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt text', validation: (rule) => rule.required() }),
            defineField({ name: 'caption', type: 'string', title: 'Caption' }),
          ],
          preview: {
            select: { alt: 'alt', caption: 'caption', media: 'asset' },
            prepare({ alt, caption, media }) {
              return { title: alt || caption || 'Image', subtitle: caption, media }
            },
          },
        }),
        defineArrayMember({
          name: 'callout',
          title: 'Callout',
          type: 'object',
          fields: [
            defineField({
              name: 'tone',
              title: 'Tone',
              type: 'string',
              options: {
                list: [
                  { title: 'Tip', value: 'tip' },
                  { title: 'Note', value: 'note' },
                  { title: 'Important', value: 'important' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              initialValue: 'tip',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'text', subtitle: 'tone' },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Callout',
                subtitle: subtitle ? String(subtitle).toUpperCase() : 'Callout',
              }
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      description: 'Hero image for the article and social share cards.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Describe the image for accessibility.',
          validation: (rule) => rule.required().warning('Add alt text for accessibility.'),
        }),
      ],
    }),
    defineField({
      name: 'coverImageUrl',
      title: 'Cover image URL (fallback)',
      type: 'string',
      group: 'media',
      description: 'Only if not uploading — local path or https URL.',
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'display',
      options: { list: JOURNAL_CATEGORIES, layout: 'radio' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'display',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Press Enter after each tag. Shown as chips under the article.',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      group: 'display',
      initialValue: 'Myy Space Furniture',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Read time',
      type: 'string',
      group: 'display',
      description: 'e.g. 5 min read',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'display',
      options: { dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm', timeStep: 15 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured on journal',
      type: 'boolean',
      group: 'display',
      description: 'Pin this story in the featured slot on /blog.',
      initialValue: false,
      options: { layout: 'switch' },
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      group: 'display',
      description: 'Unpublish to hide from the live site without deleting.',
      initialValue: true,
      options: { layout: 'switch' },
    }),
    defineField({
      name: 'relatedCategories',
      title: 'Related collections',
      type: 'array',
      group: 'display',
      description: 'Furniture categories linked under “Shop the story”.',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      validation: (rule) => rule.max(6),
    }),

    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
      description: 'Defaults to the article title if empty.',
      validation: (rule) => rule.max(70).warning('Keep under 70 characters for search results.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Defaults to the excerpt if empty.',
      validation: (rule) => rule.max(160).warning('Keep under 160 characters for search results.'),
    }),

    defineField({
      name: 'bodyHtml',
      title: 'Legacy HTML',
      type: 'text',
      rows: 16,
      group: 'advanced',
      description: 'Migrated posts only. Prefer Article body for new writing.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
      featured: 'featured',
      published: 'published',
      date: 'publishedAt',
    },
    prepare({ title, subtitle, media, featured, published, date }) {
      const when = date
        ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : ''
      const bits = [
        published === false ? 'Draft' : null,
        featured ? 'Featured' : null,
        subtitle || 'Journal',
        when,
      ].filter(Boolean)
      return {
        title: title || 'Untitled article',
        subtitle: bits.join(' · '),
        media,
      }
    },
  },
  orderings: [
    { title: 'Published date, newest', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { title: 'Title', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
})
