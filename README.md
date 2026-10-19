# SDLC Notes — Aplikasi Catatan Pelajaran SDLC

Aplikasi web interaktif untuk mempelajari **Software Development Life Cycle (SDLC)**:

- Tahapan SDLC + apa yang harus ada di nalar petugas
- Peran & pihak yang terlibat + contoh pertanyaan job interview
- Tugas-tugas di setiap tahapan
- Latihan soal interaktif
- Tanya jawab (FAQ)
- Panel Admin dengan fitur CRUD
- Opsional: simpan data pengunjung & skor latihan ke Google Sheet via Apps Script

**Warna dasar:** Biru & Cream  
**Stack:** HTML + CSS + JavaScript + JSON (siap GitHub Pages)  
**Backend opsional:** Google Apps Script + Google Sheet (otomatis)

---

## 🚀 Cara Deploy ke GitHub Pages

1. Buat repository baru di GitHub (misal: `sdlc-notes`).
2. Upload **semua file** di dalam folder ini (kecuali folder `appscript` bisa ikut atau dipisah).
3. Pastikan struktur di root repo:
   ```
   index.html
   css/style.css
   js/config.js
   js/data.js
   js/app.js
   js/admin.js
   README.md
   ```
4. Settings → Pages → Source: Deploy from branch `main` / `master`, folder `/ (root)`.
5. Tunggu beberapa menit, situs akan hidup di `https://username.github.io/sdlc-notes/`.

Aplikasi sudah bisa dipakai **tanpa backend** (data dari `js/data.js`).

---

## 🔐 Setup Backend (Google Apps Script + Sheet) — Opsional tapi direkomendasikan

### Mengapa Apps Script?
- Password admin **tidak** disimpan di GitHub.
- Sheet & header dibuat **otomatis** — Anda tidak perlu membuat kolom manual (hindari human error).
- Data pengunjung & skor latihan tersimpan aman.

### Langkah-langkah:

1. Buka [script.google.com](https://script.google.com) → **New project**.
2. Hapus kode default, lalu **paste seluruh isi** file `appscript/Code.gs`.
3. Simpan project, beri nama misalnya `SDLC Notes Backend`.
4. Di editor, pilih fungsi **`initialSetup`** di dropdown → klik **Run**.
   - Authorize akun Google Anda (izin Spreadsheet).
   - Setelah sukses, cek log: Spreadsheet otomatis dibuat + password admin disimpan di **Script Properties**.
5. **Deploy**:
   - Klik **Deploy** → **New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Deploy → salin **Web App URL**
6. Buka file `js/config.js` di repo Anda:
   ```js
   APPS_SCRIPT_URL: "https://script.google.com/macros/s/XXXX/exec",  // paste URL di sini
   USE_BACKEND: true
   ```
7. Commit & push. Selesai!

### Password Admin
- Default: **`Bismillaah`** (sesuai permintaan).
- Disimpan di **Script Properties** → tidak terlihat di kode GitHub.
- Untuk mengubah password nanti:
  1. Buka project Apps Script
  2. Project Settings (gear) → Script Properties
  3. Edit value `ADMIN_PASSWORD`

---

## 📂 Struktur File

```
sdlc-notes/
├── index.html          # Halaman utama
├── css/
│   └── style.css       # Tema biru-cream + responsive
├── js/
│   ├── config.js       # URL Apps Script (ganti setelah deploy)
│   ├── data.js         # Konten SDLC (tahapan, peran, soal, FAQ)
│   ├── app.js          # Logic utama + quiz
│   └── admin.js        # Login + CRUD admin
├── appscript/
│   └── Code.gs         # Backend Google Apps Script
└── README.md
```

---

## ✨ Fitur

| Fitur | Keterangan |
|-------|------------|
| Tahapan SDLC | 7 tahapan lengkap + deliverable + mind-map nalar |
| Peran & Interview | 8 peran (PM, BA, SA, Dev, QA, DevOps, PO, SM) + contoh Q&A interview |
| Tugas | Checklist tugas per tahapan |
| Latihan Soal | 15 soal, acak, skor, penjelasan |
| FAQ | Tanya jawab umum SDLC |
| Admin | Login, statistik, CRUD soal, lihat pengunjung |
| Keamanan | Password & secret hanya di Script Properties |

---

## 🛠️ Pengembangan Lokal

Cukup buka `index.html` di browser, atau gunakan Live Server.

Untuk testing backend, deploy Apps Script dulu lalu set `USE_BACKEND: true`.

---

## Catatan Keamanan

- **Jangan** commit password, API key, atau Spreadsheet ID yang sensitif ke GitHub.
- Semua rahasia disimpan di **Apps Script Script Properties**.
- Token admin berlaku 24 jam dan disimpan di sheet (bisa dibersihkan otomatis).

---

Dibuat untuk keperluan pembelajaran SDLC. Semoga bermanfaat!
