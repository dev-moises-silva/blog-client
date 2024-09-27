import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import axios from 'axios';

import { Center } from "@/components/Center";
import { resisterUserInitialValues } from '@/utils/formikInitialValues/resisterUser';
import { resisterUserVlidateSchema } from '@/utils/validateSchemas/userResisterSchema';
import { api } from '@/services/api';

export function Register() {
  const formik = useFormik({
    initialValues: resisterUserInitialValues,
    validationSchema: resisterUserVlidateSchema,
    onSubmit: async (values) => {
      try {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie')
        const { data } = await api.post('/users', values)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  })

  return (
    <Center>
      <h1>Registrar-se</h1>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group
          className='mb-3'
          controlId='name'
        >
          <Form.Label>
            E-mail
          </Form.Label>
          <Form.Control 
            onChange={formik.handleChange}
            isInvalid={!!(formik.touched.name && formik.errors.name)}
          />
          <Form.Control.Feedback type='invalid'>
            {formik.errors.name}
          </Form.Control.Feedback>
        </Form.Group>

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
          <Button type='submit'>Cadastrar</Button>
          <Button type='button' as='a' href='/login' variant='secondary'>Voltar</Button>
        </Stack>
      </Form>
    </Center>
  )
}