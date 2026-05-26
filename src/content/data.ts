// Single source of truth for portfolio content, bilingual (EN default + ID).
// All facts are sourced from the CV — nothing fabricated.

export type Lang = "en" | "id";

export type Localized = Record<Lang, string>;

export const PROFILE = {
  name: "Firaz Al Aqib",
  role: { en: "Fullstack Developer", id: "Fullstack Developer" } as Localized,
  location: { en: "Jakarta, Indonesia", id: "Jakarta, Indonesia" } as Localized,
  email: "contact@firaz.my.id",
  phone: "+62 878-8805-0534",
  linkedin: "https://www.linkedin.com/in/firaz-al-aqib",
  // TODO: replace with real GitHub username/url
  github: "https://github.com/FasiIkom",
  photo: "/images/profile.png" as string,
  tagline: {
    en: "Undergraduate Fullstack Developer with a Computer Science background at Universitas Indonesia (GPA 3.72/4.00). 7+ shipped projects spanning face-recognition academic systems, fraud-detection platforms, and SME finance apps.",
    id: "Mahasiswa Fullstack Developer dengan latar belakang Computer Science UI (GPA 3.72/4.00). 7+ proyek nyata, mulai dari sistem akademik berbasis face recognition, platform fraud detection, hingga aplikasi keuangan UMKM.",
  } as Localized,
} as const;

export const STATS: { value: string; label: Localized }[] = [
  { value: "3.72", label: { en: "GPA / 4.00", id: "IPK / 4.00" } },
  { value: "7+", label: { en: "Shipped projects", id: "Proyek selesai" } },
  { value: "2+", label: { en: "Years building", id: "Tahun pengalaman coding" } },
  { value: "3", label: { en: "Awards", id: "Penghargaan" } },
];

export const EDUCATION = {
  school: "Universitas Indonesia",
  major: { en: "Computer Science", id: "Ilmu Komputer" } as Localized,
  period: { en: "Aug 2023 — Present", id: "Agustus 2023 — Sekarang" } as Localized,
  gpa: "3.72 / 4.00",
  semester: "6",
};

export type Experience = {
  company: string;
  title: Localized;
  period: Localized;
  desc: Localized;
  logo?: string;
};

export const EXPERIENCE: Experience[] = [
  {
    company: "PT. Pejuang Indonesia Cerdas",
    title: { en: "Fullstack Developer Intern", id: "Fullstack Developer Intern" },
    period: { en: "Sep 2025 — Jan 2026", id: "September 2025 — Januari 2026" },
    logo: "/images/pejos.png",
    desc: {
      en: "Designed, developed and maintained web app features across frontend and backend. Implemented scalable software architecture, efficient RESTful API integrations, and database management for optimal, responsive performance.",
      id: "Terlibat dalam perancangan, pengembangan, dan pemeliharaan fungsionalitas aplikasi web dari sisi frontend maupun backend. Mengimplementasikan arsitektur skalabel, integrasi RESTful API yang efisien, dan pengelolaan database untuk performa optimal.",
    },
  },
  {
    company: "Universitas Indonesia",
    title: {
      en: "Teaching Assistant — Foundations of Programming 2",
      id: "Asisten Dosen — Dasar-Dasar Pemrograman 2",
    },
    period: {
      en: "Feb–Jun 2025 & Feb 2026 — Present",
      id: "Feb–Jun 2025 & Feb 2026 — Sekarang",
    },
    logo: "/images/ui.png",
    desc: {
      en: "Mentored students in object-oriented programming concepts using Java.",
      id: "Membimbing mahasiswa memahami konsep pemrograman berorientasi objek menggunakan Java.",
    },
  },
];

export type ProjectStatus = "live" | "shipped";

