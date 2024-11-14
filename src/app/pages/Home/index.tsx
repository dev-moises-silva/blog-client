import { useContext, useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"
import Stack from "react-bootstrap/Stack"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"

import { PostForm } from "@/components/forms/PostForm"
import { api } from "@/services/api"
import { Post } from "@/types/Post"
import { PostMessage } from "@/components/PostMessage"
import { AppContext } from "@/contexts/appContext"
import axios, { AxiosError } from "axios"
import Swal from "sweetalert2"

export function Home() {
  const { user, setUser } = useContext(AppContext)
  const [posts, setPosts] = useState<Post[]>([])
  const navigate = useNavigate()

  async function fetchUser() {
    try {
      const { data } = await api.get("/user")
      setUser(data)
    } catch (error) {
      const { status } = error as AxiosError
      
      if (status === 401 || status === 419) {
        navigate("/login")
      }

      // if (status === 419) {
      //   await axios.get(`${window.baseHostUrl}/sactum/csrf-cookie`)
      //   fetchUser()
      // }

      if (status === 403) {
        await Swal.fire({
          title: "Faça a verificação do seu email!",
          icon: "error"
        })

        navigate("/login");
      }
      
      console.log(error)
    }
  }

  async function fetchPosts() {
    try {
      const response = await api.get("posts")
      const posts = response.data as Post[]
      setPosts(posts)
    } catch (error) {
      console.log(error)
    }
  }

  function removePost(postId: number) {
    const newPosts = posts.filter(post => post.id != postId)
    setPosts(newPosts)
  }

  useEffect(() => {
    fetchUser()
    fetchPosts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function addPost(post: Post) {
    setPosts([post, ...posts])
  }

  async function logout() {
    try {
      await axios.post(`${window.baseHostUrl}/logout`)
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }
  console.log(user, posts)
  
  return (
    <div 
      className="mx-auto my-2"
      style={{
        maxWidth: "600px",
        minWidth: "300px"
      }}
    >
      <section>
        <DropdownButton title="Opções" disabled={!user}>
          <Dropdown.Item onClick={logout} as="button">Sair</Dropdown.Item>
        </DropdownButton>
      </section>

      <section className="mt-2">
        <PostForm addPost={addPost}/>
      </section>

      <section className="mt-3">
        <Stack 
          gap={2}
        >
          {posts.map(post => (
            <PostMessage key={post.id} post={post} removePost={removePost}/>
          ))}
        </Stack>
      </section>
    </div>
  )
}