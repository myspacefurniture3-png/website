import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Typewriter from '@/components/Typewriter'

export const metadata: Metadata = {
  title: 'About My Space Furniture | Quality Furniture Since 2016',
  description: 'My Space Furniture provides premium mattresses and furniture to Roseville, Sacramento, Davis, Chico, and Yuba City, CA. We offer mattresses, bedroom sets, sectionals, sofas, dining room furniture, and custom pieces.',
  keywords: 'furniture store, mattresses, bedroom sets, sectionals, dining room furniture, Roseville, Sacramento',
  openGraph: {
    title: 'About My Space Furniture',
    description: 'Premium furniture and mattress retailer serving Northern California',
    type: 'website',
  },
}

export default function About() {
  return (
    <>
      <Header />

      <section className="relative w-full min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/hero1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 w-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/70 mb-4">Our Showroom</p>
          <h1 className="text-3xl md:text-5xl font-playfair font-light text-white mb-4 tracking-wide">My Space Furniture</h1>
          <span className="text-lg md:text-2xl font-playfair font-light text-white/90 mb-6">
            <Typewriter
              words={[
                'Your trusted partner in creating beautiful, comfortable spaces.',
                'Quality furniture for every room in your home.',
                'Serving Northern California since 2016.',
                'Discover premium mattresses and custom furniture today.',
                'Transform your space with our curated collection of furniture.',
              ]}
              typingSpeed={80}
              deletingSpeed={40}
              delay={1200}
              loop={true}
              className="inline"
            />
          </span>
        </div>
      </section>

      <main className="py-20 md:py-28 bg-[#f8f6f3] text-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <section className="mb-20 text-center max-w-3xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#1a1a1a]/50 mb-4">Est. 2016</p>
            <h2 className="text-3xl md:text-4xl font-playfair font-light mb-6">About My Space Furniture</h2>
            <div className="w-12 h-px bg-[#1a1a1a]/30 mx-auto mb-8" />
            <p className="text-base md:text-lg text-[#1a1a1a]/75 mb-4 font-light leading-relaxed">
              My Space Furniture provides premium mattress and furniture sales to Roseville, Sacramento, Davis, Chico, and Yuba City, CA. Since 2016, we have been committed to offering quality furniture and exceptional customer service to our valued customers throughout Northern California.
            </p>
            <p className="text-base md:text-lg text-[#1a1a1a]/75 font-light leading-relaxed">
              We are your trusted partner for creating beautiful, comfortable spaces. Whether you&apos;re looking for the perfect mattress, a stunning bedroom set, elegant dining room furniture, or custom pieces, we have something for every style and budget.
            </p>
          </section>

          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-playfair font-light mb-12 text-center">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.22em] mb-6 font-bold">Services</h3>
                <ul className="space-y-3 text-[#1a1a1a]/75 font-light">
                  <li>Mattresses & Bedding</li>
                  <li>Furniture</li>
                  <li>Bedroom Sets</li>
                  <li>Arm Chairs</li>
                  <li>Dining Room Sets</li>
                  <li>Matching Tables</li>
                  <li>Sofas</li>
                </ul>
              </div>
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.22em] mb-6 font-bold">Specialties</h3>
                <ul className="space-y-3 text-[#1a1a1a]/75 font-light">
                  <li>Mattresses & Adjustable Bases</li>
                  <li>Sectionals (Leather & Fabric)</li>
                  <li>Sofas & Loveseats</li>
                  <li>Bedroom Sets</li>
                  <li>Bunk Beds</li>
                  <li>Vanities</li>
                  <li>Custom Furniture</li>
                  <li>Dining Room Tables & Recliners</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-playfair font-light mb-12 text-center">Why Choose My Space Furniture?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  title: 'Quality Brands',
                  description: 'We carry premium brands including Serta, Beauty Rest, Sapphire Mattresses, and Sealy to ensure you get the best quality furniture.',
                },
                {
                  title: 'Same-Day Delivery',
                  description: 'Fast and reliable delivery options available. We handle the logistics so you can enjoy your new furniture right away.',
                },
                {
                  title: 'In-Store Pickup',
                  description: 'Convenient in-store shopping and pickup options available for your immediate needs.',
                },
                {
                  title: 'Professional Assembly',
                  description: 'Expert assembly service available to ensure your furniture is set up perfectly in your home.',
                },
                {
                  title: 'Flexible Financing',
                  description: 'We offer various payment options including financing to make premium furniture accessible to everyone.',
                },
                {
                  title: 'Wheelchair Accessible',
                  description: 'Our showroom is fully wheelchair accessible, ensuring everyone can browse our collection comfortably.',
                },
              ].map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="w-10 h-px bg-[#1a1a1a]/30 mx-auto mb-5" />
                  <h3 className="text-lg font-playfair font-light mb-3">{feature.title}</h3>
                  <p className="text-sm text-[#1a1a1a]/65 font-light leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 border-y border-black/10 py-14">
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.22em] mb-6 font-bold">Hours of Operation</h3>
              <p className="text-[#1a1a1a]/75 font-light mb-2">Monday – Saturday: 10:00 AM – 7:00 PM</p>
              <p className="text-[#1a1a1a]/75 font-light">Sunday: 10:00 AM – 5:00 PM</p>
            </div>
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.22em] mb-6 font-bold">Languages Spoken</h3>
              <p className="text-[#1a1a1a]/75 font-light">English · Spanish · Hindi · Punjabi</p>
            </div>
          </section>

          <section className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-playfair font-light mb-6">Visit Our Showroom</h2>
            <p className="text-[#1a1a1a]/75 font-light mb-8 leading-relaxed">
              Located in beautiful Roseville, CA, our showroom showcases our complete collection of mattresses, furniture, and custom pieces.
            </p>
            <p className="text-sm uppercase tracking-[0.16em] mb-2">
              <a
                href="https://www.google.com/maps/search/?api=1&query=1811+Douglas+Blvd+Roseville+CA+95661"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-50"
              >
                1811 Douglas Blvd, Roseville, CA 95661
              </a>
            </p>
            <p className="text-sm uppercase tracking-[0.16em] text-[#1a1a1a]/70">
              <a href="tel:9166611073" className="hover:opacity-50">(916) 661-1073</a>
              {' · '}
              <a href="tel:9169940612" className="hover:opacity-50">(916) 994-0612</a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
