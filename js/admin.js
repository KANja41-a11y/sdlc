/**
 * Admin Panel Logic
 * Login & CRUD berkomunikasi dengan Google Apps Script.
 * Password diverifikasi di server (Script Properties), tidak pernah disimpan di frontend.
 */
(function () {
  "use strict";

  let adminToken = sessionStorage.getItem("sdlc_admin_token") || null;

  document.addEventListener("DOMContentLoaded", () => {
    if (adminToken) {
      showAdminPanel();
    }
    setupLogin();
    setupTabs();
    setupCRUD();
  });

  function setupLogin() {
    const form = document.getElementById("loginForm");
    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const password = document.getElementById("adminPassword").value;
      const errorEl = document.getElementById("loginError");
      errorEl.style.display = "none";

      if (!CONFIG.USE_BACKEND || !CONFIG.APPS_SCRIPT_URL.includes("script.google.com")) {
        // Mode offline / demo: cek password lokal HANYA untuk development.
        // Di production WAJIB pakai backend.
        if (password === "Bismillaah") {
          adminToken = "demo-token-" + Date.now();
          sessionStorage.setItem("sdlc_admin_token", adminToken);
          showAdminPanel();
          loadDemoStats();
        } else {
          errorEl.textContent = "Password salah.";
          errorEl.style.display = "block";
        }
        return;
      }

      try {
        const res = await fetch(CONFIG.APPS_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({ action: "login", password })
        });
        const data = await res.json();
        if (data.success && data.token) {
          adminToken = data.token;
          sessionStorage.setItem("sdlc_admin_token", adminToken);
          showAdminPanel();
          loadAdminData();
        } else {
          errorEl.textContent = data.message || "Password salah.";
          errorEl.style.display = "block";
        }
      } catch (err) {
        console.error(err);
        errorEl.textContent = "Gagal terhubung ke server. Pastikan Apps Script sudah di-deploy dengan benar.";
        errorEl.style.display = "block";
      }
    });

    document.getElementById("logoutBtn")?.addEventListener("click", () => {
      adminToken = null;
      sessionStorage.removeItem("sdlc_admin_token");
      document.getElementById("adminLogin").style.display = "flex";
      document.getElementById("adminPanel").style.display = "none";
      document.getElementById("adminPassword").value = "";
    });
  }

  function showAdminPanel() {
    document.getElementById("adminLogin").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";

    // Tampilkan status backend
    let statusEl = document.getElementById("backendStatus");
    if (!statusEl) {
      const header = document.querySelector(".admin-header");
      if (header) {
        statusEl = document.createElement("div");
        statusEl.id = "backendStatus";
        statusEl.style.cssText = "font-size:0.85rem;margin-top:0.5rem;";
        header.parentNode.insertBefore(statusEl, header.nextSibling);
      }
    }
    if (statusEl) {
      const backendOn =
        CONFIG.USE_BACKEND &&
        CONFIG.APPS_SCRIPT_URL &&
        CONFIG.APPS_SCRIPT_URL.includes("script.google.com") &&
        adminToken &&
        !String(adminToken).startsWith("demo-token-");

      if (backendOn) {
        statusEl.innerHTML =
          '<span style="color:#059669;font-weight:600;">● Backend aktif</span> — perubahan akan disimpan permanen ke Google Sheet.';
      } else {
        statusEl.innerHTML =
          '<span style="color:#d97706;font-weight:600;">● Mode sesi saja</span> — aktifkan Apps Script di <code>js/config.js</code> agar data tersimpan permanen.';
      }
    }
  }

  function setupTabs() {
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach((c) => (c.style.display = "none"));
        btn.classList.add("active");
        const tab = btn.dataset.tab;
        const el = document.getElementById("tab-" + tab);
        if (el) el.style.display = "block";
        if (tab === "stats" || tab === "visitors") loadAdminData();
        if (tab === "content") renderContentTable();
        if (tab === "quizzes") renderQuizTable();
      });
    });
  }

  async function loadAdminData() {
    if (!CONFIG.USE_BACKEND || !adminToken) {
      loadDemoStats();
      return;
    }
    try {
      const res = await fetch(CONFIG.APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: "getStats", token: adminToken })
      });
      const data = await res.json();
      if (data.success) {
        document.getElementById("totalVisitors").textContent = data.totalVisitors ?? 0;
        document.getElementById("totalQuizzes").textContent = data.totalQuizzes ?? 0;
        document.getElementById("avgScore").textContent =
          (data.avgScore != null ? data.avgScore + "%" : "-");
        if (data.visitors) renderVisitorTable(data.visitors);
      }
    } catch (e) {
      console.error(e);
      loadDemoStats();
    }
  }

  function loadDemoStats() {
    document.getElementById("totalVisitors").textContent = "—";
    document.getElementById("totalQuizzes").textContent = "—";
    document.getElementById("avgScore").textContent = "—";
    const tbody = document.querySelector("#visitorTable tbody");
    if (tbody) {
      tbody.innerHTML =
        '<tr><td colspan="3" style="text-align:center;color:var(--text-muted);">Aktifkan backend (Apps Script) untuk melihat data pengunjung.</td></tr>';
    }
  }

  function renderVisitorTable(visitors) {
    const tbody = document.querySelector("#visitorTable tbody");
    if (!tbody) return;
    if (!visitors || visitors.length === 0) {
      tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Belum ada data.</td></tr>';
      return;
    }
    tbody.innerHTML = visitors
      .slice(0, 50)
      .map(
        (v) => `
      <tr>
        <td>${v.timestamp || "-"}</td>
        <td>${v.page || "-"}</td>
        <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${v.userAgent || "-"}</td>
      </tr>
    `
      )
      .join("");
  }

  // ===== Content CRUD (local + optional backend) =====
  function renderContentTable() {
    const tbody = document.querySelector("#contentTable tbody");
    if (!tbody) return;
    const rows = [
      ...SDLC_DATA.stages.map((s) => ({ id: "stage-" + s.id, type: "Tahapan", title: s.title })),
      ...SDLC_DATA.roles.map((r) => ({ id: "role-" + r.id, type: "Peran", title: r.name }))
    ];
    tbody.innerHTML = rows
      .map(
        (r) => `
      <tr>
        <td>${r.id}</td>
        <td>${r.type}</td>
        <td>${r.title}</td>
        <td class="actions">
          <button class="btn btn-sm btn-secondary" data-edit="${r.id}">Edit</button>
        </td>
      </tr>
    `
      )
      .join("");

    tbody.querySelectorAll("[data-edit]").forEach((btn) => {
      btn.addEventListener("click", () => openEditContent(btn.dataset.edit));
    });
  }

  function openEditContent(id) {
    const isStage = id.startsWith("stage-");
    const realId = id.replace("stage-", "").replace("role-", "");
    let item, type;
    if (isStage) {
      item = SDLC_DATA.stages.find((s) => String(s.id) === realId);
      type = "stage";
    } else {
      item = SDLC_DATA.roles.find((r) => r.id === realId);
      type = "role";
    }
    if (!item) return;

    document.getElementById("modalTitle").textContent = "Edit " + (isStage ? "Tahapan" : "Peran");
    document.getElementById("crudId").value = id;
    document.getElementById("crudType").value = type;

    const fields = document.getElementById("crudFields");
    if (type === "stage") {
      fields.innerHTML = `
        <div class="form-group">
          <label>Judul</label>
          <input type="text" id="f_title" value="${escapeHtml(item.title)}" required>
        </div>
        <div class="form-group">
          <label>Deskripsi</label>
          <textarea id="f_desc" required>${escapeHtml(item.description)}</textarea>
        </div>
        <div class="form-group">
          <label>Mind Map / Nalar</label>
          <textarea id="f_mind">${escapeHtml(item.mindMap || "")}</textarea>
        </div>
      `;
    } else {
      fields.innerHTML = `
        <div class="form-group">
          <label>Nama Peran</label>
          <input type="text" id="f_title" value="${escapeHtml(item.name)}" required>
        </div>
        <div class="form-group">
          <label>Deskripsi Singkat</label>
          <textarea id="f_desc" required>${escapeHtml(item.shortDesc)}</textarea>
        </div>
      `;
    }
    document.getElementById("crudModal").style.display = "flex";
  }

  // ===== Quiz CRUD =====
  function renderQuizTable() {
    const tbody = document.querySelector("#quizTable tbody");
    if (!tbody) return;
    tbody.innerHTML = SDLC_DATA.quizzes
      .map(
        (q) => `
      <tr>
        <td>${q.id}</td>
        <td style="max-width:280px;">${escapeHtml(q.question)}</td>
        <td>${String.fromCharCode(65 + q.correct)}</td>
        <td class="actions">
          <button class="btn btn-sm btn-secondary" data-edit-quiz="${q.id}">Edit</button>
          <button class="btn btn-sm btn-danger" data-del-quiz="${q.id}">Hapus</button>
        </td>
      </tr>
    `
      )
      .join("");

    tbody.querySelectorAll("[data-edit-quiz]").forEach((btn) => {
      btn.addEventListener("click", () => openEditQuiz(parseInt(btn.dataset.editQuiz, 10)));
    });
    tbody.querySelectorAll("[data-del-quiz]").forEach((btn) => {
      btn.addEventListener("click", () => deleteQuiz(parseInt(btn.dataset.delQuiz, 10)));
    });
  }

  function openEditQuiz(id) {
    const q = SDLC_DATA.quizzes.find((x) => x.id === id);
    const isNew = !q;
    document.getElementById("modalTitle").textContent = isNew ? "Tambah Soal" : "Edit Soal";
    document.getElementById("crudId").value = isNew ? "" : id;
    document.getElementById("crudType").value = "quiz";

    const fields = document.getElementById("crudFields");
    fields.innerHTML = `
      <div class="form-group">
        <label>Pertanyaan</label>
        <textarea id="f_question" required>${q ? escapeHtml(q.question) : ""}</textarea>
      </div>
      <div class="form-group">
        <label>Opsi A</label>
        <input type="text" id="f_opt0" value="${q ? escapeHtml(q.options[0]) : ""}" required>
      </div>
      <div class="form-group">
        <label>Opsi B</label>
        <input type="text" id="f_opt1" value="${q ? escapeHtml(q.options[1]) : ""}" required>
      </div>
      <div class="form-group">
        <label>Opsi C</label>
        <input type="text" id="f_opt2" value="${q ? escapeHtml(q.options[2]) : ""}" required>
      </div>
      <div class="form-group">
        <label>Opsi D</label>
        <input type="text" id="f_opt3" value="${q ? escapeHtml(q.options[3]) : ""}" required>
      </div>
      <div class="form-group">
        <label>Jawaban Benar</label>
        <select id="f_correct">
          <option value="0" ${q && q.correct === 0 ? "selected" : ""}>A</option>
          <option value="1" ${q && q.correct === 1 ? "selected" : ""}>B</option>
          <option value="2" ${q && q.correct === 2 ? "selected" : ""}>C</option>
          <option value="3" ${q && q.correct === 3 ? "selected" : ""}>D</option>
        </select>
      </div>
      <div class="form-group">
        <label>Penjelasan (opsional)</label>
        <textarea id="f_expl">${q ? escapeHtml(q.explanation || "") : ""}</textarea>
      </div>
    `;
    document.getElementById("crudModal").style.display = "flex";
  }

  function deleteQuiz(id) {
    if (!confirm("Hapus soal ini?")) return;
    const idx = SDLC_DATA.quizzes.findIndex((q) => q.id === id);
    if (idx >= 0) {
      SDLC_DATA.quizzes.splice(idx, 1);
      renderQuizTable();
      // Optional: sync to backend
      syncQuizToBackend();
    }
  }

  function setupCRUD() {
    document.getElementById("addContentBtn")?.addEventListener("click", () => {
      alert("Untuk menambah tahapan/peran baru, edit file js/data.js atau perluas fitur backend. Saat ini fokus edit yang sudah ada & kelola soal.");
    });
    document.getElementById("addQuizBtn")?.addEventListener("click", () => openEditQuiz(null));

    document.getElementById("modalClose")?.addEventListener("click", closeModal);
    document.getElementById("modalCancel")?.addEventListener("click", closeModal);

    document.getElementById("crudForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const type = document.getElementById("crudType").value;
      const id = document.getElementById("crudId").value;
      const submitBtn = e.target.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Menyimpan...";
      }

      try {
        if (type === "stage") {
          const stage = SDLC_DATA.stages.find((s) => "stage-" + s.id === id);
          if (stage) {
            stage.title = document.getElementById("f_title").value;
            stage.description = document.getElementById("f_desc").value;
            stage.mindMap = document.getElementById("f_mind").value;
          }
          // Re-render stage detail if currently shown
          if (window.SDLC_APP && typeof window.SDLC_APP.refreshStages === "function") {
            window.SDLC_APP.refreshStages();
          }
        } else if (type === "role") {
          const role = SDLC_DATA.roles.find((r) => "role-" + r.id === id);
          if (role) {
            role.name = document.getElementById("f_title").value;
            role.shortDesc = document.getElementById("f_desc").value;
          }
          if (window.SDLC_APP && typeof window.SDLC_APP.refreshRoles === "function") {
            window.SDLC_APP.refreshRoles();
          }
        } else if (type === "quiz") {
          const question = document.getElementById("f_question").value;
          const options = [
            document.getElementById("f_opt0").value,
            document.getElementById("f_opt1").value,
            document.getElementById("f_opt2").value,
            document.getElementById("f_opt3").value
          ];
          const correct = parseInt(document.getElementById("f_correct").value, 10);
          const explanation = document.getElementById("f_expl").value;

          if (id) {
            const q = SDLC_DATA.quizzes.find((x) => x.id === parseInt(id, 10));
            if (q) {
              q.question = question;
              q.options = options;
              q.correct = correct;
              q.explanation = explanation;
            }
          } else {
            const newId = SDLC_DATA.quizzes.reduce((m, q) => Math.max(m, q.id), 0) + 1;
            SDLC_DATA.quizzes.push({ id: newId, question, options, correct, explanation });
          }
          renderQuizTable();
        }

        // Coba simpan ke backend jika aktif
        const saved = await persistToBackend(type);
        closeModal();

        if (saved === true) {
          alert("✅ Perubahan berhasil disimpan permanen ke Google Sheet.");
        } else if (saved === "no-backend") {
          alert(
            "⚠️ Perubahan disimpan di sesi browser ini saja.\n\n" +
            "Agar permanen, aktifkan backend:\n" +
            "1. Deploy Apps Script (lihat README)\n" +
            "2. Isi APPS_SCRIPT_URL di js/config.js\n" +
            "3. Set USE_BACKEND = true\n" +
            "Lalu login admin lagi dan simpan ulang."
          );
        } else {
          alert(
            "⚠️ Perubahan tersimpan di sesi ini, tapi gagal sync ke server.\n" +
            "Periksa koneksi / URL Apps Script / token login.\n\n" +
            "Detail: " + (saved || "unknown error")
          );
        }
      } catch (err) {
        console.error(err);
        alert("Terjadi error saat menyimpan: " + (err.message || err));
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Simpan";
        }
      }
    });
  }

  function closeModal() {
    document.getElementById("crudModal").style.display = "none";
  }

  /**
   * Simpan data ke Google Sheet via Apps Script.
   * Return: true = sukses, "no-backend" = backend belum aktif, string = pesan error
   */
  async function persistToBackend(type) {
    if (!CONFIG.USE_BACKEND || !CONFIG.APPS_SCRIPT_URL || !CONFIG.APPS_SCRIPT_URL.includes("script.google.com")) {
      return "no-backend";
    }
    if (!adminToken || String(adminToken).startsWith("demo-token-")) {
      return "no-backend";
    }

    try {
      if (type === "quiz") {
        const res = await fetch(CONFIG.APPS_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({
            action: "saveQuizzes",
            token: adminToken,
            quizzes: SDLC_DATA.quizzes
          })
        });
        const data = await res.json();
        if (data.success) return true;
        return data.message || "Gagal menyimpan soal";
      }

      // Simpan tahapan & peran sebagai content snapshot
      if (type === "stage" || type === "role") {
        const res = await fetch(CONFIG.APPS_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({
            action: "saveContent",
            token: adminToken,
            stages: SDLC_DATA.stages,
            roles: SDLC_DATA.roles
          })
        });
        const data = await res.json();
        if (data.success) return true;
        return data.message || "Gagal menyimpan konten";
      }

      return true;
    } catch (e) {
      console.warn("persistToBackend error", e);
      return e.message || "Network error";
    }
  }

  async function syncQuizToBackend() {
    const result = await persistToBackend("quiz");
    if (result === true) {
      // silent success
    } else if (result !== "no-backend") {
      console.warn("Sync quiz gagal:", result);
    }
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
