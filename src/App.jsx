import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #080808;
    --surface: #111111;
    --border: #1e1e1e;
    --text: #f0ede8;
    --muted: #6b6b6b;
    --teal: #2ec4b6;
    --orange: #f4a261;
    --display: 'Space Grotesk', sans-serif;
    --body: 'Inter', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--body);
    overflow-x: hidden;
  }

  /* NAV — centered */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    gap: 3rem;
    padding: 1.6rem 3rem;
    background: rgba(8,8,8,0.7);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  nav a {
    font-family: var(--display);
    font-size: 1.1 rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s;
    cursor: pointer;
    position: relative;
    padding-bottom: 2px;
  }
  nav a::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0; right: 0;
    height: 1px;
    background: var(--teal);
    transform: scaleX(0);
    transition: transform 0.25s;
  }
  nav a:hover, nav a.active { color: var(--text); }
  nav a:hover::after, nav a.active::after { transform: scaleX(1); }

  /* SECTIONS */
  section {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }

  /* WAVE BG */
  .wave-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.15;
  }

  /* ACCENT BAR */
  .accent-bar {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--teal) 0%, var(--teal) 50%, var(--orange) 50%, var(--orange) 100%);
  }

  /* HOME */
  #home .inner {
    padding: 0 3rem;
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 4rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
  
  .home-name {
    font-family: var(--display);
    font-size: clamp(4.5rem, 10vw, 9rem);
    font-weight: 700;
    line-height: 0.9;
    letter-spacing: -0.04em;
    color: var(--text);
  }
  .home-role {
  margin-top: 2rem;
  font-size: 1.6rem;
  color: #ffffff;
  font-weight: 400;
  line-height: 1.8;
  max-width: 650px;
}
  .home-cta {
    margin-top: 2.5rem;
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .btn-primary {
    font-family: var(--display);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.85rem 2.2rem;
    background: var(--teal);
    color: var(--bg);
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .btn-primary:hover { background: #26b0a3; transform: translateY(-1px); }
  .btn-secondary {
    font-family: var(--display);
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.85rem 2.2rem;
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border);
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
  }
  .btn-secondary:hover { color: var(--text); border-color: var(--muted); }

  .home-image-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .photo-frame {
    position: relative;
    width: 340px;
    height: 340px;
  }
    .orbit-container {
  position: absolute;
  inset: 0;
  animation: spin 15s linear infinite;
}
  .photo-circle {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: var(--surface);
    border: 1px solid var(--border);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
  }
  .photo-placeholder {
    font-family: var(--display);
    font-size: 5.5rem;
    font-weight: 700;
    color: var(--muted);
    letter-spacing: -0.05em;
  }
  .photo-ring {
    position: absolute;
    inset: -16px;
    border-radius: 50%;
    border: 1px solid var(--border);
    animation: spin 20s linear infinite;
  }
  .photo-ring-2 {
    position: absolute;
    inset: -34px;
    border-radius: 50%;
    border: 1px dashed #1e1e1e;
    animation: spin 38s linear infinite reverse;
  }
  .photo-teal-dot {
  position: absolute;
  width: 12px;
  height: 12px;
  background: var(--teal);
  border-radius: 50%;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
}

.photo-orange-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--orange);
  border-radius: 50%;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
}
  @keyframes spin { to { transform: rotate(360deg); } }
  .profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 15%;
  display: block;
}
  

  /* SECTION LABEL */
  .section-label {
    font-family: var(--display);
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 1rem;
  }
  .section-title {
    font-family: var(--display);
    font-size: clamp(3rem, 6vw, 5.5rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 0.93;
    color: var(--text);
    margin-bottom: 3rem;
  }

  /* SKILLS */
  #skills .inner {
    padding: 7rem 3rem;
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }
  .skill-card {
    background: var(--bg);
    padding: 2.5rem 2.2rem;
    transition: background 0.2s;
  }
 .skill-card h3 {
  font-size: 3 rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;
}

