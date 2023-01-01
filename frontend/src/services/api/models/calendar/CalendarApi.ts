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

export const deleteMeet = async (id: { id: number }) => {
  const { data } = await apiClient().post<Response>('/api/delete_meet', id)
  return data
}

export default postMeet
