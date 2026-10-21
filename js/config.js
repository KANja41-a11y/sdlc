/**
 * KONFIGURASI FRONTEND
 * =====================
 * URL Apps Script sudah diisi sesuai deployment Anda.
 * 
 * PENTING:
 * - Setelah update Code.gs di script.google.com, wajib:
 *   1. Jalankan initialSetup() sekali
 *   2. Deploy → Manage deployments → Edit → Version: New version → Deploy
 * - Password admin TIDAK disimpan di file ini / GitHub.
 * - Password disimpan di Script Properties Apps Script.
 */
const CONFIG = {
  // URL Web App Apps Script Anda
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbz1KadFpTo0RW_EqAlXjThCBedCD3sPJuZ_bHRzF5WFbXkjdtc8wRlLadDtDQcsobHFiA/exec",

  // true = simpan ke Google Sheet | false = hanya sesi browser
  USE_BACKEND: true,

  // Nama aplikasi
  APP_NAME: "SDLC Notes"
};