.skill-card:hover h3 {
  color: #2ec4b6;
}
  .skill-cat {
    font-family: var(--display);
    font-size: 0.7 rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--teal);
    margin-bottom: 1.5rem;
  }
  .skill-list { list-style: none; }
 .skill-card li {
  font-size: 1.5rem;
  color: #ffffff;
  transition: color 0.3s ease;
}

.skill-card li:hover {
  color: #2ec4b6;
}
  .skill-list li:last-child { border-bottom: none; }
  .skill-list li:hover { color: var(--text); }
  .skill-dot {
    width: 5px; height: 5px;
    background: var(--teal);
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* WORK */
  #work .inner {
    padding: 7rem 3rem;
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
  .work-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }
  .work-card {
    background: var(--bg);
    padding: 2.8rem 2.5rem;
    transition: background 0.25s;
    cursor: pointer;
    position: relative;
  }
  .work-card:hover { background: var(--surface); }
  .work-card:hover .work-arrow { transform: translate(4px, -4px); color: var(--teal); }
  .work-num {
    font-family: var(--display);
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: var(--border);
    margin-bottom: 1.5rem;
  }
  .work-title {
    font-family: var(--display);
    font-size: 1.65rem;
    font-weight: 700;
    color: var(--teal);
    margin-bottom: 0.85rem;
    letter-spacing: -0.025em;
    line-height: 1.1;
  }
  .project-description {
  color: #ffffff;
  font-size: 1.15rem;
  line-height: 1.8;
}
  .work-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }
  .tag {
    font-family: var(--display);
    font-size: 1.5 rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.35rem 0.8 rem;
    border: 1px solid var(--border);
    color: var(--muted);
    transition: border-color 0.2s, color 0.2s;
  }
  .work-card:hover .tag { border-color: #2a2a2a; color: #888; }
  .work-arrow {
    position: absolute;
    top: 2.5rem; right: 2.5rem;
    font-size: 1.2rem;
    color: var(--border);
    transition: transform 0.2s, color 0.2s;
  }

  /* CONTACT */
  #contact .inner {
    padding: 7rem 3rem;
    position: relative;
    z-index: 1;
    max-width: 860px;
    margin: 0 auto;
    width: 100%;
  }
.contact-desc,
.contact-text {
  font-size: 1.6rem;
  color: #ffffff;
  line-height: 1.8;
}
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 0;
    border: 1px solid var(--border);
    
  }
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .form-field {
    position: relative;
    border-bottom: 1px solid var(--border);
  }
  .form-field:first-child { border-right: 1px solid var(--border); }
  .form-field.full { grid-column: 1 / -1; }
  .contact-label,
.form-label {
  font-size: 26px;
  color: #2dd4d4;
  font-weight: 700;
  letter-spacing: 1px;
}
  .form-field input,
  .form-field textarea {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    padding: 2.8rem 1.5rem 1.1rem;
    font-family: var(--body);
    font-size: 0.95rem;
    color: var(--text);
    font-weight: 300;
    resize: none;
  }
  input::placeholder,
