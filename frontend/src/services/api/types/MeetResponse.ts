export interface Meet {
  otherUserId: number
  title: string
  description: string
  startTime: Date
  endTime: Date
}
export interface MeetResponse {
  data: Meet[]
}
