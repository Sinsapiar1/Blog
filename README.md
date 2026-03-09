# Raul Pivet — Portfolio Personal

> **Data Engineer & Logistics Tech Specialist** · Miami, FL  
> Automatización · Business Intelligence · IA Aplicada

[![Live](https://img.shields.io/badge/🌐_Live-sinsapiar1.github.io%2FBlog-FF6B00?style=for-the-badge)](https://sinsapiar1.github.io/Blog)
[![GitHub](https://img.shields.io/badge/GitHub-Sinsapiar1-181717?style=for-the-badge&logo=github)](https://github.com/Sinsapiar1)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-raulpivet-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/raulpivet)

---

## Descripción

Portfolio web profesional que refleja mi trabajo como especialista en datos, automatización y logística. No es solo una vitrina — es un sistema funcional con **IA generativa integrada**, automatización de CRM y flujo de calificación de leads en tiempo real.

El formulario de contacto procesa cada mensaje con **Gemini AI**, asigna un score de relevancia, clasifica el tipo de contacto y envía respuestas personalizadas automáticamente — todo sin intervención manual.

---

## Stack Tecnológico

### Frontend
| Tecnología | Uso |
|---|---|
| HTML5 / CSS3 / JS ES6+ | Estructura, estilos e interactividad |
| AOS Library | Animaciones on scroll |
| Font Awesome 6 | Iconografía vectorial |
| CSS Custom Properties | Sistema de diseño con variables |
| Glassmorphism + Dark Mode | UI moderna con persistencia en localStorage |

### Automatización & IA
| Tecnología | Uso |
|---|---|
| Make.com (ex Integromat) | Orquestación del flujo completo |
| Google Gemini AI (gemini-2.0-flash) | Análisis, scoring y redacción de respuestas |
| Gmail API (via Make) | Envío de emails automáticos |
| Google Sheets (via Make) | Registro y auditoría de contactos |
| Webhook (Make) | Punto de entrada del formulario |

---

## Arquitectura del Sistema de Contacto con IA

```
[Formulario contacto.html]
        │
        │  POST JSON (nombre, email, motivo, mensaje, fecha)
        ▼
[Make Webhook] ──► [Parse JSON] ──► [HTTP → Gemini AI]
                                            │
                              Prompt con contexto del contacto
                              Devuelve: score, categoria, respuesta_email
                                            │
                                    [Parse JSON response]
                                            │
                              ┌─────────────┴─────────────┐
                              │                           │
                         score ≥ 6                   score < 6
                       [Lead Real]                 [Spam / Troll]
                              │                           │
               ┌──────────────┤              ┌────────────┤
               │              │              │            │
        Email al          Email a       Email al      Email a
        contacto           Raul         contacto       Raul
      (respuesta IA)   (alerta lead)  (respuesta     (alerta
                                       diplomática)    filtro)
               │              │              │            │
               └──────────────┴──────────────┴────────────┘
                                    │
                             [Google Sheets]
                          Registro completo del contacto
```

### Lógica de Scoring Gemini

| Score | Perfil | Ruta |
|---|---|---|
| 9–10 | Cliente con proyecto concreto, datos reales | ✅ Lead Real |
| 7–8 | Recruiter legítimo, consulta técnica genuina | ✅ Lead Real |
| 6 | Mensaje genuino pero vago | ✅ Lead Real |
| 4–5 | Ambiguo, poco contexto | ❌ Filtrado |
| 1–3 | Spam, bots, trolls | ❌ Filtrado |

### Sanitización Anti-Inyección

El formulario aplica `sanitizeMessage()` antes de enviar al webhook — convierte comillas dobles y tipográficas en simples para garantizar que el JSON del body de Gemini nunca se rompa, independientemente del contenido del mensaje.

---

## Estructura del Repositorio

```
Blog/
├── index.html          # Página principal con proyectos y skills
├── galeria.html        # Lab — proyectos e imágenes técnicas
├── sobre-mi.html       # Trayectoria profesional y experiencia
├── cv.html             # Currículum interactivo
├── proyectos.html      # Portfolio de proyectos técnicos
├── contacto.html       # Formulario con IA + CRM integrado
├── style.css           # Sistema de diseño global
├── script.js           # Funcionalidad compartida
├── img/
│   └── gallery/        # Recursos gráficos
├── docs/
│   ├── CV_Raul_Pivet_ES.pdf
│   └── CV_Raul_Pivet_EN.pdf
└── README.md
```

---

## Funcionalidades Destacadas

### Formulario de Contacto Inteligente
- Validación en tiempo real con feedback visual
- Sanitización de input antes del envío
- Pantalla de éxito animada post-envío
- Modo sin CORS (no-cors fetch) para compatibilidad con Make webhook
- Internacionalización ES/EN completa

### UI/UX
- **Dark / Light Mode** con toggle y persistencia
- **Responsive** completo — mobile, tablet, desktop
- **Glassmorphism** en cards y sidebar
- **Animaciones AOS** con scroll
- **Loader** de entrada y scroll indicator
- **Menú hamburguesa** animado en móvil

### Internacionalización
- Toggle ES 🇦🇷 / EN 🇺🇸 en todas las páginas
- Traducciones completas incluyendo opciones de select y mensajes de estado
- Persistencia de idioma con localStorage

---

## Roadmap

### Próximas mejoras
- [ ] Integración con Google Calendar para agendar reuniones directo desde el email de respuesta
- [ ] Dashboard en Make con métricas de leads (volumen, score promedio, categorías)
- [ ] Notificación push / Telegram cuando llega un lead con score ≥ 8
- [ ] Historial de conversaciones con seguimiento en CRM
- [ ] PWA — funcionalidad offline y app instalable
- [ ] Blog técnico con sistema de tags y búsqueda
- [ ] Formulario multipasos para proyectos freelance (scope, presupuesto, timeline)

---

## Despliegue

El portfolio corre sobre **GitHub Pages** — cada push a `main` se despliega automáticamente.

```bash
# Clonar el repositorio
git clone https://github.com/Sinsapiar1/Blog.git

# Abrir en navegador
open index.html
```

No requiere build ni dependencias — HTML/CSS/JS puro con librerías CDN.

---

## Autor

**Raul Pivet**  
Senior Data Engineer & Logistics Tech Specialist  
Miami, Florida — disponible para proyectos remotos y presenciales

9+ años de experiencia en operaciones logísticas, Business Intelligence y automatización empresarial. Especializado en Microsoft Power Platform, Python, Streamlit y arquitecturas de automatización con IA aplicada a procesos reales de negocio.

---

*Construido con propósito — cada feature resuelve un problema real.*
