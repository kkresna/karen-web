// File: api/gemini.js

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method tidak diizinkan' });

    const apiKey = process.env.GEMINI_API_KEY;
    
    // PERUBAHAN DI SINI: Menggunakan model gemini-1.5-flash yang paling stabil dan didukung semua API Key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body) 
        });
        const data = await response.json();
        
        // Logika untuk menangkap pesan error asli dari Google jika API Key salah
        if (data.error) {
            console.error("Error dari Google:", data.error);
        }
        
        res.status(200).json(data);
    } catch (error) {
        console.error("Error Fetch:", error);
        res.status(500).json({ error: 'Gagal menghubungi otak utama Karen.' });
    }
}