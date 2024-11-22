import { useContext } from "react"

import CloseButton from "react-bootstrap/CloseButton"
import Swal from "sweetalert2"

import { AppContext } from "@/contexts/appContext"
import { Post } from "@/types/Post"
import { api } from "@/services/api"

type Props = {
  post: Post
  removePost: (postId: number) => void
}

export function PostMessage({ post, removePost }: Props) {
  const { user } = useContext(AppContext)
  const postDateCreate = window.dayjs(post?.created_at).fromNow()

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
        removePost(post.id)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="bg-secondary-subtle rounded-2 p-2">
      <div className="d-flex justify-content-between gap-4 mb-2">
        <div>
          {`${user?.id === post.user_id ? "Você" : post.author} | ${postDateCreate}`}
        </div>

        <div>
          {(user?.id === post.user_id) && (
            <CloseButton onClick={() => deletePost(post.id)}/>
          )}
        </div>
      </div>

      <div className="text-break">
        {post.content}
      </div>
    </div>
  )
}