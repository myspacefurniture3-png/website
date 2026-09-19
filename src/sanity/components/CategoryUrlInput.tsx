'use client'

import React, { useEffect, useMemo } from 'react'
import { Stack, Text, Card, Box, Button, Flex } from '@sanity/ui'
import { set, unset, type StringInputProps, useFormValue } from 'sanity'

const SITE_URL = 'https://myyspacefurniture.com'

export default function CategoryUrlInput(props: StringInputProps) {
  const { onChange, elementProps, value } = props
  const slugValue = useFormValue(['slug']) as { current?: string } | undefined
  const slug = slugValue?.current?.trim() || ''
  const pageUrl = useMemo(() => (slug ? `${SITE_URL}/${slug}` : ''), [slug])

  useEffect(() => {
    if (!pageUrl) {
      if (value) onChange(unset())
      return
    }
    if (value !== pageUrl) onChange(set(pageUrl))
  }, [pageUrl, value, onChange])

  if (!slug) {
    return (
      <Card padding={3} radius={2} tone="caution" border>
        <Text size={1}>Set a slug to generate the live category page URL.</Text>
      </Card>
    )
  }

  return (
    <Stack space={3}>
      <Card padding={3} radius={2} border style={{ background: '#f8f6f3' }}>
        <Stack space={3}>
          <Text size={1} muted style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Live storefront page
          </Text>
          <Flex align="center" gap={3} wrap="wrap">
            <Box flex={1}>
              <Text size={2} weight="semibold" style={{ wordBreak: 'break-all' }}>
                {pageUrl}
              </Text>
            </Box>
            <Button
              as="a"
              href={pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              text="Open page"
              mode="ghost"
              tone="primary"
              fontSize={1}
            />
          </Flex>
        </Stack>
      </Card>
      <input {...elementProps} type="hidden" value={pageUrl} readOnly />
    </Stack>
  )
}
