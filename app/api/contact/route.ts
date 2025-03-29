import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Simulating email sending (replace with actual email service)
        console.log('New Contact Form Submission:', { name, email, message });

        return NextResponse.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        return NextResponse.json({ error: `Server error: ${error}, please try again later.` }, { status: 500 });
    }
}
