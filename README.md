# raulpivet.com

Sitio de PIVET DIGITAL AUTOMATIONS LLC y de PivetTrack, en español e inglés.
HTML estático publicado con GitHub Pages desde `main`; sin compilación ni dependencias.

## Páginas

| Archivo | Contenido |
|---|---|
| `index.html` | Portada |
| `pivettrack.html` | Producto, mediciones, videos, precios y SLA |
| `contacto.html` | Formulario de contacto |
| `sobre-mi.html` | Trayectoria y forma de trabajo |
| `proyectos.html`, `galeria.html`, `appsheet-demos.html` | Trabajos, laboratorio y archivo de AppSheet |
| `cv.html` | CV con descarga en PDF |
| `privacidad.html` | Política de privacidad del sitio |
| `legal/` | Documentos legales; se generan desde `docs/comercial/scripts/publicar_legal_blog.py` en el repositorio de PivetTrack |

## Estilos

- `assets/site.css`: diseño del sitio y sus variables.
- `assets/site.js`: idioma, menú del celular, etiqueta de la portada y reproductor de videos.
- `assets/legado.css` y `assets/secundarias.css`: llevan a ese diseño las páginas que arman su contenido con JavaScript.
- `style.css`: lo siguen usando las páginas de `legal/`.

El idioma se guarda en `localStorage` con la clave `homeLang`. En las páginas estáticas cada texto va en un par de elementos `data-l="es"` y `data-l="en"`.

## Formulario de contacto

`contacto.html` envía a un escenario de Make los campos `nombre`, `empresa`, `email`, `motivo`, `mensaje` y `fecha`. Si se cambia algún nombre, hay que cambiarlo también en Make.

## Ver el sitio en local

```bash
python -m http.server 8765 --bind 127.0.0.1
```
