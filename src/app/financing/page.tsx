import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Flexible Financing Options | Myy Space Furniture',
  description: 'Explore financing options at Myy Space Furniture. Flexible payment plans, special rates, and easy approvals for your furniture purchase.',
  keywords: 'financing, payment plans, flexible payments, furniture financing',
  openGraph: {
    title: 'Financing Options - Myy Space Furniture',
    description: 'Make your furniture purchase affordable with flexible financing',
    type: 'website',
  },
}

const options = [
  {
    title: 'Snap Finance',
    terms: '100 Days No Interest',
    duration: 'Up to 18 Months',
    description: 'Flexible financing with 100 days no interest option. Extended payment terms available up to 18 months.',
    features: ['100 days no interest', 'Payment terms up to 18 months', 'Quick approval process', 'No credit needed*'],
    link: 'https://app.snapfinance.com/origination?paramId=3w%2FEWVFzVGcQioSdKn1vuqdr2hNr3A1xiMt4CtG%2BqOVzBLFbDs0lrpCWfkdCvNKE7NiJor%2BcWcRld9e3IFdUTA%3D%3D',
    cta: 'Apply with Snap Finance',
  },
  {
    title: 'Synchrony',
    terms: 'Promotional Financing',
    duration: 'Flexible Terms',
    description: 'Promotional financing available with flexible payment terms and special offers for qualified customers.',
    featured: true,
    features: ['Promotional financing available', 'Flexible payment terms', 'Subject to credit approval', 'Competitive rates'],
    link: 'https://www.synchrony.com/mmc/GY232172807',
    cta: 'Apply with Synchrony',
  },
  {
    title: 'Acima',
    terms: '90 Days No Interest',
    duration: 'Up to 12 Months',
    description: 'Get 90 days no interest financing with up to 12 months to pay. Easy approval and flexible payment schedules.',
    features: ['90 days no interest', 'Up to 12 months no payments', 'Quick application', 'Flexible schedules'],
    link: 'https://ams.acima.com/discover/new?utm_campaign=merchant&utm_source=web&merchant_guid=merc-b16674d6-f463-4052-adac-224d1d755e4b#/select_location',
    cta: 'Apply with Acima',
  },
]

export default function Financing() {
  return (
    <>
      <Header />
      <PageHeader
        title="Flexible Financing"
        subtitle="Make your furniture purchase affordable with our financing options"
        kicker="Services"
      />

      <main className="py-20 md:py-28 bg-[#f8f6f3] text-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <section className="text-center mb-16">
            <h2 className="text-3xl font-playfair font-light mb-6">Flexible Payment Options</h2>
            <p className="text-lg text-[#1a1a1a]/70 max-w-3xl mx-auto font-light">
              At Myy Space Furniture, we offer various flexible payment options. Choose the best option for your needs and make your furniture purchase affordable today!
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {options.map((option) => (
              <div
                key={option.title}
                className={`p-8 flex flex-col border ${option.featured ? 'border-[#1a1a1a]' : 'border-black/15'}`}
              >
                {option.featured && (
                  <p className="text-[10px] uppercase tracking-[0.22em] mb-4 text-[#1a1a1a]/50">Most Popular</p>
                )}
                <h3 className="text-2xl font-playfair font-light mb-4">{option.title}</h3>
                <p className="text-[11px] uppercase tracking-[0.16em] mb-2">{option.terms}</p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#1a1a1a]/50 mb-6">{option.duration}</p>
                <p className="text-[#1a1a1a]/70 mb-6 font-light">{option.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {option.features.map((feature) => (
                    <li key={feature} className="text-sm text-[#1a1a1a]/75 font-light">
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={option.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center px-6 py-3 border border-[#1a1a1a] text-[11px] uppercase tracking-[0.18em] hover:bg-[#1a1a1a] hover:text-white transition"
                >
                  {option.cta}
                </a>
              </div>
            ))}
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-playfair font-light mb-10 text-center">Why Choose Our Financing Options?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xl font-playfair font-light mb-4">Affordable Payment Plans</h3>
                <p className="text-[#1a1a1a]/70 font-light leading-relaxed">
                  We understand that premium furniture is an investment. That&apos;s why we partner with trusted financing companies to offer flexible payment plans that fit your budget. Whether you need short-term financing or extended payment terms, we have options that work for you.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-playfair font-light mb-4">Quick Approval Process</h3>
                <p className="text-[#1a1a1a]/70 font-light leading-relaxed">
                  Our financing partners use advanced technology to provide quick approvals—often in minutes. With minimal documentation and simple application processes, you can get approved and start enjoying your new furniture right away.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-playfair font-light mb-4">Flexible Terms & No Hidden Fees</h3>
                <p className="text-[#1a1a1a]/70 font-light leading-relaxed">
                  Choose payment terms that work best for your situation. Our financing options come with transparent pricing—no hidden fees or surprise charges. You&apos;ll know exactly what you&apos;re paying before you apply.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-playfair font-light mb-4">Special Promotional Offers</h3>
                <p className="text-[#1a1a1a]/70 font-light leading-relaxed">
                  Take advantage of special promotional financing offers including interest-free periods and extended payment terms. These limited-time offers make premium furniture more accessible than ever before.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center border-t border-black/10 pt-16">
            <h2 className="text-3xl font-playfair font-light mb-4">Questions About Our Financing Options?</h2>
            <p className="text-[#1a1a1a]/70 mb-8 font-light">
              Contact us today to learn more about our flexible payment options and find the perfect plan for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:(916)661-1073"
                className="inline-block px-10 py-3.5 border border-[#1a1a1a] text-[12px] uppercase tracking-[0.2em] hover:bg-[#1a1a1a] hover:text-white transition"
              >
                Call: (916) 661-1073
              </a>
              <Link
                href="/contact"
                className="inline-block px-10 py-3.5 border border-[#1a1a1a] text-[12px] uppercase tracking-[0.2em] hover:bg-[#1a1a1a] hover:text-white transition"
              >
                Contact Us
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
