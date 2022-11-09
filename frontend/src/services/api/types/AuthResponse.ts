import PostResponse from './PostResponse'
import User from './User'

interface LoginResponse extends PostResponse {
  accessToken: string
  tokenType: string
  expiresIn: number
  user: User
}

export default LoginResponse