textarea::placeholder {
  font-size: 22px;
  color: rgba(255,255,255,0.7);
}
  .form-field textarea { min-height: 140px; }
  .form-submit {
    border-top: 1px solid var(--border);
    padding: 1.5rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .form-note {
    font-family: var(--display);
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    color: var(--muted);
    text-transform: uppercase;
  }

  /* SOCIAL BOXES */
  .social-boxes {
    margin-top: 3rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .social-box {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.9rem 1.4rem;
    border: 1px solid var(--border);
    background: var(--bg);
    text-decoration: none;
    color: var(--muted);
    font-family: var(--display);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
    cursor: pointer;
  }
  .social-box:hover {
    border-color: var(--teal);
    color: var(--text);
    background: var(--surface);
  }
  .social-box:hover .social-icon { color: var(--teal); }
  .social-icon {
    width: 18px; height: 18px;
    flex-shrink: 0;
    transition: color 0.2s;
  }

  /* FOOTER */
  footer {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 1.5rem;
    font-family: var(--display);
    font-size: 0.68rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    border-top: 1px solid var(--border);
  }

  @media (max-width: 768px) {
    nav { gap: 1.5rem; padding: 1.2rem 1.5rem; }
    #home .inner { grid-template-columns: 1fr; gap: 3rem; padding: 7rem 1.5rem 3rem; text-align: center; }
    .home-image-wrap { order: -1; }
    .photo-frame { width: 220px; height: 220px; }
    .home-cta { justify-content: center; }
    .home-role { margin: 2rem auto 0; }
    #skills .inner, #work .inner, #contact .inner { padding: 5rem 1.5rem; }
    .skills-grid { grid-template-columns: 1fr; }
    .work-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .form-field:first-child { border-right: none; }
  }
    .field-heading {
  color: #2dd4d4;
  font-size: 24px;
  font-weight: 700;
  display: block;
  margin-bottom: 8px;
}
`;

function WaveBg({ seed = 0 }) {
  const lines = [];
  const count = 20;
  for (let i = 0; i < count; i++) {
    const y = (i / count) * 100;
    const amp = 5 + (i % 4) * 3.5;
    const freq = 0.011 + seed * 0.0018 + i * 0.0009;
    let d = `M -10 ${y}`;
    for (let x = 0; x <= 110; x += 3) {
      const wave =
        Math.sin((x + seed * 22) * freq * Math.PI * 2) * amp +
        Math.cos((x * 0.65 + seed * 14 + i) * freq * 1.4 * Math.PI * 2) * (amp * 0.45);
      d += ` L ${x} ${y + wave}`;
    }
    lines.push(
      <path key={i} d={d} fill="none" stroke="#f0ede8" strokeWidth="0.38" vectorEffect="non-scaling-stroke" />
    );
  }
  return (
    <svg className="wave-bg" viewBox="0 0 100 100" preserveAspectRatio="none">
      {lines}
    </svg>
  );
}

// SVG icons for social links
const GithubIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);


const projects = [
  {
    title: "MovieLibrary Web App",
    desc: "A web application for browsing and managing a collection of movies with search and filtering capabilities.",
    tags: ["React", "JavaScript", "CSS", "Netlify"],
    github: "https://github.com/molugus38-lgtm/movielib"
  },
  {
    title: "Restaurant Menu Website",
    desc: "A responsive website for a local restaurant, showcasing their menu items with descriptions and prices.",
    tags: ["React.js", "HTML", "CSS"],
    github: "https://github.com/molugus38-lgtm/restowebpage"
  },
  {
    title: "Weather Dashboard",
    desc: "Real-time weather visualization using public APIs, featuring dynamic charts, location search, and 7-day forecasts.",
    tags: ["JavaScript", "HTML", "REST API"],
    github: "https://github.com/molugus38-lgtm/weatherapp"
  },
  {
    title: "Feedback Validation Form",
    desc: "A user-friendly feedback form with real-time validation, ensuring accurate input and enhancing user experience.",
    tags: ["React", "Tailwind CSS", "Vite", "Netlify"],
    github: "https://github.com/molugus38-lgtm/feedbackform"
  },
];
const skillSets = [
  {
    cat: "Frontend",
    items: ["React.js", "HTML", "Responsive Design", "Tailwind CSS"],
  },
  {
    cat: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "Firebase"],
  },
  {
    cat: "Tools",
    items: ["Git & GitHub", "VS Code","Netlify / Vercel", "Jest & Testing Library"],
  },
];

export default function Portfolio() {
  const [active, setActive] = useState("home");
  const [sent, setSent] = useState(false);
  const sectionRefs = {
    home: useRef(null),
    skills: useRef(null),
    work: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.4 }
    );
    Object.values(sectionRefs).forEach((r) => r.current && obs.observe(r.current));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{styles}</style>

      <nav>
        {["home", "skills", "work", "contact"].map((id) => (
          <a key={id} className={active === id ? "active" : ""} onClick={() => scrollTo(id)}>
            {id}
          </a>
        ))}
      </nav>

      {/* HOME */}
      <section id="home" ref={sectionRefs.home}>
        <WaveBg seed={0} />
        <div className="inner">
          <div className="home-text">
            <h1 className="home-name">Srihitha</h1>
            <p className="home-role">
              I craft clean responsive web experiences = turning ideas into interfaces that feel natural and work beautifully.
            </p>
            <div className="home-cta">
              <button className="btn-primary" onClick={() => scrollTo("work")}>View Work</button>
              <button className="btn-secondary" onClick={() => scrollTo("contact")}>Get In Touch</button>
            </div>
          </div>
          <div className="home-image-wrap">
          <div className="photo-frame">
  <div className="orbit-container">
    <div className="photo-ring" />
    <div className="photo-ring-2" />
    <div className="photo-teal-dot" />
    <div className="photo-orange-dot" />
  </div>

  <div className="photo-circle">
  <img
    src="/profile.jpg"
    alt="Srihitha"
    className="profile-image"
  />
</div>
</div>
          </div>
        </div>
        <div className="accent-bar" />
      </section>

      {/* SKILLS */}
      <section id="skills" ref={sectionRefs.skills}>
        <WaveBg seed={1} />
        <div className="inner">
          <p className="section-label">What I know</p>
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            {skillSets.map((s) => (
              <div className="skill-card" key={s.cat}>
                <p className="skill-cat">{s.cat}</p>
                <ul className="skill-list">
                  {s.items.map((item) => (
                    <li key={item}>
                      <span className="skill-dot" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="accent-bar" />
      </section>

      {/* WORK */}
      <section id="work" ref={sectionRefs.work}>
        <WaveBg seed={2} />
        <div className="inner">
          <p className="section-label">Selected projects</p>
          <h2 className="section-title">Work</h2>
          <div className="work-grid">
            {projects.map((p, i) => (
<div
  className="work-card"
  key={p.title}
  onClick={() => window.open(p.github, "_blank")}
>                <p className="work-num">0{i + 1}</p>
                <span className="work-arrow">&#8599;</span>
                <h3 className="work-title">{p.title}</h3>
                <p className="work-desc">{p.desc}</p>
                <div className="work-tags">
                  {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="accent-bar" />
      </section>

      {/* CONTACT */}
      <section id="contact" ref={sectionRefs.contact}>
        <WaveBg seed={3} />
        <div className="inner">
          <p className="section-label">Say hello</p>
          <h2 className="section-title">Contact</h2>
          <p className="contact-sub">
            Open to internships, freelance projects, and collaborations. If you have something interesting in mind, reach out — I would love to hear from you.
          </p>
          {!sent ? (
            <div className="contact-form">
              <div className="form-row">
                <div className="form-field">
                  <label className="field-heading">Name</label>
                  <input type="text" placeholder="Your name" />
                </div>
                <div className="form-field">
                  <label className="field-heading">Email</label>
                  <input type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div className="form-field full">
               <label className="field-heading">Message</label>
                <textarea placeholder="What's on your mind?" />
              </div>
              <div className="form-submit">
                <span className="form-note">I reply within 24 hours</span>
                <button className="btn-primary" onClick={() => setSent(true)}>Send Message</button>
              </div>
            </div>
          ) : (
            <div style={{ padding: "3rem 2rem", border: "1px solid var(--border)", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--display)", fontSize: "1.15rem", color: "var(--teal)", marginBottom: "0.5rem" }}>Message received.</p>
              <p style={{ color: "var(--muted)", fontSize: "0.88rem" }}>Thanks for reaching out — I will get back to you soon.</p>
            </div>
          )}

          <div className="social-boxes">
            <a className="social-box" href="https://github.com" target="_blank" rel="noreferrer">
              <GithubIcon />
              GitHub
            </a>
            <a className="social-box" href="https://linkedin.com" target="_blank" rel="noreferrer">
              <LinkedinIcon />
              LinkedIn
            </a>
            
          </div>
        </div>
        <div className="accent-bar" />
      </section>

      <footer>Srihitha @ 2026</footer>
    </>
  );
}
