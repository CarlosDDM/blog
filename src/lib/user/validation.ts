import z from 'zod';

const UserBaseSchema = z.object({
  username: z
    .string()
    .trim()
    .min(4, 'O nome de usuário deve ter no mínimo 4 caracteres')
    .max(30, 'O nome de usuário deve ter no máximo 20 caracteres'),
  email: z
    .email({ message: 'E-mail inválido' })
    .trim()
    .min(1, 'O e-mail é obrigatório')
    .max(100, 'O e-mail deve ter no máximo 100 caracteres'),
  password: z
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .max(100, 'A senha deve ter no máximo 100 caracteres'),
});

export const UserCreateSchema = UserBaseSchema.extend({
  // Campos adicionais para criação, se necessário
  confirmPassword: z
    .string()
    .min(1, 'A confirmação de senha é obrigatória')
    .max(100, 'A confirmação de senha deve ter no máximo 100 caracteres'),
});

export const UserFinalSchema = UserCreateSchema.refine(
  data => data.password === data.confirmPassword,
  {
    message: 'Senha e confirmação de senha não coincidem',
  },
);

export const UserUpdateSchema = UserBaseSchema.partial().extend({
  // Campos adicionais para atualização, se necessário
});
