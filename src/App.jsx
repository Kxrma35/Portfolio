import { useState, useEffect, useRef } from "react";

// ── Palette ───────────────────────────────────────────────────────────
const C = {
  bg:      "#05080f",
  bg2:     "#080d1a",
  card:    "#0a1020",
  border:  "#131d30",
  borderH: "#1e3a5f",
  accent:  "#38bdf8",   // sky-400
  accent2: "#818cf8",   // indigo-400
  accent3: "#34d399",   // emerald-400
  glow:    "#38bdf820",
  text:    "#e2e8f0",
  muted:   "#4b6080",
  dim:     "#0f1a2e",
};

// ── Icon helper ───────────────────────────────────────────────────────
const Ico = ({ d, size = 18, fill = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"
    fill={fill ? "currentColor" : "none"}
    stroke={fill ? "none" : "currentColor"}
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: "SecureBot",
    subtitle: "Tamper-Aware Autonomous Navigation System",
    tag: "IoT / Security",
    year: "2026",
    stack: ["Arduino Uno R3", "Raspberry Pi 5", "MPU-6050 IMU", "MQTT", "Flask", "SQLite", "Python", "JavaScript"],
    description: "A real-time IoT security pipeline built on Arduino and Raspberry Pi 5. Detects physical tampering using a 6-axis IMU sensor, routes telemetry through an MQTT broker with flood/replay attack detection, logs everything to SQLite, and streams a live dashboard over HTTP. Features JWT authentication and SHA-256 firmware integrity checking.",
    highlights: [
      "Hardware-level tamper detection with IMU debounce logic",
      "Custom IDS: flood detection (>10 msg/s) and replay attack prevention",
      "SHA-256 firmware integrity checker for the Arduino sketch",
      "Live telemetry dashboard with WebSocket-style polling",
      "JWT-protected REST API endpoints",
    ],
    github: "https://github.com/Kxrma35/secure-bot",
    accent: "#38bdf8",
    category: "hardware",
  },
  {
    id: 2,
    title: "JOESTAR",
    subtitle: "AI Personal Assistant with Voice & Memory",
    tag: "AI / Full-Stack",
    year: "2026",
    stack: ["FastAPI", "WebSockets", "Groq LLM", "ChromaDB", "Edge TTS", "Three.js", "SQLite", "Python"],
    description: "A cinematic AI assistant with a real-time 3D orb interface, voice synthesis via Edge TTS, and semantic memory using ChromaDB vector embeddings. Runs on a FastAPI WebSocket backend with tool use (web search, file system, weather, calendar). The frontend renders a live audio-reactive Three.js sphere.",
    highlights: [
      "Groq LLaMA 3.3 70B with parallel tool calling disabled for accuracy",
      "ChromaDB + SQLite dual-layer memory (semantic + short-term)",
      "Edge TTS voice synthesis with base64 audio streaming over WebSocket",
      "Audio-reactive Three.js icosahedron orb (IcosahedronGeometry deformation)",
      "Web search, file I/O, weather, and calendar tool integrations",
    ],
    github: "https://github.com/Kxrma35",
    accent: "#818cf8",
    category: "ai",
  },
  {
    id: 3,
    title: "KIO3",
    subtitle: "AI-Powered Calorie & Nutrition Tracker",
    tag: "Full-Stack / Mobile",
    year: "2026",
    stack: ["React 19", "Vite 8", "Firebase", "USDA FoodData API", "Claude AI", "Express.js", "Capacitor", "Chart.js"],
    description: "A production-grade nutrition tracking web app with barcode scanning, USDA food database integration, real-time Firestore sync, and a Claude-powered AI nutrition chatbot. Features a custom SVG arc gauge, calorie streak tracking, weekly bar charts, and offline persistence. Deployed to GitHub Pages with an Android-ready Capacitor build.",
    highlights: [
      "USDA FoodData Central API with local fallback database (50+ foods)",
      "ZXing barcode scanner with Open Food Facts API lookup",
      "Claude Sonnet chatbot with dynamic system prompt (live meal context)",
      "Custom SVG polar-coordinate arc gauge for calorie visualization",
      "Firestore offline persistence + optimistic UI updates",
    ],
    github: "https://github.com/Kxrma35/KIO3",
    accent: "#34d399",
    category: "web",
  },
  {
    id: 4,
    title: "MindBridge",
    subtitle: "Mental Health Support & Recovery App",
    tag: "Full-Stack / Firebase",
    year: "2026",
    stack: ["React 18", "Firebase Auth", "Firestore", "React Router", "Lucide Icons", "Vite", "gh-pages"],
    description: "A mobile-first mental wellness platform that lets users send emotional 'signals' to trusted contacts, exchange messages through real-time Firestore chat, and track addiction recovery with a live countdown timer. Features Firestore security rules, a sobriety milestone system, and a feedback dashboard with rating analytics.",
    highlights: [
      "Signal system: reach out with tagged feelings to trusted contacts",
      "Real-time Firestore messaging with security rules per conversation ID",
      "Recovery tracker: live second-level countdown with milestone celebrations",
      "Admin feedback dashboard with star-rating breakdown and top feature requests",
      "Deployed to GitHub Pages with SPA redirect workaround",
    ],
    github: "https://github.com/Kxrma35/mindbridge",
    accent: "#f472b6",
    category: "web",
  },
  {
    id: 5,
    title: "Personal Finance Tracker",
    subtitle: "Terminal-Based Financial Management Tool",
    tag: "Python / CLI",
    year: "2026",
    stack: ["Python 3", "SQLite3", "Matplotlib", "ReportLab", "CLI"],
    description: "A terminal-based finance tool for tracking income, expenses, savings goals, and recurring transactions. Generates Matplotlib visualisations (pie, bar, grouped bar) and exports full PDF reports with ReportLab. All data stored locally — no internet required.",
    highlights: [
      "Recurring transaction engine with one-command monthly apply",
      "Savings goal progress tracking with percentage completion",
      "Three chart types: spending by category, income vs expenses, goal progress",
      "PDF export with full transaction history and formatted tables",
      "SQLite with separate income/expense/savings tables",
    ],
    github: "https://github.com/Kxrma35/finance-tracker",
    accent: "#fbbf24",
    category: "python",
  },
];

