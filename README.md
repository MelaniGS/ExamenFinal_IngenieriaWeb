# Guía de Comandos del Sistema de Gestión de Libros 📚

Esta guía contiene todos los códigos necesarios para ejecutar, probar y monitorear la aplicación desde la terminal.

## 1. Configuración Inicial
Antes de empezar, asegúrate de instalar las dependencias:
```bash
npm install
```

## 2. Ejecución del Proyecto
Para iniciar el servidor de desarrollo:
```bash
npm run dev
```
La aplicación estará disponible en: [http://localhost:3000](http://localhost:3000)

## 3. Pruebas Unitarias (OBLIGATORIO) 🧪
Para ejecutar todas las pruebas unitarias (Backend y Frontend) y ver los resultados de éxito/error:
```bash
npm test
```
*Este comando ejecutará los 15+ tests implementados para servicios, controladores y componentes.*

## 4. Pruebas de Estrés (OBLIGATORIO) ⚡
Para realizar la prueba de carga con 20 usuarios concurrentes (requiere tener [k6](https://k6.io/) instalado):
```bash
k6 run stress-test.js
```

## 5. Monitoreo y Salud 🩺
Para verificar el estado de la base de datos y la latencia del sistema:
```bash
# Puedes usar curl o simplemente abrirlo en el navegador
curl http://localhost:3000/api/health
```

## 6. Base de Datos 🗄️
Si necesitas sincronizar cambios en el esquema de la base de datos (Drizzle):
```bash
npx drizzle-kit push
```

## 7. Despliegue y Git 🚀
Para subir cambios finales a tu repositorio:
```bash
git add .
git commit -m "docs: actualizacion de documentacion final"
git push origin main
```

---
**Desarrollado por:** GUAMAN SANTOS MELANIE CRISTINA
**Materia:** Ingeniería Web | 2026
