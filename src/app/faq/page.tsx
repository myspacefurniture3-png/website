'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import Link from 'next/link'

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  title: string
  items: FAQItem[]
}

const faqCategories: FAQCategory[] = [
  {
    title: 'Showroom & Visit',
    items: [
      {
        question: 'Where is Myy Space Furniture located?',
        answer:
          'Our showroom is at 1811 Douglas Blvd, Roseville, CA 95661. We welcome walk-ins and appointments. Parking is available on site, and the showroom is wheelchair accessible.',
      },
      {
        question: 'Which areas do you serve?',
        answer:
          'We serve Roseville, Sacramento, Davis, Chico, Yuba City, and surrounding Northern California communities. Delivery coverage depends on your address and order size — ask the showroom for current zones and timing.',
      },
      {
        question: 'Can I see pieces in person before buying?',
        answer:
          'Yes. We recommend visiting so you can sit on sectionals, compare fabrics and leathers, and see bedroom and dining suites staged in the showroom. Bring room measurements and photos of your space if you can.',
      },
    ],
  },
  {
    title: 'Custom Furniture & Customization',
    items: [
      {
        question: 'Can I custom order furniture from your store?',
        answer:
          'Yes. We custom build furniture in Roseville, CA. Size, layout, fabric or leather, finish, and configuration can be tailored — from sectionals and sofas to bedroom and dining pieces. Visit the showroom to review options and timelines with our team.',
      },
      {
        question: 'How long does a custom order take?',
        answer:
          'Lead times vary by piece, material, and current production schedule. Many custom orders fall in a multi-week window; your salesperson will confirm an estimated completion date when you place the order.',
      },
      {
        question: 'Can I choose my own fabric or leather?',
        answer:
          'Yes. We help you select from fabric and leather options that fit your style and use (pets, kids, high traffic). Bring swatches or inspiration photos and we will help match the right material.',
      },
    ],
  },
  {
    title: 'Financing & Payments',
    items: [
      {
        question: 'Do you offer financing or layaway?',
        answer:
          'Yes. We offer flexible financing and payment plans for qualifying purchases. Terms depend on the plan and approval. Stop by the Roseville showroom or contact us to review current options before you buy.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept major credit and debit cards and other payment methods available at the showroom. Financing, when approved, can also cover eligible purchases. Ask staff for details at checkout.',
      },
      {
        question: 'Do you price match?',
        answer:
          'We work to keep premium furniture competitively priced. Ask about price matching on comparable in-stock or special-order items — bring the competing offer and we will review it with you.',
      },
    ],
  },
  {
    title: 'Products, Brands & Quality',
    items: [
      {
        question: 'What brands of furniture and mattresses do you sell?',
        answer:
          'Myy Space Furniture carries quality furniture and mattresses, including brands such as Sealy, Beautyrest, Sapphire, and other trusted names. Selection changes with inventory — visit the showroom for what is available now.',
      },
      {
        question: 'Do you sell complete room sets?',
        answer:
          'Yes. We offer bedroom sets for adults and kids, plus coordinated living and dining looks. Mix mattresses, frames, vanities, bunks, sofas, and tables to furnish a full room — or ask us to help design a custom suite.',
      },
      {
        question: 'Are your sectionals modular?',
        answer:
          'Many fabric and leather sectionals can be configured to fit your room (L-shape, U-shape, chaise placement). Bring approximate dimensions and we will help choose a layout that works.',
      },
    ],
  },
  {
    title: 'Delivery, Pickup & Care',
    items: [
      {
        question: 'Do you offer delivery?',
        answer:
          'Yes. We offer delivery and pickup. Fees depend on location and order size. Same-day or next-available delivery may be possible for select in-stock items — confirm timing with the showroom when you purchase.',
      },
      {
        question: 'Is white-glove setup included?',
        answer:
          'Professional handling and setup options are available for many orders. Ask which service level applies to your pieces (placement, assembly, packaging removal) so expectations are clear before delivery day.',
      },
      {
        question: 'How should I care for fabric or leather furniture?',
        answer:
          'Vacuum fabric regularly and blot spills promptly. Leather benefits from gentle cleaning and conditioning suited to the finish. We share care tips with your purchase — ask for guidance specific to your material.',
      },
      {
        question: 'What is your return or exchange policy?',
        answer:
          'Policies differ for in-stock, clearance, and custom / special-order items. Custom pieces are typically non-returnable once production begins. Review terms with your salesperson before you finalize the order.',
      },
    ],
  },
  {
    title: 'Warranty & Support',
    items: [
      {
        question: 'Do products include a warranty?',
        answer:
          'Many mattresses and furniture pieces include manufacturer warranties. Coverage and length vary by brand and product. Keep your receipt and warranty information; our team can help you start a claim if needed.',
      },
      {
        question: 'How do I get help after my purchase?',
        answer:
          'Contact the Roseville showroom with your order details, or use the Contact page on this site. We can help with delivery questions, care advice, and warranty next steps.',
      },
    ],
  },
]

export default function FAQ() {
  const [activeItems, setActiveItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setActiveItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <>
      <Header />
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Showroom visits, custom orders, financing, delivery, and care — answers from Myy Space Furniture in Roseville."
        kicker="Help"
      />

      <main className="py-20 md:py-28 bg-[#f8f6f3] text-[#1a1a1a]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {faqCategories.map((category, catIndex) => (
            <section key={catIndex} className="mb-14">
              <h2 className="text-[11px] uppercase tracking-[0.22em] mb-6 font-bold">{category.title}</h2>
              <div className="border-t border-black/10">
                {category.items.map((item, itemIndex) => {
                  const itemId = `faq-${catIndex}-${itemIndex}`
                  const isActive = activeItems.includes(itemId)
                  return (
                    <div key={itemIndex} className="border-b border-black/10">
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full py-5 text-left font-playfair text-lg font-light flex justify-between items-center gap-6"
                      >
                        <span>{item.question}</span>
                        <span className={`text-sm transition-transform ${isActive ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                      {isActive && (
                        <div className="pb-6 text-[#1a1a1a]/70 font-light leading-relaxed">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>
          ))}

          <section className="mt-16 text-center py-12 border-t border-black/10">
            <h2 className="text-3xl font-playfair font-light mb-4">Still Have Questions?</h2>
            <p className="text-[#1a1a1a]/70 mb-8 font-light">
              Visit us at 1811 Douglas Blvd, Roseville, or send a message — we are happy to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block px-10 py-3.5 border border-[#1a1a1a] text-[12px] uppercase tracking-[0.2em] hover:bg-[#1a1a1a] hover:text-white transition"
              >
                Contact Us
              </Link>
              <Link
                href="/financing"
                className="inline-block px-10 py-3.5 border border-[#1a1a1a] text-[12px] uppercase tracking-[0.2em] hover:bg-[#1a1a1a] hover:text-white transition"
              >
                Financing
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
