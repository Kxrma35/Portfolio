import { useState, useEffect, useRef } from "react";

// ── Theme ─────────────────────────────────────────────────────────────
// Blue/cool toned palette
const C = {
  accent:  "#3b82f6",   // blue-500
  accent2: "#60a5fa",   // blue-400
  accentD: "#1d4ed8",   // blue-700
  glow:    "#3b82f618",
  bg:      "#070b14",
  bg2:     "#0b1120",
  card:    "#0f172a",
  border:  "#1e293b",
  borderH: "#3b82f644",
  text:    "#e2e8f0",
  muted:   "#475569",
  dim:     "#1e293b",
};

// ── Icons ─────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// ── Data ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: "Smart Home Dashboard",
    tag: "Featured",
    year: "2024",
    stack: ["React", "Node.js", "Socket.io", "Raspberry Pi", "GPIO", "Ollama AI"],
    description: "A production-grade real-time home monitoring and control system. Features live sensor data, camera motion detection, device state management, automation logging, and a natural language AI assistant — all running on a Raspberry Pi 5 backend.",
    highlights: ["Real-time bidirectional comms via Socket.io", "GPIO hardware integration for device control", "Local LLM (Ollama) for natural language commands", "PM2-managed Node.js backend on Linux"],
    github: "https://github.com/Kxrma35",
    accent: "#3b82f6",
  },
  {
    id: 2,
    title: "Cinemascope",
    tag: "Web App",
    year: "2024",
    stack: ["React", "Vite", "Lucide", "CSS-in-JS"],
    description: "An editorial-styled film catalog with full CRUD, genre filtering, search, sort, and staggered animations. Built as a showcase of component architecture and state management.",
    highlights: ["Dynamic .map() rendering with stagger animation", "Genre filter pills + multi-sort", "Add/delete with controlled form inputs", "Deployed to Vercel"],
    github: "https://github.com/Kxrma35",
    accent: "#818cf8",
  },
  {
    id: 3,
    title: "This Portfolio",
    tag: "Portfolio",
    year: "2024",
    stack: ["React", "Vite", "CSS", "Vercel"],
    description: "Fully custom-built portfolio with cinematic dark aesthetic, smooth scroll navigation, animated sections, and a working contact form.",
    highlights: ["Zero UI library — fully hand-crafted", "Intersection Observer scroll animations", "Mobile-responsive layout", "Deployed on Vercel"],
    github: "https://github.com/Kxrma35",
    accent: "#38bdf8",
  },
];

