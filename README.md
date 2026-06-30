# Malla Interactiva PUCV

Herramienta web para visualizar y hacer seguimiento de tu avance en la malla curricular de carreras de la PUCV.


## Que hace

- Marca ramos como aprobados y ve tu progreso en creditos y porcentaje
- Los ramos bloqueados se desbloquean automaticamente al aprobar sus prerrequisitos
- Modo Ruta: al pasar el mouse sobre un ramo, se resaltan sus prerrequisitos y dependientes
- Seleccion por semestre o por ano completo
- Los datos se guardan en tu navegador, no se envian a ningun servidor

## Carreras disponibles

- Ingenieria Comercial (10 semestres, 200 creditos SCT)
- Ingenieria Civil Informatica (11 semestres, 208 creditos SCT)

Si quieres que agreguemos tu carrera, llena este [formulario](https://forms.gle/SDN1WiiGTe5BkNo3A) con capturas de tu malla desde el navegador PUCV.

## Stack

- React 19
- Vite
- CSS vanilla (sin frameworks)
- Sin backend, todo corre en el cliente

## Levantar el proyecto

```bash
npm install
npm run dev
```

Se abre en `http://localhost:5173`.

## Estructura

```
src/
  App.jsx          # Componente principal, selector de carrera y malla
  App.css          # Estilos
  data/
    courses.js     # Datos de Ingenieria Comercial
    ici-courses.js # Datos de Ingenieria Civil Informatica
```

Para agregar una carrera nueva, crea un archivo en `src/data/` siguiendo el formato de los existentes (categorias, cursos con prerrequisitos, creditos totales y cantidad de semestres) y registralo en el objeto `CAREERS` de `App.jsx`.

## Contribuir

El proyecto es codigo abierto. Si encontraste un error en los datos de alguna malla o tienes ideas para mejorar la herramienta, abre un tema en [Discussions](https://github.com/JoakoFuenzalida/malla-icomercial/discussions).

## Aviso

Este sitio no es una pagina oficial de la PUCV ni esta afiliado a la universidad. Es un proyecto independiente hecho por estudiantes. La informacion puede contener errores o estar desactualizada. Consulta siempre los canales oficiales de la universidad.

---
Para ti, Sofi

Esta plataforma la hice pensando en ti. Sigue echándole ganas a la U que vas increíble. Estoy orgulloso de ti.

Con cariño, Joako ♥

Hecho por [Joaquin Fuenzalida](https://github.com/JoakoFuenzalida), estudiante de Ingenieria Civil Informatica PUCV.
