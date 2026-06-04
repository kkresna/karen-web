// ... existing code ...
module.exports = async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method tidak diizinkan' });

    const apiKey = process.env.GEMINI_API_KEY;
    
    // Kita gunakan model gemini-1.5-flash-latest
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body) 
        });
        
        const data = await response.json();
        
        // JIKA ERROR DARI GOOGLE, KITA CETAK KE LOG VERCEL SUPAYA BISA DIBACA
        if (data.error) {
            console.error("DEBUG ERROR DARI GOOGLE:", JSON.stringify(data.error));
            return res.status(500).json({ error: 'Error dari Google: ' + data.error.message });
        }
        
        res.status(200).json(data);
    } catch (error) {
        console.error("DEBUG ERROR FETCH:", error);
        res.status(500).json({ error: 'Gagal menghubungi otak utama Karen.' });
    }
}
