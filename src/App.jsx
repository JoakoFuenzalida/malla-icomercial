import { useState, useCallback, useMemo, useEffect, useRef } from "react";
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

const courseNum = {};
courses.forEach((c, i) => { courseNum[c.id] = i + 1; });

function TutorialIntro({ onNext, onSkip }) {
  const [active, setActive] = useState(null);

  const anchors = {
    sigla: { x: 70, y: 86, accent: "#7594cb", hx: 18, hy: 78, hw: 64, hh: 18 },
    numero: { x: 175, y: 86, accent: "#7594cb", hx: 170, hy: 78, hw: 22, hh: 22 },
    prereq: { x: 70, y: 154, accent: "#fbbf24", hx: 18, hy: 146, hw: 22, hh: 22 },
    creditos: { x: 175, y: 154, accent: "#22c55e", hx: 158, hy: 146, hw: 36, hh: 18 },
  };

  const labels = {
    sigla: { side: "left", top: 78 },
    numero: { side: "right", top: 78 },
    prereq: { side: "left", top: 146 },
    creditos: { side: "right", top: 146 },
  };

  function getConnector(key) {
    const a = anchors[key];
    const onLeft = labels[key].side === "left";
    const x1 = onLeft ? 0 : 220;
    const y1 = labels[key].top + 9;
    return { x1, y1, x2: a.x, y2: a.y, accent: a.accent, hx: a.hx, hy: a.hy, hw: a.hw, hh: a.hh };
  }

  return (
    <>
      <span className="tut-step-label">Paso 1 de 2</span>
      <h2 className="tutorial-title">Bienvenido a la Malla Interactiva</h2>
      <p className="tutorial-desc">Cada asignatura se representa con un recuadro como este. Pasa el mouse por las etiquetas o el recuadro para descubrir cada elemento.</p>

      <div className="tut-intro-stage">
        <div
          className={`tut-intro-label tut-intro-label-left ${active === "sigla" ? "is-active" : ""}`}
          style={{ top: 78 }}
          onMouseEnter={() => setActive("sigla")}
          onMouseLeave={() => setActive(null)}
        >
          Sigla Asignatura
        </div>
        <div
          className={`tut-intro-label tut-intro-label-right ${active === "numero" ? "is-active" : ""}`}
          style={{ top: 78 }}
          onMouseEnter={() => setActive("numero")}
          onMouseLeave={() => setActive(null)}
        >
          Número Asignatura
        </div>
        <div
          className={`tut-intro-label tut-intro-label-left ${active === "prereq" ? "is-active" : ""}`}
          style={{ top: 146 }}
          onMouseEnter={() => setActive("prereq")}
          onMouseLeave={() => setActive(null)}
        >
          Prerrequisitos
        </div>
        <div
          className={`tut-intro-label tut-intro-label-right ${active === "creditos" ? "is-active" : ""}`}
          style={{ top: 146 }}
          onMouseEnter={() => setActive("creditos")}
          onMouseLeave={() => setActive(null)}
        >
          Créditos SCT
        </div>

        <div className="tut-intro-card">
          <div className="tut-intro-card-top">
            <span
              className={`tut-intro-sigla ${active === "sigla" ? "is-active" : ""}`}
              onMouseEnter={() => setActive("sigla")}
              onMouseLeave={() => setActive(null)}
            >
              ICA1101
            </span>
            <span
              className={`tut-intro-num ${active === "numero" ? "is-active" : ""}`}
              onMouseEnter={() => setActive("numero")}
              onMouseLeave={() => setActive(null)}
            >
              1
            </span>
          </div>
          <div className="tut-intro-name">Nombre de la Asignatura</div>
          <div className="tut-intro-card-bot">
            <span
              className={`tut-intro-prereq ${active === "prereq" ? "is-active" : ""}`}
              onMouseEnter={() => setActive("prereq")}
              onMouseLeave={() => setActive(null)}
            >
              0
            </span>
            <span
              className={`tut-intro-cr ${active === "creditos" ? "is-active" : ""}`}
              onMouseEnter={() => setActive("creditos")}
              onMouseLeave={() => setActive(null)}
            >
              4 cr
            </span>
          </div>
        </div>

        <svg className="tut-intro-svg" viewBox="0 0 600 236" preserveAspectRatio="none">
          {Object.keys(anchors).map((key) => {
            const isActive = active === key;
            const c = getConnector(key);
            const onLeft = labels[key].side === "left";
            const sigloX1 = onLeft ? 170 : 430;
            const sigloX2 = onLeft ? 195 : 405;
            const yCoord = labels[key].top + 9;
            return (
              <g key={key} opacity={active && !isActive ? 0.25 : 1} style={{ transition: "opacity .2s" }}>
                <line
                  x1={sigloX1}
                  y1={yCoord}
                  x2={sigloX2}
                  y2={yCoord}
                  stroke={isActive ? c.accent : "#7e8aa3"}
                  strokeWidth={isActive ? 2 : 1.5}
                  style={{ transition: "stroke .2s, stroke-width .2s" }}
                />
                <circle
                  cx={onLeft ? 167 : 433}
                  cy={yCoord}
                  r={isActive ? 4 : 3}
                  fill={isActive ? c.accent : "#7e8aa3"}
                  style={{ transition: "fill .2s, r .2s" }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="tut-info-box">
        <p>Haz click en un ramo para marcarlo como aprobado. Los ramos bloqueados se liberan automáticamente al cumplir sus prerrequisitos.</p>
      </div>

      <div className="tutorial-nav">
        <button className="tutorial-btn tut-btn-rounded" onClick={onNext}>Siguiente</button>
        <button className="tutorial-skip" onClick={onSkip}>Saltar</button>
      </div>
    </>
  );
}

function TutorialRuta({ onClose, onBack }) {
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlighted(true);
      const timeout = setTimeout(() => setHighlighted(false), 1600);
      return () => clearTimeout(timeout);
    }, 4000);
    setHighlighted(true);
    const firstTimeout = setTimeout(() => setHighlighted(false), 1600);
    return () => { clearInterval(interval); clearTimeout(firstTimeout); };
  }, []);

  return (
    <>
      <span className="tut-step-label">Paso 2 de 2</span>
      <h2 className="tutorial-title">Modo Ruta</h2>
      <p className="tutorial-desc">Visualiza el camino académico de cada asignatura. Entiende las dependencias y requisitos con un solo vistazo.</p>

      <div className="tut-demo-grid">
        {/* 1. Aprobado */}
        <div className="tut-demo-col">
          <div className={`tut-demo-card tut-card-aprobado ${highlighted ? "tut-hl-prereq" : ""}`} style={{ "--cat-color": "#7c2d12" }}>
            <div className="tut-demo-card-line"></div>
            <div className="tut-demo-top">
              <span className="tut-demo-code">ICA3111</span>
              <span className="tut-demo-num">13</span>
            </div>
            <div className="tut-demo-name">Matemáticas Financieras</div>
            <div className="tut-demo-bottom">
              <div className="tut-demo-dots"><span></span><span></span></div>
              <span className="tut-demo-cr">4 cr</span>
            </div>
          </div>
          <span className="tut-demo-label">Aprobado</span>
        </div>

        {/* 2. Prerrequisito */}
        <div className="tut-demo-col">
          <div className={`tut-demo-card ${highlighted ? "tut-hl-prereq" : ""}`} style={{ "--cat-color": "#7c2d12" }}>
            <div className="tut-demo-top">
              <span className="tut-demo-code">ICA2212</span>
              <span className="tut-demo-num">20</span>
            </div>
            <div className="tut-demo-name">Contabilidad Financiera</div>
            <div className="tut-demo-bottom">
              <div className="tut-demo-dots"><span></span><span></span></div>
              <span className="tut-demo-cr">4 cr</span>
            </div>
          </div>
          <span className="tut-demo-label">Prerrequisito</span>
        </div>

        {/* 3. Seleccionado */}
        <div className="tut-demo-col">
          <div className={`tut-demo-card ${highlighted ? "tut-hl-selected" : ""}`} style={{ "--cat-color": "#9a3412" }}>
            <div className="tut-demo-top">
              <span className="tut-demo-code">ICA3113</span>
              <span className="tut-demo-num">27</span>
            </div>
            <div className="tut-demo-name">Contabilidad Administrativa</div>
            <div className="tut-demo-bottom">
              <div className="tut-demo-dots"><span></span></div>
              <span className="tut-demo-cr">4 cr</span>
            </div>
            <div className={`tut-cursor ${highlighted ? "tut-cursor-in" : ""}`}>
              <span className="material-symbols-outlined" style={{ fontSize: 28 }}>near_me</span>
            </div>
          </div>
          <span className="tut-demo-label tut-demo-label-sel">Seleccionado</span>
        </div>

        {/* 4. Dependiente */}
        <div className="tut-demo-col">
          <div className={`tut-demo-card tut-card-locked ${highlighted ? "tut-hl-dep" : ""}`}>
            <div className="tut-demo-top">
              <span className="tut-demo-code">ICA3214</span>
              <span className="tut-demo-num tut-num-locked">32</span>
            </div>
            <div className="tut-demo-name-locked">Finanzas 1</div>
            <div className="tut-demo-lock-icon"><span className="material-symbols-outlined" style={{ fontSize: 14 }}>lock</span></div>
            <div className="tut-demo-bottom">
              <div className="tut-demo-dots"><span></span></div>
              <span className="tut-demo-cr">4 cr</span>
            </div>
          </div>
          <span className="tut-demo-label">Dependiente</span>
        </div>

        {/* 5. No relacionado */}
        <div className="tut-demo-col">
          <div className={`tut-demo-card tut-card-locked ${highlighted ? "tut-hl-dim" : ""}`}>
            <div className="tut-demo-top">
              <span className="tut-demo-code">ICA2141</span>
              <span className="tut-demo-num tut-num-locked">14</span>
            </div>
            <div className="tut-demo-name-locked">Tecnologías 1</div>
            <div className="tut-demo-bottom">
              <div className="tut-demo-dots"></div>
              <span className="tut-demo-cr">4 cr</span>
            </div>
          </div>
          <span className="tut-demo-label tut-demo-label-dim">Atenuado</span>
        </div>
      </div>

      <div className="tut-info-box">
        <p>Al pasar el mouse por un ramo, se resaltan sus <strong className="tut-text-gold">prerrequisitos </strong> y <strong className="tut-text-blue">dependientes </strong>. Los aprobados se muestran tachados. Los no relacionados se atenúan.</p>
      </div>

      <div className="tutorial-nav">
        <button className="tutorial-btn tut-btn-rounded" onClick={onClose}>Comenzar</button>
        <button className="tutorial-skip" onClick={onBack}>Volver</button>
      </div>
    </>
  );
}

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
  const rutaBtnRef = useRef(null);
  const [rutaBtnRect, setRutaBtnRect] = useState(null);

  useEffect(() => {
    if (!rutaBtnRef.current) return;
    function updateRect() {
      const r = rutaBtnRef.current?.getBoundingClientRect();
      if (r) setRutaBtnRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    }
    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect);
    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
    };
  }, []);
  const [tutorialStep, setTutorialStep] = useState(0);

  const closeTutorial = useCallback(() => {
    setTutorialStep(-1);
  }, []);

  const openTutorial = useCallback(() => setTutorialStep(0), []);

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
        <span className="card-num">{courseNum[course.id]}</span>
        <span className="card-code">{course.id}</span>
        <div className="card-name">{course.name}</div>
        <div className="card-bottom">
          <div className="card-prereqs">
            {course.prerequisites.map((pid) => (
              <span key={pid} className="card-prereq-num">{courseNum[pid]}</span>
            ))}
          </div>
          <span className="card-credits">{course.credits} cr</span>
        </div>
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
            <div className="tooltip-wrapper">
              <button
                ref={rutaBtnRef}
                className={`btn btn-route ${showRoute ? "btn-route-on" : ""}`}
                onClick={() => setShowRoute((v) => !v)}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: "middle", marginRight: 2 }}>route</span>
                {showRoute ? " Ruta ON" : " Ruta OFF"}
              </button>
              <span className="tooltip">Al pasar el mouse sobre un ramo, resalta sus prerequisitos y dependientes</span>
            </div>
            <button className="btn btn-clear" onClick={clearAll}>
              Limpiar todo
            </button>
            <button className="btn btn-help" onClick={openTutorial} title="Ver tutorial">?</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="dashboard-header">
          <div className="dashboard-left">
            <h2 className="dashboard-title">Malla Curricular</h2>
            <p className="dashboard-subtitle">Selecciona asignaturas para marcarlas como aprobadas</p>
          </div>
          <div className="dashboard-right">
            <div className="progress-inline">
              <div className="progress-info">
                <span className="progress-text">{approvedCredits} / {TOTAL_CREDITS} Créditos</span>
                <span className="progress-sep">|</span>
                <span className="progress-text">{approvedCount} / {totalCourses} ramos</span>
                <span className="progress-pct">{pct}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="legend">
          {Object.entries(categories).map(([key, cat]) => (
            <div className="legend-item" key={key}>
              <span className="legend-dot" style={{ backgroundColor: cat.dot }} />
              <span className="legend-text">{cat.name}</span>
            </div>
          ))}
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

      {tutorialStep === 1 && rutaBtnRect && (
        <div
          className="tutorial-ruta-highlight"
          style={{
            top: rutaBtnRect.top,
            left: rutaBtnRect.left,
            width: rutaBtnRect.width,
            height: rutaBtnRect.height,
          }}
        >
          <button className="btn btn-route" onClick={(e) => { e.stopPropagation(); setShowRoute((v) => !v); }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: "middle", marginRight: 2 }}>route</span>
            {showRoute ? " Ruta ON" : " Ruta OFF"}
          </button>
          <div className="tutorial-arrow-indicator">
            <span className="tutorial-arrow-text">Activa aquí el modo Ruta</span>
          </div>
        </div>
      )}

      {tutorialStep >= 0 && (
        <div className="tutorial-overlay" onClick={closeTutorial}>
          <div className="tutorial-modal" onClick={(e) => e.stopPropagation()}>
            {tutorialStep === 0 && (
              <TutorialIntro onNext={() => setTutorialStep(1)} onSkip={closeTutorial} />
            )}
            {tutorialStep === 1 && <TutorialRuta onClose={closeTutorial} onBack={() => setTutorialStep(0)} />}
          </div>
        </div>
      )}
    </div>
  );
}
