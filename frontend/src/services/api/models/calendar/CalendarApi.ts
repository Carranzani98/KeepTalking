import { MeetResponse } from '../../types/MeetResponse'
import apiClient from '../api/ApiClient'

const postMeet = async ({
  otherUserId,
  startTime,
  endTime,
  title,
  notes,
}: {
  otherUserId: number
  startTime: Date
  endTime: Date
  title: string
  notes: string
}) => {
  const { data } = await apiClient().post<Response>('/api/meet', {
    otherUserId,
    startTime,
    endTime,
    title,
    notes,
  })
  return data
}

export const getMeets = async () => {
  const { data } = await apiClient().get<MeetResponse>('/api/meets')
  return data
}

export const deleteMeet = async (meetId: { meetId: number }) => {
  const { data } = await apiClient().post<Response>('/api/delete_meet', meetId)
  return data
}

export default postMeet
