import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'
import { dataset, projectId } from './src/sanity/env'
import SupportTool, { SupportIcon } from './src/sanity/support/SupportTool'
import { defaultDocumentNode, studioStructure } from './src/sanity/structure'

export default defineConfig({
  name: 'my-space-furniture',
  title: 'Myy Space Furniture',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({ structure: studioStructure, defaultDocumentNode }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
  tools: (prev) => {
    const withoutSupport = prev.filter((tool) => tool.name !== 'support')
    // Keep Support last in the tool bar (rightmost / bottom of the list)
    return withoutSupport.concat({
      name: 'support',
      title: 'Support',
      icon: SupportIcon,
      component: SupportTool,
    })
  },
})
