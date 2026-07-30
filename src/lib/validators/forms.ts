import { z } from "zod";

const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo").max(120),

  email: z.string().trim().email("E-mail inválido"),

  phone: z

    .string()

    .trim()

    .regex(phoneRegex, "Telefone no formato (66) 90000-0000"),

  subject: z.string().trim().min(3, "Informe o assunto").max(160),

  message: z.string().trim().min(10, "Escreva uma mensagem com pelo menos 10 caracteres").max(4000),

  consent: z.literal(true, {
    errorMap: () => ({ message: "É necessário aceitar a política de privacidade" }),
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;

const bloodTypeCanine = z.enum(["DEA 1+", "DEA 1-", "Não sei"]);

export const donorSchema = z.object({
  tutorName: z.string().trim().min(2).max(120),

  tutorEmail: z.string().trim().email("E-mail inválido"),

  tutorPhone: z.string().trim().regex(phoneRegex, "Telefone inválido"),

  city: z.string().trim().min(2).max(80),

  petName: z.string().trim().min(1).max(80),

  petBreed: z.string().trim().max(80).optional().or(z.literal("")),

  petAge: z.coerce.number().int().min(1, "Doadores devem ter no mínimo 1 ano").max(12),

  petWeight: z.coerce.number().min(25, "Peso mínimo: 25 kg").max(90),

  petBloodType: bloodTypeCanine,

  vaccinesUpToDate: z.literal(true, {
    errorMap: () => ({ message: "Vacinas em dia são obrigatórias para doar" }),
  }),

  healthNotes: z.string().trim().max(2000).optional().or(z.literal("")),

  consent: z.literal(true, {
    errorMap: () => ({ message: "É necessário aceitar a política de privacidade" }),
  }),
});

export type DonorInput = z.infer<typeof donorSchema>;

export const recipientSchema = z.object({
  tutorName: z.string().trim().min(2).max(120),

  tutorEmail: z.string().trim().email("E-mail inválido"),

  tutorPhone: z.string().trim().regex(phoneRegex, "Telefone inválido"),

  city: z.string().trim().min(2).max(80),

  petName: z.string().trim().min(1).max(80),

  petBreed: z.string().trim().max(80).optional().or(z.literal("")),

  petAge: z.coerce.number().min(0).max(25),

  petWeight: z.coerce.number().min(0.5).max(90),

  petBloodType: z.enum(["DEA 1+", "DEA 1-", "Não sei"]),

  urgency: z.enum(["Emergencial (24h)", "Urgente (72h)", "Programado (semana)"]),

  reason: z.string().trim().min(10, "Descreva o motivo com mais detalhes").max(2000),

  clinicName: z.string().trim().min(2).max(120),

  veterinarianName: z.string().trim().min(2).max(120),

  veterinarianCrmv: z.string().trim().min(2).max(40),

  consent: z.literal(true, {
    errorMap: () => ({ message: "É necessário aceitar a política de privacidade" }),
  }),
});

export type RecipientInput = z.infer<typeof recipientSchema>;
