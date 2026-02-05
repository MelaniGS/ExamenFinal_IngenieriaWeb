import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const libros = pgTable("libros", {
    id: serial("id").primaryKey(),
    titulo: varchar("titulo", { length: 255 }).notNull(),
    autor: varchar("autor", { length: 255 }).notNull(),
    categoria: varchar("categoria", { length: 100 }).notNull(),
    anioPublicacion: integer("anio_publicacion").notNull(),
    stock: integer("stock").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export type Libro = typeof libros.$inferSelect;
export type LibroInput = typeof libros.$inferInsert;
