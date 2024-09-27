import * as Yup from "yup"

const loginUserValidateSchema = Yup.object().shape({
  email: Yup
    .string()
    .required("O nome é um campo obrigatório!")
    .email('O campo deve ser um email válido!'),
  password: Yup
    .string()
    .required("A senha é um campo obrigatório!")
})

export { loginUserValidateSchema }