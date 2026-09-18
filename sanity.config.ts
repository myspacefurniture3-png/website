import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'
import { dataset, projectId } from './src/sanity/env'
import SupportTool from './src/sanity/support/SupportTool'

function SupportIcon() {
  return (
    <svg viewBox="0 0 25 25" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="12.5" cy="12.5" r="8.25" />
      <path d="M12.5 11.2v5.3M12.5 8.2v.8" />
    </svg>
  )
}

export default defineConfig({
  name: 'my-space-furniture',
  title: 'My Space Furniture',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
  tools: (prev) =>
    prev.concat({
      name: 'support',
      title: 'Support',
      icon: SupportIcon,
      component: SupportTool,
    }),
})
