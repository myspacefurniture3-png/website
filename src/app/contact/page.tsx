import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import GoogleReviews from '@/components/GoogleReviews'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Myy Space Furniture | Get in Touch',
  description: "Contact Myy Space Furniture for inquiries, support, or to schedule a showroom visit. We're here to help with all your furniture needs.",
  keywords: 'contact us, furniture store contact, customer service, showroom',
  openGraph: {
    title: 'Contact Myy Space Furniture',
    description: 'Get in touch with our furniture experts',
    type: 'website',
  },
}

export default function Contact() {
  return (
    <>
      <Header />
      <PageHeader
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out with any questions or inquiries."
        kicker="Visit"
        compact
      />

      <main className="py-20 md:py-28 bg-[#f8f6f3] text-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#1a1a1a]/50 mb-4">Showroom</p>
              <h2 className="text-3xl font-playfair font-light mb-10">Get In Touch</h2>
              <div className="space-y-8 text-[#1a1a1a]/75 font-light">
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.18em] text-[#1a1a1a] mb-3 font-bold">Phone</h3>
                  <p className="text-lg">(916) 661-1073</p>
                  <p className="text-lg">(916) 994-0612</p>
                  <p className="text-sm mt-2">Mon-Sat: 10:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM</p>
                </div>
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.18em] text-[#1a1a1a] mb-3 font-bold">Email</h3>
                  <p className="text-lg">info@myyspacefurniture.com</p>
                  <p className="text-sm">We respond within 24 hours</p>
                </div>
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.18em] text-[#1a1a1a] mb-3 font-bold">Address</h3>
                  <p className="text-lg">1811 Douglas Blvd</p>
                  <p className="text-lg">Roseville, CA 95661</p>
                </div>
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.18em] text-[#1a1a1a] mb-3 font-bold">Hours</h3>
                  <p>Monday - Saturday: 10:00 AM - 7:00 PM</p>
                  <p>Sunday: 10:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#1a1a1a]/50 mb-4">Inquiry</p>
              <h2 className="text-3xl font-playfair font-light mb-10">Send us a Message</h2>
              <ContactForm />
            </div>
          </div>

          <div className="w-full overflow-hidden bg-white border border-black/10">
            <div className="p-4 sm:p-6 border-b border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-playfair font-light">Our Showroom</h3>
                <p className="text-sm text-[#1a1a1a]/60 mt-1">1811 Douglas Blvd, Roseville, CA 95661</p>
              </div>
              <a
                href="https://www.google.com/maps/place/MyySpace+Furniture+%26+Mattress/@38.7465805,-121.2606694,17z/data=!4m8!3m7!1s0x678ab9b0c002b107:0xbff9cbf87975ed3c!8m2!3d38.7465805!4d-121.2606694!9m1!1b1!16s%2Fg%2F11yjlt_j7s"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#1a1a1a] text-[11px] uppercase tracking-[0.18em] hover:bg-[#1a1a1a] hover:text-white transition-colors"
              >
                Get Directions
              </a>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3111.74643679747!2d-121.2606694!3d38.7465805!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x678ab9b0c002b107%3A0xbff9cbf87975ed3c!2sMyySpace%20Furniture%20%26%20Mattress!5e0!3m2!1sen!2sgh!4v1776033134258!5m2!1sen!2sgh"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              title="MyySpace Furniture & Mattress Location"
            />
          </div>
        </div>
      </main>

      <GoogleReviews />

      <Footer />
    </>
  )
}
