'use client'

import { createContext, useContext } from 'react'
import type { ObjectItemProps, PreviewProps } from 'sanity'

type GalleryImageValue = {
  _key?: string
  asset?: { _ref?: string }
  localSrc?: string
  alt?: string
}

const GalleryImageContext = createContext<GalleryImageValue | null>(null)

/** Lets a site file path show in the gallery grid when the photo was not uploaded to Sanity. */
export function GalleryImageItem(props: ObjectItemProps) {
  return (
    <GalleryImageContext.Provider value={(props.value as GalleryImageValue) || null}>
      {props.renderDefault(props)}
    </GalleryImageContext.Provider>
  )
}

export function GalleryImagePreview(props: PreviewProps) {
  const value = useContext(GalleryImageContext)
  const localSrc = value?.localSrc
  if (localSrc && !value?.asset?._ref) {
    return props.renderDefault({
      ...props,
      title: props.title || value?.alt || 'Gallery image',
      media: (
        // Studio-only thumbnail for photos that already live in /public.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={localSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ),
    })
  }
  return props.renderDefault(props)
}
