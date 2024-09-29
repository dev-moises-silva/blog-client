import * as Yup from "yup";

const loginUserValidateSchema = Yup.object().shape({
  email: Yup.string()
    .required("O nome é um campo obrigatório!")
    .email("O campo deve ser um email válido!"),
  password: Yup.string()
    .required("A senha é um campo obrigatório!")
    .min(8, "A senha deve ter no mínimo 8 caracteres!")
    .max(32, "A senha deve ter no máximo 32 caracteres!"),
});

export { loginUserValidateSchema };