export type Project = {
  symbol: string;
  name: string;
  role: Localized;
  stack: string[];
  period: Localized;
  status: ProjectStatus;
  highlight?: Localized;
  url?: string;
  points: Localized[];
  /** Marks a project for the visual "Featured work" grid. */
  featured?: boolean;
  /** Hides from the All Projects list (still shows in Featured Work). */
  featuredOnly?: boolean;
  /** Path under /public, e.g. "/images/projects/gca.png". Falls back to a monogram if unset. */
  image?: string;
  /** Accent color for the placeholder tile (Tailwind-safe hex). */
  accent?: string;
  /** One-line summary shown on the featured card. */
  blurb?: Localized;
};

export const PROJECTS: Project[] = [
  {
    symbol: "GCA",
    name: "Garuda Cendekia Academy",
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    stack: ["Next.js", "Spring Boot", "PostgreSQL", "AWS Rekognition", "AWS SDK"],
    period: { en: "Feb 2026 — Present", id: "Februari 2026 — Sekarang" },
    status: "live",
    url: "https://dev.garudacendekiaacademy.com",
    featured: true,
    accent: "#fcd535",
    image: "/images/gca.png",
    blurb: {
      en: "End-to-end school information system with face-recognition attendance powered by AWS Rekognition.",
      id: "Sistem informasi sekolah end-to-end dengan absensi face recognition bertenaga AWS Rekognition.",
    },
    points: [
      {
        en: "Designed and built an end-to-end school academic information system.",
        id: "Merancang dan mengembangkan sistem informasi akademik sekolah secara end-to-end.",
      },
      {
        en: "Implemented face-recognition attendance using AWS Rekognition.",
        id: "Mengimplementasikan sistem absensi berbasis face recognition dengan AWS Rekognition.",
      },
      {
        en: "Designed the database schema and integrated the AWS SDK into the backend.",
        id: "Merancang skema database dan mengintegrasikan AWS SDK pada arsitektur backend.",
      },
      {
        en: "Built payment & administration modules to digitalize school operations.",
        id: "Membangun modul pembayaran & administrasi untuk digitalisasi operasional sekolah.",
      },
    ],
  },
  {
    symbol: "SKT",
    name: "Sokratech",
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    stack: ["React Native", "React", "Flutter", "Hono.js", "PostgreSQL"],
    period: { en: "Feb 2026 — Present", id: "Februari 2026 — Sekarang" },
    status: "live",
    url: "https://www.sokratech.io/",
    featured: true,
    accent: "#0ecb81",
    image: "/images/sokratech.png",
    blurb: {
      en: "Fraud-detection platform with a behavioral-tracking SDK: touch tracking, offline queues, device fingerprinting.",
      id: "Platform fraud detection dengan SDK behavioral tracking: touch tracking, offline queues, device fingerprinting.",
    },
    points: [
      {
        en: "Built a fraud-detection platform plus an SDK for behavioral tracking.",
        id: "Mengembangkan platform fraud detection beserta SDK untuk behavioral tracking.",
      },
      {
        en: "Implemented touch tracking and offline queues for user-data processing.",
        id: "Mengimplementasikan touch tracking dan offline queues untuk pemrosesan data pengguna.",
      },
      {
        en: "Built device-fingerprinting modules for anomaly detection & fraud prevention.",
        id: "Membangun modul device fingerprinting untuk deteksi anomali dan pencegahan penipuan.",
      },
    ],
  },
  {
    symbol: "POS",
    name: "Pejuang OSN",
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    stack: ["Django", "Next.js", "PostgreSQL", "Redis"],
    period: { en: "Sep 2025 — Jan 2026", id: "September 2025 — Januari 2026" },
    status: "shipped",
    featured: true,
    featuredOnly: true,
    accent: "#2dbdb6",
    image: "/images/pjos.png",
    blurb: {
      en: "OSN preparation platform built during internship — practice problems, progress tracking, and leaderboards.",
      id: "Platform persiapan OSN yang dibangun saat magang — soal latihan, tracking progress, dan leaderboard.",
    },
    points: [
      {
        en: "Built a full-stack OSN preparation platform during internship at PT. Pejuang Indonesia Cerdas.",
        id: "Membangun platform persiapan OSN secara full-stack saat magang di PT. Pejuang Indonesia Cerdas.",
      },
      {
        en: "Implemented practice problem modules with real-time progress tracking per subject and level.",
        id: "Mengimplementasikan modul soal latihan dengan tracking progress real-time per mata pelajaran dan level.",
      },
      {
        en: "Used Redis for session caching and leaderboard ranking to handle concurrent users.",
        id: "Menggunakan Redis untuk session caching dan ranking leaderboard agar dapat menangani pengguna secara bersamaan.",
      },
      {
        en: "Integrated Django REST framework with a Next.js frontend for a responsive, SEO-friendly experience.",
        id: "Mengintegrasikan Django REST framework dengan frontend Next.js untuk pengalaman responsif dan SEO-friendly.",
      },
    ],
  },
  {
    symbol: "ATV",
    name: "ATV 25th FEB UI Website",
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    stack: ["Spring Boot", "Next.js", "Google Sheets API", "Cloud Storage"],
    period: { en: "Aug — Sep 2025", id: "Agustus — September 2025" },
    status: "shipped",
    url: "https://www.atv-febui.com",
    points: [
      {
        en: "Built the event registration system for ATV FEB UI 2025 with image upload to cloud storage.",
        id: "Membangun sistem pendaftaran acara ATV FEB UI 2025 dengan upload gambar ke cloud storage.",
      },
      {
        en: "Designed an API returning file links for easy re-access.",
        id: "Merancang API yang mengembalikan tautan file agar mudah diakses kembali.",
      },
      {
        en: "Integrated the Google Sheets API for automatic registrant logging.",
        id: "Mengintegrasikan Google Sheets API untuk pencatatan data pendaftar otomatis.",
      },
    ],
  },
  {
    symbol: "CMC",
    name: "Cemal-Cemil Khandara Financial Reports",
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    stack: ["Spring Boot", "Next.js", "PostgreSQL"],
    period: { en: "Jun — Jul 2025", id: "Juni — Juli 2025" },
    status: "shipped",
    url: "https://cemal-cemil.vercel.app",
    blurb: {
      en: "Financial-bookkeeping app for an SME under the BCA Bakti Scholarship — shipped with a 3.8/4.0 client score.",
      id: "Aplikasi pencatatan keuangan UMKM dalam Beasiswa Bakti BCA — rilis dengan skor klien 3.8/4.0.",
    },
    points: [
      {
        en: "Built a financial-bookkeeping app for an SME under the BCA Bakti Scholarship 2025 program.",
        id: "Mengembangkan aplikasi pencatatan keuangan untuk UMKM dalam program Beasiswa Bakti BCA 2025.",
      },
      {
        en: "Achieved a client satisfaction score of 3.8/4.0.",
        id: "Mendapat skor kepuasan klien 3.8/4.0.",
      },
    ],
  },
  {
    symbol: "PBA",
    name: "PerbaikiinAja",
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    stack: ["Spring Boot", "Next.js", "PostgreSQL", "Docker", "CI/CD"],
    period: { en: "Mar — Jun 2025", id: "Maret — Juni 2025" },
    status: "shipped",
    points: [
      {
        en: "Built a repair-service app with three roles (technician, admin, user) as the Advanced Programming final project.",
        id: "Membangun aplikasi layanan perbaikan dengan tiga peran (teknisi, admin, pengguna) sebagai tugas akhir Pemrograman Lanjut.",
      },
      {
        en: "Applied Clean Code, SOLID principles, and a CI/CD pipeline.",
        id: "Menerapkan Clean Code, SOLID Principles, dan CI/CD pipeline.",
      },
      {
        en: "Earned an A in the Advanced Programming course.",
        id: "Mendapat nilai A pada mata kuliah Pemrograman Lanjut.",
      },
    ],
  },
  {
    symbol: "SJT",
    name: "SIJARTA",
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    stack: ["Next.js", "PostgreSQL", "Docker"],
    period: { en: "Oct — Dec 2024", id: "Oktober — Desember 2024" },
    status: "shipped",
    points: [
      {
        en: "Built a data-management app as the Databases course final project.",
        id: "Membangun aplikasi manajemen data sebagai proyek akhir mata kuliah Basis Data.",
      },
      {
        en: "Wrote every SQL query manually, with no ORM or built-in library.",
        id: "Menulis semua query SQL secara manual tanpa ORM/library bawaan.",
      },
      {
        en: "Used Docker for a smooth deployment process.",
        id: "Menggunakan Docker untuk kemudahan proses deployment.",
      },
    ],
  },
  {
    symbol: "ACM",
    name: "Academeats",
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    stack: ["Next.js", "PostgreSQL", "Docker"],
    period: { en: "Mar — Jun 2024", id: "Maret — Juni 2024" },
    status: "shipped",
    points: [
      {
        en: "Built a simple food-ordering app with auth, menu management, and order processing.",
        id: "Membangun aplikasi pemesanan makanan dengan autentikasi, manajemen menu, dan pemrosesan pesanan.",
      },
      {
        en: "Developed a REST API consumed by a Flutter-based mobile version.",
        id: "Mengembangkan REST API untuk versi mobile berbasis Flutter.",
      },
      {
        en: "Earned an A in the Platform-Based Programming course.",
        id: "Mendapat nilai A pada mata kuliah Pemrograman Berbasis Platform.",
      },
    ],
  },
];

