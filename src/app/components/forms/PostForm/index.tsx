import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useFormik } from "formik"
import * as Yup from "yup"

import { api } from "@/services/api"
import { Post } from "@/types/Post"
import { useContext, useState } from "react"
import { AppContext } from "@/context/appContext"

type Props = {
  addPost: (post: Post) => void
}

export function PostForm({ addPost }: Props) {
  const { user } = useContext(AppContext)
  const [loadingRequest, setLoadingRequest] = useState(false)

  const formik = useFormik({
    initialValues: {
      content: ""
    },
    validationSchema: Yup.object().shape({
      content: Yup
        .string()
        .required("É necessário um texto para postagem!")
        .max(900, "O texto não pode ter mais de 900 caracteres!")
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoadingRequest(true)

      try {
        const response = await api.post("posts", values)
        const newPost = response.data as Post
        addPost(newPost)
        resetForm()
        setLoadingRequest(false)
      } catch (error) {
        console.log(error)
      }
    }
  })
  console.log(formik.values)

  return (
    <Form
      onSubmit={formik.handleSubmit}
      className="p-2 bg-secondary-subtle flex-1 rounded-2"
      style={{
        minWidth: "300px",
        maxWidth: "600px"
      }}
    >
      <Form.Group className="mb-4" controlId="content">
        <Form.Control  
          as="textarea"
          rows={3} 
          value={formik.values.content}
          onChange={formik.handleChange}
          isInvalid={!!(formik.touched.content && formik.errors.content)}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.content}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" disabled={loadingRequest || !user}>{loadingRequest ? "Postando..." : "Postar"}</Button>
    </Form>
  )
}