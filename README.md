# Aplicación de publicaciones y usuarios con React y Express

Aplicación web con registro/inicio de sesión, creación de publicaciones y vista administrativa. Está dividida en frontend React con Create React App y API Express.

## Requisitos

Node.js y npm compatibles con react-scripts 5.0.1. Instalar dependencias de frontend y backend por separado.

## Ejecución

Los comandos parten de la raíz del repositorio, salvo donde se indica otra terminal.

```bash
cd backend
npm ci
npm start

# Otra terminal, desde la raíz:
cd frontend
npm ci
npm start
```

## Recorrido de demostración

Abrir http://localhost:3000 para React; la API escucha en http://localhost:5000, según backend/index.js. La API usa archivos/colecciones locales para usuarios y publicaciones.

## Organización

Carpetas de la entrega: [`backend/`](backend/), [`frontend/`](frontend/).

## Documentación

- [README](frontend/README.md)

## Alcance y límites

Autenticación y persistencia corresponden a una entrega académica. No se atribuye al backend una suite automatizada: sus verificaciones de sintaxis están en npm run check.

## Contexto y licencia

Trabajo académico o de aprendizaje conservado en el portafolio de [Enner Mendizabal](https://github.com/Ennero). Los créditos de los trabajos en grupo se conservan en sus entregas y manuales.

Consultar [LICENSE](LICENSE) para la licencia de la raíz. Las dependencias y los componentes con avisos o licencias propios conservan sus condiciones.

### Licencias declaradas por componente

La licencia de la raíz no sustituye las declaraciones de estos manifiestos:

- `backend/package.json`: `ISC`.
