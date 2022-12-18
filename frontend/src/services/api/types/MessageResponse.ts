import User from './User'

export interface Message {
  id: number
  user_id: number
  message: string
  user: User
  created_at: Date
}
export interface MessageResponse {
  data: {
    messages: Message[]
    receiver: User
  }
}
