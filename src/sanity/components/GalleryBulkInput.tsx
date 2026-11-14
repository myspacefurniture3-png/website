'use client'

import React, { useRef, useState } from 'react'
import { Button, Card, Flex, Stack, Text } from '@sanity/ui'
import { insert, set, useClient, type ArrayOfObjectsInputProps } from 'sanity'
import { apiVersion } from '../env'

type GalleryItem = {
  _type: 'galleryItem'
  _key: string
  alt: string
  image: {
    _type: 'image'
    asset: { _type: 'reference'; _ref: string }
  }
}

const UPLOAD_AT_ONCE = 6

function makeKey() {
  return `${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`
}

function altFromFilename(name: string) {
  return name
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

async function mapPool<T, R>(items: T[], limit: number, worker: (item: T, index: number) => Promise<R>) {
  const results = new Array<R>(items.length)
  let next = 0

  async function run() {
    while (next < items.length) {
      const index = next
      next += 1
      results[index] = await worker(items[index], index)
    }
  }

  const workers = Math.min(limit, items.length)
  await Promise.all(Array.from({ length: workers }, () => run()))
  return results
}

export default function GalleryBulkInput(props: ArrayOfObjectsInputProps) {
  const client = useClient({ apiVersion })
  const inputRef = useRef<HTMLInputElement>(null)
  const valueRef = useRef(props.value)
  const onChangeRef = useRef(props.onChange)
  valueRef.current = props.value
  onChangeRef.current = props.onChange

  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)

  async function uploadFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList).filter((file) => file.type.startsWith('image/') || /\.(heic|heif)$/i.test(file.name))
    if (!files.length) {
      setError('Choose image files. You can select many at once.')
      return
    }

    setBusy(true)
    setError('')
    setStatus(`Uploading ${files.length} ${files.length === 1 ? 'image' : 'images'}…`)

    let finished = 0
    try {
      const uploaded = await mapPool(files, UPLOAD_AT_ONCE, async (file) => {
        try {
          const asset = await client.assets.upload('image', file, {
            filename: file.name,
            contentType: file.type || undefined,
          })
          const item: GalleryItem = {
            _type: 'galleryItem',
            _key: makeKey(),
            alt: altFromFilename(file.name),
            image: {
              _type: 'image',
              asset: { _type: 'reference', _ref: asset._id },
            },
          }
          return item
        } catch {
          return null
        } finally {
          finished += 1
          setStatus(`Uploading ${finished} of ${files.length}…`)
        }
      })

      const items = uploaded.filter((item): item is GalleryItem => Boolean(item))
      const failed = files.length - items.length

      if (items.length) {
        const existing = Array.isArray(valueRef.current) ? valueRef.current : []
        if (existing.length === 0) {
          onChangeRef.current(set(items))
        } else {
          onChangeRef.current(insert(items, 'after', [existing.length - 1]))
        }
      }

      if (!items.length) {
        setStatus('')
        setError('None of the images could be uploaded. Try again.')
      } else if (failed) {
        setStatus(`Added ${items.length} ${items.length === 1 ? 'image' : 'images'}.`)
        setError(`${failed} ${failed === 1 ? 'file' : 'files'} could not be uploaded.`)
      } else {
        setStatus(`Added ${items.length} ${items.length === 1 ? 'image' : 'images'}. Publish to show them on the site.`)
      }
    } catch (err) {
      setStatus('')
      setError(err instanceof Error ? err.message : 'Upload failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Stack space={4}>
      <Card
        padding={4}
        radius={2}
        border
        tone={dragOver ? 'primary' : 'default'}
        style={{ background: dragOver ? '#f3efe8' : '#f8f6f3' }}
        onDragEnter={(event) => {
          event.preventDefault()
          setDragOver(true)
        }}
        onDragOver={(event) => {
          event.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragOver(false)
          if (busy) return
          const files = event.dataTransfer?.files
          if (files?.length) void uploadFiles(files)
        }}
      >
        <Stack space={3}>
          <Text size={1} weight="semibold">
            Upload a batch of photos
          </Text>
          <Text size={1} muted>
            Select or drop many images at once. They upload together and are added to this gallery in one step.
          </Text>
          <Flex align="center" gap={3} wrap="wrap">
            <Button
              text={busy ? 'Uploading…' : 'Choose images'}
              tone="primary"
              mode="default"
              disabled={busy}
              onClick={() => inputRef.current?.click()}
            />
            {status ? <Text size={1}>{status}</Text> : null}
          </Flex>
          {error ? (
            <Text size={1} style={{ color: '#9b2c2c' }}>
              {error}
            </Text>
          ) : null}
          <input
            ref={inputRef}
            type="file"
            accept="image/*,.heic,.heif"
            multiple
            hidden
            onChange={(event) => {
              const files = event.currentTarget.files
              event.currentTarget.value = ''
              if (files?.length) void uploadFiles(files)
            }}
          />
        </Stack>
      </Card>
      {props.renderDefault(props)}
    </Stack>
  )
}
