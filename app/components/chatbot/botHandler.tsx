'use client';

import React, { useEffect, useState } from 'react';
import {Send, Bot, User } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function BotHandler() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    const [error, setError] = useState<string | null>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch response');
            }

            setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch response');
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: 'Sorry, I could not fetch a response.' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full max-w-2xl mx-auto my-4 p-4 bg-white rounded-md shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] md:fixed md:bottom-0 md:right-4 z-999 h-120">
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-blue-500 text-white">
                <h1 className="text-xl font-bold">Chatbot</h1>
                <button
                    className="p-2 bg-blue-700 rounded-lg"
                    onClick={() => {
                        setMessages([]);
                        setInput('');
                        setIsLoading(false);
                        setError(null);
                    }
                    }
                >
                    Reset
                </button>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-100 rounded-lg shadow-md">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex items-start mb-4 ${
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        {message.role === 'user' ? (
                            <User className="w-6 h-6 mr-2" />
                        ) : (
                            <Bot className="w-6 h-6 mr-2" />
                        )}
                        <div
                            className={`p-2 rounded-lg ${
                                message.role === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-black'
                            }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-start mb-4">
                        <Bot className="w-6 h-6 mr-2" />
                        <div className="p-2 bg-gray-200 text-black rounded-lg">
                            Typing...
                        </div>
                    </div>
                )}
                {error && (
                    <div className="text-red-500">{error}</div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex mt-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow p-2 border rounded-l-lg focus:outline-none"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="p-2 bg-blue-500 text-white rounded-r-lg"
                >
                    <Send />
                </button>
            </form>
        </div>
        );

}