export const SKILLS: { group: Localized; items: string[] }[] = [
  {
    group: { en: "Backend", id: "Backend" },
    items: ["Python (Django)", "Go", "Spring Boot"],
  },
  {
    group: { en: "Frontend", id: "Frontend" },
    items: ["Next.js", "React", "HTML5"],
  },
  {
    group: { en: "Database", id: "Database" },
    items: ["PostgreSQL", "MySQL", "Redis", "MongoDB"],
  },
  {
    group: { en: "DevOps & Tools", id: "DevOps & Tools" },
    items: ["Docker", "Git & GitHub", "CI/CD", "Postman"],
  },
  {
    group: { en: "Practices", id: "Praktik" },
    items: ["SOLID", "Clean Code", "RESTful API"],
  },
  {
    group: { en: "Security", id: "Keamanan" },
    items: ["JWT", "2FA"],
  },
];

export const AWARDS: { title: Localized; year: string; logo?: string }[] = [
  {
    title: { en: "BCA Bakti Scholarship Recipient", id: "Penerima Beasiswa Bakti BCA" },
    year: "2025",
    logo: "/images/bca.png",
  },
  {
    title: {
      en: "1st Place — POPDA Chess, Pekalongan Regency",
      id: "Juara I POPDA Catur Tingkat Kabupaten Pekalongan",
    },
    year: "2023",
    logo: "/images/catur.png",
  },
  {
    title: {
      en: "3rd Place — National Informatics Olympiad (OSN), Pekalongan Regency",
      id: "Juara III OSN Informatika Tingkat Kabupaten Pekalongan",
    },
    year: "2022",
    logo: "/images/osn.png",
  },
];

export const UI = {
  nav: {
    home: { en: "Home", id: "Beranda" } as Localized,
    projects: { en: "Projects", id: "Proyek" } as Localized,
    experience: { en: "Experience", id: "Pengalaman" } as Localized,
    skills: { en: "Skills", id: "Keahlian" } as Localized,
    contact: { en: "Contact", id: "Kontak" } as Localized,
  },
  cta: {
    contact: { en: "Get in touch", id: "Hubungi saya" } as Localized,
    viewProjects: { en: "View projects", id: "Lihat proyek" } as Localized,
    resume: { en: "Download CV", id: "Unduh CV" } as Localized,
  },
};
