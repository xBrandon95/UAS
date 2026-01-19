import * as z from "zod";

export const testSchema = z.object({
  titulo: z
    .string()
    .min(3, "Título tiene que tener al menos 3 caracteres.")
    .max(32, "Bug title must be at most 32 characters."),
  observaciones: z
    .string()
    .min(2, "Observaciones tiene que tener al menos 2 caracteres"),
  lenguaje: z.string().nonempty("Debes selecciona al menos un lenguaje"),
  terminos: z.boolean(),
  genero: z.string().nonempty("Debe seleccionar genero"),
  fechaNacimiento: z.date({ message: "La fecha es requerida" }),
});

export type TestFormData = z.infer<typeof testSchema>;
