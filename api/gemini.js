export default async function handler(req, res) {
    // 1. Ambil data dari body request yang dikirim oleh frontend Karen
    const { contents, systemInstruction, userApiKey } = req.body;

    // 2. Tentukan API Key yang akan digunakan
    // Jika user memasukkan kunci di layar login, gunakan kunci itu. 
    // Jika kosong, gunakan API Key milik Anda yang ada di Environment Variable Vercel.
    const apiKeyToUse = userApiKey || process.env.GEMINI_API_KEY;

    if (!apiKeyToUse) {
        return res.status(400).json({
            error: { message: "API Key tidak ditemukan! Sistem membutuhkan akses enkripsi." }
        });
    }

    // 3. Alamat URL resmi Google Gemini API
    const googleApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKeyToUse}`;

    try {
        // 4. Tembak ke Google Gemini menggunakan API Key yang sudah ditentukan
        const googleResponse = await fetch(googleApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: contents,
                systemInstruction: systemInstruction
            })
        });

        const data = await googleResponse.json();
        
        // 5. Kembalikan hasilnya ke frontend Karen
        return res.status(googleResponse.status).json(data);

    } catch (error) {
        console.error("Backend Error:", error);
        return res.status(500).json({ error: { message: "Gagal menghubungkan ke sirkuit pusat." } });
    }
}
