import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be provided in .env.local");
}

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  // Crear tabla libros
  await sql`
    CREATE TABLE IF NOT EXISTS libros (
      id SERIAL PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      autor VARCHAR(255) NOT NULL,
      categoria VARCHAR(100) NOT NULL,
      anio_publicacion INTEGER NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  // Insertar datos de ejemplo si la tabla está vacía
  const existing = await sql`SELECT COUNT(*) as count FROM libros`;
  if (Number(existing[0].count) === 0) {
    await sql`
      INSERT INTO libros (titulo, autor, categoria, anio_publicacion, stock) VALUES
      ('Cien Anios de Soledad', 'Gabriel Garcia Marquez', 'Novela', 1967, 15),
      ('Don Quijote de la Mancha', 'Miguel de Cervantes', 'Clasico', 1605, 8),
      ('El Principito', 'Antoine de Saint-Exupery', 'Fantasia', 1943, 20),
      ('1984', 'George Orwell', 'Ciencia Ficcion', 1949, 12),
      ('Orgullo y Prejuicio', 'Jane Austen', 'Novela', 1813, 10),
      ('La Odisea', 'Homero', 'Clasico', -800, 5),
      ('Harry Potter y la Piedra Filosofal', 'J.K. Rowling', 'Fantasia', 1997, 25),
      ('Fahrenheit 451', 'Ray Bradbury', 'Ciencia Ficcion', 1953, 7),
      ('Rayuela', 'Julio Cortazar', 'Novela', 1963, 9),
      ('El Hobbit', 'J.R.R. Tolkien', 'Fantasia', 1937, 18)
    `;
    console.log("Datos de ejemplo insertados correctamente.");
  } else {
    console.log("La tabla ya contiene datos, no se insertaron datos de ejemplo.");
  }

  console.log("Migracion completada exitosamente.");
}

migrate().catch(console.error);
