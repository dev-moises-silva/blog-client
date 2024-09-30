import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Stack from "react-bootstrap/Stack"
import axios from "axios"

import { Center } from "@/components/Center"
import { resisterUserInitialValues } from "@/utils/formikInitialValues/resisterUser"
import { resisterUserVlidateSchema } from "@/utils/validateSchemas/userResisterSchema"
import { api } from "@/services/api"
import { useState } from "react"
import Swal from "sweetalert2"

export function Register() {
  const [loadingRequest, setLoadingRequest] = useState(false)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: resisterUserInitialValues,
    validationSchema: resisterUserVlidateSchema,
    onSubmit: async (values, { setErrors }) => {
      setLoadingRequest(true)
      try {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie")
        const { data } = await api.post("/users", values)
        console.log(data)
        setLoadingRequest(false)
        await Swal.fire({
          title: "O usuário foi cadastrado com sucesso!",
          icon: "success"
        })
        navigate("/login")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (axiosError: any) {
        const errors = axiosError.response.data.errors
        
        setErrors(errors)
      }
    }
  })

  return (
    <Center>
      <h1>Registrar-se</h1>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            isInvalid={!!(formik.touched.name && formik.errors.name)}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        </Form.Group>

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
          <Button type="submit" disabled={loadingRequest}>
            {loadingRequest ? "Cadastrando..." : "Cadastrar"}
          </Button>

          <Button type="button" as="a" href="/login" variant="secondary">
            Voltar
          </Button>
        </Stack>
      </Form>
    </Center>
  );
}
