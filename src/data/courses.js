export const categories = {
  administracion: { name: "Administración", color: "#3f6212", dot: "#a3e635" },
  financiera: { name: "Financiera-Contable", color: "#78350f", dot: "#fbbf24" },
  personas: { name: "Dirección de Personas", color: "#064e3b", dot: "#34d399" },
  marketing: { name: "Marketing", color: "#1e3a5f", dot: "#60a5fa" },
  tecnologias: { name: "Tecn., Prod. y Op.", color: "#7c2d12", dot: "#fb923c" },
  emprendimiento: { name: "Emprendimiento", color: "#0c4a6e", dot: "#38bdf8" },
  economia: { name: "Economía", color: "#1e3a8a", dot: "#818cf8" },
  matematicas: { name: "Matemáticas", color: "#7f1d1d", dot: "#f87171" },
  taller: { name: "Taller Obligatorio", color: "#713f12", dot: "#fcd34d" },
  formacion: { name: "Formación Fundamental", color: "#1f2937", dot: "#9ca3af" },
  optativos: { name: "Optativos", color: "#581c87", dot: "#c084fc" },
  ingles: { name: "Programa Inglés", color: "#4c1d95", dot: "#a78bfa" },
};

export const courses = [
  // - Semestre 1 (20 cr) -
  { id: "ICA1101", name: "Entorno Legal de los Negocios 1", credits: 3, semester: 1, category: "financiera", prerequisites: [] },
  { id: "ICA1102", name: "Administración de Empresas", credits: 4, semester: 1, category: "administracion", prerequisites: [] },
  { id: "ICA1161", name: "Introducción a la Economía", credits: 4, semester: 1, category: "economia", prerequisites: [] },
  { id: "ICA1181", name: "Taller de Expresión Oral y Escrita 1", credits: 1, semester: 1, category: "taller", prerequisites: [] },
  { id: "ICA1182", name: "Taller Técnicas de Estudio 1", credits: 1, semester: 1, category: "taller", prerequisites: [] },
  { id: "MAT1171", name: "Matemáticas para Dirección de Empresas 1", credits: 7, semester: 1, category: "matematicas", prerequisites: [] },

  // - Semestre 2 (22 cr) -
  { id: "ICA1203", name: "Dirección de Empresas", credits: 4, semester: 2, category: "administracion", prerequisites: ["ICA1102"] },
  { id: "ICA1262", name: "Microeconomía 1", credits: 4, semester: 2, category: "economia", prerequisites: ["ICA1161", "MAT1171"] },
  { id: "ICA1273", name: "Análisis Cuantitativo 1", credits: 4, semester: 2, category: "matematicas", prerequisites: ["MAT1171"] },
  { id: "ICA1283", name: "Taller Habilidades Sociales", credits: 1, semester: 2, category: "taller", prerequisites: ["ICA1181", "ICA1182"] },
  { id: "MAT1272", name: "Matemáticas para Dirección de Empresas 2", credits: 7, semester: 2, category: "matematicas", prerequisites: ["MAT1171"] },
  { id: "FF1", name: "Formación Fundamental 1", credits: 2, semester: 2, category: "formacion", prerequisites: [] },

  // - Semestre 3 (18 cr) -
  { id: "ICA2111", name: "Matemáticas Financieras", credits: 2, semester: 3, category: "financiera", prerequisites: [] },
  { id: "ICA2141", name: "Tecnologías 1", credits: 4, semester: 3, category: "tecnologias", prerequisites: ["ICA1102"] },
  { id: "ICA2163", name: "Macroeconomía 1", credits: 4, semester: 3, category: "economia", prerequisites: ["ICA1262"] },
  { id: "ICA2174", name: "Análisis Cuantitativo 2", credits: 4, semester: 3, category: "matematicas", prerequisites: ["MAT1272", "ICA1273"] },
  { id: "ING9001", name: "Inglés 1", credits: 2, semester: 3, category: "ingles", prerequisites: [] },
  { id: "ANTCRI", name: "Antropología Cristiana", credits: 2, semester: 3, category: "formacion", prerequisites: [] },

  // - Semestre 4 (20 cr) -
  { id: "ICA2204", name: "Administración de Negocios", credits: 4, semester: 4, category: "administracion", prerequisites: ["ICA1203"] },
  { id: "ICA2212", name: "Contabilidad Financiera", credits: 4, semester: 4, category: "financiera", prerequisites: ["ICA1102", "ICA1101", "ICA2111"] },
  { id: "ICA2242", name: "Tecnologías 2", credits: 4, semester: 4, category: "tecnologias", prerequisites: ["ICA2141"] },
  { id: "ICA2264", name: "Econometría", credits: 4, semester: 4, category: "economia", prerequisites: ["ICA2163", "ICA2174"] },
  { id: "ICA2284", name: "Taller Expresión Oral y Escrita 2", credits: 1, semester: 4, category: "taller", prerequisites: ["ICA1181"] },
  { id: "ICA2285", name: "Taller Pensamiento Crítico y Toma de Decisiones", credits: 1, semester: 4, category: "taller", prerequisites: ["ICA1283"] },
  { id: "ING9002", name: "Inglés 2", credits: 2, semester: 4, category: "ingles", prerequisites: ["ING9001"] },

  // - Semestre 5 (20 cr) -
  { id: "ICA3105", name: "Metodología de Investigación en Organizaciones", credits: 2, semester: 5, category: "administracion", prerequisites: ["ICA1203", "ICA2174"] },
  { id: "ICA3113", name: "Contabilidad Administrativa", credits: 4, semester: 5, category: "financiera", prerequisites: ["ICA2212"] },
  { id: "ICA3131", name: "Intro. a la Investigación de Mercados", credits: 3, semester: 5, category: "marketing", prerequisites: ["ICA2174"] },
  { id: "ICA3143", name: "Intro. a la Investigación de Operaciones", credits: 4, semester: 5, category: "tecnologias", prerequisites: ["ICA2174"] },
  { id: "ICA3151", name: "Gestión de Creatividad e Innovación", credits: 3, semester: 5, category: "emprendimiento", prerequisites: ["ICA1203"] },
  { id: "ICA3165", name: "Microeconomía 2", credits: 4, semester: 5, category: "economia", prerequisites: ["ICA1262"] },

  // - Semestre 6 (20 cr) -
  { id: "ICA3214", name: "Finanzas 1", credits: 4, semester: 6, category: "financiera", prerequisites: ["ICA2204", "ICA3113"] },
  { id: "ICA3221", name: "Dirección de Personas 1", credits: 4, semester: 6, category: "personas", prerequisites: ["ICA2204"] },
  { id: "ICA3232", name: "Marketing 1", credits: 4, semester: 6, category: "marketing", prerequisites: ["ICA2204", "ICA3131"] },
  { id: "ICA3244", name: "Producción y Operaciones 1", credits: 4, semester: 6, category: "tecnologias", prerequisites: ["ICA2204", "ICA3143"] },
  { id: "ICA3266", name: "Macroeconomía 2", credits: 4, semester: 6, category: "economia", prerequisites: ["ICA2163"] },

  // - Semestre 7 (20 cr) -
  { id: "ICA4115", name: "Finanzas 2", credits: 4, semester: 7, category: "financiera", prerequisites: ["ICA2264", "ICA3214"] },
  { id: "ICA4122", name: "Dirección de Personas 2", credits: 4, semester: 7, category: "personas", prerequisites: ["ICA3105", "ICA3221"] },
  { id: "ICA4133", name: "Marketing 2", credits: 4, semester: 7, category: "marketing", prerequisites: ["ICA3151", "ICA3232"] },
  { id: "ICA4145", name: "Producción y Operaciones 2", credits: 4, semester: 7, category: "tecnologias", prerequisites: ["ICA3244"] },
  { id: "ICA4167", name: "Economía Internacional", credits: 4, semester: 7, category: "economia", prerequisites: ["ICA3165", "ICA3266"] },

  // - Semestre 8 (20 cr) -
  { id: "ICA4206", name: "Entorno Legal de los Negocios 2", credits: 3, semester: 8, category: "administracion", prerequisites: ["ICA3214"] },
  { id: "ICA4207", name: "Control de Gestión", credits: 3, semester: 8, category: "financiera", prerequisites: ["ICA2242", "ICA3221", "ICA3232", "ICA4115", "ICA4145"] },
  { id: "ICA4252", name: "Planeación y Creación de Negocios", credits: 4, semester: 8, category: "emprendimiento", prerequisites: ["ICA3221", "ICA3244", "ICA4115", "ICA4133"] },
  { id: "ICA4253", name: "Iniciativa Empresarial", credits: 4, semester: 8, category: "emprendimiento", prerequisites: ["ICA4133"] },
  { id: "ICA4254", name: "Intrapreneurship", credits: 2, semester: 8, category: "emprendimiento", prerequisites: ["ICA4122"] },
  { id: "ING9003", name: "Inglés 3", credits: 2, semester: 8, category: "ingles", prerequisites: ["ING9002"] },
  { id: "ETICRI", name: "Ética Cristiana", credits: 2, semester: 8, category: "formacion", prerequisites: [] },

  // - Semestre 9 (20 cr) -
  { id: "ICA5186", name: "Taller de Negociación para Dir. de Empresas", credits: 1, semester: 9, category: "taller", prerequisites: ["ICA2285", "ICA4253"] },
  { id: "ICA5187", name: "Taller Expresión Oral y Escrita 3", credits: 1, semester: 9, category: "taller", prerequisites: ["ICA2284"] },
  { id: "ING9004", name: "Inglés 4", credits: 2, semester: 9, category: "ingles", prerequisites: ["ING9003"] },
  { id: "FF2", name: "Formación Fundamental 2", credits: 2, semester: 9, category: "formacion", prerequisites: [] },
  { id: "FF3", name: "Formación Fundamental 3", credits: 2, semester: 9, category: "formacion", prerequisites: [] },
  { id: "OPT1", name: "Optativo 1", credits: 2, semester: 0, category: "optativos", prerequisites: [] },
  { id: "OPT2", name: "Optativo 2", credits: 2, semester: 0, category: "optativos", prerequisites: [] },
  { id: "OPT3", name: "Optativo 3", credits: 2, semester: 0, category: "optativos", prerequisites: [] },
  { id: "OPT4", name: "Optativo 4", credits: 2, semester: 0, category: "optativos", prerequisites: [] },
  { id: "OPT5", name: "Optativo 5", credits: 2, semester: 0, category: "optativos", prerequisites: [] },
  { id: "OPT6", name: "Optativo 6", credits: 2, semester: 0, category: "optativos", prerequisites: [] },

  // - Semestre 10 (20 cr) -
  { id: "ICA5208", name: "Alta Dirección", credits: 4, semester: 10, category: "administracion", prerequisites: ["ICA4167", "ICA4206", "ICA4252", "ICA4207", "ICA4253", "ICA4254", "ICA5187"] },
  { id: "ICA5209", name: "Taller de Titulación Simulación Empresarial", credits: 14, semester: 10, category: "taller", prerequisites: ["ICA4167", "ICA4206", "ICA4252", "ICA4207", "ICA4253", "ICA4254", "ICA5187"] },
  { id: "ICA5288", name: "Taller de Empleabilidad Ing. Comercial", credits: 2, semester: 10, category: "taller", prerequisites: ["ICA5186"] },
];

export const TOTAL_CREDITS = 200;
export const TOTAL_SEMESTERS = 10;
