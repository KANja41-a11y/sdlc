/**
 * SDLC Notes - Main Application Logic
 */
(function () {
  "use strict";

  // ===== State =====
  let currentStageId = null;
  let currentRoleId = null;
  let quizState = {
    questions: [],
    currentIndex: 0,
    score: 0,
    answered: false
  };

  // ===== Init =====
  document.addEventListener("DOMContentLoaded", () => {
    renderStages();
    renderRoles();
    renderTasks();
    renderFAQs();
    setupNavigation();
    setupQuiz();
    logVisitor("beranda");
  });

  // ===== Navigation =====
  function setupNavigation() {
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("navMenu");
    const links = document.querySelectorAll(".nav-link");

    toggle?.addEventListener("click", () => {
      menu.classList.toggle("open");
    });

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        links.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
        menu.classList.remove("open");
        const section = link.getAttribute("href")?.replace("#", "");
        if (section) logVisitor(section);
      });
    });

    // Highlight on scroll
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach((sec) => {
        if (window.scrollY >= sec.offsetTop - 100) {
          current = sec.getAttribute("id");
        }
      });
      links.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
      });
    });
  }

  // ===== Stages =====
  function renderStages() {
    const container = document.getElementById("timelineContainer");
    if (!container) return;

    container.innerHTML = SDLC_DATA.stages
      .map(
        (s) => `
      <div class="timeline-item" data-id="${s.id}">
        <div class="num">${s.id}</div>
        <div class="title">${s.short}</div>
      </div>
    `
      )
      .join("");

    container.querySelectorAll(".timeline-item").forEach((el) => {
      el.addEventListener("click", () => {
        const id = parseInt(el.dataset.id, 10);
        showStageDetail(id);
        container.querySelectorAll(".timeline-item").forEach((i) => i.classList.remove("active"));
        el.classList.add("active");
      });
    });
  }

  function showStageDetail(id) {
    const stage = SDLC_DATA.stages.find((s) => s.id === id);
    if (!stage) return;
    currentStageId = id;

    const detail = document.getElementById("stageDetail");
    detail.innerHTML = `
      <h3>${stage.id}. ${stage.title}</h3>
      <p>${stage.description}</p>
      <h4 style="margin-top:1.25rem;font-size:1rem;">Deliverable utama</h4>
      <div style="margin:0.5rem 0 1rem;">
        ${stage.deliverables.map((d) => `<span class="tag">${d}</span>`).join("")}
      </div>
      <h4 style="font-size:1rem;">Tugas yang harus dilakukan</h4>
      <ul>
        ${stage.tasks.map((t) => `<li>${t}</li>`).join("")}
      </ul>
      <div style="margin-top:1.25rem;padding:1rem;background:var(--blue-50);border-radius:8px;">
        <strong>💡 Yang harus ada di nalar:</strong><br>
        ${stage.mindMap}
      </div>
    `;
  }

  // ===== Roles =====
  function renderRoles() {
    const grid = document.getElementById("rolesGrid");
    if (!grid) return;

    grid.innerHTML = SDLC_DATA.roles
      .map(
        (r) => `
      <div class="role-card" data-id="${r.id}">
        <div class="icon">${r.icon}</div>
        <h4>${r.name}</h4>
        <p>${r.shortDesc}</p>
      </div>
    `
      )
      .join("");

    grid.querySelectorAll(".role-card").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.dataset.id;
        showRoleDetail(id);
        grid.querySelectorAll(".role-card").forEach((c) => c.classList.remove("active"));
        el.classList.add("active");
      });
    });
  }

  function showRoleDetail(id) {
    const role = SDLC_DATA.roles.find((r) => r.id === id);
    if (!role) return;
    currentRoleId = id;

    const detail = document.getElementById("roleDetail");
    detail.style.display = "block";
    detail.innerHTML = `
      <h3>${role.icon} ${role.name}</h3>
      <p style="margin-bottom:1rem;">${role.shortDesc}</p>
      <h4 style="font-size:1rem;margin-bottom:0.5rem;">Tanggung Jawab Utama</h4>
      <ul style="margin-bottom:1.5rem;">
        ${role.responsibilities.map((r) => `<li>${r}</li>`).join("")}
      </ul>
      <h4 style="font-size:1rem;margin-bottom:0.75rem;">Contoh Pertanyaan Interview</h4>
      ${role.interviewQuestions
        .map(
          (iq) => `
        <div class="interview-q">
          <div class="q">❓ ${iq.q}</div>
          <div class="a">💬 ${iq.a}</div>
        </div>
      `
        )
        .join("")}
    `;
    detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // ===== Tasks =====
  function renderTasks() {
    const container = document.getElementById("tasksContainer");
    if (!container) return;

    container.innerHTML = SDLC_DATA.stages
      .map(
        (s) => `
      <div class="task-stage">
        <div class="task-stage-header">
          <span>${s.id}.</span> ${s.title}
        </div>
        <ul class="task-list">
          ${s.tasks.map((t) => `<li>${t}</li>`).join("")}
        </ul>
      </div>
    `
      )
      .join("");
  }

  // ===== FAQ =====
  function renderFAQs() {
    const list = document.getElementById("faqList");
    if (!list) return;

    list.innerHTML = SDLC_DATA.faqs
      .map(
        (f, i) => `
      <div class="faq-item" data-index="${i}">
        <button class="faq-question">
          ${f.q}
          <span class="icon">▼</span>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">${f.a}</div>
        </div>
      </div>
    `
      )
      .join("");

    list.querySelectorAll(".faq-item").forEach((item) => {
      item.querySelector(".faq-question").addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        list.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
        if (!isOpen) item.classList.add("open");
      });
    });
  }

  // ===== Quiz =====
  function setupQuiz() {
    document.getElementById("startQuizBtn")?.addEventListener("click", startQuiz);
    document.getElementById("nextQuizBtn")?.addEventListener("click", nextQuestion);
    document.getElementById("retryQuizBtn")?.addEventListener("click", () => {
      document.getElementById("quizResult").style.display = "none";
      document.getElementById("quizSetup").style.display = "block";
    });
    document.getElementById("saveScoreBtn")?.addEventListener("click", saveQuizScore);
  }

  function startQuiz() {
    const count = parseInt(document.getElementById("quizCount").value, 10) || 10;
    const shuffled = [...SDLC_DATA.quizzes].sort(() => Math.random() - 0.5);
    quizState.questions = shuffled.slice(0, Math.min(count, shuffled.length));
    quizState.currentIndex = 0;
    quizState.score = 0;
    quizState.answered = false;

    document.getElementById("quizSetup").style.display = "none";
    document.getElementById("quizResult").style.display = "none";
    document.getElementById("quizArea").style.display = "block";
    showQuestion();
  }

  function showQuestion() {
    const q = quizState.questions[quizState.currentIndex];
    if (!q) return;

    const total = quizState.questions.length;
    const idx = quizState.currentIndex + 1;
    document.getElementById("quizCounter").textContent = `Soal ${idx} / ${total}`;
    document.getElementById("quizProgress").style.width = `${(idx / total) * 100}%`;
    document.getElementById("quizQuestion").textContent = q.question;
    document.getElementById("quizFeedback").style.display = "none";
    document.getElementById("nextQuizBtn").style.display = "none";
    quizState.answered = false;

    const opts = document.getElementById("quizOptions");
    opts.innerHTML = q.options
      .map(
        (opt, i) => `
      <div class="quiz-opt" data-index="${i}">${String.fromCharCode(65 + i)}. ${opt}</div>
    `
      )
      .join("");

    opts.querySelectorAll(".quiz-opt").forEach((el) => {
      el.addEventListener("click", () => selectAnswer(parseInt(el.dataset.index, 10)));
    });
  }

  function selectAnswer(selectedIndex) {
    if (quizState.answered) return;
    quizState.answered = true;

    const q = quizState.questions[quizState.currentIndex];
    const opts = document.querySelectorAll(".quiz-opt");
    const feedback = document.getElementById("quizFeedback");

    opts.forEach((el, i) => {
      el.style.pointerEvents = "none";
      if (i === q.correct) el.classList.add("correct");
      if (i === selectedIndex && i !== q.correct) el.classList.add("wrong");
      if (i === selectedIndex) el.classList.add("selected");
    });

    if (selectedIndex === q.correct) {
      quizState.score++;
      feedback.className = "quiz-feedback correct";
      feedback.textContent = "✅ Benar! " + (q.explanation || "");
    } else {
      feedback.className = "quiz-feedback wrong";
      feedback.textContent =
        "❌ Salah. Jawaban benar: " +
        String.fromCharCode(65 + q.correct) +
        ". " +
        (q.explanation || "");
    }
    feedback.style.display = "block";
    document.getElementById("nextQuizBtn").style.display = "inline-flex";
  }

  function nextQuestion() {
    quizState.currentIndex++;
    if (quizState.currentIndex >= quizState.questions.length) {
      showQuizResult();
    } else {
      showQuestion();
    }
  }

  function showQuizResult() {
    document.getElementById("quizArea").style.display = "none";
    const result = document.getElementById("quizResult");
    result.style.display = "block";

    const total = quizState.questions.length;
    const pct = Math.round((quizState.score / total) * 100);
    document.getElementById("scoreCircle").textContent = pct + "%";
    document.getElementById("scoreText").textContent =
      `Anda benar ${quizState.score} dari ${total} soal. ` +
      (pct >= 80 ? "Excellent! 🎉" : pct >= 60 ? "Bagus, terus tingkatkan!" : "Ayo pelajari lagi materinya.");
  }

  async function saveQuizScore() {
    if (!CONFIG.USE_BACKEND || !CONFIG.APPS_SCRIPT_URL.includes("script.google.com")) {
      alert("Backend belum dikonfigurasi. Set USE_BACKEND=true dan isi APPS_SCRIPT_URL di js/config.js setelah deploy Apps Script.");
      return;
    }
    try {
      const res = await fetch(CONFIG.APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          action: "saveQuizResult",
          score: quizState.score,
          total: quizState.questions.length,
          percentage: Math.round((quizState.score / quizState.questions.length) * 100)
        })
      });
      const data = await res.json();
      if (data.success) {
        alert("Skor berhasil disimpan. Terima kasih!");
      } else {
        alert("Gagal menyimpan: " + (data.message || "Unknown error"));
      }
    } catch (e) {
      console.error(e);
      alert("Gagal terhubung ke server. Periksa koneksi atau konfigurasi Apps Script.");
    }
  }

  // ===== Visitor Log (opsional) =====
  async function logVisitor(page) {
    if (!CONFIG.USE_BACKEND || !CONFIG.APPS_SCRIPT_URL.includes("script.google.com")) return;
    try {
      await fetch(CONFIG.APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          action: "logVisitor",
          page: page || "unknown",
          userAgent: navigator.userAgent.substring(0, 200)
        })
      });
    } catch (e) {
      // silent fail
    }
  }

  // Expose for admin
  window.SDLC_APP = {
    getData: () => SDLC_DATA,
    logVisitor
  };
})();
