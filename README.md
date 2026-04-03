# 📒 Dr. Falken's Notebook

En este cuaderno se recopilan ideas, conceptos y reflexiones sobre la inteligencia artificial, así como experimentos y resultados obtenidos en nuestro pequeño laboratorio de IA aplicada.

Con esto pretendemos aprender y compartir conocimientos sobre IA, fomentar la colaboración y la innovación en este campo en constante evolución.

## Desarrollo

### Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- npm (incluido con Node.js)

### Instalación de dependencias

```bash
npm install
```

### Servidor de desarrollo local

```bash
npm start
```

Abre el navegador en `http://localhost:3000/falkens-notebook`. Los cambios en el contenido se reflejan automáticamente sin necesidad de reiniciar.

### Construir el sitio estático

```bash
npm run build
```

Genera el sitio en la carpeta `build/`. Si hay enlaces internos rotos, el proceso fallará.

### Probar el sitio construido

```bash
npm run serve
```

Sirve el contenido de `build/` en `http://localhost:3000/falkens-notebook` para verificar el resultado final antes de publicar.