const SERVICES = [
  { icon: "M4 6h16M4 10h16M4 14h16M4 18h16", title: "Full-Stack Web Apps", desc: "End-to-end React + Node.js / FastAPI applications — from database schema to deployed UI." },
  { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Real-Time Dashboards", desc: "Live data interfaces using Socket.io or MQTT. Monitoring tools, device control, analytics panels." },
  { icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18", title: "IoT & Hardware Systems", desc: "Raspberry Pi + Arduino backends wired to web frontends. Sensor monitoring, GPIO control, IDS." },
  { icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z", title: "AI Integration", desc: "Embed local LLMs (Ollama) or cloud AI (Claude, Groq) with tool use, memory, and voice synthesis." },
  { icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", title: "API Development", desc: "RESTful and WebSocket APIs with Node.js/Express or FastAPI. Clean endpoints, auth, and docs." },
  { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", title: "Security Engineering", desc: "Intrusion detection, firmware integrity, JWT auth, Firestore rules, server hardening. Security-first mindset." },
];

const SKILLS = [
  { cat: "Frontend",   items: ["React 18/19", "Vite", "Three.js", "HTML5 / CSS3", "JavaScript ES6+", "Chart.js"] },
  { cat: "Backend",    items: ["Node.js / Express", "FastAPI / Python", "Socket.io", "MQTT", "REST APIs", "WebSockets"] },
  { cat: "Hardware",   items: ["Raspberry Pi 5", "Arduino Uno R3", "GPIO Control", "IMU Sensors", "MQTT Broker", "SSH Admin"] },
  { cat: "AI & Data",  items: ["Claude API", "Groq / LLaMA", "Ollama LLMs", "ChromaDB", "Vector Embeddings", "Edge TTS"] },
  { cat: "Databases",  items: ["Firebase / Firestore", "SQLite", "SQLAlchemy", "Firestore Rules"] },
  { cat: "DevOps",     items: ["Git & GitHub", "Vercel", "GitHub Pages", "PM2", "Linux / Ubuntu", "Capacitor (Android)"] },
];

const TIMELINE = [
  { year: "Early 2025", title: "First Line of Code", desc: "Picked up HTML, CSS, and JavaScript out of pure curiosity. Built static websites just to see something appear on screen." },
  { year: "Late 2025",   title: "Going Full-Stack", desc: "Discovered React and Python backends. Built first dynamic apps — learned APIs, databases, and how the web actually works under the hood." },
  { year: "Early 2026",   title: "Finance Tracker", desc: "First Python CLI project. SQLite, Matplotlib charts, ReportLab PDF exports. Learned to architect a real application from scratch." },
  { year: "Early 2026",   title: "Hardware Meets Software", desc: "Got a Raspberry Pi 5 and Arduino. Started wiring sensors, writing GPIO scripts — realising software could control physical things." },
  { year: "Mid 2026",  title: "SecureBot — IoT Security Pipeline", desc: "Built a full tamper-detection system: IMU sensor → Arduino → MQTT → Raspberry Pi → Flask dashboard with IDS, JWT auth, and firmware integrity checks." },
  { year: "Mid 2026",  title: "KIO3 & MindBridge", desc: "Two full-stack Firebase apps: a nutrition tracker with Claude AI + barcode scanning, and a mental health platform with real-time messaging and recovery tracking." },
  { year: "Mid 2026",  title: "JOESTAR — AI Voice Assistant", desc: "FastAPI WebSocket backend, Groq LLM with tool use, ChromaDB memory, Edge TTS voice, and an audio-reactive Three.js 3D orb interface." },
  { year: "Now",        title: "Open for Freelance", desc: "Actively building and taking on projects. Pursuing CompTIA Security+. Looking for the right team to grow with." },
];

// ── Hooks ─────────────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

// ── Shared Components ─────────────────────────────────────────────────
function SectionLabel({ text }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px" }}>
      <div style={{ width:"28px", height:"1px", background: C.accent }} />
      <span style={{ color: C.accent, fontSize:"10px", fontWeight:700, textTransform:"uppercase", letterSpacing:"3px" }}>{text}</span>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{ margin:"0 0 56px", fontFamily:"'Cabinet Grotesk', 'Syne', sans-serif", fontSize:"clamp(30px,5vw,48px)", fontWeight:800, color: C.text, letterSpacing:"-1.5px", lineHeight:1.05 }}>
      {children}
    </h2>
  );
}

function Section({ id, children, alt = false, style = {} }) {
  const [ref, vis] = useReveal();
  return (
    <section id={id} ref={ref} style={{
      padding:"120px 24px",
      background: alt ? C.bg2 : C.bg,
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(28px)",
      transition:"opacity 0.65s ease, transform 0.65s ease",
      ...style,
    }}>
      <div style={{ maxWidth:"960px", margin:"0 auto" }}>
        {children}
      </div>
    </section>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMobileOpen(false); };
  const links = [["About","about"],["Projects","projects"],["Skills","skills"],["Timeline","timeline"],["Contact","contact"]];
  return (
    <>
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, height:"60px", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 24px", background: scrolled ? "rgba(5,8,15,0.92)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent", transition:"all 0.3s" }}>
        <button onClick={() => window.scrollTo({top:0,behavior:"smooth"})} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'Cabinet Grotesk','Syne',sans-serif", fontSize:"19px", fontWeight:800, color: C.text, letterSpacing:"-0.5px" }}>
          K<span style={{ color: C.accent }}>.</span>
        </button>
        <div style={{ display:"flex", gap:"24px" }} className="nav-links">
          {links.map(([l,id]) => (
            <button key={id} onClick={() => go(id)} style={{ background:"none", border:"none", cursor:"pointer", color: C.muted, fontSize:"12px", fontWeight:500, letterSpacing:"0.3px", transition:"color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.accent}
              onMouseLeave={e => e.target.style.color = C.muted}>
              {l}
            </button>
          ))}
        </div>
        <a href="mailto:karmanjeruh5@gmail.com" style={{ background: C.accent, color:"#000", padding:"8px 20px", borderRadius:"8px", fontSize:"12px", fontWeight:700, textDecoration:"none", letterSpacing:"0.3px" }}>
          Hire Me
        </a>
      </nav>
    </>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────
function Hero() {
  const words = ["Full-Stack", "Real-Time", "IoT Security", "AI-Powered", "Hardware"];
  const [wi, setWi] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setWi(i => (i + 1) % words.length); setFade(true); }, 280);
    }, 2400);
    return () => clearInterval(t);
  }, []);

  const stats = [["2025", "Year I Started"], ["5+", "Shipped Projects"], ["10+", "Technologies"], ["Zindua School", "United States International University - Africa"]];

  return (
    <div id="hero" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"80px 24px 0", position:"relative", overflow:"hidden" }}>
      {/* Dot grid */}
      <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(${C.border} 1px, transparent 1px)`, backgroundSize:"28px 28px", opacity:0.6, pointerEvents:"none" }} />
      {/* Glow blobs */}
      <div style={{ position:"absolute", top:"15%", right:"8%", width:"480px", height:"480px", background:`radial-gradient(circle, ${C.glow} 0%, transparent 65%)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"20%", left:"5%", width:"320px", height:"320px", background:`radial-gradient(circle, #818cf812 0%, transparent 65%)`, pointerEvents:"none" }} />

      <div style={{ maxWidth:"960px", margin:"0 auto", width:"100%", position:"relative" }}>
        {/* Status pill */}
        <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:`${C.accent}15`, border:`1px solid ${C.accent}35`, borderRadius:"100px", padding:"6px 16px", marginBottom:"36px", animation:"fadeUp 0.5s ease 0.1s both" }}>
          <div style={{ width:"7px", height:"7px", borderRadius:"50%", background: C.accent3, boxShadow:`0 0 8px ${C.accent3}` }} />
          <span style={{ color: C.accent, fontSize:"11px", fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase" }}>Available for freelance · Nairobi, Kenya</span>
        </div>

        <h1 style={{ margin:"0 0 6px", fontFamily:"'Cabinet Grotesk','Syne',sans-serif", fontSize:"clamp(52px,9vw,96px)", fontWeight:800, lineHeight:0.95, letterSpacing:"-3px", color: C.text, animation:"fadeUp 0.5s ease 0.2s both" }}>
          Karma Kioko
        </h1>

        {/* Rotating word */}
        <div style={{ margin:"16px 0 28px", animation:"fadeUp 0.5s ease 0.3s both", display:"flex", alignItems:"baseline", gap:"14px", flexWrap:"wrap" }}>
          <span style={{ fontFamily:"'Cabinet Grotesk','Syne',sans-serif", fontSize:"clamp(22px,4.5vw,44px)", fontWeight:700, color: C.accent, opacity: fade ? 1 : 0, transition:"opacity 0.28s ease", minWidth:"220px" }}>
            {words[wi]}
          </span>
          <span style={{ fontFamily:"'Cabinet Grotesk','Syne',sans-serif", fontSize:"clamp(22px,4.5vw,44px)", fontWeight:400, color: C.muted }}>
            Developer
          </span>
        </div>

        <p style={{ margin:"0 0 48px", color: C.muted, fontSize:"clamp(14px,1.8vw,17px)", lineHeight:1.85, maxWidth:"520px", animation:"fadeUp 0.5s ease 0.4s both" }}>
          I build things that actually work in the real world — IoT security systems,
          AI voice assistants, real-time dashboards, and full-stack web apps.
          From hardware wiring to deployed product.
        </p>

        <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", animation:"fadeUp 0.5s ease 0.5s both" }}>
          <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior:"smooth" })}
            style={{ background: C.accent, border:"none", color:"#000", padding:"13px 28px", borderRadius:"9px", fontSize:"13px", fontWeight:700, cursor:"pointer", letterSpacing:"0.2px" }}>
            View Projects
          </button>
          <a href="mailto:karmanjeruh5@gmail.com"
            style={{ display:"flex", alignItems:"center", gap:"8px", border:`1px solid ${C.border}`, color: C.text, padding:"13px 28px", borderRadius:"9px", fontSize:"13px", fontWeight:500, textDecoration:"none", transition:"border-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
            Get In Touch
          </a>
          <div style={{ display:"flex", gap:"8px" }}>
            <a href="https://github.com/Kxrma35" target="_blank" rel="noreferrer"
              style={{ width:"44px", height:"44px", display:"flex", alignItems:"center", justifyContent:"center", border:`1px solid ${C.border}`, borderRadius:"9px", color: C.muted, textDecoration:"none", transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}>
              <GithubIcon size={17} />
            </a>
            <a href="https://www.linkedin.com/in/karma-njeruh-165a14303" target="_blank" rel="noreferrer"
              style={{ width:"44px", height:"44px", display:"flex", alignItems:"center", justifyContent:"center", border:`1px solid ${C.border}`, borderRadius:"9px", color: C.muted, textDecoration:"none", transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}>
              <LinkedinIcon size={17} />
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px", background: C.border, borderRadius:"12px", overflow:"hidden", marginTop:"80px", animation:"fadeUp 0.5s ease 0.6s both" }}>
          {stats.map(([n, l]) => (
            <div key={l} style={{ background: C.card, padding:"22px 20px", textAlign:"center" }}>
              <div style={{ fontFamily:"'Cabinet Grotesk','Syne',sans-serif", fontSize:"28px", fontWeight:800, color: C.text, lineHeight:1, letterSpacing:"-1px" }}>{n}</div>
              <div style={{ fontSize:"10px", color: C.muted, marginTop:"5px", textTransform:"uppercase", letterSpacing:"1px" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── About ─────────────────────────────────────────────────────────────
function About() {
  return (
    <Section id="about" alt>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"72px", alignItems:"start" }} className="two-col">
        <div>
          <SectionLabel text="About Me" />
          <h2 style={{ margin:"0 0 24px", fontFamily:"'Cabinet Grotesk','Syne',sans-serif", fontSize:"clamp(28px,4vw,42px)", fontWeight:800, color: C.text, letterSpacing:"-1px", lineHeight:1.1 }}>
            Building things that actually work.
          </h2>
          <p style={{ color: C.muted, lineHeight:1.9, fontSize:"15px", margin:"0 0 18px" }}>
            I'm a self-taught full-stack developer from Nairobi, Kenya. I started coding in 2025 and haven't stopped — teaching myself everything from React to Raspberry Pi GPIO wiring to AI tool orchestration.
          </p>
          <p style={{ color: C.muted, lineHeight:1.9, fontSize:"15px", margin:"0 0 18px" }}>
            In under a year I shipped five real projects: a hardware IoT security system, an AI voice assistant with semantic memory, two Firebase web apps, and a Python CLI finance tool. Every project runs, deploys, and solves a real problem.
          </p>
          <p style={{ color: C.muted, lineHeight:1.9, fontSize:"15px", margin:"0 0 32px" }}>
            Currently pursuing CompTIA Security+ while open to freelance opportunities. I care about quality code, real deployment, and projects that matter.
          </p>
          <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
            <a href="https://github.com/Kxrma35" target="_blank" rel="noreferrer"
              style={{ display:"flex", alignItems:"center", gap:"7px", color: C.muted, textDecoration:"none", fontSize:"13px", border:`1px solid ${C.border}`, padding:"9px 16px", borderRadius:"8px", transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}>
              <GithubIcon size={15} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/karma-njeruh-165a14303" target="_blank" rel="noreferrer"
              style={{ display:"flex", alignItems:"center", gap:"7px", color: C.muted, textDecoration:"none", fontSize:"13px", border:`1px solid ${C.border}`, padding:"9px 16px", borderRadius:"8px", transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}>
              <LinkedinIcon size={15} /> LinkedIn
            </a>
          </div>
        </div>

        {/* Profile card */}
        <div style={{ background: C.card, border:`1px solid ${C.border}`, borderRadius:"16px", padding:"32px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:0, right:0, width:"180px", height:"180px", background:`radial-gradient(circle, ${C.glow} 0%, transparent 70%)`, pointerEvents:"none" }} />
          <div style={{ fontFamily:"'Cabinet Grotesk','Syne',sans-serif", fontSize:"56px", fontWeight:800, color: C.accent, lineHeight:1, marginBottom:"10px" }}>KK</div>
          <div style={{ color: C.text, fontSize:"17px", fontWeight:700, marginBottom:"3px" }}>Karma Kioko</div>
          <div style={{ color: C.muted, fontSize:"13px", marginBottom:"28px" }}>Nairobi, Kenya · 18 years old</div>
          {[
            ["Core Stack", "React · Python · Node.js · Raspberry Pi"],
            ["AI Tools",   "Claude · Groq / LLaMA · ChromaDB · Ollama"],
            ["Focus",      "Full-Stack · IoT Security · Real-Time · AI"],
            ["Status",     "Open to freelance & internship opportunities"],
          ].map(([k, v]) => (
            <div key={k} style={{ borderTop:`1px solid ${C.border}`, padding:"13px 0", display:"flex", flexDirection:"column", gap:"4px" }}>
              <span style={{ color: C.muted, fontSize:"9px", textTransform:"uppercase", letterSpacing:"1.5px" }}>{k}</span>
              <span style={{ color: C.text, fontSize:"13px" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ── Services ──────────────────────────────────────────────────────────
function Services() {
  return (
    <Section id="services">
      <SectionLabel text="What I Do" />
      <SectionTitle>Services</SectionTitle>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:"14px" }}>
        {SERVICES.map((s, i) => <ServiceCard key={i} s={s} />)}
      </div>
    </Section>
  );
}

function ServiceCard({ s }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: C.card, border:`1px solid ${hov ? C.accent + "44" : C.border}`, borderRadius:"14px", padding:"26px", transition:"border-color 0.2s, transform 0.2s", transform: hov ? "translateY(-3px)" : "none" }}>
      <div style={{ width:"42px", height:"42px", background: hov ? `${C.accent}18` : C.dim, borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"18px", transition:"background 0.2s", color: hov ? C.accent : C.muted }}>
        <Ico d={s.icon} size={19} />
      </div>
      <h3 style={{ margin:"0 0 8px", color: C.text, fontSize:"15px", fontWeight:700 }}>{s.title}</h3>
      <p style={{ margin:0, color: C.muted, fontSize:"13px", lineHeight:1.7 }}>{s.desc}</p>
    </div>
  );
}

// ── Projects ──────────────────────────────────────────────────────────
const CAT_LABELS = { all:"All", web:"Web Apps", ai:"AI", hardware:"IoT / Hardware", python:"Python" };

function Projects() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <Section id="projects" alt>
      <SectionLabel text="Work" />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"40px", flexWrap:"wrap", gap:"16px" }}>
        <SectionTitle>Projects</SectionTitle>
        {/* Filter tabs */}
        <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"56px" }}>
          {Object.entries(CAT_LABELS).map(([k, label]) => (
            <button key={k} onClick={() => setFilter(k)}
              style={{ background: filter===k ? C.accent : C.card, border:`1px solid ${filter===k ? C.accent : C.border}`, color: filter===k ? "#000" : C.muted, borderRadius:"6px", padding:"6px 14px", fontSize:"11px", fontWeight:700, cursor:"pointer", transition:"all 0.2s", letterSpacing:"0.5px" }}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
        {filtered.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
      </div>
    </Section>
  );
}

function ProjectCard({ p, i }) {
  const [hov, setHov] = useState(false);
  const [ref, vis] = useReveal();
  const initials = p.title.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase();
  const categoryIcon = { web:"M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9", ai:"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2", hardware:"M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9", python:"M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" }[p.category] || "";

  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(20px)", transition:`opacity 0.5s ease ${i*0.1}s, transform 0.5s ease ${i*0.1}s, border-color 0.2s`, background: C.card, border:`1px solid ${hov ? p.accent+"55" : C.border}`, borderRadius:"16px", overflow:"hidden", display:"flex" }}>
      {/* Left accent bar */}
      <div style={{ width:"72px", minWidth:"72px", background:`${p.accent}0e`, borderRight:`1px solid ${p.accent}18`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"8px", padding:"20px 0" }}>
        <span style={{ fontFamily:"'Cabinet Grotesk','Syne',sans-serif", fontSize:"18px", fontWeight:800, color: p.accent }}>{initials}</span>
        {categoryIcon && <div style={{ color:`${p.accent}60` }}><Ico d={categoryIcon} size={15} /></div>}
        <span style={{ fontSize:"8px", color:`${p.accent}70`, textTransform:"uppercase", letterSpacing:"1.5px", writingMode:"vertical-rl", textOrientation:"mixed", transform:"rotate(180deg)", paddingTop:"4px" }}>{p.year}</span>
      </div>

      {/* Content */}
      <div style={{ flex:1, padding:"26px 28px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"14px", flexWrap:"wrap", gap:"10px" }}>
          <div>
            <span style={{ background:`${p.accent}18`, color: p.accent, border:`1px solid ${p.accent}33`, borderRadius:"4px", padding:"2px 9px", fontSize:"10px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.8px", display:"inline-block", marginBottom:"8px" }}>{p.tag}</span>
            <div>
              <h3 style={{ margin:"0 0 2px", color: C.text, fontSize:"20px", fontWeight:800, fontFamily:"'Cabinet Grotesk','Syne',sans-serif", letterSpacing:"-0.5px" }}>{p.title}</h3>
              <p style={{ margin:0, color:`${p.accent}90`, fontSize:"13px", fontStyle:"italic" }}>{p.subtitle}</p>
            </div>
          </div>
          <a href={p.github} target="_blank" rel="noreferrer"
            style={{ display:"flex", alignItems:"center", gap:"6px", color: C.muted, textDecoration:"none", fontSize:"12px", transition:"color 0.2s", flexShrink:0, paddingTop:"22px" }}
            onMouseEnter={e => e.currentTarget.style.color = C.text}
            onMouseLeave={e => e.currentTarget.style.color = C.muted}>
            <GithubIcon size={14} /> GitHub
            <Ico d="M14 5l7 7m0 0l-7 7m7-7H3" size={13} />
          </a>
        </div>

        <p style={{ margin:"0 0 18px", color: C.muted, fontSize:"13.5px", lineHeight:1.75 }}>{p.description}</p>

        {/* Highlights */}
        <div style={{ display:"flex", flexDirection:"column", gap:"6px", marginBottom:"20px" }}>
          {p.highlights.map((h, j) => (
            <div key={j} style={{ display:"flex", alignItems:"flex-start", gap:"9px", fontSize:"13px", color: C.muted }}>
              <div style={{ width:"3px", height:"3px", borderRadius:"50%", background: p.accent, marginTop:"7px", flexShrink:0 }} />
              {h}
            </div>
          ))}
        </div>

        {/* Stack chips */}
        <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
          {p.stack.map(t => (
            <span key={t} style={{ background: C.dim, border:`1px solid ${C.border}`, borderRadius:"4px", padding:"3px 10px", fontSize:"11px", color: C.muted, letterSpacing:"0.2px" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Skills ────────────────────────────────────────────────────────────
function Skills() {
  return (
    <Section id="skills">
      <SectionLabel text="Tech Stack" />
      <SectionTitle>Skills & Tools</SectionTitle>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:"14px" }}>
        {SKILLS.map((g, i) => (
          <div key={i} style={{ background: C.card, border:`1px solid ${C.border}`, borderRadius:"14px", padding:"22px" }}>
            <div style={{ color: C.accent, fontSize:"9px", fontWeight:700, textTransform:"uppercase", letterSpacing:"2px", marginBottom:"14px" }}>{g.cat}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {g.items.map(item => (
                <div key={item} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                  <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:`${C.accent}55`, flexShrink:0 }} />
                  <span style={{ color: C.text, fontSize:"13.5px" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ── Timeline ──────────────────────────────────────────────────────────
function Timeline() {
  return (
    <Section id="timeline" alt>
      <SectionLabel text="My Journey" />
      <SectionTitle>How I Got Here</SectionTitle>
      <div style={{ position:"relative", paddingLeft:"36px" }}>
        <div style={{ position:"absolute", left:"8px", top:"10px", bottom:"10px", width:"2px", background:`linear-gradient(to bottom, ${C.accent}, ${C.accent}15)` }} />
        {TIMELINE.map((item, i) => <TimelineItem key={i} item={item} i={i} last={i===TIMELINE.length-1} />)}
      </div>
    </Section>
  );
}

function TimelineItem({ item, i, last }) {
  const [ref, vis] = useReveal(0.15);
  const isNow = item.year === "Now";
  return (
    <div ref={ref} style={{ display:"flex", gap:"28px", marginBottom: last?0:"40px", opacity: vis?1:0, transform: vis?"translateX(0)":"translateX(-16px)", transition:`opacity 0.5s ease ${i*0.08}s, transform 0.5s ease ${i*0.08}s`, position:"relative" }}>
      <div style={{ position:"absolute", left:"-32px", top:"10px", width:"14px", height:"14px", borderRadius:"50%", background: isNow ? C.accent : C.card, border:`2px solid ${isNow ? C.accent : C.accent+"55"}`, boxShadow: isNow ? `0 0 14px ${C.accent}77` : "none" }} />
      <div style={{ background: C.card, border:`1px solid ${C.border}`, borderRadius:"12px", padding:"18px 22px", flex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px", flexWrap:"wrap" }}>
          <span style={{ background:`${C.accent}18`, color: C.accent, border:`1px solid ${C.accent}33`, borderRadius:"4px", padding:"2px 9px", fontSize:"10px", fontWeight:700 }}>{item.year}</span>
          <h3 style={{ margin:0, color: C.text, fontSize:"15px", fontWeight:700, fontFamily:"'Cabinet Grotesk','Syne',sans-serif" }}>{item.title}</h3>
        </div>
        <p style={{ margin:0, color: C.muted, fontSize:"13.5px", lineHeight:1.7 }}>{item.desc}</p>
      </div>
    </div>
  );
}

// ── Contact ───────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name:"", email:"", project:"", message:"" });
  const [sent, setSent] = useState(false);
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); if (form.name && form.email && form.message) setSent(true); };

  const inp = { width:"100%", background: C.bg, border:`1px solid ${C.border}`, borderRadius:"9px", padding:"11px 14px", color: C.text, fontSize:"13.5px", outline:"none", boxSizing:"border-box", fontFamily:"'DM Sans',sans-serif", transition:"border-color 0.2s" };

  const contactItems = [
    ["Email", "karmanjeruh5@gmail.com", "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"],
    ["Phone", "+254 793 960 550", "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"],
    ["Location", "Nairobi, Kenya", "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"],
    ["Status", "Open to work ✦", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"],
  ];

  return (
    <Section id="contact" alt>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"72px", alignItems:"start" }} className="two-col">
        <div>
          <SectionLabel text="Contact" />
          <h2 style={{ margin:"0 0 18px", fontFamily:"'Cabinet Grotesk','Syne',sans-serif", fontSize:"clamp(28px,4vw,44px)", fontWeight:800, color: C.text, letterSpacing:"-1px", lineHeight:1.1 }}>
            Let's build something real.
          </h2>
          <p style={{ color: C.muted, lineHeight:1.85, fontSize:"15px", margin:"0 0 40px" }}>
            Have a project in mind? Whether it's a full-stack app, an IoT system, an AI integration, or something else entirely — let's talk.
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
            {contactItems.map(([k, v, icon]) => (
              <div key={k} style={{ display:"flex", alignItems:"center", gap:"14px" }}>
                <div style={{ width:"38px", height:"38px", background: C.card, border:`1px solid ${C.border}`, borderRadius:"9px", display:"flex", alignItems:"center", justifyContent:"center", color: C.accent, flexShrink:0 }}>
                  <Ico d={icon} size={16} />
                </div>
                <div>
                  <div style={{ color: C.muted, fontSize:"10px", textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:"2px" }}>{k}</div>
                  <div style={{ color: C.text, fontSize:"13.5px" }}>{v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: C.card, border:`1px solid ${C.border}`, borderRadius:"16px", padding:"30px" }}>
          {sent ? (
            <div style={{ textAlign:"center", padding:"48px 0" }}>
              <div style={{ width:"56px", height:"56px", background:`${C.accent3}18`, border:`1px solid ${C.accent3}44`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", color: C.accent3 }}>
                <Ico d="M5 13l4 4L19 7" size={24} />
              </div>
              <h3 style={{ color: C.text, fontFamily:"'Cabinet Grotesk','Syne',sans-serif", fontSize:"22px", margin:"0 0 8px" }}>Message sent!</h3>
              <p style={{ color: C.muted, fontSize:"14px" }}>I'll get back to you within 24 hours.</p>
              <button onClick={() => { setSent(false); setForm({ name:"", email:"", project:"", message:"" }); }}
                style={{ marginTop:"20px", background:"transparent", border:`1px solid ${C.border}`, color: C.muted, padding:"8px 20px", borderRadius:"8px", cursor:"pointer", fontSize:"13px" }}>
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
                {[["Name","name","text","Your name"],["Email","email","email","your@email.com"]].map(([l,k,t,ph]) => (
                  <div key={k}>
                    <label style={{ display:"block", color: C.muted, fontSize:"10px", textTransform:"uppercase", letterSpacing:"1.2px", marginBottom:"7px" }}>{l}</label>
                    <input style={inp} type={t} value={form[k]} onChange={set(k)} placeholder={ph}
                      onFocus={e => e.target.style.borderColor = C.accent}
                      onBlur={e => e.target.style.borderColor = C.border} />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ display:"block", color: C.muted, fontSize:"10px", textTransform:"uppercase", letterSpacing:"1.2px", marginBottom:"7px" }}>Project Type</label>
                <select style={{ ...inp, appearance:"none" }} value={form.project} onChange={set("project")}
                  onFocus={e => e.target.style.borderColor = C.accent}
                  onBlur={e => e.target.style.borderColor = C.border}>
                  <option value="" style={{ background: C.bg }}>Select a service…</option>
                  {["Full-Stack Web App","Real-Time Dashboard","IoT / Hardware System","AI Integration","API Development","Other"].map(o => (
                    <option key={o} value={o} style={{ background: C.bg }}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display:"block", color: C.muted, fontSize:"10px", textTransform:"uppercase", letterSpacing:"1.2px", marginBottom:"7px" }}>Message</label>
                <textarea style={{ ...inp, resize:"vertical", minHeight:"110px" }} value={form.message} onChange={set("message")} placeholder="Tell me about your project…"
                  onFocus={e => e.target.style.borderColor = C.accent}
                  onBlur={e => e.target.style.borderColor = C.border} />
              </div>
              <button type="submit" style={{ background: C.accent, border:"none", color:"#000", padding:"13px", borderRadius:"9px", fontSize:"14px", fontWeight:700, cursor:"pointer", letterSpacing:"0.2px" }}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop:`1px solid ${C.border}`, padding:"28px 24px", textAlign:"center", background: C.bg }}>
      <p style={{ margin:0, color: C.muted, fontSize:"12px" }}>
        © {new Date().getFullYear()} Karma Kioko · Built with React + Vite · Deployed on Vercel
      </p>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: C.bg, color: C.text, fontFamily:"'DM Sans',sans-serif", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { background:${C.bg}; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        input::placeholder, textarea::placeholder { color:${C.muted}; opacity:0.5; }
        select option { background:${C.bg}; color:${C.text}; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:${C.border}; border-radius:3px; }
        @media (max-width:700px) {
          .two-col { grid-template-columns:1fr !important; gap:36px !important; }
          .nav-links { display:none !important; }
        }
      `}</style>
      <Nav />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Skills />
      <Timeline />
      <Contact />
      <Footer />
    </div>
  );
}