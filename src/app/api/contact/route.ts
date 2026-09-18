import { NextRequest, NextResponse } from 'next/server'

// Get your free access key at https://app.web3forms.com/
// Enter: info@myyspacefurniture.com → verify email → copy access key
const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }


    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        from_name: 'Myy Space Furniture Website',
        subject: subject ? `Myy Space Furniture: ${subject}` : `New Contact from ${name}`,
        name,
        email,
        phone: phone || 'Not provided',
        message,
      }),
    })

    const rawText = await response.text();
    console.log('Web3Forms raw response:', rawText);
    let data;
    try {
      data = JSON.parse(rawText);
    } catch (err) {
      console.error('Failed to parse Web3Forms response as JSON:', err);
      return NextResponse.json(
        { error: 'Invalid response from Web3Forms.' },
        { status: 500 }
      );
    }
    console.log('Web3Forms response:', data);

    if (data.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}
