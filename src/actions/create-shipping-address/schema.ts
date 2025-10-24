import z from "zod";

export const createShippingAddressSchema = z.object({
  email: z.email("Email inválido."),
  fullName: z.string().trim().min(1, "Nome completo é obrigatório."),
  cpf: z.string().min(11, "CPF é obrigatório."),
  phone: z.string().min(11, "Celular é obrigatório."),
  zipCode: z.string().min(8, "CEP é obrigatório."),
  address: z.string().trim().min(1, "Endereço é obrigatório."),
  number: z.string().trim().min(1, "Número é obrigatório."),
  complement: z.string().optional(),
  neighborhood: z.string().trim().min(1, "Bairro é obrigatório."),
  city: z.string().trim().min(1, "Cidade é obrigatório."),
  state: z.string().trim().min(1, "Estado é obrigatório."),
});

export type CreateShippingAddressSchema = z.infer<
  typeof createShippingAddressSchema
>;
