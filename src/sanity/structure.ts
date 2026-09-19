import type { DefaultDocumentNodeResolver, StructureResolver } from 'sanity/structure'
import { CategoryLivePreview } from './components/CategoryLivePreview'

/**
 * Studio desk: categories list shows each document with its live page URL
 * in the preview subtitle (see category schema prepare()).
 */
export const studioStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Furniture Categories')
        .schemaType('category')
        .child(
          S.documentTypeList('category')
            .title('Furniture Categories')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('category')
                .views([
                  S.view.form().title('Edit'),
                  S.view.component(CategoryLivePreview).title('Live page'),
                ])
            )
        ),
      S.listItem()
        .title('Journal')
        .schemaType('post')
        .child(
          S.documentTypeList('post')
            .title('Journal')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),
    ])

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  if (schemaType === 'category') {
    return S.document().views([
      S.view.form().title('Edit'),
      S.view.component(CategoryLivePreview).title('Live page'),
    ])
  }
  return S.document().views([S.view.form()])
}
