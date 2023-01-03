export interface Meet {
  id?: number
  otherUserId: number
  title: string
  notes: string
  startTime: Date
  endTime: Date
}
export interface MeetResponse {
  data: Meet[]
}
