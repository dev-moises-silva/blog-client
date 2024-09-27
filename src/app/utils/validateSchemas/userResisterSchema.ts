import * as Yup from "yup"

const resisterUserVlidateSchema = Yup.object().shape({
  name: Yup
    .string()
    .required("O campo nome é obrigatório!")
    .max(150, "O nome deve ter no máximo 150 caracteres!"),
  email: Yup
    .string()
    .required("O campo e-mail é obrigatório!")
    .email("O campo deve ser um e-mail válido!")
    .max(150, "O email deve ter no máximo 150 caracteres!"),
  password: Yup
    .string()
    .required("O campo senha é obrigatório!")
    .min(8, "A senha deve ter no mínimo 8 caracteres!")
    .max(32, "A senha deve ter no máximo 32 caracteres!")
})

export { resisterUserVlidateSchema }