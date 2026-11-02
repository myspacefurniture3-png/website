'use client'

import { useState } from 'react'
import { googleReviews, GOOGLE_REVIEWS_SUMMARY } from '@/data/googleReviews'

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg
    className={`w-4 h-4 ${filled ? 'text-[#C4A574]' : 'text-[#e8e0d8]'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const TESTIMONIAL_IMAGES = [
  '/Website/IMG_4546.PNG',
  '/Website/IMG_4365.PNG',
  '/Website/IMG_4654.PNG',
  '/Website/IMG_4540.PNG',
  '/Website/IMG_4335.PNG',
  '/Website/IMG_4296.PNG',
]

export default function GoogleReviews() {
  const [showAll, setShowAll] = useState(false)
  const featured = googleReviews.slice(0, 3)
  const displayedReviews = showAll ? googleReviews : featured

  return (
    <section className="bg-[#F8F5F2] py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-12 md:mb-14">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] text-[#2c241c] font-light tracking-tight">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-[15px] text-[#2c241c]/65 font-light">
            {GOOGLE_REVIEWS_SUMMARY.averageRating.toFixed(1)} stars from {GOOGLE_REVIEWS_SUMMARY.totalReviews} Google reviews
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 ${showAll ? 'lg:grid-cols-3' : ''}`}>
          {displayedReviews.map((review, index) => (
            <article
              key={`${review.author}-${index}`}
              className="bg-white rounded-xl overflow-hidden border border-[#e8e0d8] flex flex-col"
            >
              {index < 3 && (
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={TESTIMONIAL_IMAGES[index % TESTIMONIAL_IMAGES.length]}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} filled={star <= review.rating} />
                  ))}
                </div>
                <p className="text-[14px] text-[#2c241c]/75 leading-relaxed font-light flex-1">
                  &ldquo;
                  {index < 3 && review.text.length > 160
                    ? `${review.text.slice(0, 160).trim()}…`
                    : review.text}
                  &rdquo;
                </p>
                <p className="mt-5 text-[13px] font-sans font-medium text-[#2c241c] tracking-wide">
                  {review.author}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {googleReviews.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-7 py-3 bg-[#8B6B56] hover:bg-[#7a5c49] text-white text-[12px] uppercase tracking-[0.16em] font-sans font-medium transition-colors"
            >
              {showAll ? 'Show Less' : 'More Reviews'}
            </button>
          )}
          <a
            href={GOOGLE_REVIEWS_SUMMARY.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 border border-[#2c241c]/20 hover:border-[#8B6B56] text-[#2c241c] text-[12px] uppercase tracking-[0.16em] font-sans font-medium transition-colors"
          >
            See All on Google →
          </a>
        </div>
      </div>
    </section>
  )
}
