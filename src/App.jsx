import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import * as icomData from "./data/courses";
import * as iciData from "./data/ici-courses";
import "./App.css";

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

const CAREERS = {
  icom: {
    name: "Ingeniería Comercial",
    short: "Ing. Comercial",
    data: icomData,
  },
  ici: {
    name: "Ingeniería Civil Informática",
    short: "Ing. Civil Informática",
    data: iciData,
  },
};

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
              XXX1234
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
            const c = anchors[key];
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
        <div className="tut-demo-col">
          <div className={`tut-demo-card tut-card-aprobado ${highlighted ? "tut-hl-prereq" : ""}`} style={{ "--cat-color": "#7c2d12" }}>
            <div className="tut-demo-card-line"></div>
            <div className="tut-demo-top">
              <span className="tut-demo-code">RAMO A</span>
              <span className="tut-demo-num">1</span>
            </div>
            <div className="tut-demo-name">Ramo Anterior</div>
            <div className="tut-demo-bottom">
              <div className="tut-demo-dots"></div>
              <span className="tut-demo-cr">4 cr</span>
            </div>
          </div>
          <span className="tut-demo-label">Aprobado</span>
        </div>

        <div className="tut-demo-col">
          <div className={`tut-demo-card ${highlighted ? "tut-hl-prereq" : ""}`} style={{ "--cat-color": "#7c2d12" }}>
            <div className="tut-demo-top">
              <span className="tut-demo-code">RAMO B</span>
              <span className="tut-demo-num">5</span>
            </div>
            <div className="tut-demo-name">Prerrequisito Directo</div>
            <div className="tut-demo-bottom">
              <div className="tut-demo-dots"><span></span></div>
              <span className="tut-demo-cr">4 cr</span>
            </div>
          </div>
          <span className="tut-demo-label">Prerrequisito</span>
        </div>

        <div className="tut-demo-col">
          <div className={`tut-demo-card ${highlighted ? "tut-hl-selected" : ""}`} style={{ "--cat-color": "#9a3412" }}>
            <div className="tut-demo-top">
              <span className="tut-demo-code">RAMO C</span>
              <span className="tut-demo-num">12</span>
            </div>
            <div className="tut-demo-name">Ramo Seleccionado</div>
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

        <div className="tut-demo-col">
          <div className={`tut-demo-card tut-card-locked ${highlighted ? "tut-hl-dep" : ""}`}>
            <div className="tut-demo-top">
              <span className="tut-demo-code">RAMO D</span>
              <span className="tut-demo-num tut-num-locked">20</span>
            </div>
            <div className="tut-demo-name-locked">Ramo Siguiente</div>
            <div className="tut-demo-lock-icon"><span className="material-symbols-outlined" style={{ fontSize: 14 }}>lock</span></div>
            <div className="tut-demo-bottom">
              <div className="tut-demo-dots"><span></span></div>
              <span className="tut-demo-cr">4 cr</span>
            </div>
          </div>
          <span className="tut-demo-label">Dependiente</span>
        </div>

        <div className="tut-demo-col">
          <div className={`tut-demo-card tut-card-locked ${highlighted ? "tut-hl-dim" : ""}`}>
            <div className="tut-demo-top">
              <span className="tut-demo-code">RAMO E</span>
              <span className="tut-demo-num tut-num-locked">8</span>
            </div>
            <div className="tut-demo-name-locked">Otro Ramo</div>
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

