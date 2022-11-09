export enum PostResponseResult {
  OK = 'OK',
  KO = 'KO',
}

interface PostResponse {
  meta: {
    result: keyof typeof PostResponseResult
  }
  error?: {
    code: string
    message: string
  }
}

export default PostResponse
