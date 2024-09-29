import { useContext } from "react"

import CloseButton from "react-bootstrap/CloseButton"
import Swal from "sweetalert2"

import { AppContext } from "@/context/appContext"
import { Post } from "@/types/Post"
import { api } from "@/services/api"

type Props = {
  post: Post
}

export function PostMessage({ post }: Props) {
  const { user } = useContext(AppContext)
  const postDateCreate = window.dayjs(post.created_at).fromNow()

  async function deletePost(post_id: number) {
    const swalResult = await Swal.fire({
      titleText: "Deseja excluir essa postagem?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Excluir postagem",
      cancelButtonText: "Cancelar"
    })

    if(swalResult.isConfirmed) {
      try {
        await api.delete(`posts/${post_id}`)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="bg-secondary-subtle rounded-2 p-2">
      <div className="d-flex justify-content-between gap-4 mb-2">
        <div>
          {`${user.id === post.user_id ? "Você" : post.author} | ${postDateCreate}`}
        </div>

        <div>
          {(user.id === post.user_id) && (
            <CloseButton onClick={() => deletePost(post.id)}/>
          )}
        </div>
      </div>

      <div>
        {post.content}
      </div>
    </div>
  )
}