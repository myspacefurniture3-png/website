'use client'

import React, { useMemo } from 'react'
import { Box, Card, Flex, Spinner, Stack, Text, Button } from '@sanity/ui'

const SITE_URL = 'https://myyspacefurniture.com'

type PreviewDocument = {
  title?: string
  slug?: { current?: string }
  pageUrl?: string
}

type CategoryLivePreviewProps = {
  document?: {
    displayed?: PreviewDocument
  }
}

/**
 * Document pane view: embeds the live category page next to the editor.
 */
export function CategoryLivePreview(props: CategoryLivePreviewProps) {
  const displayed = props.document?.displayed
  const title = displayed?.title
  const slug = displayed?.slug?.current?.trim() || ''
  const pageUrl = useMemo(() => {
    if (displayed?.pageUrl) return displayed.pageUrl
    return slug ? `${SITE_URL}/${slug}` : ''
  }, [displayed?.pageUrl, slug])

  if (!slug) {
    return (
      <Card padding={4} tone="caution" border height="fill">
        <Text size={1}>Set a slug on this category to preview its live page.</Text>
      </Card>
    )
  }

  return (
    <Flex direction="column" height="fill">
      <Card padding={3} borderBottom tone="transparent">
        <Flex align="center" gap={3} wrap="wrap">
          <Box flex={1}>
            <Stack space={2}>
              <Text size={1} muted style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Live page
              </Text>
              <Text size={1} weight="semibold" style={{ wordBreak: 'break-all' }}>
                {title ? `${title} — ` : ''}
                {pageUrl}
              </Text>
            </Stack>
          </Box>
          <Button
            as="a"
            href={pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            text="Open in new tab"
            mode="ghost"
            tone="primary"
            fontSize={1}
          />
        </Flex>
      </Card>
      <Box flex={1} style={{ position: 'relative', minHeight: 0, background: '#f4f1ec' }}>
        <Flex
          align="center"
          justify="center"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        >
          <Spinner muted />
        </Flex>
        <iframe
          title={`Live preview: ${title || slug}`}
          src={pageUrl}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 0,
            background: '#fff',
          }}
        />
      </Box>
    </Flex>
  )
}
