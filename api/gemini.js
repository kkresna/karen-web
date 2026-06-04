// File: api/gemini.js

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method tidak diizinkan' });

    // Mengambil API Key dari "brankas" Vercel
    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body) 
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Gagal menghubungi otak utama Karen.' });
    }
}