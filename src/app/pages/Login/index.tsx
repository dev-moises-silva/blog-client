import { useFormik } from 'formik'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'

import { loginUserValidateSchema } from '@/utils/validateSchemas/userLoginSchema'
import axios from 'axios'
import { api } from '@/services/api'

export function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginUserValidateSchema,
    onSubmit: async (values) => {
      console.log(values)

      try {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie')
        const { data } = await api.post('/login', values)

        console.log(data)
        
      } catch (error) {
        console.log(error)
      }
    }
  })
  console.log(formik.errors);
  
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className='bg-primary-subtle py-4 px-5 rounded-2 w-50'>
        <h1>Login</h1>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group
            className='mb-3'
            controlId='email'
          >
            <Form.Label>
              E-mail
            </Form.Label>
            <Form.Control 
              onChange={formik.handleChange}
              isInvalid={!!(formik.touched.email && formik.errors.email)}
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className='mb-3'
            controlId='password'
          >
            <Form.Label>
              Senha
            </Form.Label>
            <Form.Control 
              type='password'
              onChange={formik.handleChange}
              isInvalid={!!(formik.touched.password && formik.errors.password)}
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Stack direction='horizontal' gap={2}>
            <Button type='submit' variant='success'>Entrar</Button>
            <Button type='button' as='a' href='/registrar-se'>Cadastrar-se</Button>
          </Stack>
        </Form>
      </div>
    </div>
  )
}