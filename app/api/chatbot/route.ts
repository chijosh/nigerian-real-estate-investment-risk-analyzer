import { NextResponse } from 'next/server';
import OpenAI from 'openai';

console.log('API Key:', process.env.DEEPSEEK_API_KEY);
console.log('API URL:', process.env.DEEPSEEK_API_URL);

if (!process.env.DEEPSEEK_API_KEY) {
    throw new Error('Missing DeepSeek API key');
}

const openai = new OpenAI({
    baseURL: process.env.DEEPSEEK_API_URL,
    apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(request: Request) {
    const { messages } = await request.json();


    if (!messages) {
        return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

        // Define Josh's personality and behavior
        const systemMessage = {
            role: 'system',
            content: `
                Your name is Josh, and you are an expert in Nigerian real estate. 
                You provide valuable insights, market trends, and advice on buying, selling, or investing in property in Nigeria.
                If a user asks about any other topic, politely inform them that you specialize only in Nigerian real estate and direct them to contact the website owners for other inquiries.
                The contact page link is: [Contact Us](https://npira.vercel.app/contact).
            `,
        };

    try {
        const response = await openai.chat.completions.create({
            model: 'deepseek/deepseek-r1',
            messages: [systemMessage, ...messages,
            ],
            max_tokens: 1000,
            temperature: 0.7,
        });

        const aiResponse = response.choices[0]?.message?.content || '';

        // Check if Josh's response is off-topic
        const isOffTopic = !aiResponse.toLowerCase().includes('real estate') && !aiResponse.toLowerCase().includes('property');

        if (isOffTopic) {
            return NextResponse.json(
                {
                    message: `I'm specialized in Nigerian real estate. If you have any other inquiries, please contact the website owners here: [Contact Us](https://npira.vercel.app/contact).`,
                },
                { status: 200 }
            );
        }

        if (!response.choices[0].message.content) {
            throw new Error('No response in content received');
        }

        return NextResponse.json({ message: aiResponse }, { status: 200 });
    } catch (error) {
        console.error('API Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch response';
        const statusCode = error instanceof Error && 'status' in error && typeof error.status === 'number' ? error.status : 500;
        return NextResponse.json({ error: errorMessage }, { status: statusCode });
    }
}