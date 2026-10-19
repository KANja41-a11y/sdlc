/**
 * KONFIGURASI FRONTEND
 * =====================
 * Ganti APPS_SCRIPT_URL dengan URL Web App hasil deploy Google Apps Script Anda.
 * 
 * Cara mendapatkan URL:
 * 1. Buka script.google.com → buat project baru
 * 2. Paste kode dari folder appscript/Code.gs
 * 3. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy Web App URL dan tempel di bawah ini.
 * 
 * PENTING:
 * - Password admin TIDAK disimpan di file ini / GitHub.
 * - Password disimpan di Script Properties Apps Script (lihat instruksi di Code.gs).
 * - Tidak ada API key / secret yang ter-expose di frontend.
 */
const CONFIG = {
  // Ganti dengan URL Web App Apps Script Anda setelah deploy
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbz1KadFpTo0RW_EqAlXjThCBedCD3sPJuZ_bHRzF5WFbXkjdtc8wRlLadDtDQcsobHFiA/exec",

  // Set true jika sudah deploy Apps Script dan ingin memakai backend
  USE_BACKEND: false,

  // Nama aplikasi
  APP_NAME: "SDLC Notes"
};
