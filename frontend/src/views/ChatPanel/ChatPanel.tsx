import React, { useEffect, useState } from 'react'

import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-identicon-sprites'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons/faPaperPlane'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Avatar,
  Box,
  Paper,
  Center,
  Container,
  Group,
  Loader,
  Text,
  TextInput,
  UnstyledButton,
  Stack,
  Divider,
  ScrollArea,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMutation } from '@tanstack/react-query'
import Pusher from 'pusher-js'
import { useParams } from 'react-router-dom'

import { Message } from '@/services/api/types/MessageResponse'
import User from '@/services/api/types/User'

import GetUserData from '../../components/GetUserData/GetUserData'
import getMessages, {
  postMessage,
} from '../../services/api/models/chat/ChatApi'

const ChatPanel = () => {
  const { id } = useParams()

  const getMessagesMutation = useMutation(getMessages)
  const { data, isLoading, isFetching } = GetUserData()

  const [messages, setMessages] = useState<Message[]>([])
  const [receiver, setReceiver] = useState<User | undefined>(undefined)
  const [message, setMessage] = useState<string>('')
  const messagesMutation = useMutation(postMessage)

  let chatId = ''
  if (!isFetching && data && id) {
    const senderId = data.data.id
    const receiverId = parseInt(id)
    chatId =
      senderId < receiverId
        ? senderId + '-' + receiverId
        : receiverId + '-' + senderId
  }

  useEffect(() => {
    getMessagesMutation.mutate(
      { receiverId: parseInt(id || '') },
      {
        onSuccess: response => {
          setMessages(response.data.messages)
          setReceiver(response.data.receiver)
        },
      }
    )
  }, [])

  useEffect(() => {
    Pusher.logToConsole = true

    const pusher = new Pusher('ad83db98ed4402c50f5a', {
      cluster: 'eu',
    })

    const channel = pusher.subscribe(`chat${chatId}`)
    channel.bind('message', function (newMessage: any) {
      const msg = { ...newMessage.message, user: newMessage.sender }
      setMessages(current => [...current, msg])
    })
  }, [data])

  const form = useForm({
    initialValues: {
      message: '',
    },
  })

  const handleSubmit = (values: { message: string }) => {
    if (id) {
      messagesMutation.mutate({
        message: values.message,
        receiverId: parseInt(id),
      })
    }

    setMessage('')
  }

  if (getMessagesMutation.isLoading || isLoading) {
    return (
      <Center sx={{ height: '100%', width: '100wh' }}>
        <Loader color="gray" size="xl" />
      </Center>
    )
  }

  return (
    <Container fluid sx={{ height: '100%' }}>
      <Center sx={{ height: '100%' }}>
        <Paper
          shadow="xs"
          p="md"
          sx={{ width: '50%', height: '100%', minWidth: 300 }}
        >
          <Group>
            <Avatar
              src={createAvatar(style, {
                seed: id,
                dataUri: true,
              })}
              radius="xl"
              size="lg"
              sx={{ border: '1px solid lightgray' }}
            />
            <Text size={24} color="#2C2C2E">
              {receiver ? receiver.name + ' ' + receiver.surname : ''}
            </Text>
          </Group>
          <Divider mt="lg" />
          <Stack justify="space-between" sx={{ height: 700 }}>
            <ScrollArea scrollbarSize={8}>
              <Stack py="xl">
                {messages.map((info, index) => {
                  return (
                    <Box
                      key={index}
                      p="xs"
                      sx={{
                        width: 'fit-content',
                        maxWidth: '50%',
                        borderRadius: 6,
                        backgroundColor:
                          id && info.user.id === parseInt(id)
                            ? '#F2F2F7'
                            : '#EB5757',
                        alignSelf:
                          id && info.user.id === parseInt(id)
                            ? 'flex-start'
                            : 'flex-end',
                      }}
                    >
                      <Text
                        color={
                          id && info.user.id === parseInt(id)
                            ? '#2C2C2E'
                            : '#FFFFFF'
                        }
                      >
                        {info.message}
                      </Text>
                      <Text
                        pt={5}
                        size="sm"
                        color={
                          id && info.user.id === parseInt(id)
                            ? 'dimmed'
                            : '#FFFFFF'
                        }
                        sx={{ float: 'right' }}
                      >
                        {new Date(info.created_at)
                          .toLocaleTimeString('es-ES')
                          .substring(0, 3) +
                          new Date(info.created_at)
                            .toLocaleTimeString('es-ES')
                            .substring(6)}
                      </Text>
                    </Box>
                  )
                })}
              </Stack>
            </ScrollArea>
            <form
              onSubmit={form.onSubmit(values => {
                handleSubmit(values)
              })}
              style={{ flexBasis: '15%' }}
            >
              <TextInput
                size="lg"
                required
                placeholder="Start typing..."
                value={message}
                styles={{ input: { paddingRight: 60 } }}
                rightSection={
                  <UnstyledButton type="submit">
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      size="lg"
                      color="#9E9795"
                      style={{ marginRight: 32 }}
                    />
                  </UnstyledButton>
                }
                onChange={event => {
                  form.setFieldValue('message', event.currentTarget.value)
                  setMessage(event.currentTarget.value)
                }}
              />
            </form>
          </Stack>
        </Paper>
      </Center>
    </Container>
  )
}

export default ChatPanel
