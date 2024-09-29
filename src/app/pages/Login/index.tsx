import { useFormik } from "formik"
import axios from "axios"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Stack from "react-bootstrap/Stack"

import { loginUserValidateSchema } from "@/utils/validateSchemas/userLoginSchema"
import { useNavigate } from "react-router-dom"
import { Center } from "@/components/Center"
import { useState } from "react"
import Swal from "sweetalert2"

export function Login() {
  const navigate = useNavigate()
  const [loadingLogin, setLoadingLogin] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginUserValidateSchema,
    onSubmit: async (values) => {
      setLoadingLogin(true)
      try {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie")
        await axios.post("http://localhost:8000/login", values)
        navigate("/")
      } catch (axiosError) {
        console.log(axiosError)
        Swal.fire({
          title: "Login ou senha invalida!",
          icon: "error"
        })
        setLoadingLogin(false)
      }
    }
  })

  return (
    <Center>
      <h1>Login</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            isInvalid={!!(formik.touched.email && formik.errors.email)}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            onChange={formik.handleChange}
            isInvalid={!!(formik.touched.password && formik.errors.password)}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Stack direction="horizontal" gap={2}>
          <Button type="submit" variant="success" disabled={loadingLogin}>
            {loadingLogin ? "Entrando..." : "Entrar"}
          </Button>

          <Button type="button" as="a" href="/registrar-se">
            Cadastrar-se
          </Button>
        </Stack>
      </Form>
    </Center>
  );
}
