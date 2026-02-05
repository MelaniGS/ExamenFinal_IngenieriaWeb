import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { db } from "../lib/db";
import { libros } from "../lib/db/schema";
import { sql } from "drizzle-orm";

async function main() {
    console.log("Seeding database...");

    const exampleLibros = [
        {
            titulo: "Cien Años de Soledad",
            autor: "Gabriel García Márquez",
            categoria: "Novela",
            anioPublicacion: 1967,
            stock: 12,
        },
        {
            titulo: "Don Quijote de la Mancha",
            autor: "Miguel de Cervantes",
            categoria: "Clásico",
            anioPublicacion: 1605,
            stock: 8,
        },
        {
            titulo: "La Sombra del Viento",
            autor: "Carlos Ruiz Zafón",
            categoria: "Novela",
            anioPublicacion: 2001,
            stock: 15,
        },
        {
            titulo: "El Principito",
            autor: "Antoine de Saint-Exupery",
            categoria: "Ficción",
            anioPublicacion: 1943,
            stock: 20,
        },
        {
            titulo: "Rayuela",
            autor: "Julio Cortázar",
            categoria: "Novela",
            anioPublicacion: 1963,
            stock: 6,
        },
    ];

    try {
        // Clear existing data (optional)
        // await db.delete(libros);

        await db.insert(libros).values(exampleLibros);
        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        process.exit(0);
    }
}

main();
