export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method tidak diizinkan' });

    const apiKey = process.env.GEMINI_API_KEY;
    
    // Kita gunakan model yang paling standar: gemini-1.5-flash
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

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
```

### 2. Lakukan "FORCE REDEPLOY" (Wajib!)
Setelah meng-upload kode di atas ke GitHub (ingat, di dalam folder `api/`), Anda **WAJIB** melakukan ini agar Vercel tidak memakai kode lama:

1. Buka dasbor Vercel Anda.
2. Klik tab **Deployments** (di menu kiri).
3. Klik titik tiga (`...`) di baris teratas.
4. Klik **Redeploy**.
5. **PENTING:** Saat muncul jendela konfirmasi, **JANGAN** centang kotak *"Use existing build cache"*. Pastikan kotak itu **KOSONG**.
6. Klik tombol **Redeploy**.

### 3. Lihat Error di Log
Setelah Deploy selesai, coba sapa Karen lagi. Jika dia masih bilang "Modul logika error", **segera buka tab Logs di Vercel** (di menu kiri).

Kali ini, cari baris yang bertuliskan:
`DEBUG ERROR DARI GOOGLE: ...`

**Kirimkan tulisan merah tersebut ke sini.** Tulisan itu akan mengungkap apakah API Key Anda salah, limit API habis, atau ada masalah lain. Kita pasti bisa selesaikan ini!
