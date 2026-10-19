/**
 * Data default SDLC Notes
 * Konten ini bisa di-override / dilengkapi dari Google Sheet via Apps Script
 */
const SDLC_DATA = {
  stages: [
    {
      id: 1,
      title: "Perencanaan (Planning)",
      short: "Planning",
      description: "Tahap awal di mana tujuan proyek, ruang lingkup, sumber daya, jadwal, anggaran, dan risiko diidentifikasi. Memastikan proyek memiliki arah yang jelas sebelum masuk ke tahap teknis.",
      deliverables: ["Project Charter", "Roadmap / Timeline", "Estimasi anggaran & resource", "Risk Register awal"],
      tasks: [
        "Identifikasi tujuan bisnis dan stakeholder",
        "Menentukan ruang lingkup (scope) proyek",
        "Membuat estimasi waktu, biaya, dan tenaga",
        "Analisis risiko awal dan mitigasi",
        "Menyusun project charter / proposal"
      ],
      mindMap: "Selalu tanya: Mengapa proyek ini dikerjakan? Siapa yang diuntungkan? Apa batasan waktu & biaya?"
    },
    {
      id: 2,
      title: "Analisis Kebutuhan (Requirement Analysis)",
      short: "Analysis",
      description: "Pengumpulan dan analisis kebutuhan fungsional maupun non-fungsional dari pengguna dan stakeholder. Hasilnya didokumentasikan dalam SRS (Software Requirement Specification) atau User Stories.",
      deliverables: ["SRS / BRD / FRD", "Use Case Diagram", "User Stories + Acceptance Criteria", "Requirement Traceability Matrix"],
      tasks: [
        "Interview stakeholder & workshop kebutuhan",
        "Membedakan functional vs non-functional requirements",
        "Dokumentasi kebutuhan yang jelas dan terukur",
        "Validasi & prioritisasi requirement",
        "Membuat use case / user story"
      ],
      mindMap: "Kebutuhan harus SMART: Specific, Measurable, Achievable, Relevant, Time-bound. Jangan asumsikan — konfirmasi selalu."
    },
    {
      id: 3,
      title: "Desain Sistem (Design)",
      short: "Design",
      description: "Membuat blueprint sistem: arsitektur, struktur data, UI/UX, antarmuka, dan alur proses. Menjadi panduan teknis bagi developer sebelum coding dimulai.",
      deliverables: ["System Architecture Diagram", "Database Design (ERD)", "UI/UX Wireframe & Prototype", "API Specification", "Detailed Design Document"],
      tasks: [
        "Merancang arsitektur high-level & low-level",
        "Desain database & data flow",
        "Membuat wireframe / mockup UI",
        "Menentukan technology stack",
        "Review desain dengan stakeholder & technical lead"
      ],
      mindMap: "Design yang baik mengurangi rework. Pikirkan scalability, security, dan maintainability sejak awal."
    },
    {
      id: 4,
      title: "Implementasi / Coding (Development)",
      short: "Coding",
      description: "Pengembang menulis kode berdasarkan dokumen desain. Kode sumber dihasilkan dan siap diuji. Mengikuti coding standard dan version control.",
      deliverables: ["Source Code", "Unit Test", "Code Review Report", "Build Artifact"],
      tasks: [
        "Menulis kode sesuai desain & coding standard",
        "Menggunakan version control (Git)",
        "Melakukan unit testing",
        "Code review antar rekan",
        "Integrasi modul secara bertahap"
      ],
      mindMap: "Clean code > clever code. Tulis kode yang bisa dipahami orang lain 6 bulan kemudian."
    },
    {
      id: 5,
      title: "Pengujian (Testing)",
      short: "Testing",
      description: "Memverifikasi bahwa software berfungsi sesuai requirement. Meliputi unit, integration, system, dan User Acceptance Testing (UAT). Bug diperbaiki sebelum rilis.",
      deliverables: ["Test Plan", "Test Cases", "Bug Report", "Test Summary Report", "UAT Sign-off"],
      tasks: [
        "Menyusun test plan & test case",
        "Melakukan functional, integration, & regression testing",
        "Mencatat dan tracking defect",
        "Koordinasi UAT dengan end-user",
        "Memastikan coverage & kualitas sebelum release"
      ],
      mindMap: "Testing bukan mencari bug saja, tapi membuktikan software memenuhi requirement dan siap pakai."
    },
    {
      id: 6,
      title: "Deployment / Penerapan",
      short: "Deployment",
      description: "Melepaskan software ke lingkungan produksi agar bisa digunakan pengguna. Termasuk setup infrastruktur, migrasi data, dan go-live.",
      deliverables: ["Deployment Plan", "Release Notes", "Production Environment", "Rollback Plan"],
      tasks: [
        "Menyiapkan environment production / staging",
        "Migrasi data (jika ada)",
        "Melakukan deployment & smoke test",
        "Menyiapkan dokumentasi user & training",
        "Go-live & monitoring awal"
      ],
      mindMap: "Selalu siapkan rollback plan. Deployment yang sukses = minimal downtime + komunikasi yang jelas."
    },
    {
      id: 7,
      title: "Pemeliharaan (Maintenance)",
      short: "Maintenance",
      description: "Setelah rilis, software terus dipelihara: perbaikan bug, update fitur, optimasi performa, dan adaptasi terhadap perubahan kebutuhan atau lingkungan.",
      deliverables: ["Change Request", "Patch / Hotfix", "Version Update", "Support Log"],
      tasks: [
        "Menangani bug report & incident",
        "Melakukan enhancement / change request",
        "Monitoring performa & keamanan",
        "Update dokumentasi & knowledge base",
        "Perencanaan upgrade / end-of-life"
      ],
      mindMap: "Maintenance sering memakan 60-80% total cost of ownership. Desain yang baik membuat maintenance lebih murah."
    }
  ],

  roles: [
    {
      id: "pm",
      name: "Project Manager (PM)",
      icon: "📋",
      shortDesc: "Mengelola keseluruhan proyek: waktu, anggaran, scope, dan risiko.",
      responsibilities: [
        "Menyusun & mengontrol jadwal, budget, scope",
        "Koordinasi antar stakeholder & tim",
        "Manajemen risiko dan issue",
        "Reporting progress ke manajemen / client",
        "Memastikan deliverable sesuai quality gate"
      ],
      interviewQuestions: [
        {
          q: "Bagaimana Anda menangani scope creep di tengah proyek?",
          a: "Dokumentasikan change request, evaluasi dampak ke time/cost/quality, diskusikan dengan stakeholder, dan putuskan approve/reject secara formal. Selalu update baseline."
        },
        {
          q: "Apa perbedaan Waterfall dan Agile dari sudut pandang PM?",
          a: "Waterfall: sequential, requirement fixed di awal, cocok untuk requirement stabil. Agile: iterative, requirement bisa berubah, fokus value delivery cepat, butuh collaboration tinggi."
        },
        {
          q: "Bagaimana Anda mengukur keberhasilan sebuah proyek SDLC?",
          a: "On-time, on-budget, sesuai scope & quality, stakeholder satisfaction, dan post-implementation review (lessons learned)."
        }
      ]
    },
    {
      id: "ba",
      name: "Business Analyst (BA)",
      icon: "🔍",
      shortDesc: "Menjembatani kebutuhan bisnis dengan solusi teknis.",
      responsibilities: [
        "Elicitation kebutuhan stakeholder",
        "Dokumentasi BRD / FRD / User Story",
        "Analisis gap & proses bisnis",
        "Validasi requirement & UAT support",
        "Menjadi liaison bisnis ↔ teknis"
      ],
      interviewQuestions: [
        {
          q: "Apa yang Anda lakukan jika stakeholder memberikan requirement yang saling bertentangan?",
          a: "Facilitasi workshop, prioritasi berdasarkan value & impact, dokumentasikan trade-off, dan minta keputusan formal dari decision maker."
        },
        {
          q: "Jelaskan perbedaan functional dan non-functional requirement.",
          a: "Functional: apa yang sistem harus lakukan (fitur). Non-functional: bagaimana sistem bekerja (performa, keamanan, usability, reliability)."
        },
        {
          q: "Bagaimana peran BA di fase Testing?",
          a: "Membantu menyusun acceptance criteria, support UAT, memastikan test case cover business scenario, dan verifikasi hasil terhadap requirement."
        }
      ]
    },
    {
      id: "sa",
      name: "System Analyst / Architect",
      icon: "🏗️",
      shortDesc: "Merancang arsitektur sistem dan solusi teknis.",
      responsibilities: [
        "High-level & detailed system design",
        "Pemilihan technology stack",
        "Desain database & integrasi",
        "Technical feasibility study",
        "Review desain & code architecture"
      ],
      interviewQuestions: [
        {
          q: "Apa yang Anda pertimbangkan saat merancang arsitektur sistem?",
          a: "Scalability, performance, security, maintainability, cost, existing constraint, dan requirement non-fungsional."
        },
        {
          q: "Kapan Anda memilih microservices vs monolith?",
          a: "Monolith untuk proyek kecil/sederhana & tim kecil. Microservices untuk skala besar, tim independent, dan kebutuhan deploy terpisah — dengan trade-off complexity yang lebih tinggi."
        }
      ]
    },
    {
      id: "dev",
      name: "Developer / Programmer",
      icon: "💻",
      shortDesc: "Menulis, menguji, dan memelihara kode aplikasi.",
      responsibilities: [
        "Implementasi fitur sesuai desain",
        "Unit testing & code review",
        "Version control & CI/CD collaboration",
        "Debugging & bug fixing",
        "Dokumentasi teknis kode"
      ],
      interviewQuestions: [
        {
          q: "Bagaimana Anda memastikan kode yang ditulis maintainable?",
          a: "Ikuti coding standard, SOLID principles, clean code, tulis unit test, lakukan code review, dan dokumentasikan bagian kompleks."
        },
        {
          q: "Apa yang Anda lakukan jika menemukan requirement yang kurang jelas saat coding?",
          a: "Jangan asumsikan. Klarifikasi ke BA / PM / stakeholder. Dokumentasikan keputusan. Hindari silent assumption."
        }
      ]
    },
    {
      id: "qa",
      name: "QA / Tester",
      icon: "🧪",
      shortDesc: "Menjamin kualitas software melalui pengujian sistematis.",
      responsibilities: [
        "Membuat test plan & test case",
        "Functional, integration, regression testing",
        "Bug tracking & reporting",
        "Support UAT",
        "Automation testing (jika applicable)"
      ],
      interviewQuestions: [
        {
          q: "Apa perbedaan verification dan validation?",
          a: "Verification: apakah kita membangun produk dengan benar (sesuai spesifikasi). Validation: apakah kita membangun produk yang benar (sesuai kebutuhan user)."
        },
        {
          q: "Bagaimana Anda memprioritaskan bug?",
          a: "Berdasarkan severity (impact ke user/business) dan priority (urgency). Critical/blocker didahulukan, lalu major, minor, cosmetic."
        }
      ]
    },
    {
      id: "devops",
      name: "DevOps / Release Engineer",
      icon: "⚙️",
      shortDesc: "Otomasi build, deploy, monitoring, dan infrastruktur.",
      responsibilities: [
        "CI/CD pipeline",
        "Infrastructure as Code",
        "Monitoring & logging",
        "Deployment & rollback strategy",
        "Keamanan & compliance environment"
      ],
      interviewQuestions: [
        {
          q: "Apa manfaat CI/CD dalam SDLC?",
          a: "Deteksi error lebih cepat, deploy lebih sering & reliable, mengurangi manual error, feedback loop pendek, dan mendukung continuous delivery."
        }
      ]
    },
    {
      id: "po",
      name: "Product Owner / Product Manager",
      icon: "🎯",
      shortDesc: "Memiliki visi produk dan memprioritaskan backlog.",
      responsibilities: [
        "Menyusun product vision & roadmap",
        "Prioritisasi backlog (value-driven)",
        "Acceptance criteria & definition of done",
        "Stakeholder communication",
        "Keputusan fitur go / no-go"
      ],
      interviewQuestions: [
        {
          q: "Bagaimana Anda memprioritaskan item di product backlog?",
          a: "Menggunakan value vs effort, MoSCoW, RICE score, atau WSJF. Selalu selaraskan dengan goal bisnis dan feedback user."
        }
      ]
    },
    {
      id: "scrum",
      name: "Scrum Master / Agile Coach",
      icon: "🔄",
      shortDesc: "Memfasilitasi proses Agile dan menghilangkan hambatan.",
      responsibilities: [
        "Fasilitasi ceremony (standup, review, retro)",
        "Melindungi tim dari gangguan",
        "Coaching Agile practices",
        "Menghilangkan impediment",
        "Meningkatkan continuous improvement"
      ],
      interviewQuestions: [
        {
          q: "Apa perbedaan Scrum Master dan Project Manager?",
          a: "PM fokus control (scope, time, cost). Scrum Master fokus servant-leadership, process, dan enabling team. Di Agile, banyak tanggung jawab PM digeser ke PO + SM + Tim."
        }
      ]
    }
  ],

  faqs: [
    {
      q: "Apa itu SDLC secara singkat?",
      a: "SDLC (Software Development Life Cycle) adalah rangkaian tahapan terstruktur untuk merencanakan, menganalisis, merancang, membangun, menguji, merilis, dan memelihara perangkat lunak agar hasilnya berkualitas, tepat waktu, dan sesuai kebutuhan."
    },
    {
      q: "Mengapa SDLC penting?",
      a: "Tanpa proses terstruktur, proyek rentan scope creep, budget overrun, kualitas rendah, dan risiko tinggi. SDLC memberikan visibility, kontrol, dan prediktabilitas."
    },
    {
      q: "Model SDLC apa saja yang umum digunakan?",
      a: "Waterfall, Agile (Scrum/Kanban), Iterative, Spiral, V-Model, RAD, dan hybrid. Pilihan tergantung stabilitas requirement, ukuran proyek, dan kultur organisasi."
    },
    {
      q: "Apa yang biasanya ditanyakan di interview terkait SDLC?",
      a: "Definisi & tahapan SDLC, perbedaan model (Waterfall vs Agile), peran masing-masing (BA, PM, Dev, QA), bagaimana handle change request, testing strategy, dan pengalaman nyata di setiap fase."
    },
    {
      q: "Apa yang harus ada di 'nalar' seorang petugas SDLC?",
      a: "1) Pahami tujuan bisnis, bukan hanya teknis. 2) Requirement harus jelas & terukur. 3) Design sebelum code. 4) Test early & often. 5) Komunikasi & dokumentasi. 6) Siap adaptasi (Agile mindset). 7) Quality adalah tanggung jawab bersama."
    },
    {
      q: "Bagaimana cara menjelaskan pengalaman SDLC di wawancara?",
      a: "Gunakan STAR (Situation-Task-Action-Result). Ceritakan fase mana yang Anda ikuti, peran Anda, tantangan, tindakan, dan hasil (misal: reduce defect 30%, on-time delivery)."
    },
    {
      q: "Apa perbedaan SDLC dan STLC?",
      a: "SDLC = keseluruhan siklus pengembangan software. STLC (Software Testing Life Cycle) = fokus khusus pada aktivitas testing di dalam atau paralel dengan SDLC."
    },
    {
      q: "Siapa saja stakeholder utama di SDLC?",
      a: "Business/Client, Product Owner, Project Manager, Business Analyst, System Architect, Developer, QA/Tester, DevOps, End User, dan kadang Compliance/Security."
    }
  ],

  quizzes: [
    {
      id: 1,
      question: "Apa kepanjangan dari SDLC?",
      options: ["Software Design Life Cycle", "Software Development Life Cycle", "System Development Logic Cycle", "Software Deployment Life Cycle"],
      correct: 1,
      explanation: "SDLC = Software Development Life Cycle, siklus hidup pengembangan perangkat lunak."
    },
    {
      id: 2,
      question: "Tahapan pertama dalam SDLC umumnya adalah...",
      options: ["Coding", "Testing", "Perencanaan (Planning)", "Deployment"],
      correct: 2,
      explanation: "Planning adalah tahap awal untuk menentukan tujuan, scope, resource, dan risiko."
    },
    {
      id: 3,
      question: "Dokumen yang berisi spesifikasi kebutuhan perangkat lunak disebut...",
      options: ["ERD", "SRS (Software Requirement Specification)", "UML", "Gantt Chart"],
      correct: 1,
      explanation: "SRS mendokumentasikan requirement fungsional dan non-fungsional secara detail."
    },
    {
      id: 4,
      question: "Siapa yang biasanya bertanggung jawab mengumpulkan dan mendokumentasikan requirement?",
      options: ["Developer", "Business Analyst", "DevOps", "QA Tester"],
      correct: 1,
      explanation: "Business Analyst berperan menjembatani bisnis dan teknis, termasuk requirement elicitation."
    },
    {
      id: 5,
      question: "Manakah yang termasuk non-functional requirement?",
      options: ["User dapat login dengan email", "Sistem harus merespons dalam < 2 detik", "Terdapat tombol logout", "Admin dapat menambah user"],
      correct: 1,
      explanation: "Performa (response time) adalah non-functional. Yang lain adalah functional."
    },
    {
      id: 6,
      question: "Model SDLC yang bersifat sequential dan requirement harus fixed di awal adalah...",
      options: ["Agile", "Scrum", "Waterfall", "Kanban"],
      correct: 2,
      explanation: "Waterfall mengalir satu arah; perubahan di tengah sangat mahal."
    },
    {
      id: 7,
      question: "Apa tujuan utama fase Testing?",
      options: ["Menulis kode secepat mungkin", "Memverifikasi software sesuai requirement dan menemukan defect", "Membuat desain UI", "Menyusun anggaran"],
      correct: 1,
      explanation: "Testing memastikan kualitas dan kesesuaian dengan spesifikasi."
    },
    {
      id: 8,
      question: "UAT adalah singkatan dari...",
      options: ["Unit Acceptance Testing", "User Acceptance Testing", "Unified Application Testing", "User Application Trial"],
      correct: 1,
      explanation: "User Acceptance Testing dilakukan oleh end-user/client untuk menerima sistem."
    },
    {
      id: 9,
      question: "Dalam Agile, siapa yang memprioritaskan Product Backlog?",
      options: ["Scrum Master", "Developer", "Product Owner", "Project Manager"],
      correct: 2,
      explanation: "Product Owner bertanggung jawab atas value dan prioritas backlog."
    },
    {
      id: 10,
      question: "Apa yang dimaksud dengan scope creep?",
      options: ["Bug yang merayap di production", "Pertambahan scope di luar kesepakatan awal tanpa kontrol", "Proses testing yang lambat", "Deploy yang gagal"],
      correct: 1,
      explanation: "Scope creep adalah perluasan lingkup tidak terkendali yang berisiko over-budget/over-time."
    },
    {
      id: 11,
      question: "Deliverable utama fase Design biasanya mencakup...",
      options: ["Source code final", "Architecture diagram, ERD, wireframe", "Test case saja", "Invoice client"],
      correct: 1,
      explanation: "Design menghasilkan blueprint teknis sebelum coding."
    },
    {
      id: 12,
      question: "Siapa yang paling berperan di fase Maintenance?",
      options: ["Hanya Project Manager", "Tim support, developer, dan kadang BA/PM untuk change request", "Hanya QA", "Hanya Business Analyst"],
      correct: 1,
      explanation: "Maintenance melibatkan banyak pihak tergantung jenis perubahan (bugfix vs enhancement)."
    },
    {
      id: 13,
      question: "Verification vs Validation — manakah pernyataan benar?",
      options: ["Verification = membangun produk yang benar; Validation = membangun dengan benar", "Verification = apakah produk dibangun dengan benar; Validation = apakah produk yang benar yang dibangun", "Keduanya sama saja", "Hanya Validation yang penting"],
      correct: 1,
      explanation: "Verification (are we building it right?), Validation (are we building the right thing?)."
    },
    {
      id: 14,
      question: "Apa keuntungan utama menggunakan version control (Git) di fase Coding?",
      options: ["Membuat UI otomatis", "Melacak perubahan, kolaborasi, rollback, dan branching", "Mengganti peran QA", "Menghilangkan kebutuhan testing"],
      correct: 1,
      explanation: "Git memungkinkan kolaborasi aman dan sejarah perubahan yang jelas."
    },
    {
      id: 15,
      question: "Dalam nalar petugas SDLC, hal paling penting di awal proyek adalah...",
      options: ["Langsung coding", "Memahami tujuan bisnis dan requirement dengan jelas", "Memilih framework terbaru", "Membeli server mahal"],
      correct: 1,
      explanation: "Tanpa pemahaman tujuan & requirement yang baik, seluruh fase berikutnya berisiko salah arah."
    }
  ]
};
