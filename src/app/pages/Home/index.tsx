import { useContext, useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"
import Stack from "react-bootstrap/Stack"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"

import { PostForm } from "@/components/forms/PostForm"
import { api } from "@/services/api"
import { Post } from "@/types/Post"
import { PostMessage } from "@/components/PostMessage"
import { AppContext } from "@/context/appContext"
import axios from "axios"

export function Home() {
  const { user, setUser } = useContext(AppContext)
  const [posts, setPosts] = useState<Post[]>([])
  const navigate = useNavigate()

  async function fetchUser() {
    try {
      const { data } = await api.get("/user")
      setUser(data)
    } catch (error) {
      console.log(error)
      navigate("/login")
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
        <DropdownButton title="Opções">
          <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
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
            <PostMessage key={post.id} post={post}/>
          ))}
        </Stack>
      </section>
    </div>
  )
}