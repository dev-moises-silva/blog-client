import { useContext, useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"
import Stack from "react-bootstrap/Stack"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"

import Swal from "sweetalert2"
import axios, { AxiosError } from "axios"

import { AppContext } from "@/contexts/appContext"
import { PostForm } from "@/components/forms/PostForm"
import { PostMessage } from "@/components/PostMessage"
import { Post } from "@/types/Post"
import { PostCreated } from "@/types/events/PostCreated"
import { PostDeleted } from "@/types/events/PostDeleted"
import { api } from "@/services/api"

export function Home() {
  const { user, setUser } = useContext(AppContext)
  const [posts, setPosts] = useState<Post[]>([])
  const navigate = useNavigate()

  window.Echo.private("posts")
    .listen("PostCreated", handlePostCeated)
    .listen("PostDeleted", handlePostDeleted)
  
  function handlePostCeated({ post }: PostCreated) {
    addPost(post);
  }

  function handlePostDeleted({ post_id } : PostDeleted) {
    removePost(post_id)
  }

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

  
  function addPost(post: Post) {
    setPosts([post, ...posts])
  }
  
  useEffect(() => {
    fetchUser()
    fetchPosts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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