function CareerSelector({ onSelect }) {
  return (
    <div className="app career-page">
      <div className="career-selector">
        <p className="career-welcome">Bienvenido a la</p>
        <h1 className="career-main-title">Malla Interactiva PUCV</h1>
        <p className="career-hero">Visualiza tu avance, explora prerrequisitos y planifica tu camino académico de forma interactiva.</p>

        <p className="career-subtitle">Selecciona tu carrera</p>
        <div className="career-cards">
          <button className="career-card" style={{ "--cat-color": "#b45309" }} onClick={() => onSelect("icom")}>
            <span className="career-card-num material-symbols-outlined">trending_up</span>
            <span className="card-code">ICA</span>
            <div className="card-name">Ingeniería Comercial</div>
            <div className="card-bottom">
              <div className="card-prereqs"></div>
              <span className="card-credits">{CAREERS.icom.data.TOTAL_CREDITS} cr</span>
            </div>
          </button>
          <button className="career-card" style={{ "--cat-color": "#1d4ed8" }} onClick={() => onSelect("ici")}>
            <span className="career-card-num material-symbols-outlined">terminal</span>
            <span className="card-code">ICI</span>
            <div className="card-name">Ingeniería Civil Informática</div>
            <div className="card-bottom">
              <div className="card-prereqs"></div>
              <span className="card-credits">{CAREERS.ici.data.TOTAL_CREDITS} cr</span>
            </div>
          </button>
        </div>

        <div className="career-features">
          <div className="career-feature">
            <span className="material-symbols-outlined career-feature-icon">check_circle</span>
            <span>Marca ramos aprobados y mira tu progreso</span>
          </div>
          <div className="career-feature">
            <span className="material-symbols-outlined career-feature-icon">route</span>
            <span>Visualiza prerrequisitos y dependencias</span>
          </div>
          <div className="career-feature">
            <span className="material-symbols-outlined career-feature-icon">lock_open</span>
            <span>Descubre qué ramos se desbloquean</span>
          </div>
        </div>
      </div>
      <p className="career-disclaimer">
        Este sitio no es una página oficial de la Pontificia Universidad Católica de Valparaíso ni está afiliado a ella de ninguna forma. Es un proyecto independiente creado por estudiantes con fines informativos y de apoyo académico. La información de las mallas curriculares puede contener errores, estar incompleta o desactualizada. Para información oficial, consulta siempre los canales institucionales de la universidad.
      </p>
      <footer className="footer career-footer">
        <div className="footer-content">
          <div className="career-footer-links">
            <a href="https://forms.gle/SDN1WiiGTe5BkNo3A" target="_blank" rel="noopener noreferrer" className="career-footer-link">
              <span className="material-symbols-outlined">add_circle</span>
              Solicita tu carrera
            </a>
            <span className="career-footer-sep">|</span>
            <a href="https://github.com/JoakoFuenzalida/malla-icomercial/discussions" target="_blank" rel="noopener noreferrer" className="career-footer-link">
              <span className="material-symbols-outlined">chat</span>
              Tienes ideas o dudas? Te escuchamos
            </a>
          </div>
          <span className="footer-copy">
            Hecho por <a href="https://github.com/JoakoFuenzalida" target="_blank" rel="noopener noreferrer" className="footer-link">Joaquín Fuenzalida</a>, Estudiante Ing. Civil Informática PUCV
          </span>
        </div>
      </footer>
    </div>
  );
}

