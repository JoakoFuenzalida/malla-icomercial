import { useState, useCallback, useMemo } from "react";
import { courses, categories, TOTAL_CREDITS, TOTAL_SEMESTERS } from "./data/courses";
import "./App.css";

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

function getDependent(courseId, allCourses) {
  const deps = new Set();
  function collect(id) {
    for (const c of allCourses) {
      if (c.prerequisites.includes(id) && !deps.has(c.id)) {
        deps.add(c.id);
        collect(c.id);
      }
    }
  }
  collect(courseId);
  return deps;
}

function getPrereqChain(courseId, allCourses) {
  const chain = new Set();
  const course = allCourses.find((c) => c.id === courseId);
  if (!course) return chain;
  function collect(prereqs) {
    for (const pid of prereqs) {
      if (!chain.has(pid)) {
        chain.add(pid);
        const parent = allCourses.find((c) => c.id === pid);
        if (parent) collect(parent.prerequisites);
      }
    }
  }
  collect(course.prerequisites);
  return chain;
}

const gridCourses = courses.filter((c) => c.semester > 0);
const optCourses = courses.filter((c) => c.semester === 0);

export default function App() {
  const [approved, setApproved] = useState(() => {
    try {
      const saved = localStorage.getItem("malla-approved");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [hovered, setHovered] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [showEaster, setShowEaster] = useState(false);

  const persist = useCallback((next) => {
    setApproved(next);
    localStorage.setItem("malla-approved", JSON.stringify([...next]));
  }, []);

  const isAvailable = useCallback(
    (course) => course.prerequisites.every((p) => approved.has(p)),
    [approved]
  );

  const toggleCourse = useCallback(
    (course) => {
      const next = new Set(approved);
      if (next.has(course.id)) {
        next.delete(course.id);
        const deps = getDependent(course.id, courses);
        for (const d of deps) next.delete(d);
      } else {
        if (!isAvailable(course)) return;
        next.add(course.id);
      }
      persist(next);
    },
    [approved, persist, isAvailable]
  );

  const markSemester = useCallback(
    (sem) => {
      const next = new Set(approved);
      const semCourses = courses.filter((c) => c.semester === sem);
      const allApproved = semCourses.every((c) => next.has(c.id));
      if (allApproved) {
        for (const c of semCourses) {
          next.delete(c.id);
          const deps = getDependent(c.id, courses);
          for (const d of deps) next.delete(d);
        }
      } else {
        for (let s = 1; s <= sem; s++) {
          for (const c of courses.filter((x) => x.semester === s)) {
            next.add(c.id);
          }
        }
      }
      persist(next);
    },
    [approved, persist]
  );

  const markYear = useCallback(
    (year) => {
      const s1 = year * 2 - 1;
      const s2 = year * 2;
      const next = new Set(approved);
      const yearCourses = courses.filter((c) => c.semester === s1 || c.semester === s2);
      const allApproved = yearCourses.every((c) => next.has(c.id));
      if (allApproved) {
        for (const c of yearCourses) {
          next.delete(c.id);
          const deps = getDependent(c.id, courses);
          for (const d of deps) next.delete(d);
        }
      } else {
        for (let s = 1; s <= s2; s++) {
          for (const c of courses.filter((x) => x.semester === s)) {
            next.add(c.id);
          }
        }
      }
      persist(next);
    },
    [approved, persist]
  );

  const clearAll = useCallback(() => persist(new Set()), [persist]);

  const approvedCredits = useMemo(
    () => courses.filter((c) => approved.has(c.id)).reduce((sum, c) => sum + c.credits, 0),
    [approved]
  );

  const approvedCount = approved.size;
  const totalCourses = courses.length;
  const pct = Math.round((approvedCredits / TOTAL_CREDITS) * 100);

  const activeHover = showRoute ? hovered : null;

  const hoveredPrereqs = useMemo(
    () => (activeHover ? getPrereqChain(activeHover, courses) : new Set()),
    [activeHover]
  );
  const hoveredDeps = useMemo(
    () => (activeHover ? getDependent(activeHover, courses) : new Set()),
    [activeHover]
  );

  const semesters = useMemo(() => {
    const map = {};
    for (let s = 1; s <= TOTAL_SEMESTERS; s++) map[s] = [];
    for (const c of gridCourses) map[c.semester].push(c);
    return map;
  }, []);

  function isSemAllDone(sem) {
    return gridCourses.filter((c) => c.semester === sem).every((c) => approved.has(c.id));
  }

  function isYearAllDone(year) {
    const s1 = year * 2 - 1;
    const s2 = year * 2;
    return gridCourses
      .filter((c) => c.semester === s1 || c.semester === s2)
      .every((c) => approved.has(c.id));
  }

  function renderCard(course) {
    const cat = categories[course.category];
    const isApproved = approved.has(course.id);
    const available = isAvailable(course);
    const isHovered = activeHover === course.id;
    const isPrereq = hoveredPrereqs.has(course.id);
    const isDep = hoveredDeps.has(course.id);
    const dimmed = activeHover && !isHovered && !isPrereq && !isDep;

    let status = "locked";
    if (isApproved) status = "approved";
    else if (available) status = "available";

    return (
      <div
        key={course.id}
        className={`card card-${status} ${isHovered ? "card-hovered" : ""} ${isPrereq ? "card-prereq-highlight" : ""} ${isDep ? "card-dep-highlight" : ""} ${dimmed ? "card-dimmed" : ""}`}
        style={{ "--cat-color": cat.color }}
        onClick={() => toggleCourse(course)}
        onMouseEnter={() => setHovered(course.id)}
        onMouseLeave={() => setHovered(null)}
      >
        {status === "locked" && (
          <div className="card-lock">
            <span className="material-symbols-outlined">lock</span>
          </div>
        )}
        <div className="card-top">
          <span className="card-code">{course.id}</span>
          <span className="card-credits">{course.credits} cr</span>
        </div>
        <div className="card-name">{course.name}</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>Malla Interactiva - Ingeniería Comercial PUCV</h1>
          </div>
          <div className="header-right">
            <button
              className={`btn btn-route ${showRoute ? "btn-route-on" : ""}`}
              onClick={() => setShowRoute((v) => !v)}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: "middle", marginRight: 2 }}>route</span>
              {showRoute ? " Ruta ON" : " Ruta OFF"}
            </button>
            <button className="btn btn-clear" onClick={clearAll}>
              Limpiar todo
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="dashboard-header">
          <div className="dashboard-left">
            <h2 className="dashboard-title">Malla Curricular</h2>
            <p className="dashboard-subtitle">Selecciona asignaturas para marcarlas como aprobadas</p>
          </div>
          <div className="legend">
            {Object.entries(categories).map(([key, cat]) => (
              <div className="legend-item" key={key}>
                <span className="legend-dot" style={{ backgroundColor: cat.dot }} />
                <span className="legend-text">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="malla-scroll">
          <div className="malla-wrapper">
            <div className="year-row">
              {[1, 2, 3, 4, 5].map((y) => (
                <button
                  key={y}
                  className={`year-btn ${isYearAllDone(y) ? "year-btn-active" : ""}`}
                  onClick={() => markYear(y)}
                >
                  Año {y}
                </button>
              ))}
            </div>
            <div className="malla-grid">
              {Array.from({ length: TOTAL_SEMESTERS }, (_, i) => i + 1).map((sem) => (
                <div className="semester-col" key={sem}>
                  <button
                    className={`semester-btn ${isSemAllDone(sem) ? "semester-btn-active" : ""}`}
                    onClick={() => markSemester(sem)}
                  >
                    Sem {ROMAN[sem]}
                  </button>
                  <div className="semester-cards">
                    {semesters[sem].map((course) => renderCard(course))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="optativos-section">
          <div className="optativos-header">
            <span>Asignaturas Optativas</span>
          </div>
          <div className="optativos-row">
            {optCourses.map((course) => renderCard(course))}
          </div>
        </div>

        <div className="progress-bar-section">
          <div className="progress-info">
            <span className="progress-text">
              Progreso: {approvedCredits} / {TOTAL_CREDITS} Créditos ·{approvedCount} / {totalCourses} ramos
            </span>
            <span className="progress-pct">{pct}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <span className="footer-copy">Malla Interactiva PUCV</span>
          <span className="footer-copy">
            Hecho por <a href="https://github.com/JoakoFuenzalida" target="_blank" rel="noopener noreferrer" className="footer-link">Joaquín Fuenzalida</a>, Estudiante Ing. Civil Informática PUCV
            <button className="easter-trigger" onClick={() => setShowEaster(true)} aria-label="Easter egg">♥</button>
          </span>
        </div>
      </footer>

      {showEaster && (
        <div className="easter-overlay" onClick={() => setShowEaster(false)}>
          <div className="easter-hearts">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="easter-heart" style={{ "--i": i, "--x": Math.random() * 100, "--d": 2 + Math.random() * 4 }}>♥</span>
            ))}
          </div>
          <div className="easter-modal" onClick={(e) => e.stopPropagation()}>
            <p className="easter-for">Para ti, Sofi</p>
            <p className="easter-msg">Esta plataforma la hice pensando en ti. Sigue echándole ganas a la U que vas increíble. Estoy orgulloso de ti.</p>
            <p className="easter-sign">Con cariño, Joako ♥</p>
            <button className="easter-close" onClick={() => setShowEaster(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
