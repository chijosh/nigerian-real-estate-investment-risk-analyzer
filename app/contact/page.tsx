'use client';

import { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import Image from "next/image";
import LinkedInIcon from '../assets/images/linkedin-logo.svg';
import GitHubIcon from '../assets/images/github-logo.svg';


export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Sending...');

        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            setStatus('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } else {
            setStatus('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="max-w-lg w-full p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-center text-blue-600">Contact Us</h1>
                <p className="text-gray-600 text-center mt-2">
                    Have questions? Fill out the form and we will get back to you.
                </p>
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows={4}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Send Message
                    </button>
                </form>
                {status && <p className="text-center mt-4 text-gray-700">{status}</p>}
            </div>
            
            {/* Contact Info Section */}
            <div className="mt-8 max-w-lg w-full p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-bold text-center text-blue-600">Contact Information</h2>
                <div className="flex flex-col items-center mt-4 space-y-4">
                    <a href="mailto:youremail@example.com" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                        <Mail className="w-5 h-5" />
                        <span>josh2engr+support@gmail.com</span>
                    </a>
                    <a href="tel:+1234567890" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                        <Phone className="w-5 h-5" />
                        <span>+4915234714360</span>
                    </a>
                    <a href="https://www.linkedin.com/in/joshua-onyenwere/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                    <Image src={LinkedInIcon} alt="LinkedIn" width={20} height={20} />
                        <span>LinkedIn</span>
                    </a>
                    <a href="https://github.com/chijosh" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                        <Image src={GitHubIcon}alt="GitHub" width={20} height={20}/>
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