function MallaApp({ careerKey, careerConfig, onSelectCareer, onGoHome }) {
  const { courses, categories, TOTAL_CREDITS, TOTAL_SEMESTERS } = careerConfig.data;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const gridCourses = useMemo(() => courses.filter((c) => c.semester > 0), [courses]);
  const optCourses = useMemo(() => courses.filter((c) => c.semester === 0), [courses]);
  const courseNum = useMemo(() => {
    const map = {};
    courses.forEach((c, i) => { map[c.id] = i + 1; });
    return map;
  }, [courses]);

  const numYears = Math.ceil(TOTAL_SEMESTERS / 2);

  const [approved, setApproved] = useState(() => {
    try {
      const saved = localStorage.getItem(`malla-${careerKey}-approved`);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });
  
  const [plannedSemesters, setPlannedSemesters] = useState(() => {
    try {
      const saved = localStorage.getItem(`malla-${careerKey}-planned`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
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

  const [tutorialStep, setTutorialStep] = useState(() => {
    try {
      return localStorage.getItem("malla-tutorial-seen") ? -1 : 0;
    } catch {
      return 0;
    }
  });

  const closeTutorial = useCallback(() => {
    setTutorialStep(-1);
    localStorage.setItem("malla-tutorial-seen", "1");
  }, []);

  const openTutorial = useCallback(() => setTutorialStep(0), []);

  const persist = useCallback((nextApproved, nextPlanned) => {
    if (nextApproved !== undefined) {
      setApproved(nextApproved);
      localStorage.setItem(`malla-${careerKey}-approved`, JSON.stringify([...nextApproved]));
    }
    if (nextPlanned !== undefined) {
      setPlannedSemesters(nextPlanned);
      localStorage.setItem(`malla-${careerKey}-planned`, JSON.stringify(nextPlanned));
    }
  }, [careerKey]);

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
      persist(next, undefined);
    },
    [approved, persist, isAvailable, courses]
  );

  const moveCourse = useCallback((courseId, targetSemester) => {
    setPlannedSemesters(prev => {
      const next = { ...prev, [courseId]: targetSemester };
      localStorage.setItem(`malla-${careerKey}-planned`, JSON.stringify(next));
      return next;
    });
  }, [careerKey]);

  const resetPlanning = useCallback(() => {
    setPlannedSemesters({});
    localStorage.removeItem(`malla-${careerKey}-planned`);
  }, [careerKey]);

  const markSemester = useCallback(
    (sem) => {
      const next = new Set(approved);
      const semCourses = gridCourses.filter((c) => (plannedSemesters[c.id] || c.semester) === sem);
      const allApproved = semCourses.every((c) => next.has(c.id));
      if (allApproved) {
        for (const c of semCourses) {
          next.delete(c.id);
          const deps = getDependent(c.id, courses);
          for (const d of deps) next.delete(d);
        }
      } else {
        // Find all courses up to this semester
        const coursesUpToSem = gridCourses.filter((c) => (plannedSemesters[c.id] || c.semester) <= sem);
        for (const c of coursesUpToSem) {
          next.add(c.id);
        }
      }
      persist(next, undefined);
    },
    [approved, persist, courses, gridCourses, plannedSemesters]
  );

  const markYear = useCallback(
    (year) => {
      const s1 = year * 2 - 1;
      const s2 = year * 2;
      const next = new Set(approved);
      const yearCourses = gridCourses.filter((c) => {
        const s = plannedSemesters[c.id] || c.semester;
        return s === s1 || s === s2;
      });
      const allApproved = yearCourses.every((c) => next.has(c.id));
      if (allApproved) {
        for (const c of yearCourses) {
          next.delete(c.id);
          const deps = getDependent(c.id, courses);
          for (const d of deps) next.delete(d);
        }
      } else {
        const coursesUpToSem = gridCourses.filter((c) => (plannedSemesters[c.id] || c.semester) <= s2);
        for (const c of coursesUpToSem) {
          next.add(c.id);
        }
      }
      persist(next, undefined);
    },
    [approved, persist, courses, gridCourses, plannedSemesters]
  );

  const clearAll = useCallback(() => persist(new Set(), {}), [persist]);

  const approvedCredits = useMemo(
    () => courses.filter((c) => approved.has(c.id)).reduce((sum, c) => sum + c.credits, 0),
    [approved, courses]
  );

  const approvedCount = approved.size;
  const totalCourses = courses.length;
  const pct = Math.round((approvedCredits / TOTAL_CREDITS) * 100);

  const activeHover = showRoute ? hovered : null;

  const hoveredPrereqs = useMemo(
    () => (activeHover ? getPrereqChain(activeHover, courses) : new Set()),
    [activeHover, courses]
  );
  const hoveredDeps = useMemo(
    () => (activeHover ? getDependent(activeHover, courses) : new Set()),
    [activeHover, courses]
  );

  const semesters = useMemo(() => {
    const map = {};
    for (let s = 1; s <= TOTAL_SEMESTERS; s++) map[s] = [];
    for (const c of gridCourses) {
      const targetSem = plannedSemesters[c.id] || c.semester;
      if (map[targetSem]) {
        map[targetSem].push(c);
      }
    }
    return map;
  }, [gridCourses, TOTAL_SEMESTERS, plannedSemesters]);

  function isSemAllDone(sem) {
    return semesters[sem] && semesters[sem].length > 0 && semesters[sem].every((c) => approved.has(c.id));
  }

  function isYearAllDone(year) {
    const s1 = year * 2 - 1;
    const s2 = year * 2;
    const items = [...(semesters[s1] || []), ...(semesters[s2] || [])];
    return items.length > 0 && items.every((c) => approved.has(c.id));
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
    
    const isMoved = !!plannedSemesters[course.id];

    return (
      <div
        key={course.id}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("courseId", course.id);
          e.dataTransfer.effectAllowed = "move";
        }}
        className={`card card-${status} ${isMoved ? "card-moved" : ""} ${isHovered ? "card-hovered" : ""} ${isPrereq ? "card-prereq-highlight" : ""} ${isDep ? "card-dep-highlight" : ""} ${dimmed ? "card-dimmed" : ""}`}
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
            <h1><button className="header-home" onClick={onGoHome}>Malla Interactiva</button></h1>
          </div>
          <div className="header-right">
            <div className="dropdown-wrapper" ref={dropdownRef}>
              <button className="btn btn-dropdown btn-carreras" onClick={() => setDropdownOpen((v) => !v)}>
                <span className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: "middle", marginRight: 2 }}>school</span>
                Carreras
                <span className="material-symbols-outlined dropdown-arrow" style={{ fontSize: 14, verticalAlign: "middle", marginLeft: 2 }}>
                  {dropdownOpen ? "expand_less" : "expand_more"}
                </span>
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  {Object.entries(CAREERS).map(([key, career]) => (
                    <button
                      key={key}
                      className={`dropdown-item ${key === careerKey ? "dropdown-item-active" : ""}`}
                      onClick={() => { onSelectCareer(key); setDropdownOpen(false); }}
                    >
                      {career.name}
                      {key === careerKey && <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
              <span className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: "middle", marginRight: 2 }}>delete</span>
              Limpiar todo
            </button>
            <button className="btn btn-help" onClick={openTutorial} title="Ver tutorial">?</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="dashboard-header">
          <div className="dashboard-left">
            <h2 className="dashboard-title">{careerConfig.name}</h2>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <p className="dashboard-subtitle">Arrastra los ramos para organizar tus semestres.</p>
              {Object.keys(plannedSemesters).length > 0 && (
                <button className="btn btn-clear" style={{ padding: "4px 8px" }} onClick={resetPlanning}>
                  Restablecer orden
                </button>
              )}
            </div>
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
            <div className="year-row" style={{ gridTemplateColumns: `repeat(${TOTAL_SEMESTERS}, minmax(110px, 1fr))` }}>
              {Array.from({ length: numYears }, (_, i) => i + 1).map((y) => {
                const s2 = y * 2;
                const span = s2 <= TOTAL_SEMESTERS ? 2 : 1;
                return (
                  <button
                    key={y}
                    className={`year-btn ${isYearAllDone(y) ? "year-btn-active" : ""}`}
                    style={{ gridColumn: `span ${span}` }}
                    onClick={() => markYear(y)}
                  >
                    Año {y}
                  </button>
                );
              })}
            </div>
            <div className="malla-grid" style={{ gridTemplateColumns: `repeat(${TOTAL_SEMESTERS}, minmax(110px, 1fr))` }}>
              {Array.from({ length: TOTAL_SEMESTERS }, (_, i) => i + 1).map((sem) => (
                <div 
                  className="semester-col" 
                  key={sem}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const courseId = e.dataTransfer.getData("courseId");
                    if (courseId) moveCourse(courseId, sem);
                  }}
                >
                  <button
                    className={`semester-btn ${isSemAllDone(sem) ? "semester-btn-active" : ""}`}
                    onClick={() => markSemester(sem)}
                  >
                    Sem {ROMAN[sem]}
                  </button>
                  <div className="semester-cards">
                    {semesters[sem] && semesters[sem].map((course) => renderCard(course))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {optCourses.length > 0 && (
          <div className="optativos-section">
            <div className="optativos-header">
              <span>Asignaturas Optativas</span>
            </div>
            <div className="optativos-row">
              {optCourses.map((course) => renderCard(course))}
            </div>
          </div>
        )}
      </main>

      <footer className="footer malla-footer">
        <div className="footer-content">
          <div className="career-footer-links">
            <a href="https://forms.gle/SDN1WiiGTe5BkNo3A" target="_blank" rel="noopener noreferrer" className="career-footer-link">
              <span className="material-symbols-outlined">add_circle</span>
              Solicita tu carrera
            </a>
            <span className="career-footer-sep">|</span>
            <a href="https://github.com/JoakoFuenzalida/malla-icomercial/discussions" target="_blank" rel="noopener noreferrer" className="career-footer-link">
              <span className="material-symbols-outlined">chat</span>
              Tienes ideas o dudas? Te escuchamos
            </a>
          </div>
          <span className="footer-copy malla-footer-career">{careerConfig.name} PUCV</span>
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

export default function App() {
  const [careerKey, setCareerKey] = useState(() => localStorage.getItem("malla-career") || null);

  useEffect(() => {
    const oldData = localStorage.getItem("malla-approved");
    if (oldData && !localStorage.getItem("malla-icom-approved")) {
      localStorage.setItem("malla-icom-approved", oldData);
      localStorage.removeItem("malla-approved");
    }
  }, []);

  const selectCareer = useCallback((key) => {
    localStorage.setItem("malla-career", key);
    setCareerKey(key);
  }, []);

  const goHome = useCallback(() => {
    localStorage.removeItem("malla-career");
    setCareerKey(null);
  }, []);

  if (!careerKey || !CAREERS[careerKey]) {
    return <CareerSelector onSelect={selectCareer} />;
  }

  return (
    <MallaApp
      key={careerKey}
      careerKey={careerKey}
      careerConfig={CAREERS[careerKey]}
      onSelectCareer={selectCareer}
      onGoHome={goHome}
    />
  );
}
