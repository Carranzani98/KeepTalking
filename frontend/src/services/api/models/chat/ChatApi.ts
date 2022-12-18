import { MessageResponse } from '../../types/MessageResponse'
import PostResponse from '../../types/PostResponse'
import { UsersResponse } from '../../types/User'
import apiClient from '../api/ApiClient'

export const getChats = async () => {
  const { data } = await apiClient().get<UsersResponse>('/api/chats')
  return data
}

export const deleteAllChats = async () => {
  const { data } = await apiClient().delete<PostResponse>('/api/delete_all')
  return data
}

export const deleteChat = async ({ receiverId }: { receiverId: number }) => {
  const { data } = await apiClient().post<PostResponse>('/api/delete_chat', {
    receiverId,
  })
  return data
}

const getMessages = async ({ receiverId }: { receiverId: number }) => {
  const { data } = await apiClient().post<MessageResponse>(
    '/api/get_messages',
    {
      receiverId,
    }
  )
  return data
}

export const postMessage = async ({
  message,
  receiverId,
}: {
  message: string
  receiverId: number
}) => {
  const { data } = await apiClient().post<PostResponse>('/api/messages', {
    message,
    receiverId,
  })
  return data
}
export default getMessages
