import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'
import { dataset, projectId } from './src/sanity/env'
import SupportTool, { SupportIcon } from './src/sanity/support/SupportTool'

export default defineConfig({
  name: 'my-space-furniture',
  title: 'Myy Space Furniture',
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
