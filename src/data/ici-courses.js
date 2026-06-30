export const categories = {
  ciencias_basicas: { name: "Ciencias Básicas", color: "#7f1d1d", dot: "#fca5a5" },
  ciencias_ing: { name: "Ciencias de la Ingeniería", color: "#854d0e", dot: "#fcd34d" },
  algoritmos_prog: { name: "Algoritmos y Programación", color: "#7c2d12", dot: "#fb923c" },
  sistemas_info: { name: "Sistemas de Información", color: "#831843", dot: "#f9a8d4" },
  comp_redes: { name: "Computación y Redes", color: "#581c87", dot: "#c084fc" },
  gestion: { name: "Gestión Informática", color: "#1e40af", dot: "#60a5fa" },
  integradoras: { name: "Integradoras de Dominio", color: "#1e3a5f", dot: "#38bdf8" },
  optativos: { name: "Optativos", color: "#374151", dot: "#d1d5db" },
  formacion: { name: "Formación Fundamental", color: "#1f2937", dot: "#9ca3af" },
  ingles: { name: "Programa Inglés", color: "#4c1d95", dot: "#a78bfa" },
};

export const courses = [
  // ── Semestre 1 (18 cr) ──
  { id: "MAT1001", name: "Fundamentos de Matemáticas para Ingeniería", credits: 6, semester: 1, category: "ciencias_basicas", prerequisites: [] },
  { id: "ICI1241", name: "Fundamentos de Algoritmos", credits: 4, semester: 1, category: "algoritmos_prog", prerequisites: [] },
  { id: "ICI1243", name: "Introducción a la Ingeniería Informática", credits: 4, semester: 1, category: "integradoras", prerequisites: [] },
  { id: "ICI1458", name: "Bienestar y Aprendizaje Universitario", credits: 2, semester: 1, category: "integradoras", prerequisites: [] },
  { id: "FF1", name: "Formación Fundamental 1", credits: 2, semester: 1, category: "formacion", prerequisites: [] },

  // ── Semestre 2 (19 cr) ──
  { id: "MAT1002", name: "Cálculo Diferencial e Integral", credits: 6, semester: 2, category: "ciencias_basicas", prerequisites: ["MAT1001"] },
  { id: "MAT1004", name: "Álgebra Lineal", credits: 4, semester: 2, category: "ciencias_basicas", prerequisites: ["MAT1001"] },
  { id: "ICI1242", name: "Fundamentos de Programación", credits: 4, semester: 2, category: "algoritmos_prog", prerequisites: ["ICI1241"] },
  { id: "FIN100-14", name: "Desarrollo Integral y Comunicación para Ingeniería", credits: 3, semester: 2, category: "integradoras", prerequisites: [] },
  { id: "FF2", name: "Formación Fundamental 2", credits: 2, semester: 2, category: "formacion", prerequisites: [] },

  // ── Semestre 3 (19 cr) ──
  { id: "FIS1002", name: "Física para Ingeniería", credits: 5, semester: 3, category: "ciencias_basicas", prerequisites: ["MAT1001"] },
  { id: "MAT1003", name: "Cálculo en Varias Variables", credits: 4, semester: 3, category: "ciencias_basicas", prerequisites: ["MAT1002"] },
  { id: "ICI2145", name: "Análisis Inteligente de Datos", credits: 4, semester: 3, category: "ciencias_ing", prerequisites: ["MAT1002"] },
  { id: "ICI2240", name: "Estructura de Datos", credits: 4, semester: 3, category: "algoritmos_prog", prerequisites: ["ICI1242"] },
  { id: "ANTCRI", name: "Antropología Cristiana", credits: 2, semester: 3, category: "formacion", prerequisites: [] },

  // ── Semestre 4 (18 cr) ──
  { id: "FIS2120", name: "Física Electromagnetismo", credits: 3, semester: 4, category: "ciencias_basicas", prerequisites: ["FIS1002"] },
  { id: "ICI2141", name: "Métodos Numéricos", credits: 3, semester: 4, category: "ciencias_ing", prerequisites: ["ICI1242"] },
  { id: "ICI2241", name: "Programación Avanzada", credits: 4, semester: 4, category: "algoritmos_prog", prerequisites: ["ICI2240"] },
  { id: "ICI2242", name: "Análisis y Diseño de Algoritmos", credits: 4, semester: 4, category: "algoritmos_prog", prerequisites: [] },
  { id: "ING9001", name: "Inglés 1", credits: 2, semester: 4, category: "ingles", prerequisites: [] },
  { id: "ETICRI", name: "Ética Cristiana", credits: 2, semester: 4, category: "formacion", prerequisites: [] },

  // ── Semestre 5 (20 cr) ──
  { id: "FIS3149", name: "Física Moderna", credits: 3, semester: 5, category: "ciencias_basicas", prerequisites: ["FIS1002"] },
  { id: "ICI3240", name: "Base de Datos", credits: 4, semester: 5, category: "sistemas_info", prerequisites: ["ICI1242"] },
  { id: "ICI3244", name: "Inteligencia Artificial", credits: 4, semester: 5, category: "algoritmos_prog", prerequisites: ["ICI2242"] },
  { id: "ICI3245", name: "Autómatas y Compiladores", credits: 3, semester: 5, category: "algoritmos_prog", prerequisites: ["ICI2241"] },
  { id: "ICI3344", name: "Hardware y Sistemas Operativos", credits: 4, semester: 5, category: "comp_redes", prerequisites: ["ICI1242"] },
  { id: "ING9002", name: "Inglés 2", credits: 2, semester: 5, category: "ingles", prerequisites: ["ING9001"] },

  // ── Semestre 6 (20 cr) ──
  { id: "ICI3150", name: "Ciencia y Tecnología", credits: 3, semester: 6, category: "integradoras", prerequisites: [] },
  { id: "ICA4121", name: "Administración de Empresas", credits: 3, semester: 6, category: "gestion", prerequisites: [] },
  { id: "ICI3170", name: "Estadística Computacional", credits: 4, semester: 6, category: "ciencias_ing", prerequisites: ["MAT1003"] },
  { id: "ICI3246", name: "Modelamiento de Software", credits: 4, semester: 6, category: "sistemas_info", prerequisites: ["ICI3240"] },
  { id: "ICI3343", name: "Redes de Computadores", credits: 4, semester: 6, category: "comp_redes", prerequisites: ["ICI3245"] },
  { id: "ING9003", name: "Inglés 3", credits: 2, semester: 6, category: "ingles", prerequisites: ["ING9002"] },

  // ── Semestre 7 (21 cr) ──
  { id: "ICI4150", name: "Robótica y Sistemas Autónomos", credits: 3, semester: 7, category: "integradoras", prerequisites: ["ICI3343"] },
  { id: "ICI4151", name: "Optimización", credits: 4, semester: 7, category: "ciencias_ing", prerequisites: [] },
  { id: "ICI4244", name: "Ingeniería de Software", credits: 4, semester: 7, category: "sistemas_info", prerequisites: ["ICI3246"] },
  { id: "ICI4247", name: "Ingeniería Web y Móvil", credits: 4, semester: 7, category: "sistemas_info", prerequisites: ["ICI3246"] },
  { id: "ICI4344", name: "Computación Paralela y Distribuida", credits: 4, semester: 7, category: "comp_redes", prerequisites: ["ICI3343"] },
  { id: "ING9004", name: "Inglés 4", credits: 2, semester: 7, category: "ingles", prerequisites: ["ING9003"] },

  // ── Semestre 8 (17 cr) ──
  { id: "ICA4161", name: "Economía y Finanzas", credits: 3, semester: 8, category: "gestion", prerequisites: ["ICA4121"] },
  { id: "ICI4248", name: "Ingeniería de Requerimientos", credits: 4, semester: 8, category: "sistemas_info", prerequisites: ["ICI4247"] },
  { id: "ICI4370", name: "Ciberseguridad", credits: 4, semester: 8, category: "comp_redes", prerequisites: ["ICI3343"] },
  { id: "ICI4541", name: "Taller de Base de Datos", credits: 4, semester: 8, category: "sistemas_info", prerequisites: ["ICI3240"] },
  { id: "FF3", name: "Formación Fundamental 3", credits: 2, semester: 8, category: "formacion", prerequisites: [] },

  // ── Semestre 9 (17 cr) ──
  { id: "ICI5247", name: "Experiencia de Usuario", credits: 3, semester: 9, category: "sistemas_info", prerequisites: ["ICI4248"] },
  { id: "ICI5441", name: "Administración de Proyectos Informáticos", credits: 3, semester: 9, category: "gestion", prerequisites: [] },
  { id: "ICI5442", name: "Tecnologías Emergentes", credits: 4, semester: 9, category: "integradoras", prerequisites: [] },
  { id: "ICI5475", name: "Negocios, Innovación y Emprendimiento", credits: 3, semester: 9, category: "gestion", prerequisites: [] },
  { id: "ICI5545", name: "Taller de Ingeniería de Software", credits: 4, semester: 9, category: "sistemas_info", prerequisites: ["ICI4244"] },

  // ── Semestre 10 (15 cr) ──
  { id: "ICI5345", name: "Legislación, Ética y Tecnológica", credits: 3, semester: 10, category: "gestion", prerequisites: [] },
  { id: "ICI5444", name: "Taller de Formulación de Proyectos Informáticos", credits: 4, semester: 10, category: "gestion", prerequisites: ["ICI5441"] },
  { id: "ICI5476", name: "Taller de Liderazgo y Trabajo en Equipo", credits: 3, semester: 10, category: "integradoras", prerequisites: [] },
  { id: "ICI5541", name: "Seminario de Título", credits: 5, semester: 10, category: "integradoras", prerequisites: ["ICA4161", "ICI4248", "ICI4541", "ICI4370", "ICI5441", "ICI5545", "ICI5442", "ICI5247", "ICI5475", "ICI4151", "ICI3170", "ICI3344", "ICI3244"] },

  // ── Semestre 11 (12 cr) ──
  { id: "ICI6541", name: "Proyecto de Título", credits: 12, semester: 11, category: "integradoras", prerequisites: ["ICI5541"] },

  // ── Optativos ──
  { id: "OPT1", name: "Optativo 1", credits: 3, semester: 0, category: "optativos", prerequisites: [] },
  { id: "OPT2", name: "Optativo 2", credits: 3, semester: 0, category: "optativos", prerequisites: [] },
  { id: "OPT3", name: "Optativo 3", credits: 3, semester: 0, category: "optativos", prerequisites: [] },
  { id: "OPT4", name: "Optativo 4", credits: 3, semester: 0, category: "optativos", prerequisites: [] },
];

export const TOTAL_CREDITS = 208;
export const TOTAL_SEMESTERS = 11;
