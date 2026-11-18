# Informats — Pantalla «Inicio · Hoy, con claridad»

Desarrollo frontend profesional para la pantalla principal de la aplicación **Informats**, reproduciendo con fidelidad milimétrica el diseño original de Figma:
[Figma: Informats_v1 · Inicio (nodo 24:1164)](https://www.figma.com/design/aCfzAIfpvXWv3Fm5aoA716/Informats_v1?node-id=24-1164)

---

## 1. Arquitectura y Tecnologías

- **React 19** con **TypeScript 5.7** en modo estricto (`strict: true`, sin `any` ni type assertions inseguras).
- **Vite 6** como motor de desarrollo y compilación optimizada.
- **CSS Modules + CSS Custom Properties** organizadas por tokens de diseño (colores, espaciados, tipografías y modos).
- **Tipografías oficiales de Figma**:
  - *Odor Mean Chey* para la identidad de marca Informats.
  - *Lora* (SemiBold) para titulares periodísticos.
  - *Source Sans 3* (Regular y SemiBold) para interfaces, textos y controles.
- **Web Speech API** nativa para búsqueda por voz con control de permisos, retroalimentación visual de escucha y detección de soporte del navegador.
- **Accesibilidad WCAG 2.2 Nivel AA**:
  - HTML semántico (`header`, `main`, `footer`, `section`, `article`, `role="feed"`).
  - Navegación por teclado completa (Tab, Shift+Tab, Enter, Escape).
  - Diálogos con trampa de foco y restauración de foco al cerrar.
  - Modo alto contraste y 3 tamaños de letra (*mediana*, *grande*, *muy grande*).
  - Soporte de lectura asistida por voz (*Text-to-Speech*) mediante SpeechSynthesis.
- **Persistencia local**:
  - Almacenamiento seguro en `localStorage` con tolerancia a errores para "Me gusta" y preferencias de accesibilidad.
- **Pruebas y Calidad**:
  - **Vitest + React Testing Library** para pruebas unitarias y de integración de componentes.
  - **Playwright** para pruebas end-to-end en navegadores reales emulando dispositivos móviles y escritorio.

---

## 2. Estructura de Archivos

```
Informats/
├── e2e/                                # Pruebas End-to-End con Playwright
│   └── informats.spec.ts
├── src/
│   ├── assets/                         # Recursos visuales originales de Figma
│   │   ├── icon-accessibility.svg
│   │   ├── icon-account.svg
│   │   ├── icon-arrow-left.svg
│   │   ├── icon-arrow-right.svg
│   │   ├── icon-heart-color.svg
│   │   ├── icon-mic.svg
│   │   ├── icon-phone.svg
│   │   ├── icon-search.svg
│   │   ├── noticia-bono-luz.png
│   │   ├── noticia-cita-medica.png
│   │   ├── noticia-pension.png
│   │   └── noticia-sms.png
│   ├── components/
│   │   ├── AccessibleDialog/           # Diálogo modal accesible con trampa de foco
│   │   ├── EmptyState/                 # Estado vacío ante filtros sin resultados
│   │   ├── Header/                     # Cabecera con identidad, accesibilidad y volver
│   │   ├── IncibeFooter/               # Pie institucional INCIBE (tel:017 e incibe.es)
│   │   ├── LikeButton/                 # Contador interactivo de "Me gusta" persistido
│   │   ├── Modals/
│   │   │   ├── AccessibilityModal.tsx  # Panel "Accesibilidad · A tu manera"
│   │   │   ├── AccountModal.tsx        # Previsualización contextual de cuenta
│   │   │   └── ArticleModal.tsx        # Lectura completa de noticia con pasos
│   │   ├── NewsCard/                   # Tarjeta de noticia con imagen, tags y "leer +"
│   │   ├── NewsSection/                # Listado de selección de noticias y resumen
│   │   ├── SearchBar/                  # Buscador fijo con entrada por texto y voz
│   │   └── TopicFilters/               # Selector interactivo de las 11 categorías
│   ├── context/
│   │   └── AccessibilityContext.tsx    # Contexto global de accesibilidad y audio
│   ├── data/
│   │   └── noticias.ts                 # Datos de prueba tipados de las noticias
│   ├── hooks/
│   │   ├── useNewsFilter.ts            # Lógica desacoplada de búsqueda y filtrado
│   │   └── useSpeechRecognition.ts     # Integración nativa con Web Speech API
│   ├── services/
│   │   └── storage.ts                  # Capa de almacenamiento local seguro
│   ├── styles/
│   │   └── global.css                  # Variables de tema, reset y accesibilidad
│   ├── test/
│   │   └── setup.ts                    # Configuración de Vitest y mocks de DOM
│   ├── types/
│   │   └── index.ts                    # Interfaces TypeScript del dominio
│   ├── App.module.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 3. Instalación y Ejecución

### Requisitos previos
- Node.js LTS (v20 o superior).
- npm v10+.

### Instalación de dependencias
```bash
npm install
```

### Ejecución en desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

### Compilación para producción
```bash
npm run build
```

### Comprobación de tipos TypeScript
```bash
npm run typecheck
```

### Ejecución de pruebas unitarias y de componentes (Vitest)
```bash
npm run test
```

### Ejecución de pruebas End-to-End (Playwright)
```bash
npm run test:e2e
```

---

## 4. Funcionalidades Detalladas

1. **Cabecera**:
   - Logotipo Informats con desplazamiento suave al inicio.
   - Acceso directo a panel modal de Accesibilidad («A tu manera»).
   - Acceso contextual a «Cuenta» (previsualización de sesión y favoritos sin cambiar de pantalla).
   - Acción «Volver» que restablece filtros activos o retrocede en el historial de navegación sin errores.
2. **Buscador fijo**:
   - Globo de consulta «¿Qué quieres saber hoy?».
   - Búsqueda en tiempo real o por confirmación mediante Enter y botón de lupa.
   - Botón para limpiar consulta rápida con restauración de foco.
   - Búsqueda por voz con Web Speech API (`es-ES`), animación de escucha y manejo de navegadores no compatibles.
3. **Selección de noticias**:
   - 4 tarjetas completas con imágenes originales del diseño Figma, badges de categorías, titulares y enlaces «leer +».
   - Sistema de "Me gusta" con actualización inmediata del contador, prevención de duplicados y persistencia en `localStorage`.
   - Lectura de noticia contextual en modal accesible con pasos para actuar, resumen claro, enlace oficial y lectura de audio.
4. **Explorar por temas**:
   - 11 categorías interactivas: España, Internacional, Valencia, Economía, Mundo Digital, Deporte, Política, Cultura, Sociedad, Salud, Trámites.
   - Estado visual activo (verde `#185641` con texto blanco) e inactivo (gris `#eeeeea` con borde `#c9d1c7`) según especificación de Figma.
   - Filtrado simultáneo combinable con la búsqueda de texto.
   - Botón para limpiar filtros de temas.
5. **Pie institucional INCIBE**:
   - Enlace telefónico directo `tel:017`.
   - Enlace oficial a `https://www.incibe.es/linea-de-ayuda-en-ciberseguridad` con atributos de seguridad `rel="noopener noreferrer"`.
