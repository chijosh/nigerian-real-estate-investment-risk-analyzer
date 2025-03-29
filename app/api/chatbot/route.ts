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

    try {
        const response = await openai.chat.completions.create({
            model: 'deepseek/deepseek-r1',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful and friendly AI assistant.',
                },
                ...messages,
            ],
            max_tokens: 1000,
            temperature: 0.7,
        });

        if (!response.choices[0].message.content) {
            throw new Error('No response in content received');
        }

        return NextResponse.json(
            { message: response.choices[0].message.content },
            { status: 200 } 
        );
    } catch (error) {
        console.error('API Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch response';
        const statusCode = error instanceof Error && 'status' in error && typeof error.status === 'number' ? error.status : 500;
        return NextResponse.json({ error: errorMessage }, { status: statusCode });
    }
}