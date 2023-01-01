export interface Meet {
  otherUserId: number
  title: string
  notes: string
  startTime: Date
  endTime: Date
}
export interface MeetResponse {
  data: Meet[]
}