const SERVICES = [
  { icon: "M4 6h16M4 10h16M4 14h16M4 18h16", title: "Full-Stack Web Apps", desc: "End-to-end React + Node.js applications — from database to deployed UI. Clean architecture, real data, production-ready." },
  { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Real-Time Dashboards", desc: "Live data interfaces powered by Socket.io. Analytics panels, monitoring tools, device control — anything that needs to update instantly." },
  { icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18", title: "IoT & Hardware Systems", desc: "Raspberry Pi backends wired to web frontends. Sensor monitoring, GPIO device control, motion detection — hardware meets software." },
  { icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z", title: "AI Integration", desc: "Embed local LLMs (Ollama) or cloud AI into your product for natural language interfaces, smart automation, and chat assistants." },
  { icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", title: "API Development", desc: "RESTful API design and implementation with Node.js and Express. Structured endpoints, error handling, and clean documentation." },
  { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", title: "Maintenance & Support", desc: "Bug hunting, performance tuning, refactoring messy codebases, and SSH-based remote server troubleshooting." },
];

const SKILLS = [
  { cat: "Frontend",   items: ["React", "Vite", "HTML5", "CSS3", "JavaScript (ES6+)", "React Router", "Socket.io Client"] },
  { cat: "Backend",    items: ["Node.js", "Express", "Socket.io", "REST APIs", "PM2", "Linux / Ubuntu"] },
  { cat: "Hardware",   items: ["Raspberry Pi 5", "GPIO Control", "Sensor Integration", "Motion Detection", "SSH Administration"] },
  { cat: "AI & Tools", items: ["Ollama / Local LLMs", "Git & GitHub", "Vercel", "GitHub Pages", "VS Code"] },
];

const TIMELINE = [
  { year: "2022", title: "First Line of Code", desc: "Started self-teaching web development out of pure curiosity. HTML, CSS, and JavaScript — built my first static websites." },
  { year: "2023", title: "Going Full-Stack", desc: "Discovered React and Node.js. Built first dynamic apps, learned about APIs, databases, and how the web actually works under the hood." },
  { year: "2023", title: "Hardware Meets Software", desc: "Got my first Raspberry Pi. Started wiring sensors, writing GPIO scripts, and realising that software could control physical things." },
  { year: "2024", title: "Smart Home Dashboard", desc: "Launched my flagship project — a production-grade real-time IoT dashboard running on a Pi 5 with Socket.io, motion detection, and an AI assistant." },
  { year: "2024", title: "Cybersecurity Focus", desc: "Began pursuing cybersecurity — studying network security, server hardening, and working towards CompTIA Security+." },
  { year: "Now",  title: "Open for Freelance", desc: "Actively taking on freelance projects. Building in public, learning every day, and looking for the right team to grow with." },
];

const TESTIMONIALS = [
  {
    name: "Add your first client here",
    role: "Client / Colleague",
    text: "Once you complete your first freelance project, replace this with a real testimonial. Ask your client for a short quote about working with you — even a sentence or two goes a long way.",
    initials: "?",
    accent: "#3b82f6",
  },
  {
    name: "Classmate / Peer",
    role: "Fellow Developer",
    text: "You can also ask a teacher, mentor, or peer who has seen your work. A testimonial from someone who watched you build the Smart Home Dashboard would be very credible.",
    initials: "?",
    accent: "#818cf8",
  },
];

const BLOG_POSTS = [
  {
    id: 1,
    title: "How I Built a Real-Time Smart Home Dashboard on a Raspberry Pi",
    date: "December 2024",
    tag: "IoT",
    tagColor: "#3b82f6",
    excerpt: "A deep dive into wiring Socket.io, GPIO sensors, and a Node.js backend together on a Pi 5 — and all the things that went wrong along the way.",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "Self-Teaching Full-Stack Dev at 18: What Actually Works",
    date: "November 2024",
    tag: "Learning",
    tagColor: "#818cf8",
    excerpt: "No bootcamp, no degree — just documentation, broken projects, and stubbornness. Here's the honest breakdown of how I went from zero to deployed apps.",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Running a Local LLM on Raspberry Pi for Smart Home Control",
    date: "October 2024",
    tag: "AI",
    tagColor: "#38bdf8",
    excerpt: "Integrating Ollama and the phi3 model into a Node.js backend for natural language device control — performance tips, pitfalls, and what surprised me.",
    readTime: "5 min read",
  },
];

// ── Hooks ─────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Section wrapper ───────────────────────────────────────────────────
function Section({ id, children, style = {} }) {
  const [ref, vis] = useReveal();
  return (
    <section id={id} ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(32px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
      ...style,
    }}>
      {children}
    </section>
  );
}

// ── Section label ─────────────────────────────────────────────────────
function SectionLabel({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
      <div style={{ width: "24px", height: "1px", background: C.accent }} />
      <span style={{ color: C.accent, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "3px" }}>{label}</span>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{ margin: "0 0 60px", fontFamily: "'Syne', serif", fontSize: "clamp(32px,5vw,48px)", fontWeight: 800, color: C.text, letterSpacing: "-1px" }}>
      {children}
    </h2>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["About", "Services", "Projects", "Timeline", "Skills", "Blog", "Contact"];
  const go = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(7,11,20,0.95)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent", transition: "all 0.3s ease" }}>
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 800, color: C.text, letterSpacing: "-0.5px" }}>
        K<span style={{ color: C.accent }}>.</span>
      </button>
      <div style={{ display: "flex", gap: "28px" }}>
        {links.map(l => (
          <button key={l} onClick={() => go(l)} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: "12px", fontWeight: 500, letterSpacing: "0.5px", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = C.accent}
            onMouseLeave={e => e.target.style.color = C.muted}>
            {l}
          </button>
        ))}
      </div>
      <a href="mailto:karmanjeruh5@gmail.com" style={{ background: C.accent, color: "#fff", padding: "8px 18px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, textDecoration: "none" }}>
        Hire Me
      </a>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────
function Hero() {
  const words = ["Full-Stack", "Real-Time", "IoT", "AI-Powered", "Cybersecurity"];
  const [wi, setWi] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWi(i => (i + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 24px", position: "relative", overflow: "hidden" }}>
      {/* Grid bg */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize: "60px 60px", opacity: 0.25, pointerEvents: "none" }} />
      {/* Blue glow */}
      <div style={{ position: "absolute", top: "20%", left: "55%", width: "600px", height: "600px", background: `radial-gradient(circle, ${C.glow} 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "10%", width: "400px", height: "400px", background: `radial-gradient(circle, #818cf810 0%, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px", animation: "fadeUp 0.6s ease 0.1s both" }}>
          <div style={{ width: "32px", height: "1px", background: C.accent }} />
          <span style={{ color: C.accent, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "3px" }}>Available for Freelance</span>
        </div>

        <h1 style={{ margin: "0 0 8px", fontFamily: "'Syne', sans-serif", fontSize: "clamp(48px,9vw,88px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-2px", color: C.text, animation: "fadeUp 0.6s ease 0.2s both" }}>
          Karma Kioko
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px", animation: "fadeUp 0.6s ease 0.3s both", flexWrap: "wrap" }}>
          <span key={wi} style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(24px,5vw,42px)", fontWeight: 700, color: C.accent, minWidth: "240px", animation: "fadeUp 0.3s ease both" }}>
            {words[wi]}
          </span>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(24px,5vw,42px)", fontWeight: 400, color: C.muted }}>Developer</span>
        </div>

        <p style={{ margin: "0 0 48px", color: C.muted, fontSize: "clamp(15px,2vw,18px)", lineHeight: 1.8, maxWidth: "560px", animation: "fadeUp 0.6s ease 0.4s both" }}>
          I build real-time web applications, IoT-connected systems, and AI-powered interfaces — from hardware to deployed product. Based in Nairobi, Kenya.
        </p>

        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", animation: "fadeUp 0.6s ease 0.5s both" }}>
          <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: C.accent, border: "none", color: "#fff", padding: "14px 32px", borderRadius: "10px", fontSize: "14px", fontWeight: 700, cursor: "pointer", transition: "opacity 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            View My Work
          </button>
          <a href="/Karma_Kioko_Resume.docx" download
            style={{ display: "flex", alignItems: "center", gap: "8px", background: "transparent", border: `1px solid ${C.border}`, color: C.text, padding: "14px 32px", borderRadius: "10px", fontSize: "14px", fontWeight: 500, cursor: "pointer", textDecoration: "none", transition: "border-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
            <Icon d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" size={15} />
            Download CV
          </a>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.text, padding: "14px 32px", borderRadius: "10px", fontSize: "14px", fontWeight: 500, cursor: "pointer", transition: "border-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
            Get In Touch
          </button>
        </div>

        <div style={{ display: "flex", gap: "40px", marginTop: "80px", animation: "fadeUp 0.6s ease 0.6s both", flexWrap: "wrap" }}>
          {[["18", "Years Old"], ["2+", "Years Building"], ["10+", "Technologies"], ["100%", "Self-Taught"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "32px", fontWeight: 800, color: C.text, lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: "11px", color: C.muted, marginTop: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>{l}</div>
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
    <Section id="about" style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="about-grid">
        <div>
          <SectionLabel label="About Me" />
          <h2 style={{ margin: "0 0 24px", fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,5vw,48px)", fontWeight: 800, color: C.text, lineHeight: 1.1, letterSpacing: "-1px" }}>
            Building things that actually work.
          </h2>
          <p style={{ color: C.muted, lineHeight: 1.9, fontSize: "15px", margin: "0 0 20px" }}>
            I'm a self-taught full-stack developer based in Nairobi, Kenya. I started coding by curiosity and never stopped — teaching myself everything from React interfaces to Raspberry Pi GPIO wiring.
          </p>
          <p style={{ color: C.muted, lineHeight: 1.9, fontSize: "15px", margin: "0 0 32px" }}>
            My most ambitious project is a Smart Home Dashboard that runs on real hardware — a live system with sensor monitoring, motion detection, device control, and an AI assistant powered by a local LLM. I care about things that actually deploy, run, and work in the real world.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="https://github.com/Kxrma35" target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "8px", color: C.muted, textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = C.accent}
              onMouseLeave={e => e.currentTarget.style.color = C.muted}>
              <GithubIcon /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/karma-njeruh-165a14303" target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "8px", color: C.muted, textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = C.accent}
              onMouseLeave={e => e.currentTarget.style.color = C.muted}>
              <LinkedinIcon /> LinkedIn
            </a>
            <a href="/Karma_Kioko_Resume.docx" download
              style={{ display: "flex", alignItems: "center", gap: "8px", color: C.accent, textDecoration: "none", fontSize: "13px", border: `1px solid ${C.accent}44`, padding: "6px 14px", borderRadius: "6px", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = `${C.accent}18`}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <Icon d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" size={14} /> Download CV
            </a>
          </div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "32px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: "200px", height: "200px", background: `radial-gradient(circle, ${C.glow} 0%, transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "64px", fontWeight: 800, color: C.accent, lineHeight: 1, marginBottom: "8px" }}>KK</div>
          <div style={{ color: C.text, fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>Karma Kioko</div>
          <div style={{ color: C.muted, fontSize: "13px", marginBottom: "28px" }}>Nairobi, Kenya</div>
          {[
            ["Stack",  "React · Node.js · Socket.io · Raspberry Pi"],
            ["Focus",  "Full-Stack · IoT · Real-Time · Cybersecurity"],
            ["Status", "Open to freelance projects"],
          ].map(([k, v]) => (
            <div key={k} style={{ borderTop: `1px solid ${C.border}`, padding: "14px 0", display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ color: C.muted, fontSize: "10px", textTransform: "uppercase", letterSpacing: "1.5px" }}>{k}</span>
              <span style={{ color: C.text, fontSize: "13px" }}>{v}</span>
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
    <Section id="services" style={{ padding: "120px 24px", background: C.bg2 }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <SectionLabel label="What I Do" />
        <SectionTitle>Services</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
          {SERVICES.map((s, i) => <ServiceCard key={i} service={s} />)}
        </div>
      </div>
    </Section>
  );
}

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: C.card, border: `1px solid ${hovered ? C.accent + "44" : C.border}`, borderRadius: "14px", padding: "28px", transition: "border-color 0.2s, transform 0.2s", transform: hovered ? "translateY(-3px)" : "translateY(0)" }}>
      <div style={{ width: "44px", height: "44px", background: hovered ? `${C.accent}22` : C.dim, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", transition: "background 0.2s", color: hovered ? C.accent : C.muted }}>
        <Icon d={service.icon} size={20} />
      </div>
      <h3 style={{ margin: "0 0 10px", color: C.text, fontSize: "16px", fontWeight: 700 }}>{service.title}</h3>
      <p style={{ margin: 0, color: C.muted, fontSize: "13px", lineHeight: 1.7 }}>{service.desc}</p>
    </div>
  );
}

// ── Projects ──────────────────────────────────────────────────────────
function Projects() {
  return (
    <Section id="projects" style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <SectionLabel label="Work" />
        <SectionTitle>Projects</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </Section>
  );
}

function ProjectCard({ project: p, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, vis] = useReveal();
  const initials = p.title.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.5s ease ${index * 0.12}s, transform 0.5s ease ${index * 0.12}s, border-color 0.2s`, background: C.card, border: `1px solid ${hovered ? p.accent + "55" : C.border}`, borderRadius: "16px", overflow: "hidden", display: "flex" }}>
      <div style={{ width: "80px", minWidth: "80px", background: `${p.accent}12`, borderRight: `1px solid ${p.accent}22`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px" }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 800, color: p.accent }}>{initials}</span>
        <span style={{ fontSize: "9px", color: p.accent + "80", textTransform: "uppercase", letterSpacing: "2px" }}>{p.year}</span>
      </div>
      <div style={{ flex: 1, padding: "28px 28px 28px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", marginBottom: "12px", flexWrap: "wrap" }}>
          <div>
            <span style={{ background: `${p.accent}22`, color: p.accent, border: `1px solid ${p.accent}44`, borderRadius: "4px", padding: "2px 8px", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "8px", display: "inline-block" }}>{p.tag}</span>
            <h3 style={{ margin: 0, color: C.text, fontSize: "20px", fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>{p.title}</h3>
          </div>
          <a href={p.github} target="_blank" rel="noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "6px", color: C.muted, textDecoration: "none", fontSize: "12px", transition: "color 0.2s", flexShrink: 0, marginTop: "20px" }}
            onMouseEnter={e => e.currentTarget.style.color = C.text}
            onMouseLeave={e => e.currentTarget.style.color = C.muted}>
            <GithubIcon /> View Code
          </a>
        </div>
        <p style={{ margin: "0 0 20px", color: C.muted, fontSize: "14px", lineHeight: 1.7 }}>{p.description}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px" }}>
          {p.highlights.map((h, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: C.muted }}>
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: p.accent, marginTop: "6px", flexShrink: 0 }} />
              {h}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {p.stack.map(t => (
            <span key={t} style={{ background: C.dim, border: `1px solid ${C.border}`, borderRadius: "4px", padding: "3px 10px", fontSize: "11px", color: C.muted }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Timeline ──────────────────────────────────────────────────────────
function Timeline() {
  return (
    <Section id="timeline" style={{ padding: "120px 24px", background: C.bg2 }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <SectionLabel label="My Journey" />
        <SectionTitle>How I Got Here</SectionTitle>
        <div style={{ position: "relative", paddingLeft: "32px" }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: "7px", top: "8px", bottom: "8px", width: "2px", background: `linear-gradient(to bottom, ${C.accent}, ${C.accent}22)` }} />
          {TIMELINE.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} last={i === TIMELINE.length - 1} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function TimelineItem({ item, index, last }) {
  const [ref, vis] = useReveal(0.2);
  const isNow = item.year === "Now";
  return (
    <div ref={ref} style={{ display: "flex", gap: "28px", marginBottom: last ? 0 : "48px", opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(-20px)", transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`, position: "relative" }}>
      {/* Dot */}
      <div style={{ position: "absolute", left: "-28px", top: "4px", width: "16px", height: "16px", borderRadius: "50%", background: isNow ? C.accent : C.card, border: `2px solid ${isNow ? C.accent : C.accent + "66"}`, flexShrink: 0, boxShadow: isNow ? `0 0 12px ${C.accent}66` : "none" }} />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "20px 24px", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px", flexWrap: "wrap" }}>
          <span style={{ background: `${C.accent}22`, color: C.accent, border: `1px solid ${C.accent}44`, borderRadius: "4px", padding: "2px 10px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.5px" }}>{item.year}</span>
          <h3 style={{ margin: 0, color: C.text, fontSize: "16px", fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>{item.title}</h3>
        </div>
        <p style={{ margin: 0, color: C.muted, fontSize: "14px", lineHeight: 1.7 }}>{item.desc}</p>
      </div>
    </div>
  );
}

// ── Skills ────────────────────────────────────────────────────────────
function Skills() {
  return (
    <Section id="skills" style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <SectionLabel label="Tech Stack" />
        <SectionTitle>Skills</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          {SKILLS.map((group, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "14px", padding: "24px" }}>
              <div style={{ color: C.accent, fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>{group.cat}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {group.items.map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: `${C.accent}66`, flexShrink: 0 }} />
                    <span style={{ color: C.text, fontSize: "14px" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────
function Testimonials() {
  return (
    <Section id="testimonials" style={{ padding: "120px 24px", background: C.bg2 }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <SectionLabel label="Kind Words" />
        <SectionTitle>Testimonials</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "20px" }}>
          {TESTIMONIALS.map((t, i) => <TestimonialCard key={i} t={t} index={i} />)}
        </div>
        <p style={{ marginTop: "32px", color: C.muted, fontSize: "13px", textAlign: "center" }}>
          Replace the placeholder cards above once you complete your first freelance project — real testimonials make a huge difference.
        </p>
      </div>
    </Section>
  );
}

function TestimonialCard({ t, index }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`, background: C.card, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "28px", position: "relative" }}>
      {/* Quote mark */}
      <div style={{ fontSize: "48px", lineHeight: 1, color: `${C.accent}33`, fontFamily: "Georgia, serif", marginBottom: "16px" }}>"</div>
      <p style={{ margin: "0 0 24px", color: C.muted, fontSize: "14px", lineHeight: 1.8, fontStyle: "italic" }}>{t.text}</p>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: `${t.accent}22`, border: `1px solid ${t.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 700, color: t.accent, fontFamily: "'Syne', sans-serif" }}>{t.initials}</div>
        <div>
          <div style={{ color: C.text, fontSize: "14px", fontWeight: 700 }}>{t.name}</div>
          <div style={{ color: C.muted, fontSize: "12px" }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

// ── Blog ──────────────────────────────────────────────────────────────
function Blog() {
  return (
    <Section id="blog" style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <SectionLabel label="Writing" />
        <SectionTitle>Blog</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {BLOG_POSTS.map((post, i) => <BlogCard key={post.id} post={post} index={i} />)}
        </div>
        <p style={{ marginTop: "32px", color: C.muted, fontSize: "13px", textAlign: "center" }}>
          These are draft topics — start writing on <a href="https://dev.to" target="_blank" rel="noreferrer" style={{ color: C.accent, textDecoration: "none" }}>dev.to</a> or <a href="https://hashnode.com" target="_blank" rel="noreferrer" style={{ color: C.accent, textDecoration: "none" }}>Hashnode</a> (both free) and link each post here.
        </p>
      </div>
    </Section>
  );
}

function BlogCard({ post, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s, border-color 0.2s`, background: C.card, border: `1px solid ${hovered ? C.accent + "44" : C.border}`, borderRadius: "14px", padding: "24px 28px", cursor: "pointer" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
            <span style={{ background: `${post.tagColor}22`, color: post.tagColor, border: `1px solid ${post.tagColor}44`, borderRadius: "4px", padding: "2px 8px", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px" }}>{post.tag}</span>
            <span style={{ color: C.muted, fontSize: "12px" }}>{post.date}</span>
            <span style={{ color: C.muted, fontSize: "12px" }}>·</span>
            <span style={{ color: C.muted, fontSize: "12px" }}>{post.readTime}</span>
          </div>
          <h3 style={{ margin: "0 0 10px", color: C.text, fontSize: "17px", fontWeight: 700, fontFamily: "'Syne', sans-serif", lineHeight: 1.3 }}>{post.title}</h3>
          <p style={{ margin: 0, color: C.muted, fontSize: "14px", lineHeight: 1.7 }}>{post.excerpt}</p>
        </div>
        <div style={{ color: C.muted, transition: "color 0.2s, transform 0.2s", transform: hovered ? "translateX(4px)" : "translateX(0)", flexShrink: 0, paddingTop: "4px" }}>
          <Icon d="M14 5l7 7m0 0l-7 7m7-7H3" size={18} />
        </div>
      </div>
    </div>
  );
}

// ── Contact ───────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); if (form.name && form.email && form.message) setSent(true); };
  const inp = { width: "100%", background: C.card, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "12px 16px", color: C.text, fontSize: "14px", outline: "none", boxSizing: "border-box", fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.2s" };
  return (
    <Section id="contact" style={{ padding: "120px 24px 160px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }} className="contact-grid">
        <div>
          <SectionLabel label="Contact" />
          <h2 style={{ margin: "0 0 20px", fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,5vw,48px)", fontWeight: 800, color: C.text, letterSpacing: "-1px", lineHeight: 1.1 }}>
            Let's build something great.
          </h2>
          <p style={{ color: C.muted, lineHeight: 1.8, fontSize: "15px", margin: "0 0 40px" }}>
            Have a project in mind? I'm currently available for freelance work. Whether it's a full-stack app, a real-time dashboard, or an IoT system — let's talk.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              ["Email",    "karmanjeruh5@gmail.com"],
              ["Location","Nairobi, Kenya"],
              ["Status",  "Open to work ✦"],
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{ color: C.muted, fontSize: "10px", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "4px" }}>{k}</div>
                <div style={{ color: C.text, fontSize: "14px" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "32px" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>✦</div>
              <h3 style={{ color: C.text, fontFamily: "'Syne', sans-serif", fontSize: "22px", margin: "0 0 10px" }}>Message sent!</h3>
              <p style={{ color: C.muted, fontSize: "14px" }}>I'll get back to you within 24 hours.</p>
              <button onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                style={{ marginTop: "20px", background: "transparent", border: `1px solid ${C.border}`, color: C.muted, padding: "8px 20px", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[["Name", "name", "text", "Your name"], ["Email", "email", "email", "your@email.com"]].map(([label, key, type, ph]) => (
                <div key={key}>
                  <label style={{ display: "block", color: C.muted, fontSize: "10px", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "8px" }}>{label}</label>
                  <input style={inp} type={type} value={form[key]} onChange={set(key)} placeholder={ph}
                    onFocus={e => e.target.style.borderColor = C.accent}
                    onBlur={e => e.target.style.borderColor = C.border} />
                </div>
              ))}
              <div>
                <label style={{ display: "block", color: C.muted, fontSize: "10px", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "8px" }}>Message</label>
                <textarea style={{ ...inp, resize: "vertical", minHeight: "120px" }} value={form.message} onChange={set("message")} placeholder="Tell me about your project…"
                  onFocus={e => e.target.style.borderColor = C.accent}
                  onBlur={e => e.target.style.borderColor = C.border} />
              </div>
              <button type="submit" style={{ background: C.accent, border: "none", color: "#fff", padding: "14px", borderRadius: "10px", fontSize: "14px", fontWeight: 700, cursor: "pointer", transition: "opacity 0.15s" }}
                onMouseEnter={e => e.target.style.opacity = "0.85"}
                onMouseLeave={e => e.target.style.opacity = "1"}>
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
    <footer style={{ borderTop: `1px solid ${C.border}`, padding: "28px 24px", textAlign: "center" }}>
      <p style={{ margin: 0, color: C.dim, fontSize: "12px" }}>
        © {new Date().getFullYear()} Karma Kioko · Built with React · Deployed on Vercel
      </p>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        input::placeholder, textarea::placeholder { color: #1e293b; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
        @media (max-width: 680px) {
          .about-grid, .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          nav div { display: none !important; }
        }
      `}</style>
      <Nav />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Timeline />
      <Skills />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